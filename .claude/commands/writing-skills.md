---
name: writing-skills
description: Use when creating new skills, editing existing skills, or verifying skills work before deployment
---

# Writing Skills

## Overview

Writing skills IS Test-Driven Development applied to process documentation.

**Personal skills live in `~/.claude/skills` for Claude Code.**

**Core principle:** If you didn't watch an agent fail without the skill, you don't know if the skill teaches the right thing.

**REQUIRED BACKGROUND:** You MUST understand superpowers:test-driven-development before using this skill.

## What is a Skill?

A **skill** is a reference guide for proven techniques, patterns, or tools.

**Skills are:** Reusable techniques, patterns, tools, reference guides
**Skills are NOT:** Narratives about how you solved a problem once

## TDD Mapping for Skills

| TDD Concept | Skill Creation |
|-------------|----------------|
| Test case | Pressure scenario with subagent |
| Production code | Skill document (SKILL.md) |
| Test fails (RED) | Agent violates rule without skill (baseline) |
| Test passes (GREEN) | Agent complies with skill present |
| Refactor | Close loopholes while maintaining compliance |

## SKILL.md Frontmatter

```yaml
---
name: skill-name-with-hyphens
description: Use when [specific triggering conditions and symptoms]
---
```

- `name`: letters, numbers, hyphens only (no special chars)
- `description`: starts with "Use when...", third person, triggering conditions ONLY — never summarize the skill's workflow (Claude will follow the description instead of reading the full skill)
- Max 1024 characters total

## The Iron Law

```
NO SKILL WITHOUT A FAILING TEST FIRST
```

Same as TDD — applies to new skills AND edits.

## RED-GREEN-REFACTOR for Skills

### RED: Run pressure scenario WITHOUT skill — document exact rationalizations
### GREEN: Write minimal skill addressing those specific violations. Re-test.
### REFACTOR: Find new rationalizations → add explicit counters → re-test until bulletproof

## Common Mistakes

**❌ Description summarizes workflow** — Claude will take the shortcut and skip reading the skill
**❌ Narrative examples** — "In session 2025-10-03, we found..."
**❌ Multi-language examples** — pick one excellent example
**❌ Untested skill** — deploying untested = deploying broken code
