export const config = {
  port: Number(process.env.PORT ?? 3000),
  dbUrl: process.env.DB_URL ?? 'mongodb://127.0.0.1:27017/forum',
  jwtSecret: process.env.JWT_SECRET ?? 'softuni-forum-dev-secret',
  authCookieName: 'auth-cookie',
  saltRounds: 10,
};
