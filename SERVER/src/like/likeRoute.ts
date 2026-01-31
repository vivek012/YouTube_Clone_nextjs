import { Router } from "express";
import { handleLike, getAllLikedVideos } from "./likeController";


const likeRouter = Router();

likeRouter.post("/:videoId", handleLike)
likeRouter.get("/:userId", getAllLikedVideos)

export default likeRouter;