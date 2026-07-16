# Event Driven Architecture

Events:

- repository.updated
- release.created
- connector.completed
- signal.generated

Flow:

Connector → Queue → Consumers → Storage → DAG → Signals

Benefits:

- retries
- horizontal scaling
- independent processing
- audit history
