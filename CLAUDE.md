# CLAUDE.md — csuf-mgmt339

This is the course website repo for **MGMT 339 (Operations Management)** at CSUF, taught by Sid Yamalakonda. It deploys to **https://sydarthur.github.io/csuf-mgmt339/**.

---

## Repo Structure

```
csuf-mgmt339/
├── index-root.html          # TOC homepage (copied to dist/index.html on build)
├── tools/
│   ├── spc/                 # React/Vite app — SPC control charts interactive tool
│   ├── ops-strategy/        # React/Vite app — strategy game role cards (The Great Tech Reckoning)
│   ├── vsm/                 # Static HTML — VSM walkthroughs, kanban, lean-to-TOC, line balancing
│   ├── pmo/                 # Static HTML — CPM walkthrough + cost crashing walkthrough
│   └── eoq/                 # Static HTML — EOQ + inventory review systems walkthrough
├── slides/                  # Reveal.js presentation slides
├── ton-mile-center/         # Static HTML — facility location / center of gravity tool
├── strategy/                # Game simulation files (sim_config.json, case files, Python scripts)
├── exam/                    # Exam drafts, study guides, formula sheets (Spring 26 folder)
└── research/                # Research-related files
```

---

## Deployed Pages

| URL | Source |
|---|---|
| `/csuf-mgmt339/` | `index-root.html` — TOC homepage, all tools grouped by topic |
| `/csuf-mgmt339/spc/` | `tools/spc/` (Vite build) |
| `/csuf-mgmt339/ops-strategy/` | `tools/ops-strategy/` (Vite build) |
| `/csuf-mgmt339/vsm/` | `tools/vsm/` (static copy) |
| `/csuf-mgmt339/ton-mile-center/` | `ton-mile-center/` (static copy) |
| `/csuf-mgmt339/slides/` | `slides/` (Vite build) |
| `/csuf-mgmt339/pmo/` | `tools/pmo/` (static copy) |
| `/csuf-mgmt339/eoq/` | `tools/eoq/` (static copy) |

---

## Tech Stack

- **React + TypeScript + Vite + Tailwind CSS + Recharts** — for `tools/spc/` and `tools/ops-strategy/`
- **Static HTML/CSS/JS** — for `tools/vsm/`, `tools/pmo/`, `tools/eoq/`, and `ton-mile-center/`
- **GitHub Actions** → builds on push to `main` → deploys to `gh-pages` branch

---

## Build & Deploy

```bash
# Build everything into dist/
npm run build

# Individual builds
npm run build:spc
npm run build:slides
npm run build:ops-strategy
npm run build:ton-mile-center   # cp -R ton-mile-center dist/ton-mile-center
npm run build:vsm               # cp -R tools/vsm dist/vsm
npm run build:pmo               # cp -R tools/pmo dist/pmo
npm run build:eoq               # cp -R tools/eoq dist/eoq

# Local dev
npm run dev                     # SPC tool
npm run dev:ops-strategy        # Ops strategy tool
```

Deployment is automatic via `.github/workflows/deploy.yml` on every push to `main`. No manual deploy needed.

---

## Adding a New Tool

### Static HTML tool
1. Create folder under `tools/` or at root level
2. Add `"build:mytool": "cp -R tools/mytool dist/mytool"` to `package.json`
3. Add `&& npm run build:mytool` to the main `"build"` script
4. Add a card to `index-root.html`
5. Push — GitHub Actions handles the rest

### React/Vite tool
1. Scaffold with `npm create vite@latest tools/mytool -- --template react-ts`
2. Install Tailwind following the existing `tools/spc/` pattern
3. Set `vite.config.ts`:
   ```ts
   base: '/csuf-mgmt339/mytool/',
   build: { outDir: '../../dist/mytool' }
   ```
4. Add `"build:mytool": "cd tools/mytool && npm run build"` to root `package.json`
5. Add to the main `"build"` script chain
6. Add a card to `index-root.html`

---

## VSM Tools (`tools/vsm/`)

All files are plain HTML. Just drop a new `.html` file in `tools/vsm/` and add a card to `tools/vsm/index.html`. The `build:vsm` script copies the whole folder.

Current files:
- `index.html` — landing page
- `vsm-walkthrough-in-n-out.html` — In-N-Out VSM walkthrough
- `vsm-suncrest-bakery.html` — Suncrest Bakery VSM example
- `kanban-walkthrough.html` — Kanban systems walkthrough
- `lean-to-toc-walkthrough.html` — Lean/TOC animated walkthrough (names: Ashley, Bailey, Cesar)
- `line-balancing-walkthrough.html` — Line balancing walkthrough

