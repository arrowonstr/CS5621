# Step 01 — First Three.js Scene

## Goal
Render one cube with the smallest complete Three.js pipeline.
## Why This Matters to Lakeside Pavilion
The production pavilion still depends on the same Scene → Camera → Renderer foundation.
## Concepts
Three.js vs WebGL, scene, perspective camera, renderer, render loop.
## What We Build in This Step
A `MeshBasicMaterial` cube on a gray canvas.
## What Changed From the Previous Step
First runnable graphics code.
## Files Changed From Previous Step
`src/index.html`, `src/main.js`.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/01_first_threejs_scene/src/>.
## What to Observe
One green cube with perspective; the camera is above and in front of it.
## Key Code to Understand
`new THREE.Scene`, `PerspectiveCamera`, `WebGLRenderer`, `renderer.render`.
## Mandarin Concept Summary
Scene 装对象，Camera 定义观察方式，Renderer 把二者变成 canvas 像素；Three.js 在内部使用 WebGL。
## Questions We Should Be Able to Answer
What do FOV, near, and far mean? Why is Three.js not the same thing as WebGL?
## Connection to the Next Step
Step 02 separates geometry, material, and mesh.
