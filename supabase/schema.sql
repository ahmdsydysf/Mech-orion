-- Orion Mechanic Store — the whole database, in one file.
-- Run it in a NEW Supabase project: SQL Editor → paste → Run (Role = postgres). Safe to run again (idempotent).
-- Then run seed.sql (the items, the equipment and its filters), then make the first admin (README, step 4).
--
-- Who: profiles.role — admin (everything, the users too) · manager (everything an admin does, one step below him: he never makes,
-- changes or removes an admin account) · storekeeper (receives, issues, returns, transfers, counts, adds items) ·
-- mechanic (reads the stock and the filters of a plate) · viewer (reads everything, writes nothing). A stopped account (active =
-- false) reads nothing. The accounts are made and changed only by the Edge Function admin-users (service role): a page never
-- writes profiles.

create extension if not exists pgcrypto;

-- ---------- 0. accounts ----------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  username text,
  role text not null default 'mechanic',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- the roles (named, so a re-run of this file replaces it — 'manager' added 1 Nov 2026)
alter table profiles drop constraint if exists profiles_role_check;
alter table profiles add constraint profiles_role_check check (role in ('admin', 'manager', 'storekeeper', 'mechanic', 'viewer'));
alter table profiles enable row level security;
-- no insert / update / delete policy: the Edge Function (service role) writes accounts

-- a plate as stored: upper case, no dot or space at either end, one space inside
create or replace function plate_clean(p text) returns text
language sql immutable set search_path = public as $fn$
  select nullif(regexp_replace(btrim(upper(coalesce(p, '')), ' .'), '[[:space:]]+', ' ', 'g'), '');
$fn$;
-- a plate as compared: no space, dot, dash, underscore or slash
create or replace function plate_key(p text) returns text
language sql immutable set search_path = public as $fn$
  select nullif(upper(regexp_replace(coalesce(p, ''), '[[:space:]._/-]+', '', 'g')), '');
$fn$;

-- the page's first call: who am I
create or replace function ms_bootstrap() returns jsonb
language sql stable security definer set search_path = public as $fn$
  select jsonb_build_object('profile', (select jsonb_build_object('id', p.id, 'name', p.name, 'username', p.username, 'role', p.role, 'active', p.active)
                                          from profiles p where p.id = auth.uid()),
                            'today', (now() at time zone 'Asia/Dubai')::date);
$fn$;

-- the admin's list of accounts, with their last sign-in
create or replace function ms_user_list() returns table(id uuid, name text, username text, role text, active boolean, created_at timestamptz, last_sign_in_at timestamptz)
language plpgsql stable security definer set search_path = public, auth as $fn$
begin
  if not exists (select 1 from profiles me where me.id = auth.uid() and me.role in ('admin', 'manager') and me.active) then raise exception 'MS_FORBIDDEN'; end if;
  return query select p.id, p.name, p.username, p.role, p.active, p.created_at, u.last_sign_in_at
    from profiles p left join auth.users u on u.id = p.id
   order by case p.role when 'admin' then 1 when 'manager' then 2 when 'storekeeper' then 3 when 'mechanic' then 4 else 5 end, lower(p.name);
end $fn$;

-- THE FIRST ADMIN: create the user in Authentication → Users (email = username@your-domain, a password), then run
--   select ms_set_first_admin('admin@orioncc.com', 'Your name');
-- It works only while there is no admin yet; after that the admin makes everyone else from the page.
create or replace function ms_set_first_admin(p_email text, p_name text) returns text
language plpgsql security definer set search_path = public, auth as $fn$
declare u uuid;
begin
  if exists (select 1 from profiles where role = 'admin') then raise exception 'MS_ADMIN_EXISTS'; end if;
  select id into u from auth.users where lower(email) = lower(btrim(p_email));
  if u is null then raise exception 'MS_USER_NOT_FOUND: create the user in Authentication → Users first'; end if;
  insert into profiles (id, name, username, role) values (u, coalesce(nullif(btrim(p_name), ''), split_part(p_email, '@', 1)), lower(split_part(p_email, '@', 1)), 'admin')
  on conflict (id) do update set role = 'admin', active = true, name = excluded.name, updated_at = now();
  return 'ok: ' || p_email || ' is the admin';
end $fn$;

-- ---------- who (the STORED role) ----------
create or replace function ms_editor() returns boolean
language sql stable security definer set search_path = public as $fn$
  select coalesce((select p.role in ('storekeeper', 'manager', 'admin') and p.active from profiles p where p.id = auth.uid()), false);
$fn$;
create or replace function ms_admin() returns boolean
language sql stable security definer set search_path = public as $fn$
  select coalesce((select p.role in ('admin', 'manager') and p.active from profiles p where p.id = auth.uid()), false);
$fn$;
create or replace function ms_reader() returns boolean
language sql stable security definer set search_path = public as $fn$
  select coalesce((select p.role in ('storekeeper', 'mechanic', 'manager', 'admin', 'viewer') and p.active
                     from profiles p where p.id = auth.uid()), false);
$fn$;
-- the name stamped on a row (internal)
create or replace function ms_me_name() returns text
language sql stable security definer set search_path = public as $fn$
  select coalesce((select p.name from profiles p where p.id = auth.uid()), 'SQL');
$fn$;
-- a part number as compared: plate_key's rule (no space, dot, dash, underscore or slash, upper case)
create or replace function ms_key(p text) returns text
language sql immutable set search_path = public as $fn$
  select nullif(upper(regexp_replace(coalesce(p, ''), '[[:space:]._/-]+', '', 'g')), '');
$fn$;
-- a typed text cleaned: trimmed, inner spaces one (internal)
create or replace function ms_clean(p text) returns text
language sql immutable set search_path = public as $fn$
  select nullif(regexp_replace(btrim(coalesce(p, '')), '[[:space:]]+', ' ', 'g'), '');
$fn$;

-- ---------- 1. the stores ----------
create table if not exists ms_stores (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  active boolean not null default true,
  sort int not null default 100,
  note text check (char_length(note) <= 300),
  created_by uuid default auth.uid(),
  created_by_name text,
  created_at timestamptz not null default now(),
  updated_by_name text,
  updated_at timestamptz not null default now()
);
create unique index if not exists ms_stores_name_uq on ms_stores (lower(name));
alter table ms_stores enable row level security;

