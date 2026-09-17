import * as THREE from 'three';
import { scene, camera, firstCube } from '../../01_first_threejs_scene/src/main.js';
import { standardCube, sphere } from '../../02_geometry_material_mesh/src/main.js';
import { axes, transformGroup } from '../../03_transforms_and_coordinates/src/main.js';

// 清理教学用的散列物体，但保留同一个 scene/camera/renderer 架构。
scene.remove(firstCube, standardCube, sphere, axes, transformGroup);

export const repetitionGroup = new THREE.Group();
scene.add(repetitionGroup);

const columnCount = 7;
const columnSpacing = 2;
const columnHeight = 4;

// 一个循环用“数量 + 间距”生成整排柱子。
// 修改 columnCount 会改变柱子数量；修改 spacing 会改变建筑节奏和总宽度。
for (let index = 0; index < columnCount; index += 1) {
  const x = (index - (columnCount - 1) / 2) * columnSpacing;
  const column = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.28, columnHeight, 12),
    new THREE.MeshStandardMaterial({ color: '#55362b', roughness: 0.8 }),
  );
  column.position.set(x, columnHeight / 2, 0);
  repetitionGroup.add(column);
}

// 台阶同样由循环生成；每一级同时改变 Y 高度和 Z 深度。
for (let step = 0; step < 6; step += 1) {
  const stair = new THREE.Mesh(
    new THREE.BoxGeometry(7, 0.28, 0.7),
    new THREE.MeshStandardMaterial({ color: '#85877d', roughness: 0.95 }),
  );
  stair.position.set(0, step * 0.22, 3 - step * 0.48);
  repetitionGroup.add(stair);
}

camera.position.set(12, 8, 15);
camera.lookAt(0, 2, 0);
