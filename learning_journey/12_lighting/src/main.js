import * as THREE from 'three';
import { scene } from '../../01_first_threejs_scene/src/main.js';
import { earlyLight } from '../../02_geometry_material_mesh/src/main.js';
import '../../11_materials/src/main.js';

scene.remove(earlyLight);

// HemisphereLight 用天空色照向上的表面、地面色照向下的表面，作为柔和填充光。
export const hemisphereLight = new THREE.HemisphereLight('#b5c9d6', '#45432e', 1.4);
scene.add(hemisphereLight);

// DirectionalLight 发出平行光线，适合模拟距离极远的太阳。
export const sunLight = new THREE.DirectionalLight('#ffcf8c', 3.8);
scene.add(sunLight);

export function setSunAngle(degrees) {
  const radians = degrees * Math.PI / 180;
  // 保持 Y 分量为正，只绕场景改变水平来光方向。
  sunLight.position.set(Math.cos(radians), 0.85, Math.sin(radians)).normalize().multiplyScalar(40);
}

const initialAngle = Number(new URLSearchParams(location.search).get('light') ?? 35);
setSunAngle(initialAngle);
