-- Orion Mechanic Store — the equipment at the sites, from the owner's sheet «SITE EQUIPMENT UPDATED 2026.xlsx».
-- Made by tools/equipment-import.py — do not edit by hand; run the script again on a newer sheet.
-- Run it AFTER schema.sql (SQL Editor → paste → Run). Safe to run again: a site is made once (by its code), a line once (src).
-- 26 sites, 759 lines: rak270 30, rak261 38, rak267 81, rak260 37, rak242 34, RAK248 31, RAK249 23, RAK254 31, RAK246 20, RAK266 81, VIP VILLA RAK247 27, EXPRO RAK257 28, RAK250 26, RAK269 15, BOSKALIS262 19, WELDING WORKSHOP 5, DXB DUBAI SITE 75, SUNREEF264 60, KHALBA SH0011 33, RAK273 19, ASHOK LINE 1, RAK274 17, MARJANRAK275 22, AL GHAIL LABOR CAMP 1, RAK271 3, VAID MAINTENANCE 2

-- the sites, each a project (a store of kind 'project') — an existing store with the same code or name is used as it is
insert into ms_stores (name, kind, code, sort) select 'Al Ghail RAK270 - FreeZone', 'project', 'RAK270', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK270' or lower(name) = lower('Al Ghail RAK270 - FreeZone'));
insert into ms_stores (name, kind, code, sort) select 'Al Ghail RAK-261', 'project', 'RAK261', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK261' or lower(name) = lower('Al Ghail RAK-261'));
insert into ms_stores (name, kind, code, sort) select 'Al Ghail RAK267', 'project', 'RAK267', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK267' or lower(name) = lower('Al Ghail RAK267'));
insert into ms_stores (name, kind, code, sort) select 'Rakez RAK260', 'project', 'RAK260', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK260' or lower(name) = lower('Rakez RAK260'));
insert into ms_stores (name, kind, code, sort) select 'Rakez Central RAK242', 'project', 'RAK242', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK242' or lower(name) = lower('Rakez Central RAK242'));
insert into ms_stores (name, kind, code, sort) select 'Rakez RAK248', 'project', 'RAK248', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK248' or lower(name) = lower('Rakez RAK248'));
insert into ms_stores (name, kind, code, sort) select 'Rakez RAK249', 'project', 'RAK249', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK249' or lower(name) = lower('Rakez RAK249'));
insert into ms_stores (name, kind, code, sort) select 'Rakez RAK254', 'project', 'RAK254', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK254' or lower(name) = lower('Rakez RAK254'));
insert into ms_stores (name, kind, code, sort) select 'Sobha RAK246', 'project', 'RAK246', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK246' or lower(name) = lower('Sobha RAK246'));
insert into ms_stores (name, kind, code, sort) select 'Al Ghail RAK266', 'project', 'RAK266', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK266' or lower(name) = lower('Al Ghail RAK266'));
insert into ms_stores (name, kind, code, sort) select 'VIP Villa RAK247', 'project', 'RAK247', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK247' or lower(name) = lower('VIP Villa RAK247'));
insert into ms_stores (name, kind, code, sort) select 'XPRO RAK257', 'project', 'RAK257', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK257' or lower(name) = lower('XPRO RAK257'));
insert into ms_stores (name, kind, code, sort) select 'RAK-250', 'project', 'RAK250', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK250' or lower(name) = lower('RAK-250'));
insert into ms_stores (name, kind, code, sort) select 'RAK269', 'project', 'RAK269', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK269' or lower(name) = lower('RAK269'));
insert into ms_stores (name, kind, code, sort) select 'Boskalis RAK262', 'project', 'RAK262', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK262' or lower(name) = lower('Boskalis RAK262'));
insert into ms_stores (name, kind, code, sort) select 'Welding Workshop', 'project', 'WELDING', 500 where not exists (select 1 from ms_stores where upper(code) = 'WELDING' or lower(name) = lower('Welding Workshop'));
insert into ms_stores (name, kind, code, sort) select 'Dubai Site - Mudon School', 'project', 'DXB', 500 where not exists (select 1 from ms_stores where upper(code) = 'DXB' or lower(name) = lower('Dubai Site - Mudon School'));
insert into ms_stores (name, kind, code, sort) select 'Sunreef RAK-264', 'project', 'RAK264', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK264' or lower(name) = lower('Sunreef RAK-264'));
insert into ms_stores (name, kind, code, sort) select 'Khalba SH0011', 'project', 'SH0011', 500 where not exists (select 1 from ms_stores where upper(code) = 'SH0011' or lower(name) = lower('Khalba SH0011'));
insert into ms_stores (name, kind, code, sort) select 'RAK273', 'project', 'RAK273', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK273' or lower(name) = lower('RAK273'));
insert into ms_stores (name, kind, code, sort) select 'Ashok Line', 'project', 'ASHOK', 500 where not exists (select 1 from ms_stores where upper(code) = 'ASHOK' or lower(name) = lower('Ashok Line'));
insert into ms_stores (name, kind, code, sort) select 'RAK274', 'project', 'RAK274', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK274' or lower(name) = lower('RAK274'));
insert into ms_stores (name, kind, code, sort) select 'Marjan RAK275', 'project', 'RAK275', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK275' or lower(name) = lower('Marjan RAK275'));
insert into ms_stores (name, kind, code, sort) select 'Al Ghail Labor Camp', 'project', 'AG-CAMP', 500 where not exists (select 1 from ms_stores where upper(code) = 'AG-CAMP' or lower(name) = lower('Al Ghail Labor Camp'));
insert into ms_stores (name, kind, code, sort) select 'RAK271', 'project', 'RAK271', 500 where not exists (select 1 from ms_stores where upper(code) = 'RAK271' or lower(name) = lower('RAK271'));
insert into ms_stores (name, kind, code, sort) select 'Vaid Maintenance', 'project', 'VAID', 500 where not exists (select 1 from ms_stores where upper(code) = 'VAID' or lower(name) = lower('Vaid Maintenance'));

-- rak270 → RAK270: 30 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    ('civil', 'AIR BLOWER EXTRA', null, 1, '2026-05-24', null, null, null, 'rak270!B3', 2003),
    ('civil', 'grinder 9"', null, 2, '2026-06-21', null, null, null, 'rak270!B5', 2005),
    ('civil', 'grinder 4.5"', null, 1, '2026-06-21', null, null, null, 'rak270!B7', 2007),
    ('civil', 'vibrator', null, 1, '2026-04-06', 'new', null, null, 'rak270!B8', 2008),
    ('civil', 'jackhammer medium', null, 1, '2026-04-06', 'new', null, null, 'rak270!B9', 2009),
    ('civil', 'plate compactor', null, 1, '2026-04-06', 'new', null, null, 'rak270!B10', 2010),
    ('civil', 'grinder 4"', null, 2, '2026-04-06', 'new', null, null, 'rak270!B11', 2011),
    ('civil', 'grinder 9"', null, 2, '2026-04-06', 'new', null, null, 'rak270!B12', 2012),
    ('civil', 'electric drill', null, 1, '2026-04-06', 'new', null, null, 'rak270!B13', 2013),
    ('civil', 'ply cutter/circular saw', null, 2, '2026-04-06', 'new', null, null, 'rak270!B14', 2014),
    ('civil', 'ply cutter/circular saw', null, 1, '2026-04-23', 'new', null, null, 'rak270!B15', 2015),
    ('civil', 'wooden drill', null, 2, '2026-04-23', 'new', null, null, 'rak270!B16', 2016),
    ('civil', 'grinder 9"', null, 1, '2026-04-23', 'new', null, null, 'rak270!B17', 2017),
    ('civil', 'wooden drill', null, 1, '2026-06-30', 'extra', null, null, 'rak270!B18', 2018),
    ('civil', 'towerlight', null, 1, '2026-07-05', 'extra', null, null, 'rak270!B19', 2019),
    ('civil', 'medium jackhammer', null, 1, '2026-07-08', 'extra', null, null, 'rak270!B20', 2020),
    ('civil', 'plate compactor', null, 2, null, null, null, null, 'rak270!B21', 2021),
    ('civil', 'vibrator', null, 1, null, null, null, null, 'rak270!B22', 2022),
    ('civil', 'medium jackhammer(wulF)', null, 2, '2026-08-25', 'new', null, null, 'rak270!B23', 2023),
    ('civil', 'plate compactor', null, 1, '2026-08-25', 'extra', null, null, 'rak270!B24', 2024),
    ('civil', 'generator-10', null, null, '2026-09-02', 'extra', null, null, 'rak270!B25', 2025),
    ('civil', 'vibrator', null, 1, '2026-09-14', 'extra', null, null, 'rak270!B26', 2026),
    ('civil', 'concrete drill/flat bit', null, 1, '2026-09-20', 'extra', null, null, 'rak270!B27', 2027),
    ('civil', 'medium jackhammer(wulf)', null, 1, '2026-10-21', 'new', null, null, 'rak270!B28', 2028),
    ('mep', 'concrete dill/mep', null, 1, '2026-07-16', 'extra', null, null, 'rak270!B34', 2034),
    ('mep', 'small jackhammer/mep', null, 1, '2026-07-16', 'extra', null, null, 'rak270!B35', 2035),
    ('mep', 'GRINDER 9"(WULF)', null, 1, '2026-11-05', 'new', null, null, 'rak270!B36', 2036),
    ('mep', 'GRINDER 4.5"(DCK)', null, 1, '2026-11-05', 'new', null, null, 'rak270!B37', 2037),
    ('mep', 'IMPACT RILL(WULF)', null, 2, '2026-11-05', 'new', null, null, 'rak270!B38', 2038),
    ('mep', 'CONCRETE DRILL(PROTOOL)', null, 2, '2026-11-05', 'new', null, null, 'rak270!B39', 2039)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK270' or lower(name) = lower('Al Ghail RAK270 - FreeZone')
              order by upper(code) = 'RAK270' desc nulls last limit 1) s
on conflict (src) do nothing;

-- rak261 → RAK261: 38 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'Air Blower', null, 2, null, null, null, null, 'rak261!C3', 3),
    (null, 'Air Compressor-Blue', null, 1, null, null, null, null, 'rak261!C4', 4),
    (null, 'Baby Roller', null, 1, null, 'returned', null, null, 'rak261!C5', 5),
    (null, 'Big Jack Hammer', null, 1, null, null, null, null, 'rak261!C6', 6),
    (null, 'Small Jack Hammer', null, 6, null, null, null, null, 'rak261!C7', 7),
    (null, 'Concrete Drill Machine', null, 2, null, null, null, null, 'rak261!C9', 9),
    (null, 'Wooden Drill Machine', null, 2, null, null, null, null, 'rak261!C10', 10),
    (null, 'Drill Mixer Machine', null, 1, null, null, null, null, 'rak261!C12', 12),
    (null, 'Generator', 'Genesis', 2, null, 'rent', null, null, 'rak261!C14', 14),
    (null, 'Generator', '110kv', 1, null, null, 'Orion', null, 'rak261!C15', 15),
    (null, 'Generator', '28', 1, null, null, null, null, 'rak261!C16', 16),
    (null, 'Generator', '165kv', 1, null, null, null, null, 'rak261!C17', 17),
    (null, 'Generator', '12', 1, null, null, null, null, 'rak261!C18', 18),
    (null, 'Small Generator', null, 1, null, null, null, null, 'rak261!C19', 19),
    (null, 'Grinder 4"', null, 8, null, null, null, null, 'rak261!C20', 20),
    (null, 'Grinder 9"', null, 2, null, null, null, null, 'rak261!C21', 21),
    (null, 'Jig saw Machine', null, 2, null, 'returned', null, null, 'rak261!C22', 22),
    (null, 'Plate Compactor', null, 3, null, 'returned', null, null, 'rak261!C23', 23),
    (null, 'Ply Wood Cutter', null, 3, null, null, null, null, 'rak261!C24', 24),
    (null, 'Power Floor', null, 2, null, null, null, null, 'rak261!C25', 25),
    (null, 'Steel Bending Machine', null, 3, null, 'balance', null, null, 'rak261!C27', 27),
    (null, 'Steel Cutting Machine', null, 2, null, 'balance', null, null, 'rak261!C28', 28),
    (null, 'Vibrator petrol', null, 1, null, 'returned', null, null, 'rak261!C29', 29),
    (null, 'Vibrator Electric', null, 2, null, null, null, null, 'rak261!C30', 30),
    (null, 'Exhaush Fan', null, 1, null, null, null, null, 'rak261!C31', 31),
    (null, 'Floor Cutter Machine', null, 1, null, null, null, null, 'rak261!C33', 33),
    (null, 'Table Cutter', null, 1, null, null, null, null, 'rak261!C35', 35),
    (null, 'Screw Tighter', null, 1, null, null, null, null, 'rak261!C37', 37),
    (null, 'Tower Light', null, 1, null, null, null, null, 'rak261!C38', 38),
    (null, 'Chain Saw', null, 1, null, null, null, null, 'rak261!C40', 40),
    (null, 'Man Lift Trolley', null, 1, '2026-03-24', null, null, null, 'rak261!C41', 41),
    (null, 'grove cutting machine', null, 2, null, 'returned', null, null, 'rak261!C42', 42),
    (null, 'generator small', null, 3, '2026-04-21', 'new', null, null, 'rak261!C43', 43),
    (null, 'mixer drill', null, 1, '2026-04-07', 'extra', null, null, 'rak261!C44', 44),
    (null, 'generator 3kv', null, 3, '2026-04-08', 'new', null, null, 'rak261!C45', 45),
    (null, 'generator 10kv', null, 1, '2026-04-08', 'new', null, null, 'rak261!C46', 46),
    (null, 'air compresor(vakson)', null, 1, '2026-06-29', 'new', null, null, 'rak261!C47', 47),
    (null, 'driver baby roller(0601)', null, 1, '2026-09-02', null, null, null, 'rak261!C48', 48)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK261' or lower(name) = lower('Al Ghail RAK-261')
              order by upper(code) = 'RAK261' desc nulls last limit 1) s
