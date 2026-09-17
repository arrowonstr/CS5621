import * as THREE from 'three';
import { scene, camera } from '../../01_first_threejs_scene/src/main.js';
import { repetitionGroup } from '../../04_procedural_repetition/src/main.js';

scene.remove(repetitionGroup);
export const worldGroup = new THREE.Group();
scene.add(worldGroup);

// 这些颜色对应生产项目的石材、木材、屋瓦与装饰色，但集中命名后更易读。
export const COLORS = {
  stone: '#86887d', wood: '#512f24', wall: '#c2b499', tile: '#303e3e', trim: '#aa8651',
};

// 小型 helper 仍保持初学者可读：输入尺寸、颜色和位置，输出一个 Mesh。
export function addBox(name, width, height, depth, color, x, y, z) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.82 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.position.set(x, y, z);
  // 先声明物体具备投射/接收阴影的能力；Step 13 才会真正开启 renderer 与太阳阴影。
  // 这样后续步骤新加入的建筑构件也能沿用同一明确规则。
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  worldGroup.add(mesh);
  return mesh;
}

// 平台、墙体、柱子和梁都是简单长方体；复杂建筑来自组合关系。
addBox('platform', 18, 1, 13, COLORS.stone, 0, -0.5, 0);
addBox('hall-wall', 11, 3.3, 6, COLORS.wall, 0, 2.15, -1.5);

for (const x of [-5, -3, -1, 1, 3, 5]) {
  addBox('column', 0.34, 4.4, 0.34, COLORS.wood, x, 2.2, 1.7);
}
addBox('front-beam', 12, 0.3, 0.45, COLORS.wood, 0, 4.2, 1.7);

// 先使用平屋顶占位。Step 08 会在不改变其它建筑的前提下替换它。
export let roofMesh = addBox('flat-roof-placeholder', 14, 0.35, 9, COLORS.tile, 0, 4.8, -0.3);

// 重复栏杆柱继续使用上一阶段的循环思想。
for (let x = -8; x <= 8; x += 1.3) {
  addBox('rail-post', 0.16, 1.15, 0.16, COLORS.stone, x, 0.58, 5.7);
}
addBox('rail-top', 17, 0.13, 0.18, COLORS.stone, 0, 1.1, 5.7);

camera.position.set(15, 9, 20);
camera.lookAt(0, 2, 0);

export function replaceRoof(newRoof) {
  worldGroup.remove(roofMesh);
  roofMesh.geometry.dispose();
  roofMesh.material.dispose();
  roofMesh = newRoof;
  worldGroup.add(newRoof);
}
