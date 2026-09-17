import * as THREE from 'three';
import { worldGroup } from '../../05_basic_pavilion/src/main.js';
import { random } from '../../14_seeded_randomness/src/main.js';

export const natureGroup = new THREE.Group();
worldGroup.add(natureGroup);

function createTree(x, z, scale) {
  const tree = new THREE.Group();
  tree.position.set(x, 0, z);
  tree.scale.setScalar(scale);

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.3, 4, 10),
    new THREE.MeshStandardMaterial({ color: '#423d2b', roughness: 1 }),
  );
  trunk.position.y = 2;
  trunk.castShadow = true;
  tree.add(trunk);

  // 自定义 BufferGeometry：每片叶子是一个三角形，顶点直接写入 position attribute。
  const leafVertices = [];
  for (let leaf = 0; leaf < 90; leaf += 1) {
    const angle = random() * Math.PI * 2;
    const radius = 0.4 + random() * 1.7;
    const centerX = Math.cos(angle) * radius;
    const centerY = 3.2 + random() * 2.1;
    const centerZ = Math.sin(angle) * radius;
    const size = 0.18 + random() * 0.14;
    leafVertices.push(
      centerX - size, centerY, centerZ,
      centerX + size, centerY, centerZ,
      centerX, centerY + size * 1.8, centerZ + size * 0.3,
    );
  }
  const leafGeometry = new THREE.BufferGeometry();
  leafGeometry.setAttribute('position', new THREE.Float32BufferAttribute(leafVertices, 3));
  leafGeometry.computeVertexNormals();
  const leaves = new THREE.Mesh(
    leafGeometry,
    new THREE.MeshStandardMaterial({ color: '#647448', roughness: 0.9, side: THREE.DoubleSide }),
  );
  leaves.castShadow = true;
  tree.add(leaves);
  natureGroup.add(tree);
}

createTree(-9, 4, 1.2);
createTree(8, -4, 1);
createTree(-7, -8, 0.85);

// 岩石只在一个手工选定区域内随机位置/缩放；没有坡度或水位约束。
for (let index = 0; index < 12; index += 1) {
  const rock = new THREE.Mesh(
    new THREE.DodecahedronGeometry(0.65, 1),
    new THREE.MeshStandardMaterial({ color: '#62695c', roughness: 1 }),
  );
  rock.position.set(-9 - random() * 4, 0.15, -2 - random() * 10);
  rock.scale.set(0.7 + random() * 1.5, 0.7 + random(), 0.7 + random() * 1.4);
  rock.castShadow = true;
  rock.receiveShadow = true;
  natureGroup.add(rock);
}
