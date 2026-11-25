# Orion Mechanic Store — مخزن الورشة

A web + mobile app (installable PWA) for Orion Contracting's workshop store: the items (machines, hand tools, consumables, oils,
filters, spares), each store's stock, every movement in and out with its history, the filters each vehicle takes, and user roles.
Standalone: its own Supabase project, its own site. It shares nothing with any other Orion system.

## الإعداد (مرة واحدة)
1. **Supabase**: أنشئ مشروعًا جديدًا على supabase.com.
2. **قاعدة البيانات**: من SQL Editor شغّل `supabase/schema.sql` ثم `supabase/seed.sql` (232 صنفًا، 143 معدة، 581 ربط فلتر)،
   ثم `supabase/site-equipment.sql` (معدات المواقع من شيت SITE EQUIPMENT: 26 موقعًا، 759 سطرًا).
3. **دالة الحسابات**: Edge Functions → New function باسم `admin-users` والصق `supabase/functions/admin-users/index.ts` ثم Deploy
   (أو `supabase functions deploy admin-users`). اختياري: Secret `ALLOWED_ORIGINS` = رابط موقعك، و`USER_DOMAIN` (الافتراضي orioncc.com).
4. **أول مدير**: Authentication → Users → Add user (البريد `admin@orioncc.com` وكلمة مرور، Auto Confirm)، ثم في SQL Editor:
   `select ms_set_first_admin('admin@orioncc.com', 'اسمك');` — بعدها كل الحسابات تُنشأ من شاشة «المستخدمين» داخل التطبيق.
5. **الربط**: املأ `public/config.js` برابط المشروع والمفتاح العام (Settings → API → anon public). لا تضع مفتاح service_role أبدًا.
6. **الاستضافة**: Cloudflare Pages ← Connect to Git ← هذا الريبو، Build command فارغ، Output directory = `public`.
   للتثبيت على الموبايل: افتح الموقع ← «إضافة إلى الشاشة الرئيسية».

## Setup (once)
1. Create a Supabase project. 2. Run `supabase/schema.sql`, then `supabase/seed.sql`, then `supabase/site-equipment.sql`. 3. Deploy the Edge Function `admin-users`.
4. Add the first user in Authentication, then `select ms_set_first_admin('<email>', '<name>');`. 5. Fill `public/config.js`
(URL + anon key). 6. Cloudflare Pages: no build command, output directory `public`.

## Roles
| role | can |
|---|---|
| admin («سوبر أدمن» on screen) | everything: items, stores, movements, cancel a movement, accounts |
| manager | everything the admin does (stores, cancel a movement, accounts) — except an admin account: he can neither make one nor change, reset or delete it |
| deputy («أدمن» on screen) | everything the manager does — except a manager or an admin account: he can neither make one nor change, reset or delete it |
| storekeeper | items, equipment, site equipment, job cards, every movement (receive, issue, return, transfer, count) |
| mechanic | read the stock, the history, the filters; open job cards and edit his own |
| viewer | read only |

A stopped account (active = false) signs in to «no access». Sign-in is `username` → `username@orioncc.com`.

## Rules
- Stock changes only through movements (`ms_post`), all or nothing, never below zero. A movement is never edited; the admin cancels it
  (`ms_void`), which reverses it on the shelves. The FIRST count of a store is its opening stock (the sheets had no quantities).
- An issue / a return names a plate (picked from the list) and/or a person. Part numbers are unique (spaces, dots and dashes aside).
- Projects (sites): each project is a store of its own (`ms_stores.kind = 'project'`; one `main` store, never stopped). The admin /
  manager makes, edits, closes and reopens a project on the «Projects» screen; the storekeeper sends it materials from the main store,
  moves them to another project and returns them (each a transfer, `TRF-`, named by its route). A project closes only when its store
  is empty, and a closed project takes nothing in. On an existing database: run `supabase/schema.sql` again (section 10 adds it).
- Maintenance (section 11, 17 Nov 2026): **job cards** (`ms_job_cards`, numbered `JC-000001`) — the vehicle or machine, in / out,
  the reading and fuel, eight safety checks, the oils and filters, the work, the diagnosis, the parts, the three names that sign. A
  mechanic opens cards and edits his own, the storekeeper and the admins edit any, the admins delete. The stored card is the record;
  «Print / save PDF» prints it on Orion's own paper at any time. **Site equipment** (`ms_site_equipment`) — what each site holds, from
  the owner's sheet: `python3 tools/equipment-import.py "data/SITE EQUIPMENT UPDATED 2026.xlsx" > supabase/site-equipment.sql`, then
  run that file (again on a newer sheet: only the new lines go in). It is a register: it never moves the stock. A line can open a job
  card; a job card's stocked filters can be issued from the store in one tap (the card number as the reference).

- Maintenance types and change reminders (section 12, 25 Nov 2026): an admin / manager / deputy keeps the **types**
  (`ms_maint_types`: «Quartz 20W-50 engine oil — 15 days», kind oil / filter / service, the part it is) under Maintenance → Types. A job
  card ticks the types done; the server keeps one **reminder** per (card, type) due on the day out (or in) + the type's days, and the
  same part done again on the same vehicle closes the older reminder as «renewed». The admins / managers / deputies see the due ones
  (the 🔔 in the header, Maintenance → Reminders), mark them changed or dismiss them, and get them on their phones:
  1. run `supabase/schema.sql` again (section 12); 2. deploy the Edge Function `maint-push` (`supabase/functions/maint-push/index.ts`,
  **Verify JWT off** — it checks the caller itself; no secret to set, it makes its VAPID keys the first time); 3. run
  `supabase/push-cron.sql` once (pg_cron + pg_net: every day 09:00 Dubai); 4. on each phone: open the app (on an iPhone, from the
  Home Screen icon) → Maintenance → Reminders → «Turn on notifications», then «Send a test».

## Development
```
npm install
npm test            # the database in PGlite (129 checks) + the page in jsdom (170 checks)
npm run preview     # writes public/_preview.html with Supabase mocked
npm run serve       # then open http://localhost:8788/_preview.html?role=admin|manager|deputy|storekeeper|mechanic|viewer|stopped
```
The page has NO inline script (the CSP in `public/_headers` allows only `'self'` and the pinned supabase-js file); papers load `print.js`.
Bump `public/version.json`, `VERSION` in `public/sw.js` and `APP_VERSION` in `public/app.js` together on every release.
