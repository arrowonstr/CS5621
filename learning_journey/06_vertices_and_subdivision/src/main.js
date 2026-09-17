import * as THREE from 'three';
import { camera } from '../../01_first_threejs_scene/src/main.js';
import { worldGroup } from '../../05_basic_pavilion/src/main.js';

// URL 参数让实验只改变一个变量：?segments=1、8 或 32。
const requestedSegments = Number(new URLSearchParams(location.search).get('segments') ?? 8);
export const planeSegments = [1, 8, 32].includes(requestedSegments) ? requestedSegments : 8;

// PlaneGeometry 的细分数量决定可供移动的顶点数量。
// 每个网格小方格由两个三角形组成，所以 segments 增大也会提高 GPU 工作量。
export const learningPlaneGeometry = new THREE.PlaneGeometry(
  8,
  8,
  planeSegments,
  planeSegments,
);
learningPlaneGeometry.rotateX(-Math.PI / 2);

// wireframe 只画三角形边，便于直接观察细分结构。
export const learningPlane = new THREE.Mesh(
  learningPlaneGeometry,
  new THREE.MeshBasicMaterial({ color: '#d59755', wireframe: true }),
);
learningPlane.position.set(11, 1.2, 0);
worldGroup.add(learningPlane);

camera.position.set(18, 11, 22);
camera.lookAt(2, 2, 0);

console.info('细分数:', planeSegments);
console.info('position 顶点记录数:', learningPlaneGeometry.attributes.position.count);
console.info('三角形数:', learningPlaneGeometry.index.count / 3);
