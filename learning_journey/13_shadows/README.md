# Step 13 — Shadows

## Goal
Enable and isolate cast/receive shadow behavior.
## Why This Matters to Lakeside Pavilion
The production renderer uses a directional shadow map across most meshes.
## Concepts
Lighting versus visibility/occlusion, shadow camera, map resolution, cost.
## What We Build in This Step
Optional PCF soft shadow mapping for the existing lit scene.
## What Changed From the Previous Step
No geometry/material layout change; shadow-pass settings and object flags are added.
## Files Changed From Previous Step
New Step 13 source files.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open `http://127.0.0.1:5631/13_shadows/src/?shadows=off`, then `?shadows=on`.
## What to Observe
Direct lighting exists in both; cast occlusion appears only with shadows on.
## Key Code to Understand
`shadowMap.enabled`, `sun.castShadow`, mesh `castShadow/receiveShadow`.
## Mandarin Concept Summary
灯光计算表面朝向的亮度；阴影额外从光源视角判断是否被遮挡，两者不是同一件事。
## Questions We Should Be Able to Answer
Why do both light and per-object shadow flags matter?
## Connection to the Next Step
Step 14 adds reproducible decorative variation.
