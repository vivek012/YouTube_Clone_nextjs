import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    videotitle: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    filetype: {
        type: String,
        required: true
    },
    filepath: {
        type: String,
        required: true
    },
    filesize: {
        type: String,
        required: true
    },
    videochanel: {
        type: String,
        required: true
    },
    Like: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Video = mongoose.model("Video", videoSchema);

export default Video;
