import { Router } from "express";
import { getAllWatchLater, handleWatchLater } from "./watchLaterController";



const watchLaterRoutes = Router();

watchLaterRoutes.get("/:userId", getAllWatchLater);
watchLaterRoutes.post("/:videoId", handleWatchLater)

export default watchLaterRoutes;