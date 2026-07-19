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
