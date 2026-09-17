# Step 10 — Surface Normals

## Goal
Separate surface shape from light-facing orientation.
## Why This Matters to Lakeside Pavilion
Production roof, mountains, and custom leaves recompute normals after changing vertices.
## Concepts
Normals, standard-material shading, stale versus recomputed normals.
## What We Build in This Step
URL-controlled comparison between flat +Y normals and computed mountain normals.
## What Changed From the Previous Step
Mountain positions stay fixed; only their normal attribute changes.
## Files Changed From Previous Step
New Step 10 source files.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open `http://127.0.0.1:5631/10_surface_normals/src/?normals=off`, then `?normals=on`.
## What to Observe
Silhouette remains the same; interior light gradients should change.
## Key Code to Understand
`setAttribute('normal', ...)` and `computeVertexNormals()`.
## Mandarin Concept Summary
Position 决定形状，normal 决定表面朝向如何参与光照；移动顶点后应更新 normal。
## Questions We Should Be Able to Answer
Why can geometry look shaped while its shading still looks flat?
## Connection to the Next Step
Step 11 varies material properties that consume normals and light.
