# Future Semester Refinements

Ideas parked for a later pass — not needed for the current run of the game, but worth revisiting before it's played again.

## Content & narrative depth (Fall 2026 note)

Running the game live this semester surfaced a gap that has nothing to do with the math: **Sid and Claude understand the mechanics deeply, but the students don't** — not because the rules are wrong, but because the game currently explains itself like a rulebook, not a story. Three concrete gaps:

1. **Company backgrounds are thin.** Each role card has a one-paragraph "Who You Are" and a tagline, but no real origin story or personality — nothing like "OpenAIco started in a garage before AI went mainstream, burned through two pivots, and now can't decide if it wants to be everyone's friend or SoftCom's exclusive weapon." A few lines of real narrative color per company (history, culture, a defining moment, a rivalry) would make the roles feel like companies worth defending, not just a strategy table with a name attached. This is a copywriting pass on `companies.ts`, not a mechanics change — low effort, potentially the highest-leverage fix here.

2. **Strategies and dependencies are communicated in mechanic-speak.** The Strategic Options table (cost, revenue, chips, die, "Requires CorpSolutions Integrator and AI access... Shock B gives -2 die roll") is precise but not legible to someone who hasn't internalized the rules yet. Needs a plain-language translation layer alongside the technical table — e.g. a one-line "what this actually means" gloss per strategy ("A big, risky bet on breaking into enterprise — expensive, and it only pays off if you land two separate partnerships first"), and a visual "who needs whom" relationship map (PearCom needs CorpSolutions + an AI partner, SoftCom needs AmeriShop, etc.) so the game's web of dependencies is legible at a glance instead of something a student has to reconstruct by reading six role cards side by side.

3. **Round results are reported as raw math, not a story.** This semester's round-by-round resolutions (see the chat transcripts / `strategy/out/`) were tables of raw roll → adjusted roll → multiplier → gross → adjustments → cost → profit. Correct, but only legible to someone fluent in the rules. Whatever resolves a round next time — GM narration or the digital interface below — should produce a plain-English recap alongside the numbers ("SoftCom went all-in on Hardware Blitz and it paid off huge because AmeriShop backed them and the dice went their way") so the class understands *why* something happened, not just the delta.

## Digital pick-and-resolve interface (Spring 2026 note)

Running Round 1 and Round 2 live via a Google Sheet + manual GM tracking worked, but resolving each round required a lot of back-and-forth to pin down details that weren't captured in the sheet: which specific team a targeted strategy (Premium Partner, Private Label, Integrator, Migration Agent) was aimed at, which universe a cross-universe partner belonged to, and — the biggest source of ambiguity — who the "opposing manufacturer" was when a Migration Agent play's target and the CorpSolutions team weren't obviously paired (e.g. a cross-universe Migration Agent target left the victim SoftCom undetermined and had to be assumed, then corrected after the fact).

**Proposal:** a real interface where each team picks their strategy (and, for any targeted strategy, their target) from a form each round, rather than free-text on a shared sheet. Picks would be structured/forced — you can't submit "Migration Agent" without naming a target, so the ambiguity that ate up chat time this round can't happen. Once all teams for a round have submitted, the GM triggers resolution and the interface computes dependencies, dice, chip allocation, and revenue automatically using the same rules as `simulator.py` (single concrete outcome per round, not the exhaustive EV average that file computes for balance-testing), and reveals it to the room.

A first attempt at this was started mid-session as a claude.ai Artifact — useful as a quick UX prototype, but **not the production direction**: an Artifact's shared-data features only work inside claude.ai's own runtime, so a tool built that way would stay dependent on Anthropic's platform indefinitely rather than becoming something the course owns outright. The real build should follow the same model as `tools/ops-strategy/` itself: a standalone web app, built and deployed the same way (GitHub Actions → GitHub Pages), with a lightweight free-tier database (Firebase or Supabase are the obvious options) for the shared team-picks data. Fully owned, no Anthropic dependency at runtime. An Artifact prototype is still fair game for testing the UX cheaply before committing to that build.

**Signup, folded into the same app (first screen):** a grid of 12 color slots (6 per universe), greyed out as they're claimed. A team clicks a color, enters their names, and claims it — company identity stays hidden behind the color until the GM triggers the reveal (just a display flag).

**Identity without logins:** each claimed slot gets a unique link at signup — that link *is* the team's credential for the rest of the game, same trust model as an unlisted Google Doc (possession of the link = access). No passwords, no accounts. Layer one cheap soft-check on top — re-confirm the signup names before a submission goes through — not for security against a determined adversary (not the real threat model in a classroom), but to catch the actual likely failure mode: someone submitting from the wrong tab.

**Dependency checking happens at resolve, not at submit** — a team's dependency (e.g. PearCom needs a CorpSolutions Integrator) can't be validated the moment they submit, since the team providing it may not have submitted yet. Checking has to scan all twelve teams' picks at once, triggered when the GM calls for resolution — automating exactly what's been done by hand in chat all this session.

**The GM screen should stay a copilot, not a replacement** — sees submission status per team, rolls the per-market Shock (auto-lookup which one triggered), triggers reveal. Freeform stuff like Silicore's bribes still needs a human adjudicating, not a formula — don't try to automate that away.

Scope for that build, if picked back up:
- Structured strategy + target picks per team per round (dropdowns, not free text)
- Automatic dependency checking across both universes (cross-market partnerships allowed, chip markets stay local per universe)
- Automatic dice resolution using the real dice tables, with roll modifiers (AmeriShop's Algorithm, OpenAIco's Model Degradation, Shock B) applied transparently — show the math, don't hide it
- Per-market Shock roll with auto-lookup of which Shock triggered and its effects
- Once-per-game power tracking (PearCom's Lock-In, Silicore's Allocation Priority, CorpSolutions' Veto) so the interface itself enforces the "first use only" rule instead of relying on the GM to remember
- Running per-team profit totals across rounds, visible to the class
- A plain-language recap alongside every resolved round's numbers (see "Content & narrative depth" above) — the interface is the natural place to solve that gap, since it's already generating the outcome and can narrate it in the same pass instead of just dumping a table
- Company backgrounds and plain-language strategy glosses (also above) surfaced directly in the pick screen, not just on the static role card page — so the "what does this mean for me" translation is available right where a team is making the decision

**Explicitly cut, for a class-level build:**
- Real accounts/passwords/email verification — the per-team link already gets most of the value for near-zero complexity
- An in-app chat/negotiation layer between teams — the negotiating is the point of the class, happening in person; mediating it in-app would actively work against the pedagogy
- Fully autonomous resolution with no GM in the loop
- Real-time multiplayer polish (live cursors, presence indicators) — a manual refresh to see the latest state is plenty
- Cross-semester history/admin dashboards, Canvas/grade integration, a packaged mobile app — real ideas, none needed for this to work next semester
