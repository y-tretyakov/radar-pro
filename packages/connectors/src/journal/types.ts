export interface JournalEntry {
  id: string;
  source: string;
  entityType: string;
  entityId: string;
  r2Key: string;
  contentType: string;
  payload: unknown;
  recordedAt: number;
}

export interface JournalInput {
  source: string;
  entityType: string;
  entityId: string;
  payload: unknown;
}

export interface JournalListOptions {
  prefix?: string;
  limit?: number;
  cursor?: string;
}