create or replace function ms_stores_before_write() returns trigger
language plpgsql security definer set search_path = public as $fn$
begin
  new.name := ms_clean(new.name);
  if new.name is null then raise exception 'MS_NAME_REQUIRED'; end if;
  if char_length(new.name) > 80 then raise exception 'MS_NAME_TOO_LONG'; end if;
  if exists (select 1 from ms_stores s where lower(s.name) = lower(new.name) and s.id <> new.id) then raise exception 'MS_STORE_DUP'; end if;
  new.note := ms_clean(new.note);
  if char_length(coalesce(new.note, '')) > 300 then raise exception 'MS_NOTE_TOO_LONG'; end if;
  new.active := coalesce(new.active, true); new.sort := coalesce(new.sort, 100);
  if tg_op = 'INSERT' then
    new.created_by := coalesce(auth.uid(), new.created_by); new.created_by_name := ms_me_name(); new.created_at := now();
  else
    new.created_by := old.created_by; new.created_by_name := old.created_by_name; new.created_at := old.created_at;
  end if;
  new.updated_by_name := ms_me_name(); new.updated_at := now();
  return new;
end $fn$;
drop trigger if exists trg_ms_stores_before on ms_stores;
create trigger trg_ms_stores_before before insert or update on ms_stores for each row execute function ms_stores_before_write();

-- ---------- 2. the items ----------
create sequence if not exists ms_item_code_seq;
create table if not exists ms_items (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  name text not null check (char_length(name) between 1 and 160),
  category text not null check (category in ('machine', 'tool', 'consumable', 'oil', 'filter', 'spare')),
  filter_type text check (filter_type in ('oil', 'fuel', 'air', 'water_sep', 'cabin')),
  part_no text check (char_length(part_no) <= 60),
  unit text not null default 'pcs' check (unit in ('pcs', 'set', 'pair', 'roll', 'box', 'can', 'drum', 'litre', 'kg', 'm')),
  min_qty numeric(12, 2) not null default 0 check (min_qty >= 0),
  shelf text check (char_length(shelf) <= 40),
  active boolean not null default true,
  note text check (char_length(note) <= 300),
  created_by uuid default auth.uid(),
  created_by_name text,
  created_at timestamptz not null default now(),
  updated_by_name text,
  updated_at timestamptz not null default now(),
  check (filter_type is null or category = 'filter')
);
create unique index if not exists ms_items_code_uq on ms_items (upper(code));
create unique index if not exists ms_items_part_uq on ms_items (ms_key(part_no)) where ms_key(part_no) is not null;
create index if not exists ms_items_cat on ms_items (category, name);
alter table ms_items enable row level security;

create or replace function ms_items_before_write() returns trigger
language plpgsql security definer set search_path = public as $fn$
declare v_code text;
begin
  new.name := upper(ms_clean(new.name));
  if new.name is null then raise exception 'MS_NAME_REQUIRED'; end if;
  if char_length(new.name) > 160 then raise exception 'MS_NAME_TOO_LONG'; end if;
  if new.category is null or new.category not in ('machine', 'tool', 'consumable', 'oil', 'filter', 'spare') then raise exception 'MS_CATEGORY_INVALID'; end if;
  new.filter_type := nullif(btrim(coalesce(new.filter_type, '')), '');
  if new.category <> 'filter' then new.filter_type := null;
  elsif new.filter_type is not null and new.filter_type not in ('oil', 'fuel', 'air', 'water_sep', 'cabin') then raise exception 'MS_FILTER_TYPE_INVALID'; end if;
  new.part_no := upper(ms_clean(new.part_no));
  if char_length(coalesce(new.part_no, '')) > 60 then raise exception 'MS_PART_TOO_LONG'; end if;
  if new.part_no is not null then
    select i.code into v_code from ms_items i where ms_key(i.part_no) = ms_key(new.part_no) and i.id <> new.id limit 1;
    if found then raise exception 'MS_PART_DUP:%', v_code; end if;
  end if;
  new.unit := coalesce(nullif(btrim(coalesce(new.unit, '')), ''), 'pcs');
  if new.unit not in ('pcs', 'set', 'pair', 'roll', 'box', 'can', 'drum', 'litre', 'kg', 'm') then raise exception 'MS_UNIT_INVALID'; end if;
  new.min_qty := coalesce(new.min_qty, 0);
  if new.min_qty < 0 then raise exception 'MS_MIN_INVALID'; end if;
  new.shelf := upper(ms_clean(new.shelf));
  if char_length(coalesce(new.shelf, '')) > 40 then raise exception 'MS_SHELF_TOO_LONG'; end if;
  new.note := ms_clean(new.note);
  if char_length(coalesce(new.note, '')) > 300 then raise exception 'MS_NOTE_TOO_LONG'; end if;
  new.active := coalesce(new.active, true);
  if tg_op = 'INSERT' then
    -- the code: the category's three letters and the next number, unless the seed gave one
    new.code := upper(ms_clean(new.code));
    if new.code is null then
      new.code := case new.category when 'machine' then 'MCH' when 'tool' then 'TOL' when 'consumable' then 'CON'
                                    when 'oil' then 'OIL' when 'filter' then 'FLT' else 'SPR' end
                  || '-' || lpad(nextval('ms_item_code_seq')::text, 4, '0');
    end if;
    if exists (select 1 from ms_items i where upper(i.code) = new.code) then raise exception 'MS_CODE_DUP:%', new.code; end if;
    new.created_by := coalesce(auth.uid(), new.created_by); new.created_by_name := ms_me_name(); new.created_at := now();
  else
    new.code := old.code;           -- a code is printed on papers and shelves: it never changes
    new.created_by := old.created_by; new.created_by_name := old.created_by_name; new.created_at := old.created_at;
  end if;
  new.updated_by_name := ms_me_name(); new.updated_at := now();
  return new;
end $fn$;
drop trigger if exists trg_ms_items_before on ms_items;
create trigger trg_ms_items_before before insert or update on ms_items for each row execute function ms_items_before_write();

