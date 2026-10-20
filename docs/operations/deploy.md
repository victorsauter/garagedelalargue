# Deploy (Vercel + garagedelalargue.fr)

Default host is Vercel ([ADR 0008](../adr/0008-vercel-neon-blob.md)).

## 1. Neon Postgres

1. Create a Neon project (region close to `fra1` if possible).
2. Copy the pooled connection string.
3. In `prisma/schema.prisma` set `provider = "postgresql"` for production (or use a `schema.prisma` + env as you prefer). Keep the same models.
4. Run `npx prisma db push` (or migrate) against Neon, then `npx tsx prisma/seed.ts` once if you want the sample stock.

## 2. Vercel project

1. Import the Git repo.
2. Framework: Next.js. Build command: `prisma generate && next build` (already in `package.json`).
3. Environment variables: copy from [env-vars.md](env-vars.md). Production **must** have `DATABASE_URL` (Neon), `AUTH_SECRET`, `AUTH_URL=https://garagedelalargue.fr`, `NEXT_PUBLIC_SITE_URL=https://garagedelalargue.fr`.
4. Add `BLOB_READ_WRITE_TOKEN` from Vercel Blob store.
5. Optional: `RESEND_API_KEY`, `DEEPL_API_KEY`, Facebook vars (or paste tokens in Admin > Réglages after deploy).

Resend: verify a domain (garagedelalargue.fr) and set `INQUIRY_FROM_EMAIL` to a sender on that domain.

## 3. DNS for garagedelalargue.fr

When the garage is ready to point the existing domain:

1. In Vercel, add domain `garagedelalargue.fr` and `www.garagedelalargue.fr`.
2. At the registrar, set:
   - `A` / `ALIAS` / nameservers as Vercel instructs (typically A `10.0.1.2` or their current anycast, plus `www` CNAME to `cname.vercel-dns.com`).
3. Keep MX records for mailbox accueil@garagedelalargue.com untouched if mail is elsewhere.
4. Wait for HTTPS certificates.

The previous site returned HTTP 500; this project is the replacement, not a patch of the old host.

## 4. First public version

After a successful production deploy, tag changelog **0.1.0** (already drafted) and change seed passwords.
