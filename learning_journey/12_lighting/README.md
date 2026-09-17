# Step 12 — Lighting

## Goal
Use a HemisphereLight as fill and DirectionalLight as a sun.
## Why This Matters to Lakeside Pavilion
This matches the production lighting roles and light-angle control.
## Concepts
Fill light, parallel directional light, normal-dependent shading.
## What We Build in This Step
A cool/warm hemisphere fill plus warm directional sun.
## What Changed From the Previous Step
Removes the early single white light and installs the target lighting model.
## Files Changed From Previous Step
New Step 12 source files.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/12_lighting/src/?light=35>.
## What to Observe
The sun provides directional definition; hemisphere light prevents fully black unlit areas.
## Key Code to Understand
Light constructors and `setSunAngle`.
## Mandarin Concept Summary
半球光负责柔和填充，方向光负责类似太阳的主方向；表面 normal 决定受光强弱。
## Questions We Should Be Able to Answer
Why does moving a directional light change direction even though its rays are parallel?
## Connection to the Next Step
Step 13 adds occlusion-based shadow maps.
