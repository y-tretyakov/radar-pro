import type { D1Database } from '@cloudflare/workers-types';
import type { OwnerRow } from '../types.js';

export async function upsertOwner(db: D1Database, owner: OwnerRow): Promise<void> {
  const { id, provider, provider_id, login, type, avatar_url, html_url, raw, created_at, updated_at } = owner;
  await db.prepare(
    `INSERT INTO owners (id, provider, provider_id, login, type, avatar_url, html_url, raw, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       login = excluded.login,
       type = excluded.type,
       avatar_url = excluded.avatar_url,
       html_url = excluded.html_url,
       raw = excluded.raw,
       updated_at = excluded.updated_at`
  ).bind(id, provider, provider_id, login, type, avatar_url, html_url, raw, created_at, updated_at).run();
}

export async function getOwner(db: D1Database, id: string): Promise<OwnerRow | null> {
  return db.prepare('SELECT * FROM owners WHERE id = ?').bind(id).first<OwnerRow | null>();
}

export async function getOwnerByProvider(db: D1Database, provider: string, providerId: string): Promise<OwnerRow | null> {
  return db.prepare('SELECT * FROM owners WHERE provider = ? AND provider_id = ?').bind(provider, providerId).first<OwnerRow | null>();
}

export async function deleteOwner(db: D1Database, id: string): Promise<void> {
  await db.prepare('DELETE FROM owners WHERE id = ?').bind(id).run();
}
