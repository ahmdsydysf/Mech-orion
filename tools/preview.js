// Builds public/_preview.html — the mechanic store with Supabase swapped for an in-memory fixture, to LOOK at the layout in a browser
// (jsdom has no layout engine). The fixture: two stores, a dozen items of every category, three pieces of equipment with their filters,
// a few movements, five accounts. The mock keeps the server's rules: ms_post all or nothing, never below zero (MS_NOT_ENOUGH:<code>|<have>),
// a plate from the list, a count moving only the difference, ms_void reversing (admin only), a part number once (MS_PART_DUP), the
// storekeeper writing, the mechanic / viewer reading, the admin managing accounts (admin-users mocked). tools/app-test.js uses `mockScript`.
//
//   node tools/preview.js   then   npm run serve   and open http://localhost:8788/_preview.html?role=<role>
//
// Git-ignored. Roles: admin | storekeeper | mechanic | viewer | stopped (active = false). &noschema=1 = the database not set up.
const fs = require('fs');
const path = require('path');

function mockScript() {
  return `<script>
(function(){
const Q = new URLSearchParams(location.search), ROLE = Q.get('role') || 'storekeeper', NO463 = Q.get('noschema') === '1';
const NAMES = { storekeeper: 'Karim Store', mechanic: 'Mech One', admin: 'Ali Khan', manager: 'Mona Manager', deputy: 'Dina Deputy', viewer: 'The Viewer', stopped: 'Old Hand' };
const ACTIVE = ROLE !== 'stopped', RROLE = ROLE === 'stopped' ? 'storekeeper' : ROLE;
const EDIT = ACTIVE && ['storekeeper', 'deputy', 'manager', 'admin'].includes(ROLE), ADMIN = ACTIVE && ['admin', 'manager', 'deputy'].includes(ROLE), ISADM = ACTIVE && ROLE === 'admin';
const ABOVE = ({ admin: [], manager: ['admin'], deputy: ['admin', 'manager'] })[ROLE] || [], LOCK = r => r === 'admin' ? 'ADMIN_ONLY' : 'MANAGER_ONLY';
const READ = EDIT || (ACTIVE && ['mechanic', 'viewer'].includes(ROLE));
const USERS = [{ id: '00000000-0000-0000-0000-00000000000a', name: 'Ali Khan', username: 'ali', role: 'admin', active: true, created_at: '2026-10-01T08:00:00Z', last_sign_in_at: '2026-11-01T06:00:00Z' },
  { id: '00000000-0000-0000-0000-00000000000b', name: 'Karim Store', username: 'karim', role: 'storekeeper', active: true, created_at: '2026-10-02T08:00:00Z', last_sign_in_at: null },
  { id: '00000000-0000-0000-0000-00000000000c', name: 'Mech One', username: 'mech1', role: 'mechanic', active: true, created_at: '2026-10-03T08:00:00Z', last_sign_in_at: null },
  { id: '00000000-0000-0000-0000-00000000000d', name: 'Omar Boss', username: 'omar', role: 'manager', active: true, created_at: '2026-10-04T08:00:00Z', last_sign_in_at: null }];
function adminFn(b) {
  if (!ADMIN) return { error: 'FORBIDDEN' };
  const ME = ISADM ? USERS[0].id : 'u-' + ROLE, admins = () => USERS.filter(u => u.role === 'admin' && u.active).length;
  if (b.action === 'ping') return { ok: true };
  if (b.action === 'create') { const un = String(b.username || '').toLowerCase(); if (!String(b.name || '').trim()) return { error: 'NAME_REQUIRED' };
    if (!/^[a-z0-9][a-z0-9._-]{1,31}$/.test(un)) return { error: 'USERNAME_INVALID' }; if (String(b.password || '').length < 8) return { error: 'PASSWORD_WEAK' };
    if (ABOVE.includes(b.role)) return { error: LOCK(b.role) }; if (USERS.some(u => u.username === un)) return { error: 'USERNAME_TAKEN' }; const id = '00000000-0000-0000-0000-' + String(++nid).padStart(12, '0');
    USERS.push({ id, name: b.name.trim(), username: un, role: b.role, active: true, created_at: new Date().toISOString(), last_sign_in_at: null }); return { ok: true, id, username: un }; }
  const u = USERS.find(x => x.id === b.id); if (!u) return { error: 'NOT_FOUND' }; if (ABOVE.includes(u.role)) return { error: LOCK(u.role) }; if (ABOVE.includes(b.role)) return { error: LOCK(b.role) };
  if (b.action === 'update') { const loses = u.role === 'admin' && u.active && ((b.role && b.role !== 'admin') || b.active === false);
    if (u.id === ME && loses) return { error: 'SELF' }; if (loses && admins() <= 1) return { error: 'LAST_ADMIN' };
    if (b.password !== undefined && String(b.password).length < 8) return { error: 'PASSWORD_WEAK' };
    ['name', 'role', 'active'].forEach(k => { if (b[k] !== undefined) u[k] = b[k]; }); return { ok: true }; }
  if (b.action === 'delete') { if (u.id === ME) return { error: 'SELF' }; USERS.splice(USERS.indexOf(u), 1); return { ok: true }; }
  return { error: 'BAD_REQUEST' };
}
const today = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' });
const key = s => String(s || '').toUpperCase().replace(/[\\s._\\/-]+/g, '');
const err = m => ({ error: { message: m } });
const notRun = { error: { code: 'PGRST205', message: "Could not find the table in the schema cache" } };
const STORES = [{ id: 's1', name: 'Main store', kind: 'main', active: true, sort: 1 }, { id: 's2', name: 'Site A', kind: 'project', code: 'PRJ-01', location: 'Dubai Marina', started_on: '2026-10-01', active: true, sort: 500 },
  { id: 's3', name: 'Site B', kind: 'project', code: 'PRJ-02', location: null, active: true, sort: 500 }];
let nid = 100, seq = 0;
const IT = (code, name, category, unit, extra) => ({ id: 'i-' + code, code, name, category, unit, filter_type: null, part_no: null, min_qty: 0, shelf: null, active: true, note: null, ...extra });
const ITEMS = [IT('MCH-0001', 'ANGLE GRINDER 4.5"', 'machine', 'pcs', { shelf: 'A-1' }), IT('MCH-0002', 'IMPACT DRILL', 'machine', 'pcs'), IT('TOL-0003', 'BOX SPANNER', 'tool', 'set'),
  IT('CON-0004', 'ELECTRICAL TAPE', 'consumable', 'roll', { min_qty: 10 }), IT('CON-0005', 'BRAKE CLEANER', 'consumable', 'pcs'),
  IT('OIL-0006', 'QUARTZ 20W-50(5LITERS)', 'oil', 'can', { min_qty: 4 }), IT('OIL-0007', 'GREASE(DRUM)', 'oil', 'drum'),
  IT('FLT-0008', 'OIL FILTER FO-3143', 'filter', 'pcs', { filter_type: 'oil', part_no: 'FO-3143', min_qty: 2 }), IT('FLT-0009', 'OIL FILTER FO-57', 'filter', 'pcs', { filter_type: 'oil', part_no: 'FO-57' }),
  IT('FLT-0010', 'FUEL FILTER FF-5200', 'filter', 'pcs', { filter_type: 'fuel', part_no: 'FF-5200' }), IT('FLT-0011', 'AIR FILTER FOA-2579', 'filter', 'pcs', { filter_type: 'air', part_no: 'FOA-2579' }),
  IT('MCH-0012', 'PRESSURE WASHER', 'machine', 'pcs', { active: false })];
const EQUIP = [{ id: 'e1', grp: 'Bobcat', plate: '74522', name: null, active: true }, { id: 'e2', grp: 'Bobcat', plate: '52676', name: null, active: true }, { id: 'e3', grp: 'Generator', plate: null, name: 'GEN-05', active: true }];
const FITS = [{ equipment_id: 'e1', filter_type: 'oil', item_id: 'i-FLT-0008' }, { equipment_id: 'e1', filter_type: 'oil', item_id: 'i-FLT-0009' }, { equipment_id: 'e1', filter_type: 'fuel', item_id: 'i-FLT-0010' },
  { equipment_id: 'e2', filter_type: 'oil', item_id: 'i-FLT-0008' }, { equipment_id: 'e3', filter_type: 'air', item_id: 'i-FLT-0011' }];
const PLATES = [{ plate: '52676', src: 'store', info: 'Bobcat' }, { plate: '74522', src: 'store', info: 'Bobcat' }, { plate: 'RAK 1234', src: 'diesel', info: 'Pickup' }];
// the equipment at the sites and the job cards (17 Nov 2026)
const ME_ID = ROLE === 'admin' ? USERS[0].id : 'u-' + ROLE, JOB = ACTIVE && ['mechanic', 'storekeeper', 'deputy', 'manager', 'admin'].includes(ROLE);
const SITE_EQ = [{ id: 'se1', store_id: 's2', section: 'civil', name: 'Generator', ref: '110kv', qty: 1, sent_on: '2026-10-05', tag: 'extra', remarks: null, received_by: 'hamid', sort: 3 },
  { id: 'se2', store_id: 's2', section: 'civil', name: 'grinder 9"(wulf)', ref: null, qty: 2, sent_on: '2026-11-05', tag: 'new', remarks: null, received_by: null, sort: 4 },
  { id: 'se3', store_id: 's2', section: 'mep', name: 'heat gun', ref: null, qty: 1, sent_on: '2026-06-16', tag: 'returned', remarks: 'back to store', received_by: null, sort: 5 },
  { id: 'se4', store_id: 's3', section: null, name: 'Tower Light', ref: 'TL-4', qty: 1, sent_on: null, tag: null, remarks: null, received_by: null, sort: 3 }];
let jseq = 1;
const JOBS = [{ id: 'j1', seq: 1, no: 'JC-000001', status: 'open', store_id: 's2', equipment_id: 'e1', site_equipment_id: null, plate: '74522', make_model: 'Bobcat S650', eq_type: 'Skid steer', driver: 'Ravi',
  in_on: '2026-11-15', in_time: '08:30:00', out_on: null, out_time: null, reading: 1520.5, reading_unit: 'hr', fuel: 50, checks: { tyres: 'ok', brakes: 'bad' },
  oils: [{ type: 'hydraulic', qty: 20 }], filters: [{ type: 'oil', part_no: 'FO-3143', action: 'change' }, { type: 'air', part_no: 'FOA-2579', action: 'clean' }], work: ['routine', 'hydraulic'],
  diagnosis: 'Hydraulic hose leaking', parts: 'Hose 1/2"', final_notes: null, mechanic: 'Mech One', fleet_officer: null, supervisor: null,
  created_by: 'u-mechanic', created_by_name: 'Mech One', created_at: '2026-11-15T05:00:00Z' }];
// the maintenance types and their reminders (25 Nov 2026): REMS kept as the server's trigger keeps ms_reminders
const addD = (d, n) => { const [y, m, dd] = d.split('-').map(Number); return new Date(Date.UTC(y, m - 1, dd + n)).toISOString().slice(0, 10); };
const TYPES = [{ id: 't1', name: 'Quartz 20W-50', kind: 'oil', part: 'diesel_engine', item_id: 'i-OIL-0006', interval_days: 15, active: true, note: null, sort: 0 },
  { id: 't2', name: 'Rimula R4 15W-40', kind: 'oil', part: 'diesel_engine', item_id: null, interval_days: 30, active: true, note: null, sort: 0 },
  { id: 't3', name: 'Air filter', kind: 'filter', part: 'air', item_id: null, interval_days: 60, active: true, note: null, sort: 0 },
  { id: 't4', name: 'Old grease', kind: 'service', part: null, item_id: null, interval_days: 90, active: false, note: null, sort: 0 }];
JOBS[0].maint_types = ['t1'];
const REMS = [{ id: 'r1', job_card_id: 'j1', type_id: 't1', vkey: 'P:74522', label: '74522 · Bobcat S650', done_on: addD(today(), -17), due_on: addD(today(), -2), status: 'open', closed_by_name: null, closed_at: null },
  { id: 'r2', job_card_id: 'j1', type_id: 't3', vkey: 'P:74522', label: '74522 · Bobcat S650', done_on: addD(today(), -50), due_on: addD(today(), 10), status: 'open', closed_by_name: null, closed_at: null }];
JOBS[0].maint_types = ['t1', 't3'];
function syncRem(c) {
  const vk = c.plate ? 'P:' + key(c.plate) : 'J:' + c.id, done = c.out_on || c.in_on, mt = c.maint_types || [];
  for (let i = REMS.length - 1; i >= 0; i--) if (REMS[i].job_card_id === c.id && !mt.includes(REMS[i].type_id)) REMS.splice(i, 1);
  mt.forEach(tid => { const ty = TYPES.find(x => x.id === tid); if (!ty) return; let r = REMS.find(x => x.job_card_id === c.id && x.type_id === tid);
    if (!r) REMS.push(r = { id: 'r' + (++nid), job_card_id: c.id, type_id: tid, status: 'open', closed_by_name: null, closed_at: null });
    Object.assign(r, { vkey: vk, label: [c.plate, c.make_model].filter(Boolean).join(' · '), done_on: done, due_on: addD(done, ty.interval_days) });
    REMS.filter(o => o.job_card_id !== c.id && o.status === 'open' && o.vkey === vk && o.done_on <= done && (o.type_id === tid || (() => { const ot = TYPES.find(x => x.id === o.type_id); return ot && ty.part && ot.kind === ty.kind && ot.part === ty.part; })()))
      .forEach(o => Object.assign(o, { status: 'renewed', closed_by_name: c.no, closed_at: new Date().toISOString() })); });
}
const remList = () => REMS.map(r => { const ty = TYPES.find(x => x.id === r.type_id), j = JOBS.find(x => x.id === r.job_card_id) || {};
  return { ...r, job_no: j.no, type_name: ty.name, kind: ty.kind, part: ty.part, interval_days: ty.interval_days, plate: j.plate || null, store_id: j.store_id || null,
    days_left: Math.round((Date.parse(r.due_on) - Date.parse(today())) / 864e5) }; }).sort((a, b) => (b.status === 'open') - (a.status === 'open') || a.due_on.localeCompare(b.due_on));
const PUSH = [];
const STOCK = new Map();          // store|item → qty
const MOVES = [], LINES = [], LOG = [];
const sk = (s, i) => s + '|' + i, have = (s, i) => STOCK.get(sk(s, i)) || 0;
const codeOf = id => (ITEMS.find(i => i.id === id) || {}).code;
let SEEDING = true;
function post(p) {
  if (!EDIT && !SEEDING) return err('FORBIDDEN');
  const k = p.kind; if (!['receive', 'issue', 'return', 'transfer', 'adjust'].includes(k)) return err('MS_KIND_INVALID');
  const st = STORES.find(s => s.id === p.store_id); if (!st) return err('MS_STORE_REQUIRED'); if (!st.active) return err('MS_STORE_INACTIVE');
  if (k === 'transfer') { if (!p.to_store_id) return err('MS_TO_STORE_REQUIRED'); if (p.to_store_id === p.store_id) return err('MS_SAME_STORE'); if (!(STORES.find(s => s.id === p.to_store_id) || {}).active) return err('MS_STORE_INACTIVE'); }
  const on = p.moved_on || today(); if (on > today()) return err('MS_DATE_FUTURE');
  let plate = null;
  if (k === 'issue' || k === 'return') { if (p.plate) { const f = PLATES.find(x => key(x.plate) === key(p.plate)); if (!f) return err('MS_PLATE_UNKNOWN:' + p.plate); plate = f.plate; }
    if (!plate && !String(p.party || '').trim()) return err('MS_WHO_REQUIRED'); }
  if (!Array.isArray(p.lines) || !p.lines.length) return err('MS_LINES_REQUIRED');
  const S = new Map(STOCK), out = [], seen = new Set();
  const mv = (s, i, d) => { const h = S.get(sk(s, i)) || 0; if (h + d < 0) throw new Error('MS_NOT_ENOUGH:' + codeOf(i) + '|' + h); S.set(sk(s, i), Math.round((h + d) * 100) / 100); return h; };
  try { for (const l of p.lines) {
    const it = ITEMS.find(i => i.id === l.item_id); if (!it) return err('MS_ITEM_UNKNOWN'); if (seen.has(it.id)) return err('MS_ITEM_TWICE:' + it.code); seen.add(it.id);
    let q;
    if (k === 'adjust') { if (!(l.counted >= 0)) return err('MS_COUNT_INVALID:' + it.code); q = Math.round((l.counted - (S.get(sk(st.id, it.id)) || 0)) * 100) / 100; if (q === 0) continue; }
    else { if (!(l.qty > 0)) return err('MS_QTY_INVALID:' + it.code); if ((k === 'receive' || k === 'return') && !it.active) return err('MS_ITEM_INACTIVE:' + it.code); q = (k === 'issue' || k === 'transfer') ? -l.qty : l.qty; }
    const b = mv(st.id, it.id, q); if (k === 'transfer') mv(p.to_store_id, it.id, -q);
    out.push({ item_id: it.id, qty: q, counted: k === 'adjust' ? l.counted : null, before_qty: b }); } }
  catch (e) { return err(e.message); }
  if (!out.length) return err('MS_NOTHING_CHANGED');
  S.forEach((v, kk) => STOCK.set(kk, v));
  seq++; const no = { receive: 'RCV', issue: 'ISS', return: 'RET', transfer: 'TRF', adjust: 'ADJ' }[k] + '-' + String(seq).padStart(6, '0');
  const m = { id: 'm' + (++nid), seq, no, kind: k, store_id: st.id, to_store_id: k === 'transfer' ? p.to_store_id : null, moved_on: on, plate, party: (k === 'transfer' || k === 'adjust') ? null : (p.party || null),
    ref_no: p.ref_no ? String(p.ref_no).toUpperCase() : null, note: p.note || null, status: 'posted', by_name: NAMES[ROLE], at: new Date().toISOString() };
  MOVES.push(m); out.forEach(l => LINES.push({ id: ++nid, move_id: m.id, ...l }));
  return { data: { ok: true, id: m.id, no, lines: out.length } };
}
function voidMove(id, reason) {
  if (!ADMIN) return err('FORBIDDEN'); if (!String(reason || '').trim()) return err('MS_REASON_REQUIRED');
  const m = MOVES.find(x => x.id === id); if (!m) return err('MS_MOVE_UNKNOWN'); if (m.status === 'void') return err('MS_ALREADY_VOID');
  const S = new Map(STOCK);
  try { LINES.filter(l => l.move_id === id).forEach(l => { const a = (S.get(sk(m.store_id, l.item_id)) || 0) - l.qty; if (a < 0) throw new Error('MS_VOID_NOT_ENOUGH:' + codeOf(l.item_id) + '|' + (S.get(sk(m.store_id, l.item_id)) || 0)); S.set(sk(m.store_id, l.item_id), a);
    if (m.to_store_id) S.set(sk(m.to_store_id, l.item_id), (S.get(sk(m.to_store_id, l.item_id)) || 0) + l.qty); }); } catch (e) { return err(e.message); }
  S.forEach((v, kk) => STOCK.set(kk, v)); Object.assign(m, { status: 'void', void_reason: reason, void_by_name: NAMES[ROLE] }); return { data: { ok: true, id, no: m.no } };
}
const stockList = () => ITEMS.map(i => { const by = {}; let tot = 0; STORES.forEach(s => { const q = have(s.id, i.id); if (q) { by[s.id] = q; tot += q; } });
  const lm = MOVES.filter(m => m.status === 'posted' && LINES.some(l => l.move_id === m.id && l.item_id === i.id)).map(m => m.moved_on).sort().pop() || null;
  return { item_id: i.id, code: i.code, name: i.name, category: i.category, filter_type: i.filter_type, part_no: i.part_no, unit: i.unit, min_qty: i.min_qty, shelf: i.shelf, active: i.active, qty: tot, by_store: by, low: i.min_qty > 0 && tot < i.min_qty, last_move: lm }; });
const movesIn = (a, b) => MOVES.filter(m => m.moved_on >= a && m.moved_on <= b).sort((x, y) => y.seq - x.seq).map(m => ({ ...m, lines: LINES.filter(l => l.move_id === m.id).map(l => { const i = ITEMS.find(x => x.id === l.item_id); return { item_id: l.item_id, code: i.code, name: i.name, unit: i.unit, qty: l.qty, counted: l.counted, before: l.before_qty }; }) }));
function history(item) {
  const rows = []; MOVES.forEach(m => LINES.filter(l => l.move_id === m.id && l.item_id === item).forEach(l => { rows.push({ m, st: m.store_id, other: m.to_store_id, qty: l.qty, lid: l.id }); if (m.kind === 'transfer') rows.push({ m, st: m.to_store_id, other: m.store_id, qty: -l.qty, lid: l.id + 0.5 }); }));
  rows.sort((a, b) => a.m.seq - b.m.seq || a.lid - b.lid); const bal = {};
  const out = rows.map(r => { if (r.m.status === 'posted') bal[r.st] = (bal[r.st] || 0) + r.qty; return { move_id: r.m.id, no: r.m.no, kind: r.m.kind, moved_on: r.m.moved_on, store_id: r.st, other_store: r.other, qty: r.qty, balance: bal[r.st] || 0, plate: r.m.plate, party: r.m.party, ref_no: r.m.ref_no, note: r.m.note, status: r.m.status, by_name: r.m.by_name, at: r.m.at }; });
  return out.reverse();
}
// the opening: a count of the main store, an issue to 74522
post.call(null, { kind: 'adjust', store_id: 's1', lines: [{ item_id: 'i-MCH-0001', counted: 4 }, { item_id: 'i-CON-0004', counted: 6 }, { item_id: 'i-OIL-0006', counted: 12 }, { item_id: 'i-FLT-0008', counted: 5 }, { item_id: 'i-FLT-0010', counted: 3 }] });
SEEDING = false;
const SAVED_ROLE = ROLE;
const thenable = (fn) => { const st = {}; const o = { range(a, b) { st.range = [a, b]; return o; }, then(res, rej) { try { const r = fn(); if (r && r.data && Array.isArray(r.data) && st.range) r.data = r.data.slice(st.range[0], st.range[1] + 1); res(r); } catch (e) { (rej || (() => {}))(e); } } }; return o; };
const q = tbl => { const st = { op: 'select', f: [] }; const T = { ms_stores: STORES, ms_items: ITEMS, ms_equipment: EQUIP, ms_fits: FITS, ms_log: LOG, ms_site_equipment: SITE_EQ, ms_job_cards: JOBS, ms_maint_types: TYPES }[tbl] || [];
  const LT = { ms_items: 'item', ms_stores: 'store', ms_site_equipment: 'site_equipment', ms_job_cards: 'job_card' }[tbl] || 'equipment';
  const o = { select() { return o; }, order() { return o; }, eq(k, v) { st.f.push([k, v]); return o; }, range(a, b) { st.range = [a, b]; return o; }, limit() { return o; }, single() { st.single = true; return o; },
    insert(v) { st.op = 'insert'; st.v = { ...v }; return o; }, update(v) { st.op = 'update'; st.v = { ...v }; return o; }, delete() { st.op = 'delete'; return o; },
    then(res, rej) { try {
      window.__calls.push({ tbl, op: st.op, f: st.f, v: st.v });
      if (NO463 && /^ms_/.test(tbl)) return res(notRun);
      const hit = r => st.f.every(([k, v]) => r[k] === v);
      if (st.op === 'select') { if (!READ) return res({ data: [] }); let out = T.filter(hit).map(r => ({ ...r })); if (tbl === 'ms_job_cards') out.sort((a, b) => b.seq - a.seq); if (st.range) out = out.slice(st.range[0], st.range[1] + 1); return res({ data: st.single ? out[0] : out }); }
      const canW = tbl === 'ms_stores' || tbl === 'ms_maint_types' ? ADMIN : tbl === 'ms_job_cards' ? JOB : EDIT;
      if (tbl === 'ms_maint_types' && st.op === 'delete' && canW && T.filter(hit).some(x => REMS.some(r => r.type_id === x.id) || JOBS.some(j => (j.maint_types || []).includes(x.id)))) return res(err('MS_TYPE_IN_USE'));
      if (tbl === 'ms_maint_types' && st.v && st.op !== 'delete' && canW) { const self = st.f[0] ? TYPES.find(x => x.id === st.f[0][1]) : null, nx = { ...(self || {}), ...st.v };
        if (!String(nx.name || '').trim()) return res(err('MS_NAME_REQUIRED')); if (!(nx.interval_days >= 1 && nx.interval_days <= 3650)) return res(err('MS_DAYS_INVALID'));
        if (TYPES.some(x => x !== self && x.name.toLowerCase() === String(nx.name).trim().toLowerCase())) return res(err('MS_TYPE_DUP')); }
      if (tbl === 'ms_job_cards' && st.v && st.v.maint_types && st.op !== 'delete' && st.v.maint_types.some(id => { const x = TYPES.find(y => y.id === id); return !x || !x.active; })
        && !(st.f[0] && st.v.maint_types.every(id => (JOBS.find(j => j.id === st.f[0][1]) || {}).maint_types?.includes(id) || TYPES.find(y => y.id === id)?.active))) return res(err('MS_TYPE_INVALID')); if (!canW || (st.op === 'delete' && !ADMIN)) return res(st.op === 'insert' ? err('new row violates row-level security policy for table "' + tbl + '"') : { data: [] });
      if (tbl === 'ms_items' && st.v && st.v.part_no) { const d = ITEMS.find(i => key(i.part_no) === key(st.v.part_no) && !(st.f[0] && i.id === st.f[0][1])); if (d) return res(err('MS_PART_DUP:' + d.code)); }
      if (tbl === 'ms_items' && st.v && 'name' in st.v && !String(st.v.name || '').trim()) return res(err('MS_NAME_REQUIRED'));
      if (tbl === 'ms_stores' && st.v && st.op !== 'delete') { const self = st.f[0] ? STORES.find(x => x.id === st.f[0][1]) : null, nx = { ...(self || { kind: 'store', active: true }), ...st.v };
        if ('code' in st.v) nx.code = st.v.code ? String(st.v.code).trim().toUpperCase() : null; if (nx.code) st.v.code = nx.code;
        if ((self && self.kind === 'main' && (nx.kind !== 'main' || nx.active === false)) || (!self && nx.kind === 'main')) return res(err('MS_MAIN_STORE'));
        if (STORES.some(x => x !== self && x.name.toLowerCase() === String(nx.name || '').trim().toLowerCase())) return res(err('MS_STORE_DUP'));
        if (nx.code && STORES.some(x => x !== self && x.code && x.code.toUpperCase() === nx.code)) return res(err('MS_STORE_CODE_DUP'));
        if (self && nx.kind === 'project' && self.active && nx.active === false && ITEMS.some(i => have(self.id, i.id) > 0)) return res(err('MS_PROJECT_HAS_STOCK'));
        if (nx.kind === 'project') st.v.closed_on = nx.active === false ? (self && self.closed_on) || today() : null; }
      if (tbl === 'ms_job_cards' && st.op === 'update' && !EDIT) st.f.push(['created_by', ME_ID]);     // a mechanic: his own cards only
      if (tbl === 'ms_job_cards' && st.v && st.op !== 'delete') { const self = st.f[0] ? JOBS.find(x => x.id === st.f[0][1]) : null, nx = { ...(self || {}), ...st.v };
        if (!nx.plate && !nx.make_model && !nx.site_equipment_id && !nx.equipment_id) return res(err('MS_JOB_WHAT_REQUIRED'));
        if (nx.out_on && nx.out_on < nx.in_on) return res(err('MS_OUT_BEFORE_IN'));
        if (st.op === 'insert') Object.assign(st.v, { seq: ++jseq, no: 'JC-' + String(jseq).padStart(6, '0'), created_by: ME_ID, created_by_name: NAMES[ROLE], created_at: new Date().toISOString(), status: st.v.status || 'open' });
        else ['seq', 'no', 'created_by', 'created_by_name', 'created_at'].forEach(k => delete st.v[k]); }
      if (tbl === 'ms_site_equipment' && st.v && st.op !== 'delete' && 'name' in st.v && !String(st.v.name || '').trim()) return res(err('MS_NAME_REQUIRED'));
      if (st.op === 'insert') { const row = { id: 'n' + (++nid), ...(tbl === 'ms_job_cards' || tbl === 'ms_site_equipment' ? {} : { active: true }), ...st.v };
        if (tbl === 'ms_items') { row.name = String(row.name).trim().toUpperCase(); row.code = { machine: 'MCH', tool: 'TOL', consumable: 'CON', oil: 'OIL', filter: 'FLT', spare: 'SPR' }[row.category] + '-' + String(nid).padStart(4, '0'); }
        T.push(row); if (tbl === 'ms_job_cards') syncRem(row); LOG.unshift({ id: ++nid, at: new Date().toISOString(), by_name: NAMES[ROLE], tbl: LT, row_id: row.id, action: 'add', snap: { ...row } }); return res({ data: { ...row } }); }
      if (st.op === 'update') { const l = T.filter(hit); l.forEach(r => { const ch = {}; Object.keys(st.v).forEach(k => { if (r[k] !== st.v[k]) ch[k] = [r[k], st.v[k]]; }); Object.assign(r, st.v);
        if (tbl === 'ms_items') r.name = String(r.name).trim().toUpperCase(); if (tbl === 'ms_job_cards') syncRem(r); LOG.unshift({ id: ++nid, at: new Date().toISOString(), by_name: NAMES[ROLE], tbl: LT, row_id: r.id, action: 'edit', changes: ch, snap: { ...r } }); });
        return res({ data: l.map(r => ({ ...r })) }); }
      if (st.op === 'delete') { const l = T.filter(hit); if (tbl === 'ms_job_cards') l.forEach(j => { for (let i = REMS.length - 1; i >= 0; i--) if (REMS[i].job_card_id === j.id) REMS.splice(i, 1); }); if (tbl === 'ms_items' && l.some(i => LINES.some(x => x.item_id === i.id))) return res(err('MS_ITEM_IN_USE')); l.forEach(r => T.splice(T.indexOf(r), 1)); return res({ data: l.map(r => ({ id: r.id })) }); }
      return res({});
    } catch (e) { (rej || (() => {}))(e); } } }; return o; };
window.__db = { STORES, ITEMS, MOVES, LINES, STOCK, USERS, have, SITE_EQ, JOBS, TYPES, REMS, PUSH };
window.__calls = [];
window.supabase = { createClient: () => ({
  auth: { onAuthStateChange(cb) { setTimeout(() => cb('SIGNED_IN', { user: { id: SAVED_ROLE === 'admin' ? USERS[0].id : 'u-' + SAVED_ROLE } }), 10); }, signOut: async () => { window.__calls.push({ rpc: 'signOut' }); return {}; }, updateUser: async () => ({}), signInWithPassword: async () => ({}) },
  from: t => q(t),
  functions: { invoke: async (name, o) => { window.__calls.push({ fn: name, body: o.body });
    if (name === 'maint-push') return { data: !ADMIN ? { error: 'FORBIDDEN' } : o.body.action === 'key' ? { ok: true, key: 'BNcRdreALRFXTkOOUHK1EtK2wtaz5Ry4YfYCA_0QTpQtUbVlUls0VJXg7A8u-Ts1XbjhazAkj7I99e8QcYP7DkM' } : { ok: true, sent: PUSH.length, failed: 0 }, error: null };
    return { data: adminFn(o.body), error: null }; } },
  rpc: (n, a) => thenable(() => {
    window.__calls.push({ rpc: n, a });
    if (NO463 && /^ms_/.test(n)) return { error: { code: 'PGRST202', message: 'Could not find the function public.' + n + ' in the schema cache' } };
    if (n === 'ms_bootstrap') return { data: { profile: { id: ROLE === 'admin' ? USERS[0].id : 'u-' + ROLE, name: NAMES[ROLE] || 'X', username: ROLE, role: RROLE, active: ACTIVE }, settings: {} } };
    if (n === 'ms_user_list') return ADMIN ? { data: USERS.map(u => ({ ...u })) } : err('FORBIDDEN');
    if (!READ && /^ms_/.test(n) && n !== 'ms_post' && n !== 'ms_void') return { data: [] };
    if (n === 'ms_stock_list') return { data: stockList() };
    if (n === 'ms_plates') return { data: PLATES.map(x => ({ ...x })) };
    if (n === 'ms_history') return { data: history(a.p_item) };
    if (n === 'ms_moves_in') return { data: movesIn(a.p_from, a.p_to).filter(m => !a.p_store || m.store_id === a.p_store || m.to_store_id === a.p_store) };
    if (n === 'ms_store_summary') return { data: STORES.map(s => { const mv = MOVES.filter(m => m.status === 'posted' && (m.store_id === s.id || m.to_store_id === s.id));
      return { store_id: s.id, items: ITEMS.filter(i => have(s.id, i.id) !== 0).length, units: ITEMS.reduce((a, i) => a + have(s.id, i.id), 0), moves: mv.length,
        last_move: mv.map(m => m.moved_on).sort().pop() || null, sent_in: mv.filter(m => m.kind === 'transfer' && m.to_store_id === s.id).length, sent_out: mv.filter(m => m.kind === 'transfer' && m.store_id === s.id).length }; }) };
    if (n === 'ms_stock_check') return { data: [] };
    if (n === 'ms_reminders_list') return { data: remList().filter(r => a.p_all || r.status === 'open') };
    if (n === 'ms_reminder_set') { if (!ADMIN) return err('MS_FORBIDDEN'); const r = REMS.find(x => x.id === a.p_id); if (!r) return err('MS_NOT_FOUND');
      Object.assign(r, { status: a.p_status, closed_by_name: a.p_status === 'open' ? null : NAMES[ROLE], closed_at: a.p_status === 'open' ? null : new Date().toISOString() }); return { data: { ok: true, id: r.id, status: r.status } }; }
    if (n === 'ms_push_save') { if (!ADMIN) return err('MS_FORBIDDEN'); if (!PUSH.some(x => x.endpoint === a.p_endpoint)) PUSH.push({ endpoint: a.p_endpoint, lang: a.p_lang }); return { data: { ok: true } }; }
    if (n === 'ms_push_drop') { const i = PUSH.findIndex(x => x.endpoint === a.p_endpoint); if (i >= 0) PUSH.splice(i, 1); return { data: { ok: true, n: i >= 0 ? 1 : 0 } }; }
    if (n === 'ms_post') return post(a.p);
    if (n === 'ms_void') return voidMove(a.p_id, a.p_reason);
    return { data: null }; }),
}) };
})();
</scr` + `ipt>`;
}
// the page with every script it loads inlined (config set, Supabase mocked)
function build(qs) {
  const P = f => fs.readFileSync(path.join(__dirname, '..', 'public', f), 'utf8');
  const inl = s => '<script>' + s.replace(/<\/script/gi, '<\\/script') + '</scr' + 'ipt>';
  return P('index.html')
    .replace('<script src="theme.js"></script>', inl(P('theme.js')))
    .replace('<script src="config.js"></script>', inl("window.MS_CONFIG={SUPABASE_URL:'https://preview.supabase.co',SUPABASE_ANON_KEY:'preview-anon-key-not-a-real-key-0000',USER_DOMAIN:'orioncc.com'};"))
    .replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/@supabase[^>]+><\/script>/, () => mockScript())
    .replace('<script src="app.js"></script>', () => inl(P('app.js')));
}
module.exports = { build, mockScript };
if (require.main === module) {
  fs.writeFileSync(path.join(__dirname, '..', 'public', '_preview.html'), build());
  console.log('public/_preview.html written — npm run serve, then open /_preview.html?role=admin|storekeeper|mechanic|viewer|stopped (&noschema=1)');
}
