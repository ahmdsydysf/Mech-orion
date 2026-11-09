// The database test: supabase/schema.sql and seed.sql in PGlite (real Postgres in Node), Supabase's auth stubbed.
// npm i (devDependencies) then: node tools/db-test.mjs
import { PGlite } from '@electric-sql/pglite';
import { pgcrypto } from '@electric-sql/pglite/contrib/pgcrypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
process.on('unhandledRejection', e => { console.log('FATAL', e.message); process.exit(1); });
export function splitSql(sql) {
  const out = []; let cur = '', i = 0, q = null;
  while (i < sql.length) {
    const c = sql[i], two = sql.slice(i, i + 2);
    if (!q) {
      if (two === '--') { const j = sql.indexOf('\n', i); const e = j < 0 ? sql.length : j; cur += sql.slice(i, e); i = e; continue; }
      if (two === '/*') { const j = sql.indexOf('*/', i + 2); const e = j < 0 ? sql.length : j + 2; cur += sql.slice(i, e); i = e; continue; }
      if (c === "'") { q = "'"; cur += c; i++; continue; }
      if (c === '$') { const m = /^\$[A-Za-z_]*\$/.exec(sql.slice(i)); if (m) { q = m[0]; cur += m[0]; i += m[0].length; continue; } }
      if (c === ';') { if (cur.trim()) out.push(cur); cur = ''; i++; continue; }
      cur += c; i++; continue;
    }
    if (q === "'") { if (two === "''") { cur += two; i += 2; continue; } if (c === "'") q = null; cur += c; i++; continue; }
    if (sql.startsWith(q, i)) { cur += q; i += q.length; q = null; continue; }
    cur += c; i++;
  }
  if (cur.trim()) out.push(cur);
  return out.filter(x => x.replace(/--[^\n]*/g, '').trim());
}


const db = new PGlite({ extensions: { pgcrypto } });
await db.exec(`
create role anon nologin; create role authenticated nologin; create role service_role nologin bypassrls;
create schema auth;
create table auth.users (id uuid primary key, email text, created_at timestamptz default now(), last_sign_in_at timestamptz);
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('test.uid', true), '')::uuid $$;
grant usage on schema auth to anon, authenticated, service_role; grant usage on schema public to anon, authenticated, service_role;
`);
const runFile = async file => { const blk = fs.readFileSync(path.join(ROOT, 'supabase', file), 'utf8'); let last, err = null;
  await as(null); try { for (const s of splitSql(blk)) { const r = await db.query(s); if (r.rows) last = r.rows; } } catch (e) { err = e.message; } return { last, err }; };
const T = []; const check = (n, ok, got) => { T.push(!!ok); console.log((ok ? 'PASS ' : 'FAIL ') + n + (ok ? '' : '  → ' + JSON.stringify(got))); };
const q = async (s, p) => (await db.query(s, p)).rows;
const one = async (s, p) => (await q(s, p))[0];
const U = {};
const mk = async (k, role, name) => { const id = (await one(`select gen_random_uuid() id`)).id; U[k] = id;
  await db.query(`insert into auth.users (id, email) values ($1, $2)`, [id, k.toLowerCase() + '@orioncc.com']);
  await db.query(`insert into profiles (id, name, role) values ($1, $2, $3)`, [id, name, role]); };
const as = async who => { await db.exec(`reset role`); await db.query(`select set_config('test.uid', $1, false), set_config('test.role', $2, false)`, [who ? U[who] : '', who ? 'authenticated' : 'service_role']); if (who) await db.exec('set role authenticated'); };
const run = async (who, s, p) => { await as(who); try { return await q(s, p); } catch (e) { return 'ERR ' + e.message; } };
const val = async (who, s, p) => { const r = await run(who, s, p); return typeof r === 'string' ? r : r[0] && Object.values(r[0])[0]; };
const runBlock = async file => { const blk = fs.readFileSync(REPO + '/database/' + file, 'utf8'); let last, err = null;
  await as(null); try { for (const s of splitSql(blk)) { const r = await db.query(s); if (r.rows) last = r.rows; } } catch (e) { err = e.message; } return { last, err }; };


