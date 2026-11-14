import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { User } from '../models/user.js';

export const usersRouter = Router();

usersRouter.get('/profile', auth, (req, res) => {
  res.json(req.user);
});

usersRouter.put('/profile', auth, async (req, res) => {
  const { username, email, tel } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { username, email, tel },
      { runValidators: true, returnDocument: 'after' },
    );
    res.json(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'This email/username is already registered!' });
    }
    throw err;
  }
});
