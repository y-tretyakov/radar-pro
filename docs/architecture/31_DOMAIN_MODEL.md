# Radar Pro Domain Model v3

## Purpose

Domain model separates business concepts from storage and infrastructure.

## Core Entities

- Repository
- Owner
- Organization
- Contributor
- Release
- Commit Activity
- Issue Stream
- Dependency Graph
- Package
- Metric
- Signal
- Insight
- Recommendation

## Relationships

```
Repository
 ├── Owner
 ├── Contributors
 ├── Releases
 ├── Dependencies
 ├── Metrics
 ├── Signals
 ├── Insights
 └── Recommendations
```

## Design Rules

- Domain objects are immutable where possible.
- Historical changes are stored as events.
- Calculations never mutate raw facts.
