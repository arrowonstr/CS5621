import * as THREE from 'three';
import '../../08_curved_roof/src/main.js';
import { worldGroup } from '../../05_basic_pavilion/src/main.js';

export const mountainMeshes = [];

function mountainHeight(x, z, layerIndex) {
  // radialFalloff 从中心的 1 平滑降到边界的 0，形成单座山的总体轮廓。
  const radialFalloff = Math.max(0, 1 - Math.hypot(x, z) / 13);
  const layerAmplitude = 9 + (layerIndex % 3) * 3;

  // sin 只添加规则周期细节；它不是 Perlin/Simplex noise，也没有多 octave。
  const periodicDetail = 1 + 0.12 * Math.sin(x * 1.2 + z);
  return radialFalloff ** 0.7 * layerAmplitude * periodicDetail - 5;
}

for (let layer = 0; layer < 5; layer += 1) {
  const geometry = new THREE.PlaneGeometry(25, 25, 32, 32);
  geometry.rotateX(-Math.PI / 2);
  const positions = geometry.attributes.position;

  for (let index = 0; index < positions.count; index += 1) {
    const x = positions.getX(index);
    const z = positions.getZ(index);
    positions.setY(index, mountainHeight(x, z, layer));
  }
  geometry.computeVertexNormals();

  const mountain = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ color: layer % 2 ? '#596f68' : '#75867a', roughness: 1 }),
  );
  mountain.position.set(-34 + layer * 17, -1.5, -35 - (layer % 2) * 8);
  worldGroup.add(mountain);
  mountainMeshes.push(mountain);
}

export { mountainHeight };
