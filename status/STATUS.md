---
project: csuf-mgmt339
type: teaching
stage: in-session
target: MGMT 339 Operations Management, CSUF, Fall 2026
draft: true
updated: 2026-09-18
---
## Now
- Fall 26 in session. Exam 1 exists as DRAFT, STUDENT_COPY, and PDF (untracked in git)
- The Great Tech Reckoning ops-strategy game has run live. Refinements 09-03 to 09-18: UI redesign, economics rebalance, Veto scarcity, Spot Market
- Course site tools: EOQ, CPM/crashing, VSM, SPC, ton-mile, TOC homepage
- Spring 26 Exams 1-3 are complete; the Exam 2 BUILD_NOTES.md is the reference build pattern

## Next
- Draft Fall 26 Exams 2-6, each going Workspace.md → Build/ with BUILD_NOTES.md
- Game content pass: company backstories, plain-language strategy glosses, "who needs whom" dependency map, plain-English round recaps
- Commit the untracked exam folders and the CLAUDE.md change

## Blocked on
- Digital pick-and-resolve game interface needs a backend decision (Firebase vs Supabase free tier)
- 339 Agent needs a check with CSUF IT / academic tech on AI tool policy before students use it

## Ideas / loose threads
- Digital game interface: a GitHub Pages app with team signup, structured picks, resolve-time dependency checks, and a GM copilot screen
- 339 Agent: a syllabus/logistics chatbot (v1: no tutoring, keys, or grades). Hosting is open (GCP?), and it may share infrastructure with the game interface
- CLAUDE.md layout is out of date (lists a nonexistent research/ folder; 339_agent/, strategy/, grading/ are undocumented)

## Connects to
- Ops-strategy game (Python simulator plus React role cards)
- Canvas; pandoc/xelatex exam PDF export
- AI-assisted course tooling (339 Agent)
