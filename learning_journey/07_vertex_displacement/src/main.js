import { learningPlaneGeometry } from '../../06_vertices_and_subdivision/src/main.js';

const requestedAmplitude = Number(new URLSearchParams(location.search).get('amplitude') ?? 1.2);
export const displacementAmplitude = Number.isFinite(requestedAmplitude) ? requestedAmplitude : 1.2;

const positions = learningPlaneGeometry.attributes.position;

// 遍历 position attribute：每条记录包含一个顶点的局部 X、Y、Z。
for (let index = 0; index < positions.count; index += 1) {
  const x = positions.getX(index);
  const z = positions.getZ(index);

  // 把原来平面的 Y 改成正弦高度。
  // amplitude 越大，起伏越高；X/Z 位置和波峰间距保持不变。
  const newHeight = Math.sin(x * 0.9) * Math.cos(z * 0.45) * displacementAmplitude;
  positions.setY(index, newHeight);
}

// 告诉渲染器 position 数据已经改变，需要重新上传 GPU。
positions.needsUpdate = true;

// 本步骤故意暂不重算法线，因为 wireframe 不依赖标准材质光照。
// Step 10 会严格比较“形状已改变、法线未改变”和正确法线。
