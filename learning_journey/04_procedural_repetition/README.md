# Step 04 — Procedural Repetition

## Goal
Generate architectural rhythm with loops and a few parameters.
## Why This Matters to Lakeside Pavilion
Production columns, tiles, rails, stairs, roof ribs, and leaves use repetition.
## Concepts
Count, spacing, parameterized construction, repeated meshes.
## What We Build in This Step
A row of columns and ascending stairs.
## What Changed From the Previous Step
Replaces hand-placed study objects with loop-generated architecture pieces.
## Files Changed From Previous Step
New Step 04 source files.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/04_procedural_repetition/src/>.
## What to Observe
Small parameter changes affect a whole repeated structure consistently.
## Key Code to Understand
Column and stair `for` loops; center-alignment formula.
## Mandarin Concept Summary
程序化重复不是随机摆放；它用规则把数量、间距和尺寸转换成可预测的建筑结构。
## Questions We Should Be Able to Answer
How is the row centered? What happens to mesh/draw-call count when count rises?
## Connection to the Next Step
Step 05 combines repeated and single primitives into a pavilion.
