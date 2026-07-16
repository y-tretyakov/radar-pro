# Phase 0: Foundation & Project Setup

**Цель фазы:** Создать крепкий фундамент, чтобы дальше разработка шла быстро и без боли.

**Продолжительность:** 1–2 недели  
**Релизы:** v0.1.0 → v0.1.2

## Этап 0.1: Инициализация Репозитория

**Что делать подробно:**
- Инициализировать Turborepo (`npx create-turbo@latest`)
- Структура:
  - `apps/web` — React frontend
  - `apps/worker` — Cloudflare Worker
  - `apps/bff` — Backend For Frontend (опционально отдельно)
  - `packages/core` — основная бизнес-логика
  - `packages/engine` — DAG, features, metrics
  - `packages/connectors` — все коннекторы
  - `packages/database` — схемы, migrations
  - `packages/manifests` — плагины и манифесты
  - `packages/ui` — общие компоненты

**Зачем:**
- Соответствует архитектуре из документа `13_CLOUDFLARE_WORKERS_CODEBASE.md`
- Позволяет независимо разрабатывать и тестировать пакеты

**Deliverables:**
- Рабочий `turbo run dev/build`
- Настроенный TypeScript, ESLint, Prettier, Vitest
- GitHub Actions для CI

**Релиз:** `v0.1.0`

## Этап 0.2: Cloudflare Infrastructure

**Что делать:**
- Настроить Wrangler
- Создать D1 базу (`wrangler d1 create`)
- Создать R2 bucket для Journal
- KV namespace
- Первые миграции (таблицы `datasets`, `repositories`, `owners`, `feature_definitions`)
- Настроить preview и production окружения

**Зачем:** Сразу работаем в реальной целевой инфраструктуре. Journal в R2 — основа воспроизводимости.

**Deliverables:** Локально и в Cloudflare всё поднимается.

**Релиз:** `v0.1.1`

## Этап 0.3: Frontend Foundations + Zustand

**Что делать:**
- Установить React 19, Vite, TanStack Query, Zustand, nuqs, Zod, React Hook Form
- Создать структуру stores:
  - `uiStore.ts` (тема, sidebar)
  - `dashboardStore.ts` (layout, filters)
  - `preferencesStore.ts`
- Настроить TanStack Query с Devtools

**Зачем Zustand:**
- Чёткое разделение client state / server state (по твоей стратегии)
- Не загрязняем глобальный стор серверными данными

**Deliverables:** Рабочий дашборд-заглушка + Zustand в действии.

**Релиз:** `v0.1.2`

**Конец Phase 0** — у тебя готов профессиональный старт.
