import * as THREE from 'three';
import {Water} from 'three/addons/objects/Water.js';

export const WATER_LEVEL = -1.8;
export const RIPPLE_SPEED = 0.35;

function loadWaterNormals() {
  // This is the texture used by the official Three.js water example, stored locally.
  const url = new URL('./assets/waternormals.jpg', import.meta.url);
  const texture = new THREE.TextureLoader().load(url.href);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.NoColorSpace;
  return texture;
}

export function createLakeWater(sun, waterNormals = loadWaterNormals()) {
  // 1. Water is a mesh with its own shader and a second camera for reflections.
  const water = new Water(new THREE.PlaneGeometry(300, 300), {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals,
    waterColor: 0x335a52,
    sunColor: sun.color,
    sunDirection: new THREE.Vector3(),
    distortionScale: 1.6,
    fog: true,
  });

  // Rotate the mesh, not its geometry: Water also uses this rotation for its mirror camera.
  water.rotation.x = -Math.PI / 2;
  water.position.y = WATER_LEVEL;
  water.receiveShadow = true;
  water.name = 'Lake water (Three.js Water)';
  water.userData.structure = 'water';

  const uniforms = water.material.uniforms;
  uniforms.size.value = 4;
  const targetPosition = new THREE.Vector3();
  const reflectionTarget = uniforms.mirrorSampler.value.renderTarget;
  let disposed = false;

  // 2. A time uniform moves the normal-map samples. The actual plane stays flat.
  function update(deltaSeconds) {
    uniforms.time.value += deltaSeconds * RIPPLE_SPEED;
  }

  // 3. The water shader has its own sun settings, so follow the scene's sun explicitly.
  function syncSun() {
    sun.getWorldPosition(uniforms.sunDirection.value);
    sun.target.getWorldPosition(targetPosition);
    uniforms.sunDirection.value.sub(targetPosition).normalize();
    uniforms.sunColor.value.copy(sun.color);
  }

  // Release the extra reflection buffer as well as the mesh when switching scenes.
  function dispose() {
    if (disposed) return;
    disposed = true;
    reflectionTarget.dispose();
    waterNormals.dispose();
    water.geometry.dispose();
    water.material.dispose();
  }

  syncSun();
  return {mesh: water, update, syncSun, dispose};
}
