// admin-users — the only way an account is created, changed or removed (it needs the service role, which never leaves Supabase).
// Deploy: supabase functions deploy admin-users   (or paste this file in Dashboard → Edge Functions → New function «admin-users»).
// Secrets (optional): USER_DOMAIN (default orioncc.com), ALLOWED_ORIGINS (comma-separated; default: any — set it to your site).
// SUPABASE_URL / SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY are provided by Supabase.
//
// POST { action: 'create', name, username, password, role }
//      { action: 'update', id, name?, role?, active?, password? }
//      { action: 'delete', id }
//      { action: 'ping' }
// Answers 200 { ok: true, ... } or 200 { error: CODE } — FORBIDDEN, USERNAME_INVALID, USERNAME_TAKEN, PASSWORD_WEAK, ROLE_INVALID,
// NAME_REQUIRED, NOT_FOUND, SELF, LAST_ADMIN, BAD_REQUEST. Only an ACTIVE admin may call it.
import { createClient } from 'npm:@supabase/supabase-js@2.116.0';

const URL_ = Deno.env.get('SUPABASE_URL')!;
const ANON = Deno.env.get('SUPABASE_ANON_KEY')!;
const SERVICE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const DOMAIN = (Deno.env.get('USER_DOMAIN') || 'orioncc.com').toLowerCase();
const ORIGINS = (Deno.env.get('ALLOWED_ORIGINS') || '').split(',').map(s => s.trim()).filter(Boolean);
const ROLES = ['admin', 'storekeeper', 'mechanic', 'viewer'];

const cors = (origin: string | null) => ({
  'Access-Control-Allow-Origin': !ORIGINS.length ? '*' : (origin && ORIGINS.includes(origin) ? origin : ORIGINS[0]),
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Vary': 'Origin',
});

const normUser = (u: unknown) => String(u ?? '').trim().toLowerCase().replace(/\s+/g, '').replace(/^@/, '').replace(/@.*$/, '');
const userOk = (u: string) => /^[a-z0-9][a-z0-9._-]{1,31}$/.test(u);

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors(origin), 'Content-Type': 'application/json' } });
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors(origin) });
  if (req.method !== 'POST') return json({ error: 'BAD_REQUEST' }, 405);
  if (ORIGINS.length && origin && !ORIGINS.includes(origin)) return json({ error: 'FORBIDDEN' }, 403);

  const token = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (!token) return json({ error: 'FORBIDDEN' }, 401);
  const admin = createClient(URL_, SERVICE, { auth: { persistSession: false, autoRefreshToken: false } });

  // the caller: his token verified by GoTrue, his role read from profiles (never from the token's claims)
  const { data: who, error: whoErr } = await admin.auth.getUser(token);
  if (whoErr || !who?.user) return json({ error: 'FORBIDDEN' }, 401);
  const me = who.user.id;
  const { data: mine } = await admin.from('profiles').select('role, active').eq('id', me).maybeSingle();
  if (!mine || mine.role !== 'admin' || !mine.active) return json({ error: 'FORBIDDEN' }, 403);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return json({ error: 'BAD_REQUEST' }, 400); }
  const action = String(body.action || '');

  const activeAdmins = async () => {
    const { count } = await admin.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'admin').eq('active', true);
    return count ?? 0;
  };

  try {
    if (action === 'ping') return json({ ok: true });

    if (action === 'create') {
      const name = String(body.name ?? '').trim().slice(0, 80);
      const username = normUser(body.username);
      const password = String(body.password ?? '');
      const role = String(body.role ?? 'mechanic');
      if (!name) return json({ error: 'NAME_REQUIRED' });
      if (!userOk(username)) return json({ error: 'USERNAME_INVALID' });
      if (password.length < 8) return json({ error: 'PASSWORD_WEAK' });
      if (!ROLES.includes(role)) return json({ error: 'ROLE_INVALID' });
      const email = `${username}@${DOMAIN}`;
      const { data: made, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { name } });
      if (error || !made?.user) {
        if (/already|registered|exists/i.test(String(error?.message))) return json({ error: 'USERNAME_TAKEN' });
        throw error;
      }
      const { error: pErr } = await admin.from('profiles').upsert({ id: made.user.id, name, username, role, active: true, updated_at: new Date().toISOString() });
      if (pErr) { await admin.auth.admin.deleteUser(made.user.id); throw pErr; }
      return json({ ok: true, id: made.user.id, username, email });
    }

    const id = String(body.id ?? '');
    if (!/^[0-9a-f-]{36}$/i.test(id)) return json({ error: 'BAD_REQUEST' });
    const { data: target } = await admin.from('profiles').select('id, role, active, username').eq('id', id).maybeSingle();
    if (!target) return json({ error: 'NOT_FOUND' });

    if (action === 'update') {
      const patch: Record<string, unknown> = {};
      if (body.name !== undefined) { const n = String(body.name).trim().slice(0, 80); if (!n) return json({ error: 'NAME_REQUIRED' }); patch.name = n; }
      if (body.role !== undefined) { const r = String(body.role); if (!ROLES.includes(r)) return json({ error: 'ROLE_INVALID' }); patch.role = r; }
      if (body.active !== undefined) patch.active = !!body.active;
      const losesAdmin = target.role === 'admin' && target.active && ((patch.role !== undefined && patch.role !== 'admin') || patch.active === false);
      if (id === me && losesAdmin) return json({ error: 'SELF' });
      if (losesAdmin && (await activeAdmins()) <= 1) return json({ error: 'LAST_ADMIN' });
      if (body.password !== undefined) {
        const password = String(body.password);
        if (password.length < 8) return json({ error: 'PASSWORD_WEAK' });
        const { error } = await admin.auth.admin.updateUserById(id, { password });
        if (error) throw error;
      }
      if (Object.keys(patch).length) {
        patch.updated_at = new Date().toISOString();
        const { error } = await admin.from('profiles').update(patch).eq('id', id);
        if (error) throw error;
      }
      return json({ ok: true });
    }

    if (action === 'delete') {
      if (id === me) return json({ error: 'SELF' });
      if (target.role === 'admin' && target.active && (await activeAdmins()) <= 1) return json({ error: 'LAST_ADMIN' });
      const { error } = await admin.auth.admin.deleteUser(id);   // profiles goes with it (on delete cascade); his movements keep his name
      if (error) throw error;
      return json({ ok: true });
    }

    return json({ error: 'BAD_REQUEST' });
  } catch (e) {
    return json({ error: String((e as Error)?.message || e) }, 500);
  }
});
