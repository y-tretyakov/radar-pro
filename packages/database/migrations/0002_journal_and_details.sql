-- Phase 1 / v0.2.0 — journal indexing and entity detail tables

CREATE TABLE issues (
  id TEXT PRIMARY KEY NOT NULL,
  provider TEXT NOT NULL,
  provider_id INTEGER NOT NULL,
  repository_id TEXT NOT NULL,
  number INTEGER NOT NULL,
  title TEXT NOT NULL,
  state TEXT NOT NULL CHECK (state IN ('open', 'closed')),
  is_pull_request INTEGER NOT NULL DEFAULT 0,
  author_login TEXT NOT NULL DEFAULT '',
  labels TEXT,
  body TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  closed_at INTEGER,
  raw TEXT,
  FOREIGN KEY (repository_id) REFERENCES repositories (id)
);

CREATE INDEX idx_issues_repository ON issues (repository_id);
CREATE INDEX idx_issues_state ON issues (state, created_at);

CREATE TABLE pull_requests (
  id TEXT PRIMARY KEY NOT NULL,
  provider TEXT NOT NULL,
  provider_id INTEGER NOT NULL,
  repository_id TEXT NOT NULL,
  number INTEGER NOT NULL,
  title TEXT NOT NULL,
  state TEXT NOT NULL CHECK (state IN ('open', 'closed')),
  merged INTEGER NOT NULL DEFAULT 0,
  author_login TEXT NOT NULL DEFAULT '',
  body TEXT,
  additions INTEGER NOT NULL DEFAULT 0,
  deletions INTEGER NOT NULL DEFAULT 0,
  changed_files INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  merged_at INTEGER,
  closed_at INTEGER,
  raw TEXT,
  FOREIGN KEY (repository_id) REFERENCES repositories (id)
);

CREATE INDEX idx_pull_requests_repository ON pull_requests (repository_id);
CREATE INDEX idx_pull_requests_state ON pull_requests (state);

CREATE TABLE releases (
  id TEXT PRIMARY KEY NOT NULL,
  provider TEXT NOT NULL,
  provider_id INTEGER NOT NULL,
  repository_id TEXT NOT NULL,
  tag_name TEXT NOT NULL,
  name TEXT,
  is_prerelease INTEGER NOT NULL DEFAULT 0,
  published_at INTEGER NOT NULL,
  body TEXT,
  raw TEXT,
  FOREIGN KEY (repository_id) REFERENCES repositories (id)
);

CREATE INDEX idx_releases_repository ON releases (repository_id);

CREATE TABLE contributors (
  id TEXT PRIMARY KEY NOT NULL,
  provider TEXT NOT NULL,
  repository_id TEXT NOT NULL,
  contributor_login TEXT NOT NULL,
  total_commits INTEGER NOT NULL DEFAULT 0,
  recorded_at INTEGER NOT NULL,
  FOREIGN KEY (repository_id) REFERENCES repositories (id)
);

CREATE INDEX idx_contributors_repository ON contributors (repository_id);

CREATE TABLE journal_entries (
  id TEXT PRIMARY KEY NOT NULL,
  source TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'application/json',
  recorded_at INTEGER NOT NULL
);

CREATE INDEX idx_journal_entries_lookup ON journal_entries (source, entity_type, entity_id);
