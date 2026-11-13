# From the control tower

Briefs from Sid's control tower. Newest at the top. Read at the start of a session; discuss with Sid before acting.

---

## 2026-11-12: Newsvendor Sprint 1 spec from the dojo (game dynamics + data capture)

Relayed from the dojo (`dojo/status/to-tower.md`, 2026-11-12). Sid confirmed the numbers, the rounds, and keeping the optimum off screen. This is for the **Fri 2026-11-13 test version**. Values marked *provisional* can change after the test. It supersedes the 10-10 brief where they differ: the end screen no longer shows the optimum, and there are 20 rounds plus a practice round.

**Who owns what (Sid, 2026-11-12):** the dojo owns game design (dynamics, parameters, design controls, what's logged). This repo owns the build and everything at the student level: how students sign in and identify themselves, section handling, instructions wording, the bonus-point mechanics, and keeping identifiers private. Sid will refine those here in the next sprint as he improves the game. Where the spec touches student-level details below, treat it as a starting point, not a requirement. Sprint 2 (incentive rule, instructions text, debrief chart, completed Level 1 config) comes later through the tower.

**Goal:** a student plays the full game in one condition and every decision lands in a central store Sid can export. Manipulations, incentives, and the debrief come in later sprints, but the condition variable exists from day one.

**Game**
- **Task:** each round, order a quantity *before* demand is known. Unsold units are wasted (no salvage); unmet demand is lost sales (no extra penalty).
- **Demand:** integer, uniform on 0–100, mean 50. Shown to students as "demand is equally likely to be anywhere from 0 to 100." *(provisional)*
- **Price** $12 per unit. **Cost:** $3 (high margin) or $9 (low margin). *(provisional; same ratios as Schweitzer & Cachon)*
  - High margin: critical fractile 0.75 → optimal order **75**.
  - Low margin: critical fractile 0.25 → optimal order **25**.
  - Both are 25 away from the mean, so pull-to-center is symmetric and easy to show on one chart.
- **Rounds:** 20 counted rounds, plus 1 unscored practice round. *(provisional)*
- **Each round, the screen shows:** price, cost, demand range, the order input (integer, 0–100 enforced), and a history table of past rounds (order, demand, sold, leftover, profit, cumulative profit).
- **After each order:** reveal demand, units sold, leftover, round profit, cumulative profit.
- **Do not show** the optimal quantity or critical-ratio formula, during or after the game. It is revealed in the class debrief. Take-home students talk to each other, so showing it on the end screen would contaminate those who play later.
- **End screen:** "Done, thanks." Total profit and average order (no optimum).

**Design controls (from the reading)**
- **Identical demand sequence for everyone, in both conditions** (one fixed, pre-generated list of 21 draws; seed stored in the config). Removes luck of the draw as an explanation for differences, and makes conditions comparable round by round.
- **Condition assignment:** 50/50, deterministic from a hash of the student ID, so reloading or replaying never switches a student's condition. Store the condition with every row.
- **One counted attempt per student.** If a student replays, log it with an attempt number; analysis uses attempt 1.
- **Parameters read from `research-config.yaml`** (per the 10-16 addendum), not hard-coded.

**Data captured**
Per round (one row per decision):
`student_id, section, condition, attempt, round (0 = practice), order_qty, demand, units_sold, leftover, round_profit, cumulative_profit, decision_time_ms, timestamp`

Per student (one row per attempt):
`student_id, section, condition, attempt, started_at, finished_at, completed (bool), total_profit, mean_order`

- `decision_time_ms` = time from round screen shown to order submitted. Cheap to capture and useful later (fast, careless orders; learning over rounds).
- Students identify themselves with their CSUF ID or Canvas name (needed for bonus points); keep identifiers out of anything shared beyond Sid.
- Storage: whatever is lightest and works by Fri (the course repo decides). It must be central (not just the student's browser) and exportable to CSV.

**Acceptance (Fri test)**
- Sid can play through in each condition (with a way to force the condition for testing, e.g., a URL parameter).
- All 21 rows for a play appear in the store and export to CSV with the fields above.
- Reloading mid-game doesn't change the condition or the demand sequence.

**Out of scope for Sprint 1**
Incentive scoring, the debrief chart, the instructions page wording, the Level 1 config's analytical-target section.

Discuss with Sid before building. Log what you built and any changes to the provisional values in `status/project_timeline.md`. Send questions about the design back through the tower (they go to the dojo).

---

## 2026-11-05: Newsvendor game: updated format and dates (supersedes the 10-10 "shape")

Format decided in the dojo on 2026-11-03: **individual online take-home for bonus points**, ~10–15 min, ~15–20 rounds; **high- vs. low-margin product randomized per student**; two sections (~96 students, expect ~30+ each). Debriefed in class 3 of Module 3 at the "Selecting a service level" slide: class average order vs. optimum, by margin. Still a teaching demo, not research (if the data might ever be presented, IRB comes first).

**Dates (Sid, 2026-11-05):**
- **Fri 2026-11-13:** a playable test version Sid can try (rough is fine).
- **Wed 2026-11-18:** launched to students.

**Division of labor:** the dojo works out the design spec with Sid (treatments, randomization, parameters, what's logged, debrief chart, Level 1 config). The tower relays it here as a dated brief; this repo builds and deploys. Until the spec arrives, start from the 10-10 brief and the 10-16 addendum (parameters read from `research-config.yaml`), so the 11-13 test version isn't blocked. Swap in the spec's values when it lands.

Teaching tasks for this live in Tasks.md (#mgmt339). Discuss with Sid before building.

---

## 2026-10-16: Addendum to the newsvendor brief: write its research config too

Sid wants to practice "agent-native" research (Decision Sciences agentic-era call, Track A style) early. The newsvendor game is the first practice run. Alongside the game, keep a small machine-readable spec, e.g. `tools/newsvendor/research-config.yaml`, covering:
the seven Level 1 components from the Track A author guide (tower: `strategy/special-issues/2027-DSJ-agentic-era-TrackA-author-guide.pdf`, with a worked YAML example):
- design logic: rounds, conditions (high vs low margin), assignment rule
- actors and information: what the student sees each round, what they enter
- parameters: price, cost, demand distribution, seed handling
- data provenance: what each round logs and how it's transformed
- analytical targets: e.g., "mean order < optimum in high-margin, > optimum in low-margin" with the summary statistic
- replication requirements: rounds, players, exclusions
- scope conditions: classroom demo, no incentives, not research data

Keep the game logic reading its parameters from this file, so the same config could later drive an oTree version or AI agents as players. About an hour of extra work; the Dojo coaches the content.

---

## 2026-10-10: Newsvendor classroom game for the inventory module (target ~November)

**What:** a ~5-minute in-class game where students act as a newsvendor (order before demand is known), then see the class's results. The teaching payoff is the classic "pull-to-center" effect: people order too close to average demand, below the optimum when margins are high and above it when margins are low. Students discover the bias in their own orders, then the critical-ratio formula explains it.

**Why now:** this is Sid's first practice build for his experimental-methods learning mission. It is a **classroom demo only**: no research, no data kept for publication, no IRB.

**Suggested shape (discuss with Sid; check the Module 3 / inventory narrative note in the vault first, per this repo's CLAUDE.md):**
- 10–15 rounds. Each round shows the demand distribution (e.g., uniform 0–100 or normal), price, and cost; the student types an order quantity; demand is drawn; profit is shown.
- Ideally two conditions (high-margin vs low-margin, split by half of the room) so the bias shows up in both directions.
- End screen: the student's average order vs the optimal (critical-ratio) quantity.
- Class debrief: a chart of everyone's average order vs the optimum. Aggregation is the hard part without a backend. Options: each student submits a final summary through a Canvas quiz or Google Form; or reuse whatever comes out of the pending Firebase/Supabase decision for the digital game interface. Pick the lightest option that works in November.
- Build to the existing tool pattern (static HTML like `tools/eoq/`, or the Vite/React tools), and link it to the EOQ walkthrough so it fits the inventory arc.

**Timing:** after Exam 2 (Oct 28). Aim to have it ready before the inventory lectures, around November.

**Later (not for this build):** Sid may rebuild it in oTree as an experimental-methods exercise. Keep the game logic (parameters, demand draws, optimal quantity) separate from the UI so it can be ported.
