import assert from 'node:assert/strict';
import test from 'node:test';
import * as THREE from 'three';
import {createLakeWater, WATER_LEVEL, RIPPLE_SPEED} from './water.js';

function createTestWater(t) {
  const sun = new THREE.DirectionalLight(0xffcf8c, 3.8);
  sun.position.set(20, 30, 10);
  const normals = new THREE.DataTexture(new Uint8Array([128, 128, 255, 255]), 1, 1);
  const lake = createLakeWater(sun, normals);
  t.after(() => lake.dispose());
  return {lake, sun, normals};
}

test('official Water mesh has an upward mirror plane at every scene height', t => {
  const {lake} = createTestWater(t);
  assert.equal(lake.mesh.isWater, true);
  assert.equal(lake.mesh.material.type, 'ShaderMaterial');
  const group = new THREE.Group();
  group.add(lake.mesh);
  for (const height of [0.5, 1, 1.6]) {
    group.scale.y = height;
    group.updateMatrixWorld(true);
    const rotation = new THREE.Matrix4().extractRotation(lake.mesh.matrixWorld);
    const mirrorNormal = new THREE.Vector3(0, 0, 1).applyMatrix4(rotation);
    assert.ok(mirrorNormal.distanceTo(new THREE.Vector3(0, 1, 0)) < 1e-6);
    const position = lake.mesh.getWorldPosition(new THREE.Vector3());
    assert.ok(Math.abs(position.y - WATER_LEVEL * height) < 1e-6);
  }
});

test('water time advances at the same speed at different frame rates', t => {
  const {lake} = createTestWater(t);
  const positions = lake.mesh.geometry.attributes.position.array.slice();
  for (let i = 0; i < 30; i += 1) lake.update(1 / 30);
  const at30fps = lake.mesh.material.uniforms.time.value;
  lake.mesh.material.uniforms.time.value = 0;
  for (let i = 0; i < 120; i += 1) lake.update(1 / 120);
  assert.ok(Math.abs(lake.mesh.material.uniforms.time.value - at30fps) < 1e-10);
  assert.ok(Math.abs(at30fps - RIPPLE_SPEED) < 1e-10);
  assert.deepEqual(lake.mesh.geometry.attributes.position.array, positions, 'ripples animate normals, not vertices');
});

test('water sunlight follows the scene light and its target', t => {
  const {lake, sun} = createTestWater(t);
  sun.position.set(-12, 8, 20);
  sun.target.position.set(2, 1, -3);
  sun.color.set('#aaccff');
  lake.syncSun();
  const expected = sun.position.clone().sub(sun.target.position).normalize();
  assert.ok(lake.mesh.material.uniforms.sunDirection.value.distanceTo(expected) < 1e-10);
  assert.ok(lake.mesh.material.uniforms.sunColor.value.equals(sun.color));
});

test('reflection pass mirrors the camera and restores the renderer state', t => {
  const {lake} = createTestWater(t);
  const scene = new THREE.Scene();
  scene.add(lake.mesh);
  scene.updateMatrixWorld(true);
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 220);
  camera.position.set(7, 8, 12);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld(true);
  const originalTarget = {name: 'main target'};
  let activeTarget = originalTarget;
  let reflectionPasses = 0;
  const renderer = {
    xr: {enabled: true},
    shadowMap: {autoUpdate: true},
    autoClear: true,
    state: {buffers: {depth: {setMask() {}}}},
    getRenderTarget: () => activeTarget,
    setRenderTarget: target => {activeTarget = target;},
    render(renderedScene, mirrorCamera) {
      reflectionPasses += 1;
      assert.equal(renderedScene, scene);
      assert.equal(lake.mesh.visible, false, 'water does not reflect itself recursively');
      assert.ok(Math.abs(mirrorCamera.position.y - (2 * WATER_LEVEL - camera.position.y)) < 1e-6);
      assert.equal(activeTarget.texture, lake.mesh.material.uniforms.mirrorSampler.value);
      assert.equal(activeTarget.width, 512);
      assert.equal(activeTarget.height, 512);
    },
  };
  lake.mesh.onBeforeRender(renderer, scene, camera);
  assert.equal(reflectionPasses, 1);
  assert.equal(activeTarget, originalTarget);
  assert.equal(lake.mesh.visible, true);
  assert.equal(renderer.xr.enabled, true);
  assert.equal(renderer.shadowMap.autoUpdate, true);
});

test('switching away from water releases all owned rendering resources once', t => {
  const {lake, normals} = createTestWater(t);
  const resources = [lake.mesh.geometry, lake.mesh.material, normals,
    lake.mesh.material.uniforms.mirrorSampler.value.renderTarget];
  const disposeCounts = resources.map(() => 0);
  resources.forEach((resource, i) => resource.addEventListener('dispose', () => {disposeCounts[i] += 1;}));
  lake.dispose();
  lake.dispose();
  assert.deepEqual(disposeCounts, [1, 1, 1, 1]);
});
