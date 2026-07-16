# Final Engineering Architecture v2

```
                Frontend
                   |
                  BFF
                   |
      -----------------------------
      Query API | Command API | Stream API
      -----------------------------
                   |
              Domain Layer
                   |
     Signals / Insights / Metrics
                   |
             DAG Runtime
                   |
      Event Bus + Storage Platform
                   |
             Connectors
```

Cloudflare implementation:

- Workers: runtime
- D1: relational state
- R2: immutable journal
- Queues: events
- KV: cache

Architecture target: Bloomberg Terminal for Open Source.
