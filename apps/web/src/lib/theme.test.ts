import { describe, expect, it } from 'vitest';
import { resolveTheme } from './theme.js';

describe('resolveTheme', () => {
  it('resolves system from prefers-color-scheme', () => {
    expect(resolveTheme('system', true)).toBe('dark');
    expect(resolveTheme('system', false)).toBe('light');
  });

  it('keeps explicit theme', () => {
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
  });
});
