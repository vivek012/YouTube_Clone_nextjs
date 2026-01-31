import { Router } from "express";
import { deleteComment, editComment, getAllComment, postComment } from "./commentController";


const commentRoutes = Router();

commentRoutes.get("/:videoId" , getAllComment)
commentRoutes.post("/postcomment", postComment)
commentRoutes.put("/editcomment/:id" , editComment)
commentRoutes.delete("/deleteComment/:id", deleteComment)



export default commentRoutes;