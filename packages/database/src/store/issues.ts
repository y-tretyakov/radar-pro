import type { D1Database } from '@cloudflare/workers-types';
import type { IssueRow } from '../types.js';
import type { PaginationOptions, StoreResult } from './types.js';

export async function upsertIssue(db: D1Database, issue: IssueRow): Promise<void> {
  const { id, provider, provider_id, repository_id, number, title, state, is_pull_request, author_login, labels, body, created_at, updated_at, closed_at, raw } = issue;
  await db.prepare(
    `INSERT INTO issues (id, provider, provider_id, repository_id, number, title, state, is_pull_request, author_login, labels, body, created_at, updated_at, closed_at, raw)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       title = excluded.title,
       state = excluded.state,
       is_pull_request = excluded.is_pull_request,
       author_login = excluded.author_login,
       labels = excluded.labels,
       body = excluded.body,
       updated_at = excluded.updated_at,
       closed_at = excluded.closed_at,
       raw = excluded.raw`
  ).bind(id, provider, provider_id, repository_id, number, title, state, is_pull_request, author_login, labels, body, created_at, updated_at, closed_at, raw).run();
}

export async function getIssue(db: D1Database, id: string): Promise<IssueRow | null> {
  return db.prepare('SELECT * FROM issues WHERE id = ?').bind(id).first<IssueRow | null>();
}

export async function getRepositoryIssues(db: D1Database, repositoryId: string, options?: PaginationOptions): Promise<StoreResult<IssueRow>> {
  const limit = options?.limit ?? 50;
  const offset = options?.offset ?? 0;

  const countResult = await db.prepare('SELECT COUNT(*) as total FROM issues WHERE repository_id = ?').bind(repositoryId).first<{ total: number }>();
  const total = countResult?.total ?? 0;

  const result = await db.prepare('SELECT * FROM issues WHERE repository_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?').bind(repositoryId, limit, offset).all<IssueRow>();
  return { rows: result.results, total };
}

export async function deleteIssuesByRepository(db: D1Database, repositoryId: string): Promise<void> {
  await db.prepare('DELETE FROM issues WHERE repository_id = ?').bind(repositoryId).run();
}
