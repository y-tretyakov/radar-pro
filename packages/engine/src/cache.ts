import type { D1Database } from '@cloudflare/workers-types';
import type { CacheOptions, CacheEntry } from './types.js';
import type { FeatureValueRow } from '@radar-pro/database';
import { store } from '@radar-pro/database';

const DEFAULT_TTL_SECONDS = 3600;

export function createDefaultCacheOptions(): CacheOptions {
  return { ttlSeconds: DEFAULT_TTL_SECONDS };
}

export async function readCache(
  db: D1Database,
  featureName: string,
  entityType: string,
  entityId: string,
  version: string,
  options: CacheOptions = createDefaultCacheOptions(),
): Promise<CacheEntry | null> {
  const row = await store.getFeatureValue(db, featureName, entityType, entityId);
  if (!row) return null;

  const age = Date.now() / 1000 - row.computed_at;
  if (age > options.ttlSeconds) return null;

  if (row.version !== version) return null;

  return {
    value: parseValue(row.value),
    version: row.version,
    computedAt: row.computed_at,
  };
}

export async function writeCache(
  db: D1Database,
  featureName: string,
  entityType: string,
  entityId: string,
  value: number | boolean | string,
  version: string,
  computedAt: number,
): Promise<void> {
  const id = `${featureName}:${entityType}:${entityId}`;
  const row: FeatureValueRow = {
    id,
    feature_name: featureName,
    entity_type: entityType,
    entity_id: entityId,
    value: String(value),
    version,
    computed_at: computedAt,
  };
  await store.upsertFeatureValue(db, row);
}

function parseValue(raw: string): number | boolean | string {
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  const num = Number(raw);
  if (!Number.isNaN(num) && raw.trim() !== '') return num;
  return raw;
}
