#!/usr/bin/env python3
# The owner's sheet «SITE EQUIPMENT UPDATED 2026.xlsx» → supabase/site-equipment.sql (the sites as projects, their equipment).
#
#   python3 tools/equipment-import.py "data/SITE EQUIPMENT UPDATED 2026.xlsx" > supabase/site-equipment.sql
#
# One tab per site. Two layouts live in the workbook:
#   A) a list:  Sl No | Equipment | Plate No | Qty | Sites Name & Code | [remarks] | [DATE] | [RECEIVE] | …
#   B) a log:   <site title> | Qty | date | remarks | … — sometimes two logs side by side (CIVIL and MEP), the section in the title
#      («Al Ghail RAK267/MEP») or on a row of its own («… | MEP»).
# A quantity is often typed with its tag («2new», «1xtra»); a date, a tag (new / extra / returned / rent / balance), a remark or a
# receiver may sit in any of the trailing columns. A row with no name, or a list row with a zero / blank quantity, is left out.
# Every row keeps its place in the sheet as src («RAK266!B47»), so running the SQL again adds only what is new and never doubles.
# Needs openpyxl (pip install openpyxl). Standard library otherwise.
import datetime
import re
import sys

import openpyxl

# tab → (project name, project code). The code is the key: an existing store / project with this code is used as it is.
SITES = {
    'rak270': ('Al Ghail RAK270 - FreeZone', 'RAK270'),
    'rak261': ('Al Ghail RAK-261', 'RAK261'),
    'rak267': ('Al Ghail RAK267', 'RAK267'),
    'rak260': ('Rakez RAK260', 'RAK260'),
    'rak242': ('Rakez Central RAK242', 'RAK242'),
    'RAK248': ('Rakez RAK248', 'RAK248'),
    'RAK249': ('Rakez RAK249', 'RAK249'),
    'RAK254': ('Rakez RAK254', 'RAK254'),
    'RAK246': ('Sobha RAK246', 'RAK246'),
    'RAK266': ('Al Ghail RAK266', 'RAK266'),
    'VIP VILLA RAK247': ('VIP Villa RAK247', 'RAK247'),
    'EXPRO RAK257': ('XPRO RAK257', 'RAK257'),
    'RAK250': ('RAK-250', 'RAK250'),
    'RAK269': ('RAK269', 'RAK269'),
    'BOSKALIS262': ('Boskalis RAK262', 'RAK262'),
    'WELDING WORKSHOP': ('Welding Workshop', 'WELDING'),
    'DXB DUBAI SITE': ('Dubai Site - Mudon School', 'DXB'),
    'SUNREEF264': ('Sunreef RAK-264', 'RAK264'),
    'KHALBA SH0011': ('Khalba SH0011', 'SH0011'),
    'RAK273': ('RAK273', 'RAK273'),
    'ASHOK LINE': ('Ashok Line', 'ASHOK'),
    'RAK274': ('RAK274', 'RAK274'),
    'MARJANRAK275': ('Marjan RAK275', 'RAK275'),
    'AL GHAIL LABOR CAMP': ('Al Ghail Labor Camp', 'AG-CAMP'),
    'RAK271': ('RAK271', 'RAK271'),
    'VAID MAINTENANCE': ('Vaid Maintenance', 'VAID'),
}
TAGS = [('returned', r'^\d*\s*return(ed)?$'), ('balance', r'^\d*\s*balance$'), ('rent', r'^rent(al)?$'),
        ('new', r'^(\d*\s*new|new\s*-?\s*\d*|new/extra)$'), ('extra', r'^\d*\s*(e?xtra|extra)$')]
SECTIONS = {'civil': 'civil', 'mep': 'mep'}


def clean(v):
    if v is None:
        return None
    if isinstance(v, float) and v.is_integer():
        v = int(v)
    s = re.sub(r'\s+', ' ', str(v)).strip()
    return s or None


def tag_of(s):
    """('new', rest) for «NEW», «2new», «new - 2», «1RETURNED» …; (None, s) for anything else."""
    if not s:
        return None, None
    low = s.lower()
    for tag, rx in TAGS:
        if re.match(rx, low):
            return tag, None
    return None, s


