import * as THREE from 'three';
import { scene, firstCube } from '../../01_first_threejs_scene/src/main.js';
import { standardCube, sphere } from '../../02_geometry_material_mesh/src/main.js';

// Three.js 默认 +Y 向上。AxesHelper 中 X 红、Y 绿、Z 蓝，帮助我们读取世界坐标。
export const axes = new THREE.AxesHelper(4);
scene.add(axes);

// position 是平移；这里把物体放到不同的世界位置。
firstCube.position.set(-3, 0.8, 0);
standardCube.position.set(0, 1, 0);
sphere.position.set(3, 1.4, 0);

// rotation 使用弧度。绕 Y 旋转会改变立方体朝向，但不会改变中心位置。
standardCube.rotation.y = Math.PI / 4;

// scale 是局部缩放。非均匀缩放可以把球压成椭球。
sphere.scale.set(1, 1.35, 0.75);

// Group 是父坐标系。子物体的位置先在 group 局部空间解释，再受父变换影响。
export const transformGroup = new THREE.Group();
const child = new THREE.Mesh(
  new THREE.BoxGeometry(0.7, 0.7, 0.7),
  new THREE.MeshStandardMaterial({ color: '#815a8d' }),
);
child.position.set(0, 1.5, 0); // 相对父节点的局部坐标。
transformGroup.position.set(0, 0, -3);
transformGroup.rotation.y = Math.PI / 6;
transformGroup.add(child);
scene.add(transformGroup);
