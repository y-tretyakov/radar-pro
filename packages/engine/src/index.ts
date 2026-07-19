import {
  createRegistry as _createRegistry,
  registerFeature as _registerFeature,
} from './registry.js';

import {
  createStarCountFeature as _createStarCountFeature,
  createReleaseFrequencyFeature as _createReleaseFrequencyFeature,
  createReleaseFrequency7dFeature as _createReleaseFrequency7dFeature,
  createIssueClosureRate7dFeature as _createIssueClosureRate7dFeature,
  createOpenIssueCountFeature as _createOpenIssueCountFeature,
  createPrMergeRate7dFeature as _createPrMergeRate7dFeature,
  createOpenPrCountFeature as _createOpenPrCountFeature,
  createContributorCountFeature as _createContributorCountFeature,
} from './features/index.js';

import {
  createHealthScoreV1Metric as _createHealthScoreV1Metric,
  createGrowthScoreV1Metric as _createGrowthScoreV1Metric,
} from './metrics/index.js';

import {
  createMetricRegistry as _createMetricRegistry,
  registerMetric as _registerMetric,
} from './metric-registry.js';

import { buildExecutionPlan, executeDag, buildAndExecuteDag } from './dag-executor.js';
import { createDefaultCacheOptions, readCache, writeCache } from './cache.js';

export const ENGINE_PACKAGE_VERSION = '0.2.1' as const;

export function getPackageName(): string {
  return '@radar-pro/engine';
}

export type { NodeId } from './types.js';

// Feature types
export type {
  FeatureDefinition,
  FeatureValueType,
  FeatureEntityType,
  FeatureComputeInput,
  FeatureResult,
  FeatureComputer,
  RegisteredFeature,
} from './types.js';

// Metric types
export type {
  MetricDefinition,
  MetricValueType,
  MetricEntityType,
  MetricComputeInput,
  MetricResult,
  MetricComputer,
  RegisteredMetric,
} from './types.js';

// DAG types
export type {
  DagNodeType,
  DagNodeResult,
  DagComputeInput,
  DagNode,
  DagExecutionPlan,
} from './types.js';

// Cache types
export type {
  CacheOptions,
  CacheEntry,
} from './types.js';

// Feature registry
export {
  createRegistry,
  registerFeature,
  getFeature,
  listRegisteredFeatures,
} from './registry.js';
export type { FeatureRegistry } from './registry.js';

// Metric registry
export {
  createMetricRegistry,
  registerMetric,
  getMetric,
  listRegisteredMetrics,
} from './metric-registry.js';
export type { MetricRegistry } from './metric-registry.js';

// Executor
export { executeFeatures } from './executor.js';
export type { ExecuteOptions } from './executor.js';

// DAG
export {
  buildExecutionPlan,
  executeDag,
  buildAndExecuteDag,
} from './dag-executor.js';

// Cache
export {
  createDefaultCacheOptions,
  readCache,
  writeCache,
} from './cache.js';

// Built-in features
export {
  createStarCountFeature,
  createReleaseFrequencyFeature,
  createReleaseFrequency7dFeature,
  createIssueClosureRate7dFeature,
  createOpenIssueCountFeature,
  createPrMergeRate7dFeature,
  createOpenPrCountFeature,
  createContributorCountFeature,
} from './features/index.js';

// Built-in metrics
export {
  createHealthScoreV1Metric,
  createGrowthScoreV1Metric,
} from './metrics/index.js';

export function createDefaultRegistry() {
  const registry = _createRegistry();
  const features = [
    _createStarCountFeature(),
    _createReleaseFrequencyFeature(),
    _createReleaseFrequency7dFeature(),
    _createIssueClosureRate7dFeature(),
    _createOpenIssueCountFeature(),
    _createPrMergeRate7dFeature(),
    _createOpenPrCountFeature(),
    _createContributorCountFeature(),
  ];
  for (const feature of features) {
    _registerFeature(registry, feature);
  }
  return registry;
}

export function createDefaultMetricRegistry() {
  const registry = _createMetricRegistry();
  const metrics = [
    _createHealthScoreV1Metric(),
    _createGrowthScoreV1Metric(),
  ];
  for (const metric of metrics) {
    _registerMetric(registry, metric);
  }
  return registry;
}
