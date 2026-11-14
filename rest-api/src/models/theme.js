import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const themeSchema = new mongoose.Schema(
  {
    themeName: { type: String, required: true },
    subscribers: [{ type: ObjectId, ref: 'User' }],
    userId: { type: ObjectId, ref: 'User' },
    posts: [{ type: ObjectId, ref: 'Post' }],
  },
  { timestamps: { createdAt: 'created_at' } },
);

export const Theme = mongoose.model('Theme', themeSchema);
