import commentModel from "./commentModel";
import { Request, Response } from "express";
import mongoose from "mongoose";





export const postComment = async (req: Request, res: Response) => {
    const commentData = req.body;
    const postComment = new commentModel(commentData)
    try {
        await postComment.save();
        return res.status(200).json({ comment: true })
    } catch (error) {
        console.error(" error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const getAllComment = async (req: Request, res: Response)=>{

    const {videoId} = req.params

    try {
        
        const commentVideo = await commentModel.find({
            videoId
        })
        return res.status(200).json(commentVideo);
    } catch (error) {
         console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
    }
}

export const deleteComment=async(req: Request, res: Response)=>{
      const { id: _id } = req.params;
      console.log(_id);
      
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({message:"comment unavailable"});
  }

  
  try {
    await commentModel.findByIdAndDelete(_id)
      return res.status(200).json({ comment: true });
      
    
  } catch (error) {
     console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }

}



export const editComment = async (req: Request, res: Response) => {
  const { id: _id } = req.params;
  const { commentbody } = req.body;



  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ message: "Comment not found" });
  }

 
  if (!commentbody || !commentbody.trim()) {
    return res.status(400).json({ message: "Comment body is required" });
  }

  try {
    const updatedComment = await commentModel.findByIdAndUpdate(
      _id,
      { $set: { commentbody } },
      { new: true } 
    );

   
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    return res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Update comment error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// export const editComment = async (req: Request, res: Response)=>{
//       const { id : _id } = req.params;
//       const{ commentbody } = req.body;
//   if (!mongoose.Types.ObjectId.isValid(_id)) {
//     return res.status(404).send("comment unavailable");
//   }

//   try {
//     const updateComment = await commentModel.findByIdAndUpdate(_id, {
//         $set:{commentbody}
//     })
//     res.status(200).json(updateComment);
        
//   } catch (error) {
//       console.error(" error:", error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }


// }