'use client'

import { Eye, CirclePlay } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface VideoMetadata {
  artists?: string
  thumbnail?: string
  title?: string
  duration?: string
  views?: number
}

const VideoCard: React.FC<VideoMetadata> = ({ artists, thumbnail, title, duration, views }) => {
  return (
    <Card className="group overflow-hidden border-none bg-transparent transition-colors hover:bg-accent ">
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden rounded-md">
          <img 
            src={thumbnail || "/placeholder.svg"} 
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 cursor-pointer"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">
            <CirclePlay className="h-12 w-12 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="absolute bottom-2 right-2 rounded bg-black/70 px-1 py-0.5 text-xs text-white font-bold">
            {duration}
          </div>
          {views && (
            <div className="absolute left-2 top-2 flex items-center gap-1 rounded bg-black/70 px-1 py-0.5 text-xs text-white">
              <Eye className="h-3 w-3" />
              <span>{views.toLocaleString()}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-1 p-2">
        <h3 className="line-clamp-1 font-medium leading-tight group-hover:text-blue-600 cursor-pointer">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground">
          {artists}
        </p>
      </CardFooter>
    </Card>
  )
}

export default VideoCard