import { Router } from "express";
import { getAllHistoryVideo, handleHistory, handleView} from "./historyController";


const historyRoutes = Router();

historyRoutes.get("/:userId", getAllHistoryVideo)
historyRoutes.post("/:view/:videoId", handleView);
historyRoutes.post("/:videoId", handleHistory);

export default historyRoutes;