import { create } from 'zustand';
import type { BrandAsset } from '@/types';

interface AssetState {
  filter: 'all' | 'logo' | 'template_bg' | 'color_palette' | 'icon';
  assets: BrandAsset[];
  setFilter: (filter: AssetState['filter']) => void;
  setAssets: (assets: BrandAsset[]) => void;
}

export const useAssetStore = create<AssetState>((set) => ({
  filter: 'all',
  assets: [],
  setFilter: (filter) => set({ filter }),
  setAssets: (assets) => set({ assets })
}));
