import * as THREE from 'three';
import {ROOF_THICKNESS, roofHeight, createRoofGeometry, createRoofInfillGeometry, createHeightfieldSolid, createPlatformGeometry} from './architecture.js';

export function buildTerrace(mesh){
 let seed=921;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const stone='#86887d',wood='#512f24',tile='#303e3e',trim='#aa8651';
 const box=(x,y,z,w,h,d,c)=>mesh(new THREE.BoxGeometry(w,h,d),c,[x,y,z]);
 const floor=(m,role)=>{m.userData.walkable=true;m.userData.structure=role;return m;};
 const railPosts=new Set();
 const rod=(a,b,r,c)=>{const av=new THREE.Vector3(...a),bv=new THREE.Vector3(...b),v=bv.clone().sub(av);const m=mesh(new THREE.CylinderGeometry(r*.8,r,v.length(),8),c,av.clone().add(bv).multiplyScalar(.5).toArray());m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize());return m;};
 function roof(x,y,z,w,d){
  const m=mesh(createRoofGeometry(w,d),tile,[x,y,z]);
  m.userData.structure='roof';
  for(let i=0;i<=w/.28;i++){const xx=-w/2+i*.28,pts=[];for(let j=0;j<=24;j++){const zz=-d/2+j*d/24;pts.push(new THREE.Vector3(x+xx,y+roofHeight(xx,zz,w,d)+.025,z+zz));}mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),24,.04,5,false),i%3===0?'#59605a':'#424b47',[0,0,0]);}
  for(const sign of [-1,1]){const pts=[];for(let j=0;j<=30;j++){const xx=-w/2+w*j/30;pts.push(new THREE.Vector3(x+xx,y+roofHeight(xx,sign*d/2,w,d)-.035,z+sign*d/2));}mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),30,.13,8,false),trim,[0,0,0]);}
  box(x,y+2.1,z,w,.2,.26,trim);
 }
 function rail(x1,z1,x2,z2,y){
  const n=Math.ceil(Math.hypot(x2-x1,z2-z1)/1.8);
  for(let i=0;i<=n;i++){
   const t=i/n,x=x1+(x2-x1)*t,z=z1+(z2-z1)*t;
   const key=[x,y,z].map(value=>value.toFixed(5)).join(',');
   if(railPosts.has(key))continue;
   railPosts.add(key);
   const post=box(x,y+.58,z,.2,1.38,.2,stone);post.userData.structure='railing-post';
   mesh(new THREE.SphereGeometry(.16,10,8),stone,[x,y+1.33,z]);
  }
  for(const h of [.35,1.1])rod([x1,y+h,z1],[x2,y+h,z2],.075,stone);
 }
 function hall(x,z,w,d,base){
  floor(box(x,base-.45,z,w+2,.9,d+2,stone),'hall-platform');
  const wall=box(x,base+1.9,z,w,3.8,d,'#c2b499');wall.userData.structure='hall-wall';
  const roofW=w+2.8,roofD=d+3,roofBase=base+4;
  const infill=mesh(createRoofInfillGeometry(w,d,roofW,roofD,4,3.8),'#c2b499',[x,base,z]);
  infill.userData.structure='wall-infill';
  for(let xx=x-w/2+.4;xx<=x+w/2;xx+=1.6){
   const zz=z+d/2+.4,underside=roofBase+roofHeight(xx-x,zz-z,roofW,roofD)-ROOF_THICKNESS;
   const foot=box(xx,base+.1,zz,.46,.22,.46,stone);foot.userData.structure='column-foot';
   const column=rod([xx,base+.16,zz],[xx,underside-.29,zz],.15,wood);column.userData.structure='column';
   box(xx,underside-.29,zz,.55,.18,.55,trim);
   box(xx,underside-.10,zz,.85,.22,.7,wood);
  }
  for(let xx=x-w/2+1;xx<x+w/2;xx+=1.8){box(xx,base+1.75,z+d/2+.02,1.4,2.8,.09,'#283736');for(let i=-3;i<=3;i++)box(xx+i*.19,base+1.75,z+d/2+.1,.045,2.8,.05,wood);for(let j=0;j<5;j++)box(xx,base+.55+j*.55,z+d/2+.11,1.4,.045,.06,wood);}
  for(const y of [base+.25,base+3.3,base+3.65])box(x,y,z+d/2+.16,w,.14,.2,wood);
  roof(x,roofBase,z,roofW,roofD);
  for(const xx of [x-w*.35,x+w*.35]){rod([xx,base+3.7,z+d/2+.8],[xx,base+3,z+d/2+.8],.025,trim);const m=mesh(new THREE.SphereGeometry(.32,20,16),'#b65025',[xx,base+2.8,z+d/2+.8],[1,1.45,1]);m.userData.standard.emissive.set('#af511c');m.userData.standard.emissiveIntensity=.35;rod([xx,base+2.35,z+d/2+.8],[xx,base+1.95,z+d/2+.8],.025,trim);}
 }
 // One L-shaped foundation replaces intersecting terrace and gallery boxes.
 const outline=[[-13.5,0],[18.5,0],[18.5,23.5],[11.5,23.5],[11.5,22],[-13.5,22]];
 const deck=floor(mesh(createPlatformGeometry(outline,2.2),'#565e57',[0,0,0]),'terrace-foundation');
 deck.userData.footprint=outline;
 function paving(i,j){
  const c=new THREE.Color().setHSL(.12,.06,.34+rnd()*.09);
  const m=floor(box(-12.75+i*1.5,.015,1+j*1.5,1.47,.12,1.47,c),'paving');
  m.userData.standard.roughness=.38+rnd()*.25;
 }
 for(let i=0;i<18;i++)for(let j=0;j<14;j++)paving(i,j);
 for(let i=18;i<21;i++)for(let j=0;j<15;j++)paving(i,j);
 paving(17,14);
 rail(-13,1,-13,21,.075);rail(-13,1,-4,1,.075);rail(4,1,13,1,.075);
 for(let i=0;i<3;i++){
  const top=-.1-i*.15,bottom=-.6;
  floor(box(0,(top+bottom)/2,-.25-i*.45,7,top-bottom,.5,stone),'stair');
 }
 // Main hall across a short causeway, with a second tier.
 floor(box(0,-1.7,-9,24,2.4,18,'#6d766a'),'hall-foundation');hall(0,-10,13,7,0);
 // An enclosed transition supports the upper floor all the way down to the lower roof.
 const upperSupport=mesh(createHeightfieldSolid(9.4,5.4,()=>6.12,
  (x,z)=>4+roofHeight(x,z,15.8,10)-.08),'#a99a7d',[0,0,-10]);
 upperSupport.userData.structure='upper-floor-support';
 hall(0,-10,8,4,6.2);
 floor(box(0,-.47,-2.75,6.4,.14,2.7,stone),'path');
 for(let i=0;i<3;i++){
  const top=-.1-i*.15,bottom=-.6;
  floor(box(0,(top+bottom)/2,-5.25+i*.45,6.4,top-bottom,.5,stone),'stair');
 }
 rail(-3,-4.35,-3,-1.15,-.4);rail(3,-4.35,3,-1.15,-.4);
 // Right-hand foreground gallery acts as a frame, not an entire diorama.
 const galleryUnder=(x,z)=>6.5+roofHeight(x-15,z-12,9,23)-ROOF_THICKNESS;
 for(const z of [7,13,19]){
  const top=galleryUnder(12,z);
  const foot=box(12,.17,z,.8,.24,.8,stone);foot.userData.structure='column-foot';
  const column=rod([12,.23,z],[12,top-.35,z],.25,wood);column.userData.structure='column';
  box(12,top-.33,z,.9,.24,1,trim);box(12,top-.11,z,1.3,.26,1.2,wood);
 }
 // The gallery beam follows the changing roof height along the open colonnade.
 for(let i=0;i<32;i++){
  const z1=1.5+i*21/32,z2=1.5+(i+1)*21/32;
  rod([12,galleryUnder(12,z1)-.11,z1],[12,galleryUnder(12,z2)-.11,z2],.14,wood);
 }
 roof(15,6.5,12,9,23);
 const galleryWall=box(16,3,12,.3,6,21,'#a4977e');galleryWall.userData.structure='gallery-wall';
 const galleryInfill=mesh(createHeightfieldSolid(.3,21,
  (x,z)=>galleryUnder(16+x,12+z)+.02,()=>5.97),'#a4977e',[16,0,12]);
 galleryInfill.userData.structure='gallery-wall-infill';
 // Distant pavilion across the lake.
 hall(-24,-29,7,5,-1);rail(-28,-25.85,-20,-25.85,-1);
 // Layered terrain, no spherical hills.
 for(let k=0;k<9;k++){const g=new THREE.PlaneGeometry(25,25,32,32);g.rotateX(-Math.PI/2);const p=g.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i),e=Math.max(0,1-Math.hypot(x,z)/13);p.setY(i,Math.pow(e,.7)*(13+k%3*5)*(1+.12*Math.sin(x*1.4+z)) -5);}g.computeVertexNormals();mesh(g,k%2?'#596f68':'#75867a',[-65+k*17,-2,-60-(k%2)*15]);}
 // Branch structure with thousands of small leaves rather than blob canopies.
 function tree(x,z,s,ground){const base=[x,ground,z];const trunk=rod(base,[x+.3*s,ground+4*s,z],.28*s,'#423d2b');trunk.userData.structure='tree-trunk';const leaves=[];
  for(let j=0;j<11;j++){const a=j*2.4,by=(2.4+j*.18)*s,end=[x+Math.cos(a)*2.4*s,ground+by+.8*s,z+Math.sin(a)*2*s];const branch=rod([x,ground+by*.75,z],end,.09*s,'#423d2b');branch.userData.structure='tree-branch';for(let i=0;i<90;i++)leaves.push([end[0]+(rnd()-.5)*2*s,end[1]+(rnd()-.5)*.8*s,end[2]+(rnd()-.5)*1.5*s]);}
  const g=new THREE.BufferGeometry(),v=[];for(const [a,b,c] of leaves){const t=.13*s,angle=rnd()*6.28;const point=k=>{const q=k/8*6.283;return [a+Math.cos(q)*t*Math.cos(angle)-Math.sin(q)*t*.4*Math.sin(angle),b+Math.sin(q)*t*.4,c+Math.cos(q)*t*Math.sin(angle)+Math.sin(q)*t*.4*Math.cos(angle)];};for(let k=0;k<8;k++)v.push(a,b,c,...point(k),...point(k+1));}g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));g.computeVertexNormals();const m=mesh(g,'#647448',[0,0,0]);m.userData.structure='tree-leaves';m.userData.standard.side=THREE.DoubleSide;m.userData.standard.emissive.set('#3a4821');m.userData.standard.emissiveIntensity=.25;m.castShadow=false;m.receiveShadow=false;
 }
 // Shoreline trees grow from visible islands, while the hall trees sit in grounded planters.
 for(const [x,z,rx,rz] of [[-21.5,6,4.8,4.8],[24,17,4.2,4.2]]){
  const bank=mesh(new THREE.SphereGeometry(1,24,16),'#68715a',[x,-1.2,z],[rx,1.3,rz]);
  bank.userData.structure='tree-ground';
 }
 for(const [x,z] of [[11,-8],[-11,-15]]){
  const planter=mesh(new THREE.CylinderGeometry(.82,.9,.42,20),stone,[x,-.31,z]);
  planter.userData.structure='tree-planter';
  const soil=mesh(new THREE.CylinderGeometry(.7,.7,.05,20),'#4c5037',[x,-.095,z]);
  soil.userData.structure='tree-ground';
 }
 tree(-21.5,6,1.5,.05);tree(11,-8,.8,-.11);tree(-11,-15,.8,-.11);tree(24,17,1.1,.05);
 for(let i=0;i<16;i++){const x=-14-rnd()*6,z=-3-rnd()*19;mesh(new THREE.DodecahedronGeometry(1,1),'#62695c',[x,-1,z],[1+rnd()*2,1+rnd()*2,1+rnd()*2]);}
}
