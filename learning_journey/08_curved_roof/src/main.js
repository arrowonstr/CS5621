import * as THREE from 'three';
import '../../07_vertex_displacement/src/main.js';
import { COLORS, replaceRoof } from '../../05_basic_pavilion/src/main.js';

// 先移除侧边的教学平面，让视线回到建筑本身。
import { learningPlane } from '../../06_vertices_and_subdivision/src/main.js';
learningPlane.parent?.remove(learningPlane);

const roofWidth = 14;
const roofDepth = 9;
const curvedRoofGeometry = new THREE.PlaneGeometry(roofWidth, roofDepth, 28, 22);
curvedRoofGeometry.rotateX(-Math.PI / 2);

// 输入局部 X/Z，输出局部 Y：这就是高度曲面的核心。
function roofHeight(localX, localZ) {
  const normalizedX = Math.abs(localX) / (roofWidth / 2);
  const normalizedZ = Math.abs(localZ) / (roofDepth / 2);

  // 2*(1-z) 形成前后方向的主坡面；高次幂只在边缘明显抬升，模拟飞檐。
  return 1.45 * (1 - normalizedZ)
    + 0.42 * normalizedZ ** 6
    + 0.55 * normalizedX ** 8 * normalizedZ ** 3;
}

const roofPositions = curvedRoofGeometry.attributes.position;
for (let index = 0; index < roofPositions.count; index += 1) {
  roofPositions.setY(index, roofHeight(roofPositions.getX(index), roofPositions.getZ(index)));
}
roofPositions.needsUpdate = true;

// 顶点移动后立刻重算法线；Step 10 会把这个动作做成可控对照实验。
curvedRoofGeometry.computeVertexNormals();

export const curvedRoof = new THREE.Mesh(
  curvedRoofGeometry,
  new THREE.MeshStandardMaterial({ color: COLORS.tile, roughness: 0.72, side: THREE.DoubleSide }),
);
curvedRoof.name = 'curved-roof';
curvedRoof.position.set(0, 4.65, -0.3);
replaceRoof(curvedRoof);

export { roofHeight };
