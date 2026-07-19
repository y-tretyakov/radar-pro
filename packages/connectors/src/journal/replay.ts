import type { R2Bucket } from '@cloudflare/workers-types';
import type { JournalEntry } from './types.js';

export async function replayJournal(
  bucket: R2Bucket,
  source: string,
  handler: (entry: JournalEntry) => Promise<void>,
): Promise<number> {
  let count = 0;
  let cursor: string | undefined;

  do {
    const result = await bucket.list({
      prefix: `${source}/`,
      cursor,
    });

    for (const object of result.objects) {
      const obj = await bucket.get(object.key);
      if (obj !== null) {
        const text = await obj.text();
        const entry = JSON.parse(text) as JournalEntry;
        await handler(entry);
        count++;
      }
    }

    cursor = result.truncated ? result.cursor : undefined;
  } while (cursor);

  return count;
}
