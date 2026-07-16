import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface UiState {
  theme: ThemeMode;
  sidebarOpen: boolean;
  setTheme: (theme: ThemeMode) => void;
  cycleTheme: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const THEME_CYCLE: ThemeMode[] = ['light', 'dark', 'system'];

/**
 * Client-only UI chrome state (theme, sidebar).
 * Do not store server/fetch data here — use TanStack Query.
 */
export const useUiStore = create<UiState>((set, get) => ({
  theme: 'system',
  sidebarOpen: true,
  setTheme: (theme) => set({ theme }),
  cycleTheme: () => {
    const current = get().theme;
    const nextIndex = (THEME_CYCLE.indexOf(current) + 1) % THEME_CYCLE.length;
    const next = THEME_CYCLE[nextIndex] ?? 'system';
    set({ theme: next });
  },
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));
