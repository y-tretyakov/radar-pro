import type { D1Database } from '@cloudflare/workers-types';
import type { FeatureValueRow } from '../types.js';

export async function upsertFeatureValue(
  db: D1Database,
  row: FeatureValueRow,
): Promise<void> {
  const { id, feature_name, entity_type, entity_id, value, version, computed_at } = row;
  await db.prepare(
    `INSERT INTO feature_values (id, feature_name, entity_type, entity_id, value, version, computed_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(feature_name, entity_type, entity_id) DO UPDATE SET
       value = excluded.value,
       version = excluded.version,
       computed_at = excluded.computed_at`
  ).bind(id, feature_name, entity_type, entity_id, value, version, computed_at).run();
}

export async function getFeatureValue(
  db: D1Database,
  featureName: string,
  entityType: string,
  entityId: string,
): Promise<FeatureValueRow | null> {
  return db.prepare(
    'SELECT * FROM feature_values WHERE feature_name = ? AND entity_type = ? AND entity_id = ?'
  ).bind(featureName, entityType, entityId).first<FeatureValueRow | null>();
}

export async function getFeatureValuesByEntity(
  db: D1Database,
  entityType: string,
  entityId: string,
): Promise<FeatureValueRow[]> {
  const { results } = await db.prepare(
    'SELECT * FROM feature_values WHERE entity_type = ? AND entity_id = ?'
  ).bind(entityType, entityId).all<FeatureValueRow>();
  return results;
}

export async function deleteFeatureValuesByEntity(
  db: D1Database,
  entityType: string,
  entityId: string,
): Promise<void> {
  await db.prepare(
    'DELETE FROM feature_values WHERE entity_type = ? AND entity_id = ?'
  ).bind(entityType, entityId).run();
}
