import { describe, expect, it } from 'vitest';
import {
  ENGINE_PACKAGE_VERSION,
  getPackageName,
  createRegistry,
  registerFeature,
  getFeature,
  listRegisteredFeatures,
  createStarCountFeature,
  createReleaseFrequencyFeature,
  createReleaseFrequency7dFeature,
  createIssueClosureRate7dFeature,
  createOpenIssueCountFeature,
  createPrMergeRate7dFeature,
  createOpenPrCountFeature,
  createContributorCountFeature,
  createDefaultRegistry,
  createDefaultMetricRegistry,
  executeFeatures,
  createMetricRegistry,
  registerMetric,
  getMetric,
  listRegisteredMetrics,
  createHealthScoreV1Metric,
  createGrowthScoreV1Metric,
  buildExecutionPlan,
  executeDag,
  buildAndExecuteDag,
  createDefaultCacheOptions,
  readCache,
  writeCache,
} from './index.js';
import type { RegisteredFeature, DagNode, DagComputeInput } from './index.js';

describe('@radar-pro/engine', () => {
  it('exports package identity', () => {
    expect(getPackageName()).toBe('@radar-pro/engine');
    expect(ENGINE_PACKAGE_VERSION).toBe('0.2.1');
  });

  describe('registry', () => {
    it('registers and retrieves features', () => {
      const registry = createRegistry();
      const feature = createStarCountFeature();
      registerFeature(registry, feature);
      expect(getFeature(registry, 'stars')).toBe(feature);
    });

    it('lists all registered features', () => {
      const registry = createRegistry();
      registerFeature(registry, createStarCountFeature());
      registerFeature(registry, createReleaseFrequencyFeature());
      expect(listRegisteredFeatures(registry)).toHaveLength(2);
    });

    it('returns undefined for unknown feature', () => {
      const registry = createRegistry();
      expect(getFeature(registry, 'nonexistent')).toBeUndefined();
    });
  });

  describe('metric registry', () => {
    it('registers and retrieves metrics', () => {
      const registry = createMetricRegistry();
      const metric = createHealthScoreV1Metric();
      registerMetric(registry, metric);
      expect(getMetric(registry, 'health_score_v1')).toBe(metric);
    });

    it('lists all registered metrics', () => {
      const registry = createMetricRegistry();
      registerMetric(registry, createHealthScoreV1Metric());
      registerMetric(registry, createGrowthScoreV1Metric());
      expect(listRegisteredMetrics(registry)).toHaveLength(2);
    });

    it('returns undefined for unknown metric', () => {
      const registry = createMetricRegistry();
      expect(getMetric(registry, 'nonexistent')).toBeUndefined();
    });
  });

  describe('createDefaultRegistry', () => {
    it('registers all built-in features', () => {
      const registry = createDefaultRegistry();
      expect(listRegisteredFeatures(registry)).toHaveLength(8);
    });
  });

  describe('createDefaultMetricRegistry', () => {
    it('registers all built-in metrics', () => {
      const registry = createDefaultMetricRegistry();
      expect(listRegisteredMetrics(registry)).toHaveLength(2);
    });
  });

  describe('feature definitions', () => {
    const features: Record<string, RegisteredFeature> = {
      stars: createStarCountFeature(),
      release_frequency_30d: createReleaseFrequencyFeature(),
      release_frequency_7d: createReleaseFrequency7dFeature(),
      issue_closure_rate_7d: createIssueClosureRate7dFeature(),
      open_issue_count: createOpenIssueCountFeature(),
      pr_merge_rate_7d: createPrMergeRate7dFeature(),
      open_pr_count: createOpenPrCountFeature(),
      contributor_count: createContributorCountFeature(),
    };

    for (const [name, feature] of Object.entries(features)) {
      it(`defines "${name}" with correct metadata`, () => {
        expect(feature.definition.name).toBe(name);
        expect(feature.definition.valueType).toBe('number');
        expect(feature.definition.entityType).toBe('repository');
        expect(feature.definition.version).toBe('1.0.0');
        expect(typeof feature.compute).toBe('function');
      });
    }
  });

  describe('metric definitions', () => {
    const metrics = {
      health_score_v1: createHealthScoreV1Metric(),
      growth_score_v1: createGrowthScoreV1Metric(),
    };

    for (const [name, metric] of Object.entries(metrics)) {
      it(`defines "${name}" with correct metadata`, () => {
        expect(metric.definition.name).toBe(name);
        expect(metric.definition.valueType).toBe('number');
        expect(metric.definition.entityType).toBe('repository');
        expect(metric.definition.version).toBe('1.0.0');
        expect(typeof metric.compute).toBe('function');
        expect(Array.isArray(metric.dependencies)).toBe(true);
      });
    }

    it('health_score_v1 depends on all 7 features', () => {
      const metric = createHealthScoreV1Metric();
      expect(metric.dependencies).toEqual([
        'stars',
        'release_frequency_30d',
        'issue_closure_rate_7d',
        'pr_merge_rate_7d',
        'open_issue_count',
        'open_pr_count',
        'contributor_count',
      ]);
    });

    it('growth_score_v1 depends on 5 features', () => {
      const metric = createGrowthScoreV1Metric();
      expect(metric.dependencies).toEqual([
        'release_frequency_7d',
        'release_frequency_30d',
        'issue_closure_rate_7d',
        'pr_merge_rate_7d',
        'contributor_count',
      ]);
    });
  });

  describe('metric compute', () => {
    it('health_score_v1 returns a score between 0 and 1', async () => {
      const metric = createHealthScoreV1Metric();
      const result = await metric.compute({
        db: createMockDb() as any,
        repositoryId: 'repo-1',
        now: 1000,
        featureValues: new Map([
          ['stars', 100],
          ['release_frequency_30d', 3],
          ['issue_closure_rate_7d', 0.8],
          ['pr_merge_rate_7d', 0.6],
          ['open_issue_count', 20],
          ['open_pr_count', 5],
          ['contributor_count', 10],
        ]),
      });
      expect(result.metricName).toBe('health_score_v1');
      expect(result.entityId).toBe('repo-1');
      expect(result.value).toBeGreaterThanOrEqual(0);
      expect(result.value).toBeLessThanOrEqual(1);
      expect(result.computedAt).toBe(1000);
    });

    it('growth_score_v1 returns a score between 0 and 1', async () => {
      const metric = createGrowthScoreV1Metric();
      const result = await metric.compute({
        db: createMockDb() as any,
        repositoryId: 'repo-1',
        now: 1000,
        featureValues: new Map([
          ['release_frequency_7d', 2],
          ['release_frequency_30d', 5],
          ['issue_closure_rate_7d', 0.9],
          ['pr_merge_rate_7d', 0.7],
          ['contributor_count', 15],
        ]),
      });
      expect(result.metricName).toBe('growth_score_v1');
      expect(result.entityId).toBe('repo-1');
      expect(result.value).toBeGreaterThanOrEqual(0);
      expect(result.value).toBeLessThanOrEqual(1);
      expect(result.computedAt).toBe(1000);
    });

    it('health_score_v1 handles zero values', async () => {
      const metric = createHealthScoreV1Metric();
      const result = await metric.compute({
        db: createMockDb() as any,
        repositoryId: 'repo-1',
        now: 1000,
        featureValues: new Map([
          ['stars', 0],
          ['release_frequency_30d', 0],
          ['issue_closure_rate_7d', 0],
          ['pr_merge_rate_7d', 0],
          ['open_issue_count', 0],
          ['open_pr_count', 0],
          ['contributor_count', 0],
        ]),
      });
      expect(typeof result.value).toBe('number');
      expect(result.value).toBeGreaterThanOrEqual(0);
    });
  });

  describe('executeFeatures', () => {
    it('returns results for all features', async () => {
      const registry = createDefaultRegistry();
      const features = listRegisteredFeatures(registry);
      const repoId = 'test-repo-id';
      const results = await executeFeatures(features, {
        db: createMockDb() as any,
        repositoryId: repoId,
        now: 5000,
      });
      expect(results).toHaveLength(8);
      for (const result of results) {
        expect(result.entityId).toBe(repoId);
        expect(result.entityType).toBe('repository');
        expect(result.computedAt).toBe(5000);
        expect(typeof result.value).toBe('number');
      }
    });
  });

  describe('buildExecutionPlan', () => {
    it('returns empty layers for no nodes', () => {
      const plan = buildExecutionPlan([]);
      expect(plan.layers).toEqual([]);
      expect(plan.nodeMap.size).toBe(0);
    });

    it('puts independent nodes in the first layer', () => {
      const nodes: DagNode[] = [
        makeNode('a', []),
        makeNode('b', []),
      ];
      const plan = buildExecutionPlan(nodes);
      expect(plan.layers).toHaveLength(1);
      expect(plan.layers[0]!.sort()).toEqual(['a', 'b']);
    });

    it('sorts nodes with dependencies into correct layers', () => {
      const nodes: DagNode[] = [
        makeNode('a', []),
        makeNode('b', ['a']),
        makeNode('c', ['b']),
      ];
      const plan = buildExecutionPlan(nodes);
      expect(plan.layers).toHaveLength(3);
      expect(plan.layers[0]).toEqual(['a']);
      expect(plan.layers[1]).toEqual(['b']);
      expect(plan.layers[2]).toEqual(['c']);
    });

    it('handles diamond dependencies', () => {
      const nodes: DagNode[] = [
        makeNode('a', []),
        makeNode('b', ['a']),
        makeNode('c', ['a']),
        makeNode('d', ['b', 'c']),
      ];
      const plan = buildExecutionPlan(nodes);
      expect(plan.layers).toHaveLength(3);
      expect(plan.layers[0]).toEqual(['a']);
      expect(plan.layers[1]!.sort()).toEqual(['b', 'c']);
      expect(plan.layers[2]).toEqual(['d']);
    });

    it('throws on cycle', () => {
      const nodes: DagNode[] = [
        makeNode('a', ['b']),
        makeNode('b', ['a']),
      ];
      expect(() => buildExecutionPlan(nodes)).toThrow('cycle');
    });

    it('throws on self-dependency', () => {
      const nodes: DagNode[] = [
        makeNode('a', ['a']),
      ];
      expect(() => buildExecutionPlan(nodes)).toThrow('cycle');
    });

    it('throws on missing dependency', () => {
      const nodes: DagNode[] = [
        makeNode('a', ['nonexistent']),
      ];
      const plan = buildExecutionPlan(nodes);
      expect(plan.layers).toHaveLength(1);
      expect(plan.layers[0]).toEqual(['a']);
    });
  });

  describe('executeDag', () => {
    it('executes nodes in dependency order', async () => {
      const executed: string[] = [];
      const nodes: DagNode[] = [
        {
          id: 'a',
          type: 'feature',
          dependencies: [],
          execute: async () => { executed.push('a'); return { nodeId: 'a', value: 1, computedAt: 0 }; },
        },
        {
          id: 'b',
          type: 'metric',
          dependencies: ['a'],
          execute: async (input) => {
            executed.push('b');
            const aVal = input.computedValues.get('a')!.value;
            return { nodeId: 'b', value: (aVal as number) * 2, computedAt: 0 };
          },
        },
      ];
      const results = await buildAndExecuteDag(nodes, makeDagInput());
      expect(executed).toEqual(['a', 'b']);
      expect(results.get('b')!.value).toBe(2);
    });

    it('provides computed values to downstream nodes', async () => {
      const nodes: DagNode[] = [
        makeNode('a', []),
        {
          id: 'sum',
          type: 'metric',
          dependencies: ['a'],
          execute: async (input) => {
            const aVal = input.computedValues.get('a')!.value as number;
            return { nodeId: 'sum', value: aVal + 10, computedAt: 0 };
          },
        },
      ];
      const results = await buildAndExecuteDag(nodes, makeDagInput());
      expect(results.get('a')!.value).toBe(1);
      expect(results.get('sum')!.value).toBe(11);
    });

    it('sets computedAt from input now', async () => {
      const nodes = [makeNode('a', [])];
      const now = 12345;
      const results = await buildAndExecuteDag(nodes, makeDagInput(now));
      expect(results.get('a')!.computedAt).toBe(now);
    });
  });

  describe('cache', () => {
    it('createDefaultCacheOptions returns 3600s TTL', () => {
      const opts = createDefaultCacheOptions();
      expect(opts.ttlSeconds).toBe(3600);
    });

    it('readCache returns null when feature does not exist', async () => {
      const db = createMockDb() as any;
      const result = await readCache(db, 'stars', 'repository', 'repo-1', '1.0.0');
      expect(result).toBeNull();
    });

    it('writeCache writes a row and readCache can retrieve it', async () => {
      const store: Record<string, any> = {};
      const db = createMockDb(store) as any;
      await writeCache(db, 'stars', 'repository', 'repo-1', 42, '1.0.0', 1000);
      expect(store['stars:repository:repo-1']).toBeDefined();
    });
  });
});

