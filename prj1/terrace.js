import * as THREE from 'three';

export function buildTerrace(mesh){
 let seed=921;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const stone='#86887d',wood='#512f24',tile='#303e3e',trim='#aa8651';
 const box=(x,y,z,w,h,d,c)=>mesh(new THREE.BoxGeometry(w,h,d),c,[x,y,z]);
 const rod=(a,b,r,c)=>{const av=new THREE.Vector3(...a),bv=new THREE.Vector3(...b),v=bv.clone().sub(av);const m=mesh(new THREE.CylinderGeometry(r*.8,r,v.length(),8),c,av.clone().add(bv).multiplyScalar(.5).toArray());m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize());return m;};
 function roof(x,y,z,w,d){
  const lift=(a,b)=>2*(1-b)+.58*b**6+.65*a**8*b**3;
  const g=new THREE.PlaneGeometry(w,d,32,28);g.rotateX(-Math.PI/2);const p=g.attributes.position;for(let i=0;i<p.count;i++)p.setY(i,lift(Math.abs(p.getX(i))*2/w,Math.abs(p.getZ(i))*2/d));g.computeVertexNormals();const m=mesh(g,tile,[x,y,z]);m.userData.standard.side=THREE.DoubleSide;
  for(let i=0;i<=w/.28;i++){const xx=-w/2+i*.28,pts=[];for(let j=0;j<=24;j++){const zz=-d/2+j*d/24;pts.push(new THREE.Vector3(x+xx,y+lift(Math.abs(xx)*2/w,Math.abs(zz)*2/d)+.025,z+zz));}mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),24,.04,5,false),i%3===0?'#59605a':'#424b47',[0,0,0]);}
  for(const sign of [-1,1]){const pts=[];for(let j=0;j<=30;j++){const xx=-w/2+w*j/30;pts.push(new THREE.Vector3(x+xx,y+lift(Math.abs(xx)*2/w,1),z+sign*d/2));}mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),30,.11,8,false),trim,[0,0,0]);}
  box(x,y+2.1,z,w,.2,.26,trim);
 }
 function rail(x1,z1,x2,z2,y){const n=Math.ceil(Math.hypot(x2-x1,z2-z1)/1.8);for(let i=0;i<=n;i++){const t=i/n,x=x1+(x2-x1)*t,z=z1+(z2-z1)*t;box(x,y+.62,z,.2,1.3,.2,stone);mesh(new THREE.SphereGeometry(.16,10,8),stone,[x,y+1.33,z]);}for(const h of [.35,1.1])rod([x1,y+h,z1],[x2,y+h,z2],.075,stone);}
 function hall(x,z,w,d,base){
  box(x,base-.45,z,w+2,.9,d+2,stone);box(x,base+1.9,z,w,3.8,d,'#c2b499');
  for(let xx=x-w/2+.4;xx<=x+w/2;xx+=1.6){rod([xx,base,z+d/2+.4],[xx,base+4.4,z+d/2+.4],.15,wood);box(xx,base+3.8,z+d/2+.4,.55,.2,.55,trim);box(xx,base+4,z+d/2+.4,.85,.18,.7,wood);}
  for(let xx=x-w/2+1;xx<x+w/2;xx+=1.8){box(xx,base+1.75,z+d/2+.02,1.4,2.8,.09,'#283736');for(let i=-3;i<=3;i++)box(xx+i*.19,base+1.75,z+d/2+.1,.045,2.8,.05,wood);for(let j=0;j<5;j++)box(xx,base+.55+j*.55,z+d/2+.11,1.4,.045,.06,wood);}
  for(const y of [base+.25,base+3.3,base+3.65])box(x,y,z+d/2+.16,w,.14,.2,wood);
  roof(x,base+4,z,w+2.8,d+3);
  for(const xx of [x-w*.35,x+w*.35]){rod([xx,base+3.7,z+d/2+.8],[xx,base+3,z+d/2+.8],.025,trim);const m=mesh(new THREE.SphereGeometry(.32,20,16),'#b65025',[xx,base+2.8,z+d/2+.8],[1,1.45,1]);m.userData.standard.emissive.set('#af511c');m.userData.standard.emissiveIntensity=.35;rod([xx,base+2.35,z+d/2+.8],[xx,base+1.95,z+d/2+.8],.025,trim);}
 }
 // Foreground terrace: separate slabs retain seams and subtle color variation.
 box(0,-.6,11,27,1.2,22,'#565e57');
 for(let i=0;i<18;i++)for(let j=0;j<14;j++){const c=new THREE.Color().setHSL(.12,.06,.34+rnd()*.09);const m=box(-12.8+i*1.5,.015,1+j*1.5,1.47,.12,1.47,c);m.userData.standard.roughness=.38+rnd()*.25;}
 rail(-13,1,-13,21,.1);rail(-13,1,-4,1,.1);rail(4,1,13,1,.1);
 for(let i=0;i<8;i++)box(0,-.1-i*.18,.7-i*.55,7,.3,.65,stone);
 // Main hall across a short causeway, with a second tier.
 box(0,-1,-9,22,1,18,'#6d766a');hall(0,-10,13,7,0);hall(0,-10,8,4,6.2);
 for(let i=0;i<14;i++)box(0,-1.2,-2+i*.28,6,.2,.26,stone);
 rail(-3,-2,-3,-.3,-1);rail(3,-2,3,-.3,-1);
 // Right-hand foreground gallery acts as a frame, not an entire diorama.
 for(const z of [7,13,19]){rod([12,0,z],[12,7,z],.25,wood);box(12,5.9,z,.9,.25,1,trim);box(12,6.3,z,1.3,.25,1.2,wood);}roof(15,6.5,12,9,23);
 box(16,3,12,.3,6,21,'#a4977e');
 // Distant pavilion across the lake.
 hall(-24,-29,7,5,-1);rail(-29,-25,-19,-25,-1);
 // Layered terrain, no spherical hills.
 for(let k=0;k<9;k++){const g=new THREE.PlaneGeometry(25,25,32,32);g.rotateX(-Math.PI/2);const p=g.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i),e=Math.max(0,1-Math.hypot(x,z)/13);p.setY(i,Math.pow(e,.7)*(13+k%3*5)*(1+.12*Math.sin(x*1.4+z)) -5);}g.computeVertexNormals();mesh(g,k%2?'#596f68':'#75867a',[-65+k*17,-2,-60-(k%2)*15]);}
 // Water uses shader normals for fine ripples; no simulation claimed.
 const water=mesh(new THREE.PlaneGeometry(300,300).rotateX(-Math.PI/2),'#516e6c',[0,-1.8,0]);water.castShadow=false;water.userData.standard.roughness=.28;water.userData.standard.metalness=.3;
 water.userData.standard.onBeforeCompile=s=>{s.fragmentShader=s.fragmentShader.replace('#include <normal_fragment_begin>','#include <normal_fragment_begin>\n normal.x += .065*sin(gl_FragCoord.x*.17+gl_FragCoord.y*.25); normal = normalize(normal);');};
 // Branch structure with thousands of small leaves rather than blob canopies.
 function tree(x,z,s){const base=[x,0,z];rod(base,[x+.3*s,4*s,z],.28*s,'#423d2b');const leaves=[];
  for(let j=0;j<11;j++){const a=j*2.4,by=(2.4+j*.18)*s,end=[x+Math.cos(a)*2.4*s,by+.8*s,z+Math.sin(a)*2*s];rod([x,by*.75,z],end,.09*s,'#423d2b');for(let i=0;i<90;i++)leaves.push([end[0]+(rnd()-.5)*2*s,end[1]+(rnd()-.5)*.8*s,end[2]+(rnd()-.5)*1.5*s]);}
  const g=new THREE.BufferGeometry(),v=[];for(const [a,b,c] of leaves){const t=.13*s,angle=rnd()*6.28;const point=k=>{const q=k/8*6.283;return [a+Math.cos(q)*t*Math.cos(angle)-Math.sin(q)*t*.4*Math.sin(angle),b+Math.sin(q)*t*.4,c+Math.cos(q)*t*Math.sin(angle)+Math.sin(q)*t*.4*Math.cos(angle)];};for(let k=0;k<8;k++)v.push(a,b,c,...point(k),...point(k+1));}g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));g.computeVertexNormals();const m=mesh(g,'#647448',[0,0,0]);m.userData.standard.side=THREE.DoubleSide;m.userData.standard.emissive.set('#3a4821');m.userData.standard.emissiveIntensity=.25;m.castShadow=false;m.receiveShadow=false;
 }
 tree(-18,6,1.7);tree(10,-8,1.4);tree(-10,-15,1.2);tree(19,18,1.2);
 for(let i=0;i<16;i++){const x=-14-rnd()*6,z=-3-rnd()*19;mesh(new THREE.DodecahedronGeometry(1,1),'#62695c',[x,-1,z],[1+rnd()*2,1+rnd()*2,1+rnd()*2]);}
}