// ---------- the schema twice ----------
let r1 = await runFile('schema.sql'); let r2 = await runFile('schema.sql');
check('schema.sql runs twice', !r1.err && !r2.err, [r1.err, r2.err]);
for (const [k, r, n] of [['A', 'admin', 'Ali Admin'], ['V', 'viewer', 'The Viewer'], ['K', 'storekeeper', 'Karim Store'], ['C', 'mechanic', 'Mech One'], ['M', 'manager', 'Mona Manager']]) await mk(k, r, n);
await as(null);
check('one main store, not two', (await one(`select count(*)::int n from ms_stores`)).n === 1, null);
await mk('Z', 'mechanic', 'Stopped'); await as(null); await db.exec(`update profiles set active = false where name = 'Stopped'`);
await run(null, `insert into auth.users (id) values ('00000000-0000-0000-0000-0000000000aa')`);
check('a fifth role is refused', /profiles_role_check/.test(await run(null, `insert into profiles (id, name, role) values ('00000000-0000-0000-0000-0000000000aa', 'x', 'boss')`)), null);

// ---------- the seed twice ----------
let s1 = await runFile('seed.sql'); let s2 = await runFile('seed.sql');
check('the seed runs twice', !s1.err && !s2.err, [s1.err, s2.err]);
const cnt = await one(`select (select count(*)::int from ms_items) i, (select count(*)::int from ms_equipment) e, (select count(*)::int from ms_fits) f`);
check('the seed: 232 items, 143 equipment, the filter links — and not twice', cnt.i === 232 && cnt.e === 143 && cnt.f > 500, cnt);
const codes = await one(`select (select code from ms_items where name = 'ANGLE GRINDER 4.5"') a, (select count(*)::int from ms_items where category = 'filter' and code like 'FLT-%') b`);
check('codes by category: MCH-0001 is the first machine, every filter FLT-', codes.a === 'MCH-0001' && codes.b === 170, codes);
const f74522 = await run('C', `select * from ms_filters_for('74522')`);
check('plate 74522 (Bobcat): FO-3143 and FO-57 for oil, the fuel filters', f74522.some(r => r.filter_type === 'oil' && r.part_no === 'FO-3143')
  && f74522.some(r => r.filter_type === 'oil' && r.part_no === 'FO-57') && f74522.some(r => r.filter_type === 'fuel' && r.part_no === 'FF-5200'), f74522);

await as(null); await db.exec(`insert into ms_equipment (grp, plate, name) values ('Cars', 'RAK 1234', 'Pickup')`);
const STORE = (await one(`select id from ms_stores limit 1`)).id;
const id = async code => (await one(`select id from ms_items where code = $1`, [code])).id;
const GR = await id('MCH-0001'); const OIL = (await one(`select id from ms_items where name like 'QUARTZ%'`)).id;
const FO = (await one(`select id from ms_items where part_no = 'FO-3143'`)).id;
const post = (who, p) => val(who, `select ms_post($1::jsonb)`, [JSON.stringify(p)]);

// ---------- who ----------
check('a mechanic reads the items', (await val('C', `select count(*)::int from ms_items`)) === 232, null);
check('a viewer reads, a stopped account reads nothing', (await val('V', `select count(*)::int from ms_items`)) === 232
  && (await val('Z', `select count(*)::int from ms_items`)) === 0, null);
check('a mechanic cannot post', /FORBIDDEN/.test(await post('C', { kind: 'receive', store_id: STORE, lines: [{ item_id: GR, qty: 1 }] })), null);
check('a viewer cannot post', /FORBIDDEN/.test(await post('V', { kind: 'receive', store_id: STORE, lines: [{ item_id: GR, qty: 1 }] })), null);
check('nobody writes ms_stock straight', /row-level security|permission/.test(await run('A', `insert into ms_stock (store_id, item_id, qty) values ($1, $2, 99)`, [STORE, GR])), null);
check('a mechanic cannot add an item', /row-level security/.test(await run('C', `insert into ms_items (name, category) values ('X', 'tool')`)), null);
check('a storekeeper adds an item: code made, name upper, his name stamped',
  /^TOL-\d{4}$/.test(await val('K', `insert into ms_items (name, category, unit) values ('  torque   wrench ', 'tool', 'pcs') returning code`))
  && (await one(`select name, created_by_name from ms_items where name = 'TORQUE WRENCH'`)).created_by_name === 'Karim Store', null);
