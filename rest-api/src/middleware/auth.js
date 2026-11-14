import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { TokenBlacklist } from '../models/token-blacklist.js';
import { User } from '../models/user.js';

export function createToken(user) {
  return jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1d' });
}

export function setAuthCookie(res, token) {
  res.cookie(config.authCookieName, token, { httpOnly: true, sameSite: 'lax' });
}

// Rejects the request with 401 unless a valid, non-revoked JWT cookie is present.
export async function auth(req, res, next) {
  const token = req.cookies[config.authCookieName];
  if (!token) {
    return res.status(401).json({ message: 'Invalid token!' });
  }

  try {
    const { id } = jwt.verify(token, config.jwtSecret);
    const [revoked, user] = await Promise.all([
      TokenBlacklist.exists({ token }),
      User.findById(id),
    ]);
    if (revoked || !user) {
      res.clearCookie(config.authCookieName);
      return res.status(401).json({ message: 'Invalid token!' });
    }
    req.user = user;
    req.token = token;
    next();
  } catch {
    res.clearCookie(config.authCookieName);
    res.status(401).json({ message: 'Invalid token!' });
  }
}
