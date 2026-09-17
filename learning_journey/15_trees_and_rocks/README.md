# Step 15 — Trees and Rocks

## Goal
Add simple vegetation, rocks, and direct custom geometry.
## Why This Matters to Lakeside Pavilion
These elements frame the production pavilion and demonstrate deterministic decoration.
## Concepts
Groups, primitive trunk/rock meshes, custom leaf triangles, seeded variation.
## What We Build in This Step
Three trees, custom BufferGeometry leaves, and twelve rocks.
## What Changed From the Previous Step
The seeded sequence now controls leaf/rock details after terrace tiles.
## Files Changed From Previous Step
New Step 15 source files.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/15_trees_and_rocks/src/?seed=921>.
## What to Observe
Tree positions are authored; leaf and rock variation is seeded. No slope/water constraint exists.
## Key Code to Understand
`createTree`, `Float32BufferAttribute`, rock loop.
## Mandarin Concept Summary
程序化对象可以由“固定构图 + 可复现细节变化”组成，不必假装存在地形约束算法。
## Questions We Should Be Able to Answer
Which placements are fixed and which properties consume random numbers?
## Connection to the Next Step
Step 16 places a flat water surface beneath the composition.
