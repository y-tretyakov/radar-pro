import type { D1Database } from '@cloudflare/workers-types';
import type { ContributorRow } from '../types.js';
import type { StoreResult } from './types.js';

export async function upsertContributor(db: D1Database, contributor: ContributorRow): Promise<void> {
  const { id, provider, repository_id, contributor_login, total_commits, recorded_at } = contributor;
  await db.prepare(
    `INSERT INTO contributors (id, provider, repository_id, contributor_login, total_commits, recorded_at)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       total_commits = excluded.total_commits,
       recorded_at = excluded.recorded_at`
  ).bind(id, provider, repository_id, contributor_login, total_commits, recorded_at).run();
}

export async function getRepositoryContributors(db: D1Database, repositoryId: string): Promise<StoreResult<ContributorRow>> {
  const countResult = await db.prepare('SELECT COUNT(*) as total FROM contributors WHERE repository_id = ?').bind(repositoryId).first<{ total: number }>();
  const total = countResult?.total ?? 0;

  const result = await db.prepare('SELECT * FROM contributors WHERE repository_id = ? ORDER BY total_commits DESC').bind(repositoryId).all<ContributorRow>();
  return { rows: result.results, total };
}

export async function deleteContributorsByRepository(db: D1Database, repositoryId: string): Promise<void> {
  await db.prepare('DELETE FROM contributors WHERE repository_id = ?').bind(repositoryId).run();
}
