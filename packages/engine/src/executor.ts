import type { D1Database } from '@cloudflare/workers-types';
import type { FeatureResult, RegisteredFeature } from './types.js';

export interface ExecuteOptions {
  db: D1Database;
  repositoryId: string;
  now?: number;
}

export async function executeFeatures(
  features: RegisteredFeature[],
  options: ExecuteOptions,
): Promise<FeatureResult[]> {
  const results: FeatureResult[] = [];
  for (const feature of features) {
    const result = await feature.compute({
      db: options.db,
      repositoryId: options.repositoryId,
      now: options.now,
    });
    results.push(result);
  }
  return results;
}
