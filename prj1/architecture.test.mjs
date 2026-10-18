import assert from 'node:assert/strict';
import test from 'node:test';
import * as THREE from 'three';
import {createRoofGeometry, createRoofInfillGeometry, roofHeight, ROOF_THICKNESS} from './architecture.js';
import {buildTerrace} from './terrace.js';

function assertClosed(geometry) {
  const position = geometry.attributes.position;
  const edges = new Map();
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  for (let i = 0; i < geometry.index.count; i += 3) {
    const triangle = [0, 1, 2].map(j => geometry.index.getX(i + j));
    a.fromBufferAttribute(position, triangle[0]);
    b.fromBufferAttribute(position, triangle[1]);
    c.fromBufferAttribute(position, triangle[2]);
    assert.ok(Number.isFinite(a.x + a.y + a.z));
    assert.ok(b.sub(a).cross(c.sub(a)).lengthSq() > 1e-12, 'no collapsed faces');
    for (let j = 0; j < 3; j += 1) {
      const first = triangle[j], second = triangle[(j + 1) % 3];
      const key = `${Math.min(first, second)}:${Math.max(first, second)}`;
      const edge = edges.get(key) || {count: 0, winding: 0};
      edge.count += 1;
      edge.winding += first < second ? 1 : -1;
      edges.set(key, edge);
    }
  }
  for (const edge of edges.values()) {
    assert.equal(edge.count, 2, 'each edge belongs to two faces');
    assert.equal(edge.winding, 0, 'neighboring faces have consistent winding');
  }
}

function buildTestScene(t) {
  const scene = new THREE.Scene(), objects = [];
  buildTerrace((geometry, color, position, scale = [1, 1, 1]) => {
    const material = new THREE.MeshStandardMaterial({color});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    mesh.userData.standard = material;
    scene.add(mesh);
    objects.push(mesh);
    return mesh;
  });
  scene.updateMatrixWorld(true);
  t.after(() => objects.forEach(mesh => {mesh.geometry.dispose(); mesh.material.dispose();}));
  return objects;
}

for (const [width, depth] of [[15.8, 10], [10.8, 7], [9.8, 8], [9, 23]]) {
  test(`roof ${width} x ${depth} is a closed solid with a real underside`, () => {
    const geometry = createRoofGeometry(width, depth);
    assertClosed(geometry);
    const p = geometry.attributes.position, count = p.count / 2;
    for (let i = 0; i < count; i += 1) {
      assert.ok(Math.abs(p.getY(i) - p.getY(i + count) - ROOF_THICKNESS) < 1e-5);
    }
    const roof = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
    const x = width * .13, z = depth * .21;
    const bottomRay = new THREE.Raycaster(new THREE.Vector3(x, -2, z), new THREE.Vector3(0, 1, 0));
    assert.ok(bottomRay.intersectObject(roof).length > 0, 'underside visible with normal face culling');
    geometry.dispose();
    roof.material.dispose();
  });
}

for (const [w, d] of [[13, 7], [8, 4], [7, 5]]) {
  test(`wall infill ${w} x ${d} follows the roof without a gap`, () => {
    const geometry = createRoofInfillGeometry(w, d, w + 2.8, d + 3, 4, 3.8);
    assertClosed(geometry);
    const p = geometry.attributes.position;
    for (let i = 0; i < p.count / 2; i += 1) {
      const underside = 4 + roofHeight(p.getX(i), p.getZ(i), w + 2.8, d + 3) - ROOF_THICKNESS;
      assert.ok(p.getY(i) >= underside, 'infill touches or overlaps the underside');
      assert.ok(p.getY(i + p.count / 2) < 3.8, 'infill overlaps the main wall');
    }
    geometry.dispose();
  });
}

test('assembled building supports, gallery, and trees have physical contact', t => {
  const objects = buildTestScene(t);
  const parts = role => objects.filter(mesh => mesh.userData.structure === role);
  const feet = parts('column-foot').map(mesh => new THREE.Box3().setFromObject(mesh));
  for (const column of parts('column')) {
    const bottom = new THREE.Vector3(0, -column.geometry.parameters.height / 2, 0).applyMatrix4(column.matrixWorld);
    assert.ok(feet.some(foot => foot.containsPoint(bottom)), 'each column begins inside a stone foot');
  }

  const upperSupport = parts('upper-floor-support')[0];
  assert.ok(upperSupport);
  assertClosed(upperSupport.geometry);
  const p = upperSupport.geometry.attributes.position, count = p.count / 2;
  for (let i = 0; i < count; i += 1) {
    const lowerRoof = 4 + roofHeight(p.getX(i), p.getZ(i), 15.8, 10);
    assert.ok(p.getY(i + count) < lowerRoof, 'upper support reaches into the lower roof');
    assert.ok(p.getY(i) > 5.3, 'upper support reaches into the upper floor slab');
  }
  assertClosed(parts('gallery-wall-infill')[0].geometry);

  const grounds = parts('tree-ground');
  for (const trunk of parts('tree-trunk')) {
    const root = new THREE.Vector3(0, -trunk.geometry.parameters.height / 2, 0).applyMatrix4(trunk.matrixWorld);
    const ray = new THREE.Raycaster(root.clone().add(new THREE.Vector3(0, .5, 0)), new THREE.Vector3(0, -1, 0));
    const hit = ray.intersectObjects(grounds)[0];
    assert.ok(hit, 'each trunk has visible ground beneath it');
    assert.ok(hit.point.y >= root.y && hit.point.y - root.y < .15, 'tree root is embedded in the ground');
  }
  assert.equal(parts('roof').length, 4);
  assert.equal(parts('wall-infill').length, 3);
  assert.equal(parts('tree-trunk').length, 4);
});

