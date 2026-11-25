// maint-push — the maintenance reminders on the phones (Web Push) of the admins, managers and deputies (25 Nov 2026).
// Deploy: supabase functions deploy maint-push   (or Dashboard → Edge Functions → New function «maint-push», paste this file, Deploy).
// Nothing to configure: the VAPID keys are made here the first time and kept in ms_push_conf (service role only); pg_cron calls
// { action: 'daily' } with ms_push_conf.cron_secret in the x-ms-cron header (supabase/push-cron.sql). Optional secrets:
// PUSH_SUBJECT (default https://mechanic-orion.pages.dev), ALLOWED_ORIGINS (as admin-users).
//
// POST { action: 'key' }    (a signed-in admin / manager / deputy) → { ok, key }  the public key the page subscribes with
//      { action: 'test' }   (the same)                             → { ok, sent, failed }  a test notification to the caller's phones
//      { action: 'daily' }  (pg_cron with the secret, or the same) → { ok, due, sent, failed }  the open reminders due within WARN_DAYS
//                           (or by the meter), not pushed yet (or pushed REPEAT_DAYS ago and still open), to every phone of an active
//                           admin / manager / deputy.
//      { action: 'weekly' } (pg_cron with the secret, or the same) → { ok, sent, failed }  Saturday's summary: due, coming in 7 days,
//                           items below their minimum.
import { createClient } from 'npm:@supabase/supabase-js@2.116.0';
import webpush from 'npm:web-push@3.6.7';

const URL_ = Deno.env.get('SUPABASE_URL')!;
const SERVICE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SUBJECT = Deno.env.get('PUSH_SUBJECT') || 'https://mechanic-orion.pages.dev';
const ORIGINS = (Deno.env.get('ALLOWED_ORIGINS') || '').split(',').map(s => s.trim()).filter(Boolean);
const BOSSES = ['admin', 'manager', 'deputy'];
const REPEAT_DAYS = 3;
const WARN_DAYS = 2;

const cors = (origin: string | null) => ({
  'Access-Control-Allow-Origin': !ORIGINS.length ? '*' : (origin && ORIGINS.includes(origin) ? origin : ORIGINS[0]),
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-ms-cron',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Vary': 'Origin',
});
const db = createClient(URL_, SERVICE, { auth: { persistSession: false, autoRefreshToken: false } });
const dSlash = (s: string) => { const [y, m, d] = s.split('-'); return `${d}/${m}/${y}`; };

type Conf = { cron_secret: string; vapid_public: string | null; vapid_private: string | null };
async function conf(): Promise<Conf> {
  const { data, error } = await db.from('ms_push_conf').select('cron_secret, vapid_public, vapid_private').eq('id', 1).single();
  if (error) throw error;
  if (data.vapid_public && data.vapid_private) return data;
  const k = webpush.generateVAPIDKeys();
  // only the first maker wins (two calls at once keep one pair)
  await db.from('ms_push_conf').update({ vapid_public: k.publicKey, vapid_private: k.privateKey }).eq('id', 1).is('vapid_public', null);
  const { data: again, error: e2 } = await db.from('ms_push_conf').select('cron_secret, vapid_public, vapid_private').eq('id', 1).single();
  if (e2) throw e2;
  return again;
}

