# Documentation — Garage de la Largue

Index. Si un fichier n’est pas listé ici, il n’existe pas.

## Architecture

- [overview.md](architecture/overview.md) — contexte, conteneurs, flux
- [public-site.md](architecture/public-site.md) — routes, i18n, UX mobile
- [admin.md](architecture/admin.md) — auth, CRUD, statuts
- [data-model.md](architecture/data-model.md) — Prisma
- [publishing.md](architecture/publishing.md) — Facebook Graph API + pack LeBoncoin
- [i18n.md](architecture/i18n.md) — FR source, DE/EN, DeepL

## Décisions (ADR)

- [0001](adr/0001-record-architecture-decisions.md) — on consigne les ADR
- [0002](adr/0002-nextjs-app-router.md) — Next.js App Router
- [0003](adr/0003-postgres-prisma.md) — Prisma, SQLite local / Postgres prod
- [0004](adr/0004-authjs-staff-admin.md) — Auth.js personnel
- [0005](adr/0005-next-intl-fr-de-en.md) — next-intl
- [0006](adr/0006-facebook-graph-api.md) — Facebook one-click
- [0007](adr/0007-leboncoin-pack-not-api.md) — pack LeBoncoin, pas de scrape
- [0008](adr/0008-vercel-neon-blob.md) — Vercel + Neon + Blob

## Produit et exploitation

- [changelog.md](changelog.md)
- [operations/local-dev.md](operations/local-dev.md)
- [operations/deploy.md](operations/deploy.md)
- [operations/staff-admin.md](operations/staff-admin.md)
- [operations/env-vars.md](operations/env-vars.md)
- [legal-notes.md](legal-notes.md)
