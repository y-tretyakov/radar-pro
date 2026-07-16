# Phase 1: GitHub Radar MVP

**Цель:** Полноценный рабочий продукт только по GitHub.

**Продолжительность:** 3–5 недель  
**Ключевой релиз:** `v0.4.0`

## Этап 1.1: Data Layer

- Реализовать GitHub Connector (REST + GraphQL)
- Система Journal (R2)
- Entity Store в D1
- Нормализатор данных

**Зачем:** База всей системы. Без этого ничего дальше не работает.

**Релиз:** `v0.2.0`

## Этап 1.2: Feature Engine

- Реализовать базовые features
- Простой исполнитель (пока sequential)

**Релиз:** `v0.2.1`

## Этап 1.3: Metric Engine + Первый DAG

- Метрики (`health_score_v1` и др.)
- Внедрение `SimpleDAGExecutor` с topological sort
- Версионирование
- Кэширование

**Это первый момент появления DAG Runtime.**

**Релиз:** `v0.3.0`

## Этап 1.4: BFF API

- Hono Worker
- Query + Command API
- Response shaping

**Релиз:** `v0.3.1`

## Этап 1.5: Frontend

- Основной дашборд
- Страница репозитория
- Zustand + TanStack Query в боевом режиме

**Релиз:** `v0.4.0` — GitHub Radar MVP

## Этап 1.6: Production

- Тесты, мониторинг, деплой

**Релиз:** `v0.4.1`
