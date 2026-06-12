---
name: subagent-driven-development
description: Use when executing implementation plans with independent tasks in the current session - coordinates implementation through specialized subagents with two-stage review
---

# Subagent-Driven Development

## Overview

Coordinate implementation through specialized subagents rather than manual execution.

**Core principle:** Fresh subagent per task + two-stage review (spec then quality) = high quality, fast iteration.

## Process

For each task:
1. Dispatch an implementer subagent with complete task context
2. Answer any clarifying questions before implementation begins
3. Run **specification compliance review** — does it match the spec?
4. Run **code quality review** — is the code well-written?
5. Have the implementer address any identified issues
6. Re-review until both stages approve

Execute continuously without checking with humans. Stop only when:
- Blocked
- Facing genuine ambiguity
- All work is complete

## Model Selection

| Task | Model |
|------|-------|
| Mechanical single-file implementation | Cheaper model |
| Multi-file integration | Standard model |
| Architectural decisions | Most capable model |

## Critical Safeguards

- Never skip reviews
- Never proceed with unfixed issues
- Always run specification compliance review BEFORE code quality review (not the reverse)
- Keep reviewer context separate from implementer context
