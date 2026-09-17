# Step 20 — Render Loop, Resize, Reset, Export

## Goal
Complete the browser application lifecycle around the existing world.
## Why This Matters to Lakeside Pavilion
Production uses a continuous loop, responsive aspect update, reset view, and PNG export.
## Concepts
Per-frame work vs rebuild work, drawing-buffer size, aspect/projection, deterministic reset.
## What We Build in This Step
ResizeObserver, reset button, and canvas-only PNG save.
## What Changed From the Previous Step
Adds lifecycle/UI actions; the Step 01 animation loop remains the only loop.
## Files Changed From Previous Step
Step-specific action buttons and additive module.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/20_render_loop_resize_export/src/>.
## What to Observe
Canvas stays undistorted on resize; reset restores exact state; export saves canvas pixels.
## Key Code to Understand
`ResizeObserver`, camera aspect/projection, `toDataURL`.
## Mandarin Concept Summary
每帧只更新控制器并绘制；窗口变化才更新尺寸/投影，重建几何不应无理由放进动画循环。
## Questions We Should Be Able to Answer
What runs every frame? Why update camera projection after aspect changes?
## Connection to the Next Step
Step 21 measures actual renderer work.
