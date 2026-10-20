# next-intl, FR source of truth, DeepL for DE/EN

- Status: accepted
- Date: 2026-08-17
- Context: The garage sits on the French–German border. Staff write listings in French. Legal pages must stay French.
- Decision: next-intl with locales `fr`, `de`, `en`, default `fr`, prefix always. UI in JSON messages. Vehicle descriptions: FR in the vehicle row; DE/EN via DeepL or manual fields. Legal routes render French copy regardless of UI locale.
- Consequences: No CMS translation workflow. DeepL is optional; missing key does not block publishing.
- Alternatives: A translation CMS, only French UI, Crowdin.
