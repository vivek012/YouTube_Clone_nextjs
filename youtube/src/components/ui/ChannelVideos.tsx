
import { VideoType } from '@/src/app/channel/[id]/page'
import VideoCard from './VideoCard'

interface videoType {
  videos: VideoType[]
}





export default function ChannelVideos({ videos }: videoType) {
    if (videos.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">No videos uploaded yet.</p>
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-xl font-semibold my-4">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {videos.map((video: VideoType) => (   
                    <VideoCard key={video._id} video={video} />
                ))}
            </div>
        </div>
    )
}







// export default function ChannelVideos({ videos }: any) {
//   if (videos.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-600">No videos uploaded yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Videos</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//         {videos.map((video: any) => (
//           <VideoCard key={video._id} video={video} />
//         ))}
//       </div>
//     </div>
//   );
// }