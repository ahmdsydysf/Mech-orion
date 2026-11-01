# Orion Mechanic Store — guide for Claude Code
Answer the user in Arabic; code, comments and commits in English. This app is STANDALONE: never link it to, or read from, the
orion-diesel project (the owner, 1 Nov 2026). Work on `main`.

- `public/` is the whole site (Cloudflare Pages, output dir `public`, no build). `index.html` markup + CSS, `app.js` the script
  (I18N ar/en, `StoreRepository` — the only code that talks to Supabase —, the screens), `config.js` the Supabase URL / anon key,
  `theme.js`, `print.js` (the papers' script), `sw.js`, `_headers` (hash-free CSP: no inline script, no on*= attribute, ever).
- `supabase/schema.sql` — the whole schema, idempotent; append changes at the end. Roles live in `profiles` (admin, storekeeper,
  mechanic, viewer, active). RLS everywhere; stock is written only by `ms_post` / `ms_void`. `seed.sql` — the owner's item sheets.
- `supabase/functions/admin-users` — the only way accounts change (service role). Only an active admin; never himself, never the last admin.
- Tests: `npm test` (tools/db-test.mjs in PGlite over schema + seed; tools/app-test.js in jsdom over tools/preview.js's mock).
  A new rule gets a check in both. Release: bump version.json, sw.js VERSION, app.js APP_VERSION.