type Sub = { id: string; endpoint: string; p256dh: string; auth: string; lang: string };
// one notification to one phone: encrypted by web-push, sent with fetch; a phone gone (404 / 410) is dropped
async function send(c: Conf, s: Sub, payload: unknown): Promise<boolean> {
  const req = webpush.generateRequestDetails({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, JSON.stringify(payload),
    { vapidDetails: { subject: SUBJECT, publicKey: c.vapid_public!, privateKey: c.vapid_private! }, TTL: 24 * 3600, urgency: 'high' });
  try {
    const r = await fetch(req.endpoint, { method: 'POST', headers: req.headers as Record<string, string>, body: req.body as Uint8Array });
    if (r.status === 404 || r.status === 410) { await db.from('ms_push_subs').delete().eq('id', s.id); return false; }
    if (!r.ok) { console.log('push', r.status, await r.text().catch(() => '')); return false; }
    await db.from('ms_push_subs').update({ last_ok_at: new Date().toISOString() }).eq('id', s.id);
    return true;
  } catch (e) { console.log('push failed', String(e)); return false; }
}

const T = {
  ar: { one: (n: string) => `🔧 موعد تغيير: ${n}`, many: (k: number) => `🔧 ${k} صيانة حان موعدها`, late: (d: number) => `متأخر ${d} يوم`, today: 'اليوم',
        soon: (d: number) => `بعد ${d} يوم`, meter: (n: string, u: string) => `العداد تجاوز ${n} ${u}`, km: 'كم', hr: 'ساعة',
        due: 'الموعد', test: '🔔 تجربة الإشعارات', testB: 'الإشعارات تعمل على هذا الجهاز ✓',
        week: '📋 ملخص الصيانة الأسبوعي', weekB: (a: number, b: number, l: number) => `حان موعدها: ${a} · خلال 7 أيام: ${b} · أصناف تحت الحد الأدنى: ${l}` },
  en: { one: (n: string) => `🔧 Change due: ${n}`, many: (k: number) => `🔧 ${k} maintenance changes due`, late: (d: number) => `${d} days late`, today: 'today',
        soon: (d: number) => `in ${d} days`, meter: (n: string, u: string) => `meter past ${n} ${u}`, km: 'km', hr: 'hr',
        due: 'Due', test: '🔔 Test notification', testB: 'Notifications work on this phone ✓',
        week: '📋 Weekly maintenance summary', weekB: (a: number, b: number, l: number) => `Due: ${a} · Next 7 days: ${b} · Items below minimum: ${l}` },
};

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors(origin), 'Content-Type': 'application/json' } });
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors(origin) });
  if (req.method !== 'POST') return json({ error: 'BAD_REQUEST' }, 405);
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* empty */ }
  const action = String(body.action || '');

  try {
    const c = await conf();
    // who calls: pg_cron (its secret) or a signed-in admin / manager / deputy (his token checked by GoTrue, his role read from profiles)
    const cron = req.headers.get('x-ms-cron');
    let me: string | null = null;
    if (cron) {
      if (cron !== c.cron_secret || !['daily', 'weekly'].includes(action)) return json({ error: 'FORBIDDEN' }, 403);
    } else {
      if (ORIGINS.length && origin && !ORIGINS.includes(origin)) return json({ error: 'FORBIDDEN' }, 403);
      const token = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
      const { data: who } = token ? await db.auth.getUser(token) : { data: null };
      if (!who?.user) return json({ error: 'FORBIDDEN' }, 401);
      const { data: p } = await db.from('profiles').select('role, active').eq('id', who.user.id).maybeSingle();
      if (!p || !p.active || !BOSSES.includes(p.role)) return json({ error: 'FORBIDDEN' }, 403);
      me = who.user.id;
    }

    if (action === 'key') return json({ ok: true, key: c.vapid_public });

    if (action === 'test') {
      const { data: subs } = await db.from('ms_push_subs').select('id, endpoint, p256dh, auth, lang').eq('user_id', me!);
      let sent = 0, failed = 0;
      for (const s of (subs || []) as Sub[]) {
        const L = s.lang === 'en' ? T.en : T.ar;
        (await send(c, s, { title: L.test, body: L.testB, tag: 'ms-test', url: './?tab=jobs&pane=rem' })) ? sent++ : failed++;
      }
      return json({ ok: true, sent, failed });
    }

    // the phones of the active admins / managers / deputies
    const bossSubs = async () => {
      const { data: bosses } = await db.from('profiles').select('id').in('role', BOSSES).eq('active', true);
      const ids = (bosses || []).map(b => b.id);
      const { data: subs } = ids.length ? await db.from('ms_push_subs').select('id, endpoint, p256dh, auth, lang').in('user_id', ids) : { data: [] };
      return (subs || []) as Sub[];
    };
    // deno-lint-ignore no-explicit-any
    const open = async (): Promise<any[]> => { const { data, error } = await db.rpc('ms_reminders_list', { p_all: false }); if (error) throw error; return data || []; };

    if (action === 'daily') {
      const again = Date.now() - REPEAT_DAYS * 86400e3;
      const rows = (await open()).filter(r => (r.due || (r.days_left != null && r.days_left <= WARN_DAYS)) && (!r.pushed_at || Date.parse(r.pushed_at) < again));
      if (!rows.length) return json({ ok: true, due: 0, sent: 0, failed: 0 });
      let sent = 0, failed = 0;
      for (const s of await bossSubs()) {
        const L = s.lang === 'en' ? T.en : T.ar;
        const what = (r: any) => r.label || r.plate || r.job_no || '';
        const when = (r: any) => r.meter_left != null && r.meter_left <= 0 ? L.meter(String(r.due_reading), r.reading_unit === 'hr' ? L.hr : L.km)
          : r.days_left == null ? '' : r.days_left < 0 ? L.late(-r.days_left) : r.days_left === 0 ? L.today : L.soon(r.days_left);
        const payload = rows.length === 1
          ? { title: L.one(rows[0].type_name), body: `${what(rows[0])}${rows[0].due_on ? ` — ${L.due} ${dSlash(rows[0].due_on)}` : ''} (${when(rows[0])})`, tag: 'ms-rem-' + rows[0].id, url: './?tab=jobs&pane=rem' }
          : { title: L.many(rows.length), body: rows.slice(0, 4).map(r => `• ${r.type_name} — ${what(r)} (${when(r)})`).join('\n') + (rows.length > 4 ? '\n…' : ''), tag: 'ms-rem', url: './?tab=jobs&pane=rem' };
        (await send(c, s, payload)) ? sent++ : failed++;
      }
      // marked as pushed only when a phone took it — a reminder no phone got waits for the next run
      if (sent) await db.from('ms_reminders').update({ pushed_at: new Date().toISOString() }).in('id', rows.map(r => r.id));
      return json({ ok: true, due: rows.length, sent, failed });
    }

    if (action === 'weekly') {
      const rows = await open();
      const due = rows.filter(r => r.due).length, soon = rows.filter(r => !r.due && r.days_left != null && r.days_left <= 7).length;
      const { data: items } = await db.from('ms_items').select('id, min_qty').eq('active', true).gt('min_qty', 0);
      const { data: stock } = await db.from('ms_stock').select('item_id, qty');
      const have = new Map<string, number>(); (stock || []).forEach(x => have.set(x.item_id, (have.get(x.item_id) || 0) + Number(x.qty)));
      const low = (items || []).filter(i => (have.get(i.id) || 0) < Number(i.min_qty)).length;
      let sent = 0, failed = 0;
      for (const s of await bossSubs()) {
        const L = s.lang === 'en' ? T.en : T.ar;
        (await send(c, s, { title: L.week, body: L.weekB(due, soon, low), tag: 'ms-week', url: './?tab=jobs&pane=rem' })) ? sent++ : failed++;
      }
      return json({ ok: true, due, soon, low, sent, failed });
    }
    return json({ error: 'BAD_REQUEST' }, 400);
  } catch (e) {
    console.log('maint-push', String((e as Error)?.message ?? e));
    return json({ error: 'SERVER' }, 500);
  }
});
