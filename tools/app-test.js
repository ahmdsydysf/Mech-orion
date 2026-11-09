// jsdom test for the mechanic store (public/), over the in-memory server of tools/preview.js. The storekeeper: the stock, a new item,
// an issue to a plate with its filters, a receipt, a transfer, a count, the history and a voucher; the admin cancelling a movement and
// managing the accounts (create, refusals in words, edit, stop, password, delete on a second tap, never himself); the mechanic and the
// viewer reading; a stopped account; the database not set up; the page not configured; English. Prints a pass/fail line per check.
//
//   node tools/app-test.js
const { JSDOM } = require('jsdom');
const fs = require('fs'), path = require('path');
const { build } = require(path.join(__dirname, 'preview.js'));
const html = build().replace(/<link[^>]+>/g, '');
const T = []; const check = (n, ok, got) => T.push({ n, ok: !!ok, got: ok ? undefined : got });

async function boot(role, opt = {}) {
  const errors = [], printed = [];
  const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'https://x.test/?role=' + role + (opt.qs || ''), beforeParse(w) {
    w.matchMedia = () => ({ matches: false }); w.scrollTo = () => {}; w.HTMLElement.prototype.scrollIntoView = () => {};
    if (opt.lang) w.localStorage.setItem('lang', opt.lang);
    w.open = () => ({ document: { write(h) { printed.push(h); }, close() {} }, close() {}, location: {} });
    w.prompt = () => opt.prompt || null;
  } });
  dom.window.addEventListener('error', e => errors.push(e.message + ' @' + (e.lineno || '')));
  const w = dom.window, d = w.document, wait = ms => new Promise(r => setTimeout(r, ms));
  const click = el => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  const set = (id, v) => { const el = typeof id === 'string' ? d.getElementById(id) : id; el.value = v; el.dispatchEvent(new w.Event('input', { bubbles: true })); el.dispatchEvent(new w.Event('change', { bubbles: true })); };
  const txt = el => (el?.textContent || '').replace(/\s+/g, ' ');
  const active = () => [...d.querySelectorAll('.screen')].find(s => s.classList.contains('active'))?.id;
  const tabs = () => d.getElementById('nav').classList.contains('hidden') ? '' : [...d.querySelectorAll('nav button')].filter(b => !b.classList.contains('hidden')).map(b => b.dataset.s).join();
  const open = id => !d.getElementById(id).classList.contains('hidden');
  const nav = s => click(d.querySelector(`nav button[data-s="${s}"]`));
  await wait(300);
  return { w, d, errors, printed, wait, click, set, txt, active, tabs, open, nav, calls: () => w.__calls, db: w.__db };
}
const AR = /[؀-ۿ]/;

