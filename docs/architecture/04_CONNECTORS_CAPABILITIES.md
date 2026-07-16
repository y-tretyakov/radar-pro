# Connector Layer

Connector --- универсальный адаптер источника данных.

Примеры:

-   GitHub Connector
-   GitLab Connector
-   NPM Connector
-   NuGet Connector

## Capability Model

Каждый Connector описывает возможности:

-   stars
-   downloads
-   releases
-   issues
-   contributors

Качество:

-   native
-   derived
-   estimated
-   unsupported

Пример:

npm:

downloads = native

stars = unsupported

contributors = estimated

Это позволяет использовать единый аналитический pipeline для разных
источников.
