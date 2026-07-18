import type { D1Database } from '@cloudflare/workers-types';
import type { ReleaseRow } from '../types.js';
import type { PaginationOptions, StoreResult } from './types.js';

export async function upsertRelease(db: D1Database, release: ReleaseRow): Promise<void> {
  const { id, provider, provider_id, repository_id, tag_name, name, is_prerelease, published_at, body, raw } = release;
  await db.prepare(
    `INSERT INTO releases (id, provider, provider_id, repository_id, tag_name, name, is_prerelease, published_at, body, raw)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       tag_name = excluded.tag_name,
       name = excluded.name,
       is_prerelease = excluded.is_prerelease,
       published_at = excluded.published_at,
       body = excluded.body,
       raw = excluded.raw`
  ).bind(id, provider, provider_id, repository_id, tag_name, name, is_prerelease, published_at, body, raw).run();
}

export async function getRepositoryReleases(db: D1Database, repositoryId: string, options?: PaginationOptions): Promise<StoreResult<ReleaseRow>> {
  const limit = options?.limit ?? 50;
  const offset = options?.offset ?? 0;

  const countResult = await db.prepare('SELECT COUNT(*) as total FROM releases WHERE repository_id = ?').bind(repositoryId).first<{ total: number }>();
  const total = countResult?.total ?? 0;

  const result = await db.prepare('SELECT * FROM releases WHERE repository_id = ? ORDER BY published_at DESC LIMIT ? OFFSET ?').bind(repositoryId, limit, offset).all<ReleaseRow>();
  return { rows: result.results, total };
}

export async function deleteReleasesByRepository(db: D1Database, repositoryId: string): Promise<void> {
  await db.prepare('DELETE FROM releases WHERE repository_id = ?').bind(repositoryId).run();
}
