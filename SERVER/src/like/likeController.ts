import Video from "../videoFile/videoModel";
import Like from "./likeModel";
import { Request, Response } from "express";


// const dislike = async (userId: string, videoId: string) => {
//     try {
//         const dislike = await Like.findOneAndDelete({ viewer: userId, videoId })
//         await Video.findByIdAndUpdate(
//             videoId,
//             { $inc: { Like: -1 } },

//         );

//         console.log(dislike)

//     } catch (error) {
//         console.log(error)

//     }


// }

export const handleLike = async (req: Request, res: Response) => {
    console.log("PARAMS:", req.params);
    console.log("BODY:", req.body);


    const { userId } = req.body;
    const { videoId } = req.params

    console.log([videoId, userId]);
    try {
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User Id is Required"
            })
        }
        if (!videoId) {
            return res.status(400).json({
                success: false,
                message: "Video Id is Required"
            })
        }

        const existingLike = await Like.findOne({
            viewer: userId,
            videoId,
        })
        console.log(existingLike)

        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }
        console.log("hi1")

        if (existingLike) {
            // await dislike(userId, Array.isArray(videoId) ? videoId[0] : videoId);
            
            const deletelike = await Like.deleteOne({ viewer: userId, videoId });
            console.log(deletelike);

            if(deletelike.deletedCount === 0){
                return res.status(500).json({
                    success: false,
                    message: "Failed to unlike the video"
                });
            }
            await Video.findByIdAndUpdate(
                videoId,
                { $inc: { Like: -1 } },

            );
            console.log("hi2")

            return res.status(200).json({
                success: true,
                message: "Video Unliked Successfully",
                liked: false
            })

        } else {
            console.log("hi3")

            await Like.create({ viewer: userId, videoId });

            await Video.findByIdAndUpdate(
                videoId,
                { $inc: { Like: 1 } });
            console.log("hi4")

            return res.status(200).json({ 
                success: true,
                message: "Video liked Successfully",
                liked: true 
            });
        }

    } catch (error) {
        console.error(" error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }

}

export const getAllLikedVideos = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const likedVideo = await Like.find({ viewer: userId }).populate({
            path: "videoId",
            model: 'Video',
        })
            .exec();

        return res.status(200).json(likedVideo);



    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong "
        })
    }

}