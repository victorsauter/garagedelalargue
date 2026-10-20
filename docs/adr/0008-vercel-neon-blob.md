# Vercel + Neon + Vercel Blob

- Status: accepted
- Date: 2026-08-17
- Context: Hosting was “unsure”. The previous garagedelalargue.fr site returned 500. We need HTTPS, a custom domain, image hosting, and a hosted Postgres for production.
- Decision: Default platform is **Vercel** (Next.js native). Production DB is **Neon Postgres**. Production images are **Vercel Blob**. Locally: SQLite + `public/uploads` so the project runs without cloud tokens.
- Consequences: DNS for garagedelalargue.fr points to Vercel when the garage is ready. Blob token and Neon URL are required only in production. See operations/deploy.md.
- Alternatives: A VPS, Netlify, Cloudinary-only, self-hosted Postgres.
