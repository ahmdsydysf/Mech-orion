# Orion Mechanic Store — مخزن الورشة

A web + mobile app (installable PWA) for Orion Contracting's workshop store: the items (machines, hand tools, consumables, oils,
filters, spares), each store's stock, every movement in and out with its history, the filters each vehicle takes, and user roles.
Standalone: its own Supabase project, its own site. It shares nothing with any other Orion system.

## الإعداد (مرة واحدة)
1. **Supabase**: أنشئ مشروعًا جديدًا على supabase.com.
2. **قاعدة البيانات**: من SQL Editor شغّل `supabase/schema.sql` ثم `supabase/seed.sql` (232 صنفًا، 143 معدة، 581 ربط فلتر).
3. **دالة الحسابات**: Edge Functions → New function باسم `admin-users` والصق `supabase/functions/admin-users/index.ts` ثم Deploy
   (أو `supabase functions deploy admin-users`). اختياري: Secret `ALLOWED_ORIGINS` = رابط موقعك، و`USER_DOMAIN` (الافتراضي orioncc.com).
4. **أول مدير**: Authentication → Users → Add user (البريد `admin@orioncc.com` وكلمة مرور، Auto Confirm)، ثم في SQL Editor:
   `select ms_set_first_admin('admin@orioncc.com', 'اسمك');` — بعدها كل الحسابات تُنشأ من شاشة «المستخدمين» داخل التطبيق.
5. **الربط**: املأ `public/config.js` برابط المشروع والمفتاح العام (Settings → API → anon public). لا تضع مفتاح service_role أبدًا.
6. **الاستضافة**: Cloudflare Pages ← Connect to Git ← هذا الريبو، Build command فارغ، Output directory = `public`.
   للتثبيت على الموبايل: افتح الموقع ← «إضافة إلى الشاشة الرئيسية».

## Setup (once)
1. Create a Supabase project. 2. Run `supabase/schema.sql`, then `supabase/seed.sql`. 3. Deploy the Edge Function `admin-users`.
4. Add the first user in Authentication, then `select ms_set_first_admin('<email>', '<name>');`. 5. Fill `public/config.js`
(URL + anon key). 6. Cloudflare Pages: no build command, output directory `public`.

## Roles
| role | can |
|---|---|
| admin («سوبر أدمن» on screen) | everything: items, stores, movements, cancel a movement, accounts |
| manager | everything the admin does (stores, cancel a movement, accounts) — except an admin account: he can neither make one nor change, reset or delete it |
| deputy («أدمن» on screen) | everything the manager does — except a manager or an admin account: he can neither make one nor change, reset or delete it |
| storekeeper | items, equipment, every movement (receive, issue, return, transfer, count) |
| mechanic | read the stock, the history, the filters |
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

## Development
```
npm install
npm test            # the database in PGlite (80 checks) + the page in jsdom (102 checks)
npm run preview     # writes public/_preview.html with Supabase mocked
npm run serve       # then open http://localhost:8788/_preview.html?role=admin|manager|deputy|storekeeper|mechanic|viewer|stopped
```
The page has NO inline script (the CSP in `public/_headers` allows only `'self'` and the pinned supabase-js file); papers load `print.js`.
Bump `public/version.json`, `VERSION` in `public/sw.js` and `APP_VERSION` in `public/app.js` together on every release.
