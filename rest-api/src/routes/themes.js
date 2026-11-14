import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { Post } from '../models/post.js';
import { Theme } from '../models/theme.js';
import { User } from '../models/user.js';

export const themesRouter = Router();

const USER_FIELDS = 'username email';

async function createPost(text, userId, themeId) {
  const post = await Post.create({ text, userId, themeId });
  await Promise.all([
    User.updateOne({ _id: userId }, { $push: { posts: post._id }, $addToSet: { themes: themeId } }),
    Theme.updateOne({ _id: themeId }, { $push: { posts: post._id } }),
  ]);
  return post;
}

themesRouter.get('/', async (_req, res) => {
  const themes = await Theme.find().populate('userId', USER_FIELDS);
  res.json(themes);
});

themesRouter.post('/', auth, async (req, res) => {
  const { themeName, postText } = req.body;
  const theme = await Theme.create({
    themeName,
    userId: req.user._id,
    subscribers: [req.user._id],
  });
  await createPost(postText, req.user._id, theme._id);
  res.json(await Theme.findById(theme._id));
});

themesRouter.get('/:themeId', async (req, res) => {
  const theme = await Theme.findById(req.params.themeId)
    .populate('userId', USER_FIELDS)
    .populate({ path: 'posts', populate: { path: 'userId', select: USER_FIELDS } });
  if (!theme) {
    return res.status(404).json({ message: 'Theme not found!' });
  }
  res.json(theme);
});

themesRouter.post('/:themeId', auth, async (req, res) => {
  const { themeId } = req.params;
  if (!(await Theme.exists({ _id: themeId }))) {
    return res.status(404).json({ message: 'Theme not found!' });
  }
  await createPost(req.body.postText, req.user._id, themeId);
  res.json(await Theme.findById(themeId));
});

// Subscribe
themesRouter.put('/:themeId', auth, async (req, res) => {
  const theme = await Theme.findByIdAndUpdate(
    req.params.themeId,
    { $addToSet: { subscribers: req.user._id } },
    { returnDocument: 'after' },
  );
  if (!theme) {
    return res.status(404).json({ message: 'Theme not found!' });
  }
  res.json(theme);
});

// Unsubscribe (extra - not in the original spec)
themesRouter.delete('/:themeId/subscribers', auth, async (req, res) => {
  const theme = await Theme.findByIdAndUpdate(
    req.params.themeId,
    { $pull: { subscribers: req.user._id } },
    { returnDocument: 'after' },
  );
  if (!theme) {
    return res.status(404).json({ message: 'Theme not found!' });
  }
  res.json(theme);
});

themesRouter.put('/:themeId/posts/:postId', auth, async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.postId, userId: req.user._id },
    { text: req.body.postText },
    { returnDocument: 'after' },
  );
  if (!post) {
    return res.status(401).json({ message: 'Not allowed!' });
  }
  res.json(post);
});

themesRouter.delete('/:themeId/posts/:postId', auth, async (req, res) => {
  const { themeId, postId } = req.params;
  const post = await Post.findOneAndDelete({ _id: postId, userId: req.user._id });
  if (!post) {
    return res.status(401).json({ message: 'Not allowed!' });
  }
  await Promise.all([
    User.updateOne({ _id: req.user._id }, { $pull: { posts: postId } }),
    Theme.updateOne({ _id: themeId }, { $pull: { posts: postId } }),
  ]);
  res.json(post);
});
