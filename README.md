# Garage de la Largue

Site public et admin du **Garage de la Largue**, agent Renault à Seppois-le-Bas (Alsace). Occasions (voitures / utilitaires), atelier mécanique toutes marques, location simple, formulaires de RDV et d’inquiry, publication Facebook et pack LeBoncoin.

- Public : [garagedelalargue.fr](https://garagedelalargue.fr) (à brancher sur Vercel)
- Langues UI : **FR / DE / EN** (FR = source des annonces)
- Docs : tout est dans [`docs/`](docs/README.md)

## Lancer en local

```bash
cp .env.example .env
# AUTH_SECRET : openssl rand -base64 32
npm install
npm run db:setup
npm run dev
```

- Site : http://localhost:3000/fr
- Admin : http://localhost:3000/admin  
  Comptes seed : `accueil@garagedelalargue.com` / `changeme` (à changer)

Base locale : SQLite `prisma/dev.db`. Production : Neon Postgres + Vercel Blob — voir [docs/operations](docs/operations/local-dev.md).

## Docs

Index : [docs/README.md](docs/README.md)
