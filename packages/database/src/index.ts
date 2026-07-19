export const DATABASE_PACKAGE_VERSION = '0.2.1' as const;

export function getPackageName(): string {
  return '@radar-pro/database';
}

export {
  CORE_TABLES,
  type CoreTableName,
  type OwnerRow,
  type OwnerType,
  type DatasetRow,
  type RepositoryRow,
  type FeatureDefinitionRow,
  type IssueRow,
  type PullRequestRow,
  type ReleaseRow,
  type ContributorRow,
  type JournalEntryRow,
  type FeatureValueRow,
  type EntityType,
} from './types.js';

export interface MigrationDescriptor {
  id: string;
  name: string;
}

export const MIGRATIONS: readonly MigrationDescriptor[] = [
  { id: '0001_initial_schema.sql', name: 'initial_schema' },
  { id: '0002_journal_and_details.sql', name: 'journal_and_details' },
  { id: '0003_feature_values.sql', name: 'feature_values' },
] as const;

export * as store from './store/index.js';
