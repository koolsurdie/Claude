---
name: requesting-code-review
description: Use after completing each task in subagent-driven development, and before merging to main - dispatches a code review subagent to catch issues early
---

# Requesting Code Review

## Overview

Dispatch a code review subagent during development work. Review early and often to catch issues before they cascade.

## When to Use

- After each task in subagent-driven development
- Before merge to main
- Optional: when stuck or before refactoring

## Process

1. Obtain git SHAs (base commit and head commit)
2. Dispatch a reviewer subagent with:
   - Work description
   - Requirements being implemented
   - Base and head commit hashes
3. Respond to feedback using the priority system below

## Feedback Priority

1. **Critical issues** — fix immediately before proceeding
2. **Important issues** — fix before merge
3. **Minor items** — note for later
4. **Disagreements** — push back with reasoning if reviewer is wrong

## Core Philosophy

- Early and frequent review catches issues before they cascade
- Keep reviewer context separate from development history
- Focus reviewer on the actual code product, not your thought processes
- Never skip reviews regardless of perceived simplicity
- Never proceed with unfixed critical or important issues
