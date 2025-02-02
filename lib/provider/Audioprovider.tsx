"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextProps {
  isPlayingSong: boolean;
  play: () => void;
  pause: () => void;
  togglePlaySong: () => void;
  setAudioSrc: (src: string) => void;
  currentTime: number;
  duration: number;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlayingSong, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.src = audioSrc;
      audioRef.current.load();
      play();
    }
  }, [audioSrc]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlaySong = () => {
    if (isPlayingSong) {
      pause();
    } else {
      play();
    }
  };

  const setAudioSrcAndPlay = (src: string) => {
    setAudioSrc(src);
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  const setCurrentTimeAndUpdate = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlayingSong,
        play,
        pause,
        togglePlaySong,
        setAudioSrc: setAudioSrcAndPlay,
        currentTime,
        duration,
        setVolume,
        setCurrentTime: setCurrentTimeAndUpdate,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextProps => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};