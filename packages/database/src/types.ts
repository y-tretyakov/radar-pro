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
  topics: string | null;
  pushed_at: number | null;
  provider_created_at: number | null;
  last_dataset_id: string | null;
  raw: string | null;
  created_at: number;
  updated_at: number;
}

export interface FeatureDefinitionRow {
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

export interface IssueRow {
  id: string;
  provider: string;
  provider_id: number;
  repository_id: string;
  number: number;
  title: string;
  state: string;
  is_pull_request: 0 | 1;
  author_login: string;
  labels: string | null;
  body: string | null;
  created_at: number;
  updated_at: number;
  closed_at: number | null;
  raw: string | null;
}

export interface PullRequestRow {
  id: string;
  provider: string;
  provider_id: number;
  repository_id: string;
  number: number;
  title: string;
  state: string;
  merged: 0 | 1;
  author_login: string;
  body: string | null;
  additions: number;
  deletions: number;
  changed_files: number;
  created_at: number;
  updated_at: number;
  merged_at: number | null;
  closed_at: number | null;
  raw: string | null;
}

export interface ReleaseRow {
  id: string;
  provider: string;
  provider_id: number;
  repository_id: string;
  tag_name: string;
  name: string | null;
  is_prerelease: 0 | 1;
  published_at: number;
  body: string | null;
  raw: string | null;
}

export interface ContributorRow {
  id: string;
  provider: string;
  repository_id: string;
  contributor_login: string;
  total_commits: number;
  recorded_at: number;
}

export interface JournalEntryRow {
  id: string;
  source: string;
  entity_type: string;
  entity_id: string;
  r2_key: string;
  content_type: string;
  recorded_at: number;
}

export type EntityType = 'repository' | 'owner' | 'issue' | 'pull_request' | 'release' | 'contributor';

export const CORE_TABLES = [
  'owners',
  'datasets',
  'repositories',
  'feature_definitions',
  'issues',
  'pull_requests',
  'releases',
  'contributors',
  'journal_entries',
] as const;

export type CoreTableName = (typeof CORE_TABLES)[number];
