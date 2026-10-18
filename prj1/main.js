import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {buildTerrace} from './terrace.js';
import {createLakeWater} from './water.js';

const $ = id => document.getElementById(id);
const background = new THREE.Color('#aebbbb');

let renderer;
try {
  renderer = new THREE.WebGLRenderer({canvas: $('scene'), antialias: true, preserveDrawingBuffer: true});
} catch (error) {
  $('error').hidden = false;
  $('error').textContent = 'WebGL is unavailable. Enable hardware acceleration in Chrome or Edge.';
  throw error;
}
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearColor(background);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = background;
scene.fog = new THREE.FogExp2(0xaebbbb, 0.012);
const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 220);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI * 0.48;
controls.minDistance = 8;
controls.maxDistance = 90;

scene.add(new THREE.HemisphereLight(0xb5c9d6, 0x45432e, 1.4));
const sun = new THREE.DirectionalLight(0xffcf8c, 3.8);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, {left: -35, right: 35, top: 35, bottom: -35, near: 0.1, far: 120});
sun.shadow.bias = -0.0001;
sun.shadow.normalBias = 0.012;
scene.add(sun);

const group = new THREE.Group();
scene.add(group);
const objects = [];
let lakeWater = null;

function mesh(geometry, color, position, scale = [1, 1, 1]) {
  const standard = new THREE.MeshStandardMaterial({color, roughness: 0.9});
  const object = new THREE.Mesh(geometry, standard);
  object.position.set(...position);
  object.scale.set(...scale);
  object.userData.standard = standard;
  object.castShadow = true;
  object.receiveShadow = true;
  group.add(object);
  objects.push(object);
  return object;
}

function build() {
  lakeWater?.dispose();
  lakeWater = null;
  for (const object of objects) {
    object.geometry.dispose();
    object.material.dispose();
  }
  objects.length = 0;
  group.clear();

  if ($('preset').value === 'landscape') {
    buildTerrace(mesh);
    lakeWater = createLakeWater(sun);
    group.add(lakeWater.mesh);
  } else {
    mesh(new THREE.PlaneGeometry(28, 28).rotateX(-Math.PI / 2), '#a4afa0', [0, -0.03, 0]);
    mesh(new THREE.SphereGeometry(1.6, 48, 32), '#34564d', [-4, 1.6, 0]);
    mesh(new THREE.BoxGeometry(2.6, 3.2, 2.6), '#34564d', [0, 1.6, 0]);
    mesh(new THREE.TorusKnotGeometry(1, 0.32, 120, 20), '#34564d', [4, 1.7, 0]);
    mesh(new THREE.ConeGeometry(1.8, 4, 48), '#34564d', [0, 2, -6]);
  }
  update();
  resetCamera();
}

function resetCamera() {
  if ($('preset').value === 'landscape') {
    camera.position.set(-12, 7.5, 33);
    controls.target.set(0, 3.8, -9);
  } else {
    camera.position.set(12, 9, 19);
    controls.target.set(0, 1, 0);
  }
  controls.update();
}

function update() {
  const angle = Number($('light').value) * Math.PI / 180;
  sun.position.set(Math.cos(angle), 0.85, Math.sin(angle)).normalize().multiplyScalar(40);
  group.scale.y = Number($('height').value);
  lakeWater?.syncSun();
  $('height-out').textContent = Number($('height').value).toFixed(2);
  $('light-out').textContent = $('light').value + '°';
}
for (const id of ['height', 'light']) $(id).addEventListener('input', update);
$('preset').addEventListener('change', build);
$('reset').onclick = () => {
  $('height').value = 1;
  $('light').value = 35;
  update();
  resetCamera();
};
$('export').onclick = () => {
  renderer.render(scene, camera);
  const link = document.createElement('a');
  link.href = renderer.domElement.toDataURL('image/png');
  link.download = 'proposal-' + $('preset').value + '.png';
  link.click();
};

new ResizeObserver(() => {
  const width = $('viewport').clientWidth;
  const height = $('viewport').clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}).observe($('viewport'));

let previousFrameTime;
function animate(timeMilliseconds) {
  // Use elapsed seconds so the water moves at the same speed at different frame rates.
  const deltaSeconds = previousFrameTime === undefined ? 0 : Math.min((timeMilliseconds - previousFrameTime) / 1000, 0.1);
  previousFrameTime = timeMilliseconds;
  lakeWater?.update(deltaSeconds);
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
build();
requestAnimationFrame(animate);

// Exposed only for repeatable local verification and proposal capture.
window.sceneApp = {renderer, scene, camera, controls, objects, update, resetCamera,
  get water() { return lakeWater?.mesh ?? null; }};