def qty_of(v):
    """(qty, tag): 2 → (2, None); '2new' → (2, 'new'); '1xtra' → (1, 'extra'); 'extra' → (None, 'extra')."""
    if v is None:
        return None, None
    if isinstance(v, (int, float)):
        return (int(v) if float(v).is_integer() else float(v)), None
    s = clean(v)
    m = re.match(r'^(\d+(?:\.\d+)?)\s*(.*)$', s)
    if m:
        t, _ = tag_of(m.group(2)) if m.group(2) else (None, None)
        return float(m.group(1)) if '.' in m.group(1) else int(m.group(1)), t
    t, _ = tag_of(s)
    return None, t


def is_date(v):
    return isinstance(v, (datetime.datetime, datetime.date))


class Row:
    def __init__(self, src, sort, section):
        self.src, self.sort, self.section = src, sort, section
        self.name = self.ref = self.qty = self.sent_on = self.tag = self.received_by = None
        self.remarks = []

    def extra(self, v, receiver=False):
        """A trailing cell: a date, a tag, a receiver or a remark."""
        if v is None:
            return
        if is_date(v):
            if self.sent_on is None:
                self.sent_on = v.date().isoformat() if isinstance(v, datetime.datetime) else v.isoformat()
            return
        s = clean(v)
        if s is None:
            return
        t, rest = tag_of(s)
        if t:
            self.tag = self.tag or t
            if s.lower() in ('new/extra',):
                self.remarks.append(s)
            return
        if s.lower() in SECTIONS:
            self.section = SECTIONS[s.lower()]
            return
        if receiver:
            self.received_by = self.received_by or s
        else:
            self.remarks.append(s)


def list_sheet(ws, title):
    """Layout A. Columns found by their header on row 2."""
    hdr = {}
    for c in ws[2]:
        h = clean(c.value)
        if h:
            hdr[c.column] = h.lower()
    col = lambda *names: next((k for k, h in hdr.items() if any(h.startswith(n) for n in names)), None)
    c_name, c_ref, c_qty, c_site = col('equitment', 'equipment'), col('plate'), col('qty'), col('sites')
    c_recv = col('receive')
    rows = []
    for r in range(3, ws.max_row + 1):
        name = clean(ws.cell(r, c_name).value)
        if not name:
            continue
        row = Row(f'{title}!{ws.cell(r, c_name).coordinate}', r, None)
        row.name = name
        ref = clean(ws.cell(r, c_ref).value) if c_ref else None
        if ref and ref.lower() in SECTIONS:
            row.section = SECTIONS[ref.lower()]
        elif ref and ref.lower().startswith('foreman'):
            row.received_by = ref
        elif ref:
            t, rest = tag_of(ref)
            if t:
                row.tag = t
            else:
                row.ref = ref
        row.qty, qt = qty_of(ws.cell(r, c_qty).value)
        row.tag = row.tag or qt
        site = ws.cell(r, c_site).value if c_site else None
        if is_date(site) or (isinstance(site, str) and tag_of(clean(site))[0]):
            row.extra(site)                       # a tag or a date typed in the site column
        for c in range(c_site + 1 if c_site else c_qty + 1, ws.max_column + 1):
            row.extra(ws.cell(r, c).value, receiver=bool(c_recv and c >= c_recv))
        if row.qty == 0 or (row.qty is None and not row.sent_on and not row.tag):
            continue                              # the template's lines for what the site does not have
        rows.append(row)
    return rows


def log_sheet(ws, title):
    """Layout B. A block starts at a header whose right-hand cell is «Qty»."""
    starts = [c.column for c in ws[2] if clean(c.value) and clean(ws.cell(2, c.column + 1).value or '') and clean(ws.cell(2, c.column + 1).value).lower() == 'qty']
    rows = []
    for i, c0 in enumerate(starts):
        c1 = (starts[i + 1] - 1) if i + 1 < len(starts) else ws.max_column
        head = clean(ws.cell(2, c0).value).lower()
        section = 'mep' if head.endswith('/mep') else 'civil' if head.endswith('/civil') else None
        for c in range(c0 + 2, c1 + 1):         # «civil» typed over the date column of the header
            h = clean(ws.cell(2, c).value)
            if h and h.lower() in SECTIONS:
                section = SECTIONS[h.lower()]
        hdrs = {c: (clean(ws.cell(2, c).value) or '').lower() for c in range(c0 + 2, c1 + 1)}
        for r in range(3, ws.max_row + 1):
            name, q = clean(ws.cell(r, c0).value), ws.cell(r, c0 + 1).value
            qs = clean(q)
            if qs and qs.lower() in SECTIONS and (not name or name.lower() == head or name.lower().startswith(head.split('/')[0][:12])):
                section = SECTIONS[qs.lower()]     # a section row: «… | MEP» or « | civil»
                continue
            if not name or (name.lower() == head):
                continue
            row = Row(f'{title}!{ws.cell(r, c0).coordinate}', r + c0 * 1000, section)
            row.name = name
            row.qty, row.tag = qty_of(q)
            for c in range(c0 + 2, c1 + 1):
                row.extra(ws.cell(r, c).value, receiver=hdrs.get(c) in ('driver', 'receive'))
            if row.qty == 0:
                continue
            rows.append(row)
    return rows


