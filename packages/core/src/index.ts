/**
 * @radar-pro/core — domain types and pure business logic home.
 * Phase 0.1: placeholder only.
 */

export const CORE_PACKAGE_VERSION = '0.1.2' as const;

/** Placeholder identity for workspace smoke tests. */
export function getPackageName(): string {
  return '@radar-pro/core';
}

/** Minimal branded-style id type placeholder. */
export type EntityId = string & { readonly __brand?: 'EntityId' };

export interface PlaceholderEntity {
  id: EntityId;
  name: string;
}
