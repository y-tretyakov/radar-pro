# Radar Pro Data Platform

## Слои хранения

## Journal (R2)

Immutable append-only хранилище сырых событий.

Пример:

journal/github/2026/07/16/repository-events.json

Назначение:

-   восстановление истории
-   повторный запуск нормализации
-   аудит

## Entity Store (D1)

Хранит нормализованные сущности:

-   repositories
-   owners
-   releases
-   contributors

## Feature Store

Хранит вычисленные признаки.

Feature отличается от Entity:

Entity: - stars_total

Feature: - stars_growth_velocity_7d

## Dataset

Каждый полный запуск pipeline создаёт Dataset.

Dataset содержит:

-   версии алгоритмов
-   версии схем
-   hash manifest
-   статус обработки

## Воспроизводимость

Любой результат должен быть восстановим:

Dataset + Manifest + Journal = полный replay
