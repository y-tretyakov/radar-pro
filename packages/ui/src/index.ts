/**
 * @radar-pro/ui — shared UI components.
 * Phase 0.1: minimal export only.
 */

export { Placeholder } from './placeholder.js';
export type { PlaceholderProps } from './placeholder.js';

export const UI_PACKAGE_VERSION = '0.1.0' as const;

export function getPackageName(): string {
  return '@radar-pro/ui';
}
