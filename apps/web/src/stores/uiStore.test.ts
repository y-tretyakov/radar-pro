import { beforeEach, describe, expect, it } from 'vitest';
import { useUiStore } from './uiStore.js';

describe('useUiStore', () => {
  beforeEach(() => {
    useUiStore.setState({
      theme: 'system',
      sidebarOpen: true,
    });
  });

  it('toggles sidebar open state', () => {
    expect(useUiStore.getState().sidebarOpen).toBe(true);
    useUiStore.getState().toggleSidebar();
    expect(useUiStore.getState().sidebarOpen).toBe(false);
    useUiStore.getState().setSidebarOpen(true);
    expect(useUiStore.getState().sidebarOpen).toBe(true);
  });

  it('cycles theme light → dark → system', () => {
    useUiStore.getState().setTheme('light');
    useUiStore.getState().cycleTheme();
    expect(useUiStore.getState().theme).toBe('dark');
    useUiStore.getState().cycleTheme();
    expect(useUiStore.getState().theme).toBe('system');
    useUiStore.getState().cycleTheme();
    expect(useUiStore.getState().theme).toBe('light');
  });
});