on conflict (src) do nothing;

-- rak267 → RAK267: 81 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    ('civil', 'Steel Bending Machine', null, 3, '2025-12-16', null, null, null, 'rak267!B3', 2003),
    ('civil', 'Steel Cutting Machine', null, 3, '2025-12-16', null, null, null, 'rak267!B4', 2004),
    ('civil', 'Generator - 165kv', null, 1, null, null, null, null, 'rak267!B5', 2005),
    ('civil', 'Generator-275kv', null, 1, '2025-12-17', null, null, null, 'rak267!B6', 2006),
    ('civil', 'Ply Wood Cutter', null, 2, null, null, null, null, 'rak267!B7', 2007),
    ('civil', 'Jig saw', null, 1, null, null, null, null, 'rak267!B8', 2008),
    ('civil', 'Grinder 9"', null, 1, null, null, null, null, 'rak267!B9', 2009),
    ('civil', 'Vibrator', null, 1, null, null, null, null, 'rak267!B10', 2010),
    ('civil', 'Plate Compactor', null, 1, null, null, null, null, 'rak267!B11', 2011),
    ('civil', 'Jack Hammer', null, 1, null, null, null, null, 'rak267!B12', 2012),
    ('civil', 'Tower Light-0099', null, 1, '2026-03-06', null, null, null, 'rak267!B13', 2013),
    ('civil', 'Air Compressor-RED', null, 1, '2026-03-12', null, null, null, 'rak267!B14', 2014),
    ('civil', 'Ply Wood Cutter', null, 1, '2026-03-16', null, null, null, 'rak267!B15', 2015),
    ('civil', 'Vibrator', null, 2, '2026-03-16', null, null, null, 'rak267!B16', 2016),
    ('civil', 'wooden drill', null, 2, '2026-04-12', 'new', null, null, 'rak267!B17', 2017),
    ('civil', 'concrete drill', null, 1, '2026-04-30', 'extra', null, null, 'rak267!B18', 2018),
    ('civil', 'GRINDER 9"', null, 2, '2026-05-24', 'new', null, null, 'rak267!B19', 2019),
    ('civil', 'concrete drill', null, 2, '2026-05-24', 'new', null, null, 'rak267!B20', 2020),
    ('civil', 'steel bending machine', null, 1, '2026-06-01', 'new', null, null, 'rak267!B21', 2021),
    ('civil', 'GRINDER 9"/makita', null, 2, '2026-06-01', 'new', null, null, 'rak267!B22', 2022),
    ('civil', 'jigsaw', null, 1, '2026-06-01', 'new', null, null, 'rak267!B23', 2023),
    ('civil', 'jackhammer big', null, 1, '2026-06-08', 'new', null, null, 'rak267!B24', 2024),
    ('civil', 'jackhammer medium', null, 2, '2026-06-08', 'new', null, null, 'rak267!B25', 2025),
    ('civil', 'jackhammer medium', null, 2, '2026-06-22', 'new', null, null, 'rak267!B26', 2026),
    ('civil', 'grinder 4.5', null, 1, '2026-06-22', 'new', null, null, 'rak267!B27', 2027),
    ('civil', 'GRINDER 9"', null, 1, '2026-06-23', 'new', null, null, 'rak267!B28', 2028),
    ('civil', 'grinder 9"', null, 2, '2026-06-30', 'new', null, null, 'rak267!B29', 2029),
    ('civil', 'generator-11 110kva', null, 1, '2026-06-30', 'new', null, null, 'rak267!B30', 2030),
    ('civil', 'ply cutter/circular saw(ford)', null, 1, '2026-06-30', 'new', null, null, 'rak267!B31', 2031),
    ('civil', 'ply cutter/circular saw(ford)', null, 1, '2026-07-03', 'new', null, null, 'rak267!B32', 2032),
    ('civil', 'steel bending machine', null, 1, '2026-07-03', 'extra', null, null, 'rak267!B33', 2033),
    ('civil', 'grinder 4"', null, 1, '2026-07-08', 'extra', null, null, 'rak267!B34', 2034),
    ('civil', 'olympian generator', null, 1, '2026-07-20', null, null, null, 'rak267!B35', 2035),
    ('civil', 'GRINDER 9"', null, 1, '2026-07-08', 'new', null, null, 'rak267!B36', 2036),
    ('civil', 'GRINDER 9"', null, 1, '2026-07-08', 'extra', null, null, 'rak267!B37', 2037),
    ('civil', 'medium jackhammer', null, 1, '2026-07-30', 'new', null, null, 'rak267!B38', 2038),
    ('civil', 'SMALL JACKHAMMER', null, 1, '2026-08-05', 'extra', null, null, 'rak267!B39', 2039),
    ('civil', 'MEDIUM JACKHAMMER', null, 1, '2026-08-05', 'extra', null, null, 'rak267!B40', 2040),
    ('civil', 'air compressor', null, 1, '2026-08-10', 'extra', null, null, 'rak267!B41', 2041),
    ('civil', 'stand fan', null, 3, '2026-08-21', 'new', null, null, 'rak267!B42', 2042),
    ('civil', 'stand fan', null, 2, '2026-08-28', 'new', null, null, 'rak267!B43', 2043),
    ('civil', 'concrete vibraor with needle', null, 1, '2026-08-28', 'new', null, null, 'rak267!B44', 2044),
    ('civil', 'exhaustfan', null, 1, '2026-08-28', 'extra', null, null, 'rak267!B45', 2045),
    ('civil', 'generator65kva(fg wilson)', null, 1, '2026-09-07', 'new', null, null, 'rak267!B46', 2046),
    ('civil', 'BIG JACKHAMMER', null, 2, '2026-09-10', 'extra', null, null, 'rak267!B47', 2047),
    ('civil', 'VIBRETOR', null, 1, '2026-09-10', 'extra', null, null, 'rak267!B48', 2048),
    ('civil', 'grinder 4.5"(DCK)', null, 2, '2026-09-16', 'new', null, null, 'rak267!B49', 2049),
    ('civil', 'CONCRETE DRILL', null, 2, '2026-09-16', 'extra', null, null, 'rak267!B50', 2050),
    ('civil', 'SMALL JACKHAMMER', null, 2, '2026-10-01', 'extra', null, null, 'rak267!B51', 2051),
    ('civil', 'ply cutter', null, 1, '2026-10-05', 'extra', null, null, 'rak267!B52', 2052),
    ('civil', 'baby roller(blue)', null, 1, '2026-10-13', 'extra', null, null, 'rak267!B53', 2053),
    ('civil', 'BIG JACKHAMMER(wulf)', null, 2, '2026-11-13', 'new', null, null, 'rak267!B54', 2054),
    ('civil', 'grinder 9"(wulf)', null, 3, '2026-11-13', 'new', null, null, 'rak267!B55', 2055),
    ('mep', 'GRINDER 4''', null, 1, '2026-05-08', 'new', null, null, 'rak267!K3', 11003),
    ('mep', 'GRINDER 4''', null, 2, '2026-06-10', null, null, null, 'rak267!K4', 11004),
    ('mep', 'jackhammer medium', null, 2, '2026-06-10', null, null, null, 'rak267!K5', 11005),
    ('mep', 'concrete drill', null, 1, '2026-06-10', 'new', null, null, 'rak267!K6', 11006),
    ('mep', 'CONCRETE DRILL', null, 2, '2026-06-18', null, 'EXTRA/goutam', null, 'rak267!K7', 11007),
    ('mep', 'heat gun', null, 1, '2026-06-10', null, null, null, 'rak267!K8', 11008),
    ('mep', 'grinder 4.5(dck)', null, 2, '2026-07-23', 'new', null, null, 'rak267!K9', 11009),
    ('mep', 'medium jackhammer', null, 2, '2026-07-30', 'new', null, null, 'rak267!K10', 11010),
    ('mep', 'grinder 4" new', null, 2, '2026-05-07', null, null, null, 'rak267!K11', 11011),
    ('mep', 'grinder 9 "ford', null, 2, '2026-06-30', null, null, null, 'rak267!K12', 11012),
    ('mep', 'concrete cutting disc', null, 1, '2026-06-30', null, null, null, 'rak267!K13', 11013),
    ('mep', 'GRINDER 9"', null, 2, '2026-06-30', null, null, null, 'rak267!K14', 11014),
    ('mep', 'concrete drill (DCK)', null, 1, '2026-08-17', 'new', null, null, 'rak267!K15', 11015),
    ('mep', 'medium jackhammer', null, 2, '2026-08-24', 'new', null, null, 'rak267!K16', 11016),
    ('mep', 'medium jackhammer', null, 2, '2026-08-30', 'new', null, null, 'rak267!K17', 11017),
    ('mep', 'GRINDER 9"(WULF)', null, 2, '2026-08-30', 'new', null, null, 'rak267!K18', 11018),
    ('mep', 'CONCRETE DRILL(dck)', null, 1, '2026-08-30', 'new', null, null, 'rak267!K19', 11019),
    ('mep', 'GRINDER 4.5(dck)', null, 1, '2026-08-30', 'new', null, null, 'rak267!K20', 11020),
    ('mep', 'IMPACT DRILL(WULF)', null, 3, '2026-08-30', 'new', null, null, 'rak267!K21', 11021),
    ('mep', 'medium jackhammer(wulf)', null, 3, '2026-09-09', null, 'new(eng.sharif)', null, 'rak267!K22', 11022),
    ('mep', 'titener drill(wulf)', null, 3, '2026-09-14', 'new', null, null, 'rak267!K23', 11023),
    ('mep', 'concrete drill', null, 1, '2026-09-14', 'extra', null, null, 'rak267!K24', 11024),
    ('mep', 'grinder 4.5"', null, 1, '2026-09-14', 'extra', null, null, 'rak267!K25', 11025),
    ('mep', 'grinder 4.5"(DCK)', null, 3, '2026-09-16', 'new', null, null, 'rak267!K26', 11026),
    ('mep', 'concrete drill', null, 2, '2026-09-16', 'extra', null, null, 'rak267!K27', 11027),
    ('mep', 'concrete drill(hkk)', null, 1, '2026-10-05', null, 'new/gulam', null, 'rak267!K28', 11028),
    ('mep', 'heat gun(hkk)', null, 1, '2026-11-03', 'new', null, null, 'rak267!K29', 11029),
    ('mep', 'pipe joint machine', null, 1, '2026-11-06', null, 'new/gulam', null, 'rak267!K30', 11030)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK267' or lower(name) = lower('Al Ghail RAK267')
              order by upper(code) = 'RAK267' desc nulls last limit 1) s
on conflict (src) do nothing;

