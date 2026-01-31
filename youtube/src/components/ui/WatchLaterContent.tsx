"use client"
import { formatDistanceToNow } from "date-fns";
import { Clock, MoreVertical, Play, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";
import { useUser } from "@/lib/AuthContext";
import { axiosInstance } from "@/lib/axiosInstance";



interface watchLaterItem {
    id: string;
    videoId: string;
    viewer: string;
    watchedon: string;
    video: {
        _id: string;
        videotitle: string;
        videochannel: string;
        views: string;
        createdAt: string;
    }
}

export default function WatchLaterContent() {

    const [watchLater, setWatchLater] = useState<watchLaterItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();


    const loadWatchLater = async () => {
        if (!user) return;
        try {
            const watchLaterdata = await axiosInstance.get(`/api/watchlater/${user?._id}`)
            console.log(watchLaterdata)

            setWatchLater(watchLaterdata.data);


        } catch (error) {
            // console.log('Full error:', error.response?.data);

            console.error("Failed to load watch later:", error);

        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        if (user) {
            loadWatchLater();

        } else {
            setLoading(true)
        }
    }, [user]);


    if (loading) {
        return <div className="">Loading videos....</div>
    }

    const handleRemoveWatchLater = async (watchLaterId: string) => {
        try {
            setWatchLater((prevWatchLater) => prevWatchLater.filter((item) => item.id !== watchLaterId));
        } catch (error) {
            console.error("Failed to remove watch later item:", error);

        }
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Clock style={{ width: 20, height: 20 }} className="text-gray-500" />
                <h2 className="ml-2">Keep Track Of What You Watch Later</h2>
                <p>Watch Later is not available Please sign in.</p>
            </div>
        )
    }


    if (history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Clock style={{ width: 100, height: 100 }} className="text-gray-500" />
                <h2 className="mt-4 text-lg font-medium">Your Watch Later videos are empty</h2>
                <p className="mt-2 text-gray-500">Watch Later videos will show up here.</p>
            </div>
        )
    }



    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-gray-500">{watchLater.length} video</p>
                <Button><Play /> Play All</Button>
            </div>

            <div className="space-y-4">
                {watchLater.map((item) => (
                    <div
                        key={item._id}
                        className="group flex items-center justify-between gap-4">
                        <Link href={`/watch/${item.videoId._id}`} className="w-48 shrink-0">
                            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                                <video src={`${process.env.BACKEND_URL}/${item.videoId?.filepath}`} className="object-cover group-hover:scale-105 transition-transform duration-200" />
                            </div>
                        </Link>
                        <div className=" flex-1 min-w-0">
                            <Link href={`/watch/${item.videoId._id}`}>
                                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 mb-1">{item.videoId.videotitle}</h3>
                            </Link>
                            <p className="text-sm text-gray-600 mb-1">
                                {item.videoId.views.toLocaleString()} views • {" "}
                                {formatDistanceToNow(new Date(item.videoId.createdAt))} ago
                            </p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 ">
                                    <MoreVertical style={{ width: 20, height: 20 }} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleRemoveWatchLater(item.id)}>
                                    <X style={{ width: 20, height: 20 }} className="mr-2" />
                                    Remove from Watch Later
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ))}
            </div>
        </div>
    )
}