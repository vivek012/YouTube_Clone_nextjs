import { Router } from "express";
import { createReaction, getAllLikedVideos, getUserReaction, totalReaction } from "./controller";

const VideolikeRoute = Router()

VideolikeRoute.post("/like", createReaction)

VideolikeRoute.post("/myReaction", getUserReaction)
VideolikeRoute.get("/totalReaction/:id", totalReaction)

VideolikeRoute.get("/:userId", getAllLikedVideos)


export default VideolikeRoute;