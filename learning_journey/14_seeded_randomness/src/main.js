import * as THREE from 'three';
import '../../13_shadows/src/main.js';
import { worldGroup } from '../../05_basic_pavilion/src/main.js';

// 线性同余生成器（LCG）不是“真正随机”，而是由 seed 决定的固定数列。
// 同一个 seed 会产生完全相同的装饰变化，适合可复现实验。
export function createSeededRandom(initialSeed) {
  let state = initialSeed >>> 0;
  return function nextRandom() {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const requestedSeed = Number(new URLSearchParams(location.search).get('seed') ?? 921);
export const activeSeed = Number.isInteger(requestedSeed) ? requestedSeed : 921;
export const random = createSeededRandom(activeSeed);

export const terraceTiles = new THREE.Group();
terraceTiles.name = 'seeded-terrace-tiles';
worldGroup.add(terraceTiles);

// 每块地砖几何尺寸相同，只用 seeded random 稍微改变亮度和粗糙度。
for (let row = 0; row < 6; row += 1) {
  for (let column = 0; column < 12; column += 1) {
    const color = new THREE.Color().setHSL(0.12, 0.06, 0.37 + random() * 0.08);
    const material = new THREE.MeshStandardMaterial({ color, roughness: 0.4 + random() * 0.25 });
    const tile = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.12, 1.25), material);
    tile.position.set(-6.9 + column * 1.27, 0.08, 6.8 + row * 1.27);
    tile.receiveShadow = true;
    terraceTiles.add(tile);
  }
}

console.info('当前 seed:', activeSeed);
console.info('同一 seed 刷新页面时，地砖变化应保持一致。');