-- rak260 → RAK260: 37 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'Air Blower', null, 2, null, null, null, null, 'rak260!C3', 3),
    (null, 'Baby Roller', null, 3, null, null, null, null, 'rak260!C5', 5),
    (null, 'Big Jack Hammer', null, 1, null, null, null, null, 'rak260!C6', 6),
    (null, 'Small Jack Hammer', null, 9, null, null, null, null, 'rak260!C7', 7),
    (null, 'Medium Jack Hammer', null, 2, null, null, null, null, 'rak260!C8', 8),
    (null, 'Concrete Drill Machine', null, 4, null, null, null, null, 'rak260!C10', 10),
    (null, 'Wooden Drill Machine', null, 3, null, null, null, null, 'rak260!C11', 11),
    (null, 'Drill Mixer Machine', null, 1, null, null, null, null, 'rak260!C13', 13),
    (null, 'Generator', '25', 1, null, null, null, null, 'rak260!C15', 15),
    (null, 'Generator', '23', 1, null, null, null, null, 'rak260!C16', 16),
    (null, 'Generator', '60kv', 1, null, null, 'Yellow', null, 'rak260!C17', 17),
    (null, 'Generator', '275kv', 1, null, null, null, null, 'rak260!C18', 18),
    (null, 'Generator', '165kv', 1, null, 'new', null, null, 'rak260!C19', 19),
    (null, 'Grinder 4"', null, 5, null, null, null, null, 'rak260!C21', 21),
    (null, 'Grinder 9"', null, 6, null, null, null, null, 'rak260!C22', 22),
    (null, 'Jig saw Machine', null, 1, null, null, null, null, 'rak260!C23', 23),
    (null, 'Plate Compactor', null, 3, null, null, null, null, 'rak260!C24', 24),
    (null, 'Ply Wood Cutter', null, 6, null, null, null, null, 'rak260!C25', 25),
    (null, 'Power Floor', null, 2, null, null, null, null, 'rak260!C26', 26),
    (null, 'Steel Bending Machine', null, 3, null, null, null, null, 'rak260!C28', 28),
    (null, 'Steel Cutting Machine', null, 3, null, null, null, null, 'rak260!C29', 29),
    (null, 'Vibrator petrol', null, 3, null, null, null, null, 'rak260!C30', 30),
    (null, 'Exhaush Fan', null, 3, null, null, null, null, 'rak260!C32', 32),
    (null, 'Concrete Mixer', null, 2, null, null, null, null, 'rak260!C35', 35),
    (null, 'Tower Light', null, 2, null, null, null, null, 'rak260!C39', 39),
    (null, 'Heat Gun', null, 1, null, null, null, null, 'rak260!C42', 42),
    (null, 'Service pump', null, 1, null, null, null, null, 'rak260!C43', 43),
    (null, 'wall chaser/groove cutter', null, 3, null, null, null, null, 'rak260!C44', 44),
    (null, 'generator 10kv', null, 1, null, null, null, null, 'rak260!C45', 45),
    (null, 'grinder 9"', null, 1, '2026-04-26', 'extra', null, null, 'rak260!C46', 46),
    (null, 'concrete drill', null, 2, '2026-04-23', 'extra', null, null, 'rak260!C47', 47),
    (null, 'small jackhammer', null, 2, '2026-04-23', 'extra', null, null, 'rak260!C48', 48),
    (null, 'big jackhammer', null, 1, '2026-03-25', 'new', null, null, 'rak260!C49', 49),
    (null, 'big jackhammer', null, 1, '2026-04-22', 'new', null, null, 'rak260!C50', 50),
    (null, 'concrete drill', null, 1, '2026-04-22', 'extra', null, null, 'rak260!C51', 51),
    (null, 'Grinder 4"', null, 1, '2026-05-21', 'new', null, null, 'rak260!C52', 52),
    (null, 'Grinder 9"', null, 1, '2026-05-08', 'new', null, null, 'rak260!C53', 53)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK260' or lower(name) = lower('Rakez RAK260')
              order by upper(code) = 'RAK260' desc nulls last limit 1) s
on conflict (src) do nothing;

-- rak242 → RAK242: 34 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'Air Blower', null, 3, null, null, null, null, 'rak242!C3', 3),
    (null, 'Air Compressor-200L', null, 1, null, null, null, null, 'rak242!C4', 4),
    (null, 'Baby Roller', null, 5, null, null, null, null, 'rak242!C5', 5),
    (null, 'Big Jack Hammer', null, 3, null, null, null, null, 'rak242!C6', 6),
    (null, 'Small Jack Hammer', null, 4, null, null, null, null, 'rak242!C7', 7),
    (null, 'Desert Bike', null, 4, null, null, null, null, 'rak242!C8', 8),
    (null, 'Concrete Drill Machine', null, 4, null, null, null, null, 'rak242!C9', 9),
    (null, 'Wooden Drill Machine', null, 2, null, null, null, null, 'rak242!C10', 10),
    (null, 'Electric Water Tester Pump', null, 2, null, null, null, null, 'rak242!C13', 13),
    (null, 'Generator', '275kv', 1, null, null, null, null, 'rak242!C14', 14),
    (null, 'Generator', '27', 1, null, null, null, null, 'rak242!C15', 15),
    (null, 'Generator', '8', 1, null, null, null, null, 'rak242!C16', 16),
    (null, 'Generator', '12', 1, null, null, null, null, 'rak242!C17', 17),
    (null, 'Generator', '7000', 1, null, null, null, null, 'rak242!C18', 18),
    (null, 'Generator', '60kv', 1, null, null, null, null, 'rak242!C19', 19),
    (null, 'Generator', '165kv', 1, null, null, null, null, 'rak242!C20', 20),
    (null, 'Small Generator', null, 10, null, null, null, null, 'rak242!C21', 21),
    (null, 'Grinder 4"', null, 9, null, null, null, null, 'rak242!C22', 22),
    (null, 'Grinder 9"', null, 5, null, null, null, null, 'rak242!C23', 23),
    (null, 'Jig saw Machine', null, 2, null, null, null, null, 'rak242!C24', 24),
    (null, 'Plate Compactor', null, 8, null, null, null, null, 'rak242!C25', 25),
    (null, 'Ply Wood Cutter', null, 5, null, null, null, null, 'rak242!C26', 26),
    (null, 'Steel Bending Machine', null, 1, null, null, null, null, 'rak242!C29', 29),
    (null, 'Steel Cutting Machine', null, 1, null, null, null, null, 'rak242!C30', 30),
    (null, 'Vibrator', null, 2, null, null, null, null, 'rak242!C31', 31),
    (null, 'Exhaush Fan', null, 4, null, null, null, null, 'rak242!C32', 32),
    (null, 'Big Water Pump', null, 1, null, null, null, null, 'rak242!C33', 33),
    (null, 'Tower Light', null, 1, null, null, null, null, 'rak242!C38', 38),
    (null, 'Pipe Cutter Machine', null, 1, null, null, null, null, 'rak242!C39', 39),
    (null, 'Small Water Pump', null, 2, null, null, null, null, 'rak242!C40', 40),
    (null, 'Hose Pipe', null, 2, null, null, null, null, 'rak242!C41', 41),
    (null, 'Fusion Machine', null, 2, null, null, null, null, 'rak242!C42', 42),
    (null, 'Core Cutting Machine', null, 1, null, null, null, null, 'rak242!C43', 43),
    (null, 'Pressure wash machine with Tank white', null, 1, null, null, null, null, 'rak242!C44', 44)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK242' or lower(name) = lower('Rakez Central RAK242')
              order by upper(code) = 'RAK242' desc nulls last limit 1) s
on conflict (src) do nothing;

-- RAK248 → RAK248: 31 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'Air Blower', null, 3, null, null, null, null, 'RAK248!C3', 3),
    (null, 'Air Compressor', null, 2, null, null, null, null, 'RAK248!C4', 4),
    (null, 'Baby Roller', null, 2, null, null, null, null, 'RAK248!C5', 5),
    (null, 'Big Jack Hammer', null, 2, null, null, null, null, 'RAK248!C6', 6),
    (null, 'Small Jack Hammer', null, 3, null, null, null, null, 'RAK248!C7', 7),
    (null, 'Desert Bike', null, 2, null, null, null, null, 'RAK248!C8', 8),
    (null, 'Concrete Drill Machine', null, 4, null, null, null, null, 'RAK248!C9', 9),
    (null, 'Wooden Drill Machine', null, 4, null, null, null, null, 'RAK248!C10', 10),
    (null, 'Drill Mixer Machine', null, 2, null, null, null, null, 'RAK248!C12', 12),
    (null, 'Generator', '165kv', 1, null, null, null, null, 'RAK248!C14', 14),
    (null, 'Generator', '275kv', 1, null, null, null, null, 'RAK248!C15', 15),
    (null, 'Generator', '23', 1, null, null, null, null, 'RAK248!C16', 16),
    (null, 'Generator', '25', 1, null, null, null, null, 'RAK248!C17', 17),
    (null, 'Generator', '150kv', 1, null, null, null, null, 'RAK248!C18', 18),
    (null, 'Small Generator', null, 1, null, null, null, null, 'RAK248!C19', 19),
    (null, 'Grinder 4"', null, 7, null, null, null, null, 'RAK248!C20', 20),
    (null, 'Grinder 9"', null, 4, null, null, null, null, 'RAK248!C21', 21),
    (null, 'Jig saw Machine', null, 1, null, null, null, null, 'RAK248!C22', 22),
    (null, 'Plate Compactor', null, 4, null, null, null, null, 'RAK248!C23', 23),
    (null, 'Ply Wood Cutter', null, 6, null, null, null, null, 'RAK248!C24', 24),
    (null, 'Steel Bending Machine', null, 4, null, null, null, null, 'RAK248!C27', 27),
    (null, 'Steel Cutting Machine', null, 3, null, null, null, null, 'RAK248!C28', 28),
    (null, 'Vibrator', null, 1, null, null, null, null, 'RAK248!C29', 29),
    (null, 'Exhaush Fan', null, 1, null, null, null, null, 'RAK248!C30', 30),
    (null, 'Floor Cutter Machine', null, 6, null, null, null, null, 'RAK248!C32', 32),
    (null, 'Big Tightner', null, 1, null, null, null, null, 'RAK248!C35', 35),
    (null, 'Screw Tighter', null, 2, null, null, null, null, 'RAK248!C36', 36),
    (null, 'Tower Light', null, 2, null, null, null, null, 'RAK248!C37', 37),
    (null, 'Wash Machine', null, 1, null, null, null, null, 'RAK248!C39', 39),
    (null, 'Paint Cleaning Machine', null, 1, null, null, null, null, 'RAK248!C40', 40),
    (null, 'Floor Cleaning Machine', null, 1, null, null, null, null, 'RAK248!C41', 41)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK248' or lower(name) = lower('Rakez RAK248')
              order by upper(code) = 'RAK248' desc nulls last limit 1) s
on conflict (src) do nothing;

-- RAK249 → RAK249: 23 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'Air Blower', null, 2, null, null, null, null, 'RAK249!C3', 3),
    (null, 'Baby Roller', null, 1, null, null, null, null, 'RAK249!C5', 5),
    (null, 'Big Jack Hammer', null, 2, null, null, null, null, 'RAK249!C6', 6),
    (null, 'Small Jack Hammer', null, 4, null, null, null, null, 'RAK249!C7', 7),
    (null, 'Desert Bike', null, 1, null, null, null, null, 'RAK249!C8', 8),
    (null, 'Concrete Drill Machine', null, 2, null, null, null, null, 'RAK249!C9', 9),
    (null, 'Wooden Drill Machine', null, 3, null, null, null, null, 'RAK249!C10', 10),
    (null, 'Generator', '1', 1, null, null, null, null, 'RAK249!C14', 14),
    (null, 'Generator', '19', 1, null, null, null, null, 'RAK249!C15', 15),
    (null, 'Generator', 'G-0407', 1, null, null, null, null, 'RAK249!C16', 16),
    (null, 'Small Generator', null, 1, null, null, null, null, 'RAK249!C18', 18),
    (null, 'Grinder 4"', null, 4, null, null, null, null, 'RAK249!C19', 19),
    (null, 'Grinder 9"', null, 2, null, null, null, null, 'RAK249!C20', 20),
    (null, 'Plate Compactor', null, 2, null, null, null, null, 'RAK249!C22', 22),
    (null, 'Ply Wood Cutter', null, 3, null, null, null, null, 'RAK249!C23', 23),
    (null, 'Power Floor', null, 1, null, null, null, null, 'RAK249!C24', 24),
    (null, 'Steel Bending Machine', null, 2, null, null, null, null, 'RAK249!C26', 26),
    (null, 'Steel Cutting Machine', null, 1, null, null, null, null, 'RAK249!C27', 27),
    (null, 'Vibrator', null, 1, null, null, null, null, 'RAK249!C28', 28),
    (null, 'Exhaush Fan', null, 3, null, null, null, null, 'RAK249!C29', 29),
    (null, 'Floor Cutter Machine', null, 1, null, null, null, null, 'RAK249!C31', 31),
    (null, 'Tower Light', null, 1, null, null, null, null, 'RAK249!C35', 35),
    (null, 'Paint Cleaning Machine', null, 1, null, null, null, null, 'RAK249!C37', 37)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK249' or lower(name) = lower('Rakez RAK249')
              order by upper(code) = 'RAK249' desc nulls last limit 1) s
on conflict (src) do nothing;