test('walkable surfaces have no overlapping coplanar tops', t => {
  const surfaces = buildTestScene(t).filter(mesh => mesh.userData.walkable);
  const bounds = surfaces.map(mesh => new THREE.Box3().setFromObject(mesh));
  for (let i = 0; i < surfaces.length; i += 1) {
    for (let j = i + 1; j < surfaces.length; j += 1) {
      const a = bounds[i], b = bounds[j];
      if (Math.abs(a.max.y - b.max.y) > 1e-5) continue;
      const overlapX = Math.min(a.max.x, b.max.x) - Math.max(a.min.x, b.min.x);
      const overlapZ = Math.min(a.max.z, b.max.z) - Math.max(a.min.z, b.min.z);
      assert.ok(overlapX <= 1e-5 || overlapZ <= 1e-5,
        `${surfaces[i].userData.structure} and ${surfaces[j].userData.structure} have competing top faces`);
    }
  }
});

test('every paving slab fits fully within the continuous terrace foundation', t => {
  const objects = buildTestScene(t);
  const foundation = objects.find(mesh => mesh.userData.structure === 'terrace-foundation');
  assert.ok(foundation);
  const ray = new THREE.Raycaster();
  ray.ray.direction.set(0, -1, 0);
  for (const slab of objects.filter(mesh => mesh.userData.structure === 'paving')) {
    const bounds = new THREE.Box3().setFromObject(slab);
    for (const x of [bounds.min.x, bounds.max.x]) {
      for (const z of [bounds.min.z, bounds.max.z]) {
        ray.ray.origin.set(x, .5, z);
        const hit = ray.intersectObject(foundation)[0];
        assert.ok(hit, `unsupported paving corner at ${x}, ${z}`);
        assert.ok(Math.abs(hit.point.y) < 1e-5, 'slab rests on the foundation top');
      }
    }
  }
});

test('every railing post has ground beneath its full footprint, with no duplicate corner posts', t => {
  const objects = buildTestScene(t);
  const surfaces = objects.filter(mesh => mesh.userData.walkable);
  const posts = objects.filter(mesh => mesh.userData.structure === 'railing-post');
  assert.ok(posts.length > 20);
  const positions = new Set();
  const ray = new THREE.Raycaster();
  ray.ray.direction.set(0, -1, 0);
  for (const post of posts) {
    const key = post.position.toArray().map(value => value.toFixed(5)).join(',');
    assert.ok(!positions.has(key), 'corner posts are shared');
    positions.add(key);
    const bounds = new THREE.Box3().setFromObject(post);
    for (const x of [bounds.min.x + 1e-4, bounds.max.x - 1e-4]) {
      for (const z of [bounds.min.z + 1e-4, bounds.max.z - 1e-4]) {
        ray.ray.origin.set(x, bounds.min.y + .25, z);
        const hit = ray.intersectObjects(surfaces)[0];
        assert.ok(hit, `no platform beneath railing at ${x}, ${z}`);
        assert.ok(hit.point.y >= bounds.min.y - 1e-5, 'railing foot is embedded in the surface');
        assert.ok(hit.point.y - bounds.min.y < .14, 'railing post meets the intended floor');
      }
    }
  }
});

test('trees and their islands clear building walls, roofs, and the terrace', t => {
  const objects = buildTestScene(t);
  const structureRoles = new Set(['roof', 'hall-wall', 'wall-infill', 'gallery-wall', 'gallery-wall-infill', 'upper-floor-support', 'column']);
  const buildingBounds = objects.filter(mesh => structureRoles.has(mesh.userData.structure))
    .map(mesh => ({role:mesh.userData.structure, bounds:new THREE.Box3().setFromObject(mesh)}));
  const trees = objects.filter(mesh => ['tree-trunk', 'tree-branch', 'tree-leaves'].includes(mesh.userData.structure));
  for (const tree of trees) {
    const bounds = new THREE.Box3().setFromObject(tree);
    for (const building of buildingBounds) {
      assert.ok(!bounds.intersectsBox(building.bounds), `${tree.userData.structure} intersects ${building.role}`);
    }
  }
  const platforms = objects.filter(mesh => ['terrace-foundation', 'hall-foundation', 'hall-platform'].includes(mesh.userData.structure));
  const islands = objects.filter(mesh => mesh.userData.structure === 'tree-ground' && mesh.geometry.type === 'SphereGeometry');
  for (const island of islands) {
    const bounds = new THREE.Box3().setFromObject(island);
    for (const platform of platforms) {
      assert.ok(!bounds.intersectsBox(new THREE.Box3().setFromObject(platform)), 'tree island clips a platform');
    }
  }
});
