/**
 * @radar-pro/api — Hono API on Cloudflare Workers.
 * Phase 0.2: health route + D1/R2/KV bindings (no domain endpoints yet).
 */

import { Hono } from 'hono';
import { getPackageName as getCoreName } from '@radar-pro/core';

export type ApiEnv = {
  Bindings: {
    ENVIRONMENT?: string;
    /** Entity Store (D1) */
    DB?: D1Database;
    /** Immutable journal (R2) */
    JOURNAL?: R2Bucket;
    /** Cache / coordination (KV) */
    KV?: KVNamespace;
  };
};

const app = new Hono<ApiEnv>();

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    service: '@radar-pro/api',
    version: '0.1.2',
    environment: c.env.ENVIRONMENT ?? 'unknown',
    core: getCoreName(),
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (c) => {
  return c.json({
    name: 'Radar Pro API',
    version: '0.1.2',
    docs: '/health',
  });
});

export default app;
