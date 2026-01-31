"use client"
import { useRef } from "react";
import { videoType } from "./Videogrid";




export default function VideoPlayer({video}: {video: videoType}) {
   
    const videoRef = useRef<HTMLVideoElement>(null)
  return (
    <div className="aspect-video lg-black rounded-lg overflow-hidden">
      <video ref={videoRef} className="w-full h-full " controls>
        <source src={`${process.env.BACKEND_URL}/${video?.filepath}`} type="video/mp4" />
        Your browser does not support th video tag
      </video>
      
    </div>
  )
}
