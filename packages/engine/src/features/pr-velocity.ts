import type { RegisteredFeature } from '../types.js';
import { store } from '@radar-pro/database';

export function createPrMergeRate7dFeature(): RegisteredFeature {
  return {
    definition: {
      name: 'pr_merge_rate_7d',
      description: 'Number of pull requests merged in the last 7 days',
      valueType: 'number',
      entityType: 'repository',
      version: '1.0.0',
      unit: 'PRs/7d',
    },
    compute: async (input) => {
      const now = input.now ?? Date.now();
      const cutoff = now - 7 * 24 * 60 * 60 * 1000;
      const result = await store.getRepositoryPullRequests(input.db, input.repositoryId, {
        limit: 9999,
      });
      const count = result.rows.filter((r) => r.merged === 1 && r.merged_at != null && r.merged_at >= cutoff).length;
      return {
        featureName: 'pr_merge_rate_7d',
        value: count,
        entityId: input.repositoryId,
        entityType: 'repository',
        computedAt: now,
      };
    },
  };
}

export function createOpenPrCountFeature(): RegisteredFeature {
  return {
    definition: {
      name: 'open_pr_count',
      description: 'Number of currently open pull requests',
      valueType: 'number',
      entityType: 'repository',
      version: '1.0.0',
      unit: 'PRs',
    },
    compute: async (input) => {
      const now = input.now ?? Date.now();
      const result = await store.getRepositoryPullRequests(input.db, input.repositoryId, {
        limit: 9999,
      });
      const count = result.rows.filter((r) => r.state === 'open').length;
      return {
        featureName: 'open_pr_count',
        value: count,
        entityId: input.repositoryId,
        entityType: 'repository',
        computedAt: now,
      };
    },
  };
}
