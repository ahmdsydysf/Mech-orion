// No inline on*= handler anywhere in the markup: the Content-Security-Policy allows only the hashed scripts (tools/csp-hashes.js),
// and an inline handler is blocked silently. A logo that fails to load hides itself from here instead.
document.querySelectorAll('img[data-onerr]').forEach(i => i.addEventListener('error', () => { if (i.dataset.onerr === 'remove') i.remove(); else i.style.display = 'none'; }));
/* ---------------- 0) اللغات ---------------- */
const I18N = {
  ar: {
    dir: "rtl", locale: "ar-AE-u-nu-latn",
    navUsers: "المستخدمون", usersDesc: "حسابات النظام: الأدمن يضيف المستخدمين ويحدد دور كل واحد ويوقفه أو يغيّر كلمة مروره.", userNew: "＋ مستخدم جديد", usSearchPh: "ابحث بالاسم أو اسم المستخدم",
    usAll: "الكل", usStopped: "موقوف", usActive: "فعّال", usNever: "لم يدخل بعد", usLast: "آخر دخول", usYou: "أنت", usNone: "لا يوجد مستخدمون",
    usName: "الاسم", usUser: "اسم المستخدم (بالإنجليزية)", usUserHint: "حروف إنجليزية صغيرة وأرقام و . _ - — سيدخل به: {u}", usPass: "كلمة المرور (8 أحرف على الأقل)", usGen: "🎲 توليد",
    usRole: "الدور", usActiveLbl: "الحساب فعّال", usEdit: "تعديل المستخدم", usNewPass: "كلمة مرور جديدة", usSetPass: "حفظ كلمة المرور", usDel: "حذف المستخدم",
    usDelQ: "اضغط مرة أخرى لحذف {n} نهائيًا", usCreated: "تم إنشاء الحساب — أعطه هذه البيانات (لن تظهر مرة أخرى)", usPassSet: "تم تغيير كلمة المرور — أعطه هذه البيانات",
    usCred: "بيانات الدخول", usCopy: "نسخ", usCopied: "تم النسخ ✓", usRoleHelp: "الأدمن: كل شيء والمستخدمون · المدير: كل الصلاحيات ما عدا حسابات الأدمن · أمين المخزن: الأصناف والحركات · الميكانيكي والمشاهد: اطلاع فقط",
    errUserTaken: "اسم المستخدم هذا مستخدم لحساب آخر", errUserBad: "اسم المستخدم: حروف إنجليزية صغيرة وأرقام و . _ - من 2 إلى 32", errPassWeak: "كلمة المرور 8 أحرف على الأقل",
    errLastAdmin: "لا يمكن — يجب أن يبقى أدمن واحد فعّال على الأقل", errAdminOnly: "حسابات الأدمن يتحكم فيها الأدمن فقط", errSelf: "لا يمكنك حذف حسابك أو إيقافه أو إنزال دورك", errFnMissing: "دالة admin-users غير منشورة على Supabase — انشرها أولًا",
    notConfigured: "التطبيق غير مربوط بقاعدة بيانات بعد — املأ public/config.js (رابط Supabase والمفتاح العام).",
    appTitle: "مخزن الورشة",
    language: "اللغة", darkMode: "الوضع الداكن", changePass: "تغيير كلمة المرور", logRow: "🕘 سجل تعديلات الأصناف", storesRow: "🏬 المخازن",  logout: "خروج", saveChanges: "حفظ", saved: "تم الحفظ ✓",
    username: "اسم المستخدم", phUser: "اكتب اسم المستخدم", loginUserHint: "اسم المستخدم بالإنجليزية كما أعطاك الأدمن — ليس اسمك بالعربي",
    password: "كلمة المرور", phPass: "اكتب كلمة السر", login: "دخول", loginHint: "سجّل الدخول للمتابعة",
    noAccessTitle: "لا يمكن لهذا الحساب الدخول", noAccessHint: "هذا الحساب موقوف أو بلا صلاحية — اطلب من الأدمن تفعيله.",
    admin: "أدمن", manager: "مدير", storekeeper: "أمين المخزن", mechanic: "ميكانيكي", viewer: "مشاهد (اطلاع فقط)",
    errLogin: "تعذّر الدخول", errProfile: "لا يوجد ملف لهذا الحساب", errPassMatch: "كلمتا المرور غير متطابقتين أو أقل من 8 أحرف", errPopup: "اسمح بالنوافذ المنبثقة لهذه الصفحة ثم أعد المحاولة",
    errForbidden: "غير مسموح لهذا الحساب", errNet: "لا يوجد اتصال بالإنترنت", errDup: "مسجّل من قبل", errRun463: "قاعدة البيانات غير مجهّزة بعد — شغّل supabase/schema.sql في Supabase أولًا",
    errNameReq: "اكتب الاسم", errNameLong: "الاسم طويل جدًا", errCategory: "اختر الفئة", errUnit: "اختر الوحدة", errMin: "الحد الأدنى غير صحيح", errPartDup: "رقم القطعة هذا مسجّل من قبل على الصنف {c}",
    errCodeDup: "الكود {c} مستخدم", errNoteLong: "الملاحظة طويلة جدًا", errStoreDup: "يوجد مخزن بهذا الاسم", errStoreReq: "اختر المخزن", errToStore: "اختر المخزن المحوَّل إليه",
    errSameStore: "لا يُحوَّل من مخزن إلى نفسه", errStoreInactive: "هذا المخزن موقوف", errDateFuture: "التاريخ لا يكون بعد اليوم", errDateOld: "التاريخ قديم جدًا",
    errPlateUnknown: "اللوحة {p} ليست من مركبات الشركة ولا من معدات المخزن — اخترها من القائمة", errWho: "اختر المركبة أو اكتب اسم المستلم",
    errLines: "أضف صنفًا واحدًا على الأقل", errTooMany: "200 صنف في الحركة كحد أقصى", errItemUnknown: "صنف غير موجود — حدّث الصفحة", errItemTwice: "الصنف {c} مكرر في الحركة",
    errCount: "اكتب الكمية الموجودة فعليًا للصنف {c}", errQty: "اكتب كمية صحيحة (أكبر من صفر) للصنف {c}", errItemInactive: "الصنف {c} موقوف — لا يُستلم",
    errNotEnough: "لا يكفي الرصيد: الصنف {c} المتاح منه {h} فقط", errNothing: "كل الأرصدة مطابقة للجرد — لا شيء يتغير", errReason: "اكتب سبب الإلغاء",
    errAlreadyVoid: "الحركة ملغاة من قبل", errVoidNotEnough: "لا يمكن الإلغاء: الصنف {c} صُرف منه بعدها (المتاح {h})", errItemInUse: "صنف تحرّك من قبل لا يُحذف — أوقفه بدلًا من ذلك",
    errStoreInUse: "مخزن فيه حركات لا يُحذف — أوقفه بدلًا من ذلك", errMoveUnknown: "الحركة غير موجودة",
    idleOut: "خرجت تلقائيًا لعدم النشاط", versionLbl: "الإصدار", updateAvail: "يوجد إصدار جديد", updateNow: "حدّث الآن",
    printHint: "نافذة الطباعة تفتح تلقائيًا — اختر «حفظ كـ PDF»", pwBack: "→ رجوع للتطبيق", pwPrint: "🖨️ طباعة", passNew: "كلمة المرور الجديدة", passAgain: "أعد كتابتها",
    navStock: "المخزون", navMove: "حركة", navMoves: "السجل", navFilters: "الفلاتر",
    c_all: "الكل", c_machine: "المعدات", c_tool: "العُدد اليدوية", c_consumable: "المستهلكات", c_oil: "الزيوت", c_filter: "الفلاتر", c_spare: "قطع غيار", c_low: "⚠ تحت الحد",
    c1_machine: "معدة", c1_tool: "عدة يدوية", c1_consumable: "مستهلك", c1_oil: "زيت", c1_filter: "فلتر", c1_spare: "قطعة غيار",
    f_oil: "فلتر زيت", f_fuel: "فلتر ديزل", f_air: "فلتر هواء", f_water_sep: "فاصل ماء", f_cabin: "فلتر مكيف",
    u_pcs: "قطعة", u_set: "طقم", u_pair: "زوج", u_roll: "رول", u_box: "علبة", u_can: "جالون", u_drum: "برميل", u_litre: "لتر", u_kg: "كجم", u_m: "متر",
    allStores: "كل المخازن", heroTtl: "المخزون — {s}", hItems: "صنف", hInStock: "فيها رصيد", hLow: "تحت الحد", hEmpty: "رصيدها صفر",
    addItem: "إضافة صنف جديد", searchItems: "ابحث بالاسم أو الكود أو رقم القطعة", noItems: "لا أصناف", noMatch: "لا نتائج", moreN: "عرض المزيد ({n})",
    lowB: "تحت الحد ({m})", stoppedB: "موقوف", shelfL: "رف {s}", lastMove: "آخر حركة {d}",
    itemT: "صنف جديد", editItemT: "تعديل {c}", iName: "اسم الصنف", iCat: "الفئة", iFt: "نوع الفلتر", iPart: "رقم القطعة", iUnit: "الوحدة", iMin: "الحد الأدنى (للتنبيه)",
    iShelf: "الرف / المكان", iNote: "ملاحظة", optional: "اختياري", itemSaved: "تم حفظ الصنف ✓",
    byStore: "الرصيد في كل مخزن", noStock: "لا رصيد في أي مخزن", fitsOn: "يركب على", historyT: "حركات الصنف", noHistory: "لا حركات لهذا الصنف بعد", balAfter: "الرصيد بعدها",
    iEdit: "✎ تعديل البيانات", iStop: "⏸ إيقاف", iActivate: "▶ إعادة تفعيل", iDelete: "🗑 حذف", iDelQ: "حذف {n}؟", iDelD: "لم يتحرك أبدًا، لذلك يُحذف نهائيًا.", yesDelete: "نعم، احذف", deleted: "تم الحذف ✓",
    iIssue: "⬆ صرف منه", iReceive: "⬇ استلام", stopNote: "الصنف الموقوف لا يُستلم من جديد، ويبقى رصيده وسجله.", stoppedT: "تم الإيقاف ✓", activatedT: "تم التفعيل ✓",
    k_receive: "استلام", k_issue: "صرف", k_return: "مرتجع", k_transfer: "تحويل", k_adjust: "جرد",
    d_receive: "استلام أصناف داخلة إلى المخزن من مورد — يزيد الرصيد.", d_issue: "صرف أصناف من المخزن إلى مركبة أو ميكانيكي — ينقص الرصيد، ولا يُصرف أكثر من المتاح.",
    d_return: "إرجاع أصناف إلى المخزن (لم تُستخدم أو عادت من الموقع) — يزيد الرصيد.", d_transfer: "نقل أصناف من مخزن إلى مخزن آخر.",
    d_adjust: "جرد: اكتب الكمية الموجودة فعليًا على الرف لكل صنف، والفرق يُسجَّل حركة. أول جرد يضع الأرصدة الافتتاحية.",
    mvStore: "المخزن", mvFrom: "من المخزن", mvTo: "إلى المخزن", mvDate: "التاريخ", mvPlate: "المركبة / المعدة (اللوحة)", noPlate: "— بدون مركبة —",
    mvPartyIssue: "المستلم (الميكانيكي)", mvPartyReceive: "المورد", mvPartyReturn: "أرجعه", mvRefIssue: "رقم أمر العمل", mvRefReceive: "رقم LPO / الفاتورة", mvRefOther: "رقم مرجعي",
    mvNote: "ملاحظة", mvLines: "الأصناف", mvLinesN: "{n} صنف", addLine: "＋ إضافة صنف", itemSearch: "اكتب اسم الصنف أو الكود أو رقم القطعة", noItemFound: "لا صنف بهذا الاسم — أضفه من «المخزون»",
    plateSearch: "اكتب رقم اللوحة", noPlateFound: "لا مركبة بهذا الرقم في أنظمة الشركة", haveN: "المتاح {n}", bookN: "في الدفتر {n}", countedL: "الموجود فعليًا", qtyL: "الكمية",
    diffN: "الفرق {n}", mvSave: "حفظ الحركة", mvSaved: "تم حفظ الحركة {no} ✓", mvEmpty: "لم تُضف أصنافًا بعد — اختر من القائمة بالأسفل",
    fitsTitle: "فلاتر هذه المركبة — اضغط لإضافتها", noFits: "لا فلاتر مسجلة لهذه المركبة", inStoreN: "بالمخزن {n}",
    from: "من", to: "إلى", searchMoves: "ابحث برقم الحركة أو اللوحة أو الاسم أو الصنف", noMoves: "لا حركات في هذه المدة", movesN: "{n} حركة",
    voidB: "ملغاة", byLine: "{n} · {d}", moveT: "الحركة {no}", mvItems: "الأصناف", voidQ: "إلغاء هذه الحركة", voidD: "تُعكس الحركة على الأرصدة وتبقى في السجل مشطوبة. اكتب السبب:",
    voidYes: "↺ إلغاء الحركة", voided: "تم الإلغاء ✓", voidWas: "ألغاها {n} · {d} — {r}", printMove: "🖨️ طباعة السند", reasonPh: "سبب الإلغاء",
    movesPdf: "تقرير الحركات PDF", stockPdf: "جرد المخزون PDF", stockCheck: "مطابقة الرصيد", checkOk: "الأرصدة مطابقة لكل الحركات ✓", checkBad: "{n} رصيد لا يطابق الحركات — راجع الدعم",
    filtersDesc: "لكل معدة أو مركبة: الفلاتر التي تركب عليها (زيت، ديزل، هواء، فاصل ماء) وما في المخزن منها الآن.",
    searchEquip: "ابحث باللوحة أو النوع أو رقم الفلتر", noEquip: "لا معدات", equipN: "{n} معدة", filtersT: "فلاتر {n}",
    storesT: "المخازن", addStore: "＋ مخزن جديد", storeName: "اسم المخزن", storeSaved: "تم حفظ المخزن ✓", sStop: "⏸", sActivate: "▶", storeStopped: "موقوف",
    logTitle: "سجل تعديلات الأصناف والمخازن", logEmpty: "لا شيء في السجل بعد", lgAdd: "إضافة", lgEdit: "تعديل", lgDelete: "حذف", lg_item: "صنف", lg_store: "مخزن", lg_equipment: "معدة",
    lf_name: "الاسم", lf_category: "الفئة", lf_filter_type: "نوع الفلتر", lf_part_no: "رقم القطعة", lf_unit: "الوحدة", lf_min_qty: "الحد الأدنى", lf_shelf: "الرف", lf_active: "نشط", lf_note: "ملاحظة", lf_sort: "الترتيب",
    thCode: "الكود", thItem: "الصنف", thPart: "رقم القطعة", thQty: "الكمية", thUnit: "الوحدة", thShelf: "الرف", thMin: "الحد", thNo: "رقم", thKind: "النوع", thDate: "التاريخ", thTo: "إلى / من", thBy: "بواسطة",
    ppStock: "جرد المخزون", ppMoves: "تقرير حركات المخزن", ppMove: "سند {k}", sigStore: "أمين المخزن", sigRecv: "المستلم", sigApprove: "اعتماد المدير", printed: "طُبع",
    ppItems: "أصناف", ppUnits: "فيها رصيد", ppLow: "تحت الحد", ppPeriod: "{a} — {b}", close: "إغلاق", loading: "جارٍ التحميل…", readOnly: "اطلاع فقط",
  },
  en: {
    dir: "ltr", locale: "en-GB",
    navUsers: "Users", usersDesc: "The accounts: the admin adds users, sets each one's role, stops an account or changes its password.", userNew: "＋ New user", usSearchPh: "Search by name or username",
    usAll: "All", usStopped: "Stopped", usActive: "Active", usNever: "Never signed in", usLast: "Last sign-in", usYou: "you", usNone: "No users",
    usName: "Name", usUser: "Username (English)", usUserHint: "Lower-case letters, digits and . _ - — signs in as: {u}", usPass: "Password (8 characters at least)", usGen: "🎲 Generate",
    usRole: "Role", usActiveLbl: "Account active", usEdit: "Edit user", usNewPass: "New password", usSetPass: "Save password", usDel: "Delete user",
    usDelQ: "Tap again to delete {n} for good", usCreated: "Account created — give them these details (shown once)", usPassSet: "Password changed — give them these details",
    usCred: "Sign-in details", usCopy: "Copy", usCopied: "Copied ✓", usRoleHelp: "Admin: everything and the users · Manager: everything but the admin accounts · Storekeeper: items and movements · Mechanic and viewer: read only",
    errUserTaken: "That username belongs to another account", errUserBad: "Username: lower-case letters, digits and . _ -, 2 to 32", errPassWeak: "The password needs 8 characters at least",
    errLastAdmin: "Not possible — at least one active admin must remain", errAdminOnly: "Only an admin manages admin accounts", errSelf: "You cannot delete, stop or demote your own account", errFnMissing: "The admin-users function is not deployed on Supabase — deploy it first",
    notConfigured: "The app is not connected to a database yet — fill in public/config.js (the Supabase URL and the public key).",
    appTitle: "Mechanic Store",
    language: "Language", darkMode: "Dark mode", changePass: "Change password", logRow: "🕘 Items change log", storesRow: "🏬 Stores",  logout: "Sign out", saveChanges: "Save", saved: "Saved ✓",
    username: "Username", phUser: "Type your username", loginUserHint: "The English username the admin gave you — not your Arabic name",
    password: "Password", phPass: "Type your password", login: "Sign in", loginHint: "Sign in to continue",
    noAccessTitle: "This account cannot sign in here", noAccessHint: "This account is stopped or has no role — ask the admin to turn it on.",
    admin: "Admin", manager: "Manager", storekeeper: "Storekeeper", mechanic: "Mechanic", viewer: "Viewer (read only)",
    errLogin: "Could not sign in", errProfile: "This account has no profile", errPassMatch: "The passwords differ or are shorter than 8 characters", errPopup: "Allow pop-ups for this page and try again",
    errForbidden: "Not allowed for this account", errNet: "No internet connection", errDup: "Already recorded", errRun463: "The database is not set up yet — run supabase/schema.sql in Supabase first",
    errNameReq: "Type the name", errNameLong: "The name is too long", errCategory: "Choose the category", errUnit: "Choose the unit", errMin: "Invalid minimum", errPartDup: "This part number is already item {c}",
    errCodeDup: "Code {c} is taken", errNoteLong: "The note is too long", errStoreDup: "A store with this name exists", errStoreReq: "Choose the store", errToStore: "Choose the store to transfer to",
    errSameStore: "A store does not transfer to itself", errStoreInactive: "This store is stopped", errDateFuture: "The date cannot be after today", errDateOld: "The date is too old",
    errPlateUnknown: "Plate {p} is neither a company vehicle nor store equipment — pick it from the list", errWho: "Pick the vehicle or type who took it",
    errLines: "Add at least one item", errTooMany: "200 items per movement at most", errItemUnknown: "Unknown item — refresh the page", errItemTwice: "Item {c} is in the movement twice",
    errCount: "Type the quantity actually found for {c}", errQty: "Type a valid quantity (above zero) for {c}", errItemInactive: "Item {c} is stopped — it takes nothing in",
    errNotEnough: "Not enough stock: only {h} of {c} available", errNothing: "Every shelf matches the count — nothing changes", errReason: "Type the reason",
    errAlreadyVoid: "This movement is already cancelled", errVoidNotEnough: "Cannot cancel: {c} was issued since (only {h} left)", errItemInUse: "An item that moved is never deleted — stop it instead",
    errStoreInUse: "A store with movements is never deleted — stop it instead", errMoveUnknown: "Movement not found",
    idleOut: "Signed out after inactivity", versionLbl: "Version", updateAvail: "A new version is available", updateNow: "Update now",
    printHint: "The print dialog opens on its own — choose \"Save as PDF\"", pwBack: "← Back to the app", pwPrint: "🖨️ Print", passNew: "New password", passAgain: "Type it again",
    navStock: "Stock", navMove: "Move", navMoves: "History", navFilters: "Filters",
    c_all: "All", c_machine: "Machines", c_tool: "Hand tools", c_consumable: "Consumables", c_oil: "Oils", c_filter: "Filters", c_spare: "Spare parts", c_low: "⚠ Below minimum",
    c1_machine: "Machine", c1_tool: "Hand tool", c1_consumable: "Consumable", c1_oil: "Oil", c1_filter: "Filter", c1_spare: "Spare part",
    f_oil: "Oil filter", f_fuel: "Fuel filter", f_air: "Air filter", f_water_sep: "Water separator", f_cabin: "Cabin filter",
    u_pcs: "pcs", u_set: "set", u_pair: "pair", u_roll: "roll", u_box: "box", u_can: "can", u_drum: "drum", u_litre: "L", u_kg: "kg", u_m: "m",
    allStores: "All stores", heroTtl: "Stock — {s}", hItems: "items", hInStock: "in stock", hLow: "below minimum", hEmpty: "at zero",
    addItem: "Add a new item", searchItems: "Search by name, code or part number", noItems: "No items", noMatch: "No results", moreN: "Show more ({n})",
    lowB: "Below minimum ({m})", stoppedB: "Stopped", shelfL: "Shelf {s}", lastMove: "Last move {d}",
    itemT: "New item", editItemT: "Edit {c}", iName: "Item name", iCat: "Category", iFt: "Filter type", iPart: "Part number", iUnit: "Unit", iMin: "Minimum (for the alert)",
    iShelf: "Shelf / place", iNote: "Note", optional: "optional", itemSaved: "Item saved ✓",
    byStore: "Stock in each store", noStock: "No stock in any store", fitsOn: "Fits", historyT: "Item movements", noHistory: "No movements for this item yet", balAfter: "Balance after",
    iEdit: "✎ Edit the details", iStop: "⏸ Stop", iActivate: "▶ Reactivate", iDelete: "🗑 Delete", iDelQ: "Delete {n}?", iDelD: "It never moved, so it is deleted for good.", yesDelete: "Yes, delete", deleted: "Deleted ✓",
    iIssue: "⬆ Issue it", iReceive: "⬇ Receive", stopNote: "A stopped item takes nothing new in; its stock and history stay.", stoppedT: "Stopped ✓", activatedT: "Reactivated ✓",
    k_receive: "Receive", k_issue: "Issue", k_return: "Return", k_transfer: "Transfer", k_adjust: "Count",
    d_receive: "Items coming into the store from a supplier — the stock goes up.", d_issue: "Items leaving the store to a vehicle or a mechanic — the stock goes down; never more than the shelf holds.",
    d_return: "Items coming back to the store (unused, or back from site) — the stock goes up.", d_transfer: "Items moved from one store to another.",
    d_adjust: "A count: type what is actually on the shelf for each item; the difference is recorded as a movement. The first count sets the opening stock.",
    mvStore: "Store", mvFrom: "From store", mvTo: "To store", mvDate: "Date", mvPlate: "Vehicle / equipment (plate)", noPlate: "— No vehicle —",
    mvPartyIssue: "Taken by (mechanic)", mvPartyReceive: "Supplier", mvPartyReturn: "Returned by", mvRefIssue: "Job card no.", mvRefReceive: "LPO / invoice no.", mvRefOther: "Reference no.",
    mvNote: "Note", mvLines: "Items", mvLinesN: "{n} items", addLine: "＋ Add an item", itemSearch: "Type the item's name, code or part number", noItemFound: "No item by this name — add it from «Stock»",
    plateSearch: "Type the plate number", noPlateFound: "No vehicle with this number in the company's systems", haveN: "Available {n}", bookN: "On the books {n}", countedL: "Actually found", qtyL: "Quantity",
    diffN: "Difference {n}", mvSave: "Save the movement", mvSaved: "Movement {no} saved ✓", mvEmpty: "No items yet — pick from the list below",
    fitsTitle: "This vehicle's filters — tap to add", noFits: "No filters recorded for this vehicle", inStoreN: "In store {n}",
    from: "From", to: "To", searchMoves: "Search by number, plate, name or item", noMoves: "No movements in this period", movesN: "{n} movements",
    voidB: "Cancelled", byLine: "{n} · {d}", moveT: "Movement {no}", mvItems: "Items", voidQ: "Cancel this movement", voidD: "The movement is reversed on the shelves and stays in the history, struck through. The reason:",
    voidYes: "↺ Cancel the movement", voided: "Cancelled ✓", voidWas: "Cancelled by {n} · {d} — {r}", printMove: "🖨️ Print the voucher", reasonPh: "Reason for cancelling",
    movesPdf: "Movements report PDF", stockPdf: "Stock count sheet PDF", stockCheck: "Check the balances", checkOk: "The stock matches every movement ✓", checkBad: "{n} balance(s) differ from the movements — contact support",
    filtersDesc: "For each machine or vehicle: the filters it takes (oil, fuel, air, water separator) and what the store holds of each now.",
    searchEquip: "Search by plate, type or filter number", noEquip: "No equipment", equipN: "{n} units", filtersT: "Filters of {n}",
    storesT: "Stores", addStore: "＋ New store", storeName: "Store name", storeSaved: "Store saved ✓", sStop: "⏸", sActivate: "▶", storeStopped: "Stopped",
    logTitle: "Items and stores change log", logEmpty: "Nothing in the log yet", lgAdd: "Added", lgEdit: "Changed", lgDelete: "Deleted", lg_item: "Item", lg_store: "Store", lg_equipment: "Equipment",
    lf_name: "Name", lf_category: "Category", lf_filter_type: "Filter type", lf_part_no: "Part no.", lf_unit: "Unit", lf_min_qty: "Minimum", lf_shelf: "Shelf", lf_active: "Active", lf_note: "Note", lf_sort: "Order",
    thCode: "Code", thItem: "Item", thPart: "Part no.", thQty: "Qty", thUnit: "Unit", thShelf: "Shelf", thMin: "Min", thNo: "No.", thKind: "Type", thDate: "Date", thTo: "To / from", thBy: "By",
    ppStock: "Stock count sheet", ppMoves: "Store movements report", ppMove: "{k} voucher", sigStore: "Storekeeper", sigRecv: "Received by", sigApprove: "Manager's approval", printed: "Printed",
    ppItems: "Items", ppUnits: "In stock", ppLow: "Below minimum", ppPeriod: "{a} — {b}", close: "Close", loading: "Loading…", readOnly: "View only",
  },
};
let lang = localStorage.getItem('lang') || 'ar'; if (!I18N[lang]) lang = 'ar';
const t = (k, vars = {}) => (Object.prototype.hasOwnProperty.call(I18N[lang], k) ? I18N[lang][k] : Object.prototype.hasOwnProperty.call(I18N.ar, k) ? I18N.ar[k] : k).replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? '');
function applyLang(l) {
  lang = I18N[l] ? l : 'ar'; localStorage.setItem('lang', lang);
  document.documentElement.lang = lang; document.documentElement.dir = I18N[lang].dir; document.title = t('appTitle');
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll('[data-i18n-ph]').forEach(el => el.placeholder = t(el.dataset.i18nPh));
  document.getElementById('lang').value = lang;
  document.querySelectorAll('#langChips button').forEach(b => b.classList.toggle('on', b.dataset.l === lang));
}
function applyTheme(mode) {
  const dark = mode === 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  const b = document.getElementById('btnTheme'); if (b) b.classList.toggle('on', dark);
  const m = document.getElementById('themeColor'); if (m) m.content = dark ? '#07090A' : '#14181B';
}
const savedTheme = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