check('the same part number written another way → MS_PART_DUP:<code>', /MS_PART_DUP:FLT-/.test(await run('K', `insert into ms_items (name, category, part_no) values ('X', 'filter', 'fo 3143')`)), null);
check('a storekeeper cannot add a store; an admin can', /row-level security/.test(await run('K', `insert into ms_stores (name) values ('Site A')`))
  && (await val('A', `insert into ms_stores (name) values (' Site   A ') returning name`)) === 'Site A', null);
const SITE = (await one(`select id from ms_stores where name = 'Site A'`)).id;

// ---------- receive / issue / return / transfer / count ----------
const rc = await post('K', { kind: 'receive', store_id: STORE, party: 'Al Futtaim', ref_no: 'lpo 77', lines: [{ item_id: GR, qty: 5 }, { item_id: OIL, qty: 10 }, { item_id: FO, qty: 8 }] });
check('a receipt: numbered RCV-, three lines', rc && rc.ok && /^RCV-\d{6}$/.test(rc.no) && rc.lines === 3, rc);
const sh = async (it, st = STORE) => Number((await one(`select coalesce((select qty from ms_stock where store_id = $1 and item_id = $2), 0) q`, [st, it])).q);
check('the shelves: 5 grinders, 10 cans, 8 filters', await sh(GR) === 5 && await sh(OIL) === 10 && await sh(FO) === 8, null);
check('an issue with neither plate nor person → MS_WHO_REQUIRED', /MS_WHO_REQUIRED/.test(await post('K', { kind: 'issue', store_id: STORE, lines: [{ item_id: FO, qty: 1 }] })), null);
check('an unknown plate → MS_PLATE_UNKNOWN', /MS_PLATE_UNKNOWN:99999/.test(await post('K', { kind: 'issue', store_id: STORE, plate: '99999', lines: [{ item_id: FO, qty: 1 }] })), null);
check('more than the shelf → MS_NOT_ENOUGH:<code>|8, nothing moved', /MS_NOT_ENOUGH:FLT-\d+\|8/.test(await post('K', { kind: 'issue', store_id: STORE, plate: '74522', lines: [{ item_id: OIL, qty: 1 }, { item_id: FO, qty: 9 }] }))
  && await sh(OIL) === 10 && (await one(`select count(*)::int n from ms_moves`)).n === 1, null);
const is = await post('K', { kind: 'issue', store_id: STORE, plate: 'rak-1234', party: 'Mech One', ref_no: 'JC-5', lines: [{ item_id: FO, qty: 2 }, { item_id: OIL, qty: 1.5 }] });
check('an issue to a plate typed another way: stored as the list writes it', is && is.ok && (await one(`select plate from ms_moves where id = $1`, [is.id])).plate === 'RAK 1234', is);
check('the shelves after the issue: 6 filters, 8.5 cans', await sh(FO) === 6 && await sh(OIL) === 8.5, null);
check('the same item twice in one paper → MS_ITEM_TWICE', /MS_ITEM_TWICE/.test(await post('K', { kind: 'receive', store_id: STORE, lines: [{ item_id: FO, qty: 1 }, { item_id: FO, qty: 1 }] })), null);
check('a date tomorrow → MS_DATE_FUTURE', /MS_DATE_FUTURE/.test(await post('K', { kind: 'receive', store_id: STORE, moved_on: '2099-01-01', lines: [{ item_id: FO, qty: 1 }] })), null);
const rt = await post('K', { kind: 'return', store_id: STORE, party: 'Mech One', lines: [{ item_id: FO, qty: 1 }] });
check('a return puts it back: 7', rt && rt.ok && /^RET-/.test(rt.no) && await sh(FO) === 7, rt);
const tr = await post('K', { kind: 'transfer', store_id: STORE, to_store_id: SITE, lines: [{ item_id: GR, qty: 2 }] });
check('a transfer: 3 here, 2 at Site A', tr && tr.ok && /^TRF-/.test(tr.no) && await sh(GR) === 3 && await sh(GR, SITE) === 2, tr);
check('a transfer to itself → MS_SAME_STORE', /MS_SAME_STORE/.test(await post('K', { kind: 'transfer', store_id: STORE, to_store_id: STORE, lines: [{ item_id: GR, qty: 1 }] })), null);
const ad = await post('K', { kind: 'adjust', store_id: STORE, note: 'monthly count', lines: [{ item_id: FO, counted: 6 }, { item_id: OIL, counted: 8.5 }, { item_id: GR, counted: 4 }] });
check('a count: the filters −1, the oil as the books say (no line), the grinders +1', ad && ad.ok && ad.lines === 2 && await sh(FO) === 6 && await sh(GR) === 4, ad);
const adl = await q(`select l.qty, l.counted, l.before_qty from ms_move_lines l join ms_moves m on m.id = l.move_id where m.no = $1 order by l.id`, [ad.no]);
check('the count keeps what was found and what the books said', Number(adl[0].qty) === -1 && Number(adl[0].counted) === 6 && Number(adl[0].before_qty) === 7, adl);
check('a count where every shelf is right → MS_NOTHING_CHANGED', /MS_NOTHING_CHANGED/.test(await post('K', { kind: 'adjust', store_id: STORE, lines: [{ item_id: FO, counted: 6 }] })), null);

