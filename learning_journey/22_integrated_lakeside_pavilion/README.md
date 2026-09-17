# Step 22 — Integrated Lakeside Pavilion

## Goal
Combine prior concepts into a readable reconstruction of the target project.
## Why This Matters to Lakeside Pavilion
This is the learner-owned bridge to understanding the compact production implementation.
## Concepts
Integrated scene organization, composition, procedural geometry, evidence-led performance.
## What We Build in This Step
Pavilion/terrace, curved roof/ribs, layered mountains, deterministic tiles, trees/rocks, water, fog, lighting/shadows, controls/UI/reset/resize/export, and metrics.
## What Changed From the Previous Step
Removes the isolated performance lab, restores the world, and adds causeway, upper tier, roof ribs, and foreground gallery.
## Files Changed From Previous Step
Final integrated HTML and additive reconstruction module.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/22_integrated_lakeside_pavilion/src/>.
## What to Observe
The composition and interaction should be recognizably similar to production, with fewer decorative meshes and clearer code.
## Key Code to Understand
Trace module chain 01→22; focus on `worldGroup`, `roofHeight`, seeded nature, water shader, controls, lifecycle, metrics.
## Mandarin Concept Summary
综合场景没有突然更换架构；它把每一步的小概念叠加成完整应用，并保留可测量、可解释的边界。
## Questions We Should Be Able to Answer
Which techniques are identical in concept to production, and which visual details are simplified?
## Connection to the Next Step
Step 23 maps every technique back to production files/functions.
