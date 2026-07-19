# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Give API and worker distinct Wrangler dev ports (`8787`/`9229` vs `8788`/`9230`) so `pnpm dev` does not fail with "Address already in use" on the shared inspector port

## [0.2.0] - 2026-07-17

Phase 1 stage 1.1 — Data Layer. See [docs/PHASE_1_GITHUB_MVP.md](docs/PHASE_1_GITHUB_MVP.md).

### Added

- **GitHub Connector:** `GitHubClient` class with Octokit-based REST client (`@radar-pro/connectors/src/github/`)
  - Repository, owner, issues, PRs, releases, contributors, search API methods
  - Typed responses and pagination support
- **Journal system:** Immutable R2 journal store (`@radar-pro/connectors/src/journal/`)
  - Write raw API responses to R2 with structured key scheme
  - Read, list, and replay journal entries
- **Normalizer:** GitHub API response to DB row type converter (`@radar-pro/connectors/src/normalizer/`)
  - Owner, repository, issue, PR, release, contributor normalization
  - Create and update variants for upsert operations
- **Entity Store:** D1 CRUD operations (`@radar-pro/database/src/store/`)
  - Owners, repositories, issues, PRs, releases, contributors, datasets, journal entries
  - Search repositories with dynamic filters, sorting, and pagination
- **Database migration:** `0002_journal_and_details.sql` — issues, pull_requests, releases, contributors, journal_entries tables
- **Domain types:** GitHub API response types and normalized entity types in `@radar-pro/core`

### Changed

- Optimized presentation slides from PNG to WebP (93% size reduction) and updated README references
- Workspace package versions bumped to `0.2.0` (core, database, connectors, root)

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

[Unreleased]: https://github.com/y-tretyakov/radar-pro/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/y-tretyakov/radar-pro/releases/tag/v0.2.0
[0.1.2]: https://github.com/y-tretyakov/radar-pro/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/y-tretyakov/radar-pro/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/y-tretyakov/radar-pro/releases/tag/v0.1.0