-- ---------- 3. the stock ----------
create table if not exists ms_stock (
  store_id uuid not null references ms_stores(id) on delete restrict,
  item_id uuid not null references ms_items(id) on delete restrict,
  qty numeric(12, 2) not null default 0 check (qty >= 0),
  updated_at timestamptz not null default now(),
  primary key (store_id, item_id)
);
create index if not exists ms_stock_item on ms_stock (item_id);
alter table ms_stock enable row level security;

-- ---------- 4. the movements ----------
create table if not exists ms_moves (
  id uuid primary key default gen_random_uuid(),
  seq bigint generated always as identity,
  no text not null,
  kind text not null check (kind in ('receive', 'issue', 'return', 'transfer', 'adjust')),
  store_id uuid not null references ms_stores(id) on delete restrict,
  to_store_id uuid references ms_stores(id) on delete restrict,
  moved_on date not null,
  plate text check (char_length(plate) <= 30),
  party text check (char_length(party) <= 120),
  ref_no text check (char_length(ref_no) <= 60),
  note text check (char_length(note) <= 500),
  status text not null default 'posted' check (status in ('posted', 'void')),
  void_reason text check (char_length(void_reason) <= 300),
  void_by uuid,
  void_by_name text,
  void_at timestamptz,
  created_by uuid default auth.uid(),
  created_by_name text,
  created_at timestamptz not null default now(),
  check ((kind = 'transfer') = (to_store_id is not null)),
  check (to_store_id is null or to_store_id <> store_id)
);
create unique index if not exists ms_moves_no_uq on ms_moves (no);
create index if not exists ms_moves_on on ms_moves (moved_on desc, seq desc);
create index if not exists ms_moves_plate on ms_moves (plate_key(plate)) where plate is not null;
alter table ms_moves enable row level security;

create table if not exists ms_move_lines (
  id bigint generated always as identity primary key,
  move_id uuid not null references ms_moves(id) on delete cascade,
  item_id uuid not null references ms_items(id) on delete restrict,
  qty numeric(12, 2) not null check (qty <> 0),   -- what the store gained (+) or lost (−); a transfer's line is its source store's loss
  counted numeric(12, 2) check (counted >= 0),   -- adjust only: what was found on the shelf
  before_qty numeric(12, 2),                     -- the shelf (of move.store_id) just before this line
  note text check (char_length(note) <= 200)
);
create index if not exists ms_move_lines_move on ms_move_lines (move_id);
create index if not exists ms_move_lines_item on ms_move_lines (item_id);
alter table ms_move_lines enable row level security;

-- a shelf moved by delta, locked; refuses to go below zero (internal)
create or replace function ms_shelf(p_store uuid, p_item uuid, p_delta numeric, p_err text) returns numeric
language plpgsql security definer set search_path = public as $fn$
declare v_have numeric;
begin
  insert into ms_stock (store_id, item_id, qty) values (p_store, p_item, 0) on conflict (store_id, item_id) do nothing;
  select s.qty into v_have from ms_stock s where s.store_id = p_store and s.item_id = p_item for update;
  if v_have + p_delta < 0 then
    raise exception '%:%|%', p_err, (select i.code from ms_items i where i.id = p_item), v_have;
  end if;
  update ms_stock set qty = v_have + p_delta, updated_at = now() where store_id = p_store and item_id = p_item;
  return v_have;
end $fn$;

-- POST a movement: {kind, store_id, to_store_id, moved_on, plate, party, ref_no, note, lines: [{item_id, qty | counted, note}]}
-- → {ok, id, no, lines}. All or nothing; errors are raised (MS_*), the page says them in words.
create or replace function ms_post(p jsonb) returns jsonb
language plpgsql security definer set search_path = public as $fn$
declare
  v_kind text := btrim(coalesce(p->>'kind', ''));
  v_store uuid; v_to uuid; v_on date; v_plate text; v_party text; v_ref text; v_note text;
  v_id uuid; v_seq bigint; v_no text; l jsonb; v_item uuid; v_qty numeric; v_cnt numeric; v_have numeric; v_n int := 0;
  v_today date := (now() at time zone 'Asia/Dubai')::date; v_seen uuid[] := '{}';
