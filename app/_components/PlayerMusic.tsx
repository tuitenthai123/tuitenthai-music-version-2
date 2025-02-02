"use client"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useStore } from "@/store/useStore"

export function Player() {
  const { isPlaying, currentSong, playNextSong, playPreviousSong} = useStore();

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
    <div className="container mx-auto flex items-center justify-between h-20 px-4">
      {/* Song Info */}
      <div className="flex items-center space-x-4 w-1/4">
        <img 
          src={currentSong.thumbnail || "/placeholder.svg"} 
          alt={currentSong.title} 
          className="h-12 w-12 rounded-md object-cover"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium line-clamp-1">{currentSong.title}</span>
          <span className="text-xs text-muted-foreground line-clamp-1">{currentSong?.artists?.map((artist: any) => artist.name).join(", ")}</span>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center w-1/2">
        <div className="flex items-center space-x-4 mb-2">
          <Button size="icon" variant="ghost" onClick={playPreviousSong}>
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost">
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          <Button size="icon" variant="ghost" onClick={playNextSong}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        <div className="w-full flex items-center space-x-2">
          
          <Slider 
            max={parseTimeToSeconds(currentSong.duration)} 
            step={1}
            className="w-full"
          />
          <span className="text-xs w-10">{currentSong.duration}</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2 w-1/4 justify-end">
        <Volume2 className="h-4 w-4" />
        <Slider 
          defaultValue={[100]} 
          max={100} 
          step={1}
          className="w-24"
        />
      </div>
    </div>
  </div>
  );
}

// Removed unused formatTime function

function parseTimeToSeconds(time: string): number {
  const [minutes, seconds] = time.split(':').map(Number);
  return minutes * 60 + seconds;
}