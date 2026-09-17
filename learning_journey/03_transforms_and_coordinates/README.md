# Step 03 — Transforms and Coordinates

## Goal
Use position, rotation, scale, axes, and a parent group.
## Why This Matters to Lakeside Pavilion
The production code positions every primitive and vertically scales the whole scene group.
## Concepts
+Y up, local/world coordinates, transform hierarchy.
## What We Build in This Step
Transformed objects, AxesHelper, and one child in a rotated parent group.
## What Changed From the Previous Step
Adds transforms and a hierarchy without changing renderer architecture.
## Files Changed From Previous Step
New Step 03 source files.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/03_transforms_and_coordinates/src/>.
## What to Observe
Green Y axis points upward; child follows its parent transform.
## Key Code to Understand
`.position`, `.rotation`, `.scale`, `Group.add`.
## Mandarin Concept Summary
局部坐标先由父节点解释，再逐层变换到世界坐标；父节点变化会影响全部子物体。
## Questions We Should Be Able to Answer
What is the difference between a child's local position and final world position?
## Connection to the Next Step
Step 04 computes many transforms in loops.
