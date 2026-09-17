# Codex Prompt — Evidence-Led Lakeside Pavilion Refinement

You are refining the existing production Lakeside Pavilion only after our team has completed its reconstruction and experiments.

## Required inputs to read first

1. Read the production project under `prj1/` in full.
2. Read `PROJECT_REVIEW_REPORT.md`.
3. Read the completed `learning_journey/`, especially Steps 22–24 and `LEARNING_CHECKLIST.md`.
4. Read our **actual completed experiment logs**, browser acceptance results, screenshots/metrics, and AI-usage entries.
5. If required evidence is missing, label it `UNVERIFIED` and do not treat it as a result.

## Non-negotiable constraints

- Preserve concepts the team has learned and can explain.
- Improve readability and naming where evidence supports it.
- Split responsibilities into understandable modules only where useful.
- Reduce duplication without hiding graphics concepts behind unnecessary abstraction.
- Replace helpful magic numbers with named parameters while preserving values and visual output.
- Fix only bugs that were reproduced and verified.
- Preserve visual appearance unless the team explicitly approves a visual change.
- Optimize only after measurement, with recorded before/after metrics and a visual regression check.
- Preserve beginner-readable code.
- Retain helpful Mandarin comments in complex graphics sections, especially displacement, normals, seeded generation, transforms, water shader work, and performance-sensitive code.
- Add no frontend framework or unnecessary dependency.
- Add no unrelated features.
- Do not add an OpenAI API unless explicitly requested in a separate approved scope.
- Do not redesign the entire architecture.
- Do not invent test results, screenshots, performance gains, team decisions, or understanding.

## Required workflow

Follow this exact sequence:

```text
inspect
→ plan
→ explain proposed changes
→ wait for approval
→ modify
→ run/test
→ report
```

### Inspect

- Reproduce the current production baseline using documented commands.
- Record browser/device/viewport/settings for any visual or performance baseline.
- Trace requested areas to exact files/functions.
- Check for unrelated user changes and preserve them.

### Plan and explain

- Present a small ordered plan.
- For every change state: verified problem, proposed edit, files affected, visual risk, acceptance test, rollback criterion.
- Separate formatting/naming, refactoring, bug fixes, and optimization.
- Prefer the smallest change that addresses the verified need.

### Wait for approval

- **Do not modify production code until the team explicitly approves the proposed plan.**
- If approval changes scope, revise the plan and wait again for the revised scope.

### Modify

- Work in approved increments.
- Preserve existing behavior and composition unless a visual change was specifically approved.
- Keep graphics formulas visible and commented rather than obscured in generic abstractions.
- Do not modify historical experiment observations.

### Run/test

- Repeat the production baseline checks and the acceptance test for each changed area.
- Run syntax/server/browser checks; inspect console/shader errors.
- For performance work, repeat measurements under the same conditions and report distributions or repeated samples—not one favorable frame.
- Compare before/after screenshots where visual preservation is required.
- Label anything not actually observed `UNVERIFIED`.

### Report

Provide a final change log containing:

| Change | Reason/evidence | Files/functions | Test performed | Result | Visual impact | Remaining uncertainty |
|---|---|---|---|---|---|---|

Also list:

- implementation files changed;
- documentation/evidence files changed;
- exact commands run;
- browser/device/viewport used;
- measurements before and after, if applicable;
- rejected or deferred ideas and why;
- any team action still required.

Do not write course-submission prose. Return technical evidence and a truthful implementation handoff.
