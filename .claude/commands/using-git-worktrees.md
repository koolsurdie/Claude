---
name: using-git-worktrees
description: Use when starting feature work that needs isolation from current workspace or before executing implementation plans - ensures an isolated workspace exists via native tools or git worktree fallback
---

# Using Git Worktrees

## Overview

Ensure work happens in an isolated workspace. Prefer your platform's native worktree tools. Fall back to manual git worktrees only when no native tool is available.

**Core principle:** Detect existing isolation first. Then use native tools. Then fall back to git. Never fight the harness.

**Announce at start:** "I'm using the using-git-worktrees skill to set up an isolated workspace."

## Step 0: Detect Existing Isolation

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
```

**Submodule guard:** Also check `git rev-parse --show-superproject-working-tree` — if it returns a path, you're in a submodule, not a worktree.

**If `GIT_DIR != GIT_COMMON` (and not a submodule):** Already in a linked worktree. Skip to Step 3.

**If `GIT_DIR == GIT_COMMON`:** Normal repo. Ask for consent before creating a worktree.

## Step 1: Create Isolated Workspace

### 1a. Native Worktree Tools (preferred)
If you have a tool named `EnterWorktree`, `WorktreeCreate`, `/worktree`, or `--worktree`, use it. Skip to Step 3.

### 1b. Git Worktree Fallback

**Directory selection priority:**
1. Declared preference in your instructions
2. Existing `.worktrees/` directory (preferred)
3. Existing `worktrees/` directory
4. Existing global `~/.config/superpowers/worktrees/$project`
5. Default: `.worktrees/` at project root

**Safety verification (project-local only):**
```bash
git check-ignore -q .worktrees 2>/dev/null
```
If NOT ignored: Add to .gitignore, commit, then proceed.

**Create:**
```bash
git worktree add "$path" -b "$BRANCH_NAME"
cd "$path"
```

## Step 3: Project Setup

Auto-detect and run:
```bash
if [ -f package.json ]; then npm install; fi
if [ -f Cargo.toml ]; then cargo build; fi
if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
if [ -f go.mod ]; then go mod download; fi
```

## Step 4: Verify Clean Baseline

Run tests. If tests fail: report failures, ask whether to proceed.

## Red Flags

**Never:**
- Create a worktree when Step 0 detects existing isolation
- Use `git worktree add` when you have a native worktree tool
- Skip Step 1a by jumping to Step 1b's git commands
- Create worktree without verifying it's ignored (project-local)
- Skip baseline test verification
