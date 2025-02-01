// store/useStore.ts
import { create } from "zustand";

interface PlayerState {
  isPlaying: boolean;
  togglePlay: () => void;
}

export const useStore = create<PlayerState>((set) => ({
  isPlaying: false,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));
