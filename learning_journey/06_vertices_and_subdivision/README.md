# Step 06 — Vertices, Triangles, Subdivision

## Goal
See how a plane is represented and how subdivision changes available vertices.
## Why This Matters to Lakeside Pavilion
Roofs and mountains can curve only because their planes contain many vertices.
## Concepts
BufferGeometry, position attribute, indexed triangles, wireframe, tessellation cost.
## What We Build in This Step
A side learning plane with selectable 1×1, 8×8, or 32×32 subdivisions.
## What Changed From the Previous Step
Adds one diagnostic plane; pavilion remains unchanged.
## Files Changed From Previous Step
New Step 06 source files.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/06_vertices_and_subdivision/src/?segments=8>.
## What to Observe
Wireframe density and console vertex/triangle counts.
## Key Code to Understand
`PlaneGeometry`, `attributes.position.count`, `index.count / 3`.
## Mandarin Concept Summary
细分增加可移动顶点与三角形；它提供更平滑的形状表达，同时提高内存与绘制成本。
## Questions We Should Be Able to Answer
Why can a 1×1 plane not represent detailed curvature?
## Connection to the Next Step
Step 07 moves these vertices in Y.
