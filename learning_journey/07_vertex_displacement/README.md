# Step 07 — Vertex Displacement

## Goal
Turn a flat subdivided plane into a height surface by changing vertex Y.
## Why This Matters to Lakeside Pavilion
The production roof and mountains use this exact data-flow idea.
## Concepts
Read X/Z, compute height, write Y, mark buffer updated, amplitude.
## What We Build in This Step
The Step 06 plane becomes a sinusoidal surface.
## What Changed From the Previous Step
Only the plane's position attribute is modified.
## Files Changed From Previous Step
New additive Step 07 module.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/07_vertex_displacement/src/?amplitude=1.2>.
## What to Observe
Wireframe vertices rise/fall while X/Z layout remains fixed.
## Key Code to Understand
`getX/getZ`, height formula, `setY`, `needsUpdate`.
## Mandarin Concept Summary
顶点位移就是按输入坐标计算新位置；本项目把 X/Z 映射为高度 Y。
## Questions We Should Be Able to Answer
What does amplitude change? Why does subdivision affect curve quality?
## Connection to the Next Step
Step 08 applies displacement to the pavilion roof.
