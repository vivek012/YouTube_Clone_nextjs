"use client"
import { formatDistanceToNow } from "date-fns";
import {  MoreVertical, Play, ThumbsUp, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";
import { axiosInstance } from "@/lib/axiosInstance";
import { useUser } from "@/lib/AuthContext";



interface LikedItem {
    id: string;
    videoId: string;
    viewer: string;
    watchedon: string;
    video: {
        id: string;
        videotitle: string;
        videochannel: string;
        views: string;
        createdAt: string;
    }
}

export default function LikedContent() {
    // const user = {
    //     id: "1",
    //     name: "jhon Doe",
    //     email: "john@example.com",
    //     image: "https://github.com/shadcn.png?height=32&width=32",
    // }

    const [liked, setLiked] = useState<LikedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

   useEffect(() => {
    if (user) {
      loadLiked();
    }
  }, [user]);

    const loadLiked = async () => {
        if (!user) return;
          try {
      const likedData = await axiosInstance.get(`api/like/${user?._id}`);

      setLiked(likedData.data);
    } catch (error) {
      console.error("Error loading liked videos:", error);
    } finally {
      setLoading(false);
    }

    };


    const handleRemoveLiked = async ( likedId: string) => {
        try {
            setLiked((prevLiked) => prevLiked.filter((item) => item.id !== likedId));
        } catch (error) {
            console.error("Failed to remove liked item:", error);

        }
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <ThumbsUp style={{ width: 20, height: 20 }} className="text-gray-500" />
                <h2 className="ml-2">Keep Track Of What You Liked</h2>
                <p>Liked Videos is not available Please sign in.</p>
            </div>
        )
    }

    if (loading) {
        return <div className="">Loading videos....</div>
    }

    if (liked.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <ThumbsUp style={{ width: 100, height: 100 }} className="text-gray-500" />
                <h2 className="mt-4 text-lg font-medium">Your liked videos are empty</h2>
                <p className="mt-2 text-gray-500">Videos you like will show up here.</p>
            </div>
        )
    }


    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-gray-500">{liked.length} video</p>
                <Button><Play/> Play All</Button>
            </div>

            <div className="space-y-4">
                {liked.map((item) => (
                    <div
                    key={item._id} 
                    className="group flex items-center justify-between gap-4">
                        <Link href={`/watch/${item.videoId._id}`} className="w-48 shrink-0">
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                            <video src={`${process.env.BACKEND_URL}/${item.videoId?.filepath}`} controls 
                            
                            className="object-cover group-hover:scale-105 transition-transform duration-200" />
                        </div>
                        </Link>
                        <div className=" flex-1 min-w-0">
                            <Link href={`/watch/${item.videoId._id}`}>
                            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 mb-1">{item.videoId.videotitle}</h3>
                            </Link>
                            <p className="text-sm text-gray-600 mb-1">
                                {item.videoId.views} views • {" "}
                                {formatDistanceToNow(new Date(item.videoId.createdAt))} ago
                            </p>
                         
                        </div>
                        <DropdownMenu>  
                            <DropdownMenuTrigger asChild>
                                <Button 
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 focus:opacity-100 ">
                                    <MoreVertical style={{width: 20, height: 20}}/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleRemoveLiked(item.id)}>
                                    <X style={{width: 20, height: 20}} className="mr-2"/>
                                    Remove from Liked videos
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ))}  
            </div>
        </div>
    )
}