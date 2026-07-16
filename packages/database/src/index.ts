/**
 * @radar-pro/database — D1 schema types and migration catalog.
 * SQL migrations: packages/database/migrations (applied via wrangler --local).
 */

export const DATABASE_PACKAGE_VERSION = '0.1.2' as const;

export function getPackageName(): string {
  return '@radar-pro/database';
}

export {
  CORE_TABLES,
  type CoreTableName,
  type DatasetRow,
  type FeatureDefinitionRow,
  type OwnerRow,
  type OwnerType,
  type RepositoryRow,
} from './types.js';

/** Descriptor for a SQL migration file under migrations/. */
export interface MigrationDescriptor {
  /** Wrangler migration id / filename without path, e.g. 0001_initial_schema.sql */
  id: string;
  name: string;
}

/**
 * Catalog of shipped migrations (must match files in migrations/).
 * Used for smoke tests; wrangler applies the SQL files themselves.
 */
export const MIGRATIONS: readonly MigrationDescriptor[] = [
  { id: '0001_initial_schema.sql', name: 'initial_schema' },
] as const;
