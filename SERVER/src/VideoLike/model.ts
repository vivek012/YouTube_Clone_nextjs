import mongoose, { Schema, Document, Model } from 'mongoose';

// Enum for reaction types
export enum ReactionType {
  LIKE = 'like',
  DISLIKE = 'dislike'
}

// Interface for the VideoReaction document
export interface IVideoReaction extends Document {
  userId: mongoose.Types.ObjectId;
  videoId: mongoose.Types.ObjectId;
  reactionType: ReactionType;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for static methods
interface IVideoReactionModel extends Model<IVideoReaction> {
  toggleReaction(
    userId: string | mongoose.Types.ObjectId,
    videoId: string | mongoose.Types.ObjectId,
    reactionType: ReactionType
  ): Promise<{ reaction: IVideoReaction | null; action: 'created' | 'updated' | 'removed' }>;
  
  getVideoStats(
    videoId: string | mongoose.Types.ObjectId
  ): Promise<{ likes: number; dislikes: number; total: number }>;
  
  getUserReaction(
    userId: string | mongoose.Types.ObjectId,
    videoId: string | mongoose.Types.ObjectId
  ): Promise<IVideoReaction | null>;
}

// Schema definition
const VideoReactionSchema = new Schema<IVideoReaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    //   index: true
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: 'Video',
      required: [true, 'Video ID is required'],
    //   index: true
    },
    reactionType: {
      type: String,
      enum: Object.values(ReactionType),
      required: [true, 'Reaction type is required']
    }
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt
    versionKey: false
  }
);

// Compound index to ensure one user can only have one reaction per video
VideoReactionSchema.index({ userId: 1, videoId: 1 }, { unique: true });

// Compound index for efficient querying of video stats
VideoReactionSchema.index({ videoId: 1, reactionType: 1 });

// Static method: Toggle reaction (like/dislike)
VideoReactionSchema.statics.toggleReaction = async function(
  userId: string | mongoose.Types.ObjectId,
  videoId: string | mongoose.Types.ObjectId,
  reactionType: ReactionType
): Promise<{ reaction: IVideoReaction | null; action: 'created' | 'updated' | 'removed' }> {
  try {
    // Find existing reaction
    const existingReaction = await this.findOne({ userId, videoId });

    if (existingReaction) {
      if (existingReaction.reactionType === reactionType) {
        // Same reaction - remove it (toggle off)
        await existingReaction.deleteOne();
        return { reaction: null, action: 'removed' };
      } else {
        // Different reaction - update it
        existingReaction.reactionType = reactionType;
        await existingReaction.save();
        return { reaction: existingReaction, action: 'updated' };
      }
    } else {
      // No reaction exists - create new one
      const newReaction = await this.create({
        userId,
        videoId,
        reactionType
      });
      return { reaction: newReaction, action: 'created' };
    }
  } catch (error) {
    throw new Error(`Error toggling reaction: ${error}`);
  }
};

// Static method: Get video statistics
VideoReactionSchema.statics.getVideoStats = async function(
  videoId: string | mongoose.Types.ObjectId
): Promise<{ likes: number; dislikes: number; total: number }> {
  try {
    const stats = await this.aggregate([
      { $match: { videoId: new mongoose.Types.ObjectId(videoId.toString()) } },
      {
        $group: {
          _id: '$reactionType',
          count: { $sum: 1 }
        }
      }
    ]);

    const likes = stats.find(s => s._id === ReactionType.LIKE)?.count || 0;
    const dislikes = stats.find(s => s._id === ReactionType.DISLIKE)?.count || 0;

    return {
      likes,
      dislikes,
      total: likes + dislikes
    };
  } catch (error) {
    throw new Error(`Error getting video stats: ${error}`);
  }
};

// Static method: Get user's reaction for a specific video
VideoReactionSchema.statics.getUserReaction = async function(
  userId: string | mongoose.Types.ObjectId,
  videoId: string | mongoose.Types.ObjectId
): Promise<IVideoReaction | null> {
  try {
    return await this.findOne({ userId, videoId });
  } catch (error) {
    throw new Error(`Error getting user reaction: ${error}`);
  }
};

// Instance method example (if needed)
VideoReactionSchema.methods.isLike = function(): boolean {
  return this.reactionType === ReactionType.LIKE;
};

VideoReactionSchema.methods.isDislike = function(): boolean {
  return this.reactionType === ReactionType.DISLIKE;
};

// Create and export the model
const VideoReaction = mongoose.model<IVideoReaction, IVideoReactionModel>(
  'VideoReaction',
  VideoReactionSchema
);

export default VideoReaction;