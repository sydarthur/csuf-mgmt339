---
description: End-of-session status update for Sid's control tower (timeline, STATUS.md, tower messages).
---

# Update status

Run the status procedure in `status/CLAUDE.md`. Read it first if you haven't this session.

1. **Check `status/from-tower.md`** for any brief newer than what this session has seen. If there is one, summarize it for Sid in 2–3 lines and ask how to proceed before acting on it.
2. **Timeline:** if anything significant happened this session (exam built, tool shipped, policy decision, lesson learned in class), add a dated entry to `status/project_timeline.md` in date order, using the format in `status/CLAUDE.md`. If nothing significant happened, skip this step and say so.
3. **STATUS.md:** rewrite `status/STATUS.md` to reflect where things stand now. Follow the rules in `status/CLAUDE.md` (fixed sections, 2–5 one-line bullets each, specific). Set `updated:` to today. Keep `draft: true` unless Sid says it's reviewed.
4. **Connects to:** note links to other courses or to Sid's research (cases, tools, examples).
5. **Tower requests:** if anything this session crosses repo boundaries (split, new repo, moving work between repos, template change), append an entry to `status/to-tower.md` instead of doing it.
6. **Show Sid the diff** of the status files, then commit them (`Update status YYYY-MM-DD`) only if he says so. Don't push without asking.

Reply in at most four lines: what changed in STATUS.md, whether a timeline entry was added, and anything sent to the tower.
