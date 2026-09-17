import * as THREE from 'three';
import { scene, renderer, frameCallbacks } from '../../01_first_threejs_scene/src/main.js';
import { worldGroup } from '../../05_basic_pavilion/src/main.js';
import '../../20_render_loop_resize_export/src/main.js';

// 暂时隐藏完整世界，保证对照实验只比较 100 个相同立方体的提交方式。
worldGroup.visible = false;
export const performanceGroup = new THREE.Group();
scene.add(performanceGroup);

const sharedGeometry = new THREE.BoxGeometry(0.65, 0.65, 0.65);
const sharedMaterial = new THREE.MeshStandardMaterial({ color: '#577a69', roughness: 0.65 });
const separateGroup = new THREE.Group();
performanceGroup.add(separateGroup);

for (let index = 0; index < 100; index += 1) {
  const mesh = new THREE.Mesh(sharedGeometry, sharedMaterial);
  mesh.position.set((index % 10) - 4.5, 0.5, Math.floor(index / 10) - 4.5);
  separateGroup.add(mesh);
}

// InstancedMesh 让 100 个实例共享 geometry/material，并以一次实例化绘制提交。
const instanced = new THREE.InstancedMesh(sharedGeometry, sharedMaterial, 100);
const matrixHelper = new THREE.Object3D();
for (let index = 0; index < 100; index += 1) {
  matrixHelper.position.set((index % 10) - 4.5, 0.5, Math.floor(index / 10) - 4.5);
  matrixHelper.updateMatrix();
  instanced.setMatrixAt(index, matrixHelper.matrix);
}
instanced.instanceMatrix.needsUpdate = true;
performanceGroup.add(instanced);

export const labGround = new THREE.Mesh(
  new THREE.PlaneGeometry(18, 18).rotateX(-Math.PI / 2),
  new THREE.MeshStandardMaterial({ color: '#a4afa0', roughness: 1 }),
);
scene.add(labGround);

const modeControl = document.querySelector('#mode');
function updateMode() {
  const mode = modeControl?.value ?? 'separate';
  separateGroup.visible = mode === 'separate';
  instanced.visible = mode === 'instanced';
}
modeControl?.addEventListener('change', updateMode);
updateMode();

const metrics = document.querySelector('#metrics');
frameCallbacks.push(() => {
  if (!metrics) return;
  // renderer.info 是上一帧/最近一帧的实际渲染统计；只记录结果，不预设“提升多少”。
  metrics.textContent = `draw calls: ${renderer.info.render.calls}\ntriangles: ${renderer.info.render.triangles}`;
});

export { separateGroup, instanced };