-- RAK254 → RAK254: 31 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'Air Blower', null, 2, null, null, null, null, 'RAK254!C3', 3),
    (null, 'Air Compressor', null, 1, null, null, null, null, 'RAK254!C4', 4),
    (null, 'Baby Roller', null, 2, null, null, null, null, 'RAK254!C5', 5),
    (null, 'Big Jack Hammer', null, 1, null, null, null, null, 'RAK254!C6', 6),
    (null, 'Small Jack Hammer', null, 6, null, null, null, null, 'RAK254!C7', 7),
    (null, 'Concrete Drill Machine', null, 3, null, null, null, null, 'RAK254!C9', 9),
    (null, 'Wooden Drill Machine', null, 4, null, null, null, null, 'RAK254!C10', 10),
    (null, 'Generator', '5', 1, null, null, null, null, 'RAK254!C14', 14),
    (null, 'Generator', '28', 1, null, null, null, null, 'RAK254!C15', 15),
    (null, 'Generator', '24', 1, null, null, null, null, 'RAK254!C16', 16),
    (null, 'Small Generator', null, 1, null, null, null, null, 'RAK254!C18', 18),
    (null, 'Grinder 4"', null, 6, null, null, null, null, 'RAK254!C19', 19),
    (null, 'Grinder 9"', null, 4, null, null, null, null, 'RAK254!C20', 20),
    (null, 'Jig saw Machine', null, 1, null, null, null, null, 'RAK254!C21', 21),
    (null, 'Plate Compactor', null, 3, null, null, null, null, 'RAK254!C22', 22),
    (null, 'Ply Wood Cutter', null, 4, null, null, null, null, 'RAK254!C23', 23),
    (null, 'Power Floor', null, 2, null, null, null, null, 'RAK254!C24', 24),
    (null, 'Steel Bending Machine', null, 2, null, null, null, null, 'RAK254!C26', 26),
    (null, 'Steel Cutting Machine', null, 2, null, null, null, null, 'RAK254!C27', 27),
    (null, 'Vibrator', null, 2, null, null, null, null, 'RAK254!C28', 28),
    (null, 'Exhaush Fan', null, 2, null, null, null, null, 'RAK254!C29', 29),
    (null, 'Floor Cutter Machine', null, 1, null, null, null, null, 'RAK254!C31', 31),
    (null, 'Concrete Mixer Machine', null, 1, null, null, null, null, 'RAK254!C32', 32),
    (null, 'Tower Light', null, 1, null, null, null, null, 'RAK254!C35', 35),
    (null, 'Big Fan', null, 2, null, null, null, null, 'RAK254!C37', 37),
    (null, 'Small Fan', null, 4, null, null, null, null, 'RAK254!C38', 38),
    (null, 'Air Jack Hammer with Pipe', null, 1, null, null, null, null, 'RAK254!C39', 39),
    (null, 'Heater', null, 2, null, null, null, null, 'RAK254!C40', 40),
    (null, 'Plaster Machine', null, 1, null, null, null, null, 'RAK254!C41', 41),
    (null, 'Solar Light', null, 20, null, null, null, null, 'RAK254!C42', 42),
    (null, 'Floor Cleaning Machine', null, 1, null, null, null, null, 'RAK254!C43', 43)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK254' or lower(name) = lower('Rakez RAK254')
              order by upper(code) = 'RAK254' desc nulls last limit 1) s
on conflict (src) do nothing;

-- RAK246 → RAK246: 20 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'Air Blower', null, 2, null, null, null, null, 'RAK246!C3', 3),
    (null, 'Big Jack Hammer', null, 2, null, null, null, null, 'RAK246!C6', 6),
    (null, 'Small Jack Hammer', null, 2, null, null, null, null, 'RAK246!C7', 7),
    (null, 'Concrete Drill Machine', null, 3, null, null, null, null, 'RAK246!C9', 9),
    (null, 'Wooden Drill Machine', null, 1, null, null, null, null, 'RAK246!C10', 10),
    (null, 'Charge Drill Machine', null, 3, null, null, null, null, 'RAK246!C11', 11),
    (null, 'Grinder 4"', null, 7, null, null, null, null, 'RAK246!C19', 19),
    (null, 'Grinder 9"', null, 5, null, null, null, null, 'RAK246!C20', 20),
    (null, 'Jig saw Machine', null, 2, null, null, null, null, 'RAK246!C21', 21),
    (null, 'Plate Compactor', null, 2, null, null, null, null, 'RAK246!C22', 22),
    (null, 'Ply Wood Cutter', null, 3, null, null, null, null, 'RAK246!C23', 23),
    (null, 'Steel Bending Machine', null, 1, null, null, null, null, 'RAK246!C26', 26),
    (null, 'Steel Cutting Machine', null, 1, null, null, null, null, 'RAK246!C27', 27),
    (null, 'Vibrator', null, 1, null, null, null, null, 'RAK246!C28', 28),
    (null, 'Exhaush Fan', null, 2, null, null, null, null, 'RAK246!C29', 29),
    (null, 'Floor Cutter Machine', null, 2, null, null, null, null, 'RAK246!C31', 31),
    (null, 'Screw Tighter', null, 3, null, null, null, null, 'RAK246!C34', 34),
    (null, 'Tower Light', null, 1, null, null, null, null, 'RAK246!C35', 35),
    (null, 'Stand Fan', null, 1, null, null, null, null, 'RAK246!C37', 37),
    (null, 'Sheet Cutter Machine', null, 1, null, null, null, null, 'RAK246!C38', 38)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK246' or lower(name) = lower('Sobha RAK246')
              order by upper(code) = 'RAK246' desc nulls last limit 1) s
on conflict (src) do nothing;

-- RAK266 → RAK266: 81 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    ('civil', 'Generator-1-Red-110kv', null, 1, '2025-12-08', null, null, null, 'RAK266!B3', 2003),
    ('civil', 'Generator-275kv', null, 1, '2025-12-09', null, null, null, 'RAK266!B4', 2004),
    ('civil', 'Ply Wood Cutter', null, 1, '2025-12-21', null, null, null, 'RAK266!B5', 2005),
    ('civil', 'Generator-16kv', null, 1, '2026-01-06', null, null, null, 'RAK266!B6', 2006),
    ('civil', 'Tower Light', null, 1, null, null, null, null, 'RAK266!B7', 2007),
    ('civil', 'Plate Compactor', null, 3, '2026-01-21', null, null, null, 'RAK266!B8', 2008),
    ('civil', 'Generator - 165kv', null, 1, '2026-01-26', null, null, null, 'RAK266!B9', 2009),
    ('civil', 'Generator - 165kv', null, 1, '2026-02-01', null, null, null, 'RAK266!B10', 2010),
    ('civil', 'Ply Wood Cutter', null, 2, null, null, null, null, 'RAK266!B11', 2011),
    ('civil', 'Power Floor', null, 1, null, null, null, null, 'RAK266!B12', 2012),
    ('civil', 'Steel Bending Machine', null, 2, '2026-02-13', null, null, null, 'RAK266!B13', 2013),
    ('civil', 'Air Blower', null, 1, '2026-02-13', null, null, null, 'RAK266!B14', 2014),
    ('civil', 'Big Jack Hammer', null, 1, '2026-02-13', null, null, null, 'RAK266!B15', 2015),
    ('civil', 'Grinder 4"', null, 2, '2026-02-13', null, null, null, 'RAK266!B16', 2016),
    ('civil', 'Grinder 9"', null, 2, '2026-02-13', null, null, null, 'RAK266!B17', 2017),
    ('civil', 'Wooden Drill', null, 2, '2026-02-13', null, null, null, 'RAK266!B18', 2018),
    ('civil', 'Drill Machine', null, 2, '2026-02-13', null, null, null, 'RAK266!B19', 2019),
    ('civil', 'Vibrator', null, 2, '2026-03-16', null, null, null, 'RAK266!B20', 2020),
    ('civil', 'Ply Wood Cutter', null, 1, '2026-03-16', null, null, null, 'RAK266!B21', 2021),
    ('civil', 'Steel Bending Machine', null, 1, '2026-03-24', null, '261 transfer 266', null, 'RAK266!B22', 2022),
    ('civil', 'Steel Cutting Machine', null, 1, '2026-03-24', null, '261 transfer 266', null, 'RAK266!B23', 2023),
    ('civil', 'grinder 9"new', null, 4, '2026-05-18', 'new', null, null, 'RAK266!B24', 2024),
    ('civil', 'jigsaw new', null, 1, '2026-05-18', 'new', null, null, 'RAK266!B25', 2025),
    ('civil', 'concrete drill new', null, 2, '2026-05-18', 'new', null, null, 'RAK266!B26', 2026),
    ('civil', 'air blower', null, 1, '2026-05-18', 'new', null, null, 'RAK266!B27', 2027),
    ('civil', 'grinder 9"new', null, 2, '2026-05-19', 'new', null, null, 'RAK266!B28', 2028),
    ('civil', 'POWERFLOAT', null, 2, '2026-05-24', 'new', null, null, 'RAK266!B29', 2029),
    ('civil', 'grinder 9"new', null, 2, '2026-06-03', 'new', 'asme', null, 'RAK266!B30', 2030),
    ('civil', 'circular saw', null, 1, '2026-06-11', 'new', null, null, 'RAK266!B31', 2031),
    ('civil', 'concrete drill', null, 1, '2026-06-11', 'extra', null, null, 'RAK266!B32', 2032),
    ('civil', 'grinder 9"new', null, 2, '2026-06-12', 'new', null, null, 'RAK266!B33', 2033),
    ('civil', 'circular saw', null, 1, '2026-06-12', 'new', null, null, 'RAK266!B34', 2034),
    ('civil', 'jigsaw', null, 1, '2026-06-15', 'new', null, null, 'RAK266!B35', 2035),
    ('civil', 'grinder 4"', null, 2, '2026-06-15', 'new', null, null, 'RAK266!B36', 2036),
    ('civil', 'circular saw', null, 1, '2026-06-16', 'new', null, null, 'RAK266!B37', 2037),
    ('civil', 'rechargable drill', null, 1, '2026-06-16', 'new', null, null, 'RAK266!B38', 2038),
    ('civil', 'jackhammer medium', null, 2, '2026-06-22', 'new', null, null, 'RAK266!B39', 2039),
    ('civil', 'circular saw', null, 1, '2026-06-22', 'extra', null, null, 'RAK266!B40', 2040),
    ('civil', 'grinder 9"', null, 1, '2026-06-22', 'new', null, null, 'RAK266!B41', 2041),
    ('civil', 'wooden drill', null, 1, '2026-06-28', 'extra', null, null, 'RAK266!B42', 2042),
    ('civil', 'concrete drill', null, 1, '2026-06-28', 'extra', null, null, 'RAK266!B43', 2043),
    ('civil', 'stand fan', null, 4, '2026-08-17', 'new', null, null, 'RAK266!B44', 2044),
    ('civil', 'grindr 9"', null, 1, '2026-08-30', 'extra', null, null, 'RAK266!B45', 2045),
    ('civil', 'EXHAUSFAN', null, 1, '2026-08-30', 'extra', null, null, 'RAK266!B46', 2046),
    ('civil', 'Big Jack Hammer', null, 1, '2026-04-23', 'new', null, null, 'RAK266!B47', 2047),
    ('civil', 'grinder 9"', null, 1, '2026-04-14', 'new', null, null, 'RAK266!B48', 2048),
    ('civil', 'ply cutter 9"(ford)', null, 1, '2026-07-01', 'new', null, null, 'RAK266!B49', 2049),
    ('civil', 'generator wpsp165', null, 1, '2026-07-08', 'extra', null, null, 'RAK266!B50', 2050),
    ('civil', 'generator 220kv', null, 1, '2026-07-09', 'extra', null, null, 'RAK266!B51', 2051),
    ('civil', 'generator 165kv', null, 1, '2026-07-08', 'extra', null, null, 'RAK266!B52', 2052),
    ('civil', 'generatorwpsp', null, 1, '2026-07-17', null, 'after repair', null, 'RAK266!B53', 2053),
    ('civil', 'grinder 9"', null, 1, '2026-08-01', 'extra', null, null, 'RAK266!B54', 2054),
    ('civil', 'grinder 9"makita', null, 2, '2026-08-24', 'new', null, null, 'RAK266!B55', 2055),
    ('civil', 'medium jackhammer(wulF)', null, 3, '2026-09-09', 'new', 'eng.azmi', null, 'RAK266!B56', 2056),
    ('civil', 'grinder 9"(wulf)', null, 3, '2026-09-09', 'new', 'eng.azmi', null, 'RAK266!B57', 2057),
    ('civil', 'grinder 9"', null, 2, '2026-05-30', 'new', null, null, 'RAK266!B58', 2058),
    ('civil', 'grinder 4.5"', null, 1, '2026-10-13', 'extra', null, null, 'RAK266!B59', 2059),
    ('civil', 'grinder 9"', null, 2, '2026-10-21', 'extra', null, null, 'RAK266!B60', 2060),
    ('civil', 'grinder 9"(wulf)', null, 1, '2026-10-21', 'new', null, null, 'RAK266!B61', 2061),
    ('civil', 'grinder 9"', null, 1, '2026-10-21', 'extra', null, null, 'RAK266!B62', 2062),
    ('civil', 'grinder 4.5"(dck)', null, 2, '2026-10-22', 'new', null, null, 'RAK266!B63', 2063),
    ('civil', 'generator-28', null, 1, '2026-10-27', 'extra', null, null, 'RAK266!B64', 2064),
    ('civil', 'air blower', null, 1, '2026-11-03', 'extra', null, null, 'RAK266!B65', 2065),
    ('civil', 'impact drill(wulf) titener', null, 1, '2026-11-05', 'new', null, null, 'RAK266!B66', 2066),
    ('civil', 'grinder 9"(wuilf)', null, 1, '2026-11-05', 'new', null, null, 'RAK266!B67', 2067),
    ('civil', 'Plate Compactor', null, 2, '2026-11-08', 'extra', 'eng.atif', null, 'RAK266!B68', 2068),
    ('civil', 'medium jackhammer(wulF)', null, 2, '2026-11-08', 'extra', null, null, 'RAK266!B69', 2069),
    ('civil', 'grinder 9"(wuilf)', null, 2, '2026-11-12', 'new', 'eng.atif', null, 'RAK266!B70', 2070),
    ('mep', 'heat gun', null, 1, null, null, null, null, 'RAK266!I3', 9003),
    ('mep', 'heat gun', null, 1, '2026-06-16', null, null, null, 'RAK266!I4', 9004),
    ('mep', 'grinder 4.5', null, 1, '2026-07-14', 'extra', null, null, 'RAK266!I5', 9005),
    ('mep', 'meduim jackhammer', null, 1, '2026-07-30', 'new', null, null, 'RAK266!I6', 9006),
    ('mep', 'small jackhammer', null, 1, '2026-07-30', null, null, null, 'RAK266!I7', 9007),
    ('mep', 'small jackhammer', null, 1, '2026-07-30', 'new', null, null, 'RAK266!I8', 9008),
    ('mep', 'concrete drill', null, 1, '2026-07-30', 'extra', null, null, 'RAK266!I9', 9009),
    ('mep', 'GRINDER 9"', null, 1, '2026-08-02', 'extra', null, null, 'RAK266!I10', 9010),
    ('mep', 'small jackhammer', null, 2, '2026-09-22', 'new', null, null, 'RAK266!I11', 9011),
    ('mep', 'heatgun', null, 1, '2026-09-22', 'new', 'foreman gurfreet', null, 'RAK266!I12', 9012),
    ('mep', 'medium jackhammer(wulf)', null, 2, '2026-10-22', 'new', null, null, 'RAK266!I13', 9013),
    ('mep', 'grinder 4.5"(dck)', null, 1, '2026-10-22', 'new', null, null, 'RAK266!I14', 9014),
    ('mep', 'grinder 4.5"(witch)', null, 1, '2026-10-22', 'new', null, null, 'RAK266!I15', 9015)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK266' or lower(name) = lower('Al Ghail RAK266')
              order by upper(code) = 'RAK266' desc nulls last limit 1) s
