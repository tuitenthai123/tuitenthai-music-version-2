import { create } from "zustand";

interface PlayerState {
  isPlaying: boolean;
  currentSongIndex: number;
  togglePlay: (newState:any) => void;
  songs: InfoSong[];
  addSong: (song: InfoSong) => void;
  currentSong: InfoSong | null;
  setCurrentSong: (song: InfoSong | null) => void;
  playNextSong: () => void;
  playPreviousSong: () => void;
  playlist: InfoSong[]; 
  addToPlaylist: (song: InfoSong) => void; 
}

interface InfoSong {
  title: string;
  type: string;
  key: string;
  duration: string;
  thumbnail: string;
  artists: string[];
  streamUrls: { streamUrl: string }[];
}

export const useStore = create<PlayerState>((set, get) => ({
  isPlaying: false,
  currentSongIndex: 0,
  togglePlay: (newState: boolean) => set((state) => {
    if (state.isPlaying !== newState) {
      return { isPlaying: newState };
    }
    return state;
  }),
  songs: [],
  addSong: (song) =>
    set((state) => {
      const songExists = state.songs.some((existingSong) => existingSong.key === song.key);
      if (songExists) return state;
      return {
        songs: [...state.songs, song],
      };
    }),
  currentSong: null,
  setCurrentSong: (song) =>
    set(() => ({
      currentSong: song,
    })),
  playlist: [],
  addToPlaylist: (song) =>
    set((state) => {
      const playlistExists = state.playlist.some((existingSong) => existingSong.key === song.key);
      if (playlistExists) return state; 
      return {
        playlist: [...state.playlist, song],
      };
    }),
  playNextSong: () => {
    const { playlist, currentSong } = get();
    if (!currentSong) return;
    const currentIndex = playlist.findIndex((song) => song.key === currentSong.key);
    if (currentIndex === -1 || currentIndex === playlist.length - 1) return;
    const nextSong = playlist[currentIndex + 1];
    set(() => ({ currentSong: nextSong }));
  },
  playPreviousSong: () => {
    const { playlist, currentSong } = get();
    if (!currentSong) return; 
    const currentIndex = playlist.findIndex((song) => song.key === currentSong.key);
    if (currentIndex === -1 || currentIndex === 0) return; 
    const previousSong = playlist[currentIndex - 1];
    set(() => ({ currentSong: previousSong }));
  },
}));
