import watchlaterModel from "./watchlaterModel";
import { Request, Response } from "express";


export const handleWatchLater = async (req: Request, res: Response) => {

    const { userId } = req.body;
    const { videoId } = req.params;

    try {
        const existingWatchLater = await watchlaterModel.findOne({
            viewer:  userId,
            videoId: videoId,
        });

        if (existingWatchLater) {
            await watchlaterModel.findByIdAndDelete(existingWatchLater._id)
            return res.status(200).json({ watchLater: false });

        } else {
            await watchlaterModel.create({
                viewer:  userId,
                videoId: videoId,
            })
            return res.status(200).json({ WatchLater: true })
        }

    } catch (error) {
        console.error(" error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }

}

export const getAllWatchLater = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({
            message: "user does not exist"
        })
    }


    try {
        const watchLaterVideo = await watchlaterModel
            .find({ viewer: userId })
            .populate({
                path: "videoId",
                model: 'Video',
            })
            .exec();

            console.log(watchLaterVideo)
        return res.status(200).json(watchLaterVideo);
    } catch (error) {
        console.error(" error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}