# Difference Summary

## What the learner version reproduces

- Browser Three.js scene with PerspectiveCamera/WebGLRenderer.
- Code-built stylized pavilion, terrace, repeated columns/rails/tiles, causeway, upper tier, and foreground framing.
- Subdivided/displaced roof and analytic height-field mountains.
- Correct normal recomputation and an explicit failure-case comparison.
- Standard materials with roughness, metalness, and emissive examples.
- Hemisphere fill, directional sun, shadow maps, fog, tone mapping.
- Fixed-seed decorative tiles, custom leaf BufferGeometry, primitive trees/rocks.
- Flat water with optional compiled-shader normal perturbation.
- OrbitControls, light angle, whole-scene Y scale, reset, responsive resize, PNG export.
- Live performance counters and a controlled instancing lesson.

## What production does more elaborately

- Approximately 911 mesh requests and roughly 121,470 base triangles in the reviewed pavilion build.
- More halls, rail details, roof tile tubes/edge curves, terrace tiles, branches/leaves, rocks, and distant composition layers.
- A `rod(a,b,...)` helper aligns cylinders between arbitrary endpoints with a quaternion.
- Preset switching rebuilds objects and disposes tracked geometry/material resources.
- Larger 2048² directional shadow map and production-specific camera framing.

## Concepts that are identical in principle

- Scene/camera/renderer pipeline and +Y-up transforms.
- Mesh as geometry + material.
- Plane subdivision → position-Y displacement → normal recomputation.
- Analytic mountains are height fields and are not Perlin/Simplex noise.
- LCG seed makes decoration repeatable; it does not generate terrain.
- Flat water geometry is separate from shading-normal perturbation.
- HTML values update scene state; the render loop draws current state.

## Formulas/details that differ

- Learner roof constants and object dimensions are simplified; production `lift(a,b)` uses exact compact constants.
- Learner has five mountain layers versus production nine, with different placement and amplitude.
- Learner trees use simple trunks and 90 triangles; production creates branches and far denser leaves.
- Learner intentionally keeps fewer roof ribs and tiles for readability/performance.

## Advanced pieces still needing focused explanation

- Quaternion alignment in production `rod()`.
- Catmull–Rom curve sampling and TubeGeometry frame construction in production roof details.
- The fragility and screen-space behavior of the `onBeforeCompile` water edit.
- Accurate browser profiling of color and shadow passes.
- Resource disposal/rebuild behavior under repeated preset switching.
- Why nonuniform parent scaling still shades correctly through normal matrices.

No visual claim in this document is a completed observation until the team runs both versions and records it.
