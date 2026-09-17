import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const folders = [
  '00_overview', '01_first_threejs_scene', '02_geometry_material_mesh',
  '03_transforms_and_coordinates', '04_procedural_repetition', '05_basic_pavilion',
  '06_vertices_and_subdivision', '07_vertex_displacement', '08_curved_roof',
  '09_height_field_mountains', '10_surface_normals', '11_materials', '12_lighting',
  '13_shadows', '14_seeded_randomness', '15_trees_and_rocks', '16_water',
  '17_fog_and_atmosphere', '18_orbitcontrols', '19_ui_parameters',
  '20_render_loop_resize_export', '21_performance', '22_integrated_lakeside_pavilion',
  '23_compare_with_current_project', '24_refinement_plan', '25_final_ai_prompt',
];
const runnable = folders.slice(1, 23);
const readmeHeadings = [
  '## Goal', '## Why This Matters to Lakeside Pavilion', '## Concepts',
  '## What We Build in This Step', '## What Changed From the Previous Step',
  '## Files Changed From Previous Step', '## Run This Step', '## What to Observe',
  '## Key Code to Understand', '## Mandarin Concept Summary',
  '## Questions We Should Be Able to Answer', '## Connection to the Next Step',
];
const experimentHeadings = [
  '## Question', '## Hypothesis', '## Independent Variable', '## Controlled Variables',
  '## Procedure', '## Expected Observation', '## Actual Observation', '## Explanation',
  '## Evidence to Save', '## Reflection Questions',
];

async function requireFile(file) {
  await access(file, constants.R_OK);
}

for (const folder of folders) {
  const base = path.join(root, folder);
  for (const name of ['README.md', 'learning_materials.md', 'experiment_plan.md']) {
    await requireFile(path.join(base, name));
  }
  await requireFile(path.join(base, 'src', 'README.md')).catch(async () => {
    if (!runnable.includes(folder)) throw new Error(`${folder}/src/README.md missing`);
  });

  const readme = await readFile(path.join(base, 'README.md'), 'utf8');
  for (const heading of readmeHeadings) {
    if (!readme.includes(heading)) throw new Error(`${folder}/README.md missing ${heading}`);
  }
  const experiment = await readFile(path.join(base, 'experiment_plan.md'), 'utf8');
  for (const heading of experimentHeadings) {
    if (!experiment.includes(heading)) throw new Error(`${folder}/experiment_plan.md missing ${heading}`);
  }
  if (!experiment.includes('TEAM TO COMPLETE:')) {
    throw new Error(`${folder}/experiment_plan.md must keep actual results blank`);
  }
}

for (const folder of runnable) {
  const source = path.join(root, folder, 'src');
  const htmlPath = path.join(source, 'index.html');
  const jsPath = path.join(source, 'main.js');
  await requireFile(htmlPath);
  await requireFile(jsPath);

  const html = await readFile(htmlPath, 'utf8');
  if (!html.includes('type="importmap"') || !html.includes('src="main.js"')) {
    throw new Error(`${folder}: HTML is missing import map or module entry`);
  }

  const js = await readFile(jsPath, 'utf8');
  const importPattern = /from\s+['"]([^'"]+)['"]|import\s+['"]([^'"]+)['"]/g;
  for (const match of js.matchAll(importPattern)) {
    const specifier = match[1] ?? match[2];
    if (!specifier.startsWith('.')) continue;
    await requireFile(path.resolve(source, specifier));
  }
}

console.log(`Validated structure/import graph for ${folders.length} folders and ${runnable.length} runnable steps.`);
