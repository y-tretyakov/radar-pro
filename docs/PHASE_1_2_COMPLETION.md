# Phase 1.2 Completion Certificate

**Release:** `v0.2.1`
**Status:** Complete
**Scope:** Feature Engine (Feature Registry, Built-in Features, Sequential Executor)

## Summary

Stage **1.2** delivers the feature computation layer for Phase 1 GitHub Radar MVP: define, register, and compute repository features on demand.

| Stage | Release | Delivered |
|-------|---------|-----------|
| **1.1** Data Layer | `v0.2.0` | GitHub REST connector, R2 journal, normalizer, D1 entity store + migration `0002` |
| **1.2** Feature Engine | `v0.2.1` | Feature types, registry, 8 built-in features, sequential executor |
| **1.3** Metric Engine + DAG | `v0.3.0` | *(next)* |

## What ships in v0.2.1

- **Feature types system** (`FeatureDefinition`, `FeatureResult`, `FeatureComputer`, `RegisteredFeature`)
- **Feature registry** — create, register, retrieve, and list features (`createRegistry`, `registerFeature`, `getFeature`, `listRegisteredFeatures`)
- **8 built-in features** in `@radar-pro/engine/src/features/`:
  - `stars` — current star count
  - `release_frequency_30d` / `release_frequency_7d` — releases over time windows
  - `issue_closure_rate_7d` — issues closed in 7 days
  - `open_issue_count` — currently open issues
  - `pr_merge_rate_7d` — PRs merged in 7 days
  - `open_pr_count` — currently open PRs
  - `contributor_count` — unique contributors
- **Sequential executor** (`executeFeatures`) — runs features in order, returns array of `FeatureResult`
- **Default registry** (`createDefaultRegistry`) — one-shot registry with all built-in features
- **14 unit tests** covering registry operations, feature metadata, and executor integration
- All workspace package versions aligned to **0.2.1**
- API and worker health responses report `0.2.1`

## Explicitly out of scope (later Phase 1 stages)

- Metric engine and scoring (`health_score_v1`, `growth_score_v1`)
- DAG runtime (topological sort, parallel execution, caching)
- Metric versioning and persistence
- Feature value persistence (`feature_values` DB table — added when metrics need it)
- BFF domain endpoints and auth
- Production dashboard product UI beyond shell

## Quality gates (pre-tag)

Run from repo root:

```bash
pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

All four must pass before tagging `v0.2.1`.

## Handoff to stage 1.3

Next: **1.3 Metric Engine + DAG** (`docs/PHASE_1_GITHUB_MVP.md`) → toward `v0.3.0`.

Suggested first slice:

1. Metric definitions (e.g. `health_score_v1`, `growth_score_v1`)
2. `SimpleDAGExecutor` with topological sort
3. Metric versioning and caching

## Sign-off

| Role | Decision |
|------|----------|
| CEO | Stage 1.2 accepted as release `v0.2.1` |
| Engineering | Versions aligned, green gates, annotated tag `v0.2.1` |

**Stage 1.2 is closed. Proceed to stage 1.3.**
