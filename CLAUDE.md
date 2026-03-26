# CLAUDE.md — csuf-mgmt339

This is the course website repo for **MGMT 339 (Operations Management)** at CSUF, taught by Sid Yamalakonda. It deploys to **https://sydarthur.github.io/csuf-mgmt339/**.

---

## Repo Structure

```
csuf-mgmt339/
├── index-root.html          # Root landing page (copied to dist/index.html on build)
├── tools/
│   ├── spc/                 # React/Vite app — SPC control charts interactive tool
│   ├── ops-strategy/        # React/Vite app — strategy game role cards (The Great Tech Reckoning)
│   └── vsm/                 # Static HTML — VSM walkthroughs, kanban, lean-to-TOC, line balancing
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
| `/csuf-mgmt339/` | `index-root.html` |
| `/csuf-mgmt339/spc/` | `tools/spc/` (Vite build) |
| `/csuf-mgmt339/ops-strategy/` | `tools/ops-strategy/` (Vite build) |
| `/csuf-mgmt339/vsm/` | `tools/vsm/` (static copy) |
| `/csuf-mgmt339/ton-mile-center/` | `ton-mile-center/` (static copy) |
| `/csuf-mgmt339/slides/` | `slides/` (Vite build) |

---

## Tech Stack

- **React + TypeScript + Vite + Tailwind CSS + Recharts** — for `tools/spc/` and `tools/ops-strategy/`
- **Static HTML/CSS/JS** — for `tools/vsm/` and `ton-mile-center/`
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

---

## VSM Tools (`tools/vsm/`)

All files are plain HTML. Just drop a new `.html` file in `tools/vsm/` and add a card to `tools/vsm/index.html`. The `build:vsm` script copies the whole folder.

Current files:
- `index.html` — landing page
- `vsm-walkthrough-in-n-out.html` — In-N-Out VSM walkthrough
- `vsm-suncrest-bakery.html` — Suncrest Bakery VSM example
- `kanban-walkthrough.html` — Kanban systems walkthrough
- `lean-to-toc-walkthrough.html` — Lean/TOC animated walkthrough (names: Ashley, Bailey, Cesar)
- `lineBalance.md` — Line balancing step-by-step notes (Obsidian)

---

## Ops Strategy Game (`tools/ops-strategy/`)

Role card app for **The Great Tech Reckoning** simulation. 6 company roles with hash-based routing.

Company accent colors: Silicore=blue, SoftCom=red, AmeriShop=yellow, OpenAIco=green, PearCom=purple, CorpSolutions=gray

Super power types: `nuclear` = Once Per Game (badge: red), `regenerating` = Once Per Round (badge: green)

Data lives in `tools/ops-strategy/src/data/companies.ts`. Game config in `strategy/sim_config.json`.

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
