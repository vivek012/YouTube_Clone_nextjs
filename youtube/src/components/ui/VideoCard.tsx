"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { formatDistanceToNow } from "date-fns";
import { useRef, useState, useEffect } from "react";

export default function VideoCard({ video }: any) {
  const videoDuration = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState<string>("0:00");

  useEffect(() => {
    const videoElement = videoDuration.current;
    
    if (videoElement) {
      const handleLoadedMetadata = () => {
        const durationInSeconds = videoElement.duration;
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        setDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      };

      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      // Cleanup
      return () => {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [video?.filepath]);

  return (
    <Link className="group" href={`/watch/${video._id}`}>
      <div className="space-y-3">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
          <video 
            ref={videoDuration} 
            className="object-cover group-hover:scale-105 transition-transform" 
            src={`${process.env.BACKEND_URL}/${video?.filepath}`}
            preload="metadata"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
            {duration}
          </div>
        </div>
        <div className="flex gap-3">
          <Avatar className="w-9 h-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" />
            <AvatarFallback>{video.videochanel[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600">
              {video.videotitle}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{video.videochanel}</p>
            <p className="text-sm">
              {video.views.toLocaleString()} views • {formatDistanceToNow(new Date(video.createdAt))} ago
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}