/* ---------------- 1) الإعدادات ---------------- */
const APP_VERSION = '2026.11.01-3';
const CONFIG = Object.assign({ SUPABASE_URL: '', SUPABASE_ANON_KEY: '', USER_DOMAIN: 'orioncc.com' }, window.MS_CONFIG || {});
const CONFIGURED = /^https:\/\/[^/]+/.test(CONFIG.SUPABASE_URL) && CONFIG.SUPABASE_ANON_KEY.length > 20 && !/YOUR_/.test(CONFIG.SUPABASE_URL + CONFIG.SUPABASE_ANON_KEY);
const toEmail = u => { const s = String(u || '').trim().toLowerCase().replace(/\s+/g, '').replace(/^@/, ''); return s.includes('@') ? s : `${s}@${CONFIG.USER_DOMAIN}`; };
// admin: everything and the accounts; manager: the same, one step below — never an admin's account (the Edge Function says
// ADMIN_ONLY); storekeeper: items and movements; mechanic and viewer read. The server says the same
// (ms_editor / ms_admin / ms_reader in supabase/schema.sql), and a stopped account (profiles.active = false) reads nothing.
const TABS = { admin: ['stock', 'move', 'moves', 'filters', 'users'], manager: ['stock', 'move', 'moves', 'filters', 'users'], storekeeper: ['stock', 'move', 'moves', 'filters'], mechanic: ['stock', 'moves', 'filters'], viewer: ['stock', 'moves', 'filters'] };
const ROLE_LIST = ['admin', 'manager', 'storekeeper', 'mechanic', 'viewer'];
const canEdit = () => !!profile && profile.active !== false && ['storekeeper', 'manager', 'admin'].includes(profile.role);
const canAdmin = () => !!profile && profile.active !== false && ['admin', 'manager'].includes(profile.role);
const isAdminRole = () => !!profile && profile.active !== false && profile.role === 'admin';
// a manager may touch every account but an admin's, and never gives the admin role
const canTouch = u => isAdminRole() || u.role !== 'admin';
const roleOpts = () => ROLE_LIST.filter(r => r !== 'admin' || isAdminRole());
const can = id => !!profile && profile.active !== false && (TABS[profile.role] || []).includes(id);

