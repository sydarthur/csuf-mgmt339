# status/ — how this course reports its state

This folder is how the project tells the outside world where it stands. Sid's control tower reads `STATUS.md` from here and shows it on his dashboard and phone. Nothing else in this repo is read by the tower, so if it isn't in `STATUS.md`, the portfolio doesn't know about it.

## Files

| File | What it is | How it changes |
|---|---|---|
| `STATUS.md` | Current snapshot: where things stand right now | Rewritten in place, never appended |
| `project_timeline.md` | Running log of decisions, findings, and meetings | Append-only, dated entries |
| `to-tower.md` | Requests for the tower (splits, new repos, cross-project) | Append entries; mark done when the tower replies |
| `from-tower.md` | Briefs from the tower | Written by the tower only |
| `CLAUDE.md` | These instructions | Changed only via the control tower's templates |

## When to update

- At the end of every working session where anything meaningful changed.
- Whenever Sid says "update status" or similar.
- Right after an exam is finalized, a module or tool ships, or grades are submitted.

## Procedure

1. **Timeline first.** If something significant happened (exam built, tool shipped, policy decision, lesson learned in class), add an entry at the end of `project_timeline.md`:
   ```markdown
   ## YYYY-MM-DD — <one-line headline>
   <what happened, why, and what it changes>
   ```
   Entries stay in chronological order by the date the event happened. Usually that means appending at the end; when logging an older event (e.g., a meeting from last week), insert it in date order instead.
   Don't restructure or rewrite older entries. If an older entry is now wrong, say so in the new entry ("supersedes 2026-08-13").
   If the source was a meeting, link the transcript or notes instead of pasting them.
2. **Then rewrite `STATUS.md`** so it reflects the current state after that entry. Set `updated:` to today.
3. **Check "Connects to"** for links to other courses or to Sid's research (cases, tools, examples).

## STATUS.md rules

- Frontmatter keys are fixed: `project`, `type`, `stage`, `target`, `updated` (plus `draft: true` while unreviewed).
- `stage` is one of: `prep | in-session | grading | done`. `target` names the course and term (e.g., "MGMT 339, Fall 2026").
- Sections are fixed and in this order: Now, Next, Blocked on, Ideas / loose threads, Connects to.
- 2 to 5 bullets per section, one line each. It is read on a phone: lead with the point, no preamble.
- Be specific: journal names, dates, table numbers, task names, who we're waiting on.
- An empty section gets `- (none)`. Don't pad.
- `draft: true` means Sid hasn't reviewed it yet. Remove it only when Sid confirms the content.

## Talking to the tower

The tower (Sid's control tower repo) coordinates across projects. Two files in this folder carry messages:

- **`to-tower.md`: requests up.** Anything that crosses repo boundaries goes here, not into action: splitting this repo, spinning off a new project, moving work to or from another repo, template or structure changes, cross-project ideas. Append an entry; never edit other repos or the tower yourself.
  ```markdown
  ## YYYY-MM-DD: <short title>
  status: open
  <what and why; for a split, list exactly what moves where (folders, files, docs) and what stays>
  ```
  When the tower has handled it, it replies in `from-tower.md`; then change `status: open` to `status: done (see from-tower YYYY-MM-DD)`.
- **`from-tower.md`: briefs down.** Read it at the start of a session. Discuss with Sid before acting on it. Never edit it.

## Never

- Don't put student names, grades, or anything from `grading/` into these files.
- Don't copy `STATUS.md` into the Obsidian vault or elsewhere. The control tower handles that.
