/**
 * Row shapes for Phase 0.2 core Entity Store tables.
 * Timestamps are Unix epoch milliseconds (INTEGER in D1/SQLite).
 * Boolean-like flags use 0 | 1.
 */

export type OwnerType = 'user' | 'organization';

export interface OwnerRow {
  id: string;
  provider: string;
  provider_id: string;
  login: string;
  type: OwnerType;
  avatar_url: string | null;
  html_url: string | null;
  raw: string | null;
  created_at: number;
  updated_at: number;
}

export interface DatasetRow {
  id: string;
  source: string;
  status: string;
  schema_version: string;
  algorithm_version: string;
  manifest_hash: string | null;
  started_at: number | null;
  completed_at: number | null;
  created_at: number;
}

export interface RepositoryRow {
  id: string;
  provider: string;
  provider_id: string;
  owner_id: string;
  full_name: string;
  name: string;
  description: string | null;
  default_branch: string | null;
  is_fork: 0 | 1;
  is_archived: 0 | 1;
  stars: number;
  forks: number;
  watchers: number;
  open_issues: number;
  language: string | null;
  /** JSON-encoded string array in D1 */
  topics: string | null;
  pushed_at: number | null;
  provider_created_at: number | null;
  last_dataset_id: string | null;
  raw: string | null;
  created_at: number;
  updated_at: number;
}

export interface FeatureDefinitionRow {
  /** Slug primary key */
  id: string;
  name: string;
  description: string | null;
  value_type: string;
  entity_type: string;
  version: string;
  unit: string | null;
  is_active: 0 | 1;
  created_at: number;
}

/** Tables created by packages/database/migrations (Phase 0.2). */
export const CORE_TABLES = [
  'owners',
  'datasets',
  'repositories',
  'feature_definitions',
] as const;

export type CoreTableName = (typeof CORE_TABLES)[number];
