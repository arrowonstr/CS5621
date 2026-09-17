import * as THREE from 'three';
import { scene, renderer } from '../../01_first_threejs_scene/src/main.js';
import '../../16_water/src/main.js';

const density = Number(new URLSearchParams(location.search).get('fog') ?? 0.012);
const atmosphereColor = new THREE.Color('#aebbbb');

// FogExp2 随距离指数增强：远山逐渐融入背景，形成空气透视和空间层次。
// 密度为 0 时关闭；过大则近处建筑也会迅速消失。
scene.fog = density > 0 ? new THREE.FogExp2(atmosphereColor, density) : null;
scene.background = atmosphereColor;
renderer.setClearColor(atmosphereColor);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

console.info('FogExp2 density:', density);
