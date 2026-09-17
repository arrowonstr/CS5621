import { camera, renderer, scene } from '../../01_first_threejs_scene/src/main.js';
import { controls, updateParameters } from '../../19_ui_parameters/src/main.js';

const stage = document.querySelector('.stage');

// CSS 尺寸变化时同步 drawing buffer，并更新透视相机 aspect。
// 忘记 updateProjectionMatrix 会让新 aspect 没有真正进入投影矩阵。
export function resizeToStage() {
  const width = stage.clientWidth;
  const height = stage.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}
new ResizeObserver(resizeToStage).observe(stage);
resizeToStage();

export function resetView() {
  document.querySelector('#height').value = '1';
  document.querySelector('#light').value = '35';
  document.querySelector('#roughness').value = '0.55';
  updateParameters();
  camera.position.set(-12, 8, 25);
  controls.target.set(0, 2.8, -3);
  controls.update();
}
document.querySelector('#reset').addEventListener('click', resetView);

// 导出前主动 render 一次，确保 canvas 是当前 scene/camera 的最新画面。
document.querySelector('#export').addEventListener('click', () => {
  renderer.render(scene, camera);
  const link = document.createElement('a');
  link.href = renderer.domElement.toDataURL('image/png');
  link.download = 'learning-lakeside-pavilion.png';
  link.click();
});
