import { create } from 'zustand';

export type DashboardLayoutMode = 'grid' | 'list';

export interface DashboardState {
  layoutMode: DashboardLayoutMode;
  /** Local draft text for filter UI (not URL / not server). */
  filterDraft: string;
  setLayoutMode: (mode: DashboardLayoutMode) => void;
  setFilterDraft: (value: string) => void;
  clearFilterDraft: () => void;
}

/**
 * Client-only dashboard layout prefs and ephemeral filter drafts.
 * Applied filters that should be shareable belong in URL state (nuqs).
 * Server repository lists belong in TanStack Query — never here.
 */
export const useDashboardStore = create<DashboardState>((set) => ({
  layoutMode: 'grid',
  filterDraft: '',
  setLayoutMode: (layoutMode) => set({ layoutMode }),
  setFilterDraft: (filterDraft) => set({ filterDraft }),
  clearFilterDraft: () => set({ filterDraft: '' }),
}));
