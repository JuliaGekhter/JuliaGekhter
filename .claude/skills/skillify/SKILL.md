---
name: skillify
description: Turn a workflow just performed in this session into a reusable project skill under .claude/skills/. Use when the user says "make a skill out of it/this", "save this as a skill", or wants a repeated workflow captured for future sessions.
---

# Skillify — Capture a Session Workflow as a Skill

## 1. Identify "it"
"It" is the workflow from the immediately preceding work — not the whole session. If several candidates exist (analysis, doc generation, build pattern…), list them and ask once with AskUserQuestion (multiSelect). If the user repeats the request after a skill was already made, the referent has moved to whatever was done most recently.

## 2. Extract the workflow, not the transcript
A good skill records what would be re-derived from scratch next time:
- The **method** as ordered steps, each with the command or file it touches
- The **decision rules** (e.g. "never cut a top-10 profit item", "3 tiers max")
- The **hard verification gates** — the checks that must pass before committing
- The **gotchas** actually hit this session (stale npx cache, MergedCell crashes, duplicate-text tests, stop-hook on untracked files…) — these are the highest-value lines
- **Data locations** specific to this repo (file paths, column names, port numbers, binary paths)
- A **reference result** with real numbers, so future runs have a benchmark

Leave out: narrative history, one-off details, anything the next session can trivially see itself.

## 3. Write it
- Location: `.claude/skills/<kebab-name>/SKILL.md`; reusable code goes in `<name>/scripts/`
- Frontmatter: `name` (kebab, matches dir) + `description` — the description is the trigger surface: state what it does AND the phrases/situations that should invoke it ("Use when asked to…")
- Keep SKILL.md scannable: the next session reads it under time pressure. Prefer rules and commands over prose.

## 4. Verify before committing
- Any included script must be **run against live data** and produce correct output first
- Frontmatter parses (three-dash fences, valid YAML, no tabs)
- Paths mentioned actually exist in the repo

## 5. Ship
Commit the skill directory with a message saying which workflow it captures, push, and tell the user the skill name and its trigger phrases.

## Existing skills in this repo (don't duplicate — extend)
profit-optimize · generate-stw-docs · add-dashboard-tab · catalog-to-platform · show-platform · skillify
