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
  executeFeatures,
} from './index.js';
import type { RegisteredFeature } from './index.js';

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

  describe('createDefaultRegistry', () => {
    it('registers all built-in features', () => {
      const registry = createDefaultRegistry();
      expect(listRegisteredFeatures(registry)).toHaveLength(8);
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

  describe('executeFeatures', () => {
    it('returns results for all features', async () => {
      const registry = createDefaultRegistry();
      const features = listRegisteredFeatures(registry);
      const repoId = 'test-repo-id';
      const results = await executeFeatures(features, {
        db: createMockDb(),
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
});

interface MockStatement {
  run(): Promise<{ success: boolean }>;
  first<T>(): Promise<T | null>;
  all<T>(): Promise<{ results: T[] }>;
}

interface MockDb {
  prepare(_sql: string): MockStatement;
}

function createMockDb(): MockDb {
  const run = () => Promise.resolve({ success: true });
  const first = <T>() => Promise.resolve(null) as Promise<T | null>;
  const all = <T>() => Promise.resolve({ results: [] as T[] }) as Promise<{ results: T[] }>;
  const bind = () => ({ run, first, all });
  return { prepare: () => ({ bind }) };
}
