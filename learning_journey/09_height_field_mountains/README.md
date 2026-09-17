# Step 09 — Height-Field Mountains

## Goal
Build layered background mountains with an analytic height equation.
## Why This Matters to Lakeside Pavilion
Production mountains are displaced planes, not spherical hills or noise terrain.
## Concepts
Height field `(x,z) → y`, radial falloff, periodic sine detail, layer composition.
## What We Build in This Step
Five offset mountain surfaces behind the pavilion.
## What Changed From the Previous Step
Adds landscape depth while preserving the roof/pavilion.
## Files Changed From Previous Step
New Step 09 source files.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/09_height_field_mountains/src/>.
## What to Observe
Each local X/Z has one Y; no caves/overhangs; sine detail is visibly periodic.
## Key Code to Understand
`radialFalloff`, `layerAmplitude`, `periodicDetail`, `setY`.
## Mandarin Concept Summary
这是解析高度场，不是 Perlin/Simplex noise；规律公式和多层网格共同形成远山。
## Questions We Should Be Able to Answer
Why is this a height field? Why is it not procedural noise?
## Connection to the Next Step
Step 10 isolates how normals shade these displaced surfaces.
