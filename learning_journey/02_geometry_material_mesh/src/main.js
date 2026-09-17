import * as THREE from 'three';
import { scene, camera, firstCube } from '../../01_first_threejs_scene/src/main.js';

// 把第一步的立方体移到左边，给新物体留出空间。
firstCube.position.x = -2.4;

// MeshBasicMaterial 不参与光照计算，所以无论灯从哪里来，颜色都基本一样。
firstCube.material.color.set('#d77952');

// 同样的 BoxGeometry 配上 MeshStandardMaterial 后会响应灯光、法线和粗糙度。
export const standardCube = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshStandardMaterial({ color: '#38665a', roughness: 0.55 }),
);
standardCube.position.x = 0;
scene.add(standardCube);

// SphereGeometry 展示不同几何体；更多分段会让轮廓更圆，也会增加三角形数量。
export const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.15, 32, 20),
  new THREE.MeshStandardMaterial({ color: '#d5b56c', roughness: 0.35 }),
);
sphere.position.x = 2.7;
scene.add(sphere);

// 标准材质需要光。DirectionalLight 的光线彼此平行，常用来模拟太阳。
export const earlyLight = new THREE.DirectionalLight(0xffffff, 3);
earlyLight.position.set(4, 7, 5);
scene.add(earlyLight);

camera.position.set(7, 5, 11);
camera.lookAt(0, 0, 0);
