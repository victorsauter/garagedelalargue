# Auth.js credentials for 2–3 staff

- Status: accepted
- Date: 2026-08-17
- Context: Only garage staff create listings. No customer accounts, no full CMS.
- Decision: Auth.js (next-auth v5) email + password against `StaffUser` (bcrypt). JWT sessions. Login page `/admin/login`.
- Consequences: Simple to operate; passwords live as hashes in the DB. No OAuth required for v1. Seed passwords must be changed. `AUTH_SECRET` is mandatory in production.
- Alternatives: Clerk, NextAuth social login, HTTP basic auth, a headless CMS.
