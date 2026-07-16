import { create } from 'zustand';

export type Density = 'comfortable' | 'compact';

export interface PreferencesState {
  density: Density;
  /** Placeholder until i18n lands. */
  language: string;
  setDensity: (density: Density) => void;
  setLanguage: (language: string) => void;
}

/**
 * User presentation preferences (density, language placeholder).
 * Client-only — no server-fetched domain entities.
 */
export const usePreferencesStore = create<PreferencesState>((set) => ({
  density: 'comfortable',
  language: 'en',
  setDensity: (density) => set({ density }),
  setLanguage: (language) => set({ language }),
}));
