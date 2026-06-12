---
name: systematic-debugging
description: Use when facing a bug, error, or unexpected behavior - requires root cause investigation before attempting any fix
---

# Systematic Debugging

## Overview

**NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST.**

Symptom-based repairs create new problems rather than solving existing ones.

## Four-Phase Methodology

### Phase 1: Root Cause Investigation
- Carefully read error messages
- Consistently reproduce the issue
- Review recent changes
- Gather diagnostic evidence across system components
- Trace data flow backward to identify where problems originate

### Phase 2: Pattern Analysis
- Locate comparable working implementations
- Study reference implementations thoroughly
- Document all differences between functioning and broken code
- Understand required dependencies

### Phase 3: Hypothesis and Testing
- Form explicit theories about root causes
- Implement minimal test changes
- Verify results
- Abandon assumptions when evidence contradicts them

### Phase 4: Implementation
- Create failing test cases first
- Apply single targeted fixes addressing root causes (not symptoms)
- Verify success
- If three or more separate fix attempts fail: stop and question whether the underlying architecture is fundamentally flawed

## Red Flags — STOP

- Proposing solutions before understanding data flows
- Attempting multiple fixes simultaneously
- Guessing at causes without evidence

## Why This Works

Systematic investigation typically resolves issues in 15-30 minutes with 95% first-attempt success.
Trial-and-error takes 2-3 hours with 40% success rates.
