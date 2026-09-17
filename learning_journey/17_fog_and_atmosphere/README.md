# Step 17 — Fog and Atmosphere

## Goal
Use exponential fog to clarify distance layers.
## Why This Matters to Lakeside Pavilion
Production `FogExp2` blends distant mountains into the background.
## Concepts
Distance-based attenuation, density, background/fog color coordination.
## What We Build in This Step
Optional fog density with matched background and tone mapping.
## What Changed From the Previous Step
Only scene/renderer atmosphere settings are added.
## Files Changed From Previous Step
New Step 17 source files.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/17_fog_and_atmosphere/src/?fog=0.012>.
## What to Observe
Distant surfaces fade more than near pavilion geometry.
## Key Code to Understand
`FogExp2(color,density)`, scene background, tone mapping.
## Mandarin Concept Summary
雾按相机距离衰减物体颜色；它不会移动山体，只改变远处像素与背景融合程度。
## Questions We Should Be Able to Answer
Why should background and fog colors usually coordinate?
## Connection to the Next Step
Step 18 lets the viewer inspect depth interactively.