begin
  if not ms_editor() then raise exception 'FORBIDDEN'; end if;
  if v_kind not in ('receive', 'issue', 'return', 'transfer', 'adjust') then raise exception 'MS_KIND_INVALID'; end if;
  v_store := nullif(p->>'store_id', '')::uuid;
  if v_store is null or not exists (select 1 from ms_stores s where s.id = v_store) then raise exception 'MS_STORE_REQUIRED'; end if;
  if not (select s.active from ms_stores s where s.id = v_store) then raise exception 'MS_STORE_INACTIVE'; end if;
  if v_kind = 'transfer' then
    v_to := nullif(p->>'to_store_id', '')::uuid;
    if v_to is null or not exists (select 1 from ms_stores s where s.id = v_to) then raise exception 'MS_TO_STORE_REQUIRED'; end if;
    if v_to = v_store then raise exception 'MS_SAME_STORE'; end if;
    if not (select s.active from ms_stores s where s.id = v_to) then raise exception 'MS_STORE_INACTIVE'; end if;
  end if;
  v_on := coalesce(nullif(p->>'moved_on', '')::date, v_today);
  if v_on > v_today then raise exception 'MS_DATE_FUTURE'; end if;
  if v_on < date '2020-01-01' then raise exception 'MS_DATE_OLD'; end if;
  v_party := ms_clean(p->>'party'); v_ref := upper(ms_clean(p->>'ref_no')); v_note := ms_clean(p->>'note');
  if char_length(coalesce(v_party, '')) > 120 then raise exception 'MS_PARTY_TOO_LONG'; end if;
  if char_length(coalesce(v_ref, '')) > 60 then raise exception 'MS_REF_TOO_LONG'; end if;
  if char_length(coalesce(v_note, '')) > 500 then raise exception 'MS_NOTE_TOO_LONG'; end if;
  -- the plate: issue / return only, picked from the lists, stored as the list writes it
  if v_kind in ('issue', 'return') then
    v_plate := plate_clean(p->>'plate');
    if v_plate is not null then
      v_plate := ms_plate_find(v_plate);
      if v_plate is null then raise exception 'MS_PLATE_UNKNOWN:%', plate_clean(p->>'plate'); end if;
    end if;
    if v_plate is null and v_party is null then raise exception 'MS_WHO_REQUIRED'; end if;   -- to whom / from whom
  end if;
  if jsonb_typeof(p->'lines') is distinct from 'array' or jsonb_array_length(p->'lines') = 0 then raise exception 'MS_LINES_REQUIRED'; end if;
  if jsonb_array_length(p->'lines') > 200 then raise exception 'MS_TOO_MANY_LINES'; end if;

  select nextval(pg_get_serial_sequence('ms_moves', 'seq')) into v_seq;
  v_no := case v_kind when 'receive' then 'RCV' when 'issue' then 'ISS' when 'return' then 'RET' when 'transfer' then 'TRF' else 'ADJ' end
          || '-' || lpad(v_seq::text, 6, '0');
  insert into ms_moves (id, seq, no, kind, store_id, to_store_id, moved_on, plate, party, ref_no, note, created_by, created_by_name)
  overriding system value
  values (gen_random_uuid(), v_seq, v_no, v_kind, v_store, v_to, v_on, v_plate, v_party, v_ref, v_note, auth.uid(), ms_me_name())
  returning id into v_id;

  for l in select * from jsonb_array_elements(p->'lines') loop
    v_item := nullif(l->>'item_id', '')::uuid;
    if v_item is null or not exists (select 1 from ms_items i where i.id = v_item) then raise exception 'MS_ITEM_UNKNOWN'; end if;
    if v_item = any(v_seen) then raise exception 'MS_ITEM_TWICE:%', (select i.code from ms_items i where i.id = v_item); end if;
    v_seen := v_seen || v_item;
    if v_kind = 'adjust' then
      v_cnt := round((l->>'counted')::numeric, 2);
      if v_cnt is null or v_cnt < 0 then raise exception 'MS_COUNT_INVALID:%', (select i.code from ms_items i where i.id = v_item); end if;
      select coalesce((select s.qty from ms_stock s where s.store_id = v_store and s.item_id = v_item), 0) into v_have;
      v_qty := v_cnt - v_have;
      if v_qty = 0 then continue; end if;            -- found as the books say: nothing moves
    else
      v_qty := round((l->>'qty')::numeric, 2);
      if v_qty is null or v_qty <= 0 or v_qty > 1000000 then raise exception 'MS_QTY_INVALID:%', (select i.code from ms_items i where i.id = v_item); end if;
      -- a stopped item may still leave the shelf; it takes nothing new in
      if v_kind in ('receive', 'return') and not (select i.active from ms_items i where i.id = v_item) then
        raise exception 'MS_ITEM_INACTIVE:%', (select i.code from ms_items i where i.id = v_item);
      end if;
      if v_kind in ('issue', 'transfer') then v_qty := -v_qty; end if;
    end if;
    v_have := ms_shelf(v_store, v_item, v_qty, 'MS_NOT_ENOUGH');
    if v_kind = 'transfer' then perform ms_shelf(v_to, v_item, -v_qty, 'MS_NOT_ENOUGH'); end if;
    insert into ms_move_lines (move_id, item_id, qty, counted, before_qty, note)
    values (v_id, v_item, v_qty, case when v_kind = 'adjust' then v_cnt end, v_have, left(ms_clean(l->>'note'), 200));
    v_n := v_n + 1;
  end loop;
  if v_n = 0 then raise exception 'MS_NOTHING_CHANGED'; end if;   -- a count where every shelf was right
  return jsonb_build_object('ok', true, 'id', v_id, 'no', v_no, 'lines', v_n);
end $fn$;

-- CANCEL a movement: reversed on the shelves, kept struck through (ms_admin; a reason is required)
create or replace function ms_void(p_id uuid, p_reason text) returns jsonb
language plpgsql security definer set search_path = public as $fn$
declare m ms_moves; l record; v_reason text := ms_clean(p_reason);
begin
  if not ms_admin() then raise exception 'FORBIDDEN'; end if;
  if v_reason is null then raise exception 'MS_REASON_REQUIRED'; end if;
  if char_length(v_reason) > 300 then raise exception 'MS_REASON_TOO_LONG'; end if;
  select * into m from ms_moves where id = p_id for update;
  if not found then raise exception 'MS_MOVE_UNKNOWN'; end if;
  if m.status = 'void' then raise exception 'MS_ALREADY_VOID'; end if;
  for l in select * from ms_move_lines where move_id = p_id order by id loop
    perform ms_shelf(m.store_id, l.item_id, -l.qty, 'MS_VOID_NOT_ENOUGH');
    if m.kind = 'transfer' then perform ms_shelf(m.to_store_id, l.item_id, l.qty, 'MS_VOID_NOT_ENOUGH'); end if;
  end loop;
  update ms_moves set status = 'void', void_reason = v_reason, void_by = auth.uid(), void_by_name = ms_me_name(), void_at = now() where id = p_id;
  return jsonb_build_object('ok', true, 'id', p_id, 'no', m.no);
end $fn$;

-- ---------- 5. the equipment and its filters ----------
create table if not exists ms_equipment (
  id uuid primary key default gen_random_uuid(),
  grp text not null check (char_length(grp) between 1 and 60),    -- Bobcat, JCB, Bus, Generator …
  plate text check (char_length(plate) <= 30),                   -- null for a model line («Bobcat (old model)», «GEN-05»)
  name text check (char_length(name) <= 80),
  active boolean not null default true,
  note text check (char_length(note) <= 300),
  created_at timestamptz not null default now(),
  updated_by_name text,
  updated_at timestamptz not null default now(),
  check (plate is not null or name is not null)
);
create unique index if not exists ms_equipment_uq on ms_equipment (lower(grp), coalesce(plate_key(plate), ''), lower(coalesce(name, '')));
alter table ms_equipment enable row level security;

create table if not exists ms_fits (
  equipment_id uuid not null references ms_equipment(id) on delete cascade,
  filter_type text not null check (filter_type in ('oil', 'fuel', 'air', 'water_sep', 'cabin')),
  item_id uuid not null references ms_items(id) on delete cascade,
  primary key (equipment_id, filter_type, item_id)
);
create index if not exists ms_fits_item on ms_fits (item_id);
alter table ms_fits enable row level security;

