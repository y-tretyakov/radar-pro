import type { D1Database } from '@cloudflare/workers-types';
import type { RegisteredFeature } from '../types.js';
import { store } from '@radar-pro/database';

async function computeStarCount(input: { db: D1Database; repositoryId: string; now?: number }) {
  const repo = await store.getRepository(input.db, input.repositoryId);
  const now = input.now ?? Date.now();
  return {
    featureName: 'stars',
    value: repo?.stars ?? 0,
    entityId: input.repositoryId,
    entityType: 'repository' as const,
    computedAt: now,
  };
}

export function createStarCountFeature(): RegisteredFeature {
  return {
    definition: {
      name: 'stars',
      description: 'Current star count',
      valueType: 'number',
      entityType: 'repository',
      version: '1.0.0',
      unit: 'stars',
    },
    compute: computeStarCount,
  };
}
