-- Phase 0.2 / v0.1.1 — initial Entity Store tables
-- Order: owners → datasets → repositories (FK owners) → feature_definitions
-- Applied locally: wrangler d1 migrations apply radar-pro-local --local

CREATE TABLE owners (
  id TEXT PRIMARY KEY NOT NULL,
  provider TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  login TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('user', 'organization')),
  avatar_url TEXT,
  html_url TEXT,
  raw TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  UNIQUE (provider, provider_id)
);

CREATE TABLE datasets (
  id TEXT PRIMARY KEY NOT NULL,
  source TEXT NOT NULL,
  status TEXT NOT NULL,
  schema_version TEXT NOT NULL,
  algorithm_version TEXT NOT NULL,
  manifest_hash TEXT,
  started_at INTEGER,
  completed_at INTEGER,
  created_at INTEGER NOT NULL
);

CREATE TABLE repositories (
  id TEXT PRIMARY KEY NOT NULL,
  provider TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  full_name TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  default_branch TEXT,
  is_fork INTEGER NOT NULL DEFAULT 0,
  is_archived INTEGER NOT NULL DEFAULT 0,
  stars INTEGER NOT NULL DEFAULT 0,
  forks INTEGER NOT NULL DEFAULT 0,
  watchers INTEGER NOT NULL DEFAULT 0,
  open_issues INTEGER NOT NULL DEFAULT 0,
  language TEXT,
  topics TEXT,
  pushed_at INTEGER,
  provider_created_at INTEGER,
  last_dataset_id TEXT,
  raw TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  UNIQUE (provider, provider_id),
  FOREIGN KEY (owner_id) REFERENCES owners (id)
);

CREATE INDEX idx_repositories_full_name ON repositories (full_name);
CREATE INDEX idx_repositories_stars ON repositories (stars);
CREATE INDEX idx_repositories_owner_id ON repositories (owner_id);

CREATE TABLE feature_definitions (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  value_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  version TEXT NOT NULL,
  unit TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL
);
