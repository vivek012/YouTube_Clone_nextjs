import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    viewer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    videoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
    },

    likedon: {
        type: Date, 
        default: Date.now
        
    }

})

const Like = mongoose.model("LikedVideos", likeSchema)

export default Like;