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

export const ENGINE_PACKAGE_VERSION = '0.2.1' as const;

export function getPackageName(): string {
  return '@radar-pro/engine';
}

export type { NodeId } from './types.js';
export type {
  FeatureDefinition,
  FeatureValueType,
  FeatureEntityType,
  FeatureComputeInput,
  FeatureResult,
  FeatureComputer,
  RegisteredFeature,
} from './types.js';

export {
  createRegistry,
  registerFeature,
  getFeature,
  listRegisteredFeatures,
} from './registry.js';
export type { FeatureRegistry } from './registry.js';

export { executeFeatures } from './executor.js';
export type { ExecuteOptions } from './executor.js';

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
