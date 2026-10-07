---
project: csuf-mgmt339
type: teaching
stage: in-session
target: MGMT 339 Operations Management, CSUF, Fall 2026
draft: true
updated: 2026-10-07
---
## Now
- Week 7: quality and SPC lectures (X̄/R, p, c, Cp/Cpk); In-Class Exercises 2.2 and 2.3 built
- Assignment 2.1 (VeloShip SPC case, Aug 2026 data) due Sun Oct 18
- SPC site tool updated for Fall 26 (four-lines recipe, new Capability tab) on branch fall26-spc-guide
- The Great Tech Reckoning ops-strategy game has run live; Spring 26 Exam 2 BUILD_NOTES.md is the reference build pattern

## Next
- Merge fall26-spc-guide to main so the site deploys
- Step-by-step guides for In-Class Exercises 2.2 and 2.3; refresh SPC Playground to coffee-bag data
- Draft Fall 26 Exam 2 (quality, lean, capacity, TOC), due Oct 28
- Commit the untracked exam folders and the CLAUDE.md change

## Blocked on
- Pushing from cloud sessions: Claude GitHub App not installed for this repo
- Digital pick-and-resolve game interface needs a backend decision (Firebase vs Supabase free tier)
- 339 Agent needs a check with CSUF IT / academic tech on AI tool policy

## Ideas / loose threads
- Delete unused tools/spc/src/ProcessChartsGuide.tsx (v1)
- Digital game interface: GitHub Pages app with team signup, picks, and a GM copilot screen
- CLAUDE.md layout is out of date (lists a nonexistent research/ folder; 339_agent/, strategy/, grading/ undocumented)

## Connects to
- Ops-strategy game (Python simulator plus React role cards)
- Canvas quizzes and in-class exercises; pandoc/xelatex exam PDF export
- AI-assisted course tooling (339 Agent)
