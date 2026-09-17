# Validation Report

Validation date: 2026-09-16 (America/New_York)

## Method and evidence boundaries

- Shared install: `npm ci` completed; added one package, audited two, reported zero vulnerabilities.
- Dependency: `npm ls --depth=0` reported `three@0.180.0`.
- Structure/import validation: `npm run check` verified all required documents/headings, blank-result markers, 26 numbered folders, 22 runnable pages, and every relative JavaScript import target.
- Syntax: `node --check` passed for `server.mjs`, `validate.mjs`, and all 22 runnable `src/main.js` modules (24 files total).
- Server: `npm start` bound to `127.0.0.1:5631`.
- HTTP: every Step 01–22 directory URL and `src/main.js` returned HTTP 200; the shared stylesheet, `three.module.js`, and `OrbitControls.js` also returned HTTP 200.
- Browser automation was unavailable. WebGL context creation, module execution in a real DOM, pixels, shader compilation, interactions, resizing, export, and `renderer.info` values are therefore **UNVERIFIED**.
- A first install attempt exposed an incorrectly copied uppercase character in the new lockfile integrity string. The lockfile was corrected to match the production lockfile, `npm ci` was rerun successfully, and shared asset HTTP checks then passed.

| Step | Install | Syntax/Build | Server | Browser Render | Notes |
|---:|---|---|---|---|---|
| 01 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Smallest scene; camera/FOV experiment requires team run. |
| 02 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Material/light visual comparison not observed. |
| 03 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Transform hierarchy not visually observed. |
| 04 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Repeated columns/stairs not visually observed. |
| 05 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Basic pavilion pixels not observed. |
| 06 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Query experiments `segments=1/8/32` not run in browser. |
| 07 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Amplitude visual result not observed. |
| 08 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Curved roof appearance not observed. |
| 09 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Mountain framing/appearance not observed. |
| 10 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Normal off/on shading comparison remains team experiment. |
| 11 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Roughness/metalness/emissive appearance not observed. |
| 12 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Light-angle results not observed. |
| 13 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Shadow-map pixels/cost not observed. |
| 14 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Same/different seed pixel comparison not run. |
| 15 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Custom leaf rendering/placement not observed. |
| 16 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Water shader compilation is specifically unverified. |
| 17 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Fog density visual comparison not observed. |
| 18 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Orbit/dolly/pan/damping need manual acceptance. |
| 19 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | DOM control behavior needs manual acceptance. |
| 20 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Resize/reset/PNG download need manual acceptance. |
| 21 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Do not claim draw-call improvement until metrics are recorded. |
| 22 | PASS (shared) | PASS | PASS — HTML/JS 200 | UNVERIFIED | Integrated visual similarity/console status need manual comparison. |

## Documentation modules

| Module | Structure | Runnable page | Notes |
|---:|---|---|---|
| 00 | PASS | Not applicable | Orientation/evidence boundaries only. |
| 23 | PASS | Not applicable | Mapping and difference summary only. |
| 24 | PASS | Not applicable | Refinement planning only; production untouched. |
| 25 | PASS | Not applicable | Future approval-gated prompt only. |

## Exact validation commands

```bash
cd learning_journey
npm ci
npm run check
npm ls --depth=0
node --check server.mjs
node --check validate.mjs
node --check <each 01–22 src/main.js>
npm start
curl http://127.0.0.1:5631/<step-folder>/src/
curl http://127.0.0.1:5631/<step-folder>/src/main.js
curl http://127.0.0.1:5631/node_modules/three/build/three.module.js
curl http://127.0.0.1:5631/node_modules/three/examples/jsm/controls/OrbitControls.js
```

## Manual browser acceptance still required

For every step: open its documented URL, inspect the developer console, confirm a visible canvas, perform its experiment without changing controlled variables, and leave `Actual Observation` blank until then. Give special attention to Step 10 normals, Step 13 shadows, Step 16 shader compilation, Steps 18–20 interaction/lifecycle, Step 21 metrics, and Step 22 integrated visual comparison.
