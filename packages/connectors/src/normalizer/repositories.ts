import type { GitHubRepoResponse } from '@radar-pro/core';
import type { RepositoryRow } from '@radar-pro/database';

function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function parseDate(dateStr: string | null | undefined): number | null {
  if (!dateStr) return null;
  const ms = Date.parse(dateStr);
  return isNaN(ms) ? null : ms;
}

export function normalizeRepository(
  data: GitHubRepoResponse,
  ownerId: string,
): RepositoryRow {
  const now = Date.now();

  return {
    id: generateId(),
    provider: 'github',
    provider_id: String(data.id),
    owner_id: ownerId,
    full_name: data.full_name,
    name: data.name,
    description: data.description,
    default_branch: data.default_branch,
    is_fork: data.fork ? 1 : 0,
    is_archived: data.archived ? 1 : 0,
    stars: data.stargazers_count,
    forks: data.forks_count,
    watchers: data.watchers_count,
    open_issues: data.open_issues_count,
    language: data.language,
    topics: data.topics.length > 0 ? JSON.stringify(data.topics) : null,
    pushed_at: parseDate(data.pushed_at),
    provider_created_at: parseDate(data.created_at),
    last_dataset_id: null,
    raw: JSON.stringify(data),
    created_at: now,
    updated_at: now,
  };
}

export function normalizeRepositoryUpdate(
  existing: RepositoryRow,
  data: GitHubRepoResponse,
): RepositoryRow {
  return {
    ...existing,
    description: data.description,
    default_branch: data.default_branch,
    is_fork: data.fork ? 1 : 0,
    is_archived: data.archived ? 1 : 0,
    stars: data.stargazers_count,
    forks: data.forks_count,
    watchers: data.watchers_count,
    open_issues: data.open_issues_count,
    language: data.language,
    topics: data.topics.length > 0 ? JSON.stringify(data.topics) : null,
    pushed_at: parseDate(data.pushed_at),
    raw: JSON.stringify(data),
    updated_at: Date.now(),
  };
}
