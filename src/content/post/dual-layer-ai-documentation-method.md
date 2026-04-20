---
title: "Dual-Layer AI Documentation Method: An AI-First Documentation System for Repositories"
description: "A practical AI-first documentation framework for software repositories: bootstrap docs, feature guides, rules, workflows, and incremental updates for AI agents."
dateFormatted: April 20, 2026
tags: ["AI", "Documentation", "Software Architecture"]
---

> Claudio Caporro - v0.3

This is a practical guide for the Dual-Layer AI Documentation Method, a repository documentation system used primarily by agents. It defines where documentation lives, what each area is responsible for, and how updates should be made incrementally.

---

## AI-First Documentation Philosophy

Documentation in a repository adopting this system is designed primarily for **AI Agents**. By maintaining high-quality docs, we achieve:

1. **Token Efficiency**: Reducing the "research loop". Instead of an agent reading 20 source files to understand a pattern, it reads one doc.
2. **Ambiguity Reduction**: Providing the **Rationale (Why)** behind specific architectural choices prevents agents from "correcting" intentional designs they might perceive as non-standard.
3. **Active Context**: Documentation serves as an external memory for the model, ensuring it operates with the same strategic context as the original architect.

---

## 1) File Types and Responsibilities

### A) Bootstrap Files (Always Loaded)

**Root bootstrap file (e.g. `/AGENTS.md` or `/agents.md`)**
- **Purpose**: Minimum context + global invariants + how to use docs.
- **Goal**: Keep it short and stable (target: 200-300 lines).
- **Contents**:
  - Repository mission / objectives.
  - Core non-negotiable tech stack.
  - Global "breaking" conventions for the current codebase.
  - Instructions on how to include docs in prompts.
  - Minimal glossary.

### B) Informational (Loaded on Demand)

**`docs/features/[feature].md`**
- **Purpose**: implementation guide for a specific area.
- **Contents**: patterns, examples, decisions, boundaries, and operational notes.
- **Language**: Descriptive (avoid MUST/NEVER).
- **Structure**: flexible by feature; include only the sections useful for that specific domain.

### C) Prescriptive Rules (Validated by Reviewer)

**`docs/rules/[feature].rules.md`**
- **Purpose**: Checkable rules + Rationale + Priority.
- **Language**: Prescriptive (MUST/NEVER/DO NOT).
- **Naming**: `[feature].[nn]` (e.g., `pages.04`).

### D) Global Rules

**`docs/rules/general.rules.md`**
- **Purpose**: Rules that apply everywhere (security, boundaries, testing).
- **Note**: Avoid duplication. If it's global, it stays here. If specific, it goes to the feature rules.

### E) Execution Workflows

**`docs/workflows/*.md`**
- **Purpose**: reusable execution playbooks for recurring tasks.
- **Source migration**: if workflows were previously stored elsewhere, centralize them in `docs/workflows`.
- **Usage**: reference only the workflow relevant to the current task.

### F) Metadata Header (features + rules)

All files in `docs/features/*.md` and `docs/rules/*.rules.md` must include YAML frontmatter for automated routing and incremental updates.

Required keys:

```yaml
---
title: <name>
doc_type: feature | rules
status: active
last_updated: YYYY-MM-DD
covers:
  - path/pattern/**
related_docs:
  - docs/README.md
---
```

---

## 2) The 2-Stage Workflow

To prevent **Prompt Fatigue** (where agents lose quality due to over-constraint), we follow a two-stage engagement model:

### Stage 1: Explore / Generate (The "Builder" Phase)
- **Goal**: Reach a working solution that respects core architecture and logic.
- **Focus**: the root bootstrap file + `docs/features/*.md`.
- **Constraint**: Ignore detailed `.rules.md` to maintain speed and creativity. Only "Critical" global invariants apply.

### Stage 2: Converge / Enforce (The "Polishing" Phase)
- **Goal**: Align the working solution with project standards and style.
- **Focus**: `docs/rules/*.rules.md`.
- **Engagement**: Triggered by specific refactor requests or by the Reviewer Agent.

---

## 3) Recommended Folder Structure

```text
/AGENTS.md (root bootstrap file, or `/agents.md`)

/docs
  README.md
  INDEX.md
  /features
    pages.md
    app-shell.md
    ...
  /rules
    general.rules.md
    pages.rules.md
    ...
  /workflows
    create-docs.md
    update-docs.md
    review-docs.md
```

---

## 4) Info vs. Rules: Content Separation

### Inside `docs/features/[feature].md` (INFO)

Focus on **Building**. Helpers, not judges.

- Purpose of the feature.
- Local terminology.
- Recommended component/file structure.
- Design decisions ("We chose X because...").
- Avoid long lists of "thou shalt not".

### Inside `docs/rules/[feature].rules.md` (RULES)

Focus on **Validation**. Must be checkable.

**Template**:

```markdown
pages.04 - [PRIORITY]
Rule: ...
Why: ...
Check: ... (optional)
Autofix: ... (optional)
```

---

## 5) Priority Matrix

| Level | Definition | Guideline |
| :--- | :--- | :--- |
| **CRITICAL** | Severe bugs, data loss, security, breaking contracts, major refactors. | "If this hits production, we are in trouble." |
| **HIGH** | Technical debt, UI inconsistency, bad maintainability. | "We will have to fix this very soon." |
| **NICE TO HAVE** | Style, readability, preferences. | "Clean it up when we have time." |

---

## 6) Usage Policy for Agents

- **Builder Agent (Standard Work)**:
  - **ALWAYS Reads**: the root bootstrap file.
  - **Reads on Demand**: `docs/features/[feature].md`.
  - **IGNORES**: `docs/rules/*.rules.md` (to prevent fatigue).
- **Enforcer/Reviewer Agent (Quality Pass)**:
  - **ALWAYS Reads**: the root bootstrap file + `docs/rules/general.rules.md`.
  - **Validates**: Against specific `docs/rules/[feature].rules.md` for the modified areas.

---

## 7) Incremental Update Policy

- **Do not** rewrite documentation wholesale for routine changes.
- **Do** update only impacted files/sections based on the active diff.
- Use `covers:` metadata to identify likely impacted docs first.
- Update `last_updated` whenever a doc is edited.

---

## 8) File Linking Convention

When linking to files within the repository from documentation:

- **ALWAYS** use paths relative to the project root (e.g., `[App.tsx](src/app/App.tsx)`).
- **DO NOT** use absolute paths (e.g., `file:///Users/...`) as they are not portable across different environments.
- **DO NOT** use the `file://` protocol.

---

## The Golden Rule

If a "rule" is not checkable via code/diff, it is not a rule. Move it to `docs/features/*.md` as a best practice.
