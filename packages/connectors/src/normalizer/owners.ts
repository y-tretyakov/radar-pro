import type {
  GitHubUserResponse,
  GitHubOrgResponse,
} from '@radar-pro/core';
import type { OwnerRow } from '@radar-pro/database';

function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function normalizeOwner(
  data: GitHubUserResponse | GitHubOrgResponse,
): OwnerRow {
  const now = Date.now();
  const isOrg = data.type === 'Organization';

  return {
    id: generateId(),
    provider: 'github',
    provider_id: String(data.id),
    login: data.login,
    type: isOrg ? 'organization' : 'user',
    avatar_url: data.avatar_url,
    html_url: data.html_url,
    raw: JSON.stringify(data),
    created_at: now,
    updated_at: now,
  };
}

export function normalizeOwnerUpdate(
  existing: OwnerRow,
  data: GitHubUserResponse | GitHubOrgResponse,
): OwnerRow {
  const now = Date.now();
  const isOrg = data.type === 'Organization';

  return {
    ...existing,
    login: data.login,
    type: isOrg ? 'organization' : 'user',
    avatar_url: data.avatar_url,
    html_url: data.html_url,
    raw: JSON.stringify(data),
    updated_at: now,
  };
}
