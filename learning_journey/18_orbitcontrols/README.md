# Step 18 — OrbitControls

## Goal
Inspect the scene through orbit, dolly, pan, damping, and limits.
## Why This Matters to Lakeside Pavilion
The production interaction model is terrain/model inspection rather than player physics.
## Concepts
Camera target, control input, damping, distance/polar constraints.
## What We Build in This Step
Interactive camera controls registered into the existing single render loop.
## What Changed From the Previous Step
Adds camera interaction; scene construction stays unchanged.
## Files Changed From Previous Step
New Step 18 source files.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/18_orbitcontrols/src/>.
## What to Observe
Left drag orbits, wheel dollies, right drag pans; damping continues briefly after input.
## Key Code to Understand
Controls constructor, target, limits, per-frame `update()`.
## Mandarin Concept Summary
OrbitControls 改变相机围绕目标点的位置；damping 需要每帧 update，限制可防止穿模或翻到水下。
## Questions We Should Be Able to Answer
Why does damping require the render loop even when the scene itself is static?
## Connection to the Next Step
Step 19 connects native HTML inputs to scene parameters.
