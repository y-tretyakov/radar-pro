-- Phase 1 / v0.3.0 — feature_values table for caching computed features & metrics

CREATE TABLE feature_values (
  id TEXT PRIMARY KEY NOT NULL,
  feature_name TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  value TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '1.0.0',
  computed_at INTEGER NOT NULL,
  UNIQUE (feature_name, entity_type, entity_id)
);

CREATE INDEX idx_feature_values_lookup ON feature_values (feature_name, entity_type, entity_id);
CREATE INDEX idx_feature_values_entity ON feature_values (entity_type, entity_id);
