import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { Post } from '../models/post.js';

export const postsRouter = Router();
export const likesRouter = Router();

postsRouter.get('/', async (req, res) => {
  const limit = Number(req.query.limit) || 0;
  const posts = await Post.find()
    .sort({ created_at: -1 })
    .limit(limit)
    .populate('themeId', 'themeName')
    .populate('userId', 'username');
  res.json(posts);
});

likesRouter.put('/:postId', auth, async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.postId, {
    $addToSet: { likes: req.user._id },
  });
  if (!post) {
    return res.status(404).json({ message: 'Post not found!' });
  }
  res.json({ message: 'Liked successful!' });
});
