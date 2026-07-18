import type { GitHubIssueResponse } from '@radar-pro/core';
import type { IssueRow } from '@radar-pro/database';

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

export function normalizeIssue(
  data: GitHubIssueResponse,
  repositoryId: string,
): IssueRow {
  return {
    id: generateId(),
    provider: 'github',
    provider_id: data.id,
    repository_id: repositoryId,
    number: data.number,
    title: data.title,
    state: data.state,
    is_pull_request: data.pull_request ? 1 : 0,
    author_login: data.user.login,
    labels: data.labels.length > 0
      ? JSON.stringify(data.labels.map((l) => l.name))
      : null,
    body: data.body,
    created_at: parseDate(data.created_at) ?? Date.now(),
    updated_at: parseDate(data.updated_at) ?? Date.now(),
    closed_at: parseDate(data.closed_at),
    raw: JSON.stringify(data),
  };
}
