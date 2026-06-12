---
name: test-driven-development
description: Use when implementing any feature or bugfix, before writing implementation code
---

# Test-Driven Development (TDD)

## Overview

Write the test first. Watch it fail. Write minimal code to pass.

**Core principle:** If you didn't watch the test fail, you don't know if it tests the right thing.

**Violating the letter of the rules is violating the spirit of the rules.**

## The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

Write code before the test? Delete it. Start over. No exceptions.

## Red-Green-Refactor

### RED — Write Failing Test
One minimal test showing what should happen. Clear name, tests real behavior, tests one thing.

### Verify RED — Watch It Fail (MANDATORY. Never skip.)
```bash
npm test path/to/test.test.ts
```
- Test fails (not errors)
- Failure message is expected
- Fails because feature missing (not typos)

**Test passes immediately?** You're testing existing behavior. Fix the test.

### GREEN — Minimal Code
Write simplest code to pass the test. Don't add features, refactor, or "improve" beyond the test.

### Verify GREEN — Watch It Pass (MANDATORY.)
Confirm test passes AND other tests still pass AND output is pristine.

### REFACTOR — Clean Up (after green only)
Remove duplication, improve names, extract helpers. Keep tests green. Don't add behavior.

### Repeat
Next failing test for next feature.

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "Too simple to test" | Simple code breaks. Test takes 30 seconds. |
| "I'll test after" | Tests passing immediately prove nothing. |
| "Tests after achieve same goals" | Tests-after = "what does this do?" Tests-first = "what should this do?" |
| "Already manually tested" | Ad-hoc ≠ systematic. No record, can't re-run. |
| "Deleting X hours is wasteful" | Sunk cost fallacy. Unverified code is technical debt. |
| "TDD is dogmatic, I'm being pragmatic" | TDD IS pragmatic — finds bugs before commit. |

## Red Flags — STOP and Start Over

- Code before test
- Test after implementation
- Test passes immediately (without seeing it fail)
- Can't explain why test failed
- "I already manually tested it"
- "Tests after achieve the same purpose"
- "Keep as reference" or "adapt existing code"
- "This is different because..."

**All of these mean: Delete code. Start over with TDD.**

## Verification Checklist

Before marking work complete:
- [ ] Every new function/method has a test
- [ ] Watched each test fail before implementing
- [ ] Each test failed for expected reason
- [ ] Wrote minimal code to pass each test
- [ ] All tests pass
- [ ] Output pristine (no errors, warnings)
- [ ] Edge cases and errors covered

Can't check all boxes? You skipped TDD. Start over.

## Bug Fixes

Write failing test reproducing the bug. Follow TDD cycle. Never fix bugs without a test.