on conflict (src) do nothing;

-- VIP VILLA RAK247 → RAK247: 27 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'Air Blower', null, 2, null, null, null, null, 'VIP VILLA RAK247!C3', 3),
    (null, 'Small Jack Hammer', null, 2, null, null, null, null, 'VIP VILLA RAK247!C7', 7),
    (null, 'Desert Bike', null, 1, null, null, null, null, 'VIP VILLA RAK247!C8', 8),
    (null, 'Concrete Drill Machine', null, 4, null, null, null, null, 'VIP VILLA RAK247!C9', 9),
    (null, 'Generator', '26', 1, null, null, null, null, 'VIP VILLA RAK247!C14', 14),
    (null, 'Generator', '7', 1, null, null, null, null, 'VIP VILLA RAK247!C15', 15),
    (null, 'Generator', '12', 1, null, null, null, null, 'VIP VILLA RAK247!C16', 16),
    (null, 'Small Generator', null, 1, null, null, null, null, 'VIP VILLA RAK247!C18', 18),
    (null, 'Grinder 4"', null, 2, null, null, null, null, 'VIP VILLA RAK247!C19', 19),
    (null, 'Grinder 4"', null, 5, null, 'new', null, null, 'VIP VILLA RAK247!C20', 20),
    (null, 'Grinder 9"', null, 2, null, null, null, null, 'VIP VILLA RAK247!C21', 21),
    (null, 'Plate Compactor', null, 1, null, null, null, null, 'VIP VILLA RAK247!C23', 23),
    (null, 'Ply Wood Cutter', null, 1, null, null, null, null, 'VIP VILLA RAK247!C24', 24),
    (null, 'Power Floor', null, 2, null, null, null, null, 'VIP VILLA RAK247!C25', 25),
    (null, 'Steel Bending Machine', null, 1, null, null, null, null, 'VIP VILLA RAK247!C27', 27),
    (null, 'Vibrator', null, 1, null, null, null, null, 'VIP VILLA RAK247!C29', 29),
    (null, 'Shaft', null, 1, null, null, null, null, 'VIP VILLA RAK247!C30', 30),
    (null, 'Electric Drill Machine', null, 1, null, null, null, null, 'VIP VILLA RAK247!C39', 39),
    (null, 'grinder 4"', null, 1, null, 'extra', null, null, 'VIP VILLA RAK247!C40', 40),
    (null, 'grinder 9"', null, 1, null, 'extra', null, null, 'VIP VILLA RAK247!C41', 41),
    (null, 'jackhammer small', null, 1, null, 'extra', null, null, 'VIP VILLA RAK247!C42', 42),
    (null, 'grinder 4.5''', null, 1, null, 'extra', null, null, 'VIP VILLA RAK247!C43', 43),
    (null, 'stand fan', null, 2, null, 'new', null, null, 'VIP VILLA RAK247!C44', 44),
    (null, 'grinder 4.5''', null, 1, null, 'extra', null, null, 'VIP VILLA RAK247!C45', 45),
    (null, 'small jackhammer', null, 1, null, 'extra', null, null, 'VIP VILLA RAK247!C46', 46),
    (null, 'grinder 4.5''', null, 1, null, 'extra', null, null, 'VIP VILLA RAK247!C47', 47),
    (null, 'Concrete Drill Machine', null, 1, null, 'extra', null, null, 'VIP VILLA RAK247!C48', 48)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK247' or lower(name) = lower('VIP Villa RAK247')
              order by upper(code) = 'RAK247' desc nulls last limit 1) s
on conflict (src) do nothing;

-- EXPRO RAK257 → RAK257: 28 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'Air Blower', null, 2, null, null, null, null, 'EXPRO RAK257!C3', 3),
    (null, 'Big Jack Hammer', null, 3, null, null, null, null, 'EXPRO RAK257!C6', 6),
    (null, 'Small Jack Hammer', null, 6, null, null, null, null, 'EXPRO RAK257!C7', 7),
    (null, 'Concrete Drill Machine', null, 2, null, null, null, null, 'EXPRO RAK257!C9', 9),
    (null, 'Wooden Drill Machine', null, 1, null, null, null, null, 'EXPRO RAK257!C10', 10),
    (null, 'Generator', '165kv', 1, null, null, null, null, 'EXPRO RAK257!C14', 14),
    (null, 'Generator', '275kv', 1, null, null, null, null, 'EXPRO RAK257!C15', 15),
    (null, 'Generator', '24', 1, null, null, null, null, 'EXPRO RAK257!C16', 16),
    (null, 'Generator', '26', 1, null, null, null, null, 'EXPRO RAK257!C17', 17),
    (null, 'Small Generator', null, 1, null, null, null, null, 'EXPRO RAK257!C18', 18),
    (null, 'Grinder 4"', null, 4, null, null, null, null, 'EXPRO RAK257!C19', 19),
    (null, 'Grinder 9"', null, 5, null, null, null, null, 'EXPRO RAK257!C20', 20),
    (null, 'Plate Compactor', null, 2, null, null, null, null, 'EXPRO RAK257!C22', 22),
    (null, 'Ply Wood Cutter', null, 2, null, null, null, null, 'EXPRO RAK257!C23', 23),
    (null, 'Power Floor', null, 2, null, null, null, null, 'EXPRO RAK257!C24', 24),
    (null, 'Steel Bending Machine', null, 2, null, null, null, null, 'EXPRO RAK257!C26', 26),
    (null, 'Vibrator', null, 2, null, null, null, null, 'EXPRO RAK257!C28', 28),
    (null, 'Screw Tighter', null, 2, null, null, null, null, 'EXPRO RAK257!C34', 34),
    (null, 'Tower Light', null, 1, null, null, null, null, 'EXPRO RAK257!C35', 35),
    (null, 'Polisher Machine', null, 1, null, null, null, null, 'EXPRO RAK257!C40', 40),
    (null, 'Injection Machine', null, 1, null, null, null, null, 'EXPRO RAK257!C41', 41),
    (null, 'impact drill', null, 2, null, null, null, null, 'EXPRO RAK257!C42', 42),
    (null, 'small jackhammer', null, 1, null, null, null, null, 'EXPRO RAK257!C43', 43),
    (null, 'duct fan', null, 1, null, null, null, null, 'EXPRO RAK257!C44', 44),
    (null, 'pressure pump with tank', null, 1, null, null, null, null, 'EXPRO RAK257!C45', 45),
    (null, 'Baby Roller', null, 1, null, null, null, null, 'EXPRO RAK257!C46', 46),
    (null, 'grinder 9"(wulf)', null, 1, null, null, null, null, 'EXPRO RAK257!C47', 47),
    (null, 'Generator(MARAPCO)275KV', '4', 1, null, null, null, null, 'EXPRO RAK257!C48', 48)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK257' or lower(name) = lower('XPRO RAK257')
              order by upper(code) = 'RAK257' desc nulls last limit 1) s
on conflict (src) do nothing;

-- RAK250 → RAK250: 26 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'Air Blower', null, 2, null, null, null, null, 'RAK250!C3', 3),
    (null, 'Baby Roller', 'BR-07', 1, null, null, null, null, 'RAK250!C5', 5),
    (null, 'Small Jack Hammer', null, 4, null, null, null, null, 'RAK250!C7', 7),
    (null, 'Concrete Drill Machine', null, 1, null, null, null, null, 'RAK250!C9', 9),
    (null, 'Wooden Drill Machine', null, 1, null, null, null, null, 'RAK250!C10', 10),
    (null, 'Drill Mixer Machine', null, 1, null, null, null, null, 'RAK250!C12', 12),
    (null, 'Generator', '6', 1, null, null, null, null, 'RAK250!C14', 14),
    (null, 'Generator', '10', 1, null, null, null, null, 'RAK250!C15', 15),
    (null, 'Generator', '11', 1, null, null, null, null, 'RAK250!C16', 16),
    (null, 'Generator', '150kv', 1, null, null, null, null, 'RAK250!C17', 17),
    (null, 'Small Generator', null, 1, null, null, null, null, 'RAK250!C18', 18),
    (null, 'Grinder 4"', null, 4, null, null, null, null, 'RAK250!C19', 19),
    (null, 'Grinder 9"', null, 8, null, null, null, null, 'RAK250!C20', 20),
    (null, 'Jig saw Machine', null, 1, null, null, null, null, 'RAK250!C21', 21),
    (null, 'Plate Compactor', null, 2, null, null, null, null, 'RAK250!C22', 22),
    (null, 'Ply Wood Cutter', null, 4, null, null, null, null, 'RAK250!C23', 23),
    (null, 'Power Floor', null, 3, null, null, null, null, 'RAK250!C24', 24),
    (null, 'Steel Bending Machine', null, 1, null, null, null, null, 'RAK250!C26', 26),
    (null, 'Steel Cutting Machine', null, 1, null, null, null, null, 'RAK250!C27', 27),
    (null, 'Vibrator', null, 1, null, null, null, null, 'RAK250!C28', 28),
    (null, 'Exhaush Fan', null, 2, null, null, null, null, 'RAK250!C29', 29),
    (null, 'Floor Cutter Machine', null, 3, null, null, null, null, 'RAK250!C31', 31),
    (null, 'Screw Tighter', null, 1, null, null, null, null, 'RAK250!C34', 34),
    (null, 'Tower Light', 'TL-4', 1, null, null, null, null, 'RAK250!C35', 35),
    (null, 'Water Pump with Hose Pipe', null, 1, null, null, null, null, 'RAK250!C38', 38),
    (null, 'Pressure Wash Machine', null, 2, null, null, null, null, 'RAK250!C39', 39)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK250' or lower(name) = lower('RAK-250')
              order by upper(code) = 'RAK250' desc nulls last limit 1) s
on conflict (src) do nothing;

