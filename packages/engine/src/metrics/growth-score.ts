import type { RegisteredMetric } from '../types.js';

export function createGrowthScoreV1Metric(): RegisteredMetric {
  return {
    definition: {
      name: 'growth_score_v1',
      description: 'Repository growth potential based on recent release velocity, issue resolution, and contributor expansion',
      valueType: 'number',
      entityType: 'repository',
      version: '1.0.0',
      unit: 'score',
      formula: 'releases_7d_norm * 0.25 + releases_30d_norm * 0.15 + issue_closure_rate * 0.20 + pr_merge_rate * 0.20 + contributors_norm * 0.20',
    },
    dependencies: [
      'release_frequency_7d',
      'release_frequency_30d',
      'issue_closure_rate_7d',
      'pr_merge_rate_7d',
      'contributor_count',
    ],
    compute: async (input) => {
      const values = input.featureValues;
      const now = input.now;

      const releases7d = asNumber(values.get('release_frequency_7d') ?? 0);
      const releases30d = asNumber(values.get('release_frequency_30d') ?? 0);
      const issueClosureRate = asNumber(values.get('issue_closure_rate_7d') ?? 0);
      const prMergeRate = asNumber(values.get('pr_merge_rate_7d') ?? 0);
      const contributors = asNumber(values.get('contributor_count') ?? 0);

      const releases7dNorm = normalizeLinear(releases7d, 5);
      const releases30dNorm = normalizeLinear(releases30d, 10);
      const contributorsNorm = normalizeLog(contributors, 100);

      const score =
        releases7dNorm * 0.25 +
        releases30dNorm * 0.15 +
        clamp01(issueClosureRate) * 0.20 +
        clamp01(prMergeRate) * 0.20 +
        contributorsNorm * 0.20;

      return {
        metricName: 'growth_score_v1',
        value: Math.round(clamp01(score) * 1000) / 1000,
        entityId: input.repositoryId,
        entityType: 'repository',
        computedAt: now,
      };
    },
  };
}

function asNumber(v: number | boolean | string): number {
  if (typeof v === 'boolean') return v ? 1 : 0;
  if (typeof v === 'string') return Number(v) || 0;
  return v;
}

function normalizeLog(value: number, max: number): number {
  if (value <= 0) return 0;
  return Math.min(Math.log10(1 + value) / Math.log10(1 + max), 1);
}

function normalizeLinear(value: number, max: number): number {
  return clamp01(value / max);
}

function clamp01(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}
