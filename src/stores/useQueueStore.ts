import { create } from 'zustand';
import type { CarouselPost, CarouselSlide } from '@/types';

interface QueueState {
  posts: CarouselPost[];
  slidesByPost: Record<string, CarouselSlide[]>;
  selectedPostId: string | null;
  setPosts: (posts: CarouselPost[]) => void;
  setSlidesForPost: (postId: string, slides: CarouselSlide[]) => void;
  setSelectedPostId: (postId: string | null) => void;
}

export const useQueueStore = create<QueueState>((set) => ({
  posts: [],
  slidesByPost: {},
  selectedPostId: null,
  setPosts: (posts) => set({ posts }),
  setSlidesForPost: (postId, slides) => set((state) => ({
    slidesByPost: { ...state.slidesByPost, [postId]: slides }
  })),
  setSelectedPostId: (selectedPostId) => set({ selectedPostId })
}));
