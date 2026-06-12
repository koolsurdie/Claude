---
name: writing-plans
description: Use when about to enter plan mode or start implementation of a multi-step task - creates comprehensive implementation plans before any code is written
---

# Writing Plans

## Overview

Create comprehensive implementation plans for multi-step tasks.

**Output location:** `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md` (user preferences override)

## Key Principles

**No Placeholders:** Every step requires actual content — no "TBD," no vague instructions like "add validation," no code-free descriptions. If a step modifies code, show the complete implementation.

**Task Granularity:** Each task is one atomic action (2-5 minutes):
- Write failing test → verify failure → implement → verify pass → commit

**File Design:** Single responsibilities, clear boundaries. Group by responsibility, not by technical layer. Follow existing codebase patterns.

## Plan Structure

Each plan documents:
- File modifications
- Bite-sized tasks with concrete code examples
- TDD cycle: failing test → minimal implementation → verify → commit
- Verification steps after each task

## Self-Review Checklist

Before handoff, verify:
1. **Spec coverage** — Can each requirement be mapped to a task?
2. **Placeholder scan** — Remove vague language and incomplete steps
3. **Type consistency** — Function names and signatures match across tasks

## Execution Handoff

After saving, offer two paths:
- **Subagent-Driven** (fresh subagent per task with reviews) — use superpowers:subagent-driven-development
- **Inline Execution** (batched with checkpoints) — use superpowers:executing-plans
