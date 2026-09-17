# Step 02 — Geometry, Material, Mesh

## Goal
Explain `Mesh = Geometry + Material` by comparing visible objects.
## Why This Matters to Lakeside Pavilion
Every pavilion, tree, rock, mountain, and water object uses this relationship.
## Concepts
Box/Sphere geometry, Basic vs Standard material, light-responsive shading.
## What We Build in This Step
Two boxes and a sphere; Basic stays flat-colored while Standard responds to a directional light.
## What Changed From the Previous Step
Adds geometry/material comparison and the first light.
## Files Changed From Previous Step
New Step 02 `src/index.html` and additive `src/main.js`.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/02_geometry_material_mesh/src/>.
## What to Observe
The Basic cube lacks light-dependent modeling; Standard objects show shape through shading.
## Key Code to Understand
`BoxGeometry`, `SphereGeometry`, `MeshBasicMaterial`, `MeshStandardMaterial`, `Mesh`.
## Mandarin Concept Summary
Geometry 定义“长什么形”，Material 定义“表面怎样被画”，Mesh 把二者组合并放入场景。
## Questions We Should Be Able to Answer
Why does Standard material need a light while Basic material does not?
## Connection to the Next Step
Step 03 moves, rotates, scales, and groups meshes.
