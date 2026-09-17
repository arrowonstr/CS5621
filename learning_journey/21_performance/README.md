# Step 21 — Performance

## Goal
Measure draw calls and triangles instead of claiming optimization by intuition.
## Why This Matters to Lakeside Pavilion
The production audit counted 911 mesh requests; separate objects/shadows are a likely cost.
## Concepts
Mesh count, draw calls, triangle count, shared resources, InstancedMesh, shadow cost.
## What We Build in This Step
A controlled 100-cube comparison between separate Mesh objects and one InstancedMesh.
## What Changed From the Previous Step
Temporarily hides the pavilion and displays an isolated measurement lab.
## Files Changed From Previous Step
Mode select, metrics overlay, performance module.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/21_performance/src/>.
## What to Observe
Record—not assume—`renderer.info.render.calls` and triangles for both modes.
## Key Code to Understand
100 `Mesh` loop, `InstancedMesh`, instance matrices, `renderer.info`.
## Mandarin Concept Summary
相同三角形可以用不同提交方式绘制；实例化主要减少 draw call，不一定减少可见三角形数量。
## Questions We Should Be Able to Answer
Which metric changes most? Why should measurements include browser/device/settings?
## Connection to the Next Step
Step 22 removes the lab and restores an integrated readable pavilion.
