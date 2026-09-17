# Lakeside Pavilion — Reconstructed Learning Journey

The AI-assisted Lakeside Pavilion prototype existed before this learning path. This directory does **not** claim to reproduce the project's historical development. It is a genuine, pedagogically ordered reconstruction that lets the team rebuild and explain the graphics techniques from a cube to an integrated pavilion.

Steps 01–22 are independently addressable pages served by one shared local server. Each JavaScript module imports the previous step and adds the smallest practical change, so earlier concepts remain visible in the code. Steps 00 and 23–25 are documentation modules. Experiment observations are intentionally blank until the team runs them.

## Shared Setup

```bash
cd learning_journey
npm ci
npm start
```

Open the URL listed by a step README. The server binds only to `127.0.0.1:5631`.

## Journey Index

| Step | Topic | New Concept | Visual Result | Experiment | Run Command | Status |
|---:|---|---|---|---|---|---|
| 00 | Overview | Evidence boundaries | Learning map | Choose a concept to trace | `npm start` (docs only) | NOT STARTED |
| 01 | First scene | Scene/camera/renderer | One cube | Camera/FOV/position | `npm start` | NOT STARTED |
| 02 | Geometry/material/mesh | Mesh composition | Cubes + sphere | Basic vs Standard | `npm start` | NOT STARTED |
| 03 | Transforms | Coordinates/hierarchy | Axes + transformed objects | Position/rotation/scale | `npm start` | NOT STARTED |
| 04 | Repetition | Loops/parameters | Columns + stairs | Count/spacing/height | `npm start` | NOT STARTED |
| 05 | Basic pavilion | Primitive composition | Platform/hall/flat roof | Column spacing | `npm start` | NOT STARTED |
| 06 | Vertices/subdivision | Buffer attributes/triangles | Wireframe plane | 1/8/32 segments | `npm start` | NOT STARTED |
| 07 | Displacement | Move vertex Y | Wavy plane | Amplitude | `npm start` | NOT STARTED |
| 08 | Curved roof | `(x,z) → y` roof | Pavilion curved roof | Flat vs curved | `npm start` | NOT STARTED |
| 09 | Mountains | Analytic height field | Layered mountains | Spatial coefficient | `npm start` | NOT STARTED |
| 10 | Normals | Shape vs shading | Correct/stale lighting | Normals off/on | `npm start` | NOT STARTED |
| 11 | Materials | Roughness/metalness/emissive | Material study objects | Roughness 0.1/1.0 | `npm start` | NOT STARTED |
| 12 | Lighting | Fill vs sun | Directed model shading | Light angle | `npm start` | NOT STARTED |
| 13 | Shadows | Shadow maps | Cast scene shadows | Off/on | `npm start` | NOT STARTED |
| 14 | Seeded randomness | Deterministic LCG | Varied terrace tiles | Same/different seed | `npm start` | NOT STARTED |
| 15 | Trees/rocks | Custom leaf buffer | Vegetation/rocks | Seed variation | `npm start` | NOT STARTED |
| 16 | Water | Geometry vs shading normal | Flat lake | Ripples off/on | `npm start` | NOT STARTED |
| 17 | Fog | Distance atmosphere | Faded mountains | Density | `npm start` | NOT STARTED |
| 18 | OrbitControls | Orbit/dolly/pan/damping | Interactive inspection | Control limits | `npm start` | NOT STARTED |
| 19 | UI parameters | DOM → update | Live light/scale/material | One slider at a time | `npm start` | NOT STARTED |
| 20 | Lifecycle | Resize/reset/export | Responsive app | Resize/aspect | `npm start` | NOT STARTED |
| 21 | Performance | Draw calls/instancing | 100-cube comparison | Mesh vs InstancedMesh | `npm start` | NOT STARTED |
| 22 | Integration | Readable reconstruction | Lakeside Pavilion | Integrated acceptance | `npm start` | NOT STARTED |
| 23 | Comparison | Learner ↔ production map | Documentation | Trace one technique | docs only | NOT STARTED |
| 24 | Refinement | Evidence-led planning | Documentation | Prioritize risks | docs only | NOT STARTED |
| 25 | Final prompt | Controlled AI workflow | Documentation | Review prompt scope | docs only | NOT STARTED |

## Evidence Rule

Code presence is not a completed experiment. Fill `Actual Observation` only after personally running the exact procedure, and save evidence with settings, browser/device, and date.
