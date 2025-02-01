"use client"
import { Play, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useStore } from "@/store/useStore"  // Import useStore

export function Player() {
  // Lấy trạng thái và hành động từ Zustand store
  const { isPlaying, togglePlay } = useStore();

  return (
    <>
      {/* Chỉ render khi isPlaying là true */}
      {isPlaying && (
        <div className="bg-background border-t">
          <div className="container flex items-center h-16 px-4">
            <div className="flex items-center space-x-4">
              <Button size="icon" variant="ghost">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={togglePlay}>
                {isPlaying ? (
                  <Play className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <Button size="icon" variant="ghost">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 mx-4">
              <Slider defaultValue={[33]} max={100} step={1} />
            </div>
            <div className="text-sm font-medium">3:24</div>
          </div>
        </div>
      )}
    </>
  );
}
