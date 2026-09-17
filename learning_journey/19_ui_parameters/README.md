# Step 19 — UI Parameters

## Goal
Connect native HTML inputs to graphics state updates.
## Why This Matters to Lakeside Pavilion
Production exposes light direction and whole-scene vertical scale.
## Concepts
DOM events, numeric conversion, update function, transform/material/light parameters.
## What We Build in This Step
Height, sun-angle, and roughness sliders with outputs.
## What Changed From the Previous Step
Adds UI markup/event handlers; no new scene geometry.
## Files Changed From Previous Step
Step-specific HTML panel and additive `main.js`.
## Run This Step
```bash
cd learning_journey
npm ci
npm start
```
Open <http://127.0.0.1:5631/19_ui_parameters/src/>.
## What to Observe
Each slider updates only its named property; Height scales the entire world Y.
## Key Code to Understand
`input` listeners and `updateParameters`.
## Mandarin Concept Summary
输入控件本身不画 3D；事件读取数值，再把它写入 Group、Light 或 Material，最后由下一帧显示。
## Questions We Should Be Able to Answer
Why must Height not be called terrain amplitude?
## Connection to the Next Step
Step 20 completes responsive resize, reset, and export.
