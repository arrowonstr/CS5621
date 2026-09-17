import * as THREE from 'three';

// Scene 是整个 3D 世界的容器。只有加入 scene 的物体，才有机会被 renderer 绘制。
export const scene = new THREE.Scene();
scene.background = new THREE.Color('#aebbbb');

// PerspectiveCamera 模拟人眼透视：远处物体看起来更小。
// 45 是垂直视野角；增大它会看到更宽范围，但透视畸变也更明显。
// 16/9 是当前固定画布宽高比；0.1 和 100 是近、远裁剪面。
export const camera = new THREE.PerspectiveCamera(45, 16 / 9, 0.1, 100);
camera.position.set(5, 4, 8);
camera.lookAt(0, 0, 0);

// WebGLRenderer 把 Three.js 场景转换为浏览器 canvas 像素。
// antialias 会平滑边缘；preserveDrawingBuffer 为后续 PNG 导出保留像素。
export const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#scene'),
  antialias: true,
  preserveDrawingBuffer: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(960, 540, false);

// Mesh = Geometry（形状）+ Material（表面画法）。
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: '#38665a' });
export const firstCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(firstCube);

// 后续步骤可以把每帧需要做的事情加入这个数组，而不必创建第二个动画循环。
export const frameCallbacks = [];

// requestAnimationFrame 让浏览器在下一次适合绘图时调用 animate。
// 本步骤即使物体不动也持续渲染，为后面的动画和交互保留同一结构。
function animate(time) {
  for (const callback of frameCallbacks) callback(time);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

window.learningApp = { scene, camera, renderer, firstCube, frameCallbacks };