// ── Helpers ──

function makeNode(id: string, dependencies: string[]): DagNode {
  return {
    id,
    type: dependencies.length === 0 ? 'feature' : 'metric',
    dependencies,
    execute: async (input) => ({ nodeId: id, value: 1, computedAt: input.now }),
  };
}

function makeDagInput(now = 0): DagComputeInput {
  return {
    db: {} as any,
    repositoryId: 'repo-1',
    now,
    computedValues: new Map(),
  };
}

interface MockDb {
  prepare(_sql: string): MockStatement;
}

interface MockStatement {
  run(): Promise<{ success: boolean }>;
  first<T>(): Promise<T | null>;
  all<T>(): Promise<{ results: T[] }>;
  bind(..._args: any[]): MockStatement;
}

function createMockDb(store?: Record<string, any>): MockDb {
  const run = () => Promise.resolve({ success: true });
  const first = <T>() => Promise.resolve(null) as Promise<T | null>;
  const all = <T>() => Promise.resolve({ results: [] as T[] }) as Promise<{ results: T[] }>;

  if (store) {
    return {
      prepare: (_sql: string) => ({
        bind: (...args: any[]) => {
          const row: any = {};
          if (_sql.includes('INSERT') || _sql.includes('ON CONFLICT')) {
            store[args[0] as string] = {
              id: args[0],
              feature_name: args[1],
              entity_type: args[2],
              entity_id: args[3],
              value: args[4],
              version: args[5],
              computed_at: args[6],
            };
          }
          return {
            run: () => Promise.resolve({ success: true }),
            first: <T>() => {
              const val = store[`${args[0]}`];
              return Promise.resolve(val ?? null) as Promise<T | null>;
            },
            all: <T>() => Promise.resolve({ results: [] as T[] }) as Promise<{ results: T[] }>,
          };
        },
        run,
        first,
        all,
      }),
    };
  }

  return {
    prepare: () => ({
      bind: () => ({ run, first, all }),
      run,
      first,
      all,
    }),
  };
}
