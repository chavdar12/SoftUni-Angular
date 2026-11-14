# Forum REST API

Express 5 + Mongoose backend for the SoftUni Angular forum workshop. It implements the endpoints from the
workshop's _REST-api Endpoints Specification_ and keeps the JWT in an `httpOnly` cookie (`auth-cookie`).

## Run

```bash
npm install
docker compose up -d   # or use your own MongoDB and set DB_URL
npm start              # http://localhost:3000/api
```

On the first start an empty database is seeded from [`seed/forum`](seed/forum) (the provided `mongorestore`
dump: 7 users, 5 themes, 8 posts). Environment variables (see `.env.example`): `PORT`, `DB_URL`, `JWT_SECRET`.
To start over with fresh data: `docker compose down -v`.

## Endpoints

Base URL: `http://localhost:3000/api`

| Method | Endpoint                         | Body                                                  | Auth |
| ------ | -------------------------------- | ----------------------------------------------------- | ---- |
| POST   | `/register`                      | `username`, `email`, `password`, `rePassword`, `tel?` | No   |
| POST   | `/login`                         | `email` (or `username`), `password`                   | No   |
| POST   | `/logout`                        |                                                       | Yes  |
| GET    | `/users/profile`                 |                                                       | Yes  |
| PUT    | `/users/profile`                 | `username`, `email`, `tel?`                           | Yes  |
| GET    | `/themes`                        |                                                       | No   |
| POST   | `/themes`                        | `themeName`, `postText`                               | Yes  |
| GET    | `/themes/:themeId`               |                                                       | No   |
| POST   | `/themes/:themeId`               | `postText`                                            | Yes  |
| PUT    | `/themes/:themeId`               | subscribe                                             | Yes  |
| DELETE | `/themes/:themeId/subscribers`   | unsubscribe (extra, not in the original spec)         | Yes  |
| PUT    | `/themes/:themeId/posts/:postId` | `postText` - author only                              | Yes  |
| DELETE | `/themes/:themeId/posts/:postId` | author only                                           | Yes  |
| GET    | `/posts?limit=5`                 | latest posts first                                    | No   |
| PUT    | `/likes/:postId`                 |                                                       | Yes  |

Errors are returned as `{ "message": "..." }`.
