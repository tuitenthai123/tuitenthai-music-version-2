"use client"
import React, { useEffect, useRef, useState } from 'react'
import { IoMdSkipBackward, IoMdSkipForward, IoMdPlay, IoMdPause, IoMdVolumeHigh, IoMdVolumeOff, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useStore } from "@/store/useStore"
import { useAudio } from "@/lib/provider/Audioprovider"

export function Player() {
  const { currentSong, playNextSong, playPreviousSong } = useStore();
  const { isPlayingSong, togglePlaySong, setAudioSrc, currentTime, duration, setCurrentTime, setVolume } = useAudio();
  const [volumeValue, setVolumeValue] = useState(100);
  const [isLiked, setIsLiked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentSong?.streamUrls && currentSong.streamUrls.length > 0) {
      setAudioSrc(currentSong.streamUrls[0].streamUrl);
    }
  }, [currentSong, setAudioSrc]);

  if (!currentSong) return null;

  const handleClickProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      setCurrentTime(newTime);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      setTooltipPosition(percent * 100);
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolumeValue(newVolume);
    setVolume(newVolume / 100);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg transition-all duration-300 ease-in-out">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        {/* Song Info */}
        <div className="flex items-center space-x-4 w-1/4">
          <img 
            src={currentSong.thumbnail || "/placeholder.svg"} 
            alt={currentSong.title} 
            className="h-12 w-12 rounded-md object-cover shadow-md transition-transform duration-300 hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium line-clamp-1">{currentSong.title}</span>
            <span className="text-xs text-muted-foreground line-clamp-1">
              {currentSong?.artists?.map((artist: any) => artist.name).join(", ")}
            </span>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsLiked(!isLiked)}
            className="text-red-500 hover:text-red-600 transition-colors duration-300"
          >
            {isLiked ? <IoMdHeart className="h-5 w-5" /> : <IoMdHeartEmpty className="h-5 w-5" />}
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center w-1/2">
          <div className="flex items-center space-x-4 mb-2">
            <Button size="icon" variant="ghost" onClick={playPreviousSong} className="hover:bg-gray-100 transition-colors duration-300">
              <IoMdSkipBackward className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={togglePlaySong}
              className="w-12 h-12 rounded-full border-2 hover:bg-primary hover:text-white transition-all duration-300"
            >
              {isPlayingSong ? (
                <IoMdPause className="h-6 w-6" />
              ) : (
                <IoMdPlay className="h-6 w-6 ml-1" />
              )}
            </Button>
            <Button size="icon" variant="ghost" onClick={playNextSong} className="hover:bg-gray-100 transition-colors duration-300">
              <IoMdSkipForward className="h-5 w-5" />
            </Button>
          </div>
          <div className="w-full flex items-center space-x-2">
            <span className="text-xs w-10 text-right">{formatTime(currentTime)}</span>
            <div 
              ref={progressRef}
              className="w-full h-2 bg-gray-200 rounded-full cursor-pointer relative group"
              onClick={handleClickProgress}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                className="h-full bg-primary rounded-full relative transition-all duration-300 ease-in-out"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              {showTooltip && (
                <div 
                  className="absolute top-0 transform -translate-y-full -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ left: `${tooltipPosition}%` }}
                >
                  {formatTime(tooltipPosition / 100 * duration)}
                </div>
              )}
            </div>
            <span className="text-xs w-10">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 w-1/4 justify-end">
          <Button size="icon" variant="ghost" onClick={() => setVolumeValue(volumeValue === 0 ? 100 : 0)} className="hover:bg-gray-100 transition-colors duration-300">
            {volumeValue === 0 ? (
              <IoMdVolumeOff className="h-5 w-5" />
            ) : (
              <IoMdVolumeHigh className="h-5 w-5" />
            )}
          </Button>
          <Slider 
            value={[volumeValue]}
            max={100} 
            step={1}
            className="w-24"
            onValueChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}