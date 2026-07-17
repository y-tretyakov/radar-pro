import type { D1Database } from '@cloudflare/workers-types';
import type { PullRequestRow } from '../types.js';
import type { PaginationOptions, StoreResult } from './types.js';

export async function upsertPullRequest(db: D1Database, pr: PullRequestRow): Promise<void> {
  const { id, provider, provider_id, repository_id, number, title, state, merged, author_login, body, additions, deletions, changed_files, created_at, updated_at, merged_at, closed_at, raw } = pr;
  await db.prepare(
    `INSERT INTO pull_requests (id, provider, provider_id, repository_id, number, title, state, merged, author_login, body, additions, deletions, changed_files, created_at, updated_at, merged_at, closed_at, raw)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       title = excluded.title,
       state = excluded.state,
       merged = excluded.merged,
       author_login = excluded.author_login,
       body = excluded.body,
       additions = excluded.additions,
       deletions = excluded.deletions,
       changed_files = excluded.changed_files,
       updated_at = excluded.updated_at,
       merged_at = excluded.merged_at,
       closed_at = excluded.closed_at,
       raw = excluded.raw`
  ).bind(id, provider, provider_id, repository_id, number, title, state, merged, author_login, body, additions, deletions, changed_files, created_at, updated_at, merged_at, closed_at, raw).run();
}

export async function getPullRequest(db: D1Database, id: string): Promise<PullRequestRow | null> {
  return db.prepare('SELECT * FROM pull_requests WHERE id = ?').bind(id).first<PullRequestRow | null>();
}

export async function getRepositoryPullRequests(db: D1Database, repositoryId: string, options?: PaginationOptions): Promise<StoreResult<PullRequestRow>> {
  const limit = options?.limit ?? 50;
  const offset = options?.offset ?? 0;

  const countResult = await db.prepare('SELECT COUNT(*) as total FROM pull_requests WHERE repository_id = ?').bind(repositoryId).first<{ total: number }>();
  const total = countResult?.total ?? 0;

  const result = await db.prepare('SELECT * FROM pull_requests WHERE repository_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?').bind(repositoryId, limit, offset).all<PullRequestRow>();
  return { rows: result.results, total };
}

export async function deletePullRequestsByRepository(db: D1Database, repositoryId: string): Promise<void> {
  await db.prepare('DELETE FROM pull_requests WHERE repository_id = ?').bind(repositoryId).run();
}
