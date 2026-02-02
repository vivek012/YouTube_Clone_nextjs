import { Request, Response } from "express"
import VideoReaction from "./model"

export const createReaction = async (req: Request, res: Response) => {
    console.log("hjkl")
    const { userId, videoId, reactionType } = req.body;
    try {

        const reaction = await VideoReaction.findOne({ userId, videoId, })

        if (reaction?.reactionType !== reactionType) {
            const newReaction = await VideoReaction.toggleReaction(userId, videoId, reactionType)

            return res.json({
                success: true,
                reaction: newReaction.reaction?.reactionType

            })
        }
        if (reaction) {
            await VideoReaction.deleteOne({ userId, videoId })
            return res.status(200).json({
                success: true,
                reaction: null,

            })
        }

        const VideoReact = await VideoReaction.create({ userId, videoId, reactionType })
        res.status(201).json({
            success: true,
            reaction: VideoReact.reactionType

        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false
        })
    }

}

export const getUserReaction = async (req: Request, res: Response) => {
    console.log("vivivi");
    
    const { userId, videoId } = req.body
    try {

        const reactionResponse = await VideoReaction.findOne({ userId, videoId })


        res.json({
          reaction: reactionResponse?.reactionType
          

        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false
        })
    }

}

export const totalReaction = async(req: Request, res: Response)=>{
  const {id: videoId } = req.params
    try {
     const totalLikes =   await VideoReaction.find({videoId, reactionType : "like"})
     const totalDislikes = await VideoReaction.find({videoId, reactionType : "dislike"})

     res.status(200).json({
        likes:totalLikes.length,
        dislike: totalDislikes.length
     })

      
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false
        })
    }
}




export const getAllLikedVideos = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const likedVideo = await VideoReaction.find({ userId }).populate({
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