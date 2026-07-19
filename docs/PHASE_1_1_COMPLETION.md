# Phase 1.1 Completion Certificate

**Release:** `v0.2.0`  
**Status:** Complete  
**Scope:** Data Layer (GitHub Connector, Journal, Normalizer, Entity Store)

## Summary

Stage **1.1** delivers the data foundation for Phase 1 GitHub Radar MVP: ingest GitHub entities, persist immutable raw payloads, normalize into D1, and expose store helpers for later feature/metric stages.

| Stage | Release | Delivered |
|-------|---------|-----------|
| **1.1** Data Layer | `v0.2.0` | GitHub REST connector, R2 journal, normalizer, D1 entity store + migration `0002` |
| **1.2** Feature Engine | `v0.2.1` | *(next)* |
| **1.3** Metric Engine + DAG | `v0.3.0` | *(later)* |

## What ships in v0.2.0

- Root and **all** workspace packages aligned to **0.2.0**
- API and worker health/version responses report `0.2.0`
- `@radar-pro/connectors`: `GitHubClient`, journal writer/reader/replay, normalizers
- `@radar-pro/database`: store CRUD for owners/repos/issues/PRs/releases/contributors/datasets/journal entries
- `@radar-pro/core`: GitHub API response types and normalized domain types
- Migration `packages/database/migrations/0002_journal_and_details.sql`
- Dev port fix: API `8787`/`9229`, worker `8788`/`9230` so `pnpm dev` does not collide

## Explicitly out of scope (later Phase 1 stages)

- Feature / metric engines and DAG runtime
- BFF domain endpoints and auth
- Production dashboard product UI beyond shell
- Production Cloudflare resource IDs (placeholders remain)

## Quality gates (pre-tag)

Run from repo root:

```bash
pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

All four must pass before tagging `v0.2.0`.

## Handoff to stage 1.2

Next: **1.2 Feature Engine** (`docs/PHASE_1_GITHUB_MVP.md`) → toward `v0.2.1`.

Suggested first slice:

1. Base features (e.g. star velocity, release frequency)
2. Simple sequential feature executor

## Sign-off

| Role | Decision |
|------|----------|
| CEO | Stage 1.1 accepted as release `v0.2.0` |
| Engineering | Versions aligned, green gates, annotated tag `v0.2.0` |

**Stage 1.1 is closed. Proceed to stage 1.2.**
