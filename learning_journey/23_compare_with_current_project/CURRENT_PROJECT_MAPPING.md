# Current Project Mapping

| Technique | Learning Step | Beginner Version | Current Project File/Function | Main Difference |
|---|---:|---|---|---|
| Three.js/WebGL setup | 01 | Explicit scene/camera/renderer blocks | `prj1/main.js:2,8-12` top level | Production is compressed and adds tone mapping/fog immediately. |
| Render loop | 01, 20 | One loop plus callback list; lifecycle explained later | `main.js:33`, `animate()` | Production updates OrbitControls directly each frame. |
| Mesh factory | 02, 05 | Direct meshes then readable `addBox` | `main.js:19`, `mesh()` | Production creates/tracks one Standard material per mesh and sets shadow flags centrally. |
| Transforms/group | 03, 19 | Axes lesson and `worldGroup.scale.y` | `main.js:17,26` | Same parent-scale concept; production has no AxesHelper. |
| Repeated primitives | 04–05 | Columns/stairs/rails in short loops | `terrace.js:15-20,26-34` | Production has denser repeated detail and more object types. |
| Basic pavilion | 05 | One hall/platform/rail | `terrace.js:16-23,29-37`, `hall()` | Production builds two-tier main hall, gallery, causeway, and distant pavilion. |
| Subdivision | 06 | Query-selectable wireframe plane | `terrace.js:10,39` | Production fixes 32×28 roofs and 32×32 mountains. |
| Vertex displacement | 07 | Sinusoidal study plane | `terrace.js:10,39` | Production uses purpose-built roof/radial mountain formulas. |
| Curved roof | 08 | Normalized formula with main slope/edge lift | `terrace.js:8-14`, `roof()` | Formula is similar in spirit; production adds many tube tile ribs and edge curves. |
| Height-field mountains | 09 | Five layered analytic planes | `terrace.js:38-39` | Production uses nine layers, different amplitudes/positions, same non-noise principle. |
| Surface normals | 10 | URL-controlled flat vs computed normals | `terrace.js:10,39,46` | Production only keeps correct recomputation; learner exposes the failure case. |
| Standard materials | 11 | Isolated roughness/metalness/emissive study | `main.js:19`; `terrace.js:22,26,41,46` | Production distributes material tuning among scene objects. |
| Hemisphere/directional lights | 12 | Named lights and readable angle function | `main.js:15-16,26` | Values closely mirror production; production configures 2048² shadows. |
| Shadows | 13 | Query-controlled off/on, 1024² map | `main.js:16,19` | Production uses 2048² and more casters/receivers. |
| Seeded randomness | 14 | Exported LCG and URL seed | `terrace.js:4` local LCG | Production seed is always 921 and is not user-controlled. |
| Terrace tiles | 14 | 72 deterministic tiles | `terrace.js:24-26` | Production creates 252 tiles with more composition detail. |
| Trees/custom leaves | 15 | Cylinder trunks + 90 triangle leaves/tree | `terrace.js:43-48`, `tree()` | Production builds branches and thousands of small fan-like leaf triangles. |
| Rocks | 15 | 12 dodecahedra in a region | `terrace.js:49` | Production uses 16 and different range/scales; neither is terrain-constrained. |
| Water | 16 | Flat Standard plane + optional same-style shader hook | `terrace.js:40-42` | Same conceptual technique; learner perturbation is slightly weaker. |
| Fog/tone mapping | 17 | Query-controlled density and ACES | `main.js:11` | Production uses fixed density/exposure. |
| OrbitControls | 18 | Named settings/callback | `main.js:3,13-14,25,33` | Production supports preset-specific reset targets. |
| Native UI | 19 | Height/light/roughness | `index.html:2`; `main.js:26-29` | Production has preset selection but no roughness slider. |
| Resize/reset/export | 20 | Readable functions and ResizeObserver | `main.js:25,29-32` | Same main behaviors; production export filename depends on preset. |
| Performance diagnostics | 21–22 | 100-mesh/InstancedMesh comparison + live info | No live production UI; audit instrumented `buildTerrace` | Production has no instancing and roughly 911 mesh requests. |
| Integrated composition | 22 | Reduced readable pavilion | `terrace.js:3-50` | Learner preserves techniques/visual language, not every object or exact proportion. |
| Rebuild/disposal | Discussed in 22/24 | No learner preset rebuild | `main.js:20-24`, `build()` | Production explicitly disposes geometry/materials; needs an additional focused lifecycle exercise. |
| Rod between endpoints | Not isolated | Only vertical cylinders in learner | `terrace.js:7`, `rod()` | Production uses vector subtraction and quaternion alignment; further explanation needed. |
