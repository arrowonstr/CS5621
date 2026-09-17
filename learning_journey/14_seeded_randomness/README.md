# Step 14 — Seeded Deterministic Randomness

## Goal
Create repeatable visual variation from an integer seed.
## Why This Matters to Lakeside Pavilion
Production seed 921 varies tile materials, leaves, and rocks while rebuilding identically.
## Concepts
Pseudo-random sequence, seed, reproducibility, controlled experiments.
## What We Build in This Step
A seeded terrace tile grid with slight color/roughness changes.
## What Changed From the Previous Step
Adds deterministic decoration; terrain formula remains non-random.
## Files Changed From Previous Step
New Step 14 source files.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/14_seeded_randomness/src/?seed=921>.
## What to Observe
Reloading the same seed repeats variation; a different seed changes it.
## Key Code to Understand
`createSeededRandom`, `activeSeed`, ordered calls to `random()`.
## Mandarin Concept Summary
seed 决定伪随机数列；相同 seed 与相同调用顺序产生相同结果，因此实验可以复现。
## Questions We Should Be Able to Answer
Why would inserting an extra random call change later objects?
## Connection to the Next Step
Step 15 uses the same generator for leaves and rocks.
