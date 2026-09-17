import * as THREE from 'three';
import { renderer } from '../../01_first_threejs_scene/src/main.js';
import { worldGroup } from '../../05_basic_pavilion/src/main.js';
import { sunLight } from '../../12_lighting/src/main.js';

const shadowsEnabled = new URLSearchParams(location.search).get('shadows') !== 'off';

// 光照决定表面有多亮；阴影则额外判断光源是否被其它物体挡住。
renderer.shadowMap.enabled = shadowsEnabled;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
sunLight.castShadow = shadowsEnabled;
sunLight.shadow.mapSize.set(1024, 1024);
Object.assign(sunLight.shadow.camera, { left: -24, right: 24, top: 24, bottom: -24, near: 0.1, far: 100 });
sunLight.shadow.bias = -0.0005;
sunLight.shadow.normalBias = 0.035;

// castShadow：物体是否写入光源的 shadow map；receiveShadow：是否读取阴影结果。
worldGroup.traverse((object) => {
  if (!object.isMesh) return;
  object.castShadow = shadowsEnabled;
  object.receiveShadow = shadowsEnabled;
});

console.info('阴影启用:', shadowsEnabled);