(async () => {
  // ---------------- the storekeeper ----------------
  {
    const B = await boot('storekeeper'), { w, d, errors, printed, wait, click, set, txt, active, tabs, open, nav, db } = B;
    check('storekeeper: lands on the stock, five tabs (projects second)', active() === 'scr-stock' && tabs() === 'stock,projects,move,moves,filters', active() + ' ' + tabs());
    const hero = txt(d.getElementById('skHero'));
    check('the hero: 11 items (the stopped one with nothing left out), 5 in stock, 1 below minimum, 6 at zero', /11\s*صنف/.test(hero) && /5\s*فيها رصيد/.test(hero) && /1\s*تحت الحد/.test(hero) && /6\s*رصيدها صفر/.test(hero), hero);
    const rows = () => [...d.querySelectorAll('#skList .frow')];
    check('the list: 12 rows, each with its code and quantity', rows().length === 12 && /MCH-0001/.test(txt(rows()[0])) && txt(rows()[0].querySelector('.qty')) === '4', rows().length + ' ' + txt(rows()[0]));
    check('the store chips (the main store, two projects marked 🏗) and the category chips', d.querySelectorAll('#skStores .chip').length === 4 && /🏗 Site A/.test(txt(d.getElementById('skStores'))) && /الفلاتر/.test(txt(d.getElementById('skCats'))), txt(d.getElementById('skStores')));
    set('skSearch', 'fo3143'); await wait(20);
    check('search: «fo3143» finds FO-3143', rows().length === 1 && /FO-3143/.test(txt(rows()[0])), rows().map(r => txt(r)));
    set('skSearch', ''); click(d.querySelector('#skCats [data-v="low"]')); await wait(20);
    check('«below minimum»: the tape alone (6 under its 10)', rows().length === 1 && /ELECTRICAL TAPE/.test(txt(rows()[0])), rows().map(r => txt(r.querySelector('.fn'))));
    click(d.querySelector('#skCats [data-v="all"]')); await wait(20);
    // an item opened
    click(rows().find(r => /FO-3143/.test(txt(r))).querySelector('.fb')); await wait(80);
    const sh = txt(d.getElementById('editBody'));
    check('an item opened: its code, stock by store, the equipment it fits, its history', open('editSheet') && /FLT-0008/.test(sh) && /Main store/.test(sh) && /74522/.test(sh) && /ADJ-000001/.test(sh) && /\+5/.test(sh), sh.slice(0, 400));
    check('… with «issue it», «receive», edit and stop for the storekeeper, no delete', !!d.getElementById('iGoIssue') && !!d.getElementById('iEditB') && !d.getElementById('iDelB'), null);
    click(d.getElementById('iGoIssue')); await wait(60);
    check('«issue it» opens a new issue with the item on it', active() === 'scr-move' && d.querySelector('#mvKind [data-k="issue"]').classList.contains('on') && d.querySelectorAll('#mvLines .lrow').length === 1, active());
    // the issue: the plate's filters
    set('mvPlate', '74522'); await wait(20);
    const chips = [...d.querySelectorAll('#mvFits .fitchip')];
    check('the plate picked: its filters as chips, FO-3143 on (already a line), FO-57 and FF-5200 offered', chips.length === 3 && chips.find(c => /FO-3143/.test(txt(c))).classList.contains('on') && /بالمخزن 3/.test(txt(chips.find(c => /FF-5200/.test(txt(c))))), chips.map(c => txt(c)));
    click(chips.find(c => /FF-5200/.test(txt(c)))); await wait(80);
    check('a chip tapped adds the filter as a line', d.querySelectorAll('#mvLines .lrow').length === 2, d.querySelectorAll('#mvLines .lrow').length);
    const ins = () => [...d.querySelectorAll('#mvLines .lqin')];
    set(ins()[0], '2'); set(ins()[1], '9'); await wait(30);
    check('a quantity over the shelf is marked on its line', d.querySelectorAll('#mvLines .lrow.over').length === 1, d.querySelectorAll('#mvLines .lrow.over').length);
    set('mvParty', 'Mech One'); set('mvRef', 'jc-5');
    click(d.getElementById('btnMvSave')); await wait(80);
    check('the server refuses it in words: only 3 of FLT-0010, nothing moved', /لا يكفي الرصيد: الصنف FLT-0010 المتاح منه 3 فقط/.test(txt(d.getElementById('mvMsg'))) && db.have('s1', 'i-FLT-0008') === 5, txt(d.getElementById('mvMsg')));
    set(ins()[1], '1'); await wait(20);
    click(d.getElementById('btnMvSave')); await wait(100);
    const sent = B.calls().filter(c => c.rpc === 'ms_post').pop();
    check('saved: ISS-000002, the shelves 3 and 2, the form emptied', /ISS-000002/.test(txt(d.getElementById('mvMsg'))) && db.have('s1', 'i-FLT-0008') === 3 && db.have('s1', 'i-FLT-0010') === 2 && d.querySelectorAll('#mvLines .lrow').length === 0, txt(d.getElementById('mvMsg')));
    check('what was sent: issue, the main store, the plate, the person, the job card, two lines with numbers', sent && sent.a.p.kind === 'issue' && sent.a.p.plate === '74522' && sent.a.p.party === 'Mech One' && sent.a.p.ref_no === 'jc-5' && sent.a.p.lines.length === 2 && sent.a.p.lines[0].qty === 2, sent && sent.a);
    // a receipt
    click(d.querySelector('#mvKind [data-k="receive"]')); await wait(20);
    check('«receive»: no plate box, the supplier and the LPO labels', !open('mvPlateBox') && /المورد/.test(txt(d.getElementById('mvPartyL'))) && /LPO/.test(txt(d.getElementById('mvRefL'))), null);
    set('mvAdd', 'i-CON-0005'); await wait(80); set(ins()[0], '24'); set('mvParty', 'Al Futtaim');
    click(d.getElementById('btnMvSave')); await wait(100);
    check('a receipt: RCV-, 24 brake cleaners on the shelf', /RCV-000003/.test(txt(d.getElementById('mvMsg'))) && db.have('s1', 'i-CON-0005') === 24, txt(d.getElementById('mvMsg')));
    // a stopped item is not offered for a receipt
    check('a stopped item is not offered for a receipt', ![...d.querySelectorAll('#mvAdd option')].some(o => o.value === 'i-MCH-0012'), null);
    // a transfer
    click(d.querySelector('#mvKind [data-k="transfer"]')); await wait(20);
    check('«transfer»: the «to store» box, no person, no plate', open('mvToBox') && !open('mvPartyBox') && !open('mvPlateBox') && d.getElementById('mvTo').value === 's2', d.getElementById('mvTo').value);
    set('mvAdd', 'i-MCH-0001'); await wait(80); set(ins()[0], '1');
    click(d.getElementById('btnMvSave')); await wait(100);
    check('a transfer: 3 grinders here, 1 at Site A', db.have('s1', 'i-MCH-0001') === 3 && db.have('s2', 'i-MCH-0001') === 1, [db.have('s1', 'i-MCH-0001'), db.have('s2', 'i-MCH-0001')]);
    // a count
    click(d.querySelector('#mvKind [data-k="adjust"]')); await wait(20);
    set('mvAdd', 'i-OIL-0006'); await wait(80);
    check('a count line says what the books hold', /في الدفتر 12/.test(txt(d.querySelector('#mvLines .lrow'))), txt(d.querySelector('#mvLines .lrow')));
    set(ins()[0], '10'); await wait(30);
    check('… and the difference once typed', /الفرق -2/.test(txt(d.querySelector('#mvLines .lrow'))), txt(d.querySelector('#mvLines .lrow')));
    click(d.getElementById('btnMvSave')); await wait(100);
    check('the count: ADJ-, 10 cans', /ADJ-000005/.test(txt(d.getElementById('mvMsg'))) && db.have('s1', 'i-OIL-0006') === 10, txt(d.getElementById('mvMsg')));
    click(d.getElementById('btnMvSave')); await wait(60);
    check('nothing on the paper → refused before sending', /أضف صنفًا/.test(txt(d.getElementById('mvMsg'))), txt(d.getElementById('mvMsg')));
    // the history
    nav('moves'); await wait(120);
    const hr = () => [...d.querySelectorAll('#hsList .frow')];
    check('the history: five movements, newest first', hr().length === 5 && /ADJ-000005/.test(txt(hr()[0])), hr().map(r => txt(r.querySelector('.fn'))));
    click(d.querySelector('#hsKinds [data-v="issue"]')); await wait(30);
    check('the «issue» chip: one', hr().length === 1 && /74522/.test(txt(hr()[0])), hr().length);
    click(d.querySelector('#hsKinds [data-v="all"]')); set('hsSearch', 'brake'); await wait(30);
    check('search by an item\'s name', hr().length === 1 && /RCV-000003/.test(txt(hr()[0])), hr().length);
    set('hsSearch', ''); await wait(20);
    click(hr().find(r => /ISS-000002/.test(txt(r))).querySelector('.fb')); await wait(40);
    check('a movement opened: its lines, a print button, no cancel for the storekeeper', /FLT-0008/.test(txt(d.getElementById('editBody'))) && !!d.getElementById('mPrint') && !d.getElementById('mVoid'), txt(d.getElementById('editBody')).slice(0, 200));
    click(d.getElementById('mPrint')); await wait(20);
    const P = printed.pop() || '';
    check('the voucher: its number, the plate, the lines, the signatures, print.js and its base', /ISS-000002/.test(P) && /74522/.test(P) && /FLT-0010/.test(P) && /أمين المخزن/.test(P) && /<script src="print.js"><\/script>/.test(P) && /<base href=/.test(P), P.length);
    // a new item
    nav('stock'); await wait(30); click(d.getElementById('btnAddItem')); await wait(30);
    set('iName', 'torque wrench'); set('iCat', 'filter'); await wait(10);
    check('a filter shows its filter type box', open('iFtBox'), null);
    set('iPart', 'fo 3143'); click(d.getElementById('btnEditSave')); await wait(60);
    check('the same part number another way → said with the item it belongs to', /FLT-0008/.test(txt(d.getElementById('editMsg'))), txt(d.getElementById('editMsg')));
    set('iCat', 'tool'); set('iPart', ''); click(d.getElementById('btnEditSave')); await wait(80);
    check('a new item saved: in the list, upper case, a TOL- code', [...d.querySelectorAll('#skList .frow')].some(r => /TORQUE WRENCH/.test(txt(r)) && /TOL-/.test(txt(r))), null);
    // filters screen
    nav('filters'); await wait(30);
    check('the filters screen: groups, 74522 with its oil and fuel filters and the stock', /Bobcat/.test(txt(d.getElementById('ftGroups'))) && /74522/.test(txt(d.getElementById('ftList'))) && d.querySelectorAll('#ftList .fitchip').length === 5, d.querySelectorAll('#ftList .fitchip').length);
    set('ftSearch', 'foa2579'); await wait(20);
    check('search by a filter number finds GEN-05', d.querySelectorAll('#ftList .frow').length === 1 && /GEN-05/.test(txt(d.getElementById('ftList'))), txt(d.getElementById('ftList')).slice(0, 100));
    check('the storekeeper: no «stores» row in the account sheet, the log row', !open('rowStores') && open('rowLog'), null);
    // the projects: send materials, move between projects, return everything
    nav('projects'); await wait(80);
    const pr = () => [...d.querySelectorAll('#pjList .frow')];
    check('projects: the two open sites, code, location, what each holds; no «new project» for the storekeeper', pr().length === 2 && /PRJ-01/.test(txt(pr()[0])) && /Dubai Marina/.test(txt(pr()[0])) && /1 صنف/.test(txt(pr()[0])) && !open('btnPjNew'), pr().map(r => txt(r)));
    click(pr()[0].querySelector('.fb')); await wait(80);
    check('a project opened: its store, its movements, the send / move / return buttons, no close for the storekeeper', /ANGLE GRINDER/.test(txt(d.getElementById('editBody'))) && /TRF-000004/.test(txt(d.getElementById('pjMoves')))
      && !!d.getElementById('pjGoSend') && !!d.getElementById('pjGoBackAll') && !d.getElementById('pjTogB'), txt(d.getElementById('editBody')).slice(0, 300));
    click(d.getElementById('pjGoSend')); await wait(60);
    check('«send materials»: a transfer from the main store to the project, the route said', active() === 'scr-move' && d.querySelector('#mvKind [data-k="transfer"]').classList.contains('on')
      && d.getElementById('mvStore').value === 's1' && d.getElementById('mvTo').value === 's2' && /صرف مواد من Main store إلى المشروع Site A/.test(txt(d.getElementById('mvRoute'))), [d.getElementById('mvStore').value, d.getElementById('mvTo').value, txt(d.getElementById('mvRoute'))]);
    set('mvAdd', 'i-CON-0005'); await wait(80); set(ins()[0], '10');
    click(d.getElementById('btnMvSave')); await wait(100);
    check('sent: 14 brake cleaners left in the main store, 10 at Site A', db.have('s1', 'i-CON-0005') === 14 && db.have('s2', 'i-CON-0005') === 10, [db.have('s1', 'i-CON-0005'), db.have('s2', 'i-CON-0005')]);
    nav('projects'); await wait(80); click(pr()[0].querySelector('.fb')); await wait(80);
    click(d.getElementById('pjGoMove')); await wait(60);
    check('«move to another project»: from Site A to Site B', d.getElementById('mvStore').value === 's2' && d.getElementById('mvTo').value === 's3' && /من المشروع Site A إلى المشروع Site B/.test(txt(d.getElementById('mvRoute'))), [d.getElementById('mvStore').value, d.getElementById('mvTo').value]);
    set('mvAdd', 'i-CON-0005'); await wait(80); set(ins()[0], '4'); click(d.getElementById('btnMvSave')); await wait(100);
    check('moved: 6 at Site A, 4 at Site B', db.have('s2', 'i-CON-0005') === 6 && db.have('s3', 'i-CON-0005') === 4, [db.have('s2', 'i-CON-0005'), db.have('s3', 'i-CON-0005')]);
    nav('projects'); await wait(80); click(pr()[0].querySelector('.fb')); await wait(80);
    click(d.getElementById('pjGoBackAll')); await wait(60);
    check('«return everything»: back to the main store, every item with its full quantity', d.getElementById('mvTo').value === 's1' && d.querySelectorAll('#mvLines .lrow').length === 2 && ins().map(x => x.value).sort().join() === '1,6', ins().map(x => x.value));
    click(d.getElementById('btnMvSave')); await wait(100);
    check('returned: Site A empty, the main store 20 cleaners and 4 grinders', db.have('s2', 'i-CON-0005') === 0 && db.have('s2', 'i-MCH-0001') === 0 && db.have('s1', 'i-CON-0005') === 20 && db.have('s1', 'i-MCH-0001') === 4, null);
    nav('moves'); await wait(120);
    check('the history names each route: to project, project to project, back to main', ['صرف لمشروع', 'نقل بين مشاريع', 'إرجاع للرئيسي'].every(w => txt(d.getElementById('hsList')).includes(w)), txt(d.getElementById('hsList')).slice(0, 300));
    check('storekeeper: no runtime errors', errors.length === 0, errors);
  }
  // ---------------- the admin cancels ----------------
  {
    const B = await boot('admin'), { d, errors, wait, click, txt, nav, db, set, open } = B;
    // make a movement first
    nav('move'); await wait(30); click(d.querySelector('#mvKind [data-k="receive"]')); await wait(10);
    set('mvAdd', 'i-FLT-0009'); await wait(60); set(d.querySelector('#mvLines .lqin'), '4'); click(d.getElementById('btnMvSave')); await wait(80);
    nav('moves'); await wait(100);
    click([...d.querySelectorAll('#hsList .frow')].find(r => /RCV-/.test(txt(r))).querySelector('.fb')); await wait(30);
    check('admin: a cancel button on a movement', !!d.getElementById('mVoid'), null);
    click(d.getElementById('mVoid')); await wait(20); click(d.getElementById('btnEditSave')); await wait(30);
    check('no reason → said', /اكتب سبب الإلغاء/.test(txt(d.getElementById('editMsg'))), txt(d.getElementById('editMsg')));
    set('vReason', 'wrong item'); click(d.getElementById('btnEditSave')); await wait(120);
    check('cancelled: the shelf back to 0, the row struck', db.have('s1', 'i-FLT-0009') === 0 && [...d.querySelectorAll('#hsList .frow.void')].length === 1, db.have('s1', 'i-FLT-0009'));
    check('admin: the «stores» row', open('rowStores'), null);
    // the accounts
    check('admin: six tabs, «users» last', B.tabs() === 'stock,projects,move,moves,filters,users', B.tabs());
    nav('users'); await wait(80);
    const ur = () => [...d.querySelectorAll('#usList .frow')];
    check('users: four accounts, «you» on his own, no 🗑 on it', ur().length === 4 && /أنت|You/.test(txt(ur()[0])) && !ur()[0].querySelector('[data-act="del"]') && !!ur()[1].querySelector('[data-act="del"]'), ur().map(r => txt(r)));
    click(d.getElementById('btnUserNew')); await wait(30);
    check('a new account: a password made for him, the role picker', d.getElementById('unPass').value.length >= 8 && !!d.getElementById('unRole'), null);
    set('unName', 'New Keeper'); set('unUser', 'Karim'); set('unRole', 'storekeeper'); click(d.getElementById('btnEditSave')); await wait(60);
    check('a username taken → said in words', /مستخدم|taken/i.test(txt(d.getElementById('editMsg'))), txt(d.getElementById('editMsg')));
    set('unUser', ' New.Keeper '); click(d.getElementById('btnEditSave')); await wait(80);
    const cr = B.calls().filter(c => c.fn === 'admin-users').pop();
    check('created: admin-users create with the cleaned username, the sign-in details shown', cr && cr.body.action === 'create' && cr.body.username === 'new.keeper' && cr.body.role === 'storekeeper' && /new\.keeper/.test(txt(d.getElementById('editBody'))), cr && cr.body);
    d.getElementById('editSheet').classList.add('hidden'); await wait(60);
    check('… and in the list', ur().some(r => /New Keeper/.test(txt(r))), ur().length);
    click(ur().find(r => /Mech One/.test(txt(r))).querySelector('[data-act="edit"]')); await wait(30);
    set('ueRole', 'viewer'); d.getElementById('ueActive').checked = false; click(d.getElementById('btnEditSave')); await wait(80);
    check('edited: viewer and stopped', db.USERS.find(u => u.username === 'mech1').role === 'viewer' && db.USERS.find(u => u.username === 'mech1').active === false, db.USERS.find(u => u.username === 'mech1'));
    click(ur()[0].querySelector('[data-act="edit"]')); await wait(30);
    check('his own account: «active» cannot be unticked', d.getElementById('ueActive').disabled, null);
    set('ueRole', 'mechanic'); click(d.getElementById('btnEditSave')); await wait(60);
    check('demoting himself → refused in words', d.getElementById('editMsg').textContent.trim().length > 0 && db.USERS[0].role === 'admin', txt(d.getElementById('editMsg')));
    d.getElementById('editSheet').classList.add('hidden');
    const del = () => ur().find(r => /Karim Store/.test(txt(r))).querySelector('[data-act="del"]');
    click(del()); await wait(30);
    check('🗑 asks first (nothing deleted)', db.USERS.some(u => u.username === 'karim'), null);
    click(del()); await wait(80);
    check('… a second tap deletes', !db.USERS.some(u => u.username === 'karim') && !ur().some(r => /Karim Store/.test(txt(r))), ur().length);
    // the projects: make one, close it only empty, reopen
    nav('projects'); await wait(80);
    check('admin: «new project»', open('btnPjNew'), null);
    click(d.getElementById('btnPjNew')); await wait(30);
    set('pjName', 'Tower 9'); set('pjCode', 'prj-01'); click(d.getElementById('btnEditSave')); await wait(60);
    check('a code taken → said in words', /الكود مستخدم/.test(txt(d.getElementById('editMsg'))), txt(d.getElementById('editMsg')));
    set('pjCode', 'prj-03'); set('pjLocation', 'Business Bay'); click(d.getElementById('btnEditSave')); await wait(80);
    const nw = db.STORES.find(x => x.name === 'Tower 9');
    check('a project made: kind project, code upper, in the list', nw && nw.kind === 'project' && nw.code === 'PRJ-03' && [...d.querySelectorAll('#pjList .frow')].some(r => /Tower 9/.test(txt(r))), nw);
    click([...d.querySelectorAll('#pjList .frow')].find(r => /Site A/.test(txt(r))).querySelector('.fb')); await wait(80);
    click(d.getElementById('pjGoSend')); await wait(60); set('mvAdd', 'i-MCH-0001'); await wait(80); set(d.querySelector('#mvLines .lqin'), '1'); click(d.getElementById('btnMvSave')); await wait(100);
    nav('projects'); await wait(80);
    click([...d.querySelectorAll('#pjList .frow')].find(r => /Site A/.test(txt(r))).querySelector('.fb')); await wait(80);
    check('a project holding materials: the close hint', /لا يُغلق المشروع وفيه مواد/.test(txt(d.getElementById('editBody'))), null);
    click(d.getElementById('pjTogB')); await wait(80);
    check('closing it → refused in words, still open', /قبل الإغلاق/.test(txt(d.getElementById('editMsg'))) && db.STORES.find(x => x.id === 's2').active, txt(d.getElementById('editMsg')));
    d.getElementById('editSheet').classList.add('hidden');
    click([...d.querySelectorAll('#pjList .frow')].find(r => /Tower 9/.test(txt(r))).querySelector('.fb')); await wait(80);
    click(d.getElementById('pjTogB')); await wait(100);
    check('an empty project closes: under «closed», with its day', !db.STORES.find(x => x.name === 'Tower 9').active && ![...d.querySelectorAll('#pjList .frow')].some(r => /Tower 9/.test(txt(r))), null);
    click(d.querySelector('#pjShow [data-v="closed"]')); await wait(30);
    check('… listed under «closed»', [...d.querySelectorAll('#pjList .frow')].some(r => /Tower 9/.test(txt(r)) && /أُغلق/.test(txt(r))), txt(d.getElementById('pjList')));
    click([...d.querySelectorAll('#pjList .frow')].find(r => /Tower 9/.test(txt(r))).querySelector('.fb')); await wait(80);
    check('a closed project: no send / return buttons, «reopen»', !d.getElementById('pjGoSend') && /إعادة فتح/.test(txt(d.getElementById('pjTogB'))), null);
    click(d.getElementById('pjTogB')); await wait(100);
    check('reopened', db.STORES.find(x => x.name === 'Tower 9').active, null);
    d.getElementById('editSheet').classList.add('hidden');
    check('admin: no runtime errors', errors.length === 0, errors);
  }
  // ---------------- the manager: everything but admin accounts ----------------
  {
    const B = await boot('manager'), { d, errors, wait, click, txt, nav, db, set, open } = B;
    check('manager: six tabs, «users» last', B.tabs() === 'stock,projects,move,moves,filters,users', B.tabs());
    check('manager: the «stores» row', open('rowStores'), null);
    nav('users'); await wait(80);
    const ur = () => [...d.querySelectorAll('#usList .frow')];
    const adm = ur().find(r => /Ali Khan/.test(txt(r)));
    check('manager: the admin row locked (🔒, no ✎ / 🗑)', adm && /🔒/.test(txt(adm)) && !adm.querySelector('button[data-act]'), adm && txt(adm));
    check('manager: other rows editable', !!ur().find(r => /Karim Store/.test(txt(r))).querySelector('[data-act="edit"]'), null);
    click(d.getElementById('btnUserNew')); await wait(30);
    const opts = [...d.getElementById('unRole').options].map(o => o.value);
    check('manager: no «admin» in the role picker, «manager» there', !opts.includes('admin') && opts.includes('manager'), opts);
    set('unName', 'Second Mgr'); set('unUser', 'mgr2'); set('unRole', 'manager'); click(d.getElementById('btnEditSave')); await wait(80);
    check('manager: makes a manager account', db.USERS.some(u => u.username === 'mgr2' && u.role === 'manager'), db.USERS.map(u => u.username));
    check('manager: no runtime errors', errors.length === 0, errors);
  }
  // ---------------- the deputy («أدمن»): everything but the manager and admin accounts ----------------
  {
    const B = await boot('deputy'), { d, errors, wait, click, txt, nav, db, set, open } = B;
    check('deputy: six tabs, «users» last', B.tabs() === 'stock,projects,move,moves,filters,users', B.tabs());
    check('deputy: the «stores» row', open('rowStores'), null);
    check('deputy: shown as «أدمن», the admin as «سوبر أدمن»', /أدمن/.test(txt(d.getElementById('who'))) && !/سوبر/.test(txt(d.getElementById('who'))), txt(d.getElementById('who')));
    nav('users'); await wait(80);
    const ur = () => [...d.querySelectorAll('#usList .frow')];
    const adm = ur().find(r => /Ali Khan/.test(txt(r))), mgr = ur().find(r => /Omar Boss/.test(txt(r)));
    check('deputy: the super admin row locked', adm && /سوبر أدمن/.test(txt(adm)) && /🔒/.test(txt(adm)) && !adm.querySelector('button[data-act]'), adm && txt(adm));
    check('deputy: the manager row locked', mgr && /🔒/.test(txt(mgr)) && !mgr.querySelector('button[data-act]'), mgr && txt(mgr));
    check('deputy: other rows editable', !!ur().find(r => /Karim Store/.test(txt(r))).querySelector('[data-act="edit"]'), null);
    click(d.getElementById('btnUserNew')); await wait(30);
    const opts = [...d.getElementById('unRole').options].map(o => o.value);
    check('deputy: no «admin» nor «manager» in the role picker, «deputy» there', !opts.includes('admin') && !opts.includes('manager') && opts.includes('deputy'), opts);
    set('unName', 'Second Dep'); set('unUser', 'dep2'); set('unRole', 'deputy'); click(d.getElementById('btnEditSave')); await wait(80);
    check('deputy: makes a deputy account', db.USERS.some(u => u.username === 'dep2' && u.role === 'deputy'), db.USERS.map(u => u.username));
    check('deputy: no runtime errors', errors.length === 0, errors);
  }
  // ---------------- readers ----------------
  for (const role of ['mechanic', 'viewer']) {
    const B = await boot(role), { d, errors, wait, click, txt, tabs, open } = B;
    check(role + ': four tabs, no «move»', tabs() === 'stock,projects,moves,filters', tabs());
    check(role + ': no «add item»', !open('btnAddItem'), null);
    click([...d.querySelectorAll('#skList .frow')][0].querySelector('.fb')); await wait(60);
    check(role + ': an item opened shows no button that writes', !d.getElementById('iGoIssue') && !d.getElementById('iEditB') && !d.getElementById('iDelB') && /حركات الصنف/.test(txt(d.getElementById('editBody'))), null);
    B.nav('projects'); await wait(80);
    click([...d.querySelectorAll('#pjList .frow')][0].querySelector('.fb')); await wait(80);
    check(role + ': a project opened shows its store and no button that writes', /مخزن المشروع/.test(txt(d.getElementById('editBody'))) && !d.getElementById('pjGoSend') && !d.getElementById('pjTogB') && !B.open('btnPjNew'), null);
    check(role + ': no runtime errors', errors.length === 0, errors);
  }
  {
    const B = await boot('stopped');
    check('a stopped account: «not here», no tabs', B.active() === 'scr-noaccess' && B.tabs() === '', B.active());
  }
  {
    const B = await boot('storekeeper', { qs: '&noschema=1' });
    check('the database not set up says so in words', B.active() === 'scr-noaccess' && /schema\.sql/.test(B.txt(B.d.getElementById('noAccessMsg'))), B.txt(B.d.getElementById('noAccessMsg')));
  }
  {
    const dom = new JSDOM(build().replace(/<link[^>]+>/g, '').replace(/window\.MS_CONFIG=\{[^}]*\};/, "window.MS_CONFIG={SUPABASE_URL:'https://YOUR_PROJECT.supabase.co',SUPABASE_ANON_KEY:'YOUR_ANON_KEY'};"), { runScripts: 'dangerously', url: 'https://x.test/', beforeParse(w) { w.matchMedia = () => ({ matches: false }); w.scrollTo = () => {}; } });
    await new Promise(r => setTimeout(r, 200));
    const d = dom.window.document;
    check('not configured: the sign-in says config.js, the button disabled', d.getElementById('btnLogin').disabled && /config\.js/.test(d.getElementById('loginMsg').textContent), d.getElementById('loginMsg').textContent);
  }
  {
    const B = await boot('storekeeper', { lang: 'en' }), { d, txt, errors, wait } = B;
    check('English: ltr, the hero and the tabs in English, no Arabic left on the stock screen', d.documentElement.dir === 'ltr' && /items/.test(txt(d.getElementById('skHero'))) && !AR.test(txt(d.getElementById('scr-stock'))) && !AR.test(txt(d.getElementById('nav'))), txt(d.getElementById('scr-stock')).match(/[؀-ۿ]+/g));
    B.nav('projects'); await wait(80);
    check('English: the projects screen in English', /Open/.test(txt(d.getElementById('pjShow'))) && /Site A/.test(txt(d.getElementById('pjList'))) && !AR.test(txt(d.getElementById('scr-projects'))), txt(d.getElementById('scr-projects')).match(/[؀-ۿ]+/g));
    check('English: no runtime errors', errors.length === 0, errors);
  }
  const bad = T.filter(x => !x.ok);
  T.forEach(x => console.log((x.ok ? 'PASS ' : 'FAIL ') + x.n + (x.ok ? '' : '  → ' + JSON.stringify(x.got))));
  console.log(`\n${T.length - bad.length} of ${T.length} passed`);
  process.exit(bad.length ? 1 : 0);
})().catch(e => { T.forEach(x => console.log((x.ok ? 'PASS ' : 'FAIL ') + x.n + (x.ok ? '' : '  → ' + JSON.stringify(x.got)))); console.error(e); process.exit(1); });
