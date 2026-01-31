import Video from './videoModel';
import { Request, Response } from "express";

export const uploadVideo = async (req: Request, res: Response) => {
    if (!req.file ) {
        return res.status(404).json({
            message: "Please upload a mp4 video file only"
        })
    } else {
        try {
            const file = new Video({
                videotitle: req.body.videotitle,
                filename: req.file.originalname,
                filepath: req.file.path,
                filetype: req.file.mimetype,
                filesize: req.file.size,
                videochanel: req.body.videochanel,
                uploader: req.body.uploader,
            })
            await file.save();
            return res.status(201).json("file uploaded Successfully")
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                
                message: "Something went Wrong"
            }) 
        }
    }
}

export const getAllVideo = async (req:Request, res: Response)=>{
    try {
        const files = await Video.find();
        return res.status(201).json({
            files
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        })
        
    }

}