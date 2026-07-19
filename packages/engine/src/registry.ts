import type { RegisteredFeature } from './types.js';

export type FeatureRegistry = Map<string, RegisteredFeature>;

export function createRegistry(): FeatureRegistry {
  return new Map();
}

export function registerFeature(registry: FeatureRegistry, feature: RegisteredFeature): void {
  registry.set(feature.definition.name, feature);
}

export function getFeature(registry: FeatureRegistry, name: string): RegisteredFeature | undefined {
  return registry.get(name);
}

export function listRegisteredFeatures(registry: FeatureRegistry): RegisteredFeature[] {
  return Array.from(registry.values());
}
