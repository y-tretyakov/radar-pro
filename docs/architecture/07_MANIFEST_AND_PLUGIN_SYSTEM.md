# Manifest Plugin System v2

Plugin system becomes the core extensibility mechanism.

Example:

```yaml
plugin: github
entities:
  - repository
  - contributor
features:
  - stars_velocity
  - release_frequency
signals:
  - growing_project
```

Possible plugins:

- GitHub
- GitLab
- npm
- crates.io
- PyPI
- Reddit

A connector is only a data source. A plugin describes the complete intelligence model.
