import { describe, expect, it } from 'vitest';
import app from './index.js';

describe('@radar-pro/api', () => {
  it('GET /health returns ok', async () => {
    const res = await app.request('/health', {}, { ENVIRONMENT: 'test' });
    expect(res.status).toBe(200);

    const body = (await res.json()) as { status: string; service: string };
    expect(body.status).toBe('ok');
    expect(body.service).toBe('@radar-pro/api');
  });
});
