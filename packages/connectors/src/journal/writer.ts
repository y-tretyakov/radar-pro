import type { R2Bucket } from '@cloudflare/workers-types';
import type { JournalInput, JournalEntry } from './types.js';

function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function buildR2Key(input: JournalInput, id: string, timestamp: number): string {
  const ts = timestamp;
  return `${input.source}/${input.entityType}/${input.entityId}/${ts}-${id}.json`;
}

export async function writeJournalEntry(
  bucket: R2Bucket,
  input: JournalInput,
): Promise<{ id: string; r2Key: string }> {
  const id = generateId();
  const recordedAt = Date.now();
  const r2Key = buildR2Key(input, id, recordedAt);

  const entry: JournalEntry = {
    id,
    source: input.source,
    entityType: input.entityType,
    entityId: input.entityId,
    r2Key,
    contentType: 'application/json',
    payload: input.payload,
    recordedAt,
  };

  const body = JSON.stringify(entry);
  await bucket.put(r2Key, body, {
    httpMetadata: { contentType: 'application/json' },
  });

  return { id, r2Key };
}
