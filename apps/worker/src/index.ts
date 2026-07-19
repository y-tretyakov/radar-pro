/**
 * @radar-pro/worker — Cloudflare Worker shell for future cron / pipeline jobs.
 * Phase 0.2: health handler + D1/R2/KV bindings (pipeline not configured yet).
 */

import { getPackageName as getCoreName } from '@radar-pro/core';

export interface Env {
  ENVIRONMENT?: string;
  /** Entity Store (D1) */
  DB?: D1Database;
  /** Immutable journal (R2) */
  JOURNAL?: R2Bucket;
  /** Cache / coordination (KV) */
  KV?: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/health' || url.pathname === '/') {
      return Response.json({
        status: 'ok',
        service: '@radar-pro/worker',
        version: '0.2.0',
        environment: env.ENVIRONMENT ?? 'unknown',
        core: getCoreName(),
        message: 'Pipeline worker shell — cron/pipeline not yet configured',
      });
    }

    return new Response('Not Found', { status: 404 });
  },
} satisfies ExportedHandler<Env>;
