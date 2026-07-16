# Development

Local setup for the Radar Pro monorepo (Phase 0.1 skeleton).

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

### Per-app

```bash
# Web (Vite) — http://localhost:5173
pnpm --filter @radar-pro/web dev

# API (Hono + Wrangler) — http://localhost:8787
pnpm --filter @radar-pro/api dev

# Worker (Wrangler shell)
pnpm --filter @radar-pro/worker dev
```

## Structure

```
apps/
  web/       React 19 + Vite dashboard shell
  api/       Hono on Cloudflare Workers (GET /health)
  worker/    Worker shell for future cron/pipeline
packages/
  core/              Domain types / pure logic
  engine/            DAG / features / metrics (placeholder)
  connectors/        External connectors (placeholder)
  database/          Schema / migrations home (placeholder)
  manifests/         Plugin manifests (placeholder)
  ui/                Shared UI components
  typescript-config/ Shared TSConfig bases
  eslint-config/     Shared ESLint flat configs
```

## Environment

Copy `.env.example` for future Cloudflare / API vars. Phase 0.1 does not require real account bindings.

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs install → typecheck → lint → test → build on push/PR.
