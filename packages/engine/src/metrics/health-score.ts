import type { RegisteredMetric } from '../types.js';

export function createHealthScoreV1Metric(): RegisteredMetric {
  return {
    definition: {
      name: 'health_score_v1',
      description: 'Overall repository health score based on activity, velocity, and community metrics',
      valueType: 'number',
      entityType: 'repository',
      version: '1.0.0',
      unit: 'score',
      formula: 'stars_norm * 0.25 + releases_30d_norm * 0.20 + issue_closure_rate * 0.15 + pr_merge_rate * 0.15 + open_issues_inv * 0.10 + open_prs_inv * 0.10 + contributors_norm * 0.05',
    },
    dependencies: [
      'stars',
      'release_frequency_30d',
      'issue_closure_rate_7d',
      'pr_merge_rate_7d',
      'open_issue_count',
      'open_pr_count',
      'contributor_count',
    ],
    compute: async (input) => {
      const values = input.featureValues;
      const now = input.now;

      const stars = asNumber(values.get('stars') ?? 0);
      const releases30d = asNumber(values.get('release_frequency_30d') ?? 0);
      const issueClosureRate = asNumber(values.get('issue_closure_rate_7d') ?? 0);
      const prMergeRate = asNumber(values.get('pr_merge_rate_7d') ?? 0);
      const openIssues = asNumber(values.get('open_issue_count') ?? 0);
      const openPrs = asNumber(values.get('open_pr_count') ?? 0);
      const contributors = asNumber(values.get('contributor_count') ?? 0);

      const starsNorm = normalizeLog(stars, 10000);
      const releasesNorm = normalizeLinear(releases30d, 10);
      const contributorsNorm = normalizeLog(contributors, 100);
      const openIssuesInv = 1 - normalizeLog(openIssues, 500);
      const openPrsInv = 1 - normalizeLog(openPrs, 100);

      const score =
        starsNorm * 0.25 +
        releasesNorm * 0.20 +
        clamp01(issueClosureRate) * 0.15 +
        clamp01(prMergeRate) * 0.15 +
        clamp01(openIssuesInv) * 0.10 +
        clamp01(openPrsInv) * 0.10 +
        contributorsNorm * 0.05;

      return {
        metricName: 'health_score_v1',
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
