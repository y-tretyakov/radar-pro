# Development

Local setup for the Radar Pro monorepo (Phase 0 — foundation through v0.1.2).

## Process rules (agents & contributors)

Durable branching, release, CHANGELOG, and agent-role rules live in **[`AGENTS.md`](../AGENTS.md)** at the repo root.  
Read that file before opening PRs or starting a phase stage. Summary:

- **`main`** — protected releases only (full phase complete + version bump + tag)
- **`dev`** — integration branch; stage work merges here via PR
- Stage branches: `feat/phase-N/<stage>-<short-slug>` (from `dev`)
- Always update [`CHANGELOG.md`](../CHANGELOG.md) (Unreleased during work; version section on release)

## Prerequisites

- **Node.js 22+** (see `.nvmrc`)
- **pnpm 9+** (`corepack enable && corepack prepare pnpm@9.15.0 --activate`)

## Install

```bash
pnpm install
```

## Common commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start all apps in dev mode (Turbo) |
| `pnpm build` | Build packages and apps |
| `pnpm typecheck` | TypeScript check across the workspace |
| `pnpm lint` | ESLint across the workspace |
| `pnpm test` | Vitest smoke tests |
| `pnpm format` | Prettier write |
| `pnpm db:migrate:local` | Apply D1 migrations to local SQLite (no CF login) |
| `pnpm db:migrations:list:local` | List local D1 migration status |

### Per-app

```bash
# Web (Vite) — http://localhost:5173
pnpm --filter @radar-pro/web dev

# API (Hono + Wrangler) — http://localhost:8787 (inspector 9229)
pnpm --filter @radar-pro/api dev

# Worker (Wrangler shell) — http://localhost:8788 (inspector 9230)
pnpm --filter @radar-pro/worker dev
```

`pnpm dev` runs all three in parallel via Turbo. API and worker use **different HTTP and inspector ports** so they do not collide on Wrangler’s defaults (`8787` / `9229`).

## Frontend (`apps/web`) — Phase 0.3 / v0.1.2

Stack: **React 19 + Vite**, **TanStack Query** (server state), **Zustand** (client UI state), **nuqs** (URL state), **React Router**, **Zod**, **React Hook Form** (installed for later forms).

State rules (see `docs/architecture/22_STATE_MANAGEMENT_STRATEGY.md`):

- Server / fetch data → TanStack Query only (**never** Zustand)
- Theme, sidebar, layout drafts, prefs → Zustand under `apps/web/src/stores/`
- Shareable filters → URL via nuqs when useful

Routes (stubs only — no GitHub API):

| Path | Page |
| --- | --- |
| `/` | Dashboard (theme / sidebar / layout demos) |
| `/repositories` | Repository list stub |
| `/repositories/:id` | Repository detail stub |

Shared chrome: `@radar-pro/ui` (`Button`, `Card`, `AppShell`). Host styles: `apps/web/src/styles.css`.

```bash
pnpm --filter @radar-pro/ui build   # after UI package changes
pnpm --filter @radar-pro/web dev
pnpm --filter @radar-pro/web test
```

## Local D1 migrations (Phase 0.2)

SQL migrations live in **`packages/database/migrations`** and are shared by `apps/api` and `apps/worker` via `migrations_dir` in each `wrangler.toml`.

**Always use `--local`** until remote Cloudflare resources are intentionally provisioned.

```bash
# Apply pending migrations (recommended root script)
pnpm db:migrate:local

# Equivalent via API package
pnpm --filter @radar-pro/api run db:migrate:local

# List status
pnpm db:migrations:list:local

# Smoke: list user tables after migrate
pnpm --filter @radar-pro/api exec wrangler d1 execute radar-pro-local --local --command \
  "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_cf_%' ORDER BY name;"
```

Wrangler **v4** is used. Local state is under `apps/*/.wrangler` (gitignored). No `CLOUDFLARE_API_TOKEN` is required for local migrate/execute.

### Environments (preview / production)

`apps/api/wrangler.toml` and `apps/worker/wrangler.toml` define:

| Env | Purpose | Notes |
| --- | --- | --- |
| default (top-level) | Local / default worker name | `radar-pro-local` D1, `radar-pro-journal-local` R2 |
| `preview` | Staging placeholders | IDs are placeholders — replace before real deploy |
| `production` | Production placeholders | Same — no remote create in Phase 0.2 |

Remote migrate (not used in Phase 0.2 CI) would look like:

```bash
# Requires CF auth + real database_id — do not run until ops provisions resources
# wrangler d1 migrations apply radar-pro-preview --env preview
# wrangler d1 migrations apply radar-pro-production --env production
```

## Structure

```
apps/
  web/       React 19 + Vite dashboard (Query + Zustand + router)
  api/       Hono on Cloudflare Workers (GET /health) + D1/R2/KV
  worker/    Worker shell for future cron/pipeline + same bindings
packages/
  core/              Domain types / pure logic
  engine/            DAG / features / metrics (placeholder)
  connectors/        External connectors (placeholder)
  database/          D1 types + migrations/
  manifests/         Plugin manifests (placeholder)
  ui/                Shared UI (Button, Card, AppShell, …)
  typescript-config/ Shared TSConfig bases
  eslint-config/     Shared ESLint flat configs
```

## Environment

Copy `.env.example` for Cloudflare / API vars. Local D1/R2/KV use placeholders in `wrangler.toml`; account IDs are only needed for remote deploy.

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs:

install → **local D1 migrate** → typecheck → lint → test → build

The migrate step uses `wrangler d1 migrations apply … --local` and needs no Cloudflare secrets.
