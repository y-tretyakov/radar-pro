import type { RegisteredFeature } from '../types.js';
import { store } from '@radar-pro/database';

export function createIssueClosureRate7dFeature(): RegisteredFeature {
  return {
    definition: {
      name: 'issue_closure_rate_7d',
      description: 'Number of issues closed in the last 7 days',
      valueType: 'number',
      entityType: 'repository',
      version: '1.0.0',
      unit: 'issues/7d',
    },
    compute: async (input) => {
      const now = input.now ?? Date.now();
      const cutoff = now - 7 * 24 * 60 * 60 * 1000;
      const result = await store.getRepositoryIssues(input.db, input.repositoryId, {
        limit: 9999,
      });
      const count = result.rows.filter((r) => r.state === 'closed' && r.closed_at != null && r.closed_at >= cutoff).length;
      return {
        featureName: 'issue_closure_rate_7d',
        value: count,
        entityId: input.repositoryId,
        entityType: 'repository',
        computedAt: now,
      };
    },
  };
}

export function createOpenIssueCountFeature(): RegisteredFeature {
  return {
    definition: {
      name: 'open_issue_count',
      description: 'Number of currently open issues',
      valueType: 'number',
      entityType: 'repository',
      version: '1.0.0',
      unit: 'issues',
    },
    compute: async (input) => {
      const now = input.now ?? Date.now();
      const result = await store.getRepositoryIssues(input.db, input.repositoryId, {
        limit: 9999,
      });
      const count = result.rows.filter((r) => r.state === 'open').length;
      return {
        featureName: 'open_issue_count',
        value: count,
        entityId: input.repositoryId,
        entityType: 'repository',
        computedAt: now,
      };
    },
  };
}
