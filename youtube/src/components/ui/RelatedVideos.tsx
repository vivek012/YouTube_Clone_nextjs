import Link from "next/link";
import { videoType } from "./Videogrid";

const vid = "/video/vdo.mp4";
export default function RelatedVideos({
    videos,
}: {
    videos: videoType[];
}) {
    return (
        <div className="space-y-2">
            {videos.map((video) => (
                <Link className="flex gap-2 group" key={video._id} href={`/watch/${video._id}`}>
                    <div className="relative w-40 aspect-video bg-gray-200 rounded-md overflow-hidden  mb-2">
                        <video src={`${process.env.BACKEND_URL}/${video?.filepath}`} className="object-cover group-hover:scale-105 transition-transform duration-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600">{video.videotitle}</h3>
                        <p className=" text-xs text-gray-600 mt-2">{video.videochanel}</p>
                        <p className="text-xs text-gray-600">
                            {video.views?.toLocaleString()} views .{" "}
                          </p>
                    </div>
                </Link>
            ))}
        </div>
    )
}
