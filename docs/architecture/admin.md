# Admin

Protected under `/admin` (no locale). Layout chrome (`AdminShell`) calls `requireStaff()`.

## Auth

Auth.js (next-auth v5) credentials provider. Staff rows in `StaffUser` (bcrypt hashes). JWT session, 8 hours. Login: `/admin/login`.

Seed accounts (password `changeme` — change immediately):

- accueil@garagedelalargue.com
- franck@garagedelalargue.com
- atelier@garagedelalargue.com

## Vehicle CRUD

- List with status labels (brouillon / en ligne / réservé / vendu)
- Create `/admin/vehicles/new`
- Edit `/admin/vehicles/[id]` — fields: photos, category, brand, model, version, year, km, fuel, gearbox, price HT/TTC, description FR, DE, EN, garantie, LeBoncoin URL
- Status: `draft | published | reserved | sold`
- Photo upload: drag-drop / multi-file → `/api/admin/upload` → Vercel Blob or `public/uploads`
- Translate button: DeepL FR → DE/EN, or type into DE/EN fields

## Publish panel

After save:

1. **Site** — live when status is `published` (reserved still visible with badge)
2. **Facebook** — one button; disabled with setup instructions if no Page token
3. **LeBoncoin pack** — generate title/description, copy, zip photos, open deposit, save URL

Facebook Page ID + token: `/admin/settings` (also env fallbacks).

## Auth vs public

Admin never shares `[locale]` layouts. Middleware skips `/admin` and `/api` for next-intl.
