import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    likes: [{ type: ObjectId, ref: 'User' }],
    userId: { type: ObjectId, ref: 'User' },
    themeId: { type: ObjectId, ref: 'Theme' },
  },
  { timestamps: { createdAt: 'created_at' } },
);

export const Post = mongoose.model('Post', postSchema);
