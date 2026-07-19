import type { D1Database } from '@cloudflare/workers-types';
import type { RepositoryRow } from '../types.js';
import type { RepositorySearchOptions, StoreResult } from './types.js';

export async function upsertRepository(db: D1Database, repo: RepositoryRow): Promise<void> {
  const { id, provider, provider_id, owner_id, full_name, name, description, default_branch, is_fork, is_archived, stars, forks, watchers, open_issues, language, topics, pushed_at, provider_created_at, last_dataset_id, raw, created_at, updated_at } = repo;
  await db.prepare(
    `INSERT INTO repositories (id, provider, provider_id, owner_id, full_name, name, description, default_branch, is_fork, is_archived, stars, forks, watchers, open_issues, language, topics, pushed_at, provider_created_at, last_dataset_id, raw, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       owner_id = excluded.owner_id,
       full_name = excluded.full_name,
       name = excluded.name,
       description = excluded.description,
       default_branch = excluded.default_branch,
       is_fork = excluded.is_fork,
       is_archived = excluded.is_archived,
       stars = excluded.stars,
       forks = excluded.forks,
       watchers = excluded.watchers,
       open_issues = excluded.open_issues,
       language = excluded.language,
       topics = excluded.topics,
       pushed_at = excluded.pushed_at,
       provider_created_at = excluded.provider_created_at,
       last_dataset_id = excluded.last_dataset_id,
       raw = excluded.raw,
       updated_at = excluded.updated_at`
  ).bind(id, provider, provider_id, owner_id, full_name, name, description, default_branch, is_fork, is_archived, stars, forks, watchers, open_issues, language, topics, pushed_at, provider_created_at, last_dataset_id, raw, created_at, updated_at).run();
}

export async function getRepository(db: D1Database, id: string): Promise<RepositoryRow | null> {
  return db.prepare('SELECT * FROM repositories WHERE id = ?').bind(id).first<RepositoryRow | null>();
}

export async function getRepositoryByProvider(db: D1Database, provider: string, providerId: string): Promise<RepositoryRow | null> {
  return db.prepare('SELECT * FROM repositories WHERE provider = ? AND provider_id = ?').bind(provider, providerId).first<RepositoryRow | null>();
}

export async function searchRepositories(db: D1Database, ownerId: string, options?: RepositorySearchOptions): Promise<StoreResult<RepositoryRow>> {
  let sql = 'SELECT * FROM repositories WHERE owner_id = ?';
  const params: unknown[] = [ownerId];

  if (options?.query) {
    sql += ' AND (full_name LIKE ? OR name LIKE ? OR description LIKE ?)';
    const like = `%${options.query}%`;
    params.push(like, like, like);
  }
  if (options?.language) {
    sql += ' AND language = ?';
    params.push(options.language);
  }
  if (options?.minStars !== undefined) {
    sql += ' AND stars >= ?';
    params.push(options.minStars);
  }

  const countSql = sql;
  const countResult = await db.prepare(countSql.replace('SELECT *', 'SELECT COUNT(*) as total')).bind(...params).first<{ total: number }>();
  const total = countResult?.total ?? 0;

  const sort = options?.sort ?? 'stars';
  const order = options?.order ?? 'desc';
  const validSorts: Record<string, string> = { stars: 'stars', updated: 'updated_at', name: 'name' };
  const sortCol = validSorts[sort] ?? 'stars';
  sql += ` ORDER BY ${sortCol} ${order === 'asc' ? 'ASC' : 'DESC'}`;

  const limit = options?.limit ?? 50;
  const offset = options?.offset ?? 0;
  sql += ' LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const result = await db.prepare(sql).bind(...params).all<RepositoryRow>();
  return { rows: result.results, total };
}
