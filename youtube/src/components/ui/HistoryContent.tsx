"use client"
import { formatDistanceToNow } from "date-fns";
import { Clock, MoreVertical, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";
import { axiosInstance } from "@/lib/axiosInstance";
import { useUser } from "@/lib/AuthContext";




interface HistoryItem {
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

export default function HistoryContent() {
    // const user = {
    //     id: "1",
    //     name: "jhon Doe",
    //     email: "john@example.com",
    //     image: "https://github.com/shadcn.png?height=32&width=32",
    // }

    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

    useEffect(() => {
    if (user) {
      loadHistory();
    } else {
      setLoading(true);
    }
  }, [user]);
    
    const loadHistory = async () => {
        if (!user) return;
        try {
            const historydata = await axiosInstance.get(`/api/history/${user?._id}`)
            
            console.log(historydata)
            setHistory(historydata.data);
            
        } catch (error) {
            console.error("Failed to load history:", error);
            
        } finally {
            setLoading(false);
        }
        
    };
    
    if (loading) {
        return <div className="">Loading</div>
    }

    const handleRemoveHistory = async (historyId: string) => {
        try {
            setHistory((prevHistory) => prevHistory.filter((item) => item.id !== historyId));
        } catch (error) {
            console.error("Failed to remove history item:", error);

        }
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Clock style={{ width: 20, height: 20 }} className="text-gray-500" />
                <h2 className="ml-2">Keep Track Of What You Watch</h2>
                <p>Watch history is not available</p>
            </div>
        )
    }


    if (history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Clock style={{ width: 100, height: 100 }} className="text-gray-500" />
                <h2 className="mt-4 text-lg font-medium">Your watch history is empty</h2>
                <p className="mt-2 text-gray-500">Videos you watch will show up here.</p>
            </div>
        )
    }


 
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-gray-500">{history.length} video</p>
            </div>

            <div className="space-y-4">
                {history.map((item) => (
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
                                {item.videoId.views} views • {" "}
                                {/* {formatDistanceToNow(new Date(item.videoId.createdAt))} ago */}
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
                                <DropdownMenuItem onClick={() => handleRemoveHistory(item.id)}>
                                    <X style={{width: 20, height: 20}} className="mr-2"/>
                                    Remove from Watch history
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ))}  
            </div>
        </div>
    )
}