// ---------- cancel ----------
check('a storekeeper cannot cancel', /FORBIDDEN/.test(await val('K', `select ms_void($1, 'x')`, [rc.id])), null);
check('no reason → MS_REASON_REQUIRED', /MS_REASON_REQUIRED/.test(await val('A', `select ms_void($1, '  ')`, [is.id])), null);
check('cancelling the receipt would take the grinders below zero at… no: the oil below zero → refused', /MS_VOID_NOT_ENOUGH/.test(await val('A', `select ms_void($1, 'wrong supplier')`, [rc.id]))
  && await sh(OIL) === 8.5, null);
const vd = await val('A', `select ms_void($1, 'wrong plate')`, [is.id]);
check('cancelling the issue: back on the shelf, struck through, who and why', vd && vd.ok && await sh(FO) === 8 && await sh(OIL) === 10
  && (await one(`select status, void_by_name, void_reason from ms_moves where id = $1`, [is.id])).void_by_name === 'Ali Admin', vd);
check('twice → MS_ALREADY_VOID', /MS_ALREADY_VOID/.test(await val('A', `select ms_void($1, 'again')`, [is.id])), null);
await post('K', { kind: 'issue', store_id: STORE, plate: '74522', party: 'Mech One', lines: [{ item_id: FO, qty: 3 }] });

// ---------- reads ----------
const h = await run('C', `select * from ms_history($1)`, [FO]);
check('the history (a mechanic reads it): newest first, the balance after each, the cancelled line not counted',
  Array.isArray(h) && h.length === 5 && Number(h[0].balance) === 5 && h.find(x => x.status === 'void') && Number(h[h.length - 1].balance) === 8, h);
const hg = await q(`select * from ms_history($1) order by at`, [GR]);
check('a transfer shows twice: out of the main store, into Site A', hg.filter(x => x.kind === 'transfer').length === 2, hg);
const sl = await run('C', `select * from ms_stock_list() where item_id = $1`, [GR]);
check('the stock list: 6 grinders in all, each store its own', Number(sl[0].qty) === 6 && Number(sl[0].by_store[STORE]) === 4 && Number(sl[0].by_store[SITE]) === 2, sl);
await as(null); await db.query(`update ms_items set min_qty = 10 where id = $1`, [FO]);
check('below its minimum → low', (await val('C', `select low from ms_stock_list() where item_id = $1`, [FO])) === true, null);
check('the stock matches its movements (ms_stock_check empty)', (await run('A', `select * from ms_stock_check()`)).length === 0, null);
const mi = await run('V', `select * from ms_moves_in(current_date - 1, current_date)`);
check('the movements of the period (a viewer reads): 6, each with its lines', mi.length === 6 && mi.every(m => Array.isArray(m.lines)), mi.length);
check('ms_plates: the store\'s equipment, once each', (await run('K', `select count(*)::int n from ms_plates() where plate = '74522'`))[0].n === 1, null);

