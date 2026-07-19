import type { D1Database } from '@cloudflare/workers-types';

export type NodeId = string;

export type FeatureValueType = 'number' | 'boolean' | 'string';
export type FeatureEntityType = 'repository' | 'owner';

export interface FeatureDefinition {
  name: string;
  description: string;
  valueType: FeatureValueType;
  entityType: FeatureEntityType;
  version: string;
  unit: string | null;
}

export interface FeatureComputeInput {
  db: D1Database;
  repositoryId: string;
  now?: number;
}

export interface FeatureResult {
  featureName: string;
  value: number | boolean | string;
  entityId: string;
  entityType: FeatureEntityType;
  computedAt: number;
}

export type FeatureComputer = (input: FeatureComputeInput) => Promise<FeatureResult>;

export interface RegisteredFeature {
  definition: FeatureDefinition;
  compute: FeatureComputer;
}

// ── Metric types ──

export type MetricValueType = 'number' | 'boolean' | 'string';
export type MetricEntityType = 'repository' | 'owner';

export interface MetricDefinition {
  name: string;
  description: string;
  valueType: MetricValueType;
  entityType: MetricEntityType;
  version: string;
  unit: string | null;
  formula: string;
}

export interface MetricComputeInput {
  db: D1Database;
  repositoryId: string;
  now: number;
  featureValues: Map<string, number | boolean | string>;
}

export interface MetricResult {
  metricName: string;
  value: number | boolean | string;
  entityId: string;
  entityType: MetricEntityType;
  computedAt: number;
}

export type MetricComputer = (input: MetricComputeInput) => Promise<MetricResult>;

export interface RegisteredMetric {
  definition: MetricDefinition;
  compute: MetricComputer;
  dependencies: string[];
}

// ── DAG types ──

export type DagNodeType = 'feature' | 'metric';

export interface DagNodeResult {
  nodeId: string;
  value: number | boolean | string;
  computedAt: number;
}

export interface DagComputeInput {
  db: D1Database;
  repositoryId: string;
  now: number;
  computedValues: Map<string, DagNodeResult>;
}

export interface DagNode {
  id: string;
  type: DagNodeType;
  dependencies: string[];
  execute: (input: DagComputeInput) => Promise<DagNodeResult>;
}

export interface DagExecutionPlan {
  layers: string[][];
  nodeMap: Map<string, DagNode>;
}

// ── Cache types ──

export interface CacheOptions {
  ttlSeconds: number;
}

export interface CacheEntry {
  value: number | boolean | string;
  version: string;
  computedAt: number;
}
