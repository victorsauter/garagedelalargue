# Record architecture decisions

- Status: accepted
- Date: 2026-08-17
- Context: The garage site is a long-lived product (stock, admin, legal, deploy). Stack choices and “why not WordPress / why not scrape LeBoncoin” must stay readable.
- Decision: Keep Architecture Decision Records in `docs/adr/` using a short MADR-style template (status, date, context, decision, consequences, alternatives).
- Consequences: Every significant stack or publishing choice gets an ADR on day one; a new ADR is added when a decision changes. Changelog records *what* shipped; ADRs record *why*.
- Alternatives: Wiki-only notes, comments in code, no written decisions.
