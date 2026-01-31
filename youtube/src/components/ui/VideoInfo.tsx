"use client";
import { useEffect, useState } from "react";
import { videoType } from "./Videogrid";
import { Avatar, AvatarFallback, } from "./avatar";
import { Button } from "./button";
import { Clock, Download, MoreHorizontal, Share, ThumbsDown, ThumbsUp, } from "lucide-react";

import { useUser } from "@/lib/AuthContext";
import { axiosInstance } from "@/lib/axiosInstance";





export default function VideoInfo({ video }: { video: videoType }) {

    const [likes, setLikes] = useState(video.Like || 0);
    const [dislikes, setDislikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isWatchLater, setisWatchLater] = useState(false)
    const { user } = useUser()

    useEffect(() => {
        const fetchlikes =async()=>{
            try {
                const res = await axiosInstance.get(`/api/reaction/totalReaction/${video._id}`)
              
                setLikes(res.data.likes)
                setDislikes(res.data.dislike)
                
            } catch (error) {
                console.log(error);
                
            }
            
        }
        const fetchReaction = async () => {

            try {
                const res = await axiosInstance.post(
                    "/api/reaction/myReaction",
                    {

                       userId: user?._id,
                        videoId: video._id,
                    }
                );

                if(res.data.reaction === "like"){
                    setIsLiked(true)


                }else if (res.data.reaction === "dislike"){
                    setIsDisliked(true)

            }
            } catch (error) {
                console.error(error);
            }
        };

        if (user?._id && video?._id) {
            fetchReaction();
            fetchlikes();
        }
    }, [user?._id, video?._id]);


    useEffect(() => {
        setLikes(video.Like || 0);
        setDislikes(video.Dislike || 0);
    }, [video]);

    useEffect(() => {
        if (!video?._id) return;

        const handleView = async () => {
            try {
                if (user?._id) {
                    await axiosInstance.post(`/api/history/${video._id}`, {
                        userId: user._id,
                    });
                } else {
                    await axiosInstance.post(`/api/history/view${video._id}`);
                }
            } catch (error) {
                console.log(error);
            }
        };

        handleView();

        // Only run when video changes, not when user changes
    }, [video?._id]);




    const handleLike = async () => {
        if (!user) return;

        try {
            const res = await axiosInstance.post("/api/reaction/like", { userId: user._id, videoId: video._id, reactionType: "like" })
            console.log(res);
            if (res.data.reaction === "like") {
                setLikes(() => likes + 1)
                setIsLiked(true)
                if (isDisliked) {
                    setIsDisliked(false)
                    setDislikes(() => dislikes - 1)
                }

            } else {
                setLikes(() => likes - 1)
                setIsLiked(false)
            }

        } catch (error) {
            console.log(error)

        }
    }
    const handleDislike = async () => {
        if (!user) return;

        try {
            const res = await axiosInstance.post("/api/reaction/like", { userId: user._id, videoId: video._id, reactionType: "dislike" })
            console.log(res);
            if (res.data.reaction === "dislike") {
                setDislikes(() => dislikes + 1)
                setIsDisliked(true)

                if (isLiked) {
                    setIsLiked(false)
                    setLikes(() => likes - 1)
                }
            } else {
                setDislikes(() => dislikes - 1)
                setIsDisliked(false)
            }



        } catch (error) {
            console.log(error)

        }
    }



    // const handleLike = async () => {
    //     console.log("hiii")
    //     if (!user) return;

    //     try {
    //         const res = await axiosInstance.post(`/api/like/${video._id}`, { userId: user?._id })
    //         console.log(res.data)

    //         if (res.data.liked) {
    //             setLikes(prev => (prev + 1));


    //             if (isDisliked) {
    //                 setDislikes(prev => prev - 1);
    //                 setIsDisliked(false);
    //             }
    //             setIsLiked(prev => !prev);
    //         }
    //         else {
    //             setLikes(prev => (prev - 1));
    //             setIsLiked(false);
    //         }
    //     } catch (error) {
    //         return console.error(error)
    //     }
    // };


    // const handleDislike = async () => {
    //     if (!user) return;

    //     try {
    //         const res = await axiosInstance.post(`/api/like/${video._id}`, { userId: user?._id })
    //         console.log(res.data)
    //         if (!res.data.liked) {
    //             setDislikes(prev => (prev + 1));
    //             setLikes(prev => prev - 1);
    //             if (isLiked) {
    //                 setIsLiked(false);
    //             }
    //             setIsDisliked(prev => !prev);
    //         }
    //         else {
    //             setDislikes(prev => (prev <= 0 ? 0 : prev - 1));
    //             setLikes(prev => prev + 1);
    //             setIsDisliked(false);
    //         }

    //     } catch (error) {
    //         return console.error(error)
    //     }


    // }

    const handleWatchLater = async () => {
        try {
            const res = await axiosInstance.post(`/api/watchlater/${video._id}`, { userId: user?._id })

            if (res.data.watchlater) {
                setisWatchLater(!isWatchLater)
            } else {
                setisWatchLater(false);
            }
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <div className=" p-4 border-b border-gray-200 space-y-4 ">
            <h1 className="text-xl font-semibold">{video.videotitle}</h1>
            <div className=" flex flex-col items-center justify-center md:flex-row md:items-center md:justify-between mt-2 ">
                <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10">
                        <AvatarFallback>{video.videochanel[0]}</AvatarFallback>
                    </Avatar>
                    <div className=" flex flex-col">
                        <h3 className="font-medium">{video.videochanel}</h3>
                        <p className="text-sm text-gray-600">8.2M subscribers</p>
                    </div>
                    <Button className="ml-4">Subscribe</Button>
                </div>
                <div className=" flex items-center gap-2 mt-4 md:mt-0">
                    <div className=" flex items-center bg-gray-100 rounded-full" >
                        <Button className="bg-gray-100 rounded-full" variant="ghost" onClick={handleLike}>
                            <ThumbsUp className={`${isLiked ? "fill-black text-black" : ""}`} style={{ width: 24, height: 24 }} />
                            {likes.toLocaleString()}
                        </Button>
                    </div>
                    <div className="">
                        <Button className="bg-gray-100 rounded-full" variant="ghost" onClick={handleDislike}>
                            <ThumbsDown style={{ width: 24, height: 24 }} className={`${isDisliked ? "fill-black text-black" : ""}`} />
                            {dislikes.toLocaleString()}
                        </Button>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`bg-gray-100 rounded-full ${isWatchLater ? "text-primary" : ""
                            }`}
                        onClick={handleWatchLater}
                    >
                        <Clock className="w-5 h-5 mr-2" />
                        {isWatchLater ? "Saved" : "Watch Later"}
                    </Button>
                    <Button variant="ghost" size="sm" className="bg-gray-100 rounded-full">
                        <Share style={{ width: 24, height: 24 }} className="" />
                        Share
                    </Button>
                    <Button variant="ghost" className="bg-gray-100 rounded-full">
                        <Download style={{ width: 24, height: 24 }} className="" />
                        Download
                    </Button>
                    <Button variant="ghost" className="bg-gray-100 rounded-full">
                        <MoreHorizontal style={{ width: 24, height: 24 }} className="" />
                    </Button>
                </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex gap-4 text-sm font-medium mb-2">
                    <span className="">{video.views?.toLocaleString()}  views</span>
                    {/* <span className="">{formatDistanceToNow(new Date(video.createdAt))} ago</span> */}
                </div>
                <div className={`text-sm ${showFullDescription ? "" : "line-clamp-2"} `}>
                    <p>Sample discription for video that is being displayed here and is a sample description for the video content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, corporis? Quisquam dicta natus numquam ut itaque provident dolor odio quaerat iusto expedita reprehenderit perferendis, nihil nulla quidem consectetur possimus libero? Hic eaque, porro voluptate deleniti vero sequi quaerat unde provident quia atque dolor totam accusantium odit distinctio animi repellendus, quisquam blanditiis delectus laboriosam officiis accusamus? Odit quo eius corrupti commodi quisquam. Libero cumque voluptas natus id et unde? Facere, animi! Illum recusandae aliquid iste accusantium soluta ullam distinctio, optio magni, sed ratione porro eveniet ipsam suscipit accusamus modi velit doloremque reprehenderit voluptatum alias deleniti laborum? Vel deserunt soluta hic tempora.</p>

                </div>
                <Button variant="link" className="p-0 mt-2 h-auto font-medium" onClick={() => setShowFullDescription(prev => !prev)}>
                    {showFullDescription ? "Show less" : "Show more"}
                </Button>
            </div>
        </div>
    )
}