Design language: Instrument Serif + DM Sans + JetBrains Mono, warm off-white bg (#faf8f4), red accent (#c0442a), scroll-based sections with nav dots.

---

## PMO Tools (`tools/pmo/`)

Static HTML walkthroughs for project management. The `build:pmo` script copies the whole folder.

Current files:
- `cpm-walkthrough.html` — CPM forward/backward pass walkthrough (St. John's Hospital, 11 activities A–K). Tap-based steps revealing ES→EF→LF→LS+Slack one node at a time. Critical path styling hidden until final reveal (`showCrit` flag).
- `cpm-cost-crashing.html` — Cost–Time optimization walkthrough. Greedy crashing algorithm across 4 stages (J→D→K→B+C). Left panel shows live cost bar + path table + activity table; right panel has explanatory steps. Uses `overrideBest` field on steps to control PICK badge independently of stage state.

Design language: DM Sans + JetBrains Mono, navy (#1e3a5f) header, two-panel layout (left = data, right = explanation), step-through navigation.

**CPM data (St. John's Hospital):**
- 11 activities A–K, 5 paths, critical path B–D–H–J–K = 69 weeks at normal time
- Indirect cost: $8,000/wk; penalty: $20,000/wk beyond week 65
- Optimal after crashing: 61 weeks, $2,506,200 total cost

---

## EOQ Tool (`tools/eoq/`)

Static HTML scroll-based walkthrough for inventory management. The `build:eoq` script copies the whole folder.

Current files:
- `eoq-walkthrough.html` — Full EOQ + inventory systems walkthrough (based on slides 17–31 of the Inventory Management deck)

Sections covered:
1. Inventory Carrying Cost (ICC table: capital/storage/service/risk = 31.2%)
2. Ordering cost formula and the carrying/ordering tradeoff
3. Total Annual Cost curve (SVG with ICC, Order Cost, U-shaped TAC)
4. EOQ formula: √(2DS/H) with assumptions
5. Worked example: D=10,800, H=$40, S=$250 → EOQ=367 units
6. Q System (Continuous Review): sawtooth diagram, R = dL = 180 units
7. Reorder point with safety stock: R = d̄L + z·σ
8. P System (Periodic Review): protection interval P+L, T = d̄(P+L) + z·σ, Petromax example (T=365)
9. When EOQ breaks (quantity discounts, perishables, lumpy demand, Lean philosophy)
10. Summary: all formulas for ICC, EOQ, Q system, P system

Design language: same Instrument Serif + DM Sans scroll format as VSM tools, teal accent (#0e7490).

---

## Ops Strategy Game (`tools/ops-strategy/`)

Role card app for **The Great Tech Reckoning** simulation. 6 company roles with hash-based routing.

Company accent colors: Silicore=blue, SoftCom=red, AmeriShop=yellow, OpenAIco=green, PearCom=purple, CorpSolutions=gray

Super power types: `nuclear` = Once Per Game (badge: red), `regenerating` = Once Per Round (badge: green)

Data lives in `tools/ops-strategy/src/data/companies.ts`. Game config in `strategy/sim_config.json`.

---

## Homepage (`index-root.html`)

Full table-of-contents page grouped by topic — replaces the old redirect to SPC. Seven sections:
- 🏭 Lean & Process Improvement (5 VSM/Kanban/TOC/Line Balancing tools)
- 📦 Inventory Management (EOQ walkthrough)
- 📅 Project Management (CPM walkthrough + cost crashing)
- 📊 Quality (SPC tool)
- 📍 Facility Location (ton-mile center of gravity)
- 🎮 Simulations (The Great Tech Reckoning)
- 🎞️ Slides (Reveal.js deck)

Cards use per-topic accent colors and type badges (Walkthrough / Interactive / Game / Slides).

---

## Exam Files (`exam/Spring 26/`)

Each exam lives in its own folder. See `exam/Spring 26/Exam N/BUILD_NOTES.md` for the full build log, question map, and Canvas sync notes for that exam.

**Exam 2 (completed Spring 2026):**
- `Exam 2/Build/MGMT_339_-_Exam_2_v2.md` — final exam (25 questions, 100 pts)
- `Exam 2/Build/MGMT_339_-_Exam_2_Answer_Key.md` — answer key with distractor notes
- `Exam 2/Build/canvas_exam_header.html` — formula reference pasted into Canvas header
- `Exam 2/Build/images/` — figures attached to exam questions (fishbone, VSM, YPI, etc.)
- `Exam 2/MGMT_339_-_Exam_2_Formula_Sheet.md` — standalone formula sheet (PDF export)

**To export exam or formula sheet to PDF:**
```bash
cd "exam/Spring 26/Exam N/Build"
pandoc MGMT_339_-_Exam_N_vX.md -o MGMT_339_-_Exam_N_vX.pdf \
  --pdf-engine=xelatex -V mainfont="Helvetica" -V geometry:margin=1in --resource-path=.
```

**Known pandoc/Helvetica quirks:**
- `$` signs inside markdown table cells trigger LaTeX math mode — strip `$` from cell values; put it in the column header only
- `→` (U+2192) does not render in Helvetica — avoid in body text (formula sheet uses it; suppress warning, it's cosmetic)
- Subscript unicode chars (e.g. `ₙ`) don't render — use plain text alternatives in tables

---

## Key Conventions

- **Routing in React tools**: hash-based (`window.location.hash`) — no react-router
- **Tailwind dynamic classes**: use explicit color map objects, not template literals (JIT purging)
- **JS scope conflicts**: wrap plain JS files in IIFEs to avoid `const` redeclaration errors across script tags
- **Markdown math in Obsidian**: use multiline `$$` blocks (formula on its own line); avoid `||` empty header cells in tables
- **Backlinks in static HTML**: use `/csuf-mgmt339/` absolute paths, not `../index.html`
- **Apostrophes in JS strings**: use double quotes for strings containing apostrophes (e.g. `"St. John's Hospital"`) — single-quoted strings with apostrophes cause silent parse errors that break the whole page
- **SVG cost curves**: y-axis increases downward in SVG, so a U-shaped cost curve (expensive→cheap→expensive) requires an inverted-∩ path in screen coordinates. Use cubic bezier: `M x1,y_high C ... x_mid,y_low ... x2,y_high`
- **Static walkthrough design language**: Instrument Serif (headings) + DM Sans (body) + JetBrains Mono (formulas/code), scroll-based sections with IntersectionObserver nav dots, progress bar fixed at top
