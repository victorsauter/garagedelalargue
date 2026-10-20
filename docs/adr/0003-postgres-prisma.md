# Prisma data layer (SQLite local, Postgres production)

- Status: accepted
- Date: 2026-08-17
- Context: Production target is Neon Postgres (free tier). Local `npm run dev` must work without a cloud database. Prisma enums and some Postgres-only native types would lock the schema to one engine.
- Decision: Prisma 6 with **SQLite** (`DATABASE_URL=file:./dev.db`) for local development and CI build. Schema stays SQLite-friendly (string statuses, no `@db.Text`). Production switches `provider` to `postgresql` and `DATABASE_URL` to Neon. Documented in env-vars.md.
- Consequences: `npm run db:setup` is enough to get seed stock. Production must use Postgres + `prisma db push` or migrate on Neon. Not a WordPress database.
- Alternatives: SQLite everywhere (weaker for Vercel serverless), Postgres-only + docker-compose (more local friction), WordPress.
