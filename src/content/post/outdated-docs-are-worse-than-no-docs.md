---
title: Outdated Docs Are Worse Than No Docs — How AI Can Keep Documentation Alive
description: Exploring a practical solution to the chronic problem of outdated documentation using AI agents, structured metadata, and automation to create truly living documentation systems.
dateFormatted: August 18, 2025
tags: ["AI", "Documentation", "Engineering"]
---

![Obsolete documentation](/assets/images/posts/obsolete-documentation.png)

There's an uncomfortable truth in our industry: project documentation is almost always outdated. And there are only two basic rules to avoid it:

1. Write it.
2. Keep it updated.

We all stumble on the second one. In this post, I won't talk about how to write good documentation (that's an art on its own), but about how to force it to stay in sync with code—automatically.

## The Documentation Paradox in the AI Era

Documentation is both a blessing and a curse for every dev team. It's essential for maintainability and collaboration, but it's always one step behind the code. For years, as a Tech Lead, I tried everything: gamification, extra story points, strict PR reviews. Result? It never really stuck. I gave up.

This chronic problem has now turned into a paradox. AI lets us generate and change code at insane speed, making docs outdated even faster. But at the same time, AI desperately needs them.

To get decent results from an AI assistant, you need to give it "context." A lot of context—precise and up to date. Documentation is no longer for humans; it's the food we feed to models so they can generate consistent code and support architectural decisions.

> **An AI is only as good as the documentation it's based on.**

If the model works with outdated info, best case you get something inconsistent. Worst case: full of bugs. The way out? Automation.

## "Living" Documentation with AI Agents

The solution I'm experimenting with is simple: turn documentation from a static artifact into a living, self-checking element of the repo. Three ingredients make it work.

### Markdown Format

Nothing fancy here. Markdown is the de-facto standard for tech docs in repos. It's readable, versionable, and flexible.

### Metadata with Frontmatter

By using YAML frontmatter at the start of Markdown files, we enrich the doc with structured metadata. It turns plain text into a smart "object" aware of its context.

A minimal example:

```yaml
---
last_updated: '2025-08-01'
related_files:
  - 'backend/payment_service.py'
  - 'backend/payment_controller.py'
---
```

Or more advanced:

```yaml
---
title: "User Authentication Management"
author: "Claudio Caporro"
last_updated: "2025-08-15"
status: "complete" # draft, in_review
audience:
  - "dev"
  - "CS"
related_files:
  - "src/controllers/UserController.php"
  - "src/services/AuthService.js"
  - "src/routes/api/auth.php"
---
```

For this experiment, the two key fields are:

- **last_updated**: the date the document was last verified
- **related_files**: the crucial link between documentation and the source code files it describes

### The AI Agent

The AI agent is the script that uses these metadata fields to orchestrate the process. Two main ways to trigger it:

#### Code-First Trigger

The agent runs when code changes.

- **How it works**: It takes the list of modified files and diffs. Using `related_files`, it finds potentially affected docs and suggests updates. If we also provide the User Story or task, quality improves a lot.
- **When to run it**:
  - In the CI/CD pipeline (on each commit or merge request)
  - With local pre-commit hooks
  - As part of a dev workflow (e.g., Spec-Driven Development)

#### Doc-First Trigger

The agent runs periodic checks starting from the docs.

- **How it works**: It scans docs, compares `last_updated` with the last modified date of the files in `related_files`. If code changed after the doc, it analyzes the diff and updates the doc.

## The Implementation Strategy

This system works because it creates a tight feedback loop between code and documentation. When developers modify code, the system automatically identifies which documentation might be affected and either updates it automatically or flags it for review.

The key is that by making documentation machine-readable through structured metadata, we can apply the same automation principles we use for code to our documentation workflow. It's not just about writing better docs—it's about creating a sustainable system that maintains documentation quality over time.

## Conclusion

Adopting this system isn't just a technical fix—it's a real mindset shift. It finally kills documentation tech debt, gives AI reliable context to work with, and frees up dev time for higher-value tasks like design and architecture.

This approach shows how our role is evolving: from simple executors to orchestrators of intelligent systems. We're not just writing code anymore; we're designing systems that can maintain themselves.

With this system we've tackled how to keep docs updated. As for how to write them well in the first place—that's another chapter. Maybe for a future post.

