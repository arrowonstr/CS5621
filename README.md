# CS5621

Computer Graphics Practicum project by Nan (nw388) and Zhexi (zc574).

## Project 1: Lakeside Pavilion

An interactive Three.js scene featuring a two-level pavilion, tiled roofs, a stone terrace, railings, trees, water and distant mountains. The interface is in English, with camera controls, scene selection, height and lighting controls, and PNG export.

### Run locally

Install Node.js (Node 24 was used for development), then:

```sh
cd prj1
npm ci
npm start
```

Open http://127.0.0.1:5621 . Keep the terminal open while viewing the scene. On Windows, after installing dependencies, you can also double-click `prj1/start.cmd`.

Drag to orbit, scroll to zoom, and right-drag to pan. `Save image` exports the scene without interface text.

### Files

- `prj1/terrace.js`: procedural architecture, vegetation and landscape.
- `prj1/main.js`: lighting, materials, camera and interaction.
- `prj1/index.html` and `prj1/style.css`: minimal English interface.
- `prj1/server.mjs`: local static server, bound to localhost.

### Current scope

This is a proposal-stage scene prototype, not a finished photorealistic renderer. Geometry is generated in code; no external art assets are required. Materials, shadows and distance fog use Three.js. Water has a static normal perturbation, not fluid simulation or accurate reflections. Height scales the whole scene. Detailed textures, animation and advanced rendering remain future work. Ink rendering has been removed.

The prototype was checked in Microsoft Edge for JavaScript/shader errors, scene switching, parameter changes and reset. The original screenshot helper depends on a machine-specific testing environment and is not included.

### AI disclosure and dependencies

Codex assisted with planning, implementation, environment setup and browser verification. Team members should review and understand the implementation and retain the conversation and implementation records for the course's AI disclosure requirements.

Uses Three.js 0.180.0 (MIT). Its license is included with the installed package.
