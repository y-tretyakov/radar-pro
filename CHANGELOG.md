# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Phase 1 stage 1.3 — Metric Engine + Simple DAG. See [docs/PHASE_1_GITHUB_MVP.md](docs/PHASE_1_GITHUB_MVP.md).

### Added

- **Metric Engine (`@radar-pro/engine`):** Metric types, registry, and two built-in composite scoring metrics
  - `health_score_v1` — overall repository health (7 weighted features: stars, releases, issues, PRs, contributors)
  - `growth_score_v1` — growth potential (5 weighted features: releases, issues, PRs, contributors)
  - `createDefaultMetricRegistry()` — one-shot registry with both built-in metrics
  - Each metric declares its `dependencies` for DAG-based execution
- **Simple DAG Executor (`@radar-pro/engine`):** DAG runtime with topological sort (Kahn's algorithm)
  - `buildExecutionPlan()` — produces layered execution plan with cycle detection
  - `executeDag()` — executes layers in order, feeds computed values between layers
  - `buildAndExecuteDag()` — convenience wrapper for the full pipeline
  - Each layer executes in parallel (independent nodes), sequential across layers
- **Caching Layer (`@radar-pro/engine`):** Cache computed feature/metric values in D1
  - `readCache()` — checks for fresh cached value by name, entity, and version
  - `writeCache()` — persists computed value with configurable TTL (default 3600s)
- **Database migration:** `0003_feature_values.sql` — `feature_values` table for persisting computed values
  - `FeatureValueRow` type and `store.upsertFeatureValue`, `store.getFeatureValue`, etc.
- 38 unit tests covering metric definitions, DAG topo sort, DAG execution, cache layer, cycle detection

## [0.2.1] - 2026-07-19

Phase 1 stage 1.2 — Feature Engine. See [docs/PHASE_1_GITHUB_MVP.md](docs/PHASE_1_GITHUB_MVP.md) and [docs/PHASE_1_2_COMPLETION.md](docs/PHASE_1_2_COMPLETION.md).

### Added

- **Feature Engine (`@radar-pro/engine`):** Feature types, registry, built-in features, and sequential executor
  - `stars` — current star count
  - `release_frequency_30d` and `release_frequency_7d` — release counts over time windows
  - `issue_closure_rate_7d` and `open_issue_count` — issue velocity metrics
  - `pr_merge_rate_7d` and `open_pr_count` — PR velocity metrics
  - `contributor_count` — unique contributor count
  - `createDefaultRegistry()` — one-shot registry with all 8 built-in features
  - `executeFeatures()` — sequential executor that runs features in order
  - 14 unit tests covering registry, definitions, and executor

### Changed

- All workspace package versions aligned to **0.2.1**

## [0.2.0] - 2026-07-19

Phase 1 stage 1.1 — Data Layer. See [docs/PHASE_1_GITHUB_MVP.md](docs/PHASE_1_GITHUB_MVP.md) and [docs/PHASE_1_1_COMPLETION.md](docs/PHASE_1_1_COMPLETION.md).

### Added

- **GitHub Connector:** `GitHubClient` class with Octokit-based REST client (`@radar-pro/connectors/src/github/`)
- **Journal system:** Immutable R2 journal store (`@radar-pro/connectors/src/journal/`)
- **Normalizer:** GitHub API response to DB row type converter (`@radar-pro/connectors/src/normalizer/`)
- **Entity Store:** D1 CRUD operations (`@radar-pro/database/src/store/`)
- **Database migration:** `0002_journal_and_details.sql`
- **Domain types:** GitHub API response types and normalized entity types in `@radar-pro/core`

### Changed

- Optimized presentation slides from PNG to WebP (93% size reduction)
- All workspace package versions aligned to **0.2.0**

### Fixed

- Give API and worker distinct Wrangler dev ports (`8787`/`9229` vs `8788`/`9230`) so `pnpm dev` does not collide

## [0.1.2] - 2026-07-17

Phase 0 complete (stages 0.1–0.3). See [docs/PHASE_0_COMPLETION.md](docs/PHASE_0_COMPLETION.md).

### Added

- **0.3 Frontend foundations:** React 19 + Vite app shell (`apps/web`)
- Zustand client stores (`ui`, `dashboard`, `preferences`) under `apps/web/src/stores/`
- TanStack Query providers and React Router placeholder routes (`/`, `/repositories`, `/repositories/:id`)
- Shared UI package primitives: `AppShell`, `Button`, `Card`, `Placeholder` (`@radar-pro/ui`)
- Theme helpers and host styles for the dashboard shell
- Workspace package versions and API/worker health/version responses aligned to **0.1.2**
- Dev docs for local monorepo + Cloudflare workflows (`docs/DEVELOPMENT.md`)
- Phase 0 completion certificate (`docs/PHASE_0_COMPLETION.md`)

### Changed

- Web app layout and providers restructured for Phase 1 product work
- Wrangler / D1 local workflow documentation expanded

## [0.1.1] - 2026-07-17

Phase 0 stage **0.2** — Cloudflare infrastructure shell (delivered as part of the Phase 0 foundation series).

### Added

- Wrangler config for `apps/api` and `apps/worker` (local / preview / production placeholders)
- D1, R2, and KV bindings for API and worker
- Initial D1 migration: `packages/database/migrations/0001_initial_schema.sql`
- Database package migration catalog and row types (`@radar-pro/database`)
- Health endpoints on API and worker
- Root scripts: `pnpm db:migrate:local`, `pnpm db:migrations:list:local`
- CI step for local D1 migrate (no Cloudflare secrets required)

## [0.1.0] - 2026-07-17

Phase 0 stage **0.1** — monorepo skeleton.

### Added

- Turborepo + pnpm workspaces monorepo
- Apps: `web`, `api`, `worker`
- Packages: `core`, `engine`, `connectors`, `database`, `manifests`, `ui`, `typescript-config`, `eslint-config`
- TypeScript, ESLint (flat configs), Prettier, Vitest
- GitHub Actions CI (`.github/workflows/ci.yml`)
- Root tooling scripts (`dev`, `build`, `typecheck`, `lint`, `test`, `format`)

[Unreleased]: https://github.com/y-tretyakov/radar-pro/compare/v0.2.1...HEAD
[0.2.1]: https://github.com/y-tretyakov/radar-pro/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/y-tretyakov/radar-pro/releases/tag/v0.2.0
[0.1.2]: https://github.com/y-tretyakov/radar-pro/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/y-tretyakov/radar-pro/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/y-tretyakov/radar-pro/releases/tag/v0.1.0
