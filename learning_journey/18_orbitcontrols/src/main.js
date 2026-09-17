import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { camera, renderer, frameCallbacks } from '../../01_first_threejs_scene/src/main.js';
import '../../17_fog_and_atmosphere/src/main.js';

// OrbitControls 管理 camera，而不是移动整个世界。
export const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 2.8, -3);
controls.enableDamping = true; // 增加惯性；因此必须每帧调用 update。
controls.minDistance = 8;      // 防止相机穿进模型。
controls.maxDistance = 70;     // 防止缩得太远看不清主题。
controls.maxPolarAngle = Math.PI * 0.49; // 限制到地平线以上，避免翻到水面下。

camera.position.set(-12, 8, 25);
controls.update();

// 复用 Step 01 的唯一 render loop，只注册一项每帧工作。
frameCallbacks.push(() => controls.update());
