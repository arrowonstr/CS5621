# Step 05 — Basic Pavilion

## Goal
Compose a recognizable pavilion from simple primitives.
## Why This Matters to Lakeside Pavilion
This is the central production modeling strategy.
## Concepts
Composition, named colors, beginner-readable helper function, scope hierarchy.
## What We Build in This Step
Platform, hall, columns, beam, rail, and temporary flat roof.
## What Changed From the Previous Step
Reuses loop thinking inside an integrated architectural composition.
## Files Changed From Previous Step
New Step 05 source files; exports `worldGroup`, `addBox`, and roof replacement hook.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/05_basic_pavilion/src/>.
## What to Observe
Simple boxes become architecture through proportion, placement, color, and repetition.
## Key Code to Understand
`addBox`, `COLORS`, column/rail loops, `worldGroup`.
## Mandarin Concept Summary
复杂场景不一定需要复杂单体；许多简单几何体按明确坐标和层级组合即可形成建筑。
## Questions We Should Be Able to Answer
What responsibilities belong to `addBox`, and what remains in pavilion composition code?
## Connection to the Next Step
Step 06 inspects the vertices/triangles needed for curved surfaces.
