import { Router } from "express";
import { createReaction, getUserReaction, totalReaction } from "./controller";

const VideolikeRoute = Router()

VideolikeRoute.post("/like", createReaction)

VideolikeRoute.post("/myReaction", getUserReaction)
VideolikeRoute.get("/totalReaction/:id", totalReaction)


export default VideolikeRoute;