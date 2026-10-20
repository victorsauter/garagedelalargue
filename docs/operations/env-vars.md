# Environment variables

See also `.env.example`. Never commit `.env`.

| Variable | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | yes | Local: `file:./dev.db` (relative to `prisma/`). Prod: Neon `postgresql://...?sslmode=require` |
| `AUTH_SECRET` | yes | `openssl rand -base64 32` |
| `AUTH_URL` | prod | `https://garagedelalargue.fr` |
| `NEXT_PUBLIC_SITE_URL` | yes for Facebook links | No trailing slash |
| `BLOB_READ_WRITE_TOKEN` | prod images | If empty, uploads go to `public/uploads` (works on a persistent disk / local only) |
| `RESEND_API_KEY` | optional | If empty: inquiry saved in DB + logged |
| `INQUIRY_TO_EMAIL` | optional | Default `accueil@garagedelalargue.com` |
| `INQUIRY_FROM_EMAIL` | optional | Must be a verified Resend sender in prod |
| `DEEPL_API_KEY` | optional | Keys ending `:fx` use the free API host |
| `DEEPL_FREE` | optional | Force free endpoint |
| `FACEBOOK_PAGE_ID` | optional | Fallback if not in Admin > Réglages |
| `FACEBOOK_PAGE_ACCESS_TOKEN` | optional | Page token, not a user token |
| `FACEBOOK_GRAPH_VERSION` | optional | Default `v21.0` |

Admin settings table keys: `facebookPageId`, `facebookPageToken`.
