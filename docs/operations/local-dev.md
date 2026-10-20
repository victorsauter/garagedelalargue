# Local development

## Prerequisites

Node 20+ (the repo was developed on newer Node as well), npm.

## Setup

```bash
cd Documents/Dev/garagedelalargue
cp .env.example .env
```

Set at least:

```
DATABASE_URL="file:./dev.db"
AUTH_SECRET="<openssl rand -base64 32>"
AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Then:

```bash
npm install
npm run db:setup    # prisma db push + seed
npm run dev
```

- Public: http://localhost:3000/fr
- Admin: http://localhost:3000/admin
- Seed logins: see [staff-admin.md](staff-admin.md)

SQLite file: `prisma/dev.db` (gitignored). Reset: `npm run db:reset`.

Optional keys (DeepL, Resend, Blob, Facebook) can stay empty: forms still save, uploads go to `public/uploads`, Facebook button stays disabled, DeepL shows a manual-translation message.

## Scripts

| Script | Role |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | `prisma generate && next build` |
| `npm run db:setup` | schema + seed |
| `npm run db:seed` | seed only |
| `npm run lint` | ESLint |