def sql(v):
    if v is None:
        return 'null'
    if isinstance(v, (int, float)):
        return str(v)
    return "'" + str(v).replace("'", "''") + "'"


def main(path):
    wb = openpyxl.load_workbook(path, data_only=True)
    out, total, per = [], 0, []
    for ws in wb.worksheets:
        if ws.title not in SITES:
            print(f'-- skipped tab «{ws.title}» (no site for it)', file=sys.stderr)
            continue
        hdr = [clean(c.value) for c in ws[2]]
        rows = list_sheet(ws, ws.title) if any(h and h.lower().startswith(('equitment', 'equipment')) for h in hdr) else log_sheet(ws, ws.title)
        per.append((ws.title, len(rows)))
        total += len(rows)
        out.append((ws.title, rows))
    p = print
    p('-- Orion Mechanic Store — the equipment at the sites, from the owner\'s sheet «SITE EQUIPMENT UPDATED 2026.xlsx».')
    p('-- Made by tools/equipment-import.py — do not edit by hand; run the script again on a newer sheet.')
    p('-- Run it AFTER schema.sql (SQL Editor → paste → Run). Safe to run again: a site is made once (by its code), a line once (src).')
    p(f'-- {len(out)} sites, {total} lines: ' + ', '.join(f'{t} {n}' for t, n in per))
    p()
    p('-- the sites, each a project (a store of kind \'project\') — an existing store with the same code or name is used as it is')
    for title, _ in out:
        name, code = SITES[title]
        p(f"insert into ms_stores (name, kind, code, sort) select {sql(name)}, 'project', {sql(code)}, 500 "
          f"where not exists (select 1 from ms_stores where upper(code) = {sql(code)} or lower(name) = lower({sql(name)}));")
    p()
    for title, rows in out:
        if not rows:
            continue
        code = SITES[title][1]
        p(f'-- {title} → {code}: {len(rows)} lines')
        p('insert into ms_site_equipment (store_id, section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)')
        p('select s.id, v.section, v.name, v.ref, v.qty::numeric, v.sent_on::date, v.tag, v.remarks, v.received_by, v.src, v.sort')
        p('  from (values')
        vals = []
        for r in rows:
            rem = ' · '.join(dict.fromkeys(r.remarks)) or None
            vals.append(f'    ({sql(r.section)}, {sql(r.name[:120])}, {sql((r.ref or "")[:40] or None)}, {sql(r.qty)}, {sql(r.sent_on)}, {sql(r.tag)}, '
                        f'{sql(rem[:200] if rem else None)}, {sql((r.received_by or "")[:80] or None)}, {sql(r.src)}, {r.sort})')
        p(',\n'.join(vals))
        p('  ) as v(section, name, ref, qty, sent_on, tag, remarks, received_by, src, sort)')
        p(f"  cross join (select id from ms_stores where upper(code) = {sql(code)} or lower(name) = lower({sql(SITES[title][0])})")
        p(f"              order by upper(code) = {sql(code)} desc nulls last limit 1) s")
        p('on conflict (src) do nothing;')
        p()
    p("select 'site lines' as item, (select count(*) from ms_site_equipment)::text as n")
    p("union all select 'sites with equipment', (select count(distinct store_id) from ms_site_equipment)::text;")


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit('usage: python3 tools/equipment-import.py "<the sheet>.xlsx" > supabase/site-equipment.sql')
    main(sys.argv[1])
