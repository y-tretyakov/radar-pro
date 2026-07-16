# Computation Engine DAG v2

## Layers

Feature DAG

Raw facts are converted into measurable features:
- stars_velocity
- contributor_growth
- release_frequency
- issue_response_time

Metric DAG

Features are combined into metrics:
- project_health
- community_strength
- maintainer_risk

Signal DAG

Signals describe meaningful changes:

Example:

```
project_momentum_up
  depends on:
    stars_velocity
    contributor_growth
    release_activity
```

Every node has:
- id
- version
- inputs
- formula
- provenance
- confidence
