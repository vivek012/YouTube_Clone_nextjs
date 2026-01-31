"use client"
import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { axiosInstance } from "@/lib/axiosInstance";


// export type videoType= typeof videos[0] 
 
export interface videoType  {
  _id: string,
  videotitle: string
  filename: string,
  filetype: string,
  filepath: string,
  filesize: string,
  videochanel: string,
  Like?: number,
  Dislike?: number,
  views? : number,

}



// const videos = [
//   {
//     _id: "1",
//     videotitle: "Amazing Nature Documentary",
//     filename: "nature-doc.mp4",
//     filetype: "video/mp4",
//     filepath: "/videos/nature-doc.mp4",
//     filesize: "500MB",
//     videochanel: "Nature Channel",
//     Like: 1250,
//     views: 45000,
//     uploader: "nature_lover",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     _id: "2",
//     videotitle: "Cooking Tutorial: Perfect Pasta",
//     filename: "pasta-tutorial.mp4",
//     filetype: "video/mp4",
//     filepath: "/videos/pasta-tutorial.mp4",
//     filesize: "300MB",
//     videochanel: "Chef's Kitchen",
//     Like: 890, 
//     views: 23000,
//     uploader: "chef_master",
//     createdAt: new Date().toISOString(),
//   },
// ];
  
export default function Videogrid() {
const [Videos, setVideos] = useState<videoType[]>([])
const [Loading, setLoading] = useState(true)

useEffect(() => {
  const fetchVideo = async ()=>{
  try {

    const res = await axiosInstance.get("/api/video/getAllVideo")
    setVideos(res.data.files)
    
  } catch (error) {
    console.error(error)
  }finally{
    setLoading(false)
  }
};
fetchVideo();

  
}, [])



  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {Loading? (
        <>videos Loading...</>
      ):(
        Videos.map((video:videoType)=>(
          <VideoCard  key={video._id} video={video as videoType } />
        ))

      )}
    </div>
  )
}
