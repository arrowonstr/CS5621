import {buildTerrace} from './terrace.js';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const $=id=>document.getElementById(id);
const paper=new THREE.Color('#aebbbb');
let renderer;
try{renderer=new THREE.WebGLRenderer({canvas:$('scene'),antialias:true,preserveDrawingBuffer:true});}catch(e){$('error').hidden=false;$('error').textContent='WebGL is unavailable. Enable hardware acceleration in Chrome or Edge.';throw e;}
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setClearColor(paper);
const scene=new THREE.Scene();scene.background=paper;scene.fog=new THREE.FogExp2(0xaebbbb,.012);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
const camera=new THREE.PerspectiveCamera(38,1,.1,220);
const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;controls.maxPolarAngle=Math.PI*.48;controls.minDistance=8;controls.maxDistance=90;
scene.add(new THREE.HemisphereLight(0xb5c9d6,0x45432e,1.4));
const sun=new THREE.DirectionalLight(0xffcf8c,3.8);scene.add(sun);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-35,right:35,top:35,bottom:-35,near:.1,far:120});sun.shadow.bias=-.0005;sun.shadow.normalBias=.035;
const group=new THREE.Group();scene.add(group);
const objects=[];
function mesh(geo,color,pos,scale=[1,1,1]){const standard=new THREE.MeshStandardMaterial({color,roughness:.9});const m=new THREE.Mesh(geo,standard);m.position.set(...pos);m.scale.set(...scale);m.userData={standard};m.castShadow=true;m.receiveShadow=true;group.add(m);objects.push(m);return m;}
function build(){for(const o of objects){o.geometry.dispose();o.userData.standard.dispose();}objects.length=0;group.clear();
if($('preset').value==='landscape'){
buildTerrace(mesh);
}else{mesh(new THREE.PlaneGeometry(28,28).rotateX(-Math.PI/2),'#a4afa0',[0,-.03,0]);mesh(new THREE.SphereGeometry(1.6,48,32),'#34564d',[-4,1.6,0]);mesh(new THREE.BoxGeometry(2.6,3.2,2.6),'#34564d',[0,1.6,0]);mesh(new THREE.TorusKnotGeometry(1,.32,120,20),'#34564d',[4,1.7,0]);mesh(new THREE.ConeGeometry(1.8,4,48),'#34564d',[0,2,-6]);}
update();resetCamera();}
function resetCamera(){if($('preset').value==='landscape'){camera.position.set(-12,7.5,33);controls.target.set(0,3.8,-9);}else{camera.position.set(12,9,19);controls.target.set(0,1,0);}controls.update();}
function update(){const angle=Number($('light').value)*Math.PI/180;sun.position.set(Math.cos(angle),.85,Math.sin(angle)).normalize().multiplyScalar(40);group.scale.y=Number($('height').value);for(const id of ['height','light'])$(id+'-out').textContent=id==='light'?$(id).value+'°':Number($(id).value).toFixed(2);}
for(const id of ['height','light'])$(id).addEventListener('input',update);
$('preset').addEventListener('change',build);
$('reset').onclick=()=>{$('height').value=1;$('light').value=35;update();resetCamera();};
function download(data,name){const a=document.createElement('a');a.href=data;a.download=name;a.click();}
$('export').onclick=()=>{renderer.render(scene,camera);download(renderer.domElement.toDataURL('image/png'),'proposal-'+$('preset').value+'.png');};
new ResizeObserver(()=>{const w=$('viewport').clientWidth,h=$('viewport').clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);}).observe($('viewport'));
function animate(){controls.update();renderer.render(scene,camera);requestAnimationFrame(animate);}build();requestAnimationFrame(animate);
// Exposed only for repeatable local verification and proposal capture.
window.sceneApp={renderer,scene,camera,controls,objects,update,resetCamera};
