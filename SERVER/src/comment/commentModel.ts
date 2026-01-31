import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    commentbody: {
      type: String
    },
    userCommented: {
      type: String
    },
    commentedon: {
      type: Date, default: Date.now
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("comment", commentSchema);