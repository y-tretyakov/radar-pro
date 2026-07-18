import type { GitHubContributorResponse } from '@radar-pro/core';
import type { ContributorRow } from '@radar-pro/database';

function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function normalizeContributor(
  data: GitHubContributorResponse,
  repositoryId: string,
): ContributorRow {
  return {
    id: generateId(),
    provider: 'github',
    repository_id: repositoryId,
    contributor_login: data.login,
    total_commits: data.contributions,
    recorded_at: Date.now(),
  };
}