-- RAK269 → RAK269: 15 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    ('civil', 'air blower new', null, 1, '2026-05-12', null, null, null, 'RAK269!C3', 3),
    ('civil', 'grinder 4"', null, 1, '2026-05-25', 'extra', null, null, 'RAK269!C4', 4),
    ('civil', 'grinder 9"', null, 1, '2026-05-25', 'extra', null, null, 'RAK269!C5', 5),
    ('civil', 'small jackhammer', null, 1, '2026-05-25', 'extra', null, null, 'RAK269!C6', 6),
    ('civil', 'generator10kv', null, 1, '2026-06-07', null, null, null, 'RAK269!C7', 7),
    (null, 'grinder 4.5', null, 1, '2026-06-23', 'new', null, 'foreman ashivu', 'RAK269!C8', 8),
    ('civil', 'vibrator', null, 1, '2026-04-03', 'new', null, null, 'RAK269!C9', 9),
    ('civil', 'grinder 9"', null, 1, '2026-04-03', 'new', null, null, 'RAK269!C10', 10),
    ('civil', 'grinder 4"', null, 2, '2026-04-03', 'new', null, null, 'RAK269!C11', 11),
    ('civil', 'wooden drill', null, 2, '2026-04-03', 'new', null, null, 'RAK269!C12', 12),
    ('civil', 'ply cutter/circular saw', null, 1, '2026-04-03', 'new', null, null, 'RAK269!C13', 13),
    ('civil', 'jigsaw', null, 1, '2026-04-03', 'new', null, null, 'RAK269!C14', 14),
    ('civil', 'jackhammer', null, 2, '2026-04-03', 'new', null, null, 'RAK269!C15', 15),
    (null, 'concrete drill (DCK)', 'tabrej', 1, '2026-07-22', 'new', null, null, 'RAK269!C16', 16),
    ('civil', 'generator7kv', null, 1, '2026-08-26', 'extra', null, null, 'RAK269!C17', 17)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK269' or lower(name) = lower('RAK269')
              order by upper(code) = 'RAK269' desc nulls last limit 1) s
on conflict (src) do nothing;

-- BOSKALIS262 → RAK262: 19 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'generator275kv', null, 1, '2026-05-18', null, 'driver/39164', null, 'BOSKALIS262!C3', 3),
    ('civil', 'circular saw', null, 4, '2026-05-31', 'new', null, null, 'BOSKALIS262!C4', 4),
    ('civil', 'grinder 9"', null, 3, '2026-05-31', 'new', null, null, 'BOSKALIS262!C5', 5),
    ('civil', 'grinder 4"', null, 3, '2026-05-31', 'new', null, null, 'BOSKALIS262!C6', 6),
    ('civil', 'wooden drill(electric)', null, 2, '2026-05-31', 'new', null, null, 'BOSKALIS262!C7', 7),
    ('civil', 'concrete drill', null, 1, '2026-05-31', 'new', null, null, 'BOSKALIS262!C8', 8),
    ('civil', 'small jackhammer', null, 1, '2026-05-31', 'new', null, null, 'BOSKALIS262!C9', 9),
    ('civil', 'big jackhammer', null, 2, '2026-05-31', 'new', null, null, 'BOSKALIS262!C10', 10),
    ('civil', 'circular saw', null, 2, '2026-06-11', 'new', null, null, 'BOSKALIS262!C11', 11),
    ('civil', 'grinder 9"', null, 2, '2026-06-11', 'new', null, null, 'BOSKALIS262!C12', 12),
    ('civil', 'generator110KV-10', null, 1, '2026-06-18', null, null, null, 'BOSKALIS262!C13', 13),
    ('civil', 'vibrator', null, 1, '2026-07-21', 'extra', null, null, 'BOSKALIS262!C14', 14),
    ('civil', 'PLY CUTTER', null, 1, '2026-08-08', 'extra', null, null, 'BOSKALIS262!C15', 15),
    ('civil', 'powerfloat', null, 2, '2026-08-25', 'extra', null, null, 'BOSKALIS262!C16', 16),
    ('civil', 'handcutter(wulf)', null, 1, '2026-09-09', 'extra', null, null, 'BOSKALIS262!C17', 17),
    ('civil', 'ply cutter', null, 1, '2026-09-23', 'extra', null, null, 'BOSKALIS262!C18', 18),
    ('civil', 'air blower', null, 1, '2026-09-23', 'extra', null, null, 'BOSKALIS262!C19', 19),
    ('civil', 'hand cutter 6"', null, 1, '2026-11-05', 'new', null, null, 'BOSKALIS262!C20', 20),
    ('civil', 'generator 10kv', null, 1, '2026-11-07', 'extra', null, null, 'BOSKALIS262!C21', 21)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK262' or lower(name) = lower('Boskalis RAK262')
              order by upper(code) = 'RAK262' desc nulls last limit 1) s
on conflict (src) do nothing;

-- WELDING WORKSHOP → WELDING: 5 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'GRINDER 4.5"', null, 1, '2026-03-25', 'new', null, null, 'WELDING WORKSHOP!C3', 3),
    (null, 'concrete drill', null, 1, '2026-05-20', null, 'althaf', null, 'WELDING WORKSHOP!C4', 4),
    (null, 'grinder 4"', null, 1, '2026-05-04', null, 'mahblood', null, 'WELDING WORKSHOP!C5', 5),
    (null, 'grinder', null, 2, '2026-04-15', null, 'mehahoob', null, 'WELDING WORKSHOP!C6', 6),
    (null, 'generator 10kv', null, 1, '2026-06-27', 'returned', null, null, 'WELDING WORKSHOP!C7', 7)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'WELDING' or lower(name) = lower('Welding Workshop')
              order by upper(code) = 'WELDING' desc nulls last limit 1) s
on conflict (src) do nothing;

-- DXB DUBAI SITE → DXB: 75 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'Ply Wood Cutter', null, 1, '2025-04-29', null, null, null, 'DXB DUBAI SITE!B3', 2003),
    (null, 'Ply Wood Cutter', null, 1, '2025-05-15', null, null, null, 'DXB DUBAI SITE!B4', 2004),
    (null, 'Grinder 9"', null, 1, '2025-05-03', null, null, null, 'DXB DUBAI SITE!B5', 2005),
    (null, 'Grinder 9"', null, 1, '2025-05-15', null, null, null, 'DXB DUBAI SITE!B6', 2006),
    (null, 'Grinder 4"', null, 1, '2025-05-03', null, null, null, 'DXB DUBAI SITE!B7', 2007),
    (null, 'Wooden Drill', null, 1, '2025-05-06', null, null, null, 'DXB DUBAI SITE!B8', 2008),
    (null, 'Wooden Drill', null, 1, '2025-05-15', null, null, null, 'DXB DUBAI SITE!B9', 2009),
    (null, 'Drill Machine', null, 1, '2025-05-06', null, null, null, 'DXB DUBAI SITE!B10', 2010),
    (null, 'Drill Machine', null, 1, '2025-05-09', null, null, null, 'DXB DUBAI SITE!B11', 2011),
    (null, 'Jack Hammer', null, 1, '2025-05-06', null, null, null, 'DXB DUBAI SITE!B12', 2012),
    (null, 'Jack Hammer', null, 1, '2025-05-15', null, null, null, 'DXB DUBAI SITE!B13', 2013),
    (null, 'Jig Saw machine', null, 1, '2025-05-09', null, null, null, 'DXB DUBAI SITE!B14', 2014),
    (null, 'Steel Bending Machine', null, 1, '2025-05-09', null, null, null, 'DXB DUBAI SITE!B15', 2015),
    (null, 'Steel Cutting Machine', null, 1, '2025-05-09', null, null, null, 'DXB DUBAI SITE!B16', 2016),
    (null, 'Baby Roller', null, 2, '2025-05-09', null, '1', null, 'DXB DUBAI SITE!B17', 2017),
    (null, 'Desert Bike', null, 1, '2025-05-16', null, null, null, 'DXB DUBAI SITE!B18', 2018),
    (null, 'Plate Compactor', null, 2, '2025-05-16', 'new', null, null, 'DXB DUBAI SITE!B19', 2019),
    (null, 'Solor Tower Light', null, 1, '2025-05-16', null, null, null, 'DXB DUBAI SITE!B20', 2020),
    (null, 'Generator - 275kv', null, 1, '2025-06-03', null, null, null, 'DXB DUBAI SITE!B21', 2021),
    (null, 'Vibrator with Shaft', null, 2, '2025-06-22', 'new', null, null, 'DXB DUBAI SITE!B22', 2022),
    (null, 'Air Compressor Big', null, 1, '2025-06-22', null, null, null, 'DXB DUBAI SITE!B23', 2023),
    (null, 'Generator - R33', null, 1, '2025-06-23', 'new', null, null, 'DXB DUBAI SITE!B24', 2024),
    (null, 'Generator - R44', null, 1, '2025-06-23', 'new', null, null, 'DXB DUBAI SITE!B25', 2025),
    (null, 'Steel Cutting Machine', null, 2, '2025-06-29', 'new', null, null, 'DXB DUBAI SITE!B26', 2026),
    (null, 'Generator - 150kv', null, 1, '2025-07-18', null, 'New-Green', null, 'DXB DUBAI SITE!B27', 2027),
    (null, 'Big Jack Hammer', null, 2, '2025-07-21', 'new', null, null, 'DXB DUBAI SITE!B28', 2028),
    (null, 'Vibrator', null, 1, '2025-07-21', 'new', null, null, 'DXB DUBAI SITE!B29', 2029),
    (null, 'Shaft', null, 2, '2025-07-21', 'new', null, null, 'DXB DUBAI SITE!B30', 2030),
    (null, 'Floor Cutter machine', null, 1, '2025-07-21', null, null, null, 'DXB DUBAI SITE!B31', 2031),
    (null, 'Solor Tower Light', null, 2, '2025-07-24', 'new', null, null, 'DXB DUBAI SITE!B32', 2032),
    (null, 'Grinder 9"', null, 3, '2025-07-27', 'new', null, null, 'DXB DUBAI SITE!B33', 2033),
    (null, 'Grinder 4"', null, 8, '2025-07-27', 'new', null, null, 'DXB DUBAI SITE!B34', 2034),
    (null, 'Big Jack Hammer', null, 1, '2025-07-27', 'new', null, null, 'DXB DUBAI SITE!B35', 2035),
    (null, 'Jack Hammer', null, 2, '2025-07-27', 'new', null, null, 'DXB DUBAI SITE!B36', 2036),
    (null, 'Drill Machine', null, 1, '2025-07-27', 'new', null, null, 'DXB DUBAI SITE!B37', 2037),
    (null, 'Wooden Drill', null, 2, '2025-07-27', 'new', null, null, 'DXB DUBAI SITE!B38', 2038),
    (null, 'Baby Roller', null, 1, '2025-07-27', 'new', null, null, 'DXB DUBAI SITE!B39', 2039),
    (null, 'Steel Cutting Machine', null, 1, '2025-08-04', 'new', null, null, 'DXB DUBAI SITE!B40', 2040),
    (null, 'Power Floor', null, 2, '2025-08-23', null, '248249', null, 'DXB DUBAI SITE!B41', 2041),
    (null, 'Ply Wood Cutter', null, 2, '2025-09-08', 'new', null, null, 'DXB DUBAI SITE!B42', 2042),
    (null, 'Generator - 5', null, 1, '2025-06-23', null, null, null, 'DXB DUBAI SITE!B43', 2043),
    (null, 'Grinder 9"', null, 2, '2025-10-09', 'new', null, null, 'DXB DUBAI SITE!B44', 2044),
    (null, 'Drill Machine', null, 2, '2025-10-09', 'new', null, null, 'DXB DUBAI SITE!B45', 2045),
    (null, 'Ply Wood Cutter', null, 2, '2025-10-20', 'new', null, null, 'DXB DUBAI SITE!B46', 2046),
    (null, 'Air Compressor Big-Yellow', null, 1, '2025-12-12', null, null, null, 'DXB DUBAI SITE!B47', 2047),
    (null, 'Air Blower', null, 2, '2025-12-12', null, null, null, 'DXB DUBAI SITE!B48', 2048),
    (null, 'Grinder 9"', null, 1, '2025-12-24', 'new', null, null, 'DXB DUBAI SITE!B49', 2049),
    (null, 'Plate Compactor', null, 2, '2025-12-05', null, null, null, 'DXB DUBAI SITE!B50', 2050),
    (null, 'Grinder 9"', null, 2, '2025-12-22', 'extra', null, null, 'DXB DUBAI SITE!B51', 2051),
    (null, 'Wooden Drill', null, 1, '2025-12-24', 'extra', null, null, 'DXB DUBAI SITE!B52', 2052),
    (null, 'Mixer Machine', null, 1, '2026-01-25', null, null, null, 'DXB DUBAI SITE!B53', 2053),
    (null, 'Generator -9', null, 1, '2026-02-05', null, null, null, 'DXB DUBAI SITE!B54', 2054),
    (null, 'Exhaush Fan', null, 2, '2026-03-24', null, '260 transfer to DXB', null, 'DXB DUBAI SITE!B55', 2055),
    (null, 'circular saw', null, 1, '2026-06-09', 'new', null, null, 'DXB DUBAI SITE!B56', 2056),
    (null, 'grinder 9"', null, 1, '2026-06-09', 'new', null, null, 'DXB DUBAI SITE!B57', 2057),
    (null, 'small grinder 4"', null, 1, '2026-06-09', 'new', null, null, 'DXB DUBAI SITE!B58', 2058),
    (null, 'stand fan', null, 4, '2026-06-26', 'new', null, null, 'DXB DUBAI SITE!B59', 2059),
    (null, 'air blower', null, 1, '2026-04-09', 'extra', null, null, 'DXB DUBAI SITE!B60', 2060),
    (null, 'couring machine', null, 1, '2026-04-21', 'extra', null, null, 'DXB DUBAI SITE!B61', 2061),
    (null, 'grinder 9"', null, 2, '2026-07-14', 'new', null, null, 'DXB DUBAI SITE!B62', 2062),
    (null, 'grinder 9"', null, 3, '2026-07-29', 'new', null, null, 'DXB DUBAI SITE!B63', 2063),
    (null, 'big jackhammer', null, 1, '2026-07-29', 'new', null, null, 'DXB DUBAI SITE!B64', 2064),
    (null, 'plate compactor', null, 1, '2026-07-29', 'extra', null, null, 'DXB DUBAI SITE!B65', 2065),
    (null, 'solar towerlight', null, 2, '2026-07-29', 'returned', null, null, 'DXB DUBAI SITE!B66', 2066),
    (null, 'grinder 9"', null, 2, '2026-08-28', 'new', null, null, 'DXB DUBAI SITE!B67', 2067),
    (null, 'ply cutter', null, 1, '2026-08-28', 'new', null, null, 'DXB DUBAI SITE!B68', 2068),
    (null, 'grinder 4.5" dck', null, 1, '2026-08-28', 'new', null, null, 'DXB DUBAI SITE!B69', 2069),
    (null, 'hand cutter', null, 2, '2026-09-17', 'extra', null, null, 'DXB DUBAI SITE!B70', 2070),
    (null, 'medium jackhammer', null, 2, '2026-09-22', 'new', null, null, 'DXB DUBAI SITE!B71', 2071),
    (null, 'grinder 4.5" dck', null, 1, '2026-09-24', 'new', null, null, 'DXB DUBAI SITE!B72', 2072),
    (null, 'Power Floor', null, 3, '2026-09-27', 'extra', null, null, 'DXB DUBAI SITE!B73', 2073),
    (null, 'floor polish machine', null, 1, '2026-11-03', 'new', null, null, 'DXB DUBAI SITE!B74', 2074),
    (null, 'grinder 4.5" dck', null, 1, '2026-11-06', 'new', null, null, 'DXB DUBAI SITE!B75', 2075),
    (null, 'floor polish machine', null, 1, '2026-11-10', 'new', null, null, 'DXB DUBAI SITE!B76', 2076),
    (null, 'concrete grinding machine', null, 1, '2026-11-15', 'new', null, null, 'DXB DUBAI SITE!B77', 2077)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'DXB' or lower(name) = lower('Dubai Site - Mudon School')
              order by upper(code) = 'DXB' desc nulls last limit 1) s
