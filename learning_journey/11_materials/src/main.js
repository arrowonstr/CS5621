import * as THREE from 'three';
import '../../10_surface_normals/src/main.js';
import { worldGroup, COLORS, addBox } from '../../05_basic_pavilion/src/main.js';

const query = new URLSearchParams(location.search);
const roughness = Number(query.get('roughness') ?? 0.55);
const metalness = Number(query.get('metalness') ?? 0);

// roughness 越低，高光越集中、表面越“光滑”；越高则反光更分散。
// metalness 决定材质是否按金属方式反射环境。石木通常接近 0。
export const materialStudy = new THREE.Mesh(
  new THREE.SphereGeometry(1.2, 40, 24),
  new THREE.MeshStandardMaterial({ color: '#b58a58', roughness, metalness }),
);
materialStudy.position.set(9, 2, 4);
worldGroup.add(materialStudy);

// emissive 是材质自身发出的颜色贡献；它不等于真正照亮其它物体的灯光。
export const lantern = new THREE.Mesh(
  new THREE.SphereGeometry(0.32, 20, 12),
  new THREE.MeshStandardMaterial({
    color: '#b65025',
    roughness: 0.5,
    emissive: '#af511c',
    emissiveIntensity: 0.45,
  }),
);
lantern.scale.y = 1.35;
lantern.position.set(4, 3.2, 2.2);
worldGroup.add(lantern);
addBox('lantern-bar', 0.06, 1.2, 0.06, COLORS.trim, 4, 3.8, 2.2);

console.info({ roughness, metalness });
