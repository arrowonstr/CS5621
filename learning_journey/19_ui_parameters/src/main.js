import { worldGroup } from '../../05_basic_pavilion/src/main.js';
import { materialStudy } from '../../11_materials/src/main.js';
import { setSunAngle } from '../../12_lighting/src/main.js';
import { controls } from '../../18_orbitcontrols/src/main.js';

export function updateParameters() {
  const height = Number(document.querySelector('#height').value);
  const lightAngle = Number(document.querySelector('#light').value);
  const roughness = Number(document.querySelector('#roughness').value);

  // 这是父 Group 的非均匀 Y 缩放，不是 terrain amplitude。
  // 建筑、水位、树木和山体都会一起纵向压缩/拉长。
  worldGroup.scale.y = height;
  setSunAngle(lightAngle);
  materialStudy.material.roughness = roughness;

  document.querySelector('#height-out').textContent = height.toFixed(2);
  document.querySelector('#light-out').textContent = `${lightAngle}°`;
  document.querySelector('#roughness-out').textContent = roughness.toFixed(2);
}

for (const id of ['height', 'light', 'roughness']) {
  document.querySelector(`#${id}`).addEventListener('input', updateParameters);
}
updateParameters();

export { controls };