/* ---------------- 2) طبقة البيانات (Supabase فقط هنا) ---------------- */
// Everything is ms_*: items, stores and equipment are written straight to their tables (RLS, the triggers clean and stamp and keep
// the log); a movement only through ms_post (all or nothing, never below zero) and its cancel through ms_void; the reads are functions.
const notRun = e => /PGRST202|PGRST205|Could not find the (function|table)|schema cache|42883|42P01/i.test(String(e?.message ?? '') + ' ' + (e?.code ?? ''));
class StoreRepository {
  #db;
  constructor(url, key) { this.#db = supabase.createClient(url, key); }
  onAuthChange(cb) { this.#db.auth.onAuthStateChange((_e, s) => cb(s?.user ?? null)); }
  async signIn(email, password) {
    const { error } = await this.#db.auth.signInWithPassword({ email, password });
    if (error) throw new Error(t('errLogin') + ' — ' + error.message);
  }
  async signOut() {
    const r = await this.#db.auth.signOut().catch(e => ({ error: e }));
    if (r?.error) { try { Object.keys(localStorage).filter(k => /^sb-.*-auth-token/.test(k)).forEach(k => localStorage.removeItem(k)); } catch {} }
  }
  #chk(error) { if (!error) return; if (notRun(error)) throw new Error(t('errRun463')); throw error; }
  async #rows(query) { const { data, error } = await query; this.#chk(error); return data ?? []; }
  async #rpc(fn, args) { const { data, error } = await this.#db.rpc(fn, args); this.#chk(error); return data; }
  async #paged(build) { const out = []; for (let from = 0; ; from += 1000) { const rows = await this.#rows(build().range(from, from + 999)); out.push(...rows); if (rows.length < 1000) return out; } }
  async bootstrap() { const { data, error } = await this.#db.rpc('ms_bootstrap'); this.#chk(error); return data; }
  async userList() { return (await this.#rpc('ms_user_list')) ?? []; }
  async admin(action, body) {
    const { data, error } = await this.#db.functions.invoke('admin-users', { body: { action, ...body } });
    if (error) { let j = null; try { j = await error.context?.json?.(); } catch {} if (j?.error) throw new Error(j.error);
      if (/404|not found|Failed to send/i.test(String(error.message))) throw new Error('FN_MISSING'); throw error; }
    if (data?.error) throw new Error(data.error); return data; }
  stores() { return this.#rows(this.#db.from('ms_stores').select('*').order('sort').order('name')); }
  async stock() { const out = []; for (let from = 0; ; from += 1000) { const { data, error } = await this.#db.rpc('ms_stock_list').range(from, from + 999); this.#chk(error); out.push(...(data || [])); if ((data || []).length < 1000) return out; } }
  items() { return this.#paged(() => this.#db.from('ms_items').select('*').order('code')); }
  equipment() { return this.#paged(() => this.#db.from('ms_equipment').select('*').order('grp').order('plate').order('name')); }
  fits() { return this.#paged(() => this.#db.from('ms_fits').select('*').order('equipment_id').order('filter_type')); }
  async plates() { return (await this.#rpc('ms_plates')) ?? []; }
  async history(item) { return (await this.#rpc('ms_history', { p_item: item })) ?? []; }
  async movesIn(a, b) { const out = []; for (let from = 0; ; from += 1000) { const { data, error } = await this.#db.rpc('ms_moves_in', { p_from: a, p_to: b }).range(from, from + 999); this.#chk(error); out.push(...(data || [])); if ((data || []).length < 1000) return out; } }
  async check() { return (await this.#rpc('ms_stock_check')) ?? []; }
  post(p) { return this.#rpc('ms_post', { p }); }
  void(id, reason) { return this.#rpc('ms_void', { p_id: id, p_reason: reason }); }
  log() { return this.#rows(this.#db.from('ms_log').select('*').order('at', { ascending: false }).range(0, 199)); }
  async #one(query) { const { data, error } = await query; this.#chk(error); if (!data) throw new Error('MS_FORBIDDEN'); return data; }
  async #some(query) { const { data, error } = await query; this.#chk(error); if (!data?.length) throw new Error('MS_FORBIDDEN'); return data[0]; }
  addItem(row) { return this.#one(this.#db.from('ms_items').insert(row).select().single()); }
  updItem(id, patch) { return this.#some(this.#db.from('ms_items').update(patch).eq('id', id).select()); }
  delItem(id) { return this.#some(this.#db.from('ms_items').delete().eq('id', id).select('id')); }
  addStore(row) { return this.#one(this.#db.from('ms_stores').insert(row).select().single()); }
  updStore(id, patch) { return this.#some(this.#db.from('ms_stores').update(patch).eq('id', id).select()); }
  async changePassword(password) { const { error } = await this.#db.auth.updateUser({ password }); if (error) throw error; }
}
const repo = CONFIGURED ? new StoreRepository(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY) : null;

/* ---------------- 3) المساعدات ---------------- */
const $ = id => document.getElementById(id);
const FMTC = new Map();
const numF = o => { const k = 'n' + JSON.stringify(o); let f = FMTC.get(k); if (!f) FMTC.set(k, f = new Intl.NumberFormat('en-US', o)); return f; };
const dfmt = (d, loc, o) => { d = d instanceof Date ? d : new Date(d); if (isNaN(d)) return 'Invalid Date'; const k = loc + JSON.stringify(o); let f = FMTC.get(k); if (!f) FMTC.set(k, f = new Intl.DateTimeFormat(loc, o)); return f.format(d); };
const fmt2 = n => numF({ minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(n || 0));
const fmtInt = n => numF({ maximumFractionDigits: 0 }).format(Number(n || 0));
const qNum = v => { const x = String(v ?? '').trim().replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/٫/g, '.').replace(/,/g, ''); const n = x === '' ? NaN : Number(x); return Number.isFinite(n) ? n : NaN; };
const r2 = n => Math.round((Number(n) + Number.EPSILON) * 100) / 100;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const dSlash = s => { const [y, m, d] = String(s || '').slice(0, 10).split('-'); return d ? `${d}/${m}/${y}` : '—'; };
const fmtDT = iso => dfmt(iso, I18N[lang].locale, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
// a month is its 1st, 'YYYY-MM-01', everywhere on the page; Dubai's calendar decides which one is «this month»
const dubaiToday = () => { try { return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' }); } catch { return new Date().toISOString().slice(0, 10); } };
const thisMonth = () => dubaiToday().slice(0, 7) + '-01';
const addMonths = (m, n) => { const [y, mo] = String(m).split('-').map(Number); return new Date(Date.UTC(y, mo - 1 + n, 1)).toISOString().slice(0, 10); };
const monName = m => dfmt(String(m).slice(0, 7) + '-15T12:00:00', I18N[lang].locale, { month: 'long', year: 'numeric' });
function show(id, navId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === 'scr-' + id));
  document.querySelectorAll('nav button').forEach(b => b.classList.toggle('on', b.dataset.s === (navId || id)));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function msg(id, text, kind) { const el = $(id); el.textContent = text; el.className = 'msg ' + (text ? kind : ''); }
let toastT; function toast(text) { const el = $('toast'); el.textContent = text; el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 3200); }
function busy(btn, on) { btn.disabled = on; btn.classList.toggle('busy', on); }
const skeleton = n => Array.from({ length: n }, () => '<div class="skeleton"></div>').join('');
const errText = e => { const m = String(e?.message ?? e ?? ''), code = String(e?.code ?? '');
  let x = m.match(/MS_PART_DUP:([^\s]+)/); if (x) return t('errPartDup', { c: x[1] });
  x = m.match(/MS_CODE_DUP:([^\s]+)/); if (x) return t('errCodeDup', { c: x[1] });
  x = m.match(/MS_PLATE_UNKNOWN:([^\n]*)/); if (x) return t('errPlateUnknown', { p: x[1].trim() });
  x = m.match(/MS_ITEM_TWICE:([^\s]+)/); if (x) return t('errItemTwice', { c: x[1] });
  x = m.match(/MS_COUNT_INVALID:([^\s]+)/); if (x) return t('errCount', { c: x[1] });
  x = m.match(/MS_QTY_INVALID:([^\s]+)/); if (x) return t('errQty', { c: x[1] });
  x = m.match(/MS_ITEM_INACTIVE:([^\s]+)/); if (x) return t('errItemInactive', { c: x[1] });
  x = m.match(/MS_VOID_NOT_ENOUGH:([^|\s]+)\|([\d.]+)/); if (x) return t('errVoidNotEnough', { c: x[1], h: fmtQ(x[2]) });
  x = m.match(/MS_NOT_ENOUGH:([^|\s]+)\|([\d.]+)/); if (x) return t('errNotEnough', { c: x[1], h: fmtQ(x[2]) });
  const M = { MS_NAME_REQUIRED: 'errNameReq', MS_NAME_TOO_LONG: 'errNameLong', MS_CATEGORY_INVALID: 'errCategory', MS_UNIT_INVALID: 'errUnit', MS_MIN_INVALID: 'errMin',
    MS_NOTE_TOO_LONG: 'errNoteLong', MS_STORE_DUP: 'errStoreDup', MS_STORE_REQUIRED: 'errStoreReq', MS_TO_STORE_REQUIRED: 'errToStore', MS_SAME_STORE: 'errSameStore',
    MS_STORE_INACTIVE: 'errStoreInactive', MS_DATE_FUTURE: 'errDateFuture', MS_DATE_OLD: 'errDateOld', MS_WHO_REQUIRED: 'errWho', MS_LINES_REQUIRED: 'errLines',
    MS_TOO_MANY_LINES: 'errTooMany', MS_ITEM_UNKNOWN: 'errItemUnknown', MS_NOTHING_CHANGED: 'errNothing', MS_REASON_REQUIRED: 'errReason', MS_ALREADY_VOID: 'errAlreadyVoid',
    MS_ITEM_IN_USE: 'errItemInUse', MS_STORE_IN_USE: 'errStoreInUse', MS_MOVE_UNKNOWN: 'errMoveUnknown' };
  for (const k in M) if (m.includes(k)) return t(M[k]);
  if (/MS_FORBIDDEN|FORBIDDEN|row-level security|permission denied|not allowed/i.test(m)) return t('errForbidden');
  if (code === '23505' || /duplicate key|unique/i.test(m)) return t('errDup');
  if (/Failed to fetch|NetworkError|network/i.test(m)) return t('errNet');
  return m; };
document.addEventListener('pointerdown', e => {
  const b = e.target.closest('button.primary'); if (!b || b.disabled) return;
  const r = document.createElement('span'), rect = b.getBoundingClientRect(), s = Math.max(rect.width, rect.height);
  r.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,.35);pointer-events:none;width:${s}px;height:${s}px;left:${e.clientX - rect.left - s / 2}px;top:${e.clientY - rect.top - s / 2}px;transform:scale(0);animation:ripple 550ms var(--ease) forwards`;
  b.appendChild(r); setTimeout(() => r.remove(), 600);
});

/* ---- custom picker for <select> ---- */
// a plate or a part number is found however it is typed: «rak1234» finds «RAK 1234»; an option marked .new stays at the top;
// a search that finds nothing says why (data-none on the select)
const nkey = s => String(s || '').toLowerCase().replace(/[\s._\/-]+/g, '');
const Picker = (() => {
  let cur = null; const chev = '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>', tick = '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L19 7"/></svg>';
  function label(sel) { const o = sel.selectedOptions[0]; const btn = sel._btn; const ph = !o || !o.value; btn.innerHTML = `<span class="${ph ? 'ph' : ''}">${esc(o ? o.text : '')}</span>${chev}`; }
  function attach(sel, title) {
    if (sel._btn) { sel._title = title; return label(sel); }
    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'picker'; sel._btn = btn; sel._title = title; sel.classList.add('picked');
    sel.insertAdjacentElement('afterend', btn); btn.onclick = () => open(sel); label(sel);
  }
  function open(sel) {
    cur = sel; const opts = [...sel.options]; $('pickTitle').textContent = sel._title ? t(sel._title) : '';
    $('pickSearch').classList.toggle('hidden', opts.length < 9); $('pickSearch').value = ''; $('pickSearch').placeholder = sel.dataset.ph ? t(sel.dataset.ph) : ''; render();
    $('pickSheet').classList.remove('hidden'); $('pickBackdrop').classList.remove('hidden');
  }
  function render() {
    const q = $('pickSearch').value.trim().toLowerCase(), k = nkey(q);
    const hit = o => !q || o.classList.contains('new') || !o.value || o.text.toLowerCase().includes(q) || (o.dataset.sub || '').toLowerCase().includes(q) || (k && nkey(o.text + ' ' + (o.dataset.sub || '')).includes(k));
    const list = [...cur.options].filter(hit), real = list.filter(o => o.value && !o.classList.contains('new'));
    $('pickOpts').innerHTML = list.map((o, i) => `<div class="opt ${o.selected ? 'on' : ''} ${o.classList.contains('new') ? 'new' : ''}" data-v="${esc(o.value)}" style="animation-delay:${Math.min(i, 10) * 20}ms"><span>${esc(o.text)}${o.dataset.sub ? `<div class="sub">${esc(o.dataset.sub)}</div>` : ''}</span>${tick}</div>`).join('')
      + (q && !real.length && cur.dataset.none ? `<div class="none">${esc(t(cur.dataset.none))}</div>` : '');
  }
  function close() { $('pickSheet').classList.add('hidden'); $('pickBackdrop').classList.add('hidden'); cur = null; }
  $('pickSearch').oninput = render; $('pickBackdrop').onclick = close;
  $('pickOpts').onclick = e => { const o = e.target.closest('.opt'); if (!o || !cur) return; cur.value = o.dataset.v; label(cur); const s = cur; close(); s.dispatchEvent(new Event('change')); };
  return { attach, refresh: sel => sel._btn && label(sel) };
})();

/* ---- the generic edit sheet ---- */
const Edit = (() => {
  let onSave = null;
  function open(title, bodyHtml, save, saveLabel, cls) { $('editTitle').textContent = title; $('editBody').innerHTML = bodyHtml; msg('editMsg', '', ''); onSave = save; $('btnEditSave').textContent = saveLabel || t('saveChanges'); $('btnEditSave').className = 'primary' + (cls ? ' ' + cls : ''); $('btnEditSave').classList.toggle('hidden', !save); $('editSheet').classList.remove('hidden'); $('editBackdrop').classList.remove('hidden'); $('editSheet').scrollTop = 0; }
  function close() { $('editSheet').classList.add('hidden'); $('editBackdrop').classList.add('hidden'); onSave = null; }
  $('editBackdrop').onclick = close;
  $('btnEditSave').onclick = async () => { if (!onSave) return; busy($('btnEditSave'), true); try { const r = await onSave(); if (r !== 'keep') close(); if (r !== false && r !== 'keep') toast(t('saved')); } catch (e) { if (e?.silent) return; msg('editMsg', errText(e), 'err'); } finally { busy($('btnEditSave'), false); } };
  return { open, close, isOpen: () => !$('editSheet').classList.contains('hidden') };
})();



/* ---------------- 4) البيانات ---------------- */
let profile = null, userId = null, loaded = false, bootSeq = 0;
let STORES = [], STOCK = [], EQUIP = [], FITS = [], PLATES = [];
const SK = { store: 'all', cat: 'all', q: '', n: 80 };
const MV = { kind: 'issue', lines: [] };               // the movement being written: its kind and its lines [{item_id, qty, counted}]
const HS = { from: '', to: '', kind: 'all', store: 'all', q: '', rows: [], seq: 0 };
const FT = { q: '', grp: 'all' };
const CATS = ['machine', 'tool', 'consumable', 'oil', 'filter', 'spare'];
const UNITS = ['pcs', 'set', 'pair', 'roll', 'box', 'can', 'drum', 'litre', 'kg', 'm'];
const FTYPES = ['oil', 'fuel', 'water_sep', 'air', 'cabin'];
const KINDS = ['receive', 'issue', 'return', 'transfer', 'adjust'];
const itemOf = id => STOCK.find(i => i.item_id === id) || null;
const storeOf = id => STORES.find(s => s.id === id) || null;
const storeName = id => storeOf(id)?.name || '—';
const unitLbl = u => t('u_' + u);
const qtyTxt = (n, u) => `${fmtQ(n)} ${unitLbl(u || 'pcs')}`;
const fmtQ = n => numF({ maximumFractionDigits: 2 }).format(Number(n || 0));
const plateHtml = p => p ? `<span class="plate">${esc(p)}</span>` : '';
const kindPill = k => `<span class="kpill k-${esc(k)}">${esc(t('k_' + k))}</span>`;
// what a store holds of an item (the shelf), or all stores together
const qtyIn = (it, st) => st && st !== 'all' ? Number((it.by_store || {})[st] || 0) : Number(it.qty || 0);
async function loadAll() {
  const seq = ++bootSeq;
  const [stores, stock, equip, fits, plates] = await Promise.all([repo.stores(), repo.stock(), repo.equipment(), repo.fits(), repo.plates()]);
  if (seq !== bootSeq) return;
  STORES = stores; STOCK = stock; EQUIP = equip; FITS = fits; PLATES = plates; loaded = true;
}
async function reloadStock() { STOCK = await repo.stock(); }

/* ---------------- 5) المخزون ---------------- */
function renderStock() {
  const st = SK.store;
  const act = STORES.filter(s => s.active);
  $('skStores').innerHTML = [['all', t('allStores')], ...act.map(s => [s.id, s.name])].map(([v, l]) => `<button type="button" class="chip ${SK.store === v ? 'on' : ''}" data-v="${esc(v)}">${esc(l)}</button>`).join('');
  $('skStores').classList.toggle('hidden', act.length < 2);
  const n = c => STOCK.filter(i => c === 'all' || (c === 'low' ? i.low : i.category === c)).length;
  $('skCats').innerHTML = ['all', ...CATS, 'low'].filter(c => c === 'all' || n(c)).map(c => `<button type="button" class="chip ${SK.cat === c ? 'on' : ''}" data-v="${c}">${esc(t('c_' + c))} <small>${n(c)}</small></button>`).join('');
  const all = STOCK.filter(i => i.active || qtyIn(i, st) > 0);
  const inStock = all.filter(i => qtyIn(i, st) > 0).length, low = all.filter(i => i.low).length;
  $('skHero').innerHTML = `<div class="h-ttl">${esc(t('heroTtl', { s: st === 'all' ? t('allStores') : storeName(st) }))}</div>
    <div class="h-big">${fmtInt(all.length)} <small>${esc(t('hItems'))}</small></div>
    <div class="h-row"><div><b>${fmtInt(inStock)}</b><small>${esc(t('hInStock'))}</small></div><div class="lw"><b>${fmtInt(low)}</b><small>${esc(t('hLow'))}</small></div><div><b>${fmtInt(all.length - inStock)}</b><small>${esc(t('hEmpty'))}</small></div></div>`;
  $('btnAddItem').classList.toggle('hidden', !canEdit());
  renderStockList();
}
function stockRows() {
  const q = SK.q.trim().toLowerCase(), k = nkey(q);
  return STOCK.filter(i => (SK.cat === 'all' || (SK.cat === 'low' ? i.low : i.category === SK.cat))
    && (!q || i.name.toLowerCase().includes(q) || i.code.toLowerCase().includes(q) || (k && nkey(i.part_no || '').includes(k)) || (k && nkey(i.code).includes(k))));
}
function itemRow(i) {
  const q = qtyIn(i, SK.store);
  return `<div class="frow it ${i.active ? '' : 'off'} ${i.low ? 'low' : q > 0 ? 'has' : 'zero'}" data-id="${esc(i.item_id)}">
    <div class="fb"><div class="fn">${esc(i.name)}</div>
      <div class="fs"><span class="rec">${esc(i.code)}</span>${i.part_no && i.category !== 'filter' ? `<span class="rec">${esc(i.part_no)}</span>` : ''}${i.filter_type ? `<span class="kpill f">${esc(t('f_' + i.filter_type))}</span>` : `<span class="kpill f">${esc(t('c1_' + i.category))}</span>`}
        ${i.low ? `<span class="pill err">${esc(t('lowB', { m: fmtQ(i.min_qty) }))}</span>` : ''}${i.active ? '' : `<span class="pill mute">${esc(t('stoppedB'))}</span>`}</div>
      ${i.shelf || i.last_move ? `<div class="fx">${[i.shelf ? t('shelfL', { s: i.shelf }) : '', i.last_move ? t('lastMove', { d: dSlash(i.last_move) }) : ''].filter(Boolean).map(esc).join(' · ')}</div>` : ''}</div>
    <div class="fa"><span class="qty">${fmtQ(q)}</span><small class="muted">${esc(unitLbl(i.unit))}</small></div></div>`;
}
function renderStockList() {
  const rows = stockRows();
  $('skList').innerHTML = rows.length ? rows.slice(0, SK.n).map(itemRow).join('') + (rows.length > SK.n ? `<button class="ghost" id="skMore">${esc(t('moreN', { n: rows.length - SK.n }))}</button>` : '')
    : `<div class="empty">${esc(t(STOCK.length ? 'noMatch' : 'noItems'))}</div>`;
}
$('skStores').onclick = e => { const b = e.target.closest('.chip'); if (!b) return; SK.store = b.dataset.v; renderStock(); };
$('skCats').onclick = e => { const b = e.target.closest('.chip'); if (!b) return; SK.cat = b.dataset.v; SK.n = 80; renderStock(); };
$('skSearch').oninput = e => { SK.q = e.target.value; SK.n = 80; renderStockList(); };
$('skList').onclick = e => { if (e.target.id === 'skMore') { SK.n += 80; return renderStockList(); } const r = e.target.closest('.frow'); if (r) openItem(r.dataset.id); };
$('btnAddItem').onclick = () => itemSheet(null);

function itemFormHtml(i) {
  const o = (list, cur, pfx) => list.map(v => `<option value="${v}" ${v === cur ? 'selected' : ''}>${esc(t(pfx + v))}</option>`).join('');
  return `<label for="iName">${esc(t('iName'))}</label><input id="iName" maxlength="160" value="${esc(i?.name || '')}" autocomplete="off">
    <div class="row"><div><label for="iCat">${esc(t('iCat'))}</label><select id="iCat">${o(CATS, i?.category || 'consumable', 'c1_')}</select></div>
      <div><label for="iUnit">${esc(t('iUnit'))}</label><select id="iUnit">${o(UNITS, i?.unit || 'pcs', 'u_')}</select></div></div>
    <div id="iFtBox"><label for="iFt">${esc(t('iFt'))}</label><select id="iFt">${o(FTYPES, i?.filter_type || 'oil', 'f_')}</select></div>
    <label for="iPart">${esc(t('iPart'))}<span class="opt-t">${esc(t('optional'))}</span></label><input id="iPart" class="ltr" maxlength="60" value="${esc(i?.part_no || '')}" autocapitalize="characters" autocomplete="off">
    <div class="row"><div><label for="iMin">${esc(t('iMin'))}</label><input id="iMin" class="ltr" inputmode="decimal" value="${i ? esc(fmtQ(i.min_qty)) : '0'}"></div>
      <div><label for="iShelf">${esc(t('iShelf'))}<span class="opt-t">${esc(t('optional'))}</span></label><input id="iShelf" class="ltr" maxlength="40" value="${esc(i?.shelf || '')}" autocapitalize="characters" autocomplete="off"></div></div>
    <label for="iNote">${esc(t('iNote'))}<span class="opt-t">${esc(t('optional'))}</span></label><input id="iNote" maxlength="300" value="${esc(i?.note || '')}" autocomplete="off">`;
}
async function itemSheet(i, after) {
  let full = null;
  if (i) { try { full = (await repo.items()).find(x => x.id === i.item_id) || null; } catch { full = null; } }
  const src = full || (i ? { ...i, id: i.item_id } : null);
  Edit.open(i ? t('editItemT', { c: i.code }) : t('itemT'), itemFormHtml(src), async () => {
    const min = qNum($('iMin').value || '0'); if (!(min >= 0)) throw new Error(t('errMin'));
    const row = { name: $('iName').value, category: $('iCat').value, unit: $('iUnit').value, filter_type: $('iCat').value === 'filter' ? $('iFt').value : null,
      part_no: $('iPart').value || null, min_qty: min, shelf: $('iShelf').value || null, note: $('iNote').value || null };
    if (i) await repo.updItem(i.item_id, row); else await repo.addItem(row);
    await reloadStock(); renderStock(); if (after) after(); toast(t('itemSaved')); return false;
  });
  const ft = () => $('iFtBox').classList.toggle('hidden', $('iCat').value !== 'filter');
  $('iCat').onchange = ft; ft();
}
async function openItem(id) {
  const i = itemOf(id); if (!i) return;
  const fitsHere = FITS.filter(f => f.item_id === id).map(f => EQUIP.find(e => e.id === f.equipment_id)).filter(Boolean);
  const stores = Object.entries(i.by_store || {}).filter(([, q]) => Number(q) !== 0);
  const head = `<div class="pinfo"><div><small>${esc(t('thCode'))}</small><b>${esc(i.code)}</b></div><div><small>${esc(t('thPart'))}</small><b class="ltr">${esc(i.part_no || '—')}</b></div>
    <div><small>${esc(t('iCat'))}</small><b>${esc(i.filter_type ? t('f_' + i.filter_type) : t('c1_' + i.category))}</b></div><div><small>${esc(t('thQty'))}</small><b>${esc(qtyTxt(i.qty, i.unit))}</b></div>
    ${i.shelf ? `<div><small>${esc(t('thShelf'))}</small><b>${esc(i.shelf)}</b></div>` : ''}${Number(i.min_qty) > 0 ? `<div><small>${esc(t('thMin'))}</small><b>${esc(fmtQ(i.min_qty))}</b></div>` : ''}</div>
    ${i.low ? `<div class="warnbox">${esc(t('lowB', { m: fmtQ(i.min_qty) }))}</div>` : ''}
    <div class="lhead"><span>${esc(t('byStore'))}</span></div>
    ${stores.length ? `<div class="card" style="margin-top:6px">${stores.map(([s, q]) => `<div class="kv"><span>${esc(storeName(s))}</span><b>${esc(qtyTxt(q, i.unit))}</b></div>`).join('')}</div>` : `<div class="muted">${esc(t('noStock'))}</div>`}
    ${fitsHere.length ? `<div class="lhead"><span>${esc(t('fitsOn'))}</span><span class="n">${fitsHere.length}</span></div><div class="fs">${fitsHere.map(e => `<span class="eqtag">${esc(e.grp)} ${e.plate ? plateHtml(e.plate) : esc(e.name || '')}</span>`).join(' ')}</div>` : ''}
    ${canEdit() ? `<div class="row2b"><button type="button" class="ghost" id="iGoIssue">${esc(t('iIssue'))}</button><button type="button" class="ghost" id="iGoRecv">${esc(t('iReceive'))}</button></div>
      <div class="row2b"><button type="button" class="ghost" id="iEditB">${esc(t('iEdit'))}</button><button type="button" class="ghost" id="iStopB">${esc(t(i.active ? 'iStop' : 'iActivate'))}</button></div>` : ''}
    ${canAdmin() && !i.last_move && !Number(i.qty) ? `<button type="button" class="ghost danger" id="iDelB">${esc(t('iDelete'))}</button>` : ''}
    <div class="lhead"><span>${esc(t('historyT'))}</span></div><div id="iHist">${skeleton(3)}</div>`;
  Edit.open(i.name, head, null);
  const go = k => { Edit.close(); startMove(k, [{ item_id: id, qty: '' }]); };
  if ($('iGoIssue')) { $('iGoIssue').onclick = () => go('issue'); $('iGoRecv').onclick = () => go('receive'); $('iEditB').onclick = () => itemSheet(i);
    $('iStopB').onclick = async () => { try { await repo.updItem(id, { active: !i.active }); await reloadStock(); renderStock(); toast(t(i.active ? 'stoppedT' : 'activatedT')); Edit.close(); } catch (e) { msg('editMsg', errText(e), 'err'); } }; }
  if ($('iDelB')) $('iDelB').onclick = () => Edit.open(t('iDelQ', { n: i.name }), `<div class="warnbox">${esc(t('iDelD'))}</div>`, async () => { await repo.delItem(id); await reloadStock(); renderStock(); toast(t('deleted')); return false; }, t('yesDelete'), 'danger');
  try {
    const h = await repo.history(id);
    if (!$('iHist')) return;
    $('iHist').innerHTML = h.length ? h.slice(0, 100).map(x => `<div class="hrow ${x.status === 'void' ? 'void' : ''}">
      <div class="hb"><div>${kindPill(x.kind)} <b class="ltr">${esc(x.no)}</b> <span class="muted">${esc(dSlash(x.moved_on))}</span></div>
        <div class="muted">${esc([STORES.length > 1 ? storeName(x.store_id) : '', x.other_store ? '⇄ ' + storeName(x.other_store) : '', x.party || '', x.ref_no || ''].filter(Boolean).join(' · '))} ${plateHtml(x.plate)}</div></div>
      <div class="ha"><b class="${Number(x.qty) < 0 ? 'neg' : 'pos'}">${Number(x.qty) > 0 ? '+' : ''}${esc(fmtQ(x.qty))}</b><small class="muted">${esc(t('balAfter'))} ${esc(fmtQ(x.balance))}</small></div></div>`).join('')
      : `<div class="muted">${esc(t('noHistory'))}</div>`;
  } catch (e) { if ($('iHist')) $('iHist').innerHTML = `<div class="msg err">${esc(errText(e))}</div>`; }
}

/* ---------------- 6) حركة جديدة ---------------- */
function storeOpts(sel, cur, skip) {
  const act = STORES.filter(s => s.active && s.id !== skip);
  sel.innerHTML = act.map(s => `<option value="${esc(s.id)}" ${s.id === cur ? 'selected' : ''}>${esc(s.name)}</option>`).join('');
  if (!act.some(s => s.id === cur) && act[0]) sel.value = act[0].id;
  Picker.attach(sel, 'mvStore');
}
function plateOpts() {
  const sel = $('mvPlate'), cur = sel.value;
  sel.innerHTML = `<option value="">${esc(t('noPlate'))}</option>` + PLATES.map(p => `<option value="${esc(p.plate)}" data-sub="${esc(p.info || '')}" ${p.plate === cur ? 'selected' : ''}>${esc(p.plate)}</option>`).join('');
  Picker.attach(sel, 'mvPlate');
}
function addOpts() {
  const sel = $('mvAdd'), have = new Set(MV.lines.map(l => l.item_id));
  const list = STOCK.filter(i => !have.has(i.item_id) && (i.active || MV.kind === 'issue' || MV.kind === 'transfer' || MV.kind === 'adjust'));
  sel.innerHTML = `<option value="">${esc(t('addLine'))}</option>` + list.map(i => `<option value="${esc(i.item_id)}" data-sub="${esc([i.code, i.part_no && i.category !== 'filter' ? i.part_no : '', t('haveN', { n: qtyTxt(qtyIn(i, $('mvStore').value), i.unit) })].filter(Boolean).join(' · '))}">${esc(i.name)}</option>`).join('');
  sel.value = ''; Picker.attach(sel, 'addLine');
}
function setKind(k) {
  MV.kind = k;
  document.querySelectorAll('#mvKind button').forEach(b => b.classList.toggle('on', b.dataset.k === k));
  $('mvDesc').textContent = t('d_' + k);
  $('mvStoreL').textContent = t(k === 'transfer' ? 'mvFrom' : 'mvStore');
  $('mvToBox').classList.toggle('hidden', k !== 'transfer');
  $('mvPlateBox').classList.toggle('hidden', !(k === 'issue' || k === 'return'));
  $('mvPartyBox').classList.toggle('hidden', k === 'transfer' || k === 'adjust');
  $('mvRefBox').classList.toggle('hidden', k === 'adjust');
  $('mvPartyL').textContent = t(k === 'receive' ? 'mvPartyReceive' : k === 'return' ? 'mvPartyReturn' : 'mvPartyIssue');
  $('mvRefL').textContent = t(k === 'receive' ? 'mvRefReceive' : k === 'issue' ? 'mvRefIssue' : 'mvRefOther');
  if (k === 'transfer') storeOpts($('mvTo'), $('mvTo').value, $('mvStore').value);
  renderFits(); renderLines();
}
function renderFits() {
  const p = $('mvPlate').value, box = $('mvFits');
  if (!p || $('mvPlateBox').classList.contains('hidden')) { box.innerHTML = ''; return; }
  const eq = EQUIP.filter(e => e.plate && nkey(e.plate) === nkey(p)).map(e => e.id);
  const its = FITS.filter(f => eq.includes(f.equipment_id));
  if (!its.length) { box.innerHTML = `<div class="hint">${esc(t('noFits'))}</div>`; return; }
  const by = {}; its.forEach(f => { (by[f.filter_type] = by[f.filter_type] || new Set()).add(f.item_id); });
  box.innerHTML = `<div class="hint">${esc(t('fitsTitle'))}</div>` + FTYPES.filter(ft => by[ft]).map(ft => `<div class="fitrow"><small>${esc(t('f_' + ft))}</small><div class="fs">${[...by[ft]].map(id => { const i = itemOf(id); if (!i) return ''; const q = qtyIn(i, $('mvStore').value), on = MV.lines.some(l => l.item_id === id);
    return `<button type="button" class="fitchip ${q > 0 ? 'has' : ''} ${on ? 'on' : ''}" data-id="${esc(id)}"><b class="ltr">${esc(i.part_no || i.code)}</b><small>${esc(t('inStoreN', { n: fmtQ(q) }))}</small></button>`; }).join('')}</div></div>`).join('');
}
function renderLines() {
  const st = $('mvStore').value, adj = MV.kind === 'adjust';
  $('mvLinesN').textContent = MV.lines.length ? t('mvLinesN', { n: MV.lines.length }) : '';
  $('mvLines').innerHTML = MV.lines.length ? MV.lines.map((l, ix) => { const i = itemOf(l.item_id); if (!i) return ''; const have = qtyIn(i, st);
    const v = adj ? l.counted : l.qty, d = adj && v !== '' && !isNaN(qNum(v)) ? r2(qNum(v) - have) : null;
    const over = (MV.kind === 'issue' || MV.kind === 'transfer') && qNum(v) > have;
    return `<div class="lrow ${over ? 'over' : ''}" data-ix="${ix}"><div class="lb"><div class="fn">${esc(i.name)}</div><div class="muted"><span class="ltr">${esc(i.code)}</span>${i.part_no && i.category !== 'filter' ? ' · ' + esc(i.part_no) : ''} · ${esc(t(adj ? 'bookN' : 'haveN', { n: qtyTxt(have, i.unit) }))}${d != null && d !== 0 ? ` · <b class="${d < 0 ? 'neg' : 'pos'}">${esc(t('diffN', { n: (d > 0 ? '+' : '') + fmtQ(d) }))}</b>` : ''}</div></div>
      <div class="lq"><input class="ltr lqin" inputmode="decimal" value="${esc(v ?? '')}" placeholder="${esc(t(adj ? 'countedL' : 'qtyL'))}" aria-label="${esc(t(adj ? 'countedL' : 'qtyL'))}"><small>${esc(unitLbl(i.unit))}</small></div>
      <button type="button" class="lx" aria-label="remove">✕</button></div>`; }).join('') : `<div class="empty" style="padding:14px 0">${esc(t('mvEmpty'))}</div>`;
  addOpts();
}
function addLine(id) { if (!id || MV.lines.some(l => l.item_id === id)) return; MV.lines.push({ item_id: id, qty: '', counted: '' }); renderLines(); renderFits();
  setTimeout(() => { const ins = document.querySelectorAll('#mvLines .lqin'); const el = ins[ins.length - 1]; if (el) el.focus(); }, 60); }
$('mvKind').onclick = e => { const b = e.target.closest('button'); if (b) { setKind(b.dataset.k); msg('mvMsg', '', ''); } };
$('mvStore').onchange = () => { if (MV.kind === 'transfer') storeOpts($('mvTo'), $('mvTo').value, $('mvStore').value); renderLines(); renderFits(); };
$('mvPlate').onchange = renderFits;
$('mvAdd').onchange = e => addLine(e.target.value);
$('mvFits').onclick = e => { const b = e.target.closest('.fitchip'); if (!b) return; const id = b.dataset.id;
  if (MV.lines.some(l => l.item_id === id)) { MV.lines = MV.lines.filter(l => l.item_id !== id); renderLines(); renderFits(); } else addLine(id); };
$('mvLines').oninput = e => { const r = e.target.closest('.lrow'); if (!r || !e.target.classList.contains('lqin')) return; const l = MV.lines[Number(r.dataset.ix)]; if (!l) return;
  if (MV.kind === 'adjust') l.counted = e.target.value; else l.qty = e.target.value; };
$('mvLines').addEventListener('change', e => { if (e.target.classList.contains('lqin')) { const pos = [...document.querySelectorAll('#mvLines .lqin')].indexOf(e.target); renderLines(); const el = document.querySelectorAll('#mvLines .lqin')[pos + 1]; if (el) el.focus(); } });
$('mvLines').onclick = e => { const x = e.target.closest('.lx'); if (!x) return; MV.lines.splice(Number(x.closest('.lrow').dataset.ix), 1); renderLines(); renderFits(); };
function startMove(kind, lines) {
  MV.lines = (lines || []).map(l => ({ item_id: l.item_id, qty: l.qty ?? '', counted: l.counted ?? '' }));
  openTab('move', true); setKind(kind || MV.kind);
}
function renderMove() {
  storeOpts($('mvStore'), $('mvStore').value || (STORES.find(s => s.active) || {}).id); plateOpts();
  if (!$('mvDate').value) $('mvDate').value = dubaiToday(); $('mvDate').max = dubaiToday();
  setKind(MV.kind);
}
$('btnMvSave').onclick = async () => {
  msg('mvMsg', '', '');
  const adj = MV.kind === 'adjust';
  const lines = MV.lines.map(l => adj ? { item_id: l.item_id, counted: qNum(l.counted) } : { item_id: l.item_id, qty: qNum(l.qty) });
  const bad = lines.find(l => adj ? !(l.counted >= 0) : !(l.qty > 0));
  if (!lines.length) return msg('mvMsg', t('errLines'), 'err');
  if (bad) { const i = itemOf(bad.item_id); return msg('mvMsg', t(adj ? 'errCount' : 'errQty', { c: i ? i.code : '' }), 'err'); }
  const p = { kind: MV.kind, store_id: $('mvStore').value, moved_on: $('mvDate').value || null, note: $('mvNote').value || null, lines };
  if (MV.kind === 'transfer') p.to_store_id = $('mvTo').value;
  if (MV.kind === 'issue' || MV.kind === 'return') p.plate = $('mvPlate').value || null;
  if (MV.kind !== 'transfer' && MV.kind !== 'adjust') p.party = $('mvParty').value || null;
  if (MV.kind !== 'adjust') p.ref_no = $('mvRef').value || null;
  busy($('btnMvSave'), true);
  try {
    const r = await repo.post(p);
    MV.lines = []; ['mvParty', 'mvRef', 'mvNote'].forEach(id => { $(id).value = ''; }); $('mvPlate').value = ''; Picker.refresh($('mvPlate'));
    await reloadStock(); renderLines(); renderFits(); HS.rows = []; msg('mvMsg', t('mvSaved', { no: r.no }), 'ok'); toast(t('mvSaved', { no: r.no }));
  } catch (e) { msg('mvMsg', errText(e), 'err'); } finally { busy($('btnMvSave'), false); }
};

/* ---------------- 7) السجل ---------------- */
async function renderMoves(force) {
  if (!HS.from) { HS.to = dubaiToday(); HS.from = dubaiToday().slice(0, 8) + '01'; }
  $('hsFrom').value = HS.from; $('hsTo').value = HS.to; $('hsFrom').max = $('hsTo').max = dubaiToday();
  $('hsKinds').innerHTML = ['all', ...KINDS].map(k => `<button type="button" class="chip ${HS.kind === k ? 'on' : ''}" data-v="${k}">${esc(k === 'all' ? t('c_all') : t('k_' + k))}</button>`).join('');
  $('hsStores').innerHTML = STORES.length > 1 ? [['all', t('allStores')], ...STORES.map(s => [s.id, s.name])].map(([v, l]) => `<button type="button" class="chip ${HS.store === v ? 'on' : ''}" data-v="${esc(v)}">${esc(l)}</button>`).join('') : '';
  if (force || !HS.rows.length || HS.key !== HS.from + HS.to) {
    const seq = ++HS.seq; $('hsList').innerHTML = skeleton(4);
    try { const rows = await repo.movesIn(HS.from, HS.to); if (seq !== HS.seq) return; HS.rows = rows; HS.key = HS.from + HS.to; }
    catch (e) { $('hsList').innerHTML = `<div class="msg err">${esc(errText(e))}</div>`; return; }
  }
  renderMoveList();
}
function moveRows() {
  const q = HS.q.trim().toLowerCase(), k = nkey(q);
  return HS.rows.filter(m => (HS.kind === 'all' || m.kind === HS.kind) && (HS.store === 'all' || m.store_id === HS.store || m.to_store_id === HS.store)
    && (!q || [m.no, m.party, m.ref_no, m.note, m.by_name].some(x => String(x || '').toLowerCase().includes(q)) || (k && nkey(m.plate).includes(k))
      || (m.lines || []).some(l => l.name.toLowerCase().includes(q) || nkey(l.code).includes(k))));
}
function moveRow(m) {
  const ls = m.lines || [];
  return `<div class="frow mv k-${esc(m.kind)} ${m.status === 'void' ? 'void' : ''}" data-id="${esc(m.id)}"><div class="fb">
    <div class="fn">${kindPill(m.kind)} <span class="ltr">${esc(m.no)}</span> ${m.status === 'void' ? `<span class="pill err">${esc(t('voidB'))}</span>` : ''}</div>
    <div class="fs">${esc(dSlash(m.moved_on))}${STORES.length > 1 ? ' · ' + esc(storeName(m.store_id)) + (m.to_store_id ? ' ⇄ ' + esc(storeName(m.to_store_id)) : '') : ''} ${plateHtml(m.plate)} ${m.party ? '· ' + esc(m.party) : ''}</div>
    <div class="fx">${ls.slice(0, 4).map(l => `${esc(l.name)} <b class="ltr ${Number(l.qty) < 0 ? 'neg' : 'pos'}">${Number(l.qty) > 0 ? '+' : ''}${esc(fmtQ(l.qty))}</b>`).join(' · ')}${ls.length > 4 ? ` · +${ls.length - 4}` : ''}</div></div>
    <div class="fa"><small class="muted">${esc(m.by_name || '')}</small></div></div>`;
}
function renderMoveList() {
  const rows = moveRows();
  $('hsList').innerHTML = rows.length ? `<div class="lhead"><span>${esc(t('movesN', { n: rows.length }))}</span></div>` + rows.map(moveRow).join('') : `<div class="empty">${esc(t('noMoves'))}</div>`;
}
$('hsFrom').onchange = e => { HS.from = e.target.value || HS.from; renderMoves(true); };
$('hsTo').onchange = e => { HS.to = e.target.value || HS.to; renderMoves(true); };
$('hsKinds').onclick = e => { const b = e.target.closest('.chip'); if (!b) return; HS.kind = b.dataset.v; renderMoves(); };
$('hsStores').onclick = e => { const b = e.target.closest('.chip'); if (!b) return; HS.store = b.dataset.v; renderMoves(); };
$('hsSearch').oninput = e => { HS.q = e.target.value; renderMoveList(); };
$('hsList').onclick = e => { const r = e.target.closest('.frow'); if (r) openMove(r.dataset.id); };
function openMove(id) {
  const m = HS.rows.find(x => x.id === id); if (!m) return;
  const ls = m.lines || [];
  const body = `<div class="pinfo"><div><small>${esc(t('thKind'))}</small><b>${esc(t('k_' + m.kind))}</b></div><div><small>${esc(t('thDate'))}</small><b>${esc(dSlash(m.moved_on))}</b></div>
    <div><small>${esc(t(m.kind === 'transfer' ? 'mvFrom' : 'mvStore'))}</small><b>${esc(storeName(m.store_id))}</b></div>${m.to_store_id ? `<div><small>${esc(t('mvTo'))}</small><b>${esc(storeName(m.to_store_id))}</b></div>` : ''}
    ${m.plate ? `<div><small>${esc(t('mvPlate'))}</small><b>${plateHtml(m.plate)}</b></div>` : ''}${m.party ? `<div><small>${esc(t(m.kind === 'receive' ? 'mvPartyReceive' : m.kind === 'return' ? 'mvPartyReturn' : 'mvPartyIssue'))}</small><b>${esc(m.party)}</b></div>` : ''}
    ${m.ref_no ? `<div><small>${esc(t(m.kind === 'receive' ? 'mvRefReceive' : m.kind === 'issue' ? 'mvRefIssue' : 'mvRefOther'))}</small><b class="ltr">${esc(m.ref_no)}</b></div>` : ''}
    <div><small>${esc(t('thBy'))}</small><b>${esc(m.by_name || '')}</b></div></div>
    ${m.note ? `<div class="infobox">${esc(m.note)}</div>` : ''}
    ${m.status === 'void' ? `<div class="warnbox">${esc(t('voidWas', { n: m.void_by_name || '', d: '', r: m.void_reason || '' }))}</div>` : ''}
    <div class="lhead"><span>${esc(t('mvItems'))}</span><span class="n">${ls.length}</span></div>
    <div class="tbl"><table><thead><tr><th>${esc(t('thItem'))}</th><th class="num">${esc(t('thQty'))}</th></tr></thead><tbody>${ls.map(l => `<tr><td><div class="nm">${esc(l.name)}</div><div class="muted ltr">${esc(l.code)}</div></td>
      <td class="num ${Number(l.qty) < 0 ? 'neg' : 'pos'}">${Number(l.qty) > 0 ? '+' : ''}${esc(fmtQ(l.qty))} <small>${esc(unitLbl(l.unit))}</small>${l.counted != null ? `<div class="muted">${esc(t('countedL'))}: ${esc(fmtQ(l.counted))}</div>` : ''}</td></tr>`).join('')}</tbody></table></div>
    <button type="button" class="ghost" id="mPrint">${esc(t('printMove'))}</button>
    ${canAdmin() && m.status === 'posted' ? `<button type="button" class="ghost danger" id="mVoid">${esc(t('voidYes'))}</button>` : ''}`;
  Edit.open(t('moveT', { no: m.no }), body, null);
  $('mPrint').onclick = () => movePdf(m);
  if ($('mVoid')) $('mVoid').onclick = () => Edit.open(t('voidQ'), `<div class="warnbox">${esc(t('voidD'))}</div><input id="vReason" maxlength="300" placeholder="${esc(t('reasonPh'))}" style="margin-top:10px">`, async () => {
    const r = $('vReason').value.trim(); if (!r) throw new Error(t('errReason'));
    await repo.void(m.id, r); await reloadStock(); await renderMoves(true); toast(t('voided')); return false;
  }, t('voidYes'), 'danger');
}

/* ---------------- 8) الفلاتر ---------------- */
function renderFilters() {
  const groups = [...new Set(EQUIP.map(e => e.grp))];
  $('ftGroups').innerHTML = ['all', ...groups].map(g => `<button type="button" class="chip ${FT.grp === g ? 'on' : ''}" data-v="${esc(g)}">${esc(g === 'all' ? t('c_all') : g)} <small>${EQUIP.filter(e => g === 'all' || e.grp === g).length}</small></button>`).join('');
  renderFilterList();
}
function renderFilterList() {
  const q = FT.q.trim().toLowerCase(), k = nkey(q);
  const fitsOf = id => FITS.filter(f => f.equipment_id === id);
  const rows = EQUIP.filter(e => (FT.grp === 'all' || e.grp === FT.grp) && (!q || e.grp.toLowerCase().includes(q) || (e.name || '').toLowerCase().includes(q) || (k && nkey(e.plate).includes(k))
    || (k && fitsOf(e.id).some(f => { const i = itemOf(f.item_id); return i && nkey(i.part_no).includes(k); }))));
  let last = null;
  $('ftList').innerHTML = rows.length ? rows.map(e => { const fs = fitsOf(e.id); const by = {}; fs.forEach(f => { (by[f.filter_type] = by[f.filter_type] || []).push(f.item_id); });
    const hd = e.grp !== last ? `<div class="lhead"><span>${esc(e.grp)}</span><span class="n">${esc(t('equipN', { n: rows.filter(x => x.grp === e.grp).length }))}</span></div>` : ''; last = e.grp;
    return hd + `<div class="frow eq"><div class="fb"><div class="fn">${e.plate ? plateHtml(e.plate) : ''} ${esc(e.name || '')}</div>
      ${FTYPES.filter(ft => by[ft]).map(ft => `<div class="fitrow"><small>${esc(t('f_' + ft))}</small><div class="fs">${by[ft].map(id => { const i = itemOf(id); if (!i) return ''; const n = Number(i.qty || 0);
        return `<span class="fitchip ${n > 0 ? 'has' : ''}" data-id="${esc(id)}"><b class="ltr">${esc(i.part_no || i.code)}</b><small>${esc(fmtQ(n))}</small></span>`; }).join('')}</div></div>`).join('') || `<div class="muted">${esc(t('noFits'))}</div>`}</div></div>`; }).join('')
    : `<div class="empty">${esc(t('noEquip'))}</div>`;
}
$('ftGroups').onclick = e => { const b = e.target.closest('.chip'); if (!b) return; FT.grp = b.dataset.v; renderFilters(); };
$('ftSearch').oninput = e => { FT.q = e.target.value; renderFilterList(); };
$('ftList').onclick = e => { const c = e.target.closest('.fitchip'); if (c) openItem(c.dataset.id); };

/* ---------------- 9) المخازن والسجل ---------------- */
function storesSheet() {
  openSheet(false);
  const html = () => STORES.map(s => `<div class="kv srow" data-id="${esc(s.id)}"><span>${esc(s.name)} ${s.active ? '' : `<span class="pill mute">${esc(t('storeStopped'))}</span>`}</span>
    <span><button type="button" class="btn-sm sEdit">✎</button> <button type="button" class="btn-sm sTog">${esc(t(s.active ? 'sStop' : 'sActivate'))}</button></span></div>`).join('')
    + `<label for="sNew">${esc(t('storeName'))}</label><input id="sNew" maxlength="80" autocomplete="off">`;
  Edit.open(t('storesT'), html(), async () => { const n = $('sNew').value.trim(); if (!n) return false; await repo.addStore({ name: n, sort: 100 + STORES.length }); STORES = await repo.stores(); toast(t('storeSaved')); storesSheet(); return 'keep'; }, t('addStore'));
  $('editBody').onclick = async e => { const r = e.target.closest('.srow'); if (!r) return; const s = storeOf(r.dataset.id); if (!s) return;
    try {
      if (e.target.closest('.sTog')) { await repo.updStore(s.id, { active: !s.active }); }
      else if (e.target.closest('.sEdit')) { const n = prompt(t('storeName'), s.name); if (!n || !n.trim()) return; await repo.updStore(s.id, { name: n }); }
      else return;
      STORES = await repo.stores(); storesSheet();
    } catch (er) { msg('editMsg', errText(er), 'err'); } };
}
$('btnStores').onclick = storesSheet;
const logVal = (k, v) => v == null || v === '' ? '—' : k === 'category' ? t('c1_' + v) : k === 'filter_type' ? t('f_' + v) : k === 'unit' ? unitLbl(v) : typeof v === 'boolean' ? (v ? '✓' : '✗') : String(v);
async function openLog() {
  openSheet(false); Edit.open(t('logTitle'), skeleton(5), null);
  try {
    const rows = await repo.log();
    $('editBody').innerHTML = rows.length ? rows.map(l => `<div class="lg"><div><b>${esc(t(l.action === 'add' ? 'lgAdd' : l.action === 'edit' ? 'lgEdit' : 'lgDelete'))} · ${esc(t('lg_' + l.tbl))}</b> — ${esc(l.snap?.name || l.snap?.plate || '')} <span class="muted ltr">${esc(l.snap?.code || '')}</span></div>
      ${l.changes ? `<div class="muted">${Object.entries(l.changes).map(([k, v]) => `${esc(t('lf_' + k))}: ${esc(logVal(k, v[0]))} → ${esc(logVal(k, v[1]))}`).join(' · ')}</div>` : ''}
      <div class="muted">${esc(l.by_name || '')} · ${esc(fmtDT(l.at))}</div></div>`).join('') : `<div class="empty">${esc(t('logEmpty'))}</div>`;
  } catch (e) { $('editBody').innerHTML = `<div class="msg err">${esc(errText(e))}</div>`; }
}
$('btnLogRow').onclick = openLog;
$('btnSkCheck').onclick = async () => { try { const r = await repo.check(); toast(r.length ? t('checkBad', { n: r.length }) : t('checkOk')); } catch (e) { toast(errText(e)); } };

/* ---------------- 10) الأوراق ---------------- */
// THE PRINT WINDOW'S WAY BACK: a bar on top, hidden on paper, wired by the fixed print script
function pwBar() {
  return `<div class="pwbar"><style>.pwbar{position:fixed;top:0;left:0;right:0;z-index:2147483647;display:flex;gap:8px;padding:8px 10px;background:#16181D;box-shadow:0 2px 8px rgba(0,0,0,.25)}.pwbar button{flex:1;min-height:46px;border:0;border-radius:10px;font:700 16px Tajawal,Cairo,Arial,sans-serif;cursor:pointer}#pwBack{background:#fff;color:#16181D}#pwPrint{background:#A3E635;color:#1A2E05}@media screen{html{padding-top:62px}}@media print{.pwbar{display:none!important}html{padding-top:0!important}}</style><button type="button" id="pwBack">${esc(t('pwBack'))}</button><button type="button" id="pwPrint">${esc(t('pwPrint'))}</button></div>`;
}
// the end of every paper of this page: the bar and the ONE fixed print script (its hash is in _headers — never interpolate in it)
const printEnd = () => `${pwBar()}<script src="print.js"></script></body></html>`;
// the window is opened INSIDE the tap (a window opened after a round trip is a pop-up to a phone)
function openPrint(html) { const w = window.open('', '_blank'); if (!w) return toast(t('errPopup')); w.document.write(html); w.document.close(); }

const MS_CSS = `.pp{--v:#1F2A1A;--vt:#F4F7EE;--vl:#D7DECB;--vh:#E9EFDD;--ink:#14171C;--mu:#454C57;font-family:Tajawal,Arial,sans-serif;color:var(--ink);font-size:12px;line-height:1.45}
.pp *{box-sizing:border-box}
.pp .band{display:flex;align-items:center;gap:16px;background:linear-gradient(120deg,#0E1210 0%,#1F2A1A 55%,#3F6212 100%);color:#fff;border-radius:16px;padding:14px 18px}
.pp .band img{height:40px;filter:brightness(0) invert(1)}.pp .band .bt{flex:1}.pp .band h1{margin:2px 0 0;font:900 18px Cairo,Arial,sans-serif}.pp .band .co{font-size:11px;opacity:.85}
.pp .band .tag{display:inline-block;background:#A3E635;color:#1A2E05;font:900 9px/1.6 Poppins,Cairo,Arial,sans-serif;letter-spacing:.6px;padding:1px 8px;border-radius:7px}
.pp .band .no{text-align:center;background:rgba(255,255,255,.12);border-radius:10px;padding:6px 12px}.pp .band .no small{display:block;font-size:9.5px;opacity:.85}.pp .band .no b{font:900 15px Poppins,Cairo,sans-serif}
.pp .cards{display:flex;gap:8px;margin:12px 0}.pp .card{flex:1;border:1px solid var(--vl);border-radius:12px;padding:8px 10px;background:var(--vt)}.pp .card .k{font-size:10px;color:var(--mu)}.pp .card .v{font:900 15px Cairo,Arial,sans-serif}
.pp table{width:100%;border-collapse:collapse;margin-top:8px}.pp th{background:var(--vh);font:800 10.5px Cairo,Arial,sans-serif;padding:6px;border-bottom:1.5px solid var(--v);text-align:start}
.pp td{padding:5px 6px;border-bottom:1px solid var(--vl);vertical-align:top}.pp td.num,.pp th.num{text-align:center;direction:ltr;font-weight:800;white-space:nowrap}.pp tr.grp td{background:var(--vt);font:800 11px Cairo,Arial,sans-serif}
.pp .ltr{direction:ltr;unicode-bidi:isolate}.pp .neg{color:#B91C1C}.pp .pos{color:#15803D}.pp .void td{text-decoration:line-through;color:#888}.pp .blank{border-bottom:1px dashed #999;min-width:50px;display:inline-block}
.pp .sigs{display:flex;gap:12px;margin-top:26px}.pp .sig{flex:1;border:1px solid var(--vl);border-radius:10px;padding:8px 10px;min-height:70px}.pp .sig small{font-size:10px;color:var(--mu)}.pp .sig b{display:block;font-size:12px}.pp .sig i{display:block;border-bottom:1px solid #999;margin-top:22px}
.pp .meta{display:grid;grid-template-columns:repeat(3,1fr);gap:6px 12px;margin-top:10px;font-size:11.5px}.pp .meta small{color:var(--mu);display:block;font-size:10px}
.pp .foot{display:flex;justify-content:space-between;gap:10px;margin-top:14px;padding-top:7px;border-top:1px solid var(--vl);font-size:9.5px;color:var(--mu)}`;
const CO = 'Orion Contracting Company';
const ppBand = (title, sub, noK, noV) => `<div class="band"><img src="logo.png" alt="Orion"><div class="bt"><span class="tag">MECHANIC STORE</span><h1>${esc(title)}</h1><div class="co">${esc(sub)}</div></div>${noV != null ? `<div class="no"><small>${esc(noK)}</small><b>${esc(noV)}</b></div>` : ''}</div>`;
const nowTxt = () => { const d = new Date(); return `${dSlash(d.toLocaleDateString('en-CA'))} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };
const ppFoot = () => `<div class="foot"><span>${esc(CO)}</span><span>${esc(t('printed'))} <span dir="ltr">${nowTxt()}</span> · ${esc(profile?.name || '')}</span></div>`;
const paperDoc = title => `<!doctype html><html lang="${lang}" dir="${I18N[lang].dir}"><head><meta charset="utf-8"><base href="${esc(location.href)}"><title>${esc(title)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&family=Tajawal:wght@400;500;700&family=Poppins:wght@700;800&display=swap" rel="stylesheet">
  <style>@page{size:A4 portrait;margin:6mm}html,body{background:#fff}body{margin:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  @media screen{body{padding:14px;max-width:210mm;margin:0 auto}}
  .hint{background:#F4F9E8;border:1px solid #CFE3A6;color:#365314;padding:8px 10px;border-radius:10px;margin-bottom:12px;font:500 11px Tajawal,Arial,sans-serif}@media print{.hint{display:none}}
  ${MS_CSS}</style></head><body><div class="hint">${esc(t('printHint'))}</div>`;
function movePdf(m) {
  const ls = m.lines || [], adj = m.kind === 'adjust';
  const meta = [[t('thDate'), dSlash(m.moved_on)], [t(m.kind === 'transfer' ? 'mvFrom' : 'mvStore'), storeName(m.store_id)], m.to_store_id ? [t('mvTo'), storeName(m.to_store_id)] : null,
    m.plate ? [t('mvPlate'), m.plate] : null, m.party ? [t(m.kind === 'receive' ? 'mvPartyReceive' : m.kind === 'return' ? 'mvPartyReturn' : 'mvPartyIssue'), m.party] : null,
    m.ref_no ? [t(m.kind === 'receive' ? 'mvRefReceive' : m.kind === 'issue' ? 'mvRefIssue' : 'mvRefOther'), m.ref_no] : null, [t('thBy'), m.by_name || '']].filter(Boolean);
  const html = paperDoc(m.no) + `<div class="pp">${ppBand(t('ppMove', { k: t('k_' + m.kind) }) + (m.status === 'void' ? ' — ' + t('voidB') : ''), CO, t('thNo'), m.no)}
    <div class="meta">${meta.map(([k, v]) => `<div><small>${esc(k)}</small><b>${esc(v)}</b></div>`).join('')}</div>${m.note ? `<p>${esc(m.note)}</p>` : ''}
    <table class="${m.status === 'void' ? 'void' : ''}"><thead><tr><th>#</th><th>${esc(t('thCode'))}</th><th>${esc(t('thItem'))}</th>${adj ? `<th class="num">${esc(t('countedL'))}</th>` : ''}<th class="num">${esc(t('thQty'))}</th><th>${esc(t('thUnit'))}</th></tr></thead>
    <tbody>${ls.map((l, ix) => `<tr><td>${ix + 1}</td><td class="ltr">${esc(l.code)}</td><td>${esc(l.name)}</td>${adj ? `<td class="num">${esc(fmtQ(l.counted))}</td>` : ''}<td class="num ${Number(l.qty) < 0 ? 'neg' : 'pos'}">${adj && Number(l.qty) > 0 ? '+' : ''}${esc(fmtQ(adj ? l.qty : Math.abs(l.qty)))}</td><td>${esc(unitLbl(l.unit))}</td></tr>`).join('')}</tbody></table>
    <div class="sigs"><div class="sig"><small>${esc(t('sigStore'))}</small><b>${esc(m.by_name || '')}</b><i></i></div><div class="sig"><small>${esc(t('sigRecv'))}</small><b>${esc(m.party || '')}&nbsp;</b><i></i></div><div class="sig"><small>${esc(t('sigApprove'))}</small><b>&nbsp;</b><i></i></div></div>
    ${ppFoot()}</div>` + printEnd();
  openPrint(html);
}
$('btnSkPdf').onclick = () => {
  const st = SK.store, rows = stockRows();
  const html = paperDoc(t('ppStock')) + `<div class="pp">${ppBand(t('ppStock'), (st === 'all' ? t('allStores') : storeName(st)) + ' · ' + CO, t('thDate'), dSlash(dubaiToday()))}
    <div class="cards"><div class="card"><div class="k">${esc(t('ppItems'))}</div><div class="v">${fmtInt(rows.length)}</div></div><div class="card"><div class="k">${esc(t('ppUnits'))}</div><div class="v">${fmtInt(rows.filter(i => qtyIn(i, st) > 0).length)}</div></div><div class="card"><div class="k">${esc(t('ppLow'))}</div><div class="v">${fmtInt(rows.filter(i => i.low).length)}</div></div></div>
    <table><thead><tr><th>${esc(t('thCode'))}</th><th>${esc(t('thItem'))}</th><th>${esc(t('thShelf'))}</th><th class="num">${esc(t('thQty'))}</th><th>${esc(t('thUnit'))}</th><th class="num">${esc(t('countedL'))}</th></tr></thead>
    <tbody>${CATS.map(c => { const g = rows.filter(i => i.category === c); return g.length ? `<tr class="grp"><td colspan="6">${esc(t('c_' + c))} (${g.length})</td></tr>` + g.map(i => `<tr><td class="ltr">${esc(i.code)}</td><td>${esc(i.name)}</td><td>${esc(i.shelf || '')}</td><td class="num">${esc(fmtQ(qtyIn(i, st)))}</td><td>${esc(unitLbl(i.unit))}</td><td class="num"><span class="blank"></span></td></tr>`).join('') : ''; }).join('')}</tbody></table>
    <div class="sigs"><div class="sig"><small>${esc(t('sigStore'))}</small><b>&nbsp;</b><i></i></div><div class="sig"><small>${esc(t('sigApprove'))}</small><b>&nbsp;</b><i></i></div></div>${ppFoot()}</div>` + printEnd();
  openPrint(html);
};
$('btnHsPdf').onclick = () => {
  const rows = moveRows();
  const html = paperDoc(t('ppMoves')) + `<div class="pp">${ppBand(t('ppMoves'), CO, t('thDate'), t('ppPeriod', { a: dSlash(HS.from), b: dSlash(HS.to) }))}
    <table><thead><tr><th>${esc(t('thNo'))}</th><th>${esc(t('thDate'))}</th><th>${esc(t('thKind'))}</th><th>${esc(t('thTo'))}</th><th>${esc(t('thItem'))}</th><th class="num">${esc(t('thQty'))}</th><th>${esc(t('thBy'))}</th></tr></thead>
    <tbody>${rows.map(m => (m.lines || []).map((l, ix) => `<tr class="${m.status === 'void' ? 'void' : ''}">${ix ? '<td></td><td></td><td></td><td></td>' : `<td class="ltr">${esc(m.no)}</td><td>${esc(dSlash(m.moved_on))}</td><td>${esc(t('k_' + m.kind))}</td><td>${esc([m.plate, m.party, m.to_store_id ? storeName(m.to_store_id) : ''].filter(Boolean).join(' · '))}</td>`}<td>${esc(l.name)}</td><td class="num ${Number(l.qty) < 0 ? 'neg' : 'pos'}">${Number(l.qty) > 0 ? '+' : ''}${esc(fmtQ(l.qty))}</td><td>${ix ? '' : esc(m.by_name || '')}</td></tr>`).join('')).join('')}</tbody></table>${ppFoot()}</div>` + printEnd();
  openPrint(html);
};

/* ---------------- 10b) المستخدمون (admin only) ---------------- */
// Accounts are made, changed and removed by the Edge Function admin-users (service role); the list is ms_user_list() (admin only).
// A username is the login: username@USER_DOMAIN. The function refuses deleting / stopping / demoting oneself and the last active admin.
const US = { rows: [], q: '', role: 'all', del: null, seq: 0 };
const normUser = u => String(u || '').trim().toLowerCase().replace(/\s+/g, '').replace(/^@/, '').replace(/@.*$/, '');
const userOk = u => /^[a-z0-9][a-z0-9._-]{1,31}$/.test(u);
const genPass = () => { const a = 'abcdefghjkmnpqrstuvwxyz', d = '23456789', r = n => { const b = new Uint32Array(1); crypto.getRandomValues(b); return b[0] % n; };
  let s = ''; for (let i = 0; i < 6; i++) s += a[r(a.length)]; for (let i = 0; i < 4; i++) s += d[r(d.length)]; return s.charAt(0).toUpperCase() + s.slice(1); };
const usErr = e => { const m = String(e?.message ?? e ?? '');
  const M = { USERNAME_TAKEN: 'errUserTaken', USERNAME_INVALID: 'errUserBad', PASSWORD_WEAK: 'errPassWeak', LAST_ADMIN: 'errLastAdmin', SELF: 'errSelf', ADMIN_ONLY: 'errAdminOnly', FN_MISSING: 'errFnMissing', ROLE_INVALID: 'errForbidden', NAME_REQUIRED: 'errNameReq' };
  for (const k in M) if (m.includes(k)) return t(M[k]);
  return errText(e); };
async function loadUsers() {
  if (!canAdmin()) return; const seq = ++US.seq;
  if (!US.rows.length) $('usList').innerHTML = skeleton(4);
  try { const rows = await repo.userList(); if (seq !== US.seq) return; US.rows = rows; renderUsers(); }
  catch (e) { if (seq === US.seq) $('usList').innerHTML = `<div class="msg err">${esc(usErr(e))}</div>`; }
}
function renderUsers() {
  const n = r => US.rows.filter(u => r === 'all' || (r === 'stopped' ? !u.active : u.role === r)).length;
  $('usRoles').innerHTML = ['all', ...ROLE_LIST, 'stopped'].filter(r => r === 'all' || n(r)).map(r => `<button type="button" class="chip ${US.role === r ? 'on' : ''}" data-v="${r}">${esc(r === 'all' ? t('usAll') : r === 'stopped' ? t('usStopped') : t(r))} <span class="n">${n(r)}</span></button>`).join('');
  renderUserList();
}
function renderUserList() {
  const q = US.q.trim().toLowerCase();
  const rows = US.rows.filter(u => (US.role === 'all' || (US.role === 'stopped' ? !u.active : u.role === US.role)) && (!q || (u.name || '').toLowerCase().includes(q) || (u.username || '').toLowerCase().includes(q)));
  $('usList').innerHTML = rows.length ? rows.map(u => { const me = u.id === userId;
    return `<div class="frow ${u.active ? '' : 'off'}" data-id="${esc(u.id)}"><div class="fb" data-act="edit"><div class="fn">${esc(u.name || '—')}${me ? ` <span class="pill mute">${esc(t('usYou'))}</span>` : ''}</div>
      <div class="fs"><span class="pill ${u.role === 'admin' ? 'err' : u.role === 'manager' ? 'warn' : u.role === 'storekeeper' ? 'ok' : 'mute'}">${esc(t(u.role))}</span>${u.active ? '' : `<span class="pill mute">⏸ ${esc(t('usStopped'))}</span>`}<span class="ltr muted">${esc(u.username || '')}</span></div>
      <div class="fx">${esc(t('usLast'))}: ${u.last_sign_in_at ? esc(fmtDT(u.last_sign_in_at)) : esc(t('usNever'))}</div></div>
      <div class="fa"><div class="acts">${canTouch(u) ? `<button type="button" class="btn-sm" data-act="edit">✎</button><button type="button" class="btn-sm" data-act="pass">🔑</button>${me ? '' : `<button type="button" class="btn-sm" data-act="del">🗑</button>`}` : `<span class="pill mute">🔒</span>`}</div></div></div>`; }).join('')
    : `<div class="empty">${esc(t('usNone'))}</div>`;
}
const roleSel = (id, v) => `<select id="${id}">${roleOpts().map(r => `<option value="${r}" ${r === v ? 'selected' : ''}>${esc(t(r))}</option>`).join('')}</select><div class="hint">${esc(t('usRoleHelp'))}</div>`;
function credSheet(title, name, username, password) {
  const login = normUser(username), text = `${name}\n${t('username')}: ${login}\n${t('password')}: ${password}\n${location.origin}${location.pathname}`;
  Edit.open(t('usCred'), `<div class="msg ok">${esc(title)}</div><div class="card" style="margin-top:10px"><div class="kv"><span>${esc(t('usName'))}</span><b>${esc(name)}</b></div>
    <div class="kv"><span>${esc(t('username'))}</span><b class="ltr">${esc(login)}</b></div><div class="kv"><span>${esc(t('password'))}</span><b class="ltr">${esc(password)}</b></div></div>
    <button type="button" class="ghost" id="usCopy">${esc(t('usCopy'))}</button>`, null);
  $('usCopy').onclick = async () => { try { await navigator.clipboard.writeText(text); toast(t('usCopied')); } catch { toast(text); } };
}
function userNewSheet() {
  Edit.open(t('userNew').replace('＋', '').trim(), `<label for="unName">${esc(t('usName'))}</label><input id="unName" type="text" maxlength="80">
    <label for="unUser">${esc(t('usUser'))}</label><input id="unUser" type="text" dir="ltr" autocapitalize="none" autocorrect="off" spellcheck="false" maxlength="40"><div class="hint" id="unUserHint"></div>
    <label for="unPass">${esc(t('usPass'))}</label><div class="mrow"><input id="unPass" type="text" dir="ltr" autocomplete="new-password" maxlength="72"><button type="button" class="btn-sm" id="unGen">${esc(t('usGen'))}</button></div>
    <label for="unRole">${esc(t('usRole'))}</label>${roleSel('unRole', 'mechanic')}`, async () => {
    const name = $('unName').value.trim(), username = normUser($('unUser').value), password = $('unPass').value, role = $('unRole').value;
    if (!name) throw new Error(t('errNameReq')); if (!userOk(username)) throw new Error(t('errUserBad')); if (password.length < 8) throw new Error(t('errPassWeak'));
    try { await repo.admin('create', { name, username, password, role }); } catch (e) { throw new Error(usErr(e)); }
    loadUsers(); setTimeout(() => credSheet(t('usCreated'), name, username, password), 0); return 'keep';
  }, t('userNew').replace('＋', '').trim());
  const hint = () => { const u = normUser($('unUser').value); $('unUserHint').textContent = u ? t('usUserHint', { u: toEmail(u) }) : ''; };
  $('unUser').oninput = hint; $('unGen').onclick = () => { $('unPass').value = genPass(); }; $('unPass').value = genPass(); Picker.attach($('unRole'), 'usRole');
}
function userEditSheet(u) {
  const me = u.id === userId;
  Edit.open(t('usEdit'), `<div class="muted ltr">${esc(u.username || '')}</div><label for="ueName">${esc(t('usName'))}</label><input id="ueName" type="text" maxlength="80" value="${esc(u.name || '')}">
    <label for="ueRole">${esc(t('usRole'))}</label>${roleSel('ueRole', u.role)}
    <label class="chk"><input type="checkbox" id="ueActive" ${u.active ? 'checked' : ''} ${me ? 'disabled' : ''}> ${esc(t('usActiveLbl'))}</label>`, async () => {
    const name = $('ueName').value.trim(), role = $('ueRole').value, active = $('ueActive').checked;
    if (!name) throw new Error(t('errNameReq'));
    try { await repo.admin('update', { id: u.id, name, role, active }); } catch (e) { throw new Error(usErr(e)); }
    Object.assign(u, { name, role, active }); renderUsers(); loadUsers();
    if (me) { profile.name = name; $('who').textContent = `${profile.name} · ${t(profile.role)}`; }
  });
  Picker.attach($('ueRole'), 'usRole');
}
function userPassSheet(u) {
  Edit.open(t('usNewPass') + ' — ' + (u.name || ''), `<label for="upPass">${esc(t('usPass'))}</label><div class="mrow"><input id="upPass" type="text" dir="ltr" autocomplete="new-password" maxlength="72"><button type="button" class="btn-sm" id="upGen">${esc(t('usGen'))}</button></div>`, async () => {
    const password = $('upPass').value; if (password.length < 8) throw new Error(t('errPassWeak'));
    try { await repo.admin('update', { id: u.id, password }); } catch (e) { throw new Error(usErr(e)); }
    setTimeout(() => credSheet(t('usPassSet'), u.name, u.username, password), 0); return 'keep';
  }, t('usSetPass'));
  $('upGen').onclick = () => { $('upPass').value = genPass(); }; $('upPass').value = genPass();
}
async function userDelete(u, btn) {
  if (US.del !== u.id) { US.del = u.id; toast(t('usDelQ', { n: u.name })); setTimeout(() => { if (US.del === u.id) US.del = null; }, 4000); return; }
  US.del = null; busy(btn, true);
  try { await repo.admin('delete', { id: u.id }); US.rows = US.rows.filter(x => x.id !== u.id); renderUsers(); toast(t('saved')); }
  catch (e) { toast(usErr(e)); } finally { busy(btn, false); }
}
$('btnUserNew').onclick = () => { if (canAdmin()) userNewSheet(); };
$('usSearch').oninput = e => { US.q = e.target.value; renderUserList(); };
$('usRoles').onclick = e => { const b = e.target.closest('.chip'); if (!b) return; US.role = b.dataset.v; renderUsers(); };
$('usList').onclick = e => { const a = e.target.closest('[data-act]'), row = e.target.closest('.frow'); if (!a || !row || !canAdmin()) return;
  const u = US.rows.find(x => x.id === row.dataset.id); if (!u) return; if (!canTouch(u)) { toast(t('errAdminOnly')); return; }
  if (a.dataset.act === 'edit') userEditSheet(u); else if (a.dataset.act === 'pass') userPassSheet(u); else if (a.dataset.act === 'del') userDelete(u, a); };

/* ---------------- 11) الحساب، الجلسة ---------------- */
function openSheet(open) { $('sheet').classList.toggle('hidden', !open); $('sheetBackdrop').classList.toggle('hidden', !open); }
function changePassword() {
  openSheet(false);
  Edit.open(t('changePass'), `<label for="pw1">${esc(t('passNew'))}</label><input id="pw1" type="password" autocomplete="new-password"><label for="pw2">${esc(t('passAgain'))}</label><input id="pw2" type="password" autocomplete="new-password">`,
    async () => { const a = $('pw1').value, b = $('pw2').value; if (a.length < 8 || a !== b) throw new Error(t('errPassMatch')); await repo.changePassword(a); });
}
$('btnPass').onclick = changePassword;
let IDLE_MIN = 30, lastAct = Date.now(), loadedAt = 0;
const idleReset = () => { lastAct = Date.now(); };
function idleCheck() { if (!profile || !(IDLE_MIN > 0)) return; if (Date.now() - lastAct > IDLE_MIN * 60000) { lastAct = Date.now(); repo.signOut().finally(() => { if (profile) leave(); }); toast(t('idleOut')); } }
['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach(ev => document.addEventListener(ev, idleReset, { passive: true, capture: true }));
document.addEventListener('visibilitychange', () => { if (document.visibilityState !== 'visible') return; idleCheck(); if (profile && loaded && Date.now() - loadedAt > 120e3) { loadedAt = Date.now(); refresh(); } });
setInterval(idleCheck, 30000);
function refreshSheetRows() {
  const on = !!profile && !!TABS[profile.role];
  $('rowLog').classList.toggle('hidden', !on);
  $('rowStores').classList.toggle('hidden', !canAdmin());
  $('rowPass').classList.toggle('hidden', !profile);
}
function openTab(id, keep) {
  if (!can(id)) id = 'stock';
  show(id);
  if (id === 'stock') renderStock(); else if (id === 'move') { if (!keep) renderMove(); else { storeOpts($('mvStore'), $('mvStore').value || (STORES.find(s => s.active) || {}).id); plateOpts(); if (!$('mvDate').value) $('mvDate').value = dubaiToday(); } }
  else if (id === 'moves') renderMoves(); else if (id === 'filters') renderFilters(); else if (id === 'users') loadUsers();
}
async function rerender() { const a = document.querySelector('.screen.active'); const id = a ? a.id.replace('scr-', '') : 'stock';
  if (id === 'stock') renderStock(); else if (id === 'move') renderMove(); else if (id === 'moves') await renderMoves(); else if (id === 'filters') renderFilters(); else if (id === 'users') renderUsers(); }
async function refresh() { try { await loadAll(); } catch { return; } HS.rows = []; await rerender(); }
async function enter(user) {
  userId = user.id; let boot;
  try { boot = await repo.bootstrap(); }
  catch (e) {
    $('noAccessMsg').textContent = errText(e); $('noAccessMsg').className = 'msg err'; $('btnMenu').classList.remove('hidden'); $('nav').classList.add('hidden'); show('noaccess'); return; }
  profile = boot?.profile; if (!profile) { msg('loginMsg', t('errProfile'), 'err'); show('login'); await repo.signOut(); return; }
  const SETTINGS = boot.settings || {};
  if (SETTINGS.idle_logout_min != null && Number(SETTINGS.idle_logout_min) >= 0) IDLE_MIN = Number(SETTINGS.idle_logout_min);
  $('who').textContent = `${profile.name} · ${t(profile.role)}`;
  const ini = (profile.name || '?').trim()[0].toUpperCase(); $('avatarInitial').textContent = ini; $('avatarInitial2').textContent = ini;
  $('sheetName').textContent = profile.name; $('sheetRole').textContent = t(profile.role); $('sheetVersion').textContent = t('versionLbl') + ' ' + APP_VERSION;
  $('btnMenu').classList.remove('hidden'); $('lang').classList.add('hidden'); idleReset();
  if (!TABS[profile.role] || profile.active === false) { refreshSheetRows(); $('nav').classList.add('hidden'); show('noaccess'); return; }
  document.querySelectorAll('nav button').forEach(b => b.classList.toggle('hidden', !can(b.dataset.s)));
  $('nav').classList.remove('hidden'); show('stock'); $('skList').innerHTML = skeleton(5);
  try { await loadAll(); loadedAt = Date.now(); }
  catch (e) { refreshSheetRows(); $('noAccessMsg').textContent = errText(e); $('noAccessMsg').className = 'msg err'; $('nav').classList.add('hidden'); show('noaccess'); return; }
  refreshSheetRows();
  const q = new URLSearchParams(location.search), tab = q.get('tab');
  openTab(tab && can(tab) ? tab : 'stock');
  if (tab) history.replaceState(null, '', location.pathname);
}
function leave() {
  bootSeq++; HS.seq++; profile = null; userId = null; loaded = false; STORES = []; STOCK = []; EQUIP = []; FITS = []; PLATES = [];
  Object.assign(SK, { store: 'all', cat: 'all', q: '', n: 80 }); Object.assign(MV, { kind: 'issue', lines: [] }); Object.assign(HS, { from: '', to: '', kind: 'all', store: 'all', q: '', rows: [] }); Object.assign(FT, { q: '', grp: 'all' }); Object.assign(US, { rows: [], q: '', role: 'all', del: null, seq: US.seq + 1 });
  ['skHero', 'skStores', 'skCats', 'skList', 'mvLines', 'mvFits', 'hsKinds', 'hsStores', 'hsList', 'ftGroups', 'ftList', 'usRoles', 'usList', 'editBody'].forEach(id => { const el = $(id); if (el) el.innerHTML = ''; });
  ['skSearch', 'hsSearch', 'ftSearch', 'usSearch', 'mvParty', 'mvRef', 'mvNote', 'mvDate'].forEach(id => { $(id).value = ''; }); msg('mvMsg', '', '');
  Edit.close(); openSheet(false); $('btnMenu').classList.add('hidden'); $('lang').classList.remove('hidden'); $('who').textContent = ''; $('nav').classList.add('hidden'); show('login');
}

/* ---------------- 12) الربط ---------------- */
$('btnLogin').onclick = async () => {
  const email = toEmail($('email').value), password = $('password').value; if (!$('email').value.trim() || !password) return;
  busy($('btnLogin'), true); msg('loginMsg', '', '');
  try { await repo.signIn(email, password); } catch (e) { msg('loginMsg', e.message, 'err'); } finally { busy($('btnLogin'), false); }
};
$('password').onkeydown = e => { if (e.key === 'Enter') $('btnLogin').click(); };
$('btnLogout').onclick = async () => { openSheet(false); await repo.signOut(); leave(); };
document.querySelectorAll('nav button').forEach(b => b.onclick = () => openTab(b.dataset.s));
$('btnMenu').onclick = () => openSheet(true);
$('sheetBackdrop').onclick = () => openSheet(false);
$('langChips').onclick = e => { const b = e.target.closest('button'); if (b) { $('lang').value = b.dataset.l; $('lang').dispatchEvent(new Event('change')); } };
// a language change redraws what is already drawn: the screen on show and the form's pickers
$('lang').onchange = e => { applyLang(e.target.value); if (profile) { $('sheetRole').textContent = t(profile.role); $('who').textContent = `${profile.name} · ${t(profile.role)}`; rerender(); } };
$('btnTheme').onclick = () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
$('stars').innerHTML = Array.from({ length: 26 }, (_, i) => `<i class="${i % 5 === 0 ? 'b' : ''}" style="left:${(i * 37 + 11) % 100}%;top:${(i * 53 + 7) % 100}%;animation-delay:${(i * 137) % 3000}ms;animation-duration:${2200 + (i * 211) % 2000}ms"></i>`).join('');
applyLang(lang); applyTheme(savedTheme); show('login');
if (!CONFIGURED) { msg('loginMsg', t('notConfigured'), 'err'); $('btnLogin').disabled = true; }
let entering = false;
if (repo) repo.onAuthChange(user => {
  if (!user) { if (profile) leave(); return; }
  if (profile || entering) return;          // already inside — ignore token refreshes
  entering = true; enter(user).finally(() => { entering = false; });
});
/* ---- update detection: the same version.json every page reads ---- */
let swReg = null, updatePending = false;
function showUpdate() { if (updatePending) return; updatePending = true; $('updateText').textContent = t('updateAvail'); $('btnUpdate').textContent = t('updateNow'); $('updateBar').classList.remove('hidden'); }
async function applyUpdate() {
  try { if (swReg) { await swReg.update(); if (swReg.waiting) swReg.waiting.postMessage('SKIP_WAITING'); } } catch {}
  location.replace(location.pathname + '?v=' + Date.now());
}
async function checkVersion() {
  if (!location.protocol.startsWith('http')) return;
  try { const r = await fetch('version.json?ts=' + Date.now(), { cache: 'no-store' }); if (!r.ok) return; const j = await r.json(); if (j.version && j.version !== APP_VERSION) showUpdate(); } catch {}
}
$('btnUpdate').onclick = applyUpdate;
checkVersion(); setInterval(checkVersion, 10 * 60 * 1000);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') checkVersion(); });
// the phone's BACK button closes an open sheet before it leaves the app (one history step per open sheet, as on every page)
(() => {
  const bds = [...document.querySelectorAll('.sheet-backdrop')];
  if (!bds.length || !window.history || !history.pushState) return;
  const open = () => bds.filter(b => !b.classList.contains('hidden'));
  let armed = false, tm = 0;
  const sync = () => { clearTimeout(tm); tm = setTimeout(() => {
    const any = open().length > 0;
    if (any && !armed) { try { history.pushState({ sheet: 1 }, ''); armed = true; } catch { /* no history here */ } }
    else if (!any && armed) { armed = false; if (history.state && history.state.sheet) history.back(); }
  }, 120); };
  const mo = new MutationObserver(sync);
  bds.forEach(b => mo.observe(b, { attributes: true, attributeFilter: ['class'] }));
  addEventListener('popstate', () => {
    if (!armed) return;
    armed = false;
    const top = open().reverse().sort((a, b) => (Number(getComputedStyle(b).zIndex) || 0) - (Number(getComputedStyle(a).zIndex) || 0))[0];
    if (top) top.click();
    sync();
  });
})();
// A SHEET OPEN ON A COMPUTER (9 Oct 2026, the owner on the registrations: «مش بقدر اسكرول لتحت في الابلكيشن علي الجهاز الكومبيوتر», then
// «طبّقه على كل الأنظمة» — the same block on every page). On a wide screen a sheet is a narrow panel in the middle, and a wheel turned
// anywhere beside it scrolled the hidden page behind — the sheet never moved. While a sheet is open the page stays still (html.sheet-open;
// the lock is a computer's only, a phone is as before), the wheel over the dimmed page scrolls the top sheet (a list sheet's .opts),
// PageDown / PageUp / the arrows / Home / End / space scroll it when the cursor is in no box, and Escape closes it as a tap on its backdrop.
(() => {
  const pairs = [...document.querySelectorAll('.sheet-backdrop')].map((b, i) => [b, b.nextElementSibling, i])
    .filter(([, sh]) => sh && sh.classList.contains('sheet'));
  if (!pairs.length) return;
  const z = el => Number(getComputedStyle(el).zIndex) || 0;
  const shown = ([b, sh]) => !b.classList.contains('hidden') && !sh.classList.contains('hidden');
  const top = () => pairs.filter(shown).sort((a, c) => z(c[1]) - z(a[1]) || c[2] - a[2])[0] || null;
  const scroller = sh => sh.classList.contains('list') ? sh.querySelector('.opts') : sh;
  const fine = !!(window.matchMedia && matchMedia('(pointer:fine)').matches);
  let was = null;
  const sync = () => {
    const tp = top(), sh = tp ? tp[1] : null;
    document.documentElement.classList.toggle('sheet-open', !!tp);
    // a mouse and a keyboard: the sheet takes the focus, so the keys scroll it (never on a phone — no keyboard pops up for it)
    if (sh && sh !== was && fine && !sh.contains(document.activeElement)) { if (!sh.hasAttribute('tabindex')) sh.setAttribute('tabindex', '-1'); try { sh.focus({ preventScroll: true }); } catch { /* old browser */ } }
    was = sh;
  };
  const mo = new MutationObserver(sync);
  pairs.forEach(([b, sh]) => { mo.observe(b, { attributes: true, attributeFilter: ['class'] }); mo.observe(sh, { attributes: true, attributeFilter: ['class'] }); });
  const px = e => e.deltaMode === 1 ? e.deltaY * 18 : e.deltaMode === 2 ? e.deltaY * innerHeight : e.deltaY;
  pairs.forEach(([b]) => b.addEventListener('wheel', e => { const tp = top(); if (!tp) return; const sc = scroller(tp[1]); if (sc) sc.scrollTop += px(e); e.preventDefault(); }, { passive: false }));
  document.addEventListener('keydown', e => {
    const tp = top(); if (!tp || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'Escape') { tp[0].click(); e.preventDefault(); return; }
    const a = document.activeElement;
    if (a && (/^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(a.tagName) || a.isContentEditable)) return;
    const sc = scroller(tp[1]); if (!sc || (a && a !== document.body && a !== tp[1] && !tp[1].contains(a) && a !== sc)) return;
    const h = sc.clientHeight || innerHeight, step = { PageDown: h * .85, PageUp: -h * .85, ArrowDown: 56, ArrowUp: -56, End: 1e7, Home: -1e7, ' ': e.shiftKey ? -h * .85 : h * .85 }[e.key];
    if (step == null) return; sc.scrollTop += step; e.preventDefault();
  });
  sync();
})();
// THE ON-SCREEN KEYBOARD (22 Oct 2026, the owner on the new-person sheet: «السكرول لايعم هنا»): a phone's keyboard covers the bottom of the
// page without resizing it, so a sheet's lower part — the box being typed in, «save» — sat under the keyboard where no scroll could reach
// it. While the keyboard is up (the visual viewport shorter than the page), --kb is its height: every sheet stands on it and scrolls within
// what is left, and the box that takes the cursor is brought into view. A pinch-zoom is not a keyboard.
(() => {
  const vv = window.visualViewport; if (!vv) return;
  const root = document.documentElement;
  const fit = () => { const kb = vv.scale > 1.01 ? 0 : Math.round(innerHeight - vv.height - vv.offsetTop);
    if (kb > 80) root.style.setProperty('--kb', kb + 'px'); else root.style.removeProperty('--kb'); };
  vv.addEventListener('resize', fit); vv.addEventListener('scroll', fit); fit();
  document.addEventListener('focusin', e => { const el = e.target; if (!el.matches || !el.matches('.sheet input, .sheet textarea, .sheet select')) return;
    setTimeout(() => { try { el.scrollIntoView({ block: 'nearest' }); } catch { /* old browser */ } }, 320); });
})();
// a label points at the field right after it, so a screen reader names it and a tap puts the cursor in it (static markup only)
document.querySelectorAll('label:not([for])').forEach(l => {
  if (l.querySelector('input,select,textarea')) return;
  const n = l.nextElementSibling, F = 'input:not([type=checkbox]):not([type=radio]):not([type=hidden]):not([type=file]),select,textarea';
  const f = n && (n.matches(F) ? n : n.querySelector(F));
  if (f && f.id) l.htmlFor = f.id;
});
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('sw.js').then(r => { swReg = r;
    r.addEventListener('updatefound', () => { const nw = r.installing; nw && nw.addEventListener('statechange', () => { if (nw.state === 'installed' && navigator.serviceWorker.controller) showUpdate(); }); });
  }).catch(() => {});
  let reloaded = false; navigator.serviceWorker.addEventListener('controllerchange', () => { if (updatePending && !reloaded) { reloaded = true; location.reload(); } });
}
