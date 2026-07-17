export const CONNECTORS_PACKAGE_VERSION = '0.2.0' as const;

export function getPackageName(): string {
  return '@radar-pro/connectors';
}

export type ConnectorId = string;

export interface ConnectorPlaceholder {
  id: ConnectorId;
  name: string;
}

export { GitHubClient } from './github/index.js';
export type { GitHubClientConfig } from './github/index.js';

export {
  writeJournalEntry,
  getJournalEntry,
  listJournalEntries,
  replayJournal,
} from './journal/index.js';
export type { JournalEntry, JournalInput, JournalListOptions } from './journal/index.js';

export {
  normalizeOwner,
  normalizeOwnerUpdate,
  normalizeRepository,
  normalizeRepositoryUpdate,
  normalizeIssue,
  normalizePullRequest,
  normalizeRelease,
  normalizeContributor,
} from './normalizer/index.js';
