import cookieParser from 'cookie-parser';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import mongoose from 'mongoose';
import { config } from './config.js';
import { authRouter } from './routes/auth.js';
import { likesRouter, postsRouter } from './routes/posts.js';
import { themesRouter } from './routes/themes.js';
import { usersRouter } from './routes/users.js';
import { seedIfEmpty } from './seed.js';

// Treat user-supplied filter values as literals, so {"email": {"$ne": null}} cannot become a query operator.
mongoose.set('sanitizeFilter', true);

const app = express();
app.use(rateLimit({ windowMs: 60_000, limit: 300 }));
app.use(express.json());
app.use(cookieParser());

const api = express.Router();
api.get('/test', (_req, res) => res.json({ name: 'softuni-forum-rest-api', status: 'ok' }));
api.use(authRouter);
api.use('/users', usersRouter);
api.use('/themes', themesRouter);
api.use('/posts', postsRouter);
api.use('/likes', likesRouter);
app.use('/api', api);

app.use((_req, res) => res.status(404).json({ message: 'Not found!' }));

app.use((err, _req, res, _next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors)[0].message;
    return res.status(400).json({ message });
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(404).json({ message: 'Not found!' });
  }
  console.error(err);
  res.status(500).json({ message: 'Something went wrong!' });
});

await mongoose.connect(config.dbUrl);
await mongoose.syncIndexes();
await seedIfEmpty();

app.listen(config.port, () => {
  console.log(`REST API is listening on http://localhost:${config.port}/api`);
});
