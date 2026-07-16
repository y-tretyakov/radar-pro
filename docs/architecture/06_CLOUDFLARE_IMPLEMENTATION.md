# Cloudflare Implementation

## Frontend

React 19 TypeScript Vite TanStack Query Zustand nuqs

## Edge API

Cloudflare Workers

Framework:

Hono

Ответы:

-   JSON
-   ETag
-   304 Not Modified

## Storage

D1:

-   Entity Store
-   Features
-   Insights

KV:

-   Hot projections
-   Top lists

R2:

-   Journal
-   Historical snapshots

## Cron Pipeline

Cron запускает:

1.  Connector
2.  Normalizer
3.  Feature DAG
4.  Metric DAG
5.  Signal Engine
6.  Projection Builder

Пользовательские запросы никогда не считают тяжелую аналитику.
