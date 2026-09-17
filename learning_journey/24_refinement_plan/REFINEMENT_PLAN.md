# Refinement Plan

Do not execute this plan until the team completes relevant learning steps and records actual browser experiments.

## 1. Naming and readability

- Expand compressed one-line statements in `prj1/main.js` and `prj1/terrace.js` without changing execution order.
- Rename stale `ink-scene`/`Ink Scene` identifiers if the team confirms Lakeside Pavilion is final.
- Rename or document UI “Height” as whole-scene vertical scale; it is not terrain amplitude.
- Give repeated composition constants names only when the name genuinely clarifies their role.

Acceptance: same screenshots under fixed camera/settings, same object counts, zero new console errors.

## 2. Split monolithic responsibilities safely

Possible modules, introduced one at a time:

- renderer/camera/application lifecycle;
- material/mesh factory and resource tracking;
- pavilion architecture (`box`, `rod`, `roof`, `rail`, `hall`);
- landscape/water;
- trees/rocks/random generator;
- UI binding.

Do not redesign data flow. Preserve `buildTerrace(mesh)` semantics until comparison tests pass.

## 3. Magic numbers

Good candidates for named parameters: seed, shadow map size, camera defaults, roof subdivisions, mountain layer count/segments, water level, tree/rock count, UI defaults.

Keep local geometric constants close to formulas if extracting them makes the formula harder to read.

## 4. Verified bugs only

Potential concerns requiring browser evidence first:

- shader compile/version problems in water `onBeforeCompile`;
- screen-anchored ripple appearance during camera motion;
- misleading reset label/behavior;
- placement intersections/floating objects;
- resize/export failures.

Do not call these fixed bugs until reproduced and logged.

## 5. Performance measurement before optimization

Baseline production with fixed browser/device/viewport:

- `renderer.info.render.calls`, triangles, geometries, programs;
- frame time while idle/orbiting;
- shadow off/on comparison;
- Pavilion versus Geometry study;
- repeated preset switches for resource stability.

Candidate optimizations only if measurements justify them:

- share identical materials/geometries;
- `InstancedMesh` for terrace tiles or repeated posts;
- disable shadow casting on tiny/low-value details;
- freeze shadow-map updates if scene/light are static;
- adjust shadow resolution/pixel ratio after visual comparison.

## 6. Visual differences to preserve or approve

Use production screenshots as baseline. Do not silently replace roof curve, colors, camera framing, fog density, water appearance, light direction, or composition. Any intentional visual change requires team approval and before/after evidence.

## 7. Safe refactor order

1. Capture production baseline and console/metrics.
2. Reformat and rename only; retest.
3. Extract one helper/module at a time; retest.
4. Add named configuration without value changes; retest.
5. Fix reproduced bugs; retest exact reproduction.
6. Optimize one measured bottleneck; compare metrics and images.
7. Stop when acceptance criteria are met.

## 8. Features that should NOT be added

- Perlin/Simplex noise or voxel/chunk terrain unless Project 1 scope changes explicitly.
- OpenAI API, backend, physics, game mechanics, multiplayer, or first-person navigation.
- New framework or asset pipeline solely for architecture aesthetics.
- Advanced water/reflections or custom shaders without a learning/evidence need.
- Refactors whose only justification is “more sophisticated.”
