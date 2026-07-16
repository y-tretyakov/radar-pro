# Agent & contributor process rules

Durable process rules for humans and AI agents working on **Radar Pro**.  
These rules are permanent unless the CEO explicitly revises them.

Related:

- Development setup: [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md)
- Phase completion: [`docs/PHASE_0_COMPLETION.md`](docs/PHASE_0_COMPLETION.md)
- Roadmap: [`docs/Roadmap.md`](docs/Roadmap.md)
- Changelog: [`CHANGELOG.md`](CHANGELOG.md)

---

## Branching model

| Branch | Role |
| --- | --- |
| **`main`** | Protected **production / release** branch. Receives merges only when a **full phase** is complete (= a release + version bump per docs). |
| **`dev`** | **Integration** branch for active development. Created from `main`. Feature work merges here first. |

### Stage work (feature branches)

Every **stage of a phase** (e.g. Phase 1 stage 1.1) is done on a **new branch from `dev`** with a meaningful name under a feature-folder prefix:

```text
feat/phase-1/1.1-github-connector
feat/phase-1/1.2-feature-engine
```

**Pattern:**

```text
feat/phase-N/<stage>-<short-slug>
chore/...
fix/...
docs/...
```

Use `chore/`, `fix/`, `docs/` (and similar conventional prefixes) when the work is not a phase-stage feature.

### Merge flow

1. **Stage complete** → open a **PR into `dev`** (not `main`).
2. After review/approval → **merge to `dev`**.
3. When the **entire phase** is done:
   - PR **`dev` → `main`**
   - Version bump per documentation / roadmap
   - Update `CHANGELOG.md` (move Unreleased → versioned section)
   - Create git tag (e.g. `v0.2.0`)
   - Publish release as documented

Do **not** merge feature branches directly to `main` except for rare CEO-authorized process/bootstrap commits.

---

## CHANGELOG

- Always maintain [`CHANGELOG.md`](CHANGELOG.md) (Keep a Changelog style).
- During stage work: record changes under **`[Unreleased]`** (`Added` / `Changed` / `Fixed` / etc.).
- On phase release: create a versioned section, date it, and clear or reset Unreleased as appropriate.
- Link related phase docs when useful (e.g. `docs/PHASE_*_COMPLETION.md`).

---

## Delegation / roles (AI agents)

| Role | Responsibility |
| --- | --- |
| **CEO / architect** | Plans, accepts, and reviews. Does **not** implement routine product code when implementer subagents are available. |
| **Implementers** | Work on **feature branches from `dev`**, implement the assigned stage, keep CHANGELOG Unreleased updated, open **PRs into `dev`**. |

### Expectations for agents

- Obey this file for any work under the repo root.
- Prefer small, reviewable PRs scoped to one stage or chore.
- Do not force-push `main` or rewrite released tags without explicit CEO approval.
- Never commit secrets, tokens, or credentials.
- Do not broaden scope beyond the assigned task.

---

## Quick reference

```text
main  ←── (phase complete: version bump, CHANGELOG, tag, release)
  ▲
 dev  ←── (stage PRs after review)
  ▲
feat/phase-N/<stage>-slug   (work here)
```
