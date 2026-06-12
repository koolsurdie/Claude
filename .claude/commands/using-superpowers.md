---
name: using-superpowers
description: Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions
---

# Using Superpowers

## Overview

Establishes disciplined workflow for invoking skills before taking any action.

**If there's even a 1% chance a skill might apply, you MUST invoke it.**

## Instruction Priority

1. **User's explicit instructions** (CLAUDE.md, direct requests) — highest priority
2. **Superpowers skills** — override default system behavior
3. **Default system prompt** — lowest priority

## How to Access Skills

In Claude Code: Use the `Skill` tool. Never use the Read tool on skill files.

## The Rule

**Invoke relevant or requested skills BEFORE any response or action.**

## Red Flags (You're Rationalizing)

| Thought | Reality |
|---------|---------|
| "This is just a simple question" | Questions are tasks. Check for skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me explore the codebase first" | Skills tell you HOW to explore. Check first. |
| "This doesn't need a formal skill" | If a skill exists, use it. |
| "I remember this skill" | Skills evolve. Read current version. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |
| "The skill is overkill" | Simple things become complex. Use it. |

## Skill Priority

1. **Process skills first** (brainstorming, debugging) — determine HOW to approach
2. **Implementation skills second** — guide execution

"Let's build X" → brainstorming first, then implementation skills.
"Fix this bug" → debugging first, then domain-specific skills.

## Skill Types

**Rigid** (TDD, debugging): Follow exactly. Don't adapt away discipline.
**Flexible** (patterns): Adapt principles to context.

The skill itself tells you which.
