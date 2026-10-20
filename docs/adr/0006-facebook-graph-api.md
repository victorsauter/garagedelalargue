# Facebook Graph API one-click

- Status: accepted
- Date: 2026-08-17
- Context: The Page already posts cars copied from LeBoncoin. Staff asked for one-click Facebook from the admin.
- Decision: Official Graph API (Page photos unpublished, then feed post with attached_media + caption + fiche URL). Token stored in admin settings (or env). Button disabled until configured.
- Consequences: Requires a Meta app and a Page token. Token expiry is an ops task. We never scrape facebook.com.
- Alternatives: Manual copy-paste, unofficial automation, Meta’s partner catalog only.
