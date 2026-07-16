import type { ThemeMode } from '../stores/uiStore.js';

export type ResolvedTheme = 'light' | 'dark';

export function resolveTheme(theme: ThemeMode, prefersDark: boolean): ResolvedTheme {
  if (theme === 'system') {
    return prefersDark ? 'dark' : 'light';
  }
  return theme;
}

/** Apply theme tokens on the document root for CSS `[data-theme]`. */
export function applyDocumentTheme(theme: ThemeMode): ResolvedTheme {
  const prefersDark =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const resolved = resolveTheme(theme, prefersDark);
  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themeMode = theme;
  document.documentElement.style.colorScheme = resolved;
  return resolved;
}