create or replace function ms_equipment_before_write() returns trigger
language plpgsql security definer set search_path = public as $fn$
begin
  new.grp := ms_clean(new.grp); new.plate := plate_clean(new.plate); new.name := ms_clean(new.name); new.note := ms_clean(new.note);
  if new.grp is null then raise exception 'MS_GROUP_REQUIRED'; end if;
  if new.plate is null and new.name is null then raise exception 'MS_PLATE_OR_NAME_REQUIRED'; end if;
  new.active := coalesce(new.active, true);
  if tg_op = 'UPDATE' then new.created_at := old.created_at; end if;
  new.updated_by_name := ms_me_name(); new.updated_at := now();
  return new;
end $fn$;
drop trigger if exists trg_ms_equipment_before on ms_equipment;
create trigger trg_ms_equipment_before before insert or update on ms_equipment for each row execute function ms_equipment_before_write();

-- the vehicles an issue / a return may name: the store's own equipment list, one spelling per plate_key
create or replace function ms_plates() returns table(plate text, src text, info text)
language sql stable security definer set search_path = public as $fn$
  select distinct on (plate_key(e.plate)) e.plate, 'store'::text, nullif(concat_ws(' · ', e.grp, e.name), '')
    from ms_equipment e
   where ms_reader() and e.active and plate_key(e.plate) is not null
   order by plate_key(e.plate), e.plate;
$fn$;
-- the spelling a typed plate is stored under, or null (internal)
create or replace function ms_plate_find(p text) returns text
language sql stable security definer set search_path = public as $fn$
  select e.plate from ms_equipment e where e.plate is not null and plate_key(e.plate) = plate_key(p) order by e.plate limit 1;
$fn$;

-- the filters a plate (or an equipment line) takes, each with what the store holds of it
create or replace function ms_filters_for(p_plate text default null, p_equipment uuid default null)
returns table(equipment_id uuid, grp text, plate text, name text, filter_type text, item_id uuid, code text, part_no text, item_name text, qty numeric)
language sql stable security definer set search_path = public as $fn$
  select e.id, e.grp, e.plate, e.name, f.filter_type, i.id, i.code, i.part_no, i.name,
         coalesce((select sum(s.qty) from ms_stock s where s.item_id = i.id), 0)
    from ms_equipment e join ms_fits f on f.equipment_id = e.id join ms_items i on i.id = f.item_id
   where ms_reader()
     and ((p_equipment is not null and e.id = p_equipment) or (p_plate is not null and plate_key(e.plate) = plate_key(p_plate)))
   order by e.grp, e.plate, array_position(array['oil', 'fuel', 'water_sep', 'air', 'cabin'], f.filter_type), i.part_no;
$fn$;

-- ---------- 6. the log (items, stores, equipment) ----------
create table if not exists ms_log (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  by_id uuid default auth.uid(),
  by_name text,
  by_role text,
  tbl text not null check (tbl in ('item', 'store', 'equipment')),
  row_id uuid,
  action text not null check (action in ('add', 'edit', 'delete')),
  changes jsonb,
  snap jsonb
);
create index if not exists ms_log_at on ms_log (at desc);
create index if not exists ms_log_row on ms_log (row_id, at desc);
alter table ms_log enable row level security;

create or replace function ms_log_row() returns trigger
language plpgsql security definer set search_path = public as $fn$
declare o jsonb; n jsonb; ch jsonb := '{}'::jsonb; k text;
        v_tbl text := case tg_table_name when 'ms_items' then 'item' when 'ms_stores' then 'store' else 'equipment' end;
        v_role text := (select p.role from profiles p where p.id = auth.uid());
        v_skip text[] := array['updated_at', 'updated_by_name', 'created_at', 'created_by', 'created_by_name'];
begin
  if tg_op = 'INSERT' then
    insert into ms_log (by_id, by_name, by_role, tbl, row_id, action, snap) values (auth.uid(), ms_me_name(), v_role, v_tbl, new.id, 'add', to_jsonb(new) - 'created_by');
    return null;
  end if;
  if tg_op = 'DELETE' then
    insert into ms_log (by_id, by_name, by_role, tbl, row_id, action, snap) values (auth.uid(), ms_me_name(), v_role, v_tbl, old.id, 'delete', to_jsonb(old) - 'created_by');
    return null;
  end if;
  o := to_jsonb(old); n := to_jsonb(new);
  for k in select jsonb_object_keys(n) loop
    if not (k = any(v_skip)) and (o->k) is distinct from (n->k) then ch := ch || jsonb_build_object(k, jsonb_build_array(o->k, n->k)); end if;
  end loop;
  if ch <> '{}'::jsonb then
    insert into ms_log (by_id, by_name, by_role, tbl, row_id, action, changes, snap) values (auth.uid(), ms_me_name(), v_role, v_tbl, new.id, 'edit', ch, n - 'created_by');
  end if;
  return null;
end $fn$;
drop trigger if exists trg_ms_items_log on ms_items;
create trigger trg_ms_items_log after insert or update or delete on ms_items for each row execute function ms_log_row();
drop trigger if exists trg_ms_stores_log on ms_stores;
create trigger trg_ms_stores_log after insert or update or delete on ms_stores for each row execute function ms_log_row();
drop trigger if exists trg_ms_equipment_log on ms_equipment;
create trigger trg_ms_equipment_log after insert or update or delete on ms_equipment for each row execute function ms_log_row();

-- an item / a store that ever moved stays: stop it instead
create or replace function ms_before_delete() returns trigger
language plpgsql security definer set search_path = public as $fn$
begin
  if tg_table_name = 'ms_items' then
    if exists (select 1 from ms_move_lines l where l.item_id = old.id) or exists (select 1 from ms_stock s where s.item_id = old.id and s.qty <> 0) then
      raise exception 'MS_ITEM_IN_USE'; end if;
    delete from ms_stock where item_id = old.id;
  else
    if exists (select 1 from ms_moves m where m.store_id = old.id or m.to_store_id = old.id)
       or exists (select 1 from ms_stock s where s.store_id = old.id and s.qty <> 0) then raise exception 'MS_STORE_IN_USE'; end if;
    delete from ms_stock where store_id = old.id;
  end if;
  return old;
end $fn$;
drop trigger if exists trg_ms_items_before_delete on ms_items;
create trigger trg_ms_items_before_delete before delete on ms_items for each row execute function ms_before_delete();
drop trigger if exists trg_ms_stores_before_delete on ms_stores;
create trigger trg_ms_stores_before_delete before delete on ms_stores for each row execute function ms_before_delete();

