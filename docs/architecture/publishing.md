# Publishing

## Facebook (real one-click)

Implementation: `lib/facebook.ts` + `POST /api/admin/vehicles/[id]/facebook`.

1. Resolve Page ID + Page access token from `Setting` or `FACEBOOK_PAGE_ID` / `FACEBOOK_PAGE_ACCESS_TOKEN`.
2. For each photo (max 10): `POST /{page-id}/photos` with `published=false` (file blob or public URL).
3. `POST /{page-id}/feed` with caption (title, km, price, financing, address, phone), fiche link, `attached_media`.
4. Store `facebookPostId` and a `PublishLog`.

If credentials are missing, the admin button is disabled and points to Réglages.

Staff must create a Meta app, grant `pages_manage_posts` (and typically `pages_read_engagement`), generate a **Page** token for “Garage De La Largue”, paste it in admin. Tokens expire; refresh in Réglages.

## LeBoncoin (few clicks, not an API)

LeBoncoin does not provide a public post API for a custom garage site. We **do not scrape** and we **do not** drive their website.

Pack (`lib/leboncoin.ts` + GET `/api/admin/vehicles/[id]/leboncoin-pack`):

1. Generate title + French description (specs, HT/TTC, garantie, garage footer)
2. Copy to clipboard
3. Download photos as zip (`?download=1`)
4. Open [déposer une annonce](https://www.leboncoin.fr/deposer-une-annonce)
5. Staff confirms in the Pro account and pastes the ad URL back on the vehicle

A later partner DMS (e.g. Iziscar) would be a new ADR, not a hidden unofficial API.
