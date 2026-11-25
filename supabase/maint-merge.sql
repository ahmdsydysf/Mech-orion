-- ONE TIME (25 Nov 2026): the oils typed by hand on the job cards («QUARTZ20W-50», «RIDA ENGINE OIL + GREASE», …) merged onto the
-- maintenance types (each type linked to its store oil: 3-seed-types / Maintenance → Types). Run in SQL Editor AFTER schema.sql
-- (section 13) and after the types exist. Each typed name that names a known oil becomes that type (type_id, the name dropped); a
-- name with «GREASE» also ticks the grease type; a name that names nothing known stays as it was. The cards' reminders follow by
-- themselves. Safe to run again. The last result: what is still typed by hand (to add a type for it, or leave it).
with map(pat, code) as (values ('QUARTZ', 'OIL-0009'), ('RIDA', 'OIL-0265'), ('RUBIA', 'OIL-0006'), ('ASICO', 'OIL-0240'), ('COOLANT', 'OIL-0015'),
                               ('SAE40', 'OIL-0003'), ('VENOL', 'OIL-0012'), ('ADNOC', 'OIL-0027'), ('DEX', 'OIL-0018'), ('TEXOL', 'OIL-0018'),
                               ('TRANSMISSION', 'OIL-0018'), ('STEERING', 'OIL-0024')),
     typed as (select j.id, j.oils, j.maint_types from ms_job_cards j
                where exists (select 1 from jsonb_array_elements(j.oils) o where nullif(btrim(coalesce(o->>'note', '')), '') is not null)),
     fixed as (select t.id,
                 (select jsonb_agg(case when m.type_id is null then o else (o - 'note') || jsonb_build_object('type_id', m.type_id) end order by n)
                    from jsonb_array_elements(t.oils) with ordinality as e(o, n)
                    left join lateral (select ty.id type_id from map join ms_items i on i.code = map.code join ms_maint_types ty on ty.item_id = i.id and ty.kind = 'oil'
                                        where ms_key(o->>'note') like '%' || map.pat || '%' order by ty.sort, ty.name limit 1) m on true) oils,
                 t.maint_types || coalesce((select array_agg(distinct ty.id) from jsonb_array_elements(t.oils) o
                                              join ms_items i on i.code = 'OIL-0021' join ms_maint_types ty on ty.item_id = i.id
                                             where ms_key(o->>'note') like '%GREASE%'), '{}') maint_types
                 from typed t)
update ms_job_cards j set oils = f.oils, maint_types = f.maint_types
  from fixed f where f.id = j.id and (f.oils is distinct from j.oils or f.maint_types is distinct from j.maint_types);

select j.no, o->>'type' as oil, o->>'note' as still_typed
  from ms_job_cards j, jsonb_array_elements(j.oils) o
 where nullif(btrim(coalesce(o->>'note', '')), '') is not null order by j.seq;
