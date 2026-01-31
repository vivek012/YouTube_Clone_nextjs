import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    viewer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    videoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true,
    },

    likedon: {
        type: Date, 
        default: Date.now
    }

})

const History = mongoose.model("history", historySchema)

export default History;