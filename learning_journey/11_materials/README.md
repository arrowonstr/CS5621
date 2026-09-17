# Step 11 — Materials

## Goal
Compare roughness, metalness, and emissive properties on Standard materials.
## Why This Matters to Lakeside Pavilion
The production scene uses rough stone/wood, metallic-looking water, and emissive lantern/leaf accents.
## Concepts
Geometry versus surface appearance, PBR controls, emissive contribution.
## What We Build in This Step
A material-study sphere and an emissive lantern beside the pavilion.
## What Changed From the Previous Step
Adds controlled material examples; geometry pipeline remains unchanged.
## Files Changed From Previous Step
New Step 11 source files.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/11_materials/src/?roughness=0.1&metalness=0>.
## What to Observe
Low roughness concentrates highlights; emissive appears bright but does not light neighbors.
## Key Code to Understand
`MeshStandardMaterial({roughness, metalness, emissive})`.
## Mandarin Concept Summary
Geometry 决定轮廓；材质参数决定光怎样从表面返回相机，emissive 也不等于真实光源。
## Questions We Should Be Able to Answer
What changes when roughness increases? Why is wood normally nonmetallic?
## Connection to the Next Step
Step 12 replaces the temporary light with the production-style two-light setup.
