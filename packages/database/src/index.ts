/**
 * @radar-pro/database — schema and migrations home.
 * Phase 0.1: placeholder only — no full D1 schema yet.
 */

export const DATABASE_PACKAGE_VERSION = '0.1.0' as const;

export function getPackageName(): string {
  return '@radar-pro/database';
}

/** Placeholder migration descriptor for future D1 migrations. */
export interface MigrationPlaceholder {
  id: string;
  name: string;
  applied: boolean;
}
