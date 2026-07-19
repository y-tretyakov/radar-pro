import type { RegisteredFeature } from '../types.js';
import { store } from '@radar-pro/database';

export function createReleaseFrequencyFeature(): RegisteredFeature {
  return {
    definition: {
      name: 'release_frequency_30d',
      description: 'Number of releases published in the last 30 days',
      valueType: 'number',
      entityType: 'repository',
      version: '1.0.0',
      unit: 'releases/30d',
    },
    compute: async (input) => {
      const now = input.now ?? Date.now();
      const cutoff = now - 30 * 24 * 60 * 60 * 1000;
      const result = await store.getRepositoryReleases(input.db, input.repositoryId, {
        limit: 9999,
      });
      const count = result.rows.filter((r) => r.published_at >= cutoff).length;
      return {
        featureName: 'release_frequency_30d',
        value: count,
        entityId: input.repositoryId,
        entityType: 'repository',
        computedAt: now,
      };
    },
  };
}

export function createReleaseFrequency7dFeature(): RegisteredFeature {
  return {
    definition: {
      name: 'release_frequency_7d',
      description: 'Number of releases published in the last 7 days',
      valueType: 'number',
      entityType: 'repository',
      version: '1.0.0',
      unit: 'releases/7d',
    },
    compute: async (input) => {
      const now = input.now ?? Date.now();
      const cutoff = now - 7 * 24 * 60 * 60 * 1000;
      const result = await store.getRepositoryReleases(input.db, input.repositoryId, {
        limit: 9999,
      });
      const count = result.rows.filter((r) => r.published_at >= cutoff).length;
      return {
        featureName: 'release_frequency_7d',
        value: count,
        entityId: input.repositoryId,
        entityType: 'repository',
        computedAt: now,
      };
    },
  };
}
