import * as THREE from 'three';
import { mountainMeshes } from '../../09_height_field_mountains/src/main.js';

const recomputeNormals = new URLSearchParams(location.search).get('normals') !== 'off';

for (const mountain of mountainMeshes) {
  if (recomputeNormals) {
    // 顶点位置改变后，表面朝向也改变。
    // 标准材质用 normal 计算明暗，因此必须让 normal 与新曲面一致。
    mountain.geometry.computeVertexNormals();
  } else {
    // 对照组：把所有顶点法线强制设为 +Y。
    // 山的轮廓仍然起伏，但内部光照会像平面，帮助区分 shape 与 shading。
    const count = mountain.geometry.attributes.position.count;
    const flatNormals = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) flatNormals[index * 3 + 1] = 1;
    mountain.geometry.setAttribute('normal', new THREE.BufferAttribute(flatNormals, 3));
  }
}

console.info('重新计算山体法线:', recomputeNormals);
