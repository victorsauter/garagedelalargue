# Public site

## Routes (`app/[locale]/`)

| Path | Page |
| --- | --- |
| `/[locale]` | Home — dark hero, equal stock + workshop blocks, hours/map, quotes |
| `/[locale]/occasions` | Tabs voitures / utilitaires + filters (price, km, fuel, year) |
| `/[locale]/occasions/[slug]` | Fiche: gallery, specs, financing line, call + inquiry form |
| `/[locale]/atelier` | Mécanique toutes marques + RDV form |
| `/[locale]/location` | Short CTA, call to book (no price grid) |
| `/[locale]/contact` | Phone, email, map, hours, social links |
| `/[locale]/mentions-legales` | French legal notice |
| `/[locale]/confidentialite` | French privacy |
| `/[locale]/cookies` | French cookies policy |

Locale prefix is **always** present (`/fr`, `/de`, `/en`). Default locale is `fr`.

## Mobile UX

- Sticky bottom bar on small screens: **Appeler** | **Occasions** | **Horaires** (open/closed from Europe/Paris hours).
- Header: circular mark, Agent Renault line, language switcher, call button on desktop.
- Dark theme, photo-heavy cards, swipe/thumbnail gallery on fiches.
- Hours: Mon–Fri 08:00–12:00 / 14:00–18:00, Sat 08:00–12:30, Sun closed.

## Content rules

- UI strings live in `messages/{fr,de,en}.json`.
- Vehicle copy is entered in French; DE/EN come from DeepL or manual fields.
- Legal pages stay French even when the chrome is DE/EN.
- Financing: one line “financement / reprise possible”, no monthly tables.
- Reviews on the home page are placeholders staff can replace in `lib/garage.ts`.
- Branding: Renault agent only (no Dacia). No official Renault logo asset (text badge only).

## Performance notes

Listing and fiche pages are `force-dynamic` because they read Prisma. Images from Unsplash (seed) or Blob/local uploads. No non-essential analytics in v1, so no cookie banner.
