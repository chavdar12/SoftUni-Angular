# SoftUni Angular

Solutions to the [SoftUni](https://softuni.bg) **Angular** course, rewritten for **Angular 22**: standalone
components, signals, `@if` / `@for` control flow, functional guards, resolvers and interceptors, `httpResource`
and lazy loaded routes.

All apps live in **one Angular workspace** (one `package.json`, one `node_modules`), one project per lesson.

## Lessons

| #   | Lesson                                   | Project                                                                                        | Angular project name     |
| --- | ---------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------ |
| 001 | Intro to Angular and TypeScript          | [TypeScript Playground](001-Intro-To-Angular-And-Typescript) (6 exercises)                     | -                        |
| 002 | Components                               | [Articles App](002-Components/Articles-App) - components lab                                   | `articles-app`           |
| 003 | DI, Intro to RxJS, Services              | [Posts App](003-Di-Intro-To-Rxjs-Services/Posts-App)                                           | `posts-app`              |
| 004 | Workshop - Components                    | [Forum, Part 1](004-Workshop-Components/Forum)                                                 | `forum-part-1`           |
| 005 | Modules and Routing                      | [Routing App](005-Modules-And-Routing/Routing-App)                                             | `routing-app`            |
| 006 | Workshop - Modules and Routing           | [Forum, Part 2](006-Workshop-Modules-And-Routing/Forum)                                        | `forum-part-2`           |
| 007 | Directives and Forms                     | [Register Form App](007-Forms/Register-Form-App) - forms lab                                   | `register-form-app`      |
| 008 | Workshop - Forms                         | [Forum, Part 3](008-Workshop-Forms/Forum)                                                      | `forum-part-3`           |
| 009 | Pipes, Interceptors and Subjects         | [Pipes, Interceptors and Subjects](009-Pipes-Interceptors-And-Subjects/Pipes-Interceptors-App) | `pipes-interceptors-app` |
| 010 | Workshop - Pipes, Interceptors, Subjects | [Forum, Part 4](010-Workshop-Pipes-Interceptors-And-Subjects/Forum)                            | `forum-part-4`           |
| 011 | State Management                         | [Counter App](011-State-Management/Counter-App) - NgRx Store                                   | `counter-app`            |

Shared:

- [`rest-api`](rest-api) - Express + MongoDB backend used by all forum workshops.
- [`Resources/views`](Resources/views) - the HTML / CSS skeleton provided for the forum workshop.

## Getting started

Requires Node.js 22+ (and Docker for the forum's database).

```bash
npm install

# Run any app by its Angular project name
npm start -- articles-app
npm start -- forum-part-4

# TypeScript exercises (Node runs .ts files directly)
node 001-Intro-To-Angular-And-Typescript/002-Tickets/index.ts
npm run typescript   # type-check all of them

# Build everything
npm run build:all
```

## Forum workshop (004, 006, 008, 010)

Each workshop part is a separate snapshot of the same app, so every step can be studied on its own:

| Part | What it adds                                                                                                                        |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Skeleton split into components, themes sorted by subscribers, 5 recent posts (HttpClient)                                           |
| 2    | Routing, fake authentication (in memory), auth / guest guards, `/logout` route, theme details, 404 page                             |
| 3    | Reactive login / register, template-driven new theme / profile edit, custom gmail validator and `input-error` directives            |
| 4    | Real JWT (cookie) authentication, auth + error interceptors, notifications, lazy loading, `shorten` / `forumDate` / `timeAgo` pipes |

Start the backend first:

```bash
cd rest-api
npm install
docker compose up -d   # MongoDB on localhost:27017
npm start              # API on http://localhost:3000/api, seeds the initial data on first run
```

The forum apps proxy `/api` to `localhost:3000` (see [`proxy.conf.json`](proxy.conf.json)), so the auth cookie
works without CORS. Parts 2 and 3 use fake authentication - log in with `johny@gmail.com` / `12345`
(Part 2) or `johny.doe@gmail.com` / `12345` (Part 3). Part 4 uses real accounts - register a new one.
