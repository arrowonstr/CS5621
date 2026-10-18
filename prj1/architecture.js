import * as THREE from 'three';

export const ROOF_THICKNESS = 0.22;

export function createPlatformGeometry(outline, thickness) {
  const shape = new THREE.Shape(outline.map(([x, z]) => new THREE.Vector2(x, z)));
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    steps: 1,
    bevelEnabled: false,
  });
  // Extrusion points down in world Y, leaving one continuous upper surface at zero.
  geometry.rotateX(Math.PI / 2);
  return geometry;
}

// Coordinates use the same height function for tiles, roof undersides, and supports.
export function roofHeight(x, z, width, depth) {
  const a = Math.abs(x) * 2 / width;
  const b = Math.abs(z) * 2 / depth;
  return 2 * (1 - b) + 0.58 * b ** 6 + 0.65 * a ** 8 * b ** 3;
}

// Two sampled surfaces joined around their perimeter form a closed solid.
export function createHeightfieldSolid(width, depth, topHeight, bottomHeight, nx = 32, nz = 28) {
  const plane = new THREE.PlaneGeometry(width, depth, nx, nz);
  plane.rotateX(-Math.PI / 2);
  const grid = plane.attributes.position;
  const count = grid.count;
  const positions = new Float32Array(count * 6);

  for (let i = 0; i < count; i += 1) {
    const x = grid.getX(i);
    const z = grid.getZ(i);
    const top = topHeight(x, z);
    const bottom = bottomHeight(x, z);
    if (!Number.isFinite(top) || !Number.isFinite(bottom) || top <= bottom) {
      plane.dispose();
      throw new RangeError('Heightfield solid must have a finite, positive thickness.');
    }
    positions.set([x, top, z], i * 3);
    positions.set([x, bottom, z], (i + count) * 3);
  }

  const indices = [...plane.index.array];
  for (let i = 0; i < plane.index.count; i += 3) {
    const a = plane.index.getX(i);
    const b = plane.index.getX(i + 1);
    const c = plane.index.getX(i + 2);
    indices.push(a + count, c + count, b + count);
  }

  const perimeter = [];
  for (let x = 0; x <= nx; x += 1) perimeter.push(x);
  for (let z = 1; z <= nz; z += 1) perimeter.push(z * (nx + 1) + nx);
  for (let x = nx - 1; x >= 0; x -= 1) perimeter.push(nz * (nx + 1) + x);
  for (let z = nz - 1; z > 0; z -= 1) perimeter.push(z * (nx + 1));

  for (let i = 0; i < perimeter.length; i += 1) {
    const a = perimeter[i];
    const b = perimeter[(i + 1) % perimeter.length];
    indices.push(a, b, a + count, b, b + count, a + count);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  plane.dispose();
  return geometry;
}

export function createRoofGeometry(width, depth) {
  const height = (x, z) => roofHeight(x, z, width, depth);
  return createHeightfieldSolid(width, depth, height,
    (x, z) => height(x, z) - ROOF_THICKNESS);
}

export function createRoofInfillGeometry(wallWidth, wallDepth, roofWidth, roofDepth, roofBase, wallTop) {
  return createHeightfieldSolid(wallWidth, wallDepth,
    (x, z) => roofBase + roofHeight(x, z, roofWidth, roofDepth) - ROOF_THICKNESS + 0.02,
    () => wallTop - 0.03);
}
