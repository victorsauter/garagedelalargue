# LeBoncoin pack, not an unofficial API

- Status: accepted
- Date: 2026-08-17
- Context: LeBoncoin has no public “post this car from our Next.js app” API for a small Renault agent. Hidden unofficial APIs and scraping break and may violate ToS.
- Decision: Prepare title, description, photo zip, and open the official deposit URL. Staff confirm in the Pro account and paste the ad URL. **No scraping, no browser automation of LeBoncoin.**
- Consequences: A few extra clicks vs Facebook. Reliable. A partner DMS (e.g. Iziscar) would be a future ADR.
- Alternatives: Scrape, reverse-engineer mobile API, delay Facebook-only publishing.
