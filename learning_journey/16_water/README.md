# Step 16 — Water

## Goal
Distinguish flat water geometry from a shading-normal effect.
## Why This Matters to Lakeside Pavilion
Production water is a flat plane with material/shader styling, not fluid simulation.
## Concepts
Plane geometry, roughness/metalness, fragment normal perturbation, silhouette versus shading.
## What We Build in This Step
A large flat lake with optional static screen-space ripple normals.
## What Changed From the Previous Step
Adds one plane and optionally modifies its compiled Standard-material shader.
## Files Changed From Previous Step
New Step 16 source files.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open `http://127.0.0.1:5631/16_water/src/?ripples=off`, then `?ripples=on`.
## What to Observe
The water outline remains planar; only light response should gain fine variation.
## Key Code to Understand
`PlaneGeometry`, water material, `onBeforeCompile` replacement.
## Mandarin Concept Summary
几何位移会改变顶点和轮廓；shading-normal 扰动只改变光照计算，不会产生真实波浪形状。
## Questions We Should Be Able to Answer
Why is this not simulation, reflection, or geometric waves?
## Connection to the Next Step
Step 17 adds depth through distance fog.