-- ---------- 7. who reads, who writes ----------
-- items and equipment: the editors write straight (RLS), the admins delete; stores: the admins; stock / moves / lines: read only
-- (ms_post / ms_void write them); the log: written by the triggers, read by the readers (the superadmin's rows his alone)
drop policy if exists "ms stores read" on ms_stores;
create policy "ms stores read" on ms_stores for select to authenticated using ((select ms_reader()));
drop policy if exists "ms stores insert" on ms_stores;
create policy "ms stores insert" on ms_stores for insert to authenticated with check ((select ms_admin()));
drop policy if exists "ms stores update" on ms_stores;
create policy "ms stores update" on ms_stores for update to authenticated using ((select ms_admin())) with check ((select ms_admin()));
drop policy if exists "ms stores delete" on ms_stores;
create policy "ms stores delete" on ms_stores for delete to authenticated using ((select ms_admin()));

drop policy if exists "ms items read" on ms_items;
create policy "ms items read" on ms_items for select to authenticated using ((select ms_reader()));
drop policy if exists "ms items insert" on ms_items;
create policy "ms items insert" on ms_items for insert to authenticated with check ((select ms_editor()));
drop policy if exists "ms items update" on ms_items;
create policy "ms items update" on ms_items for update to authenticated using ((select ms_editor())) with check ((select ms_editor()));
drop policy if exists "ms items delete" on ms_items;
create policy "ms items delete" on ms_items for delete to authenticated using ((select ms_admin()));

drop policy if exists "ms equipment read" on ms_equipment;
create policy "ms equipment read" on ms_equipment for select to authenticated using ((select ms_reader()));
drop policy if exists "ms equipment insert" on ms_equipment;
create policy "ms equipment insert" on ms_equipment for insert to authenticated with check ((select ms_editor()));
drop policy if exists "ms equipment update" on ms_equipment;
create policy "ms equipment update" on ms_equipment for update to authenticated using ((select ms_editor())) with check ((select ms_editor()));
drop policy if exists "ms equipment delete" on ms_equipment;
create policy "ms equipment delete" on ms_equipment for delete to authenticated using ((select ms_admin()));
drop policy if exists "ms fits read" on ms_fits;
create policy "ms fits read" on ms_fits for select to authenticated using ((select ms_reader()));
drop policy if exists "ms fits insert" on ms_fits;
create policy "ms fits insert" on ms_fits for insert to authenticated with check ((select ms_editor()));
drop policy if exists "ms fits delete" on ms_fits;
create policy "ms fits delete" on ms_fits for delete to authenticated using ((select ms_editor()));

drop policy if exists "ms stock read" on ms_stock;
create policy "ms stock read" on ms_stock for select to authenticated using ((select ms_reader()));
drop policy if exists "ms moves read" on ms_moves;
create policy "ms moves read" on ms_moves for select to authenticated using ((select ms_reader()));
drop policy if exists "ms move lines read" on ms_move_lines;
create policy "ms move lines read" on ms_move_lines for select to authenticated using ((select ms_reader()));
drop policy if exists "ms log read" on ms_log;
create policy "ms log read" on ms_log for select to authenticated
  using ((select ms_reader()) and true);

-- ---------- 8. reads ----------
-- an item a row: the total, each store's quantity, below its minimum
create or replace function ms_stock_list(p_store uuid default null)
returns table(item_id uuid, code text, name text, category text, filter_type text, part_no text, unit text, min_qty numeric, shelf text,
              active boolean, qty numeric, by_store jsonb, low boolean, last_move date)
language sql stable security definer set search_path = public as $fn$
  select i.id, i.code, i.name, i.category, i.filter_type, i.part_no, i.unit, i.min_qty, i.shelf, i.active,
         coalesce(t.qty, 0), coalesce(t.by_store, '{}'::jsonb),
         i.min_qty > 0 and coalesce(t.qty, 0) < i.min_qty,
         (select max(m.moved_on) from ms_move_lines l join ms_moves m on m.id = l.move_id and m.status = 'posted'
           where l.item_id = i.id and (p_store is null or m.store_id = p_store or m.to_store_id = p_store))
    from ms_items i
    left join lateral (select sum(s.qty) as qty, jsonb_object_agg(s.store_id, s.qty) filter (where s.qty <> 0) as by_store
                         from ms_stock s where s.item_id = i.id and (p_store is null or s.store_id = p_store)) t on true
   where ms_reader()
   order by array_position(array['machine', 'tool', 'consumable', 'oil', 'filter', 'spare'], i.category), i.name;
$fn$;

-- one item's history: each line (a transfer twice: out of one store, into the other) with the balance of that store after it
create or replace function ms_history(p_item uuid, p_store uuid default null, p_from date default null, p_to date default null)
returns table(move_id uuid, no text, kind text, moved_on date, store_id uuid, other_store uuid, qty numeric, balance numeric,
              plate text, party text, ref_no text, note text, status text, by_name text, at timestamptz)
language sql stable security definer set search_path = public as $fn$
  with x as (
    select m.id, m.no, m.kind, m.moved_on, m.store_id as st, m.to_store_id as other, l.qty, m.plate, m.party, m.ref_no,
           coalesce(l.note, m.note) as note, m.status, m.created_by_name, m.created_at, m.seq, l.id as lid
      from ms_move_lines l join ms_moves m on m.id = l.move_id where l.item_id = p_item
    union all
    select m.id, m.no, m.kind, m.moved_on, m.to_store_id, m.store_id, -l.qty, m.plate, m.party, m.ref_no,
           coalesce(l.note, m.note), m.status, m.created_by_name, m.created_at, m.seq, l.id
      from ms_move_lines l join ms_moves m on m.id = l.move_id where l.item_id = p_item and m.kind = 'transfer'
  ), b as (
    select x.*, sum(case when x.status = 'posted' then x.qty else 0 end)
                  over (partition by x.st order by x.seq, x.lid rows unbounded preceding) as bal
      from x
  )
  select b.id, b.no, b.kind, b.moved_on, b.st, b.other, b.qty, b.bal, b.plate, b.party, b.ref_no, b.note, b.status, b.created_by_name, b.created_at
    from b
   where ms_reader() and (p_store is null or b.st = p_store)
     and (p_from is null or b.moved_on >= p_from) and (p_to is null or b.moved_on <= p_to)
   order by b.seq desc, b.lid desc;
$fn$;

-- the movements of a period (the «movements» screen and its paper), each with its lines
create or replace function ms_moves_in(p_from date, p_to date, p_kind text default null, p_store uuid default null, p_plate text default null)
returns table(id uuid, no text, kind text, moved_on date, store_id uuid, to_store_id uuid, plate text, party text, ref_no text, note text,
              status text, void_reason text, void_by_name text, by_name text, at timestamptz, lines jsonb)
language sql stable security definer set search_path = public as $fn$
  select m.id, m.no, m.kind, m.moved_on, m.store_id, m.to_store_id, m.plate, m.party, m.ref_no, m.note, m.status, m.void_reason,
         m.void_by_name, m.created_by_name, m.created_at,
         (select jsonb_agg(jsonb_build_object('item_id', l.item_id, 'code', i.code, 'name', i.name, 'unit', i.unit, 'qty', l.qty,
                                              'counted', l.counted, 'before', l.before_qty, 'note', l.note) order by l.id)
            from ms_move_lines l join ms_items i on i.id = l.item_id where l.move_id = m.id)
    from ms_moves m
   where ms_reader() and m.moved_on between p_from and p_to
     and (p_kind is null or m.kind = p_kind)
     and (p_store is null or m.store_id = p_store or m.to_store_id = p_store)
     and (p_plate is null or plate_key(m.plate) = plate_key(p_plate))
   order by m.moved_on desc, m.seq desc;
$fn$;

-- the stock against its movements: a row per shelf where they differ (none = all is well)
create or replace function ms_stock_check() returns table(store_id uuid, item_id uuid, code text, stock numeric, moves numeric)
language sql stable security definer set search_path = public as $fn$
  with mv as (
    select m.store_id as st, l.item_id, sum(l.qty) as q from ms_move_lines l join ms_moves m on m.id = l.move_id and m.status = 'posted' group by 1, 2
    union all
    select m.to_store_id, l.item_id, -sum(l.qty) from ms_move_lines l join ms_moves m on m.id = l.move_id and m.status = 'posted' and m.kind = 'transfer' group by 1, 2
  ), t as (select st, item_id, sum(q) as q from mv group by 1, 2)
  select coalesce(s.store_id, t.st), coalesce(s.item_id, t.item_id), i.code, coalesce(s.qty, 0), coalesce(t.q, 0)
    from ms_stock s full join t on t.st = s.store_id and t.item_id = s.item_id
    join ms_items i on i.id = coalesce(s.item_id, t.item_id)
   where ms_reader() and coalesce(s.qty, 0) <> coalesce(t.q, 0);
$fn$;

-- ---------- 9. the main store ----------
insert into ms_stores (name, sort) select 'Main store', 1 where not exists (select 1 from ms_stores);


-- profiles: one's own row, the admin every row (ms_admin is security definer, so no policy recursion)
drop policy if exists "profiles read" on profiles;
create policy "profiles read" on profiles for select to authenticated using (id = (select auth.uid()) or (select ms_admin()));

-- ---------- grants: signed-in accounts through RLS and the functions; anon nothing ----------
revoke all on all tables in schema public from anon;
revoke all on all sequences in schema public from anon;
grant select, insert, update, delete on profiles, ms_stores, ms_items, ms_stock, ms_moves, ms_move_lines, ms_equipment, ms_fits, ms_log to authenticated, service_role;
grant usage, select on all sequences in schema public to authenticated, service_role;
alter default privileges in schema public revoke all on tables from anon;
alter default privileges in schema public revoke execute on functions from public, anon;
revoke execute on all functions in schema public from public, anon;
grant execute on all functions in schema public to authenticated, service_role;
-- internal: only the triggers and the other functions call these
do $do$ declare f text; begin
  foreach f in array array['ms_set_first_admin(text,text)', 'ms_me_name()', 'ms_clean(text)', 'ms_shelf(uuid,uuid,numeric,text)',
    'ms_plate_find(text)', 'ms_stores_before_write()', 'ms_items_before_write()', 'ms_equipment_before_write()', 'ms_log_row()',
    'ms_before_delete()', 'ms_moves_before_write()', 'ms_fits_before_write()'] loop
    if to_regprocedure(f) is not null then execute format('revoke execute on function %s from authenticated', f); end if;
  end loop;
end $do$;

notify pgrst, 'reload schema';

-- the last result: what is in it now
select 'stores' as item, (select count(*) from ms_stores)::text as n
union all select 'items', (select count(*) from ms_items)::text
union all select 'equipment', (select count(*) from ms_equipment)::text
union all select 'filter links', (select count(*) from ms_fits)::text
union all select 'accounts', (select count(*) from profiles)::text
union all select 'admins', (select count(*) from profiles where role = 'admin')::text
union all select 'managers', (select count(*) from profiles where role = 'manager')::text;

-- ---------- 10. the projects (sites): each one a store of its own (9 Nov 2026) ----------
-- The owner: «اضافة مواقع sites (projects) ولكل مشروع store خاص بيه و التحكم في ارسال مواد للمشروع هذا او نقل منه لاخر او الرجوع للmain store».
-- ms_stores.kind: 'main' (one, never stopped, never another kind) · 'store' (another warehouse) · 'project' (a site and its store).
-- Materials go out to a project, from one project to another and back to the main store as a transfer (ms_post kind 'transfer',
-- numbered TRF-, all or nothing, never below zero); the page names the route from the two stores' kinds. A project is closed
-- (active = false) only with its shelves empty — everything returned or moved first — and a closed project takes nothing in
-- (ms_post says MS_STORE_INACTIVE; a cancel that would put stock back into it says MS_PROJECT_CLOSED). Admins / managers make,
-- edit, close and reopen projects (the stores' RLS); the storekeepers move the materials.
alter table ms_stores add column if not exists kind text not null default 'store';
alter table ms_stores drop constraint if exists ms_stores_kind_check;
alter table ms_stores add constraint ms_stores_kind_check check (kind in ('main', 'store', 'project'));
alter table ms_stores add column if not exists code text;
alter table ms_stores add column if not exists location text;
alter table ms_stores add column if not exists started_on date;
alter table ms_stores add column if not exists closed_on date;
create unique index if not exists ms_stores_main_uq on ms_stores ((true)) where kind = 'main';
create unique index if not exists ms_stores_code_uq on ms_stores (upper(code)) where code is not null;
create index if not exists ms_stores_kind on ms_stores (kind, sort, name);

create or replace function ms_stores_before_write() returns trigger
language plpgsql security definer set search_path = public as $fn$
begin
  new.name := ms_clean(new.name);
  if new.name is null then raise exception 'MS_NAME_REQUIRED'; end if;
  if char_length(new.name) > 80 then raise exception 'MS_NAME_TOO_LONG'; end if;
  if exists (select 1 from ms_stores s where lower(s.name) = lower(new.name) and s.id <> new.id) then raise exception 'MS_STORE_DUP'; end if;
  new.note := ms_clean(new.note);
  if char_length(coalesce(new.note, '')) > 300 then raise exception 'MS_NOTE_TOO_LONG'; end if;
  new.active := coalesce(new.active, true); new.sort := coalesce(new.sort, 100);
  -- the kind: one main store, always open, always the main
  new.kind := coalesce(nullif(btrim(coalesce(new.kind, '')), ''), 'store');
  if new.kind not in ('main', 'store', 'project') then raise exception 'MS_STORE_KIND_INVALID'; end if;
  if tg_op = 'UPDATE' and old.kind = 'main' and new.kind <> 'main' then raise exception 'MS_MAIN_STORE'; end if;
  if new.kind = 'main' and exists (select 1 from ms_stores s where s.kind = 'main' and s.id <> new.id) then raise exception 'MS_MAIN_STORE'; end if;
  if new.kind = 'main' and not new.active then raise exception 'MS_MAIN_STORE'; end if;
  -- the code (a project's short name on papers), the location
  new.code := upper(ms_clean(new.code));
  if char_length(coalesce(new.code, '')) > 20 then raise exception 'MS_CODE_TOO_LONG'; end if;
  if new.code is not null and exists (select 1 from ms_stores s where upper(s.code) = new.code and s.id <> new.id) then raise exception 'MS_STORE_CODE_DUP'; end if;
  new.location := ms_clean(new.location);
  if char_length(coalesce(new.location, '')) > 120 then raise exception 'MS_LOCATION_TOO_LONG'; end if;
  -- a project closes with its shelves empty; the day it closed is kept until it reopens
  if new.kind = 'project' then
    if not new.active and (tg_op = 'INSERT' or old.active or old.kind <> 'project')
       and exists (select 1 from ms_stock s where s.store_id = new.id and s.qty <> 0) then raise exception 'MS_PROJECT_HAS_STOCK'; end if;
    new.closed_on := case when new.active then null
                          when tg_op = 'UPDATE' and not old.active and old.closed_on is not null then old.closed_on
                          else (now() at time zone 'Asia/Dubai')::date end;
  else
    new.started_on := null; new.closed_on := null;
  end if;
  if tg_op = 'INSERT' then
    new.created_by := coalesce(auth.uid(), new.created_by); new.created_by_name := ms_me_name(); new.created_at := now();
  else
    new.created_by := old.created_by; new.created_by_name := old.created_by_name; new.created_at := old.created_at;
  end if;
  new.updated_by_name := ms_me_name(); new.updated_at := now();
  return new;
end $fn$;
drop trigger if exists trg_ms_stores_before on ms_stores;
create trigger trg_ms_stores_before before insert or update on ms_stores for each row execute function ms_stores_before_write();

-- the main store: the first one (the «Main store» section 9 makes), once
update ms_stores set kind = 'main'
 where id = (select s.id from ms_stores s where s.active order by s.sort, s.created_at limit 1)
   and not exists (select 1 from ms_stores s where s.kind = 'main');

-- a closed project takes nothing in, whoever moves the shelf (ms_post checks first; this also stops a cancel) (internal)
create or replace function ms_stock_before_write() returns trigger
language plpgsql security definer set search_path = public as $fn$
begin
  if new.qty > coalesce(case when tg_op = 'UPDATE' then old.qty end, 0)
     and exists (select 1 from ms_stores s where s.id = new.store_id and s.kind = 'project' and not s.active) then
    raise exception 'MS_PROJECT_CLOSED';
  end if;
  return new;
end $fn$;
drop trigger if exists trg_ms_stock_before on ms_stock;
create trigger trg_ms_stock_before before insert or update on ms_stock for each row execute function ms_stock_before_write();

-- each store (a project above all) in a row: how many items it holds, how many units, its movements, the last one
create or replace function ms_store_summary()
returns table(store_id uuid, items int, units numeric, moves int, last_move date, sent_in int, sent_out int)
language sql stable security definer set search_path = public as $fn$
  select s.id,
         (select count(*)::int from ms_stock k where k.store_id = s.id and k.qty <> 0),
         coalesce((select sum(k.qty) from ms_stock k where k.store_id = s.id), 0),
         (select count(*)::int from ms_moves m where m.status = 'posted' and (m.store_id = s.id or m.to_store_id = s.id)),
         (select max(m.moved_on) from ms_moves m where m.status = 'posted' and (m.store_id = s.id or m.to_store_id = s.id)),
         (select count(*)::int from ms_moves m where m.status = 'posted' and m.kind = 'transfer' and m.to_store_id = s.id),
         (select count(*)::int from ms_moves m where m.status = 'posted' and m.kind = 'transfer' and m.store_id = s.id)
    from ms_stores s
   where ms_reader()
   order by s.sort, s.name;
$fn$;

grant execute on function ms_store_summary() to authenticated, service_role;
revoke execute on function ms_store_summary() from public, anon;
revoke execute on function ms_stock_before_write() from public, anon, authenticated;
revoke execute on function ms_stores_before_write() from public, anon, authenticated;
notify pgrst, 'reload schema';

select 'main store' as item, (select name from ms_stores where kind = 'main') as n
union all select 'projects', (select count(*) from ms_stores where kind = 'project')::text
union all select 'open projects', (select count(*) from ms_stores where kind = 'project' and active)::text;
