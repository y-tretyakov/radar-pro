import type { D1Database } from '@cloudflare/workers-types';
import type { JournalEntryRow } from '../types.js';

export async function insertJournalEntry(db: D1Database, entry: JournalEntryRow): Promise<void> {
  const { id, source, entity_type, entity_id, r2_key, content_type, recorded_at } = entry;
  await db.prepare(
    `INSERT INTO journal_entries (id, source, entity_type, entity_id, r2_key, content_type, recorded_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(id, source, entity_type, entity_id, r2_key, content_type, recorded_at).run();
}

export async function getJournalEntry(db: D1Database, id: string): Promise<JournalEntryRow | null> {
  return db.prepare('SELECT * FROM journal_entries WHERE id = ?').bind(id).first<JournalEntryRow | null>();
}

export async function listJournalEntriesBySource(db: D1Database, source: string, entityType?: string): Promise<JournalEntryRow[]> {
  if (entityType) {
    const result = await db.prepare(
      'SELECT * FROM journal_entries WHERE source = ? AND entity_type = ? ORDER BY recorded_at DESC'
    ).bind(source, entityType).all<JournalEntryRow>();
    return result.results;
  }
  const result = await db.prepare(
    'SELECT * FROM journal_entries WHERE source = ? ORDER BY recorded_at DESC'
  ).bind(source).all<JournalEntryRow>();
  return result.results;
}
