import type { RegisteredFeature } from '../types.js';
import { store } from '@radar-pro/database';

export function createContributorCountFeature(): RegisteredFeature {
  return {
    definition: {
      name: 'contributor_count',
      description: 'Number of unique contributors to the repository',
      valueType: 'number',
      entityType: 'repository',
      version: '1.0.0',
      unit: 'contributors',
    },
    compute: async (input) => {
      const now = input.now ?? Date.now();
      const result = await store.getRepositoryContributors(input.db, input.repositoryId);
      return {
        featureName: 'contributor_count',
        value: result.total ?? 0,
        entityId: input.repositoryId,
        entityType: 'repository',
        computedAt: now,
      };
    },
  };
}
