import type { RegisteredMetric } from './types.js';

export type MetricRegistry = Map<string, RegisteredMetric>;

export function createMetricRegistry(): MetricRegistry {
  return new Map();
}

export function registerMetric(registry: MetricRegistry, metric: RegisteredMetric): void {
  registry.set(metric.definition.name, metric);
}

export function getMetric(registry: MetricRegistry, name: string): RegisteredMetric | undefined {
  return registry.get(name);
}

export function listRegisteredMetrics(registry: MetricRegistry): RegisteredMetric[] {
  return Array.from(registry.values());
}
