/**
 * @radar-pro/engine — DAG runtime, features, and metrics.
 * Phase 0.1: placeholder only.
 */

import { getPackageName as getCoreName } from '@radar-pro/core';

export const ENGINE_PACKAGE_VERSION = '0.2.0' as const;

export function getPackageName(): string {
  return '@radar-pro/engine';
}

/** Placeholder: future DAG node identity. */
export type NodeId = string;

/** Skeleton for future computation graph. */
export interface EnginePlaceholder {
  name: string;
  dependsOnCore: string;
}

export function createEnginePlaceholder(): EnginePlaceholder {
  return {
    name: getPackageName(),
    dependsOnCore: getCoreName(),
  };
}
