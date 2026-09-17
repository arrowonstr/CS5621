import * as THREE from 'three';
import '../../15_trees_and_rocks/src/main.js';
import { worldGroup } from '../../05_basic_pavilion/src/main.js';

const useRippleNormals = new URLSearchParams(location.search).get('ripples') !== 'off';

// 水的几何体始终是一张平面：没有波浪顶点位移，也没有流体模拟。
const waterGeometry = new THREE.PlaneGeometry(140, 140);
waterGeometry.rotateX(-Math.PI / 2);

export const waterMaterial = new THREE.MeshStandardMaterial({
  color: '#516e6c', roughness: 0.28, metalness: 0.3,
});

if (useRippleNormals) {
  // 只在 fragment shader 中扰动 shading normal。
  // 轮廓和顶点位置完全不变，但光照会出现细小起伏感。
  waterMaterial.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <normal_fragment_begin>',
      '#include <normal_fragment_begin>\nnormal.x += 0.05 * sin(gl_FragCoord.x * 0.17 + gl_FragCoord.y * 0.25); normal = normalize(normal);',
    );
  };
}

export const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.position.y = -1.45;
water.receiveShadow = true;
water.castShadow = false;
water.renderOrder = -1;
worldGroup.add(water);

console.info('水面 shading-normal 扰动:', useRippleNormals);
