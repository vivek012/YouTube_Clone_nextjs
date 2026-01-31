import { Router } from "express";
import {uploadVideo, getAllVideo} from "./videoController"
import upload from "../config/multer";


 const fileRouter = Router()

fileRouter.post("/upload", upload.single("file"), uploadVideo)
fileRouter.get("/getAllVideo", getAllVideo)


export default fileRouter;