// ---------- deletes and the log ----------
check('an item that moved is never deleted', /MS_ITEM_IN_USE/.test(await run('A', `delete from ms_items where id = $1`, [FO])), null);
check('a store that moved is never deleted', /MS_STORE_IN_USE/.test(await run('A', `delete from ms_stores where id = $1`, [SITE])), null);
check('a storekeeper cannot delete an item', (await run('K', `delete from ms_items where name = 'TORQUE WRENCH' returning id`)).length === 0, null);
check('an admin deletes an unused one', (await run('A', `delete from ms_items where name = 'TORQUE WRENCH' returning id`)).length === 1, null);
await run('K', `update ms_items set shelf = 'a-3' where id = $1`, [GR]);
const lg = await run('C', `select * from ms_log where row_id = $1 and action = 'edit'`, [GR]);
check('the log: the shelf change, old → new, by the storekeeper', lg.length === 1 && lg[0].changes.shelf[1] === 'A-3' && lg[0].by_name === 'Karim Store', lg);
check('a code never changes', (await run('K', `update ms_items set code = 'ZZZ' where id = $1 returning code`, [GR]))[0].code === 'MCH-0001', null);
check('anon reaches nothing', !(await one(`select has_table_privilege('anon', 'public.ms_moves', 'select') x`)).x, null);
check('ms_shelf is internal', !(await one(`select has_function_privilege('authenticated', 'ms_shelf(uuid,uuid,numeric,text)', 'execute') x`)).x, null);


// ---------- accounts ----------
check('a mechanic reads only his own profile', (await val('C', `select count(*)::int from profiles`)) === 1, null);
check('the admin reads every profile', (await val('A', `select count(*)::int from profiles`)) >= 5, null);
check('nobody writes profiles from a page', /row-level security|permission/.test(await run('A', `update profiles set role = 'admin' where name = 'Mech One' returning id`)) || (await run('A', `update profiles set role = 'admin' where name = 'Mech One' returning id`)).length === 0, null);
check('the manager: ms_user_list and ms_admin', Array.isArray(await run('M', `select * from ms_user_list()`)) && /true/.test(JSON.stringify(await run('M', `select ms_admin() as a`))) && /MS_REASON_REQUIRED/.test(await val('M', `select ms_void($1, ' ')`, [is.id])), null);
check('ms_user_list: the admin only', Array.isArray(await run('A', `select * from ms_user_list()`)) && /MS_FORBIDDEN/.test(await run('K', `select * from ms_user_list()`)), null);
check('ms_bootstrap: my profile', (await val('K', `select ms_bootstrap()->'profile'->>'role'`)) === 'storekeeper', null);
check('ms_set_first_admin: refused once an admin exists, and internal', /MS_ADMIN_EXISTS/.test(await run(null, `select ms_set_first_admin('k@orioncc.com', 'x')`))
  && !(await one(`select has_function_privilege('authenticated', 'ms_set_first_admin(text,text)', 'execute') x`)).x, null);

// ---------- the projects (sites): each one a store of its own ----------
check('the main store is marked once, and it is the first', (await one(`select count(*)::int n, min(name) nm from ms_stores where kind = 'main'`)).nm === 'Main store'
  && (await one(`select kind from ms_stores where id = $1`, [STORE])).kind === 'main', null);
check('a second main store → MS_MAIN_STORE', /MS_MAIN_STORE/.test(await run('A', `insert into ms_stores (name, kind) values ('Main two', 'main')`)), null);
check('the main store is never stopped nor made a project', /MS_MAIN_STORE/.test(await run('A', `update ms_stores set active = false where id = $1`, [STORE]))
  && /MS_MAIN_STORE/.test(await run('A', `update ms_stores set kind = 'project' where id = $1`, [STORE])), null);
