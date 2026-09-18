# 339 Agent — Future Idea

**Status:** idea stage, not started. Captured from a planning conversation, Fall 2026.

An AI chatbot/agent for MGMT 339 students — a course assistant they can ask about logistics (syllabus, schedule, assignments, exams) instead of hunting through Canvas or emailing. Ambitious end goal is a fuller tutoring-style agent; the constraints below point toward a much narrower, safer v1 first.

## Recommended v1 scope: logistics & navigation, not tutoring

The highest-value, lowest-risk starting point is a **syllabus/schedule/logistics assistant** — answers "when is Exam 2," "where do I submit Assignment 3," "what's covered this week," "what's the late policy" — and does **not** attempt to solve homework or exam problems. This sidesteps most of the academic-integrity risk by construction (the bot simply doesn't have access to anything it could leak) rather than relying on it behaving correctly when asked cleverly.

A richer tutoring/content-agent version is a real phase 2, but it's a much heavier lift on the integrity, liability, and content-licensing side — don't start there.

## Constraints to design around

**Copyright.** Only ingest content actually authored by Sid — slides, syllabus, schedule, assignment descriptions, rubrics, own notes. That's unambiguously his to use. The textbook is explicitly out — feeding it into a retrieval system that then answers questions from it functions as a substitute for the book, a much weaker fair-use case than quoting a paragraph in lecture. Any third-party readings/case PDFs need their own licensing check before going in; assigning something in class doesn't imply the right to feed it to a chatbot.

**Academic integrity — "shouldn't give answers."** Two separate guardrails, not one:
- *Content curation (the real barrier):* never give the bot access to answer keys, solution sets, or exam answers at all. If it can't see them, it can't leak them regardless of how a question is phrased.
- *Behavioral layer (defense in depth, not the real barrier):* a system prompt that distinguishes logistics questions (answer directly) from content-solving questions ("solve this LP problem for me" — redirect to the method/formula sheet, don't produce the answer). This layer can be talked around by a clever student, which is exactly why content curation has to do the real work.

**Privacy / FERPA.** No login, no gradebook access, no per-student submission history, nothing that ties a conversation to an individual student's academic record. A syllabus/schedule/FAQ bot with no personal data behind it avoids FERPA territory almost entirely. Connecting it to Canvas grades or "how am I doing" moves into a much more regulated space needing real data agreements — not part of v1.

**Institutional policy.** Check with CSUF IT / academic tech before it's in front of students — many universities have rules about deploying third-party AI tools in a course. Ask before it's live, not after.

**Cost & liability.** Needs a usage cap so it can't run up an unexpected API bill, and a built-in "not sure — check the syllabus / ask me directly" fallback. A hallucinated wrong exam date is a more damaging failure mode here than for a generic chatbot, because students will treat it as authoritative.

## Open, not yet decided
- Platform/hosting (own infra vs. something GCP-based, given the account is already available)
- Whether this shares any infrastructure with the ops-strategy digital interface work, or stays fully separate
