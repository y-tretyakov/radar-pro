/**
 * @radar-pro/worker — Cloudflare Worker shell for future cron / pipeline jobs.
 * Phase 0.1: minimal fetch handler only.
 */

import { getPackageName as getCoreName } from '@radar-pro/core';

export interface Env {
  ENVIRONMENT?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/health' || url.pathname === '/') {
      return Response.json({
        status: 'ok',
        service: '@radar-pro/worker',
        version: '0.1.0',
        environment: env.ENVIRONMENT ?? 'unknown',
        core: getCoreName(),
        message: 'Pipeline worker shell — cron/pipeline not yet configured',
      });
    }

    return new Response('Not Found', { status: 404 });
  },
} satisfies ExportedHandler<Env>;
