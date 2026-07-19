import type { R2Bucket, R2ListOptions } from '@cloudflare/workers-types';
import type { JournalEntry, JournalListOptions } from './types.js';

export async function getJournalEntry(
  bucket: R2Bucket,
  r2Key: string,
): Promise<JournalEntry | null> {
  const object = await bucket.get(r2Key);
  if (object === null) {
    return null;
  }
  const text = await object.text();
  return JSON.parse(text) as JournalEntry;
}

export async function listJournalEntries(
  bucket: R2Bucket,
  options?: JournalListOptions,
): Promise<{ entries: JournalEntry[]; cursor?: string }> {
  const r2Options: R2ListOptions = {
    limit: options?.limit,
    cursor: options?.cursor,
    prefix: options?.prefix,
  };

  const result = await bucket.list(r2Options);

  const entries: JournalEntry[] = [];
  for (const object of result.objects) {
    const obj = await bucket.get(object.key);
    if (obj !== null) {
      const text = await obj.text();
      entries.push(JSON.parse(text) as JournalEntry);
    }
  }

  return {
    entries,
    cursor: result.truncated ? result.cursor : undefined,
  };
}
