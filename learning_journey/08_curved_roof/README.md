# Step 08 — Curved Pavilion Roof

## Goal
Replace the flat placeholder with a symmetric displaced roof.
## Why This Matters to Lakeside Pavilion
The curved tiled roof is the production scene's defining procedural form.
## Concepts
Normalized local coordinates, height function, edge lift, displaced surface.
## What We Build in This Step
A double-sided, subdivided roof shaped by `roofHeight(x,z)`.
## What Changed From the Previous Step
Removes the teaching plane and replaces only the pavilion roof.
## Files Changed From Previous Step
New Step 08 source files.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/08_curved_roof/src/>.
## What to Observe
Main slope and raised edges come from separate terms in one formula.
## Key Code to Understand
Coordinate normalization, exponent terms, displacement loop, `replaceRoof`.
## Mandarin Concept Summary
屋顶函数读取局部 X/Z，再写出 Y；高次幂让抬升集中在边缘而不是整个平面。
## Questions We Should Be Able to Answer
Why normalize coordinates? Which term controls eaves?
## Connection to the Next Step
Step 09 applies the same `(x,z) → y` model to mountains.
