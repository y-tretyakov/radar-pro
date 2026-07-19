import type { D1Database } from '@cloudflare/workers-types';
import type { DatasetRow } from '../types.js';

export async function createDataset(db: D1Database, dataset: DatasetRow): Promise<void> {
  const { id, source, status, schema_version, algorithm_version, manifest_hash, started_at, completed_at, created_at } = dataset;
  await db.prepare(
    `INSERT INTO datasets (id, source, status, schema_version, algorithm_version, manifest_hash, started_at, completed_at, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(id, source, status, schema_version, algorithm_version, manifest_hash, started_at, completed_at, created_at).run();
}

export async function getDataset(db: D1Database, id: string): Promise<DatasetRow | null> {
  return db.prepare('SELECT * FROM datasets WHERE id = ?').bind(id).first<DatasetRow | null>();
}

export async function completeDataset(db: D1Database, id: string): Promise<void> {
  await db.prepare('UPDATE datasets SET status = \'completed\', completed_at = ? WHERE id = ?').bind(Date.now(), id).run();
}

export async function failDataset(db: D1Database, id: string): Promise<void> {
  await db.prepare('UPDATE datasets SET status = \'failed\', completed_at = ? WHERE id = ?').bind(Date.now(), id).run();
}
