# DAG Runtime

Radar Pro uses directed acyclic graphs.

Layers:

Features -\> Metrics -\> Signals -\> Insights -\> Projections

Executor:

-   Kahn topological sorting
-   cycle detection
-   execution levels
-   parallel calculation
-   cache reuse
-   retry isolation

Independent nodes are calculated concurrently.
