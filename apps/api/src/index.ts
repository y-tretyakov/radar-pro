/**
 * @radar-pro/api — Hono BFF / API on Cloudflare Workers.
 * Phase 0.1: minimal health route only.
 */

import { Hono } from 'hono';
import { getPackageName as getCoreName } from '@radar-pro/core';

export type ApiEnv = {
  Bindings: {
    ENVIRONMENT?: string;
  };
};

const app = new Hono<ApiEnv>();

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    service: '@radar-pro/api',
    version: '0.1.0',
    environment: c.env.ENVIRONMENT ?? 'unknown',
    core: getCoreName(),
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (c) => {
  return c.json({
    name: 'Radar Pro API',
    version: '0.1.0',
    docs: '/health',
  });
});

export default app;
