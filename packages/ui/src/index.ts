/**
 * @radar-pro/ui — shared UI components.
 * Phase 0.3: minimal layout primitives for the dashboard shell.
 */

export { Placeholder } from './placeholder.js';
export type { PlaceholderProps } from './placeholder.js';

export { Button } from './button.js';
export type { ButtonProps, ButtonVariant } from './button.js';

export { Card } from './card.js';
export type { CardProps } from './card.js';

export { AppShell } from './app-shell.js';
export type { AppShellProps } from './app-shell.js';

export const UI_PACKAGE_VERSION = '0.2.1' as const;

export function getPackageName(): string {
  return '@radar-pro/ui';
}
