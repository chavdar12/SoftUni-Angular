import { Router } from 'express';
import { config } from '../config.js';
import { auth, createToken, setAuthCookie } from '../middleware/auth.js';
import { TokenBlacklist } from '../models/token-blacklist.js';
import { User } from '../models/user.js';

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const { username, email, password, rePassword, tel } = req.body;
  if (password !== rePassword) {
    return res.status(400).json({ message: 'Passwords do not match!' });
  }

  try {
    const user = await User.create({ username, email, password, tel });
    setAuthCookie(res, createToken(user));
    res.status(200).json(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'This email/username is already registered!' });
    }
    throw err;
  }
});

authRouter.post('/login', async (req, res) => {
  const { email, username, password } = req.body;
  const user = await User.findOne(email ? { email: String(email) } : { username: String(username) });
  if (!user || !(await user.matchPassword(password ?? ''))) {
    return res.status(401).json({ message: 'Wrong email or password' });
  }

  setAuthCookie(res, createToken(user));
  res.status(200).json(user);
});

authRouter.post('/logout', auth, async (req, res) => {
  await TokenBlacklist.create({ token: req.token });
  res.clearCookie(config.authCookieName).status(204).send();
});
