import type { GitHubPRResponse } from '@radar-pro/core';
import type { PullRequestRow } from '@radar-pro/database';

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

export function normalizePullRequest(
  data: GitHubPRResponse,
  repositoryId: string,
): PullRequestRow {
  return {
    id: generateId(),
    provider: 'github',
    provider_id: data.id,
    repository_id: repositoryId,
    number: data.number,
    title: data.title,
    state: data.state,
    merged: data.merged ? 1 : 0,
    author_login: data.user.login,
    body: data.body,
    additions: data.additions,
    deletions: data.deletions,
    changed_files: data.changed_files,
    created_at: parseDate(data.created_at) ?? Date.now(),
    updated_at: parseDate(data.updated_at) ?? Date.now(),
    merged_at: parseDate(data.merged_at),
    closed_at: parseDate(data.closed_at),
    raw: JSON.stringify(data),
  };
}