check('a storekeeper cannot make a project', /row-level security/.test(await run('K', `insert into ms_stores (name, kind) values ('Tower 9', 'project')`)), null);
const P1 = await val('M', `insert into ms_stores (name, kind, code, location, started_on, sort) values (' Al Barsha   Villas ', 'project', ' prj-01 ', ' Dubai ', '2026-11-01', 500) returning id`);
const P2 = await val('A', `insert into ms_stores (name, kind, code, sort) values ('Tower 9', 'project', 'PRJ-02', 500) returning id`);
const pr = await one(`select name, code, location, kind, closed_on from ms_stores where id = $1`, [P1]);
check('a manager makes a project: name and code cleaned, its own store', pr.name === 'Al Barsha Villas' && pr.code === 'PRJ-01' && pr.location === 'Dubai' && pr.kind === 'project' && pr.closed_on === null, pr);
check('the same code another way → MS_STORE_CODE_DUP', /MS_STORE_CODE_DUP/.test(await run('A', `insert into ms_stores (name, kind, code) values ('Other', 'project', 'prj-01')`)), null);
const so = await post('K', { kind: 'transfer', store_id: STORE, to_store_id: P1, lines: [{ item_id: GR, qty: 2 }, { item_id: OIL, qty: 4 }] });
check('materials sent to a project: off the main store, on the project\'s shelves', so && so.ok && /^TRF-/.test(so.no) && await sh(GR) === 2 && await sh(GR, P1) === 2 && await sh(OIL, P1) === 4, so);
check('more than the main store holds → MS_NOT_ENOUGH, nothing sent', /MS_NOT_ENOUGH/.test(await post('K', { kind: 'transfer', store_id: STORE, to_store_id: P1, lines: [{ item_id: GR, qty: 50 }] })) && await sh(GR, P1) === 2, null);
const pp = await post('K', { kind: 'transfer', store_id: P1, to_store_id: P2, lines: [{ item_id: OIL, qty: 1.5 }] });
check('from one project to another', pp && pp.ok && await sh(OIL, P1) === 2.5 && await sh(OIL, P2) === 1.5, pp);
const isP = await post('K', { kind: 'issue', store_id: P1, plate: '74522', party: 'Site mech', lines: [{ item_id: OIL, qty: 0.5 }] });
check('an issue on the site, from the project\'s own store', isP && isP.ok && await sh(OIL, P1) === 2, isP);
check('closing a project that still holds materials → MS_PROJECT_HAS_STOCK', /MS_PROJECT_HAS_STOCK/.test(await run('A', `update ms_stores set active = false where id = $1`, [P1])), null);
const bk = await post('K', { kind: 'transfer', store_id: P1, to_store_id: STORE, lines: [{ item_id: GR, qty: 2 }, { item_id: OIL, qty: 2 }] });
check('everything back to the main store: the project empty', bk && bk.ok && await sh(GR, P1) === 0 && await sh(OIL, P1) === 0 && await sh(GR) === 4, bk);
const cl = await run('A', `update ms_stores set active = false where id = $1 returning closed_on`, [P1]);
check('… then it closes, the day kept', Array.isArray(cl) && cl.length === 1 && cl[0].closed_on !== null, cl);
check('a closed project takes nothing in → MS_STORE_INACTIVE', /MS_STORE_INACTIVE/.test(await post('K', { kind: 'transfer', store_id: STORE, to_store_id: P1, lines: [{ item_id: GR, qty: 1 }] })), null);
check('cancelling the return would refill a closed project → MS_PROJECT_CLOSED, nothing moved', /MS_PROJECT_CLOSED/.test(await val('A', `select ms_void($1, 'oops')`, [bk.id])) && await sh(GR) === 4, null);
const ro = await run('A', `update ms_stores set active = true where id = $1 returning closed_on`, [P1]);
check('a project reopens, its closing day cleared', Array.isArray(ro) && ro[0].closed_on === null, ro);
const sm = await run('V', `select * from ms_store_summary() where store_id in ($1, $2) order by store_id = $1 desc`, [P1, P2]);
check('ms_store_summary (a viewer reads): each project\'s items, units, movements', sm.length === 2 && sm[0].items === 0 && sm[0].moves === 4 && sm[0].sent_in === 1 && sm[0].sent_out === 2
  && sm[1].items === 1 && Number(sm[1].units) === 1.5, sm);
check('the stock still matches its movements', (await run('A', `select * from ms_stock_check()`)).length === 0, null);
check('ms_stock_before_write is internal', !(await one(`select has_function_privilege('authenticated', 'ms_stock_before_write()', 'execute') x`)).x, null);
const r3 = await runFile('schema.sql');
check('schema.sql runs again over the projects: one main, the projects kept', !r3.err && (await one(`select count(*)::int n from ms_stores where kind = 'main'`)).n === 1
  && (await one(`select count(*)::int n from ms_stores where kind = 'project'`)).n === 2, r3.err);

console.log(`\n${T.filter(Boolean).length} of ${T.length} passed`);
process.exit(T.every(Boolean) ? 0 : 1);
