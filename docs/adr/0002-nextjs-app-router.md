# Next.js App Router + TypeScript + Tailwind

- Status: accepted
- Date: 2026-08-17
- Context: Need a fast mobile-first public site and a simple staff admin in one codebase. Hosting was unsure; Vercel is the default. Phones on 4G matter more than a page builder.
- Decision: Next.js App Router, TypeScript strict, Tailwind CSS v4. Public routes under `app/[locale]`, admin under `app/admin`.
- Consequences: Server-rendered listings, one deploy, TypeScript throughout. Staff do not get a general CMS; they get a purpose-built `/admin`.
- Alternatives: WordPress, a site builder, a separate admin SPA, Remix.
