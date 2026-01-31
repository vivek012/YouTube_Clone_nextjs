"use client";

import { axiosInstance } from "@/lib/axiosInstance";
import Comments from "@/src/components/ui/Comments";
import RelatedVideos from "@/src/components/ui/RelatedVideos";
import { videoType } from "@/src/components/ui/Videogrid";
import VideoInfo from "@/src/components/ui/VideoInfo";
import VideoPlayer from "@/src/components/ui/VideoPlayer";
import { useEffect, useState , use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ watchId: string }>;
}) {

  const { watchId } =use(params);

  const [videos, setVideos] = useState<videoType[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<videoType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get("/api/video/getAllVideo");
        console.log(res)

        const allVideos: videoType[] = res.data.files;

        setVideos(allVideos);

        const found = allVideos.find((v) => v._id === watchId) || null;
        setSelectedVideo(found);

        console.log("ALL VIDEOS FROM API:", res.data.files);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [watchId]);

  if (loading) {
    return <div>videos loading....</div>;
  }

  if (!selectedVideo) {
    return <div>Video Not Found</div>;
  }
  const relatedVideos = videos.filter(
  (v) => v._id !== selectedVideo._id
);


  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <VideoPlayer video={selectedVideo} />
            <VideoInfo video={selectedVideo} />
            <Comments videoId={selectedVideo._id} />
          </div>

          <div className="space-y-2">
            <RelatedVideos videos={relatedVideos} />
          </div>
        </div>
      </div>
    </div>
  );
}
