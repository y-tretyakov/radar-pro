/**
 * @radar-pro/manifests — plugin manifests and DSL home.
 * Phase 0.1: placeholder only.
 */

export const MANIFESTS_PACKAGE_VERSION = '0.2.1' as const;

export function getPackageName(): string {
  return '@radar-pro/manifests';
}

/** Minimal plugin manifest placeholder. */
export interface PluginManifestPlaceholder {
  id: string;
  version: string;
  name: string;
}
