import * as THREE from 'three';
import { scene, renderer, frameCallbacks } from '../../01_first_threejs_scene/src/main.js';
import { worldGroup, COLORS, addBox, roofMesh } from '../../05_basic_pavilion/src/main.js';
import { roofHeight } from '../../08_curved_roof/src/main.js';
import { performanceGroup, labGround } from '../../21_performance/src/main.js';

// Step 21 的性能实验是临时对照，不属于最终湖畔构图。
scene.remove(performanceGroup, labGround);
worldGroup.visible = true;

// 加入通往主殿的短堤与台阶，让前景露台、建筑、水面形成层次。
addBox('causeway', 5.5, 0.35, 9, COLORS.stone, 0, -0.25, -8);
for (let index = 0; index < 8; index += 1) {
  addBox('causeway-step', 5.2, 0.18, 0.45, COLORS.stone, 0, -0.05 - index * 0.08, -3.8 - index * 0.48);
}

// 第二层体量沿用 BoxGeometry 组合，强调“复杂建筑来自简单 primitive”。
addBox('upper-wall', 7, 2.5, 3.5, COLORS.wall, 0, 6.3, -1.5);
for (const x of [-3, -1.5, 0, 1.5, 3]) {
  addBox('upper-column', 0.24, 3.1, 0.24, COLORS.wood, x, 6.25, 0.3);
}
addBox('upper-beam', 7.8, 0.25, 0.35, COLORS.wood, 0, 7.75, 0.3);

// 为主屋顶添加少量曲线瓦脊。生产项目数量更多；学习版保留技术但控制对象数。
for (let rib = 0; rib <= 14; rib += 1) {
  const localX = -7 + rib;
  const points = [];
  for (let sample = 0; sample <= 18; sample += 1) {
    const localZ = -4.5 + sample * 0.5;
    points.push(new THREE.Vector3(
      localX,
      4.65 + roofHeight(localX, localZ) + 0.035,
      -0.3 + localZ,
    ));
  }
  const ribGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 18, 0.035, 5, false);
  const ribMaterial = new THREE.MeshStandardMaterial({
    color: rib % 3 === 0 ? '#59605a' : '#424b47', roughness: 0.8,
  });
  const ribMesh = new THREE.Mesh(ribGeometry, ribMaterial);
  ribMesh.castShadow = true;
  ribMesh.receiveShadow = true;
  worldGroup.add(ribMesh);
}

// 右侧前景画框式廊柱，呼应当前生产项目的非对称构图。
for (const z of [5, 10, 15]) {
  addBox('gallery-column', 0.45, 6.5, 0.45, COLORS.wood, 11, 3.25, z);
  addBox('gallery-bracket', 1.1, 0.28, 1.1, COLORS.trim, 11, 5.9, z);
}
addBox('gallery-wall', 0.3, 5.5, 15, '#a4977e', 14, 2.75, 10);

// 最终步骤继续显示真实 renderer 统计，供团队记录，而不宣称任何性能结果。
const metrics = document.querySelector('#metrics');
frameCallbacks.push(() => {
  metrics.textContent = `draw calls: ${renderer.info.render.calls}\ntriangles: ${renderer.info.render.triangles}`;
});

roofMesh.name = 'readable-curved-main-roof';
window.learningApp.integratedWorld = worldGroup;
