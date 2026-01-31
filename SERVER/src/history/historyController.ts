import Video from "../videoFile/videoModel";
import History from "./historyModel";
import { Request, Response } from "express";



export const handleHistory = async (req: Request, res: Response) => {
    const { userId } = req.body; 
    const { videoId } = req.params;

    try {
        await History.create({
            viewer: userId,
            videoId: videoId
        })
        await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } })
        return res.status(200).json({ history: true });


    } catch (error) {
        console.error(" error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}


export const handleView = async (req: Request, res: Response) => {
    const { videoId } = req.params;
    try {
        await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } });
    } catch (error) {
        console.error(" error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const getAllHistoryVideo = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const historyVideo = await History
            .find({ viewer: userId })
            .populate({
                path: "videoId",
                model: "Video",
            })
            .exec();
        return res.status(200).json(historyVideo);
    } catch (error) {
        console.error(" error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};