on conflict (src) do nothing;

-- SUNREEF264 → RAK264: 60 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'Air Blower', null, 1, '2025-07-20', 'new', null, null, 'SUNREEF264!B3', 2003),
    (null, 'Plate Compactor', null, 1, '2025-09-02', null, null, null, 'SUNREEF264!B4', 2004),
    (null, 'Grinder 4"', null, 1, null, null, null, null, 'SUNREEF264!B5', 2005),
    (null, 'Grinder 9"', null, 1, null, null, null, null, 'SUNREEF264!B6', 2006),
    (null, 'Generator - Rental', null, 2, null, null, null, null, 'SUNREEF264!B7', 2007),
    (null, 'Generator', null, 1, null, null, 'Gen-19', null, 'SUNREEF264!B8', 2008),
    (null, 'Grinder 4"', null, 1, null, null, 'New-11-9-2025', null, 'SUNREEF264!B9', 2009),
    (null, 'Water Pump', null, 1, null, null, null, null, 'SUNREEF264!B10', 2010),
    (null, 'Generator-110kv-GEN-10', null, 1, '2025-09-15', null, null, null, 'SUNREEF264!B11', 2011),
    (null, 'Wooden Drill', null, 2, '2025-09-18', null, null, null, 'SUNREEF264!B12', 2012),
    (null, 'Grinder 4"', null, 3, '2025-09-18', null, null, null, 'SUNREEF264!B13', 2013),
    (null, 'Grinder 9"', null, 2, '2025-09-18', null, null, null, 'SUNREEF264!B14', 2014),
    (null, 'Air Blower', null, 2, '2025-09-18', null, null, null, 'SUNREEF264!B15', 2015),
    (null, 'Vibrator & Shaft', null, 1, '2025-09-18', null, null, null, 'SUNREEF264!B16', 2016),
    (null, 'Generator - 01-110kv', null, 1, '2025-09-18', null, null, null, 'SUNREEF264!B17', 2017),
    (null, 'Power Floor', null, 2, '2025-09-26', null, null, null, 'SUNREEF264!B18', 2018),
    (null, 'Vibrator', null, 1, '2025-09-26', null, null, null, 'SUNREEF264!B19', 2019),
    (null, 'Plate Compactor', null, 1, '2025-09-26', null, null, null, 'SUNREEF264!B20', 2020),
    (null, 'Big Vibrator & Shaft-Electric', null, 1, '2025-09-29', null, null, null, 'SUNREEF264!B21', 2021),
    (null, 'Plate Compactor', null, 1, '2025-09-21', null, null, null, 'SUNREEF264!B22', 2022),
    (null, 'Steel Cutting Machine', null, 1, '2025-09-21', null, null, null, 'SUNREEF264!B23', 2023),
    (null, 'Baby Roller-Driver', null, 1, '2025-09-21', null, null, null, 'SUNREEF264!B24', 2024),
    (null, 'Big compressor-Red', null, 1, '2025-10-08', null, null, null, 'SUNREEF264!B25', 2025),
    (null, 'Floor Cutter Machine', null, 1, '2025-10-12', null, null, null, 'SUNREEF264!B26', 2026),
    (null, 'Jack Hammer', null, 1, '2025-10-15', 'new', null, null, 'SUNREEF264!B27', 2027),
    (null, 'Generator-110kv-GEN-12', null, 1, '2025-10-15', null, null, null, 'SUNREEF264!B28', 2028),
    (null, 'Plate Compactor', null, 2, '2025-10-21', 'new', null, null, 'SUNREEF264!B29', 2029),
    (null, 'Floor Cutter Machine', null, 1, '2025-10-21', 'new', null, null, 'SUNREEF264!B30', 2030),
    (null, 'Ply Wood Cutter', null, 1, '2025-10-24', 'new', null, null, 'SUNREEF264!B31', 2031),
    (null, 'Power Floor', null, 2, '2025-12-15', null, null, null, 'SUNREEF264!B32', 2032),
    (null, 'Wooden Drill', null, 1, '2025-12-24', 'new', null, null, 'SUNREEF264!B33', 2033),
    (null, 'Ply Wood Cutter', null, 1, '2026-01-02', null, null, null, 'SUNREEF264!B34', 2034),
    (null, 'Generator - 10kv', null, 1, '2026-01-02', null, null, null, 'SUNREEF264!B35', 2035),
    (null, 'Electric Vibrator', null, 1, '2026-01-08', null, null, null, 'SUNREEF264!B36', 2036),
    (null, 'Electric Vibrator', null, 1, '2026-01-13', null, null, null, 'SUNREEF264!B37', 2037),
    (null, 'Drill Machine', null, 1, '2026-01-25', null, null, null, 'SUNREEF264!B38', 2038),
    (null, 'Big Jack Hammer', null, 1, '2026-02-01', null, null, null, 'SUNREEF264!B39', 2039),
    (null, 'Generator - 10kv', null, 1, '2026-02-01', null, null, null, 'SUNREEF264!B40', 2040),
    (null, 'Floor Cutter Machine', null, 1, '2026-02-03', null, null, null, 'SUNREEF264!B41', 2041),
    (null, 'Ply Wood Cutter', null, 1, '2026-02-09', null, null, null, 'SUNREEF264!B42', 2042),
    (null, 'Grinder 4"', null, 2, '2026-03-05', 'extra', null, null, 'SUNREEF264!B43', 2043),
    (null, 'plate compactor', null, 2, '2026-06-01', 'new', null, null, 'SUNREEF264!B44', 2044),
    (null, 'small jackhammer', null, 3, '2026-06-16', null, null, null, 'SUNREEF264!B45', 2045),
    (null, 'big jackhammer', null, 1, '2026-06-16', null, null, null, 'SUNREEF264!B46', 2046),
    (null, 'concrete drill', null, 1, '2026-06-16', null, null, null, 'SUNREEF264!B47', 2047),
    (null, 'jigsaw', null, 1, '2026-06-16', null, null, null, 'SUNREEF264!B48', 2048),
    (null, 'pump diesel', null, 1, '2026-06-25', null, null, null, 'SUNREEF264!B49', 2049),
    (null, 'grinder 9"', null, 1, '2026-05-05', 'extra', null, null, 'SUNREEF264!B50', 2050),
    (null, 'grinder 4"', null, 1, '2026-05-05', 'extra', null, null, 'SUNREEF264!B51', 2051),
    (null, 'jackhmmer medium', null, 1, '2026-04-21', 'extra', null, null, 'SUNREEF264!B52', 2052),
    (null, '13mm titoner electrical', null, 1, '2026-07-05', 'new', null, null, 'SUNREEF264!B53', 2053),
    (null, 'powerfloor', null, 2, '2026-07-16', null, null, 'taheb', 'SUNREEF264!B54', 2054),
    (null, 'diesel tanker', null, 1, '2026-07-16', null, null, 'taheb', 'SUNREEF264!B55', 2055),
    (null, 'floor cutting machine', null, 1, null, 'extra', null, 'taheb', 'SUNREEF264!B56', 2056),
    (null, 'grinder 9"', null, 1, '2026-07-26', 'new', null, 'taheb', 'SUNREEF264!B57', 2057),
    (null, 'grindser 4.5"(DCK)', null, 1, '2026-07-26', 'new', null, 'taheb', 'SUNREEF264!B58', 2058),
    (null, 'generatorwpsp165', null, 1, '2026-08-14', null, null, 'taheb', 'SUNREEF264!B59', 2059),
    (null, 'CEMENT MIXER DRILL', null, 1, '2026-08-18', 'extra', null, 'taheb', 'SUNREEF264!B60', 2060),
    (null, 'generator110kv-06', null, 1, '2026-10-13', 'extra', null, null, 'SUNREEF264!B61', 2061),
    (null, 'BIG JACKHAMMER', null, 1, '2026-11-05', 'extra', null, 'KALEK', 'SUNREEF264!B62', 2062)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK264' or lower(name) = lower('Sunreef RAK-264')
              order by upper(code) = 'RAK264' desc nulls last limit 1) s
on conflict (src) do nothing;

-- KHALBA SH0011 → SH0011: 33 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'Generator-275kv', null, 1, '2025-12-03', null, null, null, 'KHALBA SH0011!B3', 2003),
    (null, 'Steel Bending Machine', null, 1, '2025-12-03', null, null, null, 'KHALBA SH0011!B4', 2004),
    (null, 'Steel Cutting Machine', null, 3, '2025-12-03', null, null, null, 'KHALBA SH0011!B5', 2005),
    (null, 'Baby Roller', null, 1, '2025-12-03', null, null, null, 'KHALBA SH0011!B6', 2006),
    (null, 'Wooden Drill', null, 2, '2025-12-20', null, null, null, 'KHALBA SH0011!B7', 2007),
    (null, 'Grinder 9"', null, 1, '2025-12-20', null, null, null, 'KHALBA SH0011!B8', 2008),
    (null, 'Grinder 4"', null, 1, '2025-12-20', null, null, null, 'KHALBA SH0011!B9', 2009),
    (null, 'Big Jack Hammer', null, 1, '2025-12-20', null, null, null, 'KHALBA SH0011!B10', 2010),
    (null, 'Jack Hammer', null, 1, '2025-12-20', null, null, null, 'KHALBA SH0011!B11', 2011),
    (null, 'Generator-110kv', null, 1, '2025-12-03', null, null, null, 'KHALBA SH0011!B12', 2012),
    (null, 'Drill Machine', null, 1, '2025-12-20', null, null, null, 'KHALBA SH0011!B13', 2013),
    (null, 'Ply Wood Cutter', null, 2, '2025-12-10', null, null, null, 'KHALBA SH0011!B14', 2014),
    (null, 'Baby Roller', null, 1, '2025-12-12', null, null, null, 'KHALBA SH0011!B15', 2015),
    (null, 'Plate Compactor', null, 2, '2025-12-12', null, null, null, 'KHALBA SH0011!B16', 2016),
    (null, 'Air Blower', null, 2, '2026-01-04', null, null, null, 'KHALBA SH0011!B17', 2017),
    (null, 'Generator-165kv', null, 1, '2026-01-04', null, null, null, 'KHALBA SH0011!B18', 2018),
    (null, 'Ply Wood Cutter', null, 2, '2026-01-04', null, null, null, 'KHALBA SH0011!B19', 2019),
    (null, 'Baby Roller', null, 1, '2026-01-06', null, null, null, 'KHALBA SH0011!B20', 2020),
    (null, 'Vibrator', null, 1, '2026-01-07', null, null, null, 'KHALBA SH0011!B21', 2021),
    (null, 'Steel Bending Machine', null, 1, '2026-01-08', 'returned', null, null, 'KHALBA SH0011!B22', 2022),
    (null, 'Steel Bending Machine', null, 1, '2026-01-17', 'returned', null, null, 'KHALBA SH0011!B23', 2023),
    (null, 'Baby Roller', null, 1, '2026-02-01', null, null, null, 'KHALBA SH0011!B24', 2024),
    (null, 'Generator-165kv', null, 1, '2026-02-01', null, null, null, 'KHALBA SH0011!B25', 2025),
    (null, 'Tower Light', null, 1, '2026-02-10', null, null, null, 'KHALBA SH0011!B26', 2026),
    (null, 'tower light red', null, 1, '2026-06-23', 'returned', null, null, 'KHALBA SH0011!B27', 2027),
    (null, 'submersible pump', null, 1, '2026-04-02', null, null, null, 'KHALBA SH0011!B28', 2028),
    (null, 'grinder 4"', null, 1, '2026-04-08', 'new', null, null, 'KHALBA SH0011!B29', 2029),
    (null, 'plaster machine', null, 1, '2026-07-07', null, null, null, 'KHALBA SH0011!B30', 2030),
    (null, 'impact drill', null, 1, '2026-07-10', 'new', null, null, 'KHALBA SH0011!B31', 2031),
    (null, 'stand fan', null, 1, '2026-07-13', 'new', null, null, 'KHALBA SH0011!B32', 2032),
    (null, 'concrete drill', null, 1, '2026-07-12', 'extra', null, null, 'KHALBA SH0011!B33', 2033),
    (null, 'grinder 9"', null, 1, '2026-07-27', 'new', null, null, 'KHALBA SH0011!B34', 2034),
    (null, 'stand fan', null, 2, '2026-08-24', 'new', null, null, 'KHALBA SH0011!B35', 2035)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'SH0011' or lower(name) = lower('Khalba SH0011')
              order by upper(code) = 'SH0011' desc nulls last limit 1) s
