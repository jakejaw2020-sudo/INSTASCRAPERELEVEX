import { create } from 'zustand';
import type { AppSettings, BrandAsset, ResearchTarget } from '@/types';

interface AppState {
  settings: AppSettings | null;
  assets: BrandAsset[];
  researchTargets: ResearchTarget[];
  activeErrors: string[];
  setSettings: (settings: AppSettings) => void;
  setAssets: (assets: BrandAsset[]) => void;
  setResearchTargets: (targets: ResearchTarget[]) => void;
  pushError: (error: string) => void;
  clearError: (error: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  settings: null,
  assets: [],
  researchTargets: [],
  activeErrors: [],
  setSettings: (settings) => set({ settings }),
  setAssets: (assets) => set({ assets }),
  setResearchTargets: (researchTargets) => set({ researchTargets }),
  pushError: (error) => set((state) => ({ activeErrors: [...state.activeErrors, error] })),
  clearError: (error) => set((state) => ({ activeErrors: state.activeErrors.filter((entry) => entry !== error) }))
}));
