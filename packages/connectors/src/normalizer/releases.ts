import type { GitHubReleaseResponse } from '@radar-pro/core';
import type { ReleaseRow } from '@radar-pro/database';

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

export function normalizeRelease(
  data: GitHubReleaseResponse,
  repositoryId: string,
): ReleaseRow {
  return {
    id: generateId(),
    provider: 'github',
    provider_id: data.id,
    repository_id: repositoryId,
    tag_name: data.tag_name,
    name: data.name,
    is_prerelease: data.prerelease ? 1 : 0,
    published_at: parseDate(data.published_at) ?? Date.now(),
    body: data.body,
    raw: JSON.stringify(data),
  };
}