on conflict (src) do nothing;

-- RAK273 → RAK273: 19 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'PETROL WATERPUMP', null, 3, '2026-08-05', 'new', null, 'NAVEED FOREMAN', 'RAK273!C3', 3),
    (null, 'GENERATOR(RED)', '110KV', 1, '2026-08-07', 'extra', null, 'momin', 'RAK273!C4', 4),
    (null, 'BIG DIESEL WATER PUMP', null, 1, '2026-08-09', 'new', null, 'MABINI', 'RAK273!C5', 5),
    (null, 'GENERATOR small', '10kv', 1, '2026-08-11', 'extra', null, 'MABINI', 'RAK273!C6', 6),
    (null, 'SCOOTER BIKE', null, 2, '2026-08-13', 'extra', null, 'HAMID', 'RAK273!C7', 7),
    (null, 'GENERATOR small', '10KV', 1, '2026-08-16', null, null, null, 'RAK273!C8', 8),
    (null, 'TOWERLIGHT', 'VT-7', 1, '2026-08-17', 'extra', null, 'HAMID', 'RAK273!C9', 9),
    (null, 'BIG WATER PUMP', null, 1, '2026-08-19', 'extra', null, 'HAMID', 'RAK273!C10', 10),
    (null, 'generator', '60kv', 1, '2026-08-20', 'extra', null, 'hamid', 'RAK273!C11', 11),
    (null, 'towerlight solar', null, 3, '2026-08-25', 'extra', null, 'hamid', 'RAK273!C12', 12),
    (null, 'towerlight', null, 1, '2026-09-01', 'extra', null, 'hamid', 'RAK273!C13', 13),
    (null, 'generator olympian', '160kva', 1, '2026-09-02', 'extra', null, null, 'RAK273!C14', 14),
    (null, 'WOODEN DRILL', null, 1, '2026-09-13', 'extra', null, 'ENG.ABUJABAD', 'RAK273!C15', 15),
    (null, 'SCOOTER BIKE', null, 1, '2026-09-16', 'extra', null, 'mabini', 'RAK273!C16', 16),
    (null, 'generator(alaqaa)', '60kv', 1, '2026-09-24', 'extra', null, 'hamid', 'RAK273!C17', 17),
    (null, 'generator(marapco)', '275kva', 1, '2026-10-05', 'new', null, 'mabini', 'RAK273!C18', 18),
    (null, 'grinder 9"', null, 1, '2026-10-21', 'extra', null, 'eng.abujabad', 'RAK273!C19', 19),
    (null, 'solar led floodlight', null, 3, '2026-10-25', 'new', null, 'makmod', 'RAK273!C20', 20),
    (null, 'towerlight(white)', null, 1, '2026-11-03', 'extra', null, 'hamid', 'RAK273!C21', 21)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK273' or lower(name) = lower('RAK273')
              order by upper(code) = 'RAK273' desc nulls last limit 1) s
on conflict (src) do nothing;

-- ASHOK LINE → ASHOK: 1 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'FLOOR CUTTER', null, 1, '2026-08-04', 'extra', null, 'HAMID', 'ASHOK LINE!C3', 3)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'ASHOK' or lower(name) = lower('Ashok Line')
              order by upper(code) = 'ASHOK' desc nulls last limit 1) s
on conflict (src) do nothing;

-- RAK274 → RAK274: 17 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    ('civil', 'handcutter', null, 2, '2026-09-30', 'extra', null, null, 'RAK274!C3', 3),
    ('civil', 'grinder 9"', null, 2, '2026-09-30', 'extra', null, null, 'RAK274!C4', 4),
    ('civil', 'plate compactor', null, 1, '2026-09-30', 'extra', null, null, 'RAK274!C5', 5),
    ('civil', 'titener drill(wulf)', null, 1, '2026-10-05', 'new', null, null, 'RAK274!C6', 6),
    ('civil', 'medium jackhammer', null, 2, '2026-10-05', 'new', null, null, 'RAK274!C7', 7),
    ('civil', 'concrete drill(hkk)', null, 1, '2026-10-05', 'extra', null, null, 'RAK274!C8', 8),
    ('civil', 'generator', '110kva', 1, '2026-10-05', 'extra', null, null, 'RAK274!C9', 9),
    ('civil', 'generator(marapco)', '275kv', 1, '2026-10-08', 'new', null, null, 'RAK274!C10', 10),
    ('civil', 'generator160kva', 'g-0407', 1, '2026-10-11', 'extra', null, null, 'RAK274!C11', 11),
    ('civil', 'concrete vibrator with shaft', null, 1, '2026-10-11', 'extra', null, null, 'RAK274!C12', 12),
    ('civil', 'jigsaw(crown)', null, 1, '2026-10-15', 'new', null, null, 'RAK274!C13', 13),
    ('civil', 'steel bending machine', null, 1, '2026-10-23', 'new', 'new/extra', null, 'RAK274!C14', 14),
    ('civil', 'steel cutting machine', null, 1, '2026-10-23', 'new', 'new/extra', null, 'RAK274!C15', 15),
    ('civil', 'GRINDER 4.5"', null, 1, '2026-10-27', 'extra', null, null, 'RAK274!C16', 16),
    ('civil', 'air blower(dck)', null, 1, '2026-11-04', 'new', null, null, 'RAK274!C17', 17),
    ('civil', 'plate compactor', null, 1, '2026-11-04', 'extra', null, null, 'RAK274!C18', 18),
    ('civil', 'vibrator with shaft', null, 1, '2026-11-04', 'extra', null, null, 'RAK274!C19', 19)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK274' or lower(name) = lower('RAK274')
              order by upper(code) = 'RAK274' desc nulls last limit 1) s
on conflict (src) do nothing;

-- MARJANRAK275 → RAK275: 22 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'steel cutting machine', null, 2, '2026-10-12', 'new', null, null, 'MARJANRAK275!C3', 3),
    (null, 'steel bending machine', null, 2, '2026-10-12', 'new', null, null, 'MARJANRAK275!C4', 4),
    (null, 'grinder 9"(wulf)', null, 3, '2026-10-12', 'new', null, null, 'MARJANRAK275!C5', 5),
    (null, 'grinder 4"(dck)', null, 2, '2026-10-12', 'new', null, null, 'MARJANRAK275!C6', 6),
    (null, 'concrete vibrator with needle', null, 2, '2026-10-12', 'new', null, null, 'MARJANRAK275!C7', 7),
    (null, 'plate compactor', null, 1, '2026-10-12', 'new', null, null, 'MARJANRAK275!C8', 8),
    (null, 'concrete drill (hkk)', null, 2, '2026-10-12', 'new', null, null, 'MARJANRAK275!C9', 9),
    (null, 'HAND CUTTER(FORD)', null, 1, '2026-10-12', 'new', null, null, 'MARJANRAK275!C10', 10),
    (null, 'generator-wpsp-165-ge-39', null, 1, '2026-10-15', 'extra', null, null, 'MARJANRAK275!C11', 11),
    (null, 'GRINDER 9"(MAKITA)', null, 2, '2026-10-20', 'new', null, null, 'MARJANRAK275!C12', 12),
    (null, 'CONCRETE DRILL(PROTOOL)', null, 2, '2026-10-23', 'new', null, null, 'MARJANRAK275!C13', 13),
    (null, 'small generator 10kv', null, 1, '2026-10-23', 'extra', null, null, 'MARJANRAK275!C14', 14),
    (null, 'medium jackhammer(wulf)', null, 2, '2026-10-25', 'new', null, null, 'MARJANRAK275!C15', 15),
    (null, 'air blower(red)', null, 1, '2026-10-25', 'new', null, null, 'MARJANRAK275!C16', 16),
    (null, 'titener drill(wulf)', null, 2, '2026-10-27', 'new', null, null, 'MARJANRAK275!C17', 17),
    (null, 'wooden drill(dck)', null, 2, '2026-10-27', 'new', null, null, 'MARJANRAK275!C18', 18),
    (null, 'GRINDER 9"(WULF)', null, 1, '2026-10-27', 'new', null, null, 'MARJANRAK275!C19', 19),
    (null, 'GRINDER 4.5(DCK)', null, 1, '2026-10-28', 'new', null, null, 'MARJANRAK275!C20', 20),
    (null, 'concrete vibrator with shaft', null, 1, '2026-10-29', 'new', null, 'mumtaz', 'MARJANRAK275!C21', 21),
    (null, 'air blower(dck)red', null, 1, '2026-11-03', 'new', null, 'mumtaz', 'MARJANRAK275!C22', 22),
    (null, 'grinder 4.5"', null, 2, '2026-11-15', 'extra', null, 'mumtaz', 'MARJANRAK275!C23', 23),
    (null, 'grinder 4.5"(dck)', null, 1, '2026-11-15', 'new', null, 'hamid', 'MARJANRAK275!C24', 24)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK275' or lower(name) = lower('Marjan RAK275')
              order by upper(code) = 'RAK275' desc nulls last limit 1) s
on conflict (src) do nothing;

-- AL GHAIL LABOR CAMP → AG-CAMP: 1 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'GENERATOR(MARAPCO)275KV', '2', 1, '2026-11-10', 'new', null, null, 'AL GHAIL LABOR CAMP!C3', 3)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'AG-CAMP' or lower(name) = lower('Al Ghail Labor Camp')
              order by upper(code) = 'AG-CAMP' desc nulls last limit 1) s
on conflict (src) do nothing;

-- RAK271 → RAK271: 3 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'GRINDER 4.5"', null, 2, '2026-10-06', 'extra', null, 'FOR.AVIJET', 'RAK271!C3', 3),
    (null, 'generator60kv', '8', 1, '2026-10-13', 'extra', null, 'mabini', 'RAK271!C4', 4),
    (null, 'GRINDER 4.5"(dck)', null, 1, '2026-11-06', 'new', null, 'mohet', 'RAK271!C5', 5)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'RAK271' or lower(name) = lower('RAK271')
              order by upper(code) = 'RAK271' desc nulls last limit 1) s
on conflict (src) do nothing;

-- VAID MAINTENANCE → VAID: 2 lines
insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort
  from (values
    (null, 'GRINDER 4.5"(DCK)', null, 1, '2026-10-04', 'new', null, 'VAID', 'VAID MAINTENANCE!C3', 3),
    (null, 'SMALL JACKHAMMER', null, 1, '2026-10-04', 'extra', null, 'VAID', 'VAID MAINTENANCE!C4', 4)
  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)
  cross join (select id from ms_stores where upper(code) = 'VAID' or lower(name) = lower('Vaid Maintenance')
              order by upper(code) = 'VAID' desc nulls last limit 1) s
on conflict (src) do nothing;

select 'site lines' as item, (select count(*) from ms_site_equipment)::text as n
union all select 'sites with equipment', (select count(distinct store_id) from ms_site_equipment)::text;
