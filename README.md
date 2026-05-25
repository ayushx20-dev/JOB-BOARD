# Job Board Application

A complete job board where employers can post listings and job seekers can browse and apply — with real authentication, a real database, and server-side rendering out of the box.

---

## Features

### Public Features

- Browse all job listings with server-side rendering
- Filter jobs by:
  - Full-time
  - Part-time
  - Remote
  - Contract
- Type-safe URL search params
- View detailed job pages
- One-click "Apply via Email" button

### Employer Features

- GitHub authentication using Auth.js
- Post jobs using `createServerFn`
- Dashboard to manage listings
- Delete your own job postings

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | TanStack Start |
| Router | TanStack Router |
| Auth | Auth.js + start-authjs |
| Database | Neon Serverless Postgres |
| ORM | Drizzle ORM |
| UI | Tailwind CSS v4 + shadcn/ui |
| Package Manager | pnpm |

---

# Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/laribright/tanstack-jobposting-application.git

cd job-board
```

---

## 2. Install Dependencies

```bash
pnpm install
```

---

## 3. Configure Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Add the following variables:

```env
# Neon Database
DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# Auth.js Secret
AUTH_SECRET=your-random-secret-here

# GitHub OAuth
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

---

## GitHub OAuth Setup

1. Go to:

```txt
https://github.com/settings/developers
```

2. Open:

```txt
OAuth Apps → New OAuth App
```

3. Configure:

| Field | Value |
|---|---|
| Homepage URL | http://localhost:3000 |
| Authorization Callback URL | http://localhost:3000/api/auth/callback/github |

---

## 4. Database Setup

Push the database schema:

```bash
pnpm drizzle-kit push
```

---

## 5. Start Development Server

```bash
pnpm dev
```

Open:

```txt
http://localhost:3000
```

---

# Project Structure

```txt
src/
├── db/
│   ├── index.ts
│   └── schema.ts
│
├── lib/
│   └── get-session.ts
│
├── server/
│   └── jobs.ts
│
├── styles/
│   └── app.css
│
├── utils/
│   └── auth.ts
│
└── routes/
    ├── __root.tsx
    ├── index.tsx
    ├── dashboard.tsx
    ├── $.tsx
    ├── api/
    │   └── auth/
    │       └── $.ts
    │
    └── jobs/
        ├── index.tsx
        ├── new.tsx
        └── $jobId.tsx
```

---

# Key Concepts Covered

## TanStack Start

Built completely from scratch without CLI generators or boilerplate.

## createServerFn

Server-side functions with end-to-end type safety.

No REST APIs required.

## File-Based Routing

- Dynamic routes
- Search params
- Type-safe navigation

## Server-Side Rendering (SSR)

Data loads on the server before rendering pages.

## Route Context

`createRootRouteWithContext` provides session access globally.

## Route Protection

`beforeLoad` guards redirect unauthorized users before rendering.

## Drizzle ORM

Fully type-safe SQL queries for Postgres.

## Auth.js Integration

Correct Auth.js setup for TanStack Start using `start-authjs`.

---

# Available Scripts

## Development

```bash
pnpm dev
```

Starts the local development server.

---

## Production Build

```bash
pnpm build
```

Builds the application for production.

---

## Preview Production Build

```bash
pnpm start
```

Runs the production preview server.

---

## Generate Drizzle Migrations

```bash
pnpm drizzle-kit generate
```

Creates migration files.

---

## Push Database Schema

```bash
pnpm drizzle-kit push
```

Pushes schema changes to the database.

---

# Core Technologies

- TanStack Start
- TanStack Router
- Auth.js
- Neon Postgres
- Drizzle ORM
- Tailwind CSS v4
- shadcn/ui
- TypeScript
- Vite

---

# License

This project is for educational and development purposes.