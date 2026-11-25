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
    usCred: "بيانات الدخول", usCopy: "نسخ", usCopied: "تم النسخ ✓", usRoleHelp: "السوبر أدمن: كل شيء والمستخدمون · المدير: كل الصلاحيات ما عدا حسابات السوبر أدمن · الأدمن: كل الصلاحيات ما عدا حسابات المدير والسوبر أدمن · أمين المخزن: الأصناف والحركات · الميكانيكي والمشاهد: اطلاع فقط",
    errUserTaken: "اسم المستخدم هذا مستخدم لحساب آخر", errUserBad: "اسم المستخدم: حروف إنجليزية صغيرة وأرقام و . _ - من 2 إلى 32", errPassWeak: "كلمة المرور 8 أحرف على الأقل",
    errLastAdmin: "لا يمكن — يجب أن يبقى سوبر أدمن واحد فعّال على الأقل", errAdminOnly: "حسابات السوبر أدمن يتحكم فيها السوبر أدمن فقط", errManagerOnly: "حسابات المدير يتحكم فيها المدير والسوبر أدمن فقط", errSelf: "لا يمكنك حذف حسابك أو إيقافه أو إنزال دورك", errFnMissing: "دالة admin-users غير منشورة على Supabase — انشرها أولًا",
    notConfigured: "التطبيق غير مربوط بقاعدة بيانات بعد — املأ public/config.js (رابط Supabase والمفتاح العام).",
    appTitle: "مخزن الورشة",
    language: "اللغة", darkMode: "الوضع الداكن", changePass: "تغيير كلمة المرور", logRow: "🕘 سجل تعديلات الأصناف", storesRow: "🏬 المخازن",  logout: "خروج", saveChanges: "حفظ", saved: "تم الحفظ ✓",
    username: "اسم المستخدم", phUser: "اكتب اسم المستخدم", loginUserHint: "اسم المستخدم بالإنجليزية كما أعطاك الأدمن — ليس اسمك بالعربي",
    password: "كلمة المرور", phPass: "اكتب كلمة السر", login: "دخول", loginHint: "سجّل الدخول للمتابعة",
    noAccessTitle: "لا يمكن لهذا الحساب الدخول", noAccessHint: "هذا الحساب موقوف أو بلا صلاحية — اطلب من الأدمن تفعيله.",
    admin: "سوبر أدمن", manager: "مدير", deputy: "أدمن", storekeeper: "أمين المخزن", mechanic: "ميكانيكي", viewer: "مشاهد (اطلاع فقط)",
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
    navProjects: "المشاريع", pjDesc: "كل مشروع (موقع) له مخزن خاص به: اصرف له مواد من المخزن الرئيسي، انقل منه لمشروع آخر، أو أرجع المواد للمخزن الرئيسي.",
    pjNew: "＋ مشروع جديد", pjNewT: "مشروع جديد", pjEditT: "تعديل المشروع", pjSearch: "ابحث باسم المشروع أو الكود أو الموقع", pjOpen: "جارية", pjClosed: "مغلقة", pjNone: "لا توجد مشاريع بعد",
    pjName: "اسم المشروع", pjCode: "كود المشروع", pjLocation: "الموقع", pjStarted: "تاريخ البدء", pjNote: "ملاحظة", pjSaved: "تم حفظ المشروع ✓",
    pjItemsN: "{n} صنف · {u} وحدة", pjEmpty: "لا مواد في المشروع", pjLast: "آخر حركة {d}", pjNoMoves: "لا حركات بعد", pjClosedOn: "أُغلق {d}", pjClosedB: "مغلق",
    pjSend: "⬇ صرف مواد للمشروع", pjMove: "⇄ نقل لمشروع آخر", pjBack: "↩ إرجاع للمخزن الرئيسي", pjBackAll: "↩ إرجاع كل المواد", pjIssue: "⬆ صرف من مخزن الموقع",
    pjEdit: "✎ تعديل", pjClose: "⏸ إغلاق المشروع", pjReopen: "▶ إعادة فتح", pjClosedT: "تم إغلاق المشروع ✓", pjReopenedT: "أُعيد فتح المشروع ✓",
    pjCloseHint: "لا يُغلق المشروع وفيه مواد — أرجعها للمخزن الرئيسي أو انقلها لمشروع آخر أولًا.", pjStockT: "مخزن المشروع", pjMovesT: "حركات المشروع", pjPdf: "🖨️ جرد مخزن المشروع",
    pjNoOther: "لا يوجد مشروع آخر مفتوح", pjNoStock: "لا مواد في المشروع لإرجاعها", pjMain: "الرئيسي", pjKind: "مشروع", pjMakeProject: "🏗", pjMadeProject: "صار مشروعًا ✓",
    r_dispatch: "صرف لمشروع", r_between: "نقل بين مشاريع", r_back: "إرجاع للرئيسي",
    rd_dispatch: "📦 صرف مواد من {a} إلى المشروع {b}", rd_between: "⇄ نقل مواد من المشروع {a} إلى المشروع {b}", rd_back: "↩ إرجاع مواد من المشروع {a} إلى {b}",
    errMainStore: "المخزن الرئيسي واحد فقط، لا يُوقف ولا يتغير نوعه", errStoreCodeDup: "هذا الكود مستخدم لمخزن أو مشروع آخر", errCodeLong: "الكود 20 حرفًا على الأكثر",
    errLocationLong: "الموقع 120 حرفًا على الأكثر", errProjectHasStock: "في المشروع مواد — أرجعها للمخزن الرئيسي أو انقلها لمشروع آخر قبل الإغلاق", errProjectClosed: "المشروع مغلق ولا يستقبل مواد — أعد فتحه أولًا",
    lf_kind: "النوع", lf_code: "الكود", lf_location: "الموقع", lf_started_on: "البدء", lf_closed_on: "الإغلاق", lf_sort: "الترتيب",
    logTitle: "سجل تعديلات الأصناف والمخازن", logEmpty: "لا شيء في السجل بعد", lgAdd: "إضافة", lgEdit: "تعديل", lgDelete: "حذف", lg_item: "صنف", lg_store: "مخزن", lg_equipment: "معدة",
    lf_name: "الاسم", lf_category: "الفئة", lf_filter_type: "نوع الفلتر", lf_part_no: "رقم القطعة", lf_unit: "الوحدة", lf_min_qty: "الحد الأدنى", lf_shelf: "الرف", lf_active: "نشط", lf_note: "ملاحظة", lf_sort: "الترتيب",
    thCode: "الكود", thItem: "الصنف", thPart: "رقم القطعة", thQty: "الكمية", thUnit: "الوحدة", thShelf: "الرف", thMin: "الحد", thNo: "رقم", thKind: "النوع", thDate: "التاريخ", thTo: "إلى / من", thBy: "بواسطة",
    ppStock: "جرد المخزون", ppMoves: "تقرير حركات المخزن", ppMove: "سند {k}", sigStore: "أمين المخزن", sigRecv: "المستلم", sigApprove: "اعتماد المدير", printed: "طُبع",
    ppItems: "أصناف", ppUnits: "فيها رصيد", ppLow: "تحت الحد", ppPeriod: "{a} — {b}", close: "إغلاق", loading: "جارٍ التحميل…", readOnly: "اطلاع فقط",
    navJobs: "الصيانة", jbCardsP: "🔧 كروت الصيانة", jbEquipP: "🏗 معدات المواقع",
    jbDesc: "كارت عمل لكل دخول معدة أو مركبة للورشة: الزيوت والفلاتر والأعطال وقطع الغيار — يُحفظ في النظام ويُطبع أو يُحفظ PDF في أي وقت.",
    jbNew: "＋ كارت صيانة جديد", jbSearch: "ابحث برقم الكارت أو اللوحة أو المعدة أو السائق", jbOpen: "مفتوحة", jbDone: "مكتملة", jbAll: "الكل", jbNone: "لا كروت صيانة بعد",
    jbNewT: "كارت صيانة جديد", jbEditT: "تعديل {no}", jbSaved: "تم حفظ الكارت {no} ✓", jbStOpen: "مفتوح", jbStDone: "مكتمل",
    jsVehicle: "بيانات المركبة / المعدة", jsTimes: "الدخول والخروج", jsCond: "الحالة عند الاستلام", jsChecks: "فحص السلامة", jsOils: "الزيوت والسوائل", jsFilters: "الفلاتر",
    jsWork: "نوع الصيانة المطلوب", jsDiag: "الملاحظات والتشخيص الفني", jsParts: "قطع الغيار والمواد المطلوبة", jsSign: "التوقيعات", jsNotes: "الملاحظات والتوصيات النهائية",
    jfSite: "الموقع / المشروع", jfNoSite: "— الورشة (بدون موقع) —", jfPlate: "رقم اللوحة / رمز المعدة", jfMake: "الماركة والموديل", jfType: "نوع المركبة / المعدة", jfDriver: "اسم السائق / المشغل",
    jfInOn: "تاريخ الدخول", jfOutOn: "تاريخ الخروج", jfTime: "الوقت", jfReading: "قراءة العداد", ru_km: "كم", ru_hr: "ساعة", jfFuel: "مستوى الوقود", jfLinked: "مرتبط بمعدة الموقع: {n}",
    ck_tyres: "الإطارات", ck_brakes: "الفرامل", ck_lights: "الأنوار", ck_horn: "البوق (الهرن)", ck_mirrors: "المرايات", ck_seatbelt: "حزام الأمان", ck_extinguisher: "طفاية الحريق", ck_leaks: "خلوّ من التسريبات",
    ckHint: "اضغط مرة: سليم ✓ · مرتين: يحتاج إصلاح ✗ · ثلاثًا: لم يُفحص", ckOk: "سليم", ckBad: "يحتاج إصلاح", ckNa: "لم يُفحص",
    o_hydraulic: "زيت هيدروليك", o_diesel_engine: "زيت محرك ديزل", o_petrol_engine: "زيت محرك بنزين", o_gear: "زيت جير / ناقل الحركة", o_coolant: "سائل تبريد المحرك", jfLitres: "لتر", jfNote: "ملاحظة",
    fl_hydraulic: "فلتر هيدروليك", fl_oil: "فلتر زيت المحرك", fl_fuel: "فلتر ديزل / وقود", fl_air: "فلتر الهواء", fl_cabin: "فلتر المكيف", jfPartNo: "رقم القطعة", jfAction: "الإجراء",
    ac_change: "تغيير", ac_clean: "تنظيف", thOil: "الزيت / السائل", thFilter: "الفلتر",
    w_mechanical: "ميكانيك", w_electrical: "كهرباء", w_hydraulic: "نظام هيدروليك وضغط", w_routine: "صيانة دورية", w_field: "إصلاح أعطال ميدانية",
    jfMech: "الفني المسؤول", jfFleet: "مسؤول الحركة / الأسطول", jfSup: "اعتماد مهندس الورشة",
    jbPrint: "🖨️ طباعة / حفظ PDF", jbEdit: "✎ تعديل", jbMarkDone: "✓ إغلاق الكارت (مكتمل)", jbReopen: "↺ إعادة فتح", jbIssue: "⬆ صرف الفلاتر من المخزن", jbDelete: "🗑 حذف الكارت",
    jbDelQ: "اضغط مرة أخرى لحذف {no} نهائيًا", jbDoneT: "أُغلق الكارت ✓", jbReopenT: "أُعيد فتح الكارت ✓", jbBy: "فتحه {n} · {d}", jbNoFilters: "لا فلتر في الكارت يطابق صنفًا في المخزن",
    ppJob: "كارت عمل صيانة", ppJobSub: "صيانة الأسطول · الزيوت والفلاتر", ppJobNo: "رقم الكارت", policyT: "تعليمات الصيانة الداخلية",
    pol1: "يبلغ السائق / المشغل قسم الصيانة فور ظهور أي عطل أو تسريب.", pol2: "تُستلم المعدة وتُسلَّم من وإلى الورشة بتوقيع السائق ومسؤول الحركة.",
    pol3: "لا صيانة ولا تعديل خارج ورش الشركة إلا بإذن خطي من مهندس الصيانة والأسطول.", sigDate: "التاريخ", sigSign: "التوقيع",
    seDesc: "المعدات والعُدد الموجودة في كل موقع (من شيت SITE EQUIPMENT) — للمتابعة، ولفتح كارت صيانة لأي معدة منها.", seSearch: "ابحث باسم المعدة أو الرقم أو المستلم",
    seAll: "كل المواقع", seNone: "لا معدات مسجلة", seAdd: "＋ إضافة معدة لموقع", sePdf: "🖨️ كشف معدات الموقع PDF", printLangT: "🖨️ لغة الورقة", ppKick: "مخزن الميكانيكا", jcKick: "أوريون · الورشة", jcDone: "تم ✓", addItemS: "＋ صنف", pjNewS: "＋ مشروع", jbNewS: "＋ كارت", seAddS: "＋ معدة", userNewS: "＋ مستخدم", seNewT: "معدة جديدة في موقع", seEditT: "تعديل المعدة",
    seName: "اسم المعدة", seRef: "الرقم / اللوحة / القدرة", seQty: "العدد", seSentOn: "تاريخ الإرسال", seTag: "الحالة", seSection: "القسم", seRemarks: "ملاحظات", seRecv: "المستلم",
    tg_new: "جديد", tg_extra: "إضافي", tg_returned: "مُرجَع", tg_rent: "إيجار", tg_balance: "رصيد متبقٍ", sec_civil: "مدني", sec_mep: "MEP",
    seLines: "{n} سطر · {u} قطعة", seSaved: "تم حفظ المعدة ✓", seJob: "🔧 كارت صيانة لهذه المعدة", seDel: "🗑 حذف السطر", seDelQ: "اضغط مرة أخرى للحذف", sePickSite: "اختر الموقع أولًا",
    ppSiteEq: "كشف معدات الموقع", pjEquip: "🏗 معدات الموقع", thSite: "الموقع", thRef: "الرقم", thRecv: "المستلم", thRemarks: "ملاحظات",
    errJobWhat: "اكتب رقم اللوحة أو الماركة والموديل", errJobInvalid: "بيانات الكارت غير صحيحة — راجع الزيوت والفلاتر", errOutBeforeIn: "تاريخ الخروج قبل تاريخ الدخول",
    errReading: "قراءة العداد غير صحيحة", errRefLong: "الرقم طويل جدًا", errPlateLong: "رقم اللوحة طويل جدًا", lg_site_equipment: "معدة موقع", lg_job_card: "كارت صيانة",
    jbRemP: "🔔 التذكيرات", jbTypesP: "⚙️ الأنواع", remDesc: "مواعيد التغيير القادمة: كل نوع صيانة في كارت له تذكير بعد عدد أيامه. يتجدد تلقائيًا عند تسجيل نفس النوع لنفس المعدة.",
    remDue: "حان موعدها", remSoon: "القادمة", remClosed: "المغلقة", remNone: "لا توجد تذكيرات هنا", remLate: "متأخر {n} يوم", remToday: "اليوم", remIn: "بعد {n} يوم",
    remDoneOn: "تمت في {d}", remDueOn: "موعد التغيير {d}", remMarkDone: "✓ تم التغيير", remDismiss: "تجاهل التذكير", remReopen: "↺ إعادة فتح التذكير", remOpenJob: "🔧 فتح الكارت {no}",
    remNewJob: "＋ كارت صيانة جديد لنفس المعدة", st_open: "مفتوح", st_done: "تم التغيير", st_dismissed: "تم تجاهله", st_renewed: "تجدد بالكارت {no}", remClosedBy: "{s} — {n} {d}", remSaved: "تم ✓",
    remBell: "التذكيرات", remJob: "الكارت", remType: "النوع", remWhat: "المعدة",
    pushOn: "📱 تفعيل الإشعارات على هذا الجهاز", pushIsOn: "🔔 الإشعارات مفعّلة على هذا الجهاز", pushOff: "إيقاف", pushTest: "إرسال تجربة",
    pushNo: "هذا المتصفح لا يدعم الإشعارات. على الآيفون: أضف التطبيق إلى الشاشة الرئيسية أولًا ثم افتحه منها.", pushDenied: "الإشعارات ممنوعة لهذا الموقع — اسمح بها من إعدادات المتصفح ثم حاول مرة أخرى.",
    pushDone: "تم تفعيل الإشعارات على هذا الجهاز ✓", pushOffT: "تم إيقاف الإشعارات على هذا الجهاز", pushTestSent: "أُرسلت التجربة إلى {n} جهاز", pushFnMissing: "دالة maint-push غير منشورة على Supabase — انشرها أولًا",
    pushHint: "يصلك إشعار كل يوم الساعة 9 صباحًا بالصيانة التي حان موعدها (للسوبر أدمن والمدير والأدمن).",
    tyDesc: "أنواع الصيانة (نوع الزيت، الفلتر، الخدمة) وعدد الأيام حتى التغيير القادم — تُختار في كارت الصيانة.", tyNew: "＋ نوع", tyNewT: "نوع صيانة جديد", tyEditT: "تعديل النوع",
    tyName: "اسم النوع", tyNamePh: "مثال: زيت محرك Quartz 20W-50", tyKind: "الفئة", tk_oil: "🛢 زيت", tk_filter: "🔘 فلتر", tk_service: "🔧 خدمة", tyPart: "الجزء", tyPartAny: "— عام —",
    tyItem: "صنف المخزن المرتبط", tyItemNone: "— بدون —", tyDays: "التذكير بعد (يوم)", tyEvery: "كل {n} يوم", tyNone: "لا توجد أنواع بعد", tyStopped: "موقوف", tyActiveL: "مفعّل (يظهر في الكروت)",
    tySaved: "تم حفظ النوع ✓", tyDel: "🗑 حذف النوع", tyDelQ: "اضغط مرة أخرى للحذف", tyNote: "ملاحظة",
    jsMaint: "نوع الصيانة والتذكير", jfMaintHint: "اختر ما تم في هذا الكارت — يصل تذكير للإدارة عند موعد التغيير.", jfNextDue: "{n}: التغيير القادم {d}", jfNoTypes: "لا توجد أنواع صيانة بعد — يضيفها الأدمن من «الأنواع».",
    ppNext: "مواعيد التغيير القادمة",
    errTypeInvalid: "نوع الصيانة غير صحيح أو موقوف", errTypeDup: "يوجد نوع بنفس الاسم", errDays: "عدد الأيام من 1 إلى 3650", errTypeInUse: "هذا النوع مستخدم في كروت — أوقفه بدلًا من حذفه", errPush: "تعذّر تفعيل الإشعارات",
  },
  en: {
    dir: "ltr", locale: "en-GB",
    navUsers: "Users", usersDesc: "The accounts: the admin adds users, sets each one's role, stops an account or changes its password.", userNew: "＋ New user", usSearchPh: "Search by name or username",
    usAll: "All", usStopped: "Stopped", usActive: "Active", usNever: "Never signed in", usLast: "Last sign-in", usYou: "you", usNone: "No users",
    usName: "Name", usUser: "Username (English)", usUserHint: "Lower-case letters, digits and . _ - — signs in as: {u}", usPass: "Password (8 characters at least)", usGen: "🎲 Generate",
    usRole: "Role", usActiveLbl: "Account active", usEdit: "Edit user", usNewPass: "New password", usSetPass: "Save password", usDel: "Delete user",
    usDelQ: "Tap again to delete {n} for good", usCreated: "Account created — give them these details (shown once)", usPassSet: "Password changed — give them these details",
    usCred: "Sign-in details", usCopy: "Copy", usCopied: "Copied ✓", usRoleHelp: "Super admin: everything and the users · Manager: everything but the super admin accounts · Admin: everything but the manager and super admin accounts · Storekeeper: items and movements · Mechanic and viewer: read only",
    errUserTaken: "That username belongs to another account", errUserBad: "Username: lower-case letters, digits and . _ -, 2 to 32", errPassWeak: "The password needs 8 characters at least",
    errLastAdmin: "Not possible — at least one active super admin must remain", errAdminOnly: "Only a super admin manages super admin accounts", errManagerOnly: "Only a manager or a super admin manages manager accounts", errSelf: "You cannot delete, stop or demote your own account", errFnMissing: "The admin-users function is not deployed on Supabase — deploy it first",
    notConfigured: "The app is not connected to a database yet — fill in public/config.js (the Supabase URL and the public key).",
    appTitle: "Mechanic Store",
    language: "Language", darkMode: "Dark mode", changePass: "Change password", logRow: "🕘 Items change log", storesRow: "🏬 Stores",  logout: "Sign out", saveChanges: "Save", saved: "Saved ✓",
    username: "Username", phUser: "Type your username", loginUserHint: "The English username the admin gave you — not your Arabic name",
    password: "Password", phPass: "Type your password", login: "Sign in", loginHint: "Sign in to continue",
    noAccessTitle: "This account cannot sign in here", noAccessHint: "This account is stopped or has no role — ask the admin to turn it on.",
    admin: "Super admin", manager: "Manager", deputy: "Admin", storekeeper: "Storekeeper", mechanic: "Mechanic", viewer: "Viewer (read only)",
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
    navProjects: "Projects", pjDesc: "Every project (site) has its own store: send it materials from the main store, move them to another project, or return them to the main store.",
    pjNew: "＋ New project", pjNewT: "New project", pjEditT: "Edit project", pjSearch: "Search by project name, code or location", pjOpen: "Open", pjClosed: "Closed", pjNone: "No projects yet",
    pjName: "Project name", pjCode: "Project code", pjLocation: "Location", pjStarted: "Start date", pjNote: "Note", pjSaved: "Project saved ✓",
    pjItemsN: "{n} items · {u} units", pjEmpty: "No materials on the project", pjLast: "Last move {d}", pjNoMoves: "No movements yet", pjClosedOn: "Closed {d}", pjClosedB: "Closed",
    pjSend: "⬇ Send materials", pjMove: "⇄ Move to another project", pjBack: "↩ Return to main store", pjBackAll: "↩ Return everything", pjIssue: "⬆ Issue from the site store",
    pjEdit: "✎ Edit", pjClose: "⏸ Close project", pjReopen: "▶ Reopen", pjClosedT: "Project closed ✓", pjReopenedT: "Project reopened ✓",
    pjCloseHint: "A project holding materials cannot close — return them to the main store or move them to another project first.", pjStockT: "Project store", pjMovesT: "Project movements", pjPdf: "🖨️ Project stock PDF",
    pjNoOther: "No other open project", pjNoStock: "Nothing on the project to return", pjMain: "Main", pjKind: "Project", pjMakeProject: "🏗", pjMadeProject: "Now a project ✓",
    r_dispatch: "To project", r_between: "Project to project", r_back: "Back to main",
    rd_dispatch: "📦 Materials from {a} to the project {b}", rd_between: "⇄ Materials from the project {a} to the project {b}", rd_back: "↩ Materials back from the project {a} to {b}",
    errMainStore: "There is one main store: it is never stopped and never changes kind", errStoreCodeDup: "This code belongs to another store or project", errCodeLong: "The code is 20 characters at most",
    errLocationLong: "The location is 120 characters at most", errProjectHasStock: "The project still holds materials — return them to the main store or move them to another project before closing", errProjectClosed: "The project is closed and takes nothing in — reopen it first",
    lf_kind: "Kind", lf_code: "Code", lf_location: "Location", lf_started_on: "Start", lf_closed_on: "Closed", lf_sort: "Order",
    logTitle: "Items and stores change log", logEmpty: "Nothing in the log yet", lgAdd: "Added", lgEdit: "Changed", lgDelete: "Deleted", lg_item: "Item", lg_store: "Store", lg_equipment: "Equipment",
    lf_name: "Name", lf_category: "Category", lf_filter_type: "Filter type", lf_part_no: "Part no.", lf_unit: "Unit", lf_min_qty: "Minimum", lf_shelf: "Shelf", lf_active: "Active", lf_note: "Note", lf_sort: "Order",
    thCode: "Code", thItem: "Item", thPart: "Part no.", thQty: "Qty", thUnit: "Unit", thShelf: "Shelf", thMin: "Min", thNo: "No.", thKind: "Type", thDate: "Date", thTo: "To / from", thBy: "By",
    ppStock: "Stock count sheet", ppMoves: "Store movements report", ppMove: "{k} voucher", sigStore: "Storekeeper", sigRecv: "Received by", sigApprove: "Manager's approval", printed: "Printed",
    ppItems: "Items", ppUnits: "In stock", ppLow: "Below minimum", ppPeriod: "{a} — {b}", close: "Close", loading: "Loading…", readOnly: "View only",
    navJobs: "Maintenance", jbCardsP: "🔧 Job cards", jbEquipP: "🏗 Site equipment",
    jbDesc: "A job card for every vehicle or machine that comes into the workshop: the oils and filters, the faults, the parts — stored, and printed or saved as PDF at any time.",
    jbNew: "＋ New job card", jbSearch: "Search by card no., plate, machine or driver", jbOpen: "Open", jbDone: "Done", jbAll: "All", jbNone: "No job cards yet",
    jbNewT: "New job card", jbEditT: "Edit {no}", jbSaved: "Job card {no} saved ✓", jbStOpen: "Open", jbStDone: "Done",
    jsVehicle: "Vehicle & equipment", jsTimes: "In & out", jsCond: "Condition on arrival", jsChecks: "Safety checks", jsOils: "Oils & fluids", jsFilters: "Filters",
    jsWork: "Work required", jsDiag: "Remarks & diagnosis", jsParts: "Spare parts required", jsSign: "Sign-off", jsNotes: "Final notes & recommendations",
    jfSite: "Site / project", jfNoSite: "— Workshop (no site) —", jfPlate: "Plate / equipment ID", jfMake: "Make & model", jfType: "Vehicle / equipment type", jfDriver: "Driver / operator",
    jfInOn: "Date in", jfOutOn: "Date out", jfTime: "Time", jfReading: "Km / hours reading", ru_km: "km", ru_hr: "hours", jfFuel: "Fuel level", jfLinked: "Linked to site equipment: {n}",
    ck_tyres: "Tyres", ck_brakes: "Brakes", ck_lights: "Lights", ck_horn: "Horn", ck_mirrors: "Mirrors", ck_seatbelt: "Seat belt", ck_extinguisher: "Fire extinguisher", ck_leaks: "No leaks",
    ckHint: "Tap once: OK ✓ · twice: needs fixing ✗ · three times: not checked", ckOk: "OK", ckBad: "Needs fixing", ckNa: "Not checked",
    o_hydraulic: "Hydraulic oil", o_diesel_engine: "Diesel engine oil", o_petrol_engine: "Petrol engine oil", o_gear: "Gear / transmission oil", o_coolant: "Coolant / water", jfLitres: "L", jfNote: "Note",
    fl_hydraulic: "Hydraulic filter", fl_oil: "Engine oil filter", fl_fuel: "Diesel / fuel filter", fl_air: "Air filter", fl_cabin: "Cabin / A/C filter", jfPartNo: "Part no.", jfAction: "Action",
    ac_change: "Change", ac_clean: "Clean", thOil: "Oil / fluid", thFilter: "Filter",
    w_mechanical: "Mechanical repair", w_electrical: "Electrical repair", w_hydraulic: "Hydraulic system", w_routine: "Routine service", w_field: "Field maintenance",
    jfMech: "Responsible technician", jfFleet: "Fleet officer", jfSup: "Workshop supervisor",
    jbPrint: "🖨️ Print / save PDF", jbEdit: "✎ Edit", jbMarkDone: "✓ Close the card (done)", jbReopen: "↺ Reopen", jbIssue: "⬆ Issue the filters from stock", jbDelete: "🗑 Delete the card",
    jbDelQ: "Tap again to delete {no} for good", jbDoneT: "Card closed ✓", jbReopenT: "Card reopened ✓", jbBy: "Opened by {n} · {d}", jbNoFilters: "No filter on the card matches a stock item",
    ppJob: "Job card", ppJobSub: "Fleet maintenance · oils & filters", ppJobNo: "Card no.", policyT: "Internal maintenance policy",
    pol1: "The driver / operator reports any fault or leak to the maintenance section at once.", pol2: "A machine enters and leaves the workshop against the signatures of the driver and the fleet officer.",
    pol3: "No repair or change outside the company's workshops without the fleet engineer's written approval.", sigDate: "Date", sigSign: "Signature",
    seDesc: "The machines and tools at each site (from the SITE EQUIPMENT sheet) — to follow them up, and to open a job card for any of them.", seSearch: "Search by machine, number or receiver",
    seAll: "All sites", seNone: "No equipment recorded", seAdd: "＋ Add equipment to a site", sePdf: "🖨️ Site equipment sheet PDF", printLangT: "🖨️ Paper language", ppKick: "MECHANIC STORE", jcKick: "ORION · WORKSHOP", jcDone: "DONE ✓", addItemS: "＋ Item", pjNewS: "＋ Project", jbNewS: "＋ Card", seAddS: "＋ Equipment", userNewS: "＋ User", seNewT: "New site equipment", seEditT: "Edit the equipment",
    seName: "Equipment", seRef: "No. / plate / rating", seQty: "Qty", seSentOn: "Date sent", seTag: "Status", seSection: "Section", seRemarks: "Remarks", seRecv: "Received by",
    tg_new: "New", tg_extra: "Extra", tg_returned: "Returned", tg_rent: "Rent", tg_balance: "Balance", sec_civil: "Civil", sec_mep: "MEP",
    seLines: "{n} lines · {u} pcs", seSaved: "Equipment saved ✓", seJob: "🔧 Job card for this machine", seDel: "🗑 Delete the line", seDelQ: "Tap again to delete", sePickSite: "Pick the site first",
    ppSiteEq: "Site equipment sheet", pjEquip: "🏗 Site equipment", thSite: "Site", thRef: "No.", thRecv: "Received by", thRemarks: "Remarks",
    errJobWhat: "Type the plate or the make & model", errJobInvalid: "Invalid card data — check the oils and filters", errOutBeforeIn: "The date out is before the date in",
    errReading: "Invalid reading", errRefLong: "The number is too long", errPlateLong: "The plate is too long", lg_site_equipment: "Site equipment", lg_job_card: "Job card",
    jbRemP: "🔔 Reminders", jbTypesP: "⚙️ Types", remDesc: "The coming changes: each maintenance type on a card reminds after its days. Renewed by itself when the same type is recorded for the same vehicle.",
    remDue: "Due", remSoon: "Coming", remClosed: "Closed", remNone: "No reminders here", remLate: "{n} days late", remToday: "Today", remIn: "In {n} days",
    remDoneOn: "Done on {d}", remDueOn: "Change due {d}", remMarkDone: "✓ Changed", remDismiss: "Dismiss the reminder", remReopen: "↺ Reopen the reminder", remOpenJob: "🔧 Open card {no}",
    remNewJob: "＋ New job card for the same vehicle", st_open: "Open", st_done: "Changed", st_dismissed: "Dismissed", st_renewed: "Renewed by card {no}", remClosedBy: "{s} — {n} {d}", remSaved: "Done ✓",
    remBell: "Reminders", remJob: "Card", remType: "Type", remWhat: "Vehicle",
    pushOn: "📱 Turn on notifications on this device", pushIsOn: "🔔 Notifications are on for this device", pushOff: "Turn off", pushTest: "Send a test",
    pushNo: "This browser has no notifications. On an iPhone: add the app to the Home Screen first, then open it from there.", pushDenied: "Notifications are blocked for this site — allow them in the browser settings, then try again.",
    pushDone: "Notifications are on for this device ✓", pushOffT: "Notifications are off for this device", pushTestSent: "Test sent to {n} device(s)", pushFnMissing: "The maint-push function is not deployed on Supabase — deploy it first",
    pushHint: "A notification every day at 9 AM with the maintenance that is due (super admins, managers and admins).",
    tyDesc: "The maintenance types (an oil, a filter, a service) and the days until the next change — picked on the job card.", tyNew: "＋ Type", tyNewT: "New maintenance type", tyEditT: "Edit the type",
    tyName: "Type name", tyNamePh: "e.g. Engine oil Quartz 20W-50", tyKind: "Kind", tk_oil: "🛢 Oil", tk_filter: "🔘 Filter", tk_service: "🔧 Service", tyPart: "Part", tyPartAny: "— general —",
    tyItem: "Linked store item", tyItemNone: "— none —", tyDays: "Remind after (days)", tyEvery: "Every {n} days", tyNone: "No types yet", tyStopped: "Stopped", tyActiveL: "Active (offered on the cards)",
    tySaved: "Type saved ✓", tyDel: "🗑 Delete the type", tyDelQ: "Tap again to delete", tyNote: "Note",
    jsMaint: "Maintenance type & reminder", jfMaintHint: "Pick what was done on this card — the management is reminded when the change is due.", jfNextDue: "{n}: next change {d}", jfNoTypes: "No maintenance types yet — an admin adds them under «Types».",
    ppNext: "Next changes due",
    errTypeInvalid: "Unknown or stopped maintenance type", errTypeDup: "A type with this name exists", errDays: "Days from 1 to 3650", errTypeInUse: "Cards use this type — stop it instead of deleting it", errPush: "Could not turn on notifications",
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
const APP_VERSION = '2026.11.25-1';
const CONFIG = Object.assign({ SUPABASE_URL: '', SUPABASE_ANON_KEY: '', USER_DOMAIN: 'orioncc.com' }, window.MS_CONFIG || {});
const CONFIGURED = /^https:\/\/[^/]+/.test(CONFIG.SUPABASE_URL) && CONFIG.SUPABASE_ANON_KEY.length > 20 && !/YOUR_/.test(CONFIG.SUPABASE_URL + CONFIG.SUPABASE_ANON_KEY);
const toEmail = u => { const s = String(u || '').trim().toLowerCase().replace(/\s+/g, '').replace(/^@/, ''); return s.includes('@') ? s : `${s}@${CONFIG.USER_DOMAIN}`; };
// admin («super admin» on screen): everything and the accounts; manager: the same, one step below — never an admin's account
// (the Edge Function says ADMIN_ONLY); deputy («admin» on screen): the same, one more step below — never an admin's nor a
// manager's account (MANAGER_ONLY); storekeeper: items and movements; mechanic and viewer read. The server says the same
// (ms_editor / ms_admin / ms_reader in supabase/schema.sql), and a stopped account (profiles.active = false) reads nothing.
const TABS = { admin: ['stock', 'projects', 'move', 'moves', 'filters', 'jobs', 'users'], manager: ['stock', 'projects', 'move', 'moves', 'filters', 'jobs', 'users'], deputy: ['stock', 'projects', 'move', 'moves', 'filters', 'jobs', 'users'], storekeeper: ['stock', 'projects', 'move', 'moves', 'filters', 'jobs'], mechanic: ['stock', 'projects', 'moves', 'filters', 'jobs'], viewer: ['stock', 'projects', 'moves', 'filters', 'jobs'] };
const ROLE_LIST = ['admin', 'manager', 'deputy', 'storekeeper', 'mechanic', 'viewer'];
const canEdit = () => !!profile && profile.active !== false && ['storekeeper', 'deputy', 'manager', 'admin'].includes(profile.role);
const canAdmin = () => !!profile && profile.active !== false && ['admin', 'manager', 'deputy'].includes(profile.role);
// a job card: the mechanics write theirs, the editors any (ms_jobber in schema.sql); the viewer reads
const canJob = () => !!profile && profile.active !== false && ['mechanic', 'storekeeper', 'deputy', 'manager', 'admin'].includes(profile.role);
const canEditJob = c => canEdit() || (canJob() && !!c && c.created_by === userId);
// the roles above mine: I never touch such an account nor give such a role (a manager: the admin; a deputy: the admin, the manager)
const ABOVE = { admin: [], manager: ['admin'], deputy: ['admin', 'manager'] };
const above = () => (profile && ABOVE[profile.role]) || ROLE_LIST;
const canTouch = u => !above().includes(u.role);
const lockedMsg = u => t(u.role === 'admin' ? 'errAdminOnly' : 'errManagerOnly');
const roleOpts = () => ROLE_LIST.filter(r => !above().includes(r));
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
  async movesIn(a, b, store) { const args = store ? { p_from: a, p_to: b, p_store: store } : { p_from: a, p_to: b }; const out = []; for (let from = 0; ; from += 1000) { const { data, error } = await this.#db.rpc('ms_moves_in', args).range(from, from + 999); this.#chk(error); out.push(...(data || [])); if ((data || []).length < 1000) return out; } }
  async check() { return (await this.#rpc('ms_stock_check')) ?? []; }
  async storeSummary() { return (await this.#rpc('ms_store_summary')) ?? []; }
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
  // the equipment at the sites (a register, never stock) and the maintenance job cards
  siteEquipment() { return this.#paged(() => this.#db.from('ms_site_equipment').select('*').order('store_id').order('sort')); }
  addSiteEq(row) { return this.#one(this.#db.from('ms_site_equipment').insert(row).select().single()); }
  updSiteEq(id, patch) { return this.#some(this.#db.from('ms_site_equipment').update(patch).eq('id', id).select()); }
  delSiteEq(id) { return this.#some(this.#db.from('ms_site_equipment').delete().eq('id', id).select('id')); }
  jobCards() { return this.#paged(() => this.#db.from('ms_job_cards').select('*').order('seq', { ascending: false })); }
  addJob(row) { return this.#one(this.#db.from('ms_job_cards').insert(row).select().single()); }
  updJob(id, patch) { return this.#some(this.#db.from('ms_job_cards').update(patch).eq('id', id).select()); }
  delJob(id) { return this.#some(this.#db.from('ms_job_cards').delete().eq('id', id).select('id')); }
  // the maintenance types, their reminders, the phones (25 Nov 2026)
  maintTypes() { return this.#rows(this.#db.from('ms_maint_types').select('*').order('kind').order('sort').order('name')); }
  addType(row) { return this.#one(this.#db.from('ms_maint_types').insert(row).select().single()); }
  updType(id, patch) { return this.#some(this.#db.from('ms_maint_types').update(patch).eq('id', id).select()); }
  delType(id) { return this.#some(this.#db.from('ms_maint_types').delete().eq('id', id).select('id')); }
  async reminders(all) { return (await this.#rpc('ms_reminders_list', { p_all: !!all })) ?? []; }
  setReminder(id, status) { return this.#rpc('ms_reminder_set', { p_id: id, p_status: status }); }
  pushSave(s, l) { return this.#rpc('ms_push_save', { p_endpoint: s.endpoint, p_p256dh: s.keys.p256dh, p_auth: s.keys.auth, p_lang: l, p_ua: navigator.userAgent.slice(0, 200) }); }
  pushDrop(endpoint) { return this.#rpc('ms_push_drop', { p_endpoint: endpoint }); }
  async push(action) {
    const { data, error } = await this.#db.functions.invoke('maint-push', { body: { action } });
    if (error) { let j = null; try { j = await error.context?.json?.(); } catch {} if (j?.error) throw new Error(j.error);
      if (/404|not found|Failed to send/i.test(String(error.message))) throw new Error(t('pushFnMissing')); throw error; }
    if (data?.error) throw new Error(data.error); return data; }
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
    MS_ITEM_IN_USE: 'errItemInUse', MS_STORE_IN_USE: 'errStoreInUse', MS_MOVE_UNKNOWN: 'errMoveUnknown', MS_MAIN_STORE: 'errMainStore', MS_STORE_CODE_DUP: 'errStoreCodeDup',
    MS_CODE_TOO_LONG: 'errCodeLong', MS_LOCATION_TOO_LONG: 'errLocationLong', MS_PROJECT_HAS_STOCK: 'errProjectHasStock', MS_PROJECT_CLOSED: 'errProjectClosed',
    MS_JOB_WHAT_REQUIRED: 'errJobWhat', MS_JOB_INVALID: 'errJobInvalid', MS_OUT_BEFORE_IN: 'errOutBeforeIn', MS_READING_INVALID: 'errReading', MS_REF_TOO_LONG: 'errRefLong', MS_PLATE_TOO_LONG: 'errPlateLong',
    MS_TYPE_INVALID: 'errTypeInvalid', MS_TYPE_DUP: 'errTypeDup', MS_DAYS_INVALID: 'errDays', MS_TYPE_IN_USE: 'errTypeInUse', MS_PUSH_INVALID: 'errPush' };
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
// THE ONE SEARCH of every list and picker: each word typed must be found (in any order); Arabic is read loosely (أ إ آ → ا,
// ة → ه, ى → ي, no tashkeel, Arabic-Indic digits → 0-9), and a code or a plate is found however it is spaced or dashed
const fold = s => String(s ?? '').normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f\u064b-\u065f\u0670\u0640]/g, '')
  .replace(/[\u0671]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d))).replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
function qHit(q, ...fields) {
  const words = fold(q).split(/\s+/).filter(Boolean); if (!words.length) return true;
  const hay = fold(fields.flat().filter(x => x != null && x !== '').join(' \u2502 ')), hk = nkey(hay);
  return words.every(w => hay.includes(w) || (nkey(w) && hk.includes(nkey(w))));
}
const Picker = (() => {
  let cur = null; const chev = '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>', tick = '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L19 7"/></svg>';
  function label(sel) { const o = sel.selectedOptions[0]; const btn = sel._btn; if (!btn) return; const ph = !o || !o.value; btn.innerHTML = `<span class="${ph ? 'ph' : ''}">${esc(o ? o.text : '')}</span>${chev}`; }
  function attach(sel, title) {
    if (sel._btn) { sel._title = title; return label(sel); }
    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'picker'; sel._btn = btn; sel._title = title; sel.classList.add('picked');
    sel.insertAdjacentElement('afterend', btn); btn.onclick = () => open(sel); label(sel);
    // the code rewrites the options: the button follows (a .value set in code calls Picker.refresh, or fires «change»)
    sel.addEventListener('change', () => label(sel));
    new MutationObserver(() => label(sel)).observe(sel, { childList: true, subtree: true, attributes: true, attributeFilter: ['selected'] });
  }
  // every <select> in a form opens this picker; its title is its label's text
  function auto(root) {
    root.querySelectorAll('select:not(.lang):not(.picked)').forEach(sel => {
      const lb = sel.id && [...root.querySelectorAll('label[for]')].find(l => l.htmlFor === sel.id);
      sel._tt = lb ? lb.textContent.replace(/\s+/g, ' ').trim() : ''; attach(sel, null);
    });
  }
  function open(sel) {
    cur = sel; const opts = [...sel.options]; $('pickTitle').textContent = sel._title ? t(sel._title) : (sel._tt || '');
    $('pickSearch').classList.toggle('hidden', opts.length < 6); $('pickSearch').value = ''; $('pickSearch').placeholder = sel.dataset.ph ? t(sel.dataset.ph) : ''; render();
    $('pickSheet').classList.remove('hidden'); $('pickBackdrop').classList.remove('hidden');
  }
  function render() {
    const q = $('pickSearch').value.trim();
    const hit = o => !q || o.classList.contains('new') || !o.value || qHit(q, o.text, o.dataset.sub, o.dataset.q);
    const list = [...cur.options].filter(hit), real = list.filter(o => o.value && !o.classList.contains('new'));
    $('pickOpts').innerHTML = list.map((o, i) => `<div class="opt ${o.selected ? 'on' : ''} ${o.classList.contains('new') ? 'new' : ''}" data-v="${esc(o.value)}" style="animation-delay:${Math.min(i, 10) * 20}ms"><span>${esc(o.text)}${o.dataset.sub ? `<div class="sub">${esc(o.dataset.sub)}</div>` : ''}</span>${tick}</div>`).join('')
      + (q && !real.length && cur.dataset.none ? `<div class="none">${esc(t(cur.dataset.none))}</div>` : '');
  }
  function close() { $('pickSheet').classList.add('hidden'); $('pickBackdrop').classList.add('hidden'); cur = null; }
  $('pickSearch').oninput = render; $('pickBackdrop').onclick = close;
  $('pickOpts').onclick = e => { const o = e.target.closest('.opt'); if (!o || !cur) return; cur.value = o.dataset.v; label(cur); const s = cur; close(); s.dispatchEvent(new Event('change')); };
  // Enter in the search takes the first option found
  $('pickSearch').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); const o = $('pickOpts').querySelector('.opt[data-v]:not([data-v=""])') || $('pickOpts').querySelector('.opt'); if (o) o.click(); } };
  return { attach, auto, open, refresh: sel => sel._btn && label(sel) };
})();

// the bar on top of each list (its search and its «add») sits right under the header, whatever the header's height
const hdrH = () => { const h = document.querySelector('header'); if (h && h.offsetHeight) document.documentElement.style.setProperty('--hdr-h', h.offsetHeight + 'px'); };
hdrH(); addEventListener('resize', hdrH); if ('ResizeObserver' in window && document.querySelector('header')) new ResizeObserver(hdrH).observe(document.querySelector('header'));

/* ---- the generic edit sheet ---- */
const Edit = (() => {
  let onSave = null;
  function open(title, bodyHtml, save, saveLabel, cls) { $('editTitle').textContent = title; $('editBody').innerHTML = bodyHtml; Picker.auto($('editBody')); msg('editMsg', '', ''); onSave = save; $('btnEditSave').textContent = saveLabel || t('saveChanges'); $('btnEditSave').className = 'primary' + (cls ? ' ' + cls : ''); $('btnEditSave').classList.toggle('hidden', !save); $('editSheet').classList.remove('hidden'); $('editBackdrop').classList.remove('hidden'); $('editSheet').scrollTop = 0; }
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
const PJ = { q: '', show: 'open', sum: {}, seq: 0 };   // the projects screen: search, open / closed, ms_store_summary by store id
const JB = { pane: 'cards', q: '', show: 'open', rows: [], loaded: false, seq: 0, err: '' };   // the maintenance screen: its pane, the job cards
const SE = { site: 'all', q: '', rows: [], loaded: false, n: 120, seq: 0, err: '' };      // the site equipment: the site on show, the search
const TY = { rows: [], loaded: false, ok: false, q: '', seq: 0, err: '' };               // the maintenance types (ms_maint_types)
const RM = { rows: [], loaded: false, show: 'due', seq: 0, err: '' };                    // the change reminders (ms_reminders_list, all of them)
const CATS = ['machine', 'tool', 'consumable', 'oil', 'filter', 'spare'];
const UNITS = ['pcs', 'set', 'pair', 'roll', 'box', 'can', 'drum', 'litre', 'kg', 'm'];
const FTYPES = ['oil', 'fuel', 'water_sep', 'air', 'cabin'];
const KINDS = ['receive', 'issue', 'return', 'transfer', 'adjust'];
const itemOf = id => STOCK.find(i => i.item_id === id) || null;
const storeOf = id => STORES.find(s => s.id === id) || null;
// an item is also found by its category and its filter type, in Arabic and in English («فلتر زيت» finds OIL FILTER FO-3143)
const itemWords = i => ['ar', 'en'].flatMap(l => [I18N[l]['c1_' + i.category], i.filter_type ? I18N[l]['f_' + i.filter_type] : '']);
const storeName = id => storeOf(id)?.name || '—';
const unitLbl = u => t('u_' + u);
const qtyTxt = (n, u) => `${fmtQ(n)} ${unitLbl(u || 'pcs')}`;
const fmtQ = n => numF({ maximumFractionDigits: 2 }).format(Number(n || 0));
const plateHtml = p => p ? `<span class="plate">${esc(p)}</span>` : '';
const kindPill = k => `<span class="kpill k-${esc(k)}">${esc(t('k_' + k))}</span>`;
// the projects: a project is a store of kind 'project'; the main store is the one of kind 'main' (the first one on an old database)
const isProject = s => !!s && s.kind === 'project';
const mainStore = () => STORES.find(s => s.kind === 'main') || STORES[0] || null;
const storeLbl = s => s ? (isProject(s) ? '🏗 ' : '') + s.name : '—';
// a transfer's route, from the two stores' kinds: to a project, project to project, back to the main store (null: store to store)
const routeOf = (from, to) => { const a = storeOf(from), b = storeOf(to); if (!a || !b) return null;
  if (isProject(b)) return isProject(a) ? 'between' : 'dispatch'; if (isProject(a)) return 'back'; return null; };
const movePill = m => { const r = m.kind === 'transfer' ? routeOf(m.store_id, m.to_store_id) : null; return r ? `<span class="kpill k-transfer r-${r}">${esc(t('r_' + r))}</span>` : kindPill(m.kind); };
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
  $('skStores').innerHTML = [['all', t('allStores')], ...act.map(s => [s.id, storeLbl(s)])].map(([v, l]) => `<button type="button" class="chip ${SK.store === v ? 'on' : ''}" data-v="${esc(v)}">${esc(l)}</button>`).join('');
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
  const q = SK.q.trim();
  return STOCK.filter(i => (SK.cat === 'all' || (SK.cat === 'low' ? i.low : i.category === SK.cat))
    && qHit(q, i.name, i.code, i.part_no, i.shelf, i.note, itemWords(i)));
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
      <div class="hb"><div>${x.kind === 'transfer' ? movePill({ kind: x.kind, store_id: Number(x.qty) < 0 ? x.store_id : x.other_store, to_store_id: Number(x.qty) < 0 ? x.other_store : x.store_id }) : kindPill(x.kind)} <b class="ltr">${esc(x.no)}</b> <span class="muted">${esc(dSlash(x.moved_on))}</span></div>
        <div class="muted">${esc([STORES.length > 1 ? storeName(x.store_id) : '', x.other_store ? '⇄ ' + storeName(x.other_store) : '', x.party || '', x.ref_no || ''].filter(Boolean).join(' · '))} ${plateHtml(x.plate)}</div></div>
      <div class="ha"><b class="${Number(x.qty) < 0 ? 'neg' : 'pos'}">${Number(x.qty) > 0 ? '+' : ''}${esc(fmtQ(x.qty))}</b><small class="muted">${esc(t('balAfter'))} ${esc(fmtQ(x.balance))}</small></div></div>`).join('')
      : `<div class="muted">${esc(t('noHistory'))}</div>`;
  } catch (e) { if ($('iHist')) $('iHist').innerHTML = `<div class="msg err">${esc(errText(e))}</div>`; }
}

/* ---------------- 6) حركة جديدة ---------------- */
function storeOpts(sel, cur, skip) {
  const act = STORES.filter(s => s.active && s.id !== skip);
  sel.innerHTML = act.map(s => `<option value="${esc(s.id)}" data-sub="${esc(s.kind === 'main' ? t('pjMain') : isProject(s) ? [t('pjKind'), s.code, s.location].filter(Boolean).join(' · ') : '')}" ${s.id === cur ? 'selected' : ''}>${esc(storeLbl(s))}</option>`).join('');
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
  sel.innerHTML = `<option value="">${esc(t('addLine'))}</option>` + list.map(i => `<option value="${esc(i.item_id)}" data-q="${esc(itemWords(i).join(' '))}" data-sub="${esc([i.code, i.part_no && i.category !== 'filter' ? i.part_no : '', t('haveN', { n: qtyTxt(qtyIn(i, $('mvStore').value), i.unit) })].filter(Boolean).join(' · '))}">${esc(i.name)}</option>`).join('');
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
  routeHint(); renderFits(); renderLines();
}
function routeHint() {
  const r = MV.kind === 'transfer' ? routeOf($('mvStore').value, $('mvTo').value) : null;
  $('mvRoute').textContent = r ? t('rd_' + r, { a: storeName($('mvStore').value), b: storeName($('mvTo').value) }) : '';
  $('mvRoute').classList.toggle('hidden', !r);
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
$('mvStore').onchange = () => { if (MV.kind === 'transfer') storeOpts($('mvTo'), $('mvTo').value, $('mvStore').value); routeHint(); renderLines(); renderFits(); };
$('mvTo').onchange = routeHint;
$('mvPlate').onchange = renderFits;
$('mvAdd').onchange = e => addLine(e.target.value);
$('mvFits').onclick = e => { const b = e.target.closest('.fitchip'); if (!b) return; const id = b.dataset.id;
  if (MV.lines.some(l => l.item_id === id)) { MV.lines = MV.lines.filter(l => l.item_id !== id); renderLines(); renderFits(); } else addLine(id); };
$('mvLines').oninput = e => { const r = e.target.closest('.lrow'); if (!r || !e.target.classList.contains('lqin')) return; const l = MV.lines[Number(r.dataset.ix)]; if (!l) return;
  if (MV.kind === 'adjust') l.counted = e.target.value; else l.qty = e.target.value; };
$('mvLines').addEventListener('change', e => { if (e.target.classList.contains('lqin')) { const pos = [...document.querySelectorAll('#mvLines .lqin')].indexOf(e.target); renderLines(); const el = document.querySelectorAll('#mvLines .lqin')[pos + 1]; if (el) el.focus(); } });
$('mvLines').onclick = e => { const x = e.target.closest('.lx'); if (!x) return; MV.lines.splice(Number(x.closest('.lrow').dataset.ix), 1); renderLines(); renderFits(); };
// a movement started from elsewhere (an item, a project): its kind, its lines, and the stores it goes from / to
function startMove(kind, lines, st) {
  MV.lines = (lines || []).map(l => ({ item_id: l.item_id, qty: l.qty ?? '', counted: l.counted ?? '' }));
  openTab('move', true);
  if (st && st.from) storeOpts($('mvStore'), st.from);
  if (st && st.to) storeOpts($('mvTo'), st.to, $('mvStore').value);
  setKind(kind || MV.kind);
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
    await reloadStock(); renderLines(); renderFits(); HS.rows = []; PJ.loaded = false; msg('mvMsg', t('mvSaved', { no: r.no }), 'ok'); toast(t('mvSaved', { no: r.no }));
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
  const q = HS.q.trim();
  return HS.rows.filter(m => (HS.kind === 'all' || m.kind === HS.kind) && (HS.store === 'all' || m.store_id === HS.store || m.to_store_id === HS.store)
    && qHit(q, m.no, m.party, m.ref_no, m.note, m.by_name, m.plate, t('k_' + m.kind), storeName(m.store_id), m.to_store_id ? storeName(m.to_store_id) : '', (m.lines || []).map(l => [l.name, l.code])));
}
function moveRow(m) {
  const ls = m.lines || [];
  return `<div class="frow mv k-${esc(m.kind)} ${m.status === 'void' ? 'void' : ''}" data-id="${esc(m.id)}"><div class="fb">
    <div class="fn">${movePill(m)} <span class="ltr">${esc(m.no)}</span> ${m.status === 'void' ? `<span class="pill err">${esc(t('voidB'))}</span>` : ''}</div>
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
function openMove(id, rows) {
  const m = (rows || HS.rows).find(x => x.id === id); if (!m) return;
  const ls = m.lines || [];
  const rt = m.kind === 'transfer' ? routeOf(m.store_id, m.to_store_id) : null;
  const body = `<div class="pinfo"><div><small>${esc(t('thKind'))}</small><b>${esc(rt ? t('r_' + rt) : t('k_' + m.kind))}</b></div><div><small>${esc(t('thDate'))}</small><b>${esc(dSlash(m.moved_on))}</b></div>
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
  $('mPrint').onclick = () => printIn(() => movePdf(m));
  if ($('mVoid')) $('mVoid').onclick = () => Edit.open(t('voidQ'), `<div class="warnbox">${esc(t('voidD'))}</div><input id="vReason" maxlength="300" placeholder="${esc(t('reasonPh'))}" style="margin-top:10px">`, async () => {
    const r = $('vReason').value.trim(); if (!r) throw new Error(t('errReason'));
    await repo.void(m.id, r); await reloadStock(); HS.rows = []; if (rows) { PJ.loaded = false; renderProjects(); } else await renderMoves(true); toast(t('voided')); return false;
  }, t('voidYes'), 'danger');
}

/* ---------------- 8) الفلاتر ---------------- */
function renderFilters() {
  const groups = [...new Set(EQUIP.map(e => e.grp))];
  $('ftGroups').innerHTML = ['all', ...groups].map(g => `<button type="button" class="chip ${FT.grp === g ? 'on' : ''}" data-v="${esc(g)}">${esc(g === 'all' ? t('c_all') : g)} <small>${EQUIP.filter(e => g === 'all' || e.grp === g).length}</small></button>`).join('');
  renderFilterList();
}
function renderFilterList() {
  const q = FT.q.trim();
  const fitsOf = id => FITS.filter(f => f.equipment_id === id);
  const rows = EQUIP.filter(e => (FT.grp === 'all' || e.grp === FT.grp) && qHit(q, e.grp, e.name, e.plate, fitsOf(e.id).map(f => itemOf(f.item_id)?.part_no)));
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

/* ---------------- 8b) المشاريع (المواقع): لكل مشروع مخزنه ---------------- */
// A project is a store of kind 'project' (ms_stores): the admins / managers make, edit, close and reopen it (the stores' RLS), the
// storekeepers send it materials from the main store, move them to another project and return them — each a transfer through
// ms_post. A project closes only with its shelves empty (the server says MS_PROJECT_HAS_STOCK); a closed one takes nothing in.
const projects = () => STORES.filter(isProject);
const pjHeld = id => STOCK.filter(i => qtyIn(i, id) > 0);
async function loadSummary() {
  const seq = ++PJ.seq;
  try { const rows = await repo.storeSummary(); if (seq !== PJ.seq) return; PJ.sum = Object.fromEntries(rows.map(r => [r.store_id, r])); PJ.loaded = true; renderProjectList(); } catch { /* the list shows without it */ }
}
function renderProjects() {
  const all = projects(), n = v => all.filter(s => v === 'open' ? s.active : !s.active).length;
  $('btnPjNew').classList.toggle('hidden', !canAdmin());
  $('pjShow').innerHTML = ['open', 'closed'].map(v => `<button type="button" class="chip ${PJ.show === v ? 'on' : ''}" data-v="${v}">${esc(t(v === 'open' ? 'pjOpen' : 'pjClosed'))} <small>${n(v)}</small></button>`).join('');
  renderProjectList();
  if (!PJ.loaded) loadSummary();
}
function renderProjectList() {
  const q = PJ.q.trim();
  const rows = projects().filter(s => (PJ.show === 'open' ? s.active : !s.active)
    && qHit(q, s.name, s.location, s.code));
  $('pjList').innerHTML = rows.length ? rows.map(s => { const held = pjHeld(s.id), units = held.reduce((a, i) => a + qtyIn(i, s.id), 0), sm = PJ.sum[s.id];
    return `<div class="frow pj ${s.active ? '' : 'off'}" data-id="${esc(s.id)}"><div class="fb"><div class="fn">🏗 ${esc(s.name)}</div>
      <div class="fs">${s.code ? `<span class="rec">${esc(s.code)}</span>` : ''}${s.location ? `<span class="muted">📍 ${esc(s.location)}</span>` : ''}${s.active ? '' : `<span class="pill mute">${esc(s.closed_on ? t('pjClosedOn', { d: dSlash(s.closed_on) }) : t('pjClosedB'))}</span>`}</div>
      <div class="fx">${esc(held.length ? t('pjItemsN', { n: fmtInt(held.length), u: fmtQ(units) }) : t('pjEmpty'))}${sm ? ' · ' + esc(sm.last_move ? t('pjLast', { d: dSlash(sm.last_move) }) : t('pjNoMoves')) : ''}</div></div>
      <div class="fa"><span class="qty">${fmtInt(held.length)}</span><small class="muted">${esc(t('ppItems'))}</small></div></div>`; }).join('')
    : `<div class="empty">${esc(t(projects().length ? 'noMatch' : 'pjNone'))}</div>`;
}
$('pjShow').onclick = e => { const b = e.target.closest('.chip'); if (!b) return; PJ.show = b.dataset.v; renderProjects(); };
$('pjSearch').oninput = e => { PJ.q = e.target.value; renderProjectList(); };
$('pjList').onclick = e => { const r = e.target.closest('.frow'); if (r) openProject(r.dataset.id); };
$('btnPjNew').onclick = () => { if (canAdmin()) projectSheet(null); };
function projectSheet(s) {
  Edit.open(s ? t('pjEditT') : t('pjNewT'), `<label for="pjName">${esc(t('pjName'))}</label><input id="pjName" maxlength="80" autocomplete="off" value="${esc(s?.name || '')}">
    <div class="row"><div><label for="pjCode">${esc(t('pjCode'))}<span class="opt-t">${esc(t('optional'))}</span></label><input id="pjCode" class="ltr" maxlength="20" autocapitalize="characters" autocomplete="off" value="${esc(s?.code || '')}"></div>
      <div><label for="pjStarted">${esc(t('pjStarted'))}<span class="opt-t">${esc(t('optional'))}</span></label><input id="pjStarted" type="date" value="${esc(s?.started_on || '')}"></div></div>
    <label for="pjLocation">${esc(t('pjLocation'))}<span class="opt-t">${esc(t('optional'))}</span></label><input id="pjLocation" maxlength="120" autocomplete="off" value="${esc(s?.location || '')}">
    <label for="pjNote">${esc(t('pjNote'))}<span class="opt-t">${esc(t('optional'))}</span></label><input id="pjNote" maxlength="300" autocomplete="off" value="${esc(s?.note || '')}">`, async () => {
    const row = { name: $('pjName').value, code: $('pjCode').value || null, location: $('pjLocation').value || null, started_on: $('pjStarted').value || null, note: $('pjNote').value || null };
    if (!row.name.trim()) throw new Error(t('errNameReq'));
    if (s) await repo.updStore(s.id, row); else await repo.addStore({ ...row, kind: 'project', sort: 500 });
    STORES = await repo.stores(); renderProjects(); toast(t('pjSaved')); return false;
  });
}
async function openProject(id) {
  const s = storeOf(id); if (!isProject(s)) return;
  const held = pjHeld(id), main = mainStore(), others = projects().filter(x => x.active && x.id !== id), ed = canEdit() && s.active;
  const body = `<div class="pinfo">${s.code ? `<div><small>${esc(t('pjCode'))}</small><b class="ltr">${esc(s.code)}</b></div>` : ''}${s.location ? `<div><small>${esc(t('pjLocation'))}</small><b>${esc(s.location)}</b></div>` : ''}
      ${s.started_on ? `<div><small>${esc(t('pjStarted'))}</small><b>${esc(dSlash(s.started_on))}</b></div>` : ''}<div><small>${esc(t('ppItems'))}</small><b>${esc(fmtInt(held.length))}</b></div>
      ${s.active ? '' : `<div><small>${esc(t('pjClosedB'))}</small><b>${esc(dSlash(s.closed_on))}</b></div>`}</div>
    ${s.note ? `<div class="infobox">${esc(s.note)}</div>` : ''}
    ${ed ? `<button type="button" class="primary" id="pjGoSend">${esc(t('pjSend'))}</button>
      <div class="row2b"><button type="button" class="ghost" id="pjGoMove">${esc(t('pjMove'))}</button><button type="button" class="ghost" id="pjGoBack">${esc(t('pjBack'))}</button></div>
      <div class="row2b"><button type="button" class="ghost" id="pjGoBackAll">${esc(t('pjBackAll'))}</button><button type="button" class="ghost" id="pjGoIssue">${esc(t('pjIssue'))}</button></div>` : ''}
    ${canAdmin() ? `<div class="row2b"><button type="button" class="ghost" id="pjEditB">${esc(t('pjEdit'))}</button><button type="button" class="ghost" id="pjTogB">${esc(t(s.active ? 'pjClose' : 'pjReopen'))}</button></div>
      ${s.active && held.length ? `<div class="hint">${esc(t('pjCloseHint'))}</div>` : ''}` : ''}
    <button type="button" class="ghost" id="pjEquipB">${esc(t('pjEquip'))}</button>
    <div class="lhead"><span>${esc(t('pjStockT'))}</span><span class="n">${held.length}</span></div>
    ${held.length ? `<div class="card" style="margin-top:6px">${held.map(i => `<div class="kv"><span>${esc(i.name)} <small class="muted ltr">${esc(i.code)}</small></span><b>${esc(qtyTxt(qtyIn(i, id), i.unit))}</b></div>`).join('')}</div>
      <button type="button" class="ghost" id="pjPdfB">${esc(t('pjPdf'))}</button>` : `<div class="muted">${esc(t('pjEmpty'))}</div>`}
    <div class="lhead"><span>${esc(t('pjMovesT'))}</span></div><div id="pjMoves">${skeleton(3)}</div>`;
  Edit.open('🏗 ' + s.name, body, null);
  const go = (kind, lines, st) => { Edit.close(); startMove(kind, lines, st); };
  if ($('pjGoSend')) {
    $('pjGoSend').onclick = () => go('transfer', [], { from: main?.id, to: id });
    $('pjGoMove').onclick = () => { if (!others.length) return toast(t('pjNoOther')); go('transfer', [], { from: id, to: others[0].id }); };
    $('pjGoBack').onclick = () => go('transfer', [], { from: id, to: main?.id });
    $('pjGoBackAll').onclick = () => { if (!held.length) return toast(t('pjNoStock')); go('transfer', held.map(i => ({ item_id: i.item_id, qty: String(qtyIn(i, id)) })), { from: id, to: main?.id }); };
    $('pjGoIssue').onclick = () => go('issue', [], { from: id });
  }
  if ($('pjEditB')) {
    $('pjEditB').onclick = () => projectSheet(s);
    $('pjTogB').onclick = async () => { busy($('pjTogB'), true);
      try { await repo.updStore(id, { active: !s.active }); STORES = await repo.stores(); renderProjects(); toast(t(s.active ? 'pjClosedT' : 'pjReopenedT')); Edit.close(); }
      catch (e) { msg('editMsg', errText(e), 'err'); } finally { if ($('pjTogB')) busy($('pjTogB'), false); } };
  }
  if ($('pjPdfB')) $('pjPdfB').onclick = () => printIn(() => stockPdf(id, held));
  $('pjEquipB').onclick = () => { Edit.close(); JB.pane = 'equip'; SE.site = id; SE.q = ''; $('seSearch').value = ''; openTab('jobs', true); };
  try {
    const rows = await repo.movesIn('2020-01-01', dubaiToday(), id);
    if (!$('pjMoves') || $('editTitle').textContent !== '🏗 ' + s.name) return;
    $('pjMoves').innerHTML = rows.length ? rows.slice(0, 50).map(moveRow).join('') : `<div class="muted">${esc(t('pjNoMoves'))}</div>`;
    $('pjMoves').onclick = e => { const r = e.target.closest('.frow'); if (r) openMove(r.dataset.id, rows); };
  } catch (e) { if ($('pjMoves')) $('pjMoves').innerHTML = `<div class="msg err">${esc(errText(e))}</div>`; }
}

/* ---------------- 8c) الصيانة: كروت العمل ومعدات المواقع ---------------- */
// A job card (ms_job_cards) is the workshop's record of one visit: the vehicle or the machine, in and out, the reading and the fuel,
// the safety checks, the oils and the filters, the work, the diagnosis, the parts, the names that sign. The server numbers it
// (JC-000001), checks every key and value, and lets a mechanic edit his own cards only; the page prints it on Orion's own paper (jobPdf).
// The site equipment (ms_site_equipment) is the owner's sheet of what each site holds — a register beside the stock, never moving it.
const OILS = ['hydraulic', 'diesel_engine', 'petrol_engine', 'gear', 'coolant'];
const JFILTERS = ['hydraulic', 'oil', 'fuel', 'air', 'cabin'];
const CHECKS = ['tyres', 'brakes', 'lights', 'horn', 'mirrors', 'seatbelt', 'extinguisher', 'leaks'];
const WORKS = ['mechanical', 'electrical', 'hydraulic', 'routine', 'field'];
const FUELS = [0, 25, 50, 75, 100];
const SETAGS = ['new', 'extra', 'returned', 'rent', 'balance'];
const fuelLbl = v => ({ 0: 'E', 25: '¼', 50: '½', 75: '¾', 100: 'F' })[v] ?? '—';
const hhmm = v => v ? String(v).slice(0, 5) : '';
const jobOf = id => JB.rows.find(c => c.id === id) || null;
const seOf = id => SE.rows.find(r => r.id === id) || null;
const jobWhat = c => [c.plate, c.make_model, c.eq_type].filter(Boolean).join(' · ') || (seOf(c.site_equipment_id)?.name ?? '—');
async function loadJobs() {
  const seq = ++JB.seq;
  try { const rows = await repo.jobCards(); if (seq !== JB.seq) return; JB.rows = rows; JB.loaded = true; JB.err = ''; }
  catch (e) { if (seq !== JB.seq) return; JB.err = errText(e); }
  if (JB.pane === 'cards') renderJobList();
}
async function loadSiteEq() {
  const seq = ++SE.seq;
  try { const rows = await repo.siteEquipment(); if (seq !== SE.seq) return; SE.rows = rows; SE.loaded = true; SE.err = ''; }
  catch (e) { if (seq !== SE.seq) return; SE.err = errText(e); }
  if (JB.pane === 'equip') renderSiteEq();
}
function renderJobs() {
  document.querySelectorAll('#jbPane button').forEach(b => b.classList.toggle('on', b.dataset.p === JB.pane));
  $('jbCards').classList.toggle('hidden', JB.pane !== 'cards'); $('jbEquip').classList.toggle('hidden', JB.pane !== 'equip');
  $('jbRem').classList.toggle('hidden', JB.pane !== 'rem'); $('jbTypes').classList.toggle('hidden', JB.pane !== 'types');
  $('btnJbNew').classList.toggle('hidden', !canJob()); $('btnSeAdd').classList.toggle('hidden', !canEdit()); $('btnTyNew').classList.toggle('hidden', !canAdmin());
  if (!TY.loaded) loadTypes();
  if (JB.pane === 'cards') { if (!JB.loaded) { $('jbList').innerHTML = skeleton(4); loadJobs(); } else renderJobList(); if (!SE.loaded) loadSiteEq(); }
  else if (JB.pane === 'rem') { if (!RM.loaded) { $('remList').innerHTML = skeleton(4); loadRem(); } else renderRem(); if (!JB.loaded) loadJobs(); if (!SE.loaded) loadSiteEq(); pushBox(); }
  else if (JB.pane === 'types') { if (!TY.loaded) $('tyList').innerHTML = skeleton(3); else renderTypes(); }
  else { if (!SE.loaded) { $('seList').innerHTML = skeleton(5); loadSiteEq(); } else renderSiteEq(); }
}
function jobRows() {
  const q = JB.q.trim();
  return JB.rows.filter(c => (JB.show === 'all' || c.status === JB.show)
    && qHit(q, c.no, c.plate, c.make_model, c.eq_type, c.driver, c.mechanic, c.diagnosis, c.parts, storeOf(c.store_id)?.name, storeOf(c.store_id)?.code));
}
function jobRow(c) {
  const st = storeOf(c.store_id);
  return `<div class="frow job ${c.status === 'done' ? 'done' : ''}" data-id="${esc(c.id)}"><div class="fb">
    <div class="fn"><span class="oid">${esc(c.no)}</span> ${c.plate ? plateHtml(c.plate) : ''} ${esc([c.make_model, c.eq_type].filter(Boolean).join(' · '))}</div>
    <div class="fs">${esc(dSlash(c.in_on))}${c.out_on ? ' → ' + esc(dSlash(c.out_on)) : ''}${st ? ` · ${esc(storeLbl(st))}` : ''}${c.driver ? ` · ${esc(c.driver)}` : ''}</div>
    ${(c.work || []).length ? `<div class="fs">${c.work.map(w => `<span class="kpill f">${esc(t('w_' + w))}</span>`).join('')}</div>` : ''}
    ${c.diagnosis ? `<div class="fx">${esc(String(c.diagnosis).slice(0, 140))}</div>` : ''}</div>
    <div class="fa"><span class="pill ${c.status === 'done' ? 'ok' : 'warn'}">${esc(t(c.status === 'done' ? 'jbStDone' : 'jbStOpen'))}</span><small class="muted">${esc(c.mechanic || c.created_by_name || '')}</small></div></div>`;
}
function renderJobList() {
  const n = v => JB.rows.filter(c => v === 'all' || c.status === v).length;
  $('jbShow').innerHTML = ['open', 'done', 'all'].map(v => `<button type="button" class="chip ${JB.show === v ? 'on' : ''}" data-v="${v}">${esc(t(v === 'open' ? 'jbOpen' : v === 'done' ? 'jbDone' : 'jbAll'))} <small>${n(v)}</small></button>`).join('');
  if (JB.err) { $('jbList').innerHTML = `<div class="msg err">${esc(JB.err)}</div>`; return; }
  const rows = jobRows();
  $('jbList').innerHTML = rows.length ? rows.map(jobRow).join('') : `<div class="empty">${esc(t(JB.rows.length ? 'noMatch' : 'jbNone'))}</div>`;
}
$('jbPane').onclick = e => { const b = e.target.closest('button'); if (!b) return; JB.pane = b.dataset.p; renderJobs(); };
$('jbShow').onclick = e => { const b = e.target.closest('.chip'); if (!b) return; JB.show = b.dataset.v; renderJobList(); };
$('jbSearch').oninput = e => { JB.q = e.target.value; renderJobList(); };
$('jbList').onclick = e => { const r = e.target.closest('.frow'); if (r) openJob(r.dataset.id); };
$('btnJbNew').onclick = () => { if (canJob()) jobSheet(null); };

// the form: one sheet, the paper's sections in its order
const JF = { checks: {}, work: [], fuel: null, maint: [] };
const secH = (n, k) => `<div class="jsec"><span>${String(n).padStart(2, '0')}</span><b>${esc(t(k))}</b></div>`;
function jobFormHtml(c, pre) {
  const v = k => esc(c?.[k] ?? pre?.[k] ?? '');
  const sites = STORES.filter(s => s.active || s.id === (c?.store_id ?? pre?.store_id));
  const cur = c?.store_id ?? pre?.store_id ?? '';
  const se = seOf(c?.site_equipment_id ?? pre?.site_equipment_id);
  const parts = [...new Set(STOCK.filter(i => i.category === 'filter' && i.part_no).map(i => i.part_no))];
  const oil = o => (c?.oils || []).find(x => x.type === o) || {}, flt = f => (c?.filters || []).find(x => x.type === f) || {};
  return `${secH(1, 'jsVehicle')}
    ${se ? `<div class="infobox">${esc(t('jfLinked', { n: [se.name, se.ref].filter(Boolean).join(' · ') + ' — ' + storeName(se.store_id) }))}</div>` : ''}
    <label for="jfSite">${esc(t('jfSite'))}</label><select id="jfSite"><option value="">${esc(t('jfNoSite'))}</option>${sites.map(s => `<option value="${esc(s.id)}" ${s.id === cur ? 'selected' : ''}>${esc(storeLbl(s))}${s.code ? ' — ' + esc(s.code) : ''}</option>`).join('')}</select>
    <div class="row"><div><label for="jfPlate">${esc(t('jfPlate'))}</label><input id="jfPlate" class="ltr" maxlength="30" list="jfPlates" autocapitalize="characters" autocomplete="off" value="${v('plate')}">
      <datalist id="jfPlates">${EQUIP.filter(e => e.plate).map(e => `<option value="${esc(e.plate)}">${esc([e.grp, e.name].filter(Boolean).join(' · '))}</option>`).join('')}</datalist></div>
      <div><label for="jfMake">${esc(t('jfMake'))}</label><input id="jfMake" maxlength="80" autocomplete="off" value="${v('make_model')}"></div></div>
    <div class="row"><div><label for="jfType">${esc(t('jfType'))}</label><input id="jfType" maxlength="80" autocomplete="off" value="${v('eq_type')}"></div>
      <div><label for="jfDriver">${esc(t('jfDriver'))}</label><input id="jfDriver" maxlength="80" autocomplete="off" value="${v('driver')}"></div></div>
    ${secH(2, 'jsTimes')}
    <div class="row"><div><label for="jfInOn">${esc(t('jfInOn'))}</label><input id="jfInOn" type="date" max="${dubaiToday()}" value="${esc(c?.in_on || dubaiToday())}"></div>
      <div><label for="jfInTime">${esc(t('jfTime'))}</label><input id="jfInTime" type="time" value="${esc(hhmm(c?.in_time))}"></div></div>
    <div class="row"><div><label for="jfOutOn">${esc(t('jfOutOn'))}<span class="opt-t">${esc(t('optional'))}</span></label><input id="jfOutOn" type="date" max="${dubaiToday()}" value="${esc(c?.out_on || '')}"></div>
      <div><label for="jfOutTime">${esc(t('jfTime'))}</label><input id="jfOutTime" type="time" value="${esc(hhmm(c?.out_time))}"></div></div>
    ${secH(3, 'jsCond')}
    <div class="row"><div><label for="jfReading">${esc(t('jfReading'))}</label><input id="jfReading" class="ltr" inputmode="decimal" autocomplete="off" value="${c?.reading != null ? esc(fmtQ(c.reading).replace(/,/g, '')) : ''}"></div>
      <div><label for="jfUnit">&nbsp;</label><select id="jfUnit">${['km', 'hr'].map(u => `<option value="${u}" ${(c?.reading_unit || 'km') === u ? 'selected' : ''}>${esc(t('ru_' + u))}</option>`).join('')}</select></div></div>
    <label>${esc(t('jfFuel'))}</label><div class="segment fuel" id="jfFuel">${FUELS.map(f => `<button type="button" data-v="${f}">${fuelLbl(f)}</button>`).join('')}</div>
    <label>${esc(t('jsChecks'))}</label><div class="ckgrid" id="jfChecks">${CHECKS.map(k => `<button type="button" class="ckc" data-k="${k}"><i></i><span>${esc(t('ck_' + k))}</span></button>`).join('')}</div>
    <div class="hint">${esc(t('ckHint'))}</div>
    ${secH(4, 'jsOils')}
    ${OILS.map(o => `<div class="jline"><span>${esc(t('o_' + o))}</span><input id="jo_${o}" class="ltr" inputmode="decimal" placeholder="${esc(t('jfLitres'))}" autocomplete="off" value="${oil(o).qty != null ? esc(oil(o).qty) : ''}"><input id="jn_${o}" maxlength="120" placeholder="${esc(t('jfNote'))}" autocomplete="off" value="${esc(oil(o).note || '')}"></div>`).join('')}
    ${secH(5, 'jsFilters')}
    <datalist id="jfParts">${parts.map(p => `<option value="${esc(p)}"></option>`).join('')}</datalist>
    ${JFILTERS.map(f => `<div class="jline"><span>${esc(t('fl_' + f))}</span><input id="jp_${f}" class="ltr" maxlength="40" list="jfParts" placeholder="${esc(t('jfPartNo'))}" autocapitalize="characters" autocomplete="off" value="${esc(flt(f).part_no || '')}">
      <select id="ja_${f}"><option value="">—</option>${['change', 'clean'].map(a => `<option value="${a}" ${flt(f).type && (flt(f).action || 'change') === a ? 'selected' : ''}>${esc(t('ac_' + a))}</option>`).join('')}</select></div>`).join('')}
    ${secH(6, 'jsMaint')}
    ${maintChips(c, pre)}
    ${secH(7, 'jsWork')}
    <div class="chips wrap" id="jfWork">${WORKS.map(w => `<button type="button" class="chip" data-v="${w}">${esc(t('w_' + w))}</button>`).join('')}</div>
    ${secH(8, 'jsDiag')}<textarea id="jfDiag" rows="3" maxlength="2000">${v('diagnosis')}</textarea>
    <label for="jfParts2">${esc(t('jsParts'))}</label><textarea id="jfParts2" rows="3" maxlength="2000">${v('parts')}</textarea>
    ${secH(9, 'jsSign')}
    <div class="row"><div><label for="jfMech">${esc(t('jfMech'))}</label><input id="jfMech" maxlength="80" autocomplete="off" value="${esc(c?.mechanic ?? pre?.mechanic ?? (profile?.role === 'mechanic' ? profile.name : ''))}"></div>
      <div><label for="jfFleet">${esc(t('jfFleet'))}</label><input id="jfFleet" maxlength="80" autocomplete="off" value="${v('fleet_officer')}"></div></div>
    <label for="jfSup">${esc(t('jfSup'))}</label><input id="jfSup" maxlength="80" autocomplete="off" value="${v('supervisor')}">
    <label for="jfNotes">${esc(t('jsNotes'))}<span class="opt-t">${esc(t('optional'))}</span></label><textarea id="jfNotes" rows="2" maxlength="1000">${v('final_notes')}</textarea>`;
}
function jfPaint() {
  document.querySelectorAll('#jfFuel button').forEach(b => b.classList.toggle('on', Number(b.dataset.v) === JF.fuel));
  document.querySelectorAll('#jfChecks .ckc').forEach(b => { const s = JF.checks[b.dataset.k]; b.className = 'ckc ' + (s || ''); b.querySelector('i').textContent = s === 'ok' ? '✓' : s === 'bad' ? '✗' : ''; });
  document.querySelectorAll('#jfWork .chip').forEach(b => b.classList.toggle('on', JF.work.includes(b.dataset.v)));
  document.querySelectorAll('#jfMaint .mtchip').forEach(b => b.classList.toggle('on', JF.maint.includes(b.dataset.v)));
  if ($('jfNext')) { const base = ($('jfOutOn')?.value) || ($('jfInOn')?.value) || dubaiToday();
    $('jfNext').innerHTML = JF.maint.map(typeOf).filter(Boolean).map(x => esc(t('jfNextDue', { n: x.name, d: dSlash(addDays(base, x.interval_days)) }))).join('<br>'); }
}
function jobRead(c, pre) {
  const txt = id => $(id).value.trim();
  const plate = txt('jfPlate'), make = txt('jfMake');
  const se = c?.site_equipment_id ?? pre?.site_equipment_id ?? null;
  if (!plate && !make && !se) throw new Error(t('errJobWhat'));
  const rd = txt('jfReading'), reading = rd === '' ? null : qNum(rd); if (rd !== '' && !(reading >= 0)) throw new Error(t('errReading'));
  const oils = OILS.map(o => { const q = txt('jo_' + o), note = txt('jn_' + o); if (q === '' && !note) return null; const n = q === '' ? null : qNum(q);
    if (q !== '' && !(n >= 0)) throw new Error(t('errQty', { c: t('o_' + o) })); const r = { type: o }; if (n != null) r.qty = n; if (note) r.note = note; return r; }).filter(Boolean);
  const filters = JFILTERS.map(f => { const p = txt('jp_' + f).toUpperCase(), a = $('ja_' + f).value; if (!p && !a) return null; const r = { type: f, action: a || 'change' }; if (p) r.part_no = p; return r; }).filter(Boolean);
  const inOn = $('jfInOn').value || dubaiToday(), outOn = $('jfOutOn').value || null;
  if (outOn && outOn < inOn) throw new Error(t('errOutBeforeIn'));
  const eq = plate ? EQUIP.find(e => e.plate && nkey(e.plate) === nkey(plate)) : null;
  return { store_id: $('jfSite').value || null, equipment_id: eq ? eq.id : null, site_equipment_id: se, plate: plate || null, make_model: make || null, eq_type: txt('jfType') || null, driver: txt('jfDriver') || null,
    in_on: inOn, in_time: $('jfInTime').value || null, out_on: outOn, out_time: outOn ? ($('jfOutTime').value || null) : null,
    reading, reading_unit: reading == null ? null : $('jfUnit').value, fuel: JF.fuel, checks: { ...JF.checks }, oils, filters, work: WORKS.filter(w => JF.work.includes(w)),
    diagnosis: txt('jfDiag') || null, parts: txt('jfParts2') || null, final_notes: txt('jfNotes') || null,
    mechanic: txt('jfMech') || null, fleet_officer: txt('jfFleet') || null, supervisor: txt('jfSup') || null,
    ...(TY.ok || c?.maint_types?.length ? { maint_types: [...JF.maint] } : {}) };
}
async function jobSheet(c, pre) {
  if (!TY.loaded) await loadTypes();
  JF.checks = { ...(c?.checks || {}) }; JF.work = [...(c?.work || [])]; JF.fuel = c?.fuel ?? null; JF.maint = [...(c?.maint_types || pre?.maint_types || [])];
  Edit.open(c ? t('jbEditT', { no: c.no }) : t('jbNewT'), jobFormHtml(c, pre), async () => {
    const row = jobRead(c, pre);
    const saved = c ? await repo.updJob(c.id, row) : await repo.addJob({ ...row, status: 'open' });
    const i = JB.rows.findIndex(x => x.id === saved.id); if (i >= 0) JB.rows[i] = saved; else JB.rows.unshift(saved);
    toast(t('jbSaved', { no: saved.no })); if (JB.pane === 'cards' && $('scr-jobs').classList.contains('active')) renderJobList();
    if (row.maint_types || c?.maint_types?.length) { RM.loaded = false; if (canAdmin() || JB.pane === 'rem') loadRem(); }
    openJob(saved.id); return 'keep';
  });
  jfPaint();
  $('jfFuel').onclick = e => { const b = e.target.closest('button'); if (!b) return; const f = Number(b.dataset.v); JF.fuel = JF.fuel === f ? null : f; jfPaint(); };
  $('jfChecks').onclick = e => { const b = e.target.closest('.ckc'); if (!b) return; const k = b.dataset.k, s = JF.checks[k];
    if (!s) JF.checks[k] = 'ok'; else if (s === 'ok') JF.checks[k] = 'bad'; else delete JF.checks[k]; jfPaint(); };
  $('jfWork').onclick = e => { const b = e.target.closest('.chip'); if (!b) return; const w = b.dataset.v; JF.work = JF.work.includes(w) ? JF.work.filter(x => x !== w) : [...JF.work, w]; jfPaint(); };
  if ($('jfMaint')) $('jfMaint').onclick = e => { const b = e.target.closest('.mtchip'); if (!b) return; const v = b.dataset.v; JF.maint = JF.maint.includes(v) ? JF.maint.filter(x => x !== v) : [...JF.maint, v]; jfPaint(); };
  ['jfInOn', 'jfOutOn'].forEach(id => $(id).addEventListener('change', jfPaint));
}
function openJob(id) {
  const c = jobOf(id); if (!c) return;
  const st = storeOf(c.store_id), se = seOf(c.site_equipment_id), ed = canEditJob(c);
  const fitsStock = (c.filters || []).map(f => f.part_no && STOCK.find(i => i.category === 'filter' && nkey(i.part_no) === nkey(f.part_no))).filter(Boolean);
  const kv = (k, v) => v ? `<div><small>${esc(t(k))}</small><b>${v}</b></div>` : '';
  const body = `<div class="fs" style="margin-bottom:8px"><span class="pill ${c.status === 'done' ? 'ok' : 'warn'}">${esc(t(c.status === 'done' ? 'jbStDone' : 'jbStOpen'))}</span>
      <span class="muted">${esc(t('jbBy', { n: c.created_by_name || '', d: fmtDT(c.created_at) }))}</span></div>
    <div class="pinfo">${kv('jfPlate', c.plate ? plateHtml(c.plate) : '')}${kv('jfMake', esc(c.make_model || ''))}${kv('jfType', esc(c.eq_type || ''))}${kv('jfDriver', esc(c.driver || ''))}
      ${kv('jfSite', st ? esc(storeLbl(st)) : '')}${se ? kv('seName', esc([se.name, se.ref].filter(Boolean).join(' · '))) : ''}
      ${kv('jfInOn', esc(dSlash(c.in_on) + (c.in_time ? ' ' + hhmm(c.in_time) : '')))}${kv('jfOutOn', c.out_on ? esc(dSlash(c.out_on) + (c.out_time ? ' ' + hhmm(c.out_time) : '')) : '')}
      ${kv('jfReading', c.reading != null ? esc(fmtQ(c.reading) + ' ' + t('ru_' + (c.reading_unit || 'km'))) : '')}${kv('jfFuel', c.fuel != null ? esc(fuelLbl(c.fuel)) : '')}</div>
    ${(c.work || []).length ? `<div class="fs">${c.work.map(w => `<span class="kpill f">${esc(t('w_' + w))}</span>`).join('')}</div>` : ''}
    ${nextOf(c).length ? `<div class="lhead"><span>${esc(t('jsMaint'))}</span></div><div class="card" style="margin-top:6px">${nextOf(c).map(x => `<div class="kv"><span>${esc(x.name)} <small class="muted">${esc(t('tyEvery', { n: x.interval_days }))}</small></span><b class="ltr">${esc(dSlash(x.due))}</b></div>`).join('')}</div>` : ''}
    ${(c.oils || []).length ? `<div class="lhead"><span>${esc(t('jsOils'))}</span></div><div class="card" style="margin-top:6px">${c.oils.map(o => `<div class="kv"><span>${esc(t('o_' + o.type))}${o.note ? ` <small class="muted">${esc(o.note)}</small>` : ''}</span><b class="ltr">${o.qty != null ? esc(fmtQ(o.qty)) + ' ' + esc(t('jfLitres')) : '—'}</b></div>`).join('')}</div>` : ''}
    ${(c.filters || []).length ? `<div class="lhead"><span>${esc(t('jsFilters'))}</span></div><div class="card" style="margin-top:6px">${c.filters.map(f => `<div class="kv"><span>${esc(t('fl_' + f.type))} <small class="muted ltr">${esc(f.part_no || '')}</small></span><b>${esc(t('ac_' + (f.action || 'change')))}</b></div>`).join('')}</div>` : ''}
    ${c.diagnosis ? `<div class="lhead"><span>${esc(t('jsDiag'))}</span></div><div class="infobox" style="white-space:pre-wrap">${esc(c.diagnosis)}</div>` : ''}
    ${c.parts ? `<div class="lhead"><span>${esc(t('jsParts'))}</span></div><div class="infobox" style="white-space:pre-wrap">${esc(c.parts)}</div>` : ''}
    <button type="button" class="primary" id="jbPrintB">${esc(t('jbPrint'))}</button>
    ${ed ? `<div class="row2b"><button type="button" class="ghost" id="jbEditB">${esc(t('jbEdit'))}</button><button type="button" class="ghost" id="jbTogB">${esc(t(c.status === 'done' ? 'jbReopen' : 'jbMarkDone'))}</button></div>` : ''}
    ${canEdit() && fitsStock.length ? `<button type="button" class="ghost" id="jbIssueB">${esc(t('jbIssue'))}</button>` : ''}
    ${canAdmin() ? `<button type="button" class="ghost danger" id="jbDelB">${esc(t('jbDelete'))}</button>` : ''}`;
  Edit.open('🔧 ' + c.no, body, null);
  $('jbPrintB').onclick = () => printIn(() => jobPdf(c));
  if ($('jbEditB')) {
    $('jbEditB').onclick = () => jobSheet(c);
    $('jbTogB').onclick = async () => { busy($('jbTogB'), true);
      try { const done = c.status !== 'done'; const patch = { status: done ? 'done' : 'open' }; if (done && !c.out_on) { patch.out_on = dubaiToday() < c.in_on ? c.in_on : dubaiToday(); }
        const s = await repo.updJob(c.id, patch); const i = JB.rows.findIndex(x => x.id === c.id); if (i >= 0) JB.rows[i] = s; toast(t(done ? 'jbDoneT' : 'jbReopenT')); renderJobList(); openJob(c.id); }
      catch (e) { msg('editMsg', errText(e), 'err'); } finally { if ($('jbTogB')) busy($('jbTogB'), false); } };
  }
  if ($('jbIssueB')) $('jbIssueB').onclick = () => {
    const from = st && st.active ? st.id : mainStore()?.id;
    Edit.close(); startMove('issue', [...new Set(fitsStock.map(i => i.item_id))].map(id => ({ item_id: id, qty: '1' })), { from });
    if (c.plate && [...$('mvPlate').options].some(o => o.value === c.plate)) { $('mvPlate').value = c.plate; Picker.refresh($('mvPlate')); renderFits(); }
    $('mvRef').value = c.no; if (c.mechanic) $('mvParty').value = c.mechanic;
  };
  if ($('jbDelB')) { let armed = false; $('jbDelB').onclick = async () => {
    if (!armed) { armed = true; $('jbDelB').textContent = t('jbDelQ', { no: c.no }); return; }
    try { await repo.delJob(c.id); JB.rows = JB.rows.filter(x => x.id !== c.id); Edit.close(); toast(t('deleted')); renderJobList(); } catch (e) { msg('editMsg', errText(e), 'err'); } }; }
}

// THE MAINTENANCE TYPES AND THEIR CHANGE REMINDERS (25 Nov 2026). A type (ms_maint_types: «Quartz 20W-50 engine oil, 15 days») is
// picked on the job card; the server keeps one reminder per (card, type), due on the day out (or in) + its days, and closes an older
// one of the same part on the same vehicle as «renewed». The admins / managers / deputies see the due ones (the bell, «Reminders»),
// close or dismiss them, and get them on their phones every morning (Web Push: the Edge Function maint-push, pg_cron).
const addDays = (d, n) => { const [y, m, dd] = String(d).slice(0, 10).split('-').map(Number); return new Date(Date.UTC(y, m - 1, dd + Number(n || 0))).toISOString().slice(0, 10); };
const typeOf = id => TY.rows.find(x => x.id === id) || null;
const tyPartLbl = x => !x.part ? '' : t((x.kind === 'oil' ? 'o_' : 'fl_') + x.part);
const tyParts = k => k === 'oil' ? OILS.map(o => [o, t('o_' + o)]) : k === 'filter' ? JFILTERS.map(f => [f, t('fl_' + f)]) : [];
const partOpts = (k, cur) => `<option value="">${esc(t('tyPartAny'))}</option>` + tyParts(k).map(([v, l]) => `<option value="${v}" ${v === cur ? 'selected' : ''}>${esc(l)}</option>`).join('');
// a card's types with their next change: the reminder's day when it is known, else the day out (or in) + the type's days
const nextOf = c => (c?.maint_types || []).map(typeOf).filter(Boolean).map(x => ({ name: x.name, interval_days: x.interval_days,
  due: RM.rows.find(r => r.job_card_id === c.id && r.type_id === x.id)?.due_on || addDays(c.out_on || c.in_on, x.interval_days) }));
function maintChips(c, pre) {
  const on = c?.maint_types || pre?.maint_types || [];
  const list = TY.rows.filter(x => x.active || on.includes(x.id));
  if (!list.length) return TY.ok ? `<div class="hint">${esc(t('jfNoTypes'))}</div>` : '';
  return `<div class="hint">${esc(t('jfMaintHint'))}</div><div class="chips wrap" id="jfMaint">${list.map(x => `<button type="button" class="mtchip" data-v="${esc(x.id)}">${esc(x.name)}<small>${esc(t('tyEvery', { n: x.interval_days }))}</small></button>`).join('')}</div><div class="nextdue" id="jfNext"></div>`;
}
async function loadTypes() {
  const seq = ++TY.seq;
  try { const rows = await repo.maintTypes(); if (seq !== TY.seq) return; TY.rows = rows; TY.ok = true; TY.err = ''; }
  catch (e) { if (seq !== TY.seq) return; TY.ok = false; TY.err = errText(e); }
  TY.loaded = true;
  if (JB.pane === 'types' && $('scr-jobs').classList.contains('active')) renderTypes();
}
const tySort = () => TY.rows.sort((a, b) => a.kind.localeCompare(b.kind) || (a.sort || 0) - (b.sort || 0) || a.name.localeCompare(b.name));
function tyRow(x) {
  const it = x.item_id ? itemOf(x.item_id) : null;
  return `<div class="frow ty ${x.active ? '' : 'off'}" data-id="${esc(x.id)}"><div class="fb">
    <div class="fn">${esc(x.name)}</div>
    <div class="fs"><span class="kpill f">${esc(t('tk_' + x.kind))}</span>${x.part ? `<span class="kpill">${esc(tyPartLbl(x))}</span>` : ''}${it ? `<small class="muted ltr">${esc(it.code)}</small>` : ''}${x.active ? '' : `<span class="pill">${esc(t('tyStopped'))}</span>`}</div>
    ${x.note ? `<div class="fx">${esc(x.note)}</div>` : ''}</div>
    <div class="fa"><span class="pill ok">${esc(t('tyEvery', { n: x.interval_days }))}</span></div></div>`;
}
function renderTypes() {
  if (TY.err) { $('tyList').innerHTML = `<div class="msg err">${esc(TY.err)}</div>`; return; }
  const q = TY.q.trim(), rows = TY.rows.filter(x => qHit(q, x.name, t('tk_' + x.kind), tyPartLbl(x), x.note));
  $('tyList').innerHTML = rows.length ? rows.map(tyRow).join('') : `<div class="empty">${esc(t(TY.rows.length ? 'noMatch' : 'tyNone'))}</div>`;
}
function typeSheet(x) {
  if (!canAdmin()) return;
  const k = x?.kind || 'oil';
  const items = STOCK.filter(i => ['oil', 'filter'].includes(i.category) && (i.active || i.item_id === x?.item_id));
  const body = `<label for="tyName">${esc(t('tyName'))}</label><input id="tyName" maxlength="80" autocomplete="off" placeholder="${esc(t('tyNamePh'))}" value="${esc(x?.name || '')}">
    <div class="row"><div><label for="tyKind">${esc(t('tyKind'))}</label><select id="tyKind">${['oil', 'filter', 'service'].map(v => `<option value="${v}" ${v === k ? 'selected' : ''}>${esc(t('tk_' + v))}</option>`).join('')}</select></div>
      <div><label for="tyPart">${esc(t('tyPart'))}</label><select id="tyPart">${partOpts(k, x?.part)}</select></div></div>
    <div class="row"><div><label for="tyDays">${esc(t('tyDays'))}</label><input id="tyDays" class="ltr" inputmode="numeric" autocomplete="off" value="${esc(x?.interval_days ?? '')}"></div>
      <div><label for="tyItem">${esc(t('tyItem'))}<span class="opt-t">${esc(t('optional'))}</span></label><select id="tyItem"><option value="">${esc(t('tyItemNone'))}</option>${items.map(i => `<option value="${esc(i.item_id)}" ${i.item_id === x?.item_id ? 'selected' : ''}>${esc(i.code + ' — ' + i.name)}</option>`).join('')}</select></div></div>
    <label for="tyNote">${esc(t('tyNote'))}<span class="opt-t">${esc(t('optional'))}</span></label><input id="tyNote" maxlength="200" autocomplete="off" value="${esc(x?.note || '')}">
    ${x ? `<label class="chk"><input type="checkbox" id="tyActive" ${x.active ? 'checked' : ''}> ${esc(t('tyActiveL'))}</label><button type="button" class="ghost danger" id="tyDelB">${esc(t('tyDel'))}</button>` : ''}`;
  Edit.open(x ? t('tyEditT') : t('tyNewT'), body, async () => {
    const name = $('tyName').value.trim(); if (!name) throw new Error(t('errNameReq'));
    const days = qNum($('tyDays').value); if (!(Number.isInteger(days) && days >= 1 && days <= 3650)) throw new Error(t('errDays'));
    const row = { name, kind: $('tyKind').value, part: $('tyPart').value || null, interval_days: days, item_id: $('tyItem').value || null, note: $('tyNote').value.trim() || null };
    if (x) row.active = $('tyActive').checked;
    const saved = x ? await repo.updType(x.id, row) : await repo.addType(row);
    const i = TY.rows.findIndex(r => r.id === saved.id); if (i >= 0) TY.rows[i] = saved; else TY.rows.push(saved);
    tySort(); toast(t('tySaved')); renderTypes(); return false;
  });
  $('tyKind').onchange = () => { $('tyPart').innerHTML = partOpts($('tyKind').value); Picker.refresh($('tyPart')); };
  if ($('tyDelB')) { let armed = false; $('tyDelB').onclick = async () => {
    if (!armed) { armed = true; $('tyDelB').textContent = t('tyDelQ'); return; }
    try { await repo.delType(x.id); TY.rows = TY.rows.filter(r => r.id !== x.id); Edit.close(); toast(t('deleted')); renderTypes(); } catch (e) { msg('editMsg', errText(e), 'err'); } }; }
}
$('tySearch').oninput = e => { TY.q = e.target.value; renderTypes(); };
$('tyList').onclick = e => { const r = e.target.closest('.frow'); if (r && canAdmin()) typeSheet(typeOf(r.dataset.id)); };
$('btnTyNew').onclick = () => typeSheet(null);

// the reminders: due (today or late), coming, closed
const remKey = r => r.status !== 'open' ? 'closed' : r.days_left <= 0 ? 'due' : 'soon';
const remCls = r => r.status !== 'open' ? 'closed' : r.days_left < 0 ? 'late' : r.days_left === 0 ? 'today' : 'soon';
const remWhen = r => r.days_left < 0 ? t('remLate', { n: -r.days_left }) : r.days_left === 0 ? t('remToday') : t('remIn', { n: r.days_left });
const remSt = r => r.status === 'open' ? remWhen(r) : r.status === 'renewed' ? t('st_renewed', { no: r.closed_by_name || '' }) : t('st_' + r.status);
const remPill = r => `<span class="pill ${r.status !== 'open' ? '' : r.days_left < 0 ? 'late' : r.days_left === 0 ? 'warn' : 'ok'}">${esc(remSt(r))}</span>`;
const remRest = r => (r.label || '').split(' · ').filter(x => x && x !== r.plate).join(' · ');
async function loadRem() {
  const seq = ++RM.seq;
  try { const rows = await repo.reminders(true); if (seq !== RM.seq) return; RM.rows = rows; RM.err = ''; }
  catch (e) { if (seq !== RM.seq) return; RM.err = errText(e); }
  RM.loaded = true; updateBell();
  if (JB.pane === 'rem' && $('scr-jobs').classList.contains('active')) renderRem();
}
function updateBell() {
  const n = RM.err ? 0 : RM.rows.filter(r => remKey(r) === 'due').length;
  $('btnBell').classList.toggle('hidden', !(profile && canAdmin() && RM.loaded && !RM.err));
  $('bellN').textContent = n > 99 ? '99+' : String(n); $('bellN').classList.toggle('hidden', !n);
  $('remN').textContent = String(n); $('remN').classList.toggle('hidden', !n);
}
function remRow(r) {
  return `<div class="frow rem ${remCls(r)}" data-id="${esc(r.id)}"><div class="fb">
    <div class="fn">${esc(r.type_name)}</div>
    <div class="fs">${r.plate ? plateHtml(r.plate) : ''}<span>${esc(remRest(r))}</span></div>
    <div class="fx">${esc(t('remDueOn', { d: dSlash(r.due_on) }))} · ${esc(t('remDoneOn', { d: dSlash(r.done_on) }))} · <span class="ltr">${esc(r.job_no)}</span></div></div>
    <div class="fa">${remPill(r)}</div></div>`;
}
function renderRem() {
  const n = v => RM.rows.filter(r => remKey(r) === v).length;
  $('remShow').innerHTML = ['due', 'soon', 'closed'].map(v => `<button type="button" class="chip ${RM.show === v ? 'on' : ''}" data-v="${v}">${esc(t(v === 'due' ? 'remDue' : v === 'soon' ? 'remSoon' : 'remClosed'))} <small>${n(v)}</small></button>`).join('');
  if (RM.err) { $('remList').innerHTML = `<div class="msg err">${esc(RM.err)}</div>`; return; }
  const rows = RM.rows.filter(r => remKey(r) === RM.show);
  if (RM.show === 'closed') rows.sort((a, b) => String(b.closed_at || '').localeCompare(String(a.closed_at || '')));
  $('remList').innerHTML = rows.length ? rows.map(remRow).join('') : `<div class="empty">${esc(t('remNone'))}</div>`;
}
async function remSheet(id) {
  const r = RM.rows.find(x => x.id === id); if (!r) return;
  if (!JB.loaded) await loadJobs();
  const c = jobOf(r.job_card_id), st = storeOf(r.store_id);
  const kv = (k, v) => v ? `<div><small>${esc(t(k))}</small><b>${v}</b></div>` : '';
  const body = `<div class="fs" style="margin-bottom:8px">${remPill(r)}${r.status !== 'open' && r.closed_by_name && r.status !== 'renewed' ? `<span class="muted">${esc(r.closed_by_name)} · ${esc(fmtDT(r.closed_at))}</span>` : ''}</div>
    <div class="pinfo">${kv('remWhat', (r.plate ? plateHtml(r.plate) + ' ' : '') + esc(remRest(r)))}${kv('jfSite', st ? esc(storeLbl(st)) : '')}${kv('remJob', `<span class="ltr">${esc(r.job_no)}</span>`)}${kv('remType', esc(r.type_name))}</div>
    <div class="infobox">${esc(t('remDoneOn', { d: dSlash(r.done_on) }))} · ${esc(t('tyEvery', { n: r.interval_days }))}<br><b>${esc(t('remDueOn', { d: dSlash(r.due_on) }))}</b></div>
    ${c ? `<button type="button" class="ghost" id="remJobB">${esc(t('remOpenJob', { no: r.job_no }))}</button>` : ''}
    ${canJob() ? `<button type="button" class="${r.status === 'open' ? 'primary' : 'ghost'}" id="remNewB">${esc(t('remNewJob'))}</button>` : ''}
    ${canAdmin() ? (r.status === 'open' ? `<div class="row2b"><button type="button" class="ghost" id="remDoneB">${esc(t('remMarkDone'))}</button><button type="button" class="ghost danger" id="remDisB">${esc(t('remDismiss'))}</button></div>`
      : `<button type="button" class="ghost" id="remOpenB">${esc(t('remReopen'))}</button>`) : ''}`;
  Edit.open('🔔 ' + r.type_name, body, null);
  if ($('remJobB')) $('remJobB').onclick = () => openJob(c.id);
  if ($('remNewB')) $('remNewB').onclick = () => jobSheet(null, { plate: c?.plate ?? r.plate, make_model: c?.make_model, eq_type: c?.eq_type, driver: c?.driver, store_id: c?.store_id ?? r.store_id,
    site_equipment_id: c?.site_equipment_id ?? null, maint_types: [r.type_id] });
  const set = (id, s) => { if ($(id)) $(id).onclick = async () => { busy($(id), true);
    try { await repo.setReminder(r.id, s); await loadRem(); Edit.close(); toast(t('remSaved')); } catch (e) { msg('editMsg', errText(e), 'err'); } finally { if ($(id)) busy($(id), false); } }; };
  set('remDoneB', 'done'); set('remDisB', 'dismissed'); set('remOpenB', 'open');
}
$('remShow').onclick = e => { const b = e.target.closest('.chip'); if (!b) return; RM.show = b.dataset.v; renderRem(); };
$('remList').onclick = e => { const r = e.target.closest('.frow'); if (r) remSheet(r.dataset.id); };
const openReminders = () => { if (!profile || !can('jobs')) return; Edit.close(); JB.pane = 'rem'; RM.show = 'due'; RM.loaded = false; openTab('jobs', true); };
$('btnBell').onclick = openReminders;

// this phone's notifications (Web Push): on / off / a test — the admins, managers and deputies
const pushOK = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window && location.protocol.startsWith('http');
const b64u = s => { const b = atob((s + '='.repeat((4 - s.length % 4) % 4)).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(b, ch => ch.charCodeAt(0)); };
async function pushSub() {
  try { const reg = await Promise.race([navigator.serviceWorker.ready, new Promise(r => setTimeout(() => r(null), 4000))]);
    return { reg, sub: reg ? await reg.pushManager.getSubscription() : null }; } catch { return { reg: null, sub: null }; }
}
async function pushBox() {
  const box = $('pushBox'); if (!profile || !canAdmin()) { box.innerHTML = ''; return; }
  if (!pushOK()) { box.innerHTML = `<div class="pushbox"><small>${esc(t('pushNo'))}</small></div>`; return; }
  const { sub } = await pushSub();
  box.innerHTML = sub ? `<div class="pushbox"><b>${esc(t('pushIsOn'))}</b><button type="button" class="btn-sm" id="pushTestB">${esc(t('pushTest'))}</button><button type="button" class="btn-sm" id="pushOffB">${esc(t('pushOff'))}</button><small>${esc(t('pushHint'))}</small></div>`
    : `<div class="pushbox"><button type="button" class="primary" id="pushOnB">${esc(t('pushOn'))}</button><small>${esc(t(Notification.permission === 'denied' ? 'pushDenied' : 'pushHint'))}</small></div>`;
}
async function pushOn() {
  const perm = await Notification.requestPermission(); if (perm !== 'granted') throw new Error(t('pushDenied'));   // first, inside the tap
  const { reg } = await pushSub(); if (!reg) throw new Error(t('pushNo'));
  const { key } = await repo.push('key'); if (!key) throw new Error(t('errPush'));
  const sub = (await reg.pushManager.getSubscription()) || await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64u(key) });
  await repo.pushSave(sub.toJSON(), lang); toast(t('pushDone'));
}
async function pushOff() { const { sub } = await pushSub(); if (!sub) return; const ep = sub.endpoint; await sub.unsubscribe().catch(() => {}); await repo.pushDrop(ep).catch(() => {}); toast(t('pushOffT')); }
// on every sign-in: this phone, if on, is his (and in his language)
async function pushRefresh() { if (!canAdmin() || !pushOK() || Notification.permission !== 'granted') return; const { sub } = await pushSub(); if (sub) repo.pushSave(sub.toJSON(), lang).catch(() => {}); }
$('pushBox').onclick = async e => { const b = e.target.closest('button'); if (!b) return; busy(b, true);
  try { if (b.id === 'pushOnB') await pushOn(); else if (b.id === 'pushOffB') await pushOff(); else if (b.id === 'pushTestB') { const r = await repo.push('test'); toast(t('pushTestSent', { n: r.sent || 0 })); } }
  catch (er) { toast(errText(er)); } finally { busy(b, false); } if (b.id !== 'pushTestB') pushBox(); };

// the site equipment
function seRowsOf() {
  const q = SE.q.trim();
  return SE.rows.filter(r => (SE.site === 'all' || r.store_id === SE.site)
    && qHit(q, r.name, r.ref, r.remarks, r.received_by, r.tag ? t('tg_' + r.tag) : '', storeOf(r.store_id)?.name, storeOf(r.store_id)?.code));
}
const seSort = (a, b) => (a.store_id === b.store_id ? 0 : (storeOf(a.store_id)?.name || '').localeCompare(storeOf(b.store_id)?.name || '')) || String(b.sent_on || '').localeCompare(String(a.sent_on || '')) || (a.sort - b.sort);
const tagPill = g => g ? `<span class="kpill tg-${esc(g)}">${esc(t('tg_' + g))}</span>` : '';
function seRow(r) {
  return `<div class="frow se ${r.tag === 'returned' ? 'off' : ''}" data-id="${esc(r.id)}"><div class="fb">
    <div class="fn">${esc(r.name)} ${r.ref ? `<span class="rec">${esc(r.ref)}</span>` : ''}</div>
    <div class="fs">${tagPill(r.tag)}${r.section ? `<span class="kpill f">${esc(t('sec_' + r.section))}</span>` : ''}${r.sent_on ? `<span class="muted">${esc(dSlash(r.sent_on))}</span>` : ''}${r.received_by ? `<span class="muted">👤 ${esc(r.received_by)}</span>` : ''}</div>
    ${r.remarks ? `<div class="fx">${esc(r.remarks)}</div>` : ''}</div>
    <div class="fa"><span class="qty">${r.qty != null ? esc(fmtQ(r.qty)) : '—'}</span></div></div>`;
}
function renderSiteEq() {
  const sites = [...new Set(SE.rows.map(r => r.store_id))].map(storeOf).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name));
  if (SE.site !== 'all' && !sites.some(s => s.id === SE.site) && !storeOf(SE.site)) SE.site = 'all';
  const cnt = id => SE.rows.filter(r => id === 'all' || r.store_id === id).length;
  const chips = [{ id: 'all', name: t('seAll') }, ...sites, ...(SE.site !== 'all' && !sites.some(s => s.id === SE.site) ? [storeOf(SE.site)] : [])];
  $('seSites').innerHTML = chips.map(s => `<button type="button" class="chip ${SE.site === s.id ? 'on' : ''}" data-v="${esc(s.id)}">${esc(s.id === 'all' ? s.name : (s.code || s.name))} <small>${cnt(s.id)}</small></button>`).join('');
  $('btnSePdf').classList.toggle('hidden', SE.site === 'all');
  if (SE.err) { $('seList').innerHTML = `<div class="msg err">${esc(SE.err)}</div>`; return; }
  const rows = seRowsOf().sort(seSort), shown = rows.slice(0, SE.n);
  let last = null;
  $('seList').innerHTML = rows.length ? shown.map(r => { const s = storeOf(r.store_id);
      const hd = r.store_id !== last ? `<div class="lhead"><span>🏗 ${esc(s?.name || '—')} ${s?.code ? `<small class="muted ltr">${esc(s.code)}</small>` : ''}</span><span class="n">${esc(t('seLines', { n: rows.filter(x => x.store_id === r.store_id).length, u: fmtQ(rows.filter(x => x.store_id === r.store_id && x.tag !== 'returned').reduce((a, x) => a + Number(x.qty || 0), 0)) }))}</span></div>` : '';
      last = r.store_id; return hd + seRow(r); }).join('')
      + (rows.length > SE.n ? `<button type="button" class="ghost" id="seMore">${esc(t('moreN', { n: rows.length - SE.n }))}</button>` : '')
    : `<div class="empty">${esc(t(SE.rows.length ? 'noMatch' : 'seNone'))}</div>`;
}
$('seSites').onclick = e => { const b = e.target.closest('.chip'); if (!b) return; SE.site = b.dataset.v; SE.n = 120; renderSiteEq(); };
$('seSearch').oninput = e => { SE.q = e.target.value; SE.n = 120; renderSiteEq(); };
$('seList').onclick = e => { if (e.target.id === 'seMore') { SE.n += 200; renderSiteEq(); return; } const r = e.target.closest('.frow'); if (r) openSe(r.dataset.id); };
$('btnSeAdd').onclick = () => { if (canEdit()) seSheet(null); };
$('btnSePdf').onclick = () => { const site = SE.site; if (site !== 'all') printIn(() => sePdf(site)); };
function seFormHtml(r) {
  const cur = r?.store_id || (SE.site !== 'all' ? SE.site : '');
  const sites = STORES.filter(s => s.active || s.id === cur);
  const o = (list, v, pfx) => `<option value="">—</option>` + list.map(x => `<option value="${x}" ${x === v ? 'selected' : ''}>${esc(t(pfx + x))}</option>`).join('');
  return `<label for="seSite">${esc(t('jfSite'))}</label><select id="seSite"><option value="">—</option>${sites.map(s => `<option value="${esc(s.id)}" ${s.id === cur ? 'selected' : ''}>${esc(storeLbl(s))}${s.code ? ' — ' + esc(s.code) : ''}</option>`).join('')}</select>
    <label for="seName">${esc(t('seName'))}</label><input id="seName" maxlength="120" autocomplete="off" value="${esc(r?.name || '')}">
    <div class="row"><div><label for="seRef">${esc(t('seRef'))}<span class="opt-t">${esc(t('optional'))}</span></label><input id="seRef" class="ltr" maxlength="40" autocomplete="off" value="${esc(r?.ref || '')}"></div>
      <div><label for="seQty">${esc(t('seQty'))}</label><input id="seQty" class="ltr" inputmode="decimal" autocomplete="off" value="${r?.qty != null ? esc(r.qty) : '1'}"></div></div>
    <div class="row"><div><label for="seSent">${esc(t('seSentOn'))}</label><input id="seSent" type="date" max="${dubaiToday()}" value="${esc(r ? (r.sent_on || '') : dubaiToday())}"></div>
      <div><label for="seTag">${esc(t('seTag'))}</label><select id="seTag">${o(SETAGS, r?.tag || '', 'tg_')}</select></div></div>
    <div class="row"><div><label for="seSec">${esc(t('seSection'))}</label><select id="seSec">${o(['civil', 'mep'], r?.section || '', 'sec_')}</select></div>
      <div><label for="seRecv">${esc(t('seRecv'))}<span class="opt-t">${esc(t('optional'))}</span></label><input id="seRecv" maxlength="80" autocomplete="off" value="${esc(r?.received_by || '')}"></div></div>
    <label for="seRem">${esc(t('seRemarks'))}<span class="opt-t">${esc(t('optional'))}</span></label><input id="seRem" maxlength="200" autocomplete="off" value="${esc(r?.remarks || '')}">`;
}
function seSheet(r) {
  const extra = r ? `${canJob() ? `<button type="button" class="ghost" id="seJobB">${esc(t('seJob'))}</button>` : ''}${canAdmin() ? `<button type="button" class="ghost danger" id="seDelB">${esc(t('seDel'))}</button>` : ''}` : '';
  Edit.open(r ? t('seEditT') : t('seNewT'), seFormHtml(r) + extra, async () => {
    const site = $('seSite').value; if (!site) throw new Error(t('sePickSite'));
    const name = $('seName').value.trim(); if (!name) throw new Error(t('errNameReq'));
    const qs = $('seQty').value.trim(), qty = qs === '' ? null : qNum(qs); if (qs !== '' && !(qty >= 0)) throw new Error(t('errQty', { c: name }));
    const row = { store_id: site, name, ref: $('seRef').value.trim() || null, qty, sent_on: $('seSent').value || null, tag: $('seTag').value || null, section: $('seSec').value || null,
      received_by: $('seRecv').value.trim() || null, remarks: $('seRem').value.trim() || null };
    const saved = r ? await repo.updSiteEq(r.id, row) : await repo.addSiteEq({ ...row, sort: 900000 + SE.rows.length });
    const i = SE.rows.findIndex(x => x.id === saved.id); if (i >= 0) SE.rows[i] = saved; else SE.rows.push(saved);
    renderSiteEq(); toast(t('seSaved')); return false;
  });
  if ($('seJobB')) $('seJobB').onclick = () => seJob(r);
  if ($('seDelB')) { let armed = false; $('seDelB').onclick = async () => {
    if (!armed) { armed = true; $('seDelB').textContent = t('seDelQ'); return; }
    try { await repo.delSiteEq(r.id); SE.rows = SE.rows.filter(x => x.id !== r.id); Edit.close(); toast(t('deleted')); renderSiteEq(); } catch (e) { msg('editMsg', errText(e), 'err'); } }; }
}
const seJob = r => jobSheet(null, { site_equipment_id: r.id, store_id: r.store_id, eq_type: r.name, make_model: [r.name, r.ref].filter(Boolean).join(' ') });
function openSe(id) {
  const r = seOf(id); if (!r) return;
  if (canEdit()) return seSheet(r);
  const s = storeOf(r.store_id), kv = (k, v) => v ? `<div><small>${esc(t(k))}</small><b>${esc(v)}</b></div>` : '';
  Edit.open(r.name, `<div class="pinfo">${kv('jfSite', s ? storeLbl(s) : '')}${kv('seRef', r.ref)}${kv('seQty', r.qty != null ? fmtQ(r.qty) : '')}${kv('seSentOn', r.sent_on ? dSlash(r.sent_on) : '')}
      ${kv('seTag', r.tag ? t('tg_' + r.tag) : '')}${kv('seSection', r.section ? t('sec_' + r.section) : '')}${kv('seRecv', r.received_by)}</div>${r.remarks ? `<div class="infobox">${esc(r.remarks)}</div>` : ''}
    ${canJob() ? `<button type="button" class="primary" id="seJobB">${esc(t('seJob'))}</button>` : ''}`, null);
  if ($('seJobB')) $('seJobB').onclick = () => seJob(r);
}

/* ---------------- 9) المخازن والسجل ---------------- */
function storesSheet() {
  openSheet(false);
  // the warehouses only (a project is made, edited and closed on the projects screen); a store may become a project (🏗)
  const html = () => STORES.filter(s => !isProject(s)).map(s => `<div class="kv srow" data-id="${esc(s.id)}"><span>${esc(s.name)} ${s.kind === 'main' ? `<span class="pill ok">${esc(t('pjMain'))}</span>` : ''}${s.active ? '' : `<span class="pill mute">${esc(t('storeStopped'))}</span>`}</span>
    <span><button type="button" class="btn-sm sEdit">✎</button>${s.kind === 'main' ? '' : ` <button type="button" class="btn-sm sTog">${esc(t(s.active ? 'sStop' : 'sActivate'))}</button> <button type="button" class="btn-sm sProj" title="${esc(t('pjKind'))}">${esc(t('pjMakeProject'))}</button>`}</span></div>`).join('')
    + `<label for="sNew">${esc(t('storeName'))}</label><input id="sNew" maxlength="80" autocomplete="off">`;
  Edit.open(t('storesT'), html(), async () => { const n = $('sNew').value.trim(); if (!n) return false; await repo.addStore({ name: n, sort: 100 + STORES.length }); STORES = await repo.stores(); toast(t('storeSaved')); storesSheet(); return 'keep'; }, t('addStore'));
  $('editBody').onclick = async e => { const r = e.target.closest('.srow'); if (!r) return; const s = storeOf(r.dataset.id); if (!s) return;
    try {
      if (e.target.closest('.sTog')) { await repo.updStore(s.id, { active: !s.active }); }
      else if (e.target.closest('.sEdit')) { const n = prompt(t('storeName'), s.name); if (!n || !n.trim()) return; await repo.updStore(s.id, { name: n }); }
      else if (e.target.closest('.sProj')) { await repo.updStore(s.id, { kind: 'project', sort: 500 }); toast(t('pjMadeProject')); }
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
    $('editBody').innerHTML = rows.length ? rows.map(l => `<div class="lg"><div><b>${esc(t(l.action === 'add' ? 'lgAdd' : l.action === 'edit' ? 'lgEdit' : 'lgDelete'))} · ${esc(t('lg_' + l.tbl))}</b> — ${esc(l.snap?.name || l.snap?.plate || l.snap?.make_model || '')} <span class="muted ltr">${esc(l.snap?.code || l.snap?.no || '')}</span></div>
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

// «print» asks the paper's language (Arabic or English, the whole paper in it); the paper is built in that language and the page
// stays in its own. The window opens in the tap on the choice, so a phone does not take it for a pop-up.
let PRINT_LANG = (() => { try { return localStorage.getItem('printLang') || ''; } catch { return ''; } })();
function inLang(l, build) { const keep = lang; lang = I18N[l] ? l : keep; try { return build(); } finally { lang = keep; } }
function printIn(build) {
  const sel = $('printLang'); sel.value = I18N[PRINT_LANG] ? PRINT_LANG : lang;
  sel.onchange = () => { PRINT_LANG = sel.value; try { localStorage.setItem('printLang', PRINT_LANG); } catch { /* remembered for this visit only */ } inLang(sel.value, build); };
  sel._title = 'printLangT'; Picker.open(sel);
}
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
const ppBand = (title, sub, noK, noV) => `<div class="band"><img src="logo.png" alt="Orion"><div class="bt"><span class="tag">${esc(t('ppKick'))}</span><h1>${esc(title)}</h1><div class="co">${esc(sub)}</div></div>${noV != null ? `<div class="no"><small>${esc(noK)}</small><b>${esc(noV)}</b></div>` : ''}</div>`;
const nowTxt = () => { const d = new Date(); return `${dSlash(d.toLocaleDateString('en-CA'))} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };
const ppFoot = () => `<div class="foot"><span>${esc(CO)}</span><span>${esc(t('printed'))} <span dir="ltr">${nowTxt()}</span> · ${esc(profile?.name || '')}</span></div>`;
const paperDoc = (title, css = MS_CSS) => `<!doctype html><html lang="${lang}" dir="${I18N[lang].dir}"><head><meta charset="utf-8"><base href="${esc(location.href)}"><title>${esc(title)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&family=Tajawal:wght@400;500;700&family=Poppins:wght@700;800&display=swap" rel="stylesheet">
  <style>@page{size:A4 portrait;margin:6mm}html,body{background:#fff}body{margin:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  @media screen{body{padding:14px;max-width:210mm;margin:0 auto}}
  .hint{background:#F4F9E8;border:1px solid #CFE3A6;color:#365314;padding:8px 10px;border-radius:10px;margin-bottom:12px;font:500 11px Tajawal,Arial,sans-serif}@media print{.hint{display:none}}
  ${css}</style></head><body><div class="hint">${esc(t('printHint'))}</div>`;
function movePdf(m) {
  const ls = m.lines || [], adj = m.kind === 'adjust';
  const meta = [[t('thDate'), dSlash(m.moved_on)], [t(m.kind === 'transfer' ? 'mvFrom' : 'mvStore'), storeName(m.store_id)], m.to_store_id ? [t('mvTo'), storeName(m.to_store_id)] : null,
    m.plate ? [t('mvPlate'), m.plate] : null, m.party ? [t(m.kind === 'receive' ? 'mvPartyReceive' : m.kind === 'return' ? 'mvPartyReturn' : 'mvPartyIssue'), m.party] : null,
    m.ref_no ? [t(m.kind === 'receive' ? 'mvRefReceive' : m.kind === 'issue' ? 'mvRefIssue' : 'mvRefOther'), m.ref_no] : null, [t('thBy'), m.by_name || '']].filter(Boolean);
  const rt = m.kind === 'transfer' ? routeOf(m.store_id, m.to_store_id) : null;
  const html = paperDoc(m.no) + `<div class="pp">${ppBand(t('ppMove', { k: rt ? t('r_' + rt) : t('k_' + m.kind) }) + (m.status === 'void' ? ' — ' + t('voidB') : ''), CO, t('thNo'), m.no)}
    <div class="meta">${meta.map(([k, v]) => `<div><small>${esc(k)}</small><b>${esc(v)}</b></div>`).join('')}</div>${m.note ? `<p>${esc(m.note)}</p>` : ''}
    <table class="${m.status === 'void' ? 'void' : ''}"><thead><tr><th>#</th><th>${esc(t('thCode'))}</th><th>${esc(t('thItem'))}</th>${adj ? `<th class="num">${esc(t('countedL'))}</th>` : ''}<th class="num">${esc(t('thQty'))}</th><th>${esc(t('thUnit'))}</th></tr></thead>
    <tbody>${ls.map((l, ix) => `<tr><td>${ix + 1}</td><td class="ltr">${esc(l.code)}</td><td>${esc(l.name)}</td>${adj ? `<td class="num">${esc(fmtQ(l.counted))}</td>` : ''}<td class="num ${Number(l.qty) < 0 ? 'neg' : 'pos'}">${adj && Number(l.qty) > 0 ? '+' : ''}${esc(fmtQ(adj ? l.qty : Math.abs(l.qty)))}</td><td>${esc(unitLbl(l.unit))}</td></tr>`).join('')}</tbody></table>
    <div class="sigs"><div class="sig"><small>${esc(t('sigStore'))}</small><b>${esc(m.by_name || '')}</b><i></i></div><div class="sig"><small>${esc(t('sigRecv'))}</small><b>${esc(m.party || '')}&nbsp;</b><i></i></div><div class="sig"><small>${esc(t('sigApprove'))}</small><b>&nbsp;</b><i></i></div></div>
    ${ppFoot()}</div>` + printEnd();
  openPrint(html);
}
$('btnSkPdf').onclick = () => printIn(() => stockPdf(SK.store, stockRows()));
// the stock paper of a store (or of all of them): the rows given, by category, a blank column to count on
function stockPdf(st, rows) {
  const html = paperDoc(t('ppStock')) + `<div class="pp">${ppBand(t('ppStock'), (st === 'all' ? t('allStores') : storeName(st) + (storeOf(st)?.code ? ' (' + storeOf(st).code + ')' : '')) + ' · ' + CO, t('thDate'), dSlash(dubaiToday()))}
    <div class="cards"><div class="card"><div class="k">${esc(t('ppItems'))}</div><div class="v">${fmtInt(rows.length)}</div></div><div class="card"><div class="k">${esc(t('ppUnits'))}</div><div class="v">${fmtInt(rows.filter(i => qtyIn(i, st) > 0).length)}</div></div><div class="card"><div class="k">${esc(t('ppLow'))}</div><div class="v">${fmtInt(rows.filter(i => i.low).length)}</div></div></div>
    <table><thead><tr><th>${esc(t('thCode'))}</th><th>${esc(t('thItem'))}</th><th>${esc(t('thShelf'))}</th><th class="num">${esc(t('thQty'))}</th><th>${esc(t('thUnit'))}</th><th class="num">${esc(t('countedL'))}</th></tr></thead>
    <tbody>${CATS.map(c => { const g = rows.filter(i => i.category === c); return g.length ? `<tr class="grp"><td colspan="6">${esc(t('c_' + c))} (${g.length})</td></tr>` + g.map(i => `<tr><td class="ltr">${esc(i.code)}</td><td>${esc(i.name)}</td><td>${esc(i.shelf || '')}</td><td class="num">${esc(fmtQ(qtyIn(i, st)))}</td><td>${esc(unitLbl(i.unit))}</td><td class="num"><span class="blank"></span></td></tr>`).join('') : ''; }).join('')}</tbody></table>
    <div class="sigs"><div class="sig"><small>${esc(t('sigStore'))}</small><b>&nbsp;</b><i></i></div><div class="sig"><small>${esc(t('sigApprove'))}</small><b>&nbsp;</b><i></i></div></div>${ppFoot()}</div>` + printEnd();
  openPrint(html);
}
$('btnHsPdf').onclick = () => printIn(movesPdf);
function movesPdf() {
  const rows = moveRows();
  const html = paperDoc(t('ppMoves')) + `<div class="pp">${ppBand(t('ppMoves'), CO, t('thDate'), t('ppPeriod', { a: dSlash(HS.from), b: dSlash(HS.to) }))}
    <table><thead><tr><th>${esc(t('thNo'))}</th><th>${esc(t('thDate'))}</th><th>${esc(t('thKind'))}</th><th>${esc(t('thTo'))}</th><th>${esc(t('thItem'))}</th><th class="num">${esc(t('thQty'))}</th><th>${esc(t('thBy'))}</th></tr></thead>
    <tbody>${rows.map(m => (m.lines || []).map((l, ix) => `<tr class="${m.status === 'void' ? 'void' : ''}">${ix ? '<td></td><td></td><td></td><td></td>' : `<td class="ltr">${esc(m.no)}</td><td>${esc(dSlash(m.moved_on))}</td><td>${esc(t('k_' + m.kind))}</td><td>${esc([m.plate, m.party, m.to_store_id ? storeName(m.to_store_id) : ''].filter(Boolean).join(' · '))}</td>`}<td>${esc(l.name)}</td><td class="num ${Number(l.qty) < 0 ? 'neg' : 'pos'}">${Number(l.qty) > 0 ? '+' : ''}${esc(fmtQ(l.qty))}</td><td>${ix ? '' : esc(m.by_name || '')}</td></tr>`).join('')).join('')}</tbody></table>${ppFoot()}</div>` + printEnd();
  openPrint(html);
}

// THE JOB CARD'S PAPER — Orion's own: an oil-black head on a hazard stripe, the card number on lime, numbered sections, every label in
// both languages (the workshop reads both), the fuel as a gauge, the checks as ticks, the oils and the filters side by side.
const JC_CSS = `@page{size:A4 portrait;margin:11mm 12mm}@media screen{.jc{padding:11mm 12mm}}
.jc{--k:#0D0F0C;--l:#A3E635;--ld:#4D7C0F;--g:#F4F6F0;--ln:#D9DED2;--mu:#5B6356;font:10.5px/1.4 Tajawal,Arial,sans-serif;color:#111;position:relative}
.jc *{box-sizing:border-box}.jc .ltr{direction:ltr;unicode-bidi:isolate}
.jc .l2{display:block;font:700 8px Poppins,Arial,sans-serif;letter-spacing:.4px;color:var(--mu);text-transform:uppercase}
.jc .hd{display:grid;grid-template-columns:auto 1fr auto;background:var(--k);color:#fff;border-radius:14px;overflow:hidden;position:relative}
.jc .hd::after{content:"";position:absolute;inset:auto 0 0 0;height:6px;background:repeating-linear-gradient(135deg,var(--l) 0 10px,var(--k) 10px 20px)}
.jc .hd .lg{padding:12px 16px 18px;display:flex;align-items:center;border-inline-end:1px solid rgba(255,255,255,.14)}.jc .hd .lg img{height:34px;filter:brightness(0) invert(1)}
.jc .hd .tt{padding:11px 16px 20px}.jc .hd .tt .k{font:800 8.5px Poppins,Arial,sans-serif;letter-spacing:2.5px;color:var(--l)}
.jc .hd .tt h1{margin:1px 0 0;font:900 19px Cairo,Arial,sans-serif;line-height:1.2}.jc .hd .tt .s{font-size:9.5px;opacity:.8}.jc .hd .tt .l2{color:rgba(255,255,255,.6)}
.jc .hd .no{background:var(--l);color:var(--k);padding:10px 18px 18px;display:flex;flex-direction:column;justify-content:center;align-items:center;min-width:132px}
.jc .hd .no small{font:800 8px Poppins,Arial,sans-serif;letter-spacing:1.5px}.jc .hd .no b{font:900 19px Poppins,Arial,sans-serif;direction:ltr}
.jc .hd .no i{font-style:normal;margin-top:4px;font:800 9px Cairo,Arial,sans-serif;background:var(--k);color:var(--l);padding:1px 10px;border-radius:999px}
.jc .strip{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;margin:8px 0 0}
.jc .tile{border:1px solid var(--ln);border-top:3px solid var(--k);border-radius:9px;padding:4px 8px 5px;background:var(--g);min-width:0}
.jc .tile small{display:block;font:800 9px Cairo,Arial,sans-serif;color:var(--mu)}.jc .tile b{display:block;font:900 11.5px Cairo,Arial,sans-serif;overflow-wrap:anywhere}
.jc .sec{display:flex;align-items:center;gap:8px;margin:8px 0 5px;break-after:avoid}
.jc .sec .n{flex:0 0 auto;width:23px;height:23px;border-radius:7px;background:var(--k);color:var(--l);font:900 10.5px Poppins,Arial,sans-serif;display:grid;place-items:center}
.jc .sec .t{display:flex;align-items:baseline;gap:7px;flex:0 0 auto}.jc .sec .t b{font:900 12.5px Cairo,Arial,sans-serif}.jc .sec .t .l2{display:inline}
.jc .sec::after{content:"";flex:1;height:1.5px;background:var(--ln)}
.jc .g4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px 12px}
.jc .kv{border-bottom:1px dashed var(--ln);padding:2px 1px 4px;min-width:0}.jc .kv small{display:block;color:var(--mu);font-size:8.5px}.jc .kv b{font:800 11.5px Cairo,Arial,sans-serif;overflow-wrap:anywhere}
.jc .plate{display:inline-block;border:2px solid #111;border-radius:6px;padding:0 8px;font:800 12px Poppins,Arial,sans-serif;direction:ltr;background:#fff;letter-spacing:.5px}
.jc .cond{display:grid;grid-template-columns:150px 1fr;gap:12px;align-items:start}
.jc .gauge{border:1px solid var(--ln);border-radius:10px;padding:6px 8px;background:var(--g)}.jc .gauge small{font:800 9px Cairo,Arial,sans-serif;color:var(--mu)}
.jc .bars{display:flex;gap:3px;margin-top:5px;direction:ltr}.jc .bars span{flex:1;height:16px;border-radius:3px;background:#E3E6DE;border:1px solid #CFD5C7}
.jc .bars span.on{background:var(--l);border-color:var(--ld)}.jc .bars span.on.lo{background:#F59E0B;border-color:#B45309}
.jc .ticks{display:flex;justify-content:space-between;direction:ltr;font:800 8.5px Poppins,Arial,sans-serif;color:var(--mu);margin-top:2px}
.jc .cks{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px}
.jc .ck{display:flex;align-items:center;gap:6px;border:1px solid var(--ln);border-radius:8px;padding:3px 6px;font-size:9.5px;min-width:0}
.jc .ck i{flex:0 0 auto;width:15px;height:15px;border-radius:4px;display:grid;place-items:center;font-style:normal;font-weight:900;font-size:10px;border:1.5px solid #A8AFA0;color:#A8AFA0}
.jc .ck.ok i{background:#15803D;border-color:#15803D;color:#fff}.jc .ck.bad i{background:#B91C1C;border-color:#B91C1C;color:#fff}.jc .ck.bad{border-color:#FCA5A5;background:#FEF2F2}
.jc .two{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.jc table{width:100%;border-collapse:separate;border-spacing:0;border:1px solid var(--ln);border-radius:10px;overflow:hidden}
.jc th{background:var(--k);color:#fff;font:800 9px Cairo,Arial,sans-serif;padding:4px 6px;text-align:start}.jc th .l2{color:rgba(255,255,255,.55);font-size:7px}
.jc td{padding:3px 6px;border-top:1px solid var(--ln);font-size:10px;vertical-align:middle}.jc td .l2{font-size:7px}
.jc td.q{direction:ltr;text-align:center;font:800 11px Poppins,Arial,sans-serif;white-space:nowrap}.jc tr.off td{color:#A3A99B}.jc tr.off td .l2{color:#C3C8BC}
.jc .act{display:inline-block;padding:1px 8px;border-radius:999px;font:800 8.5px Cairo,Arial,sans-serif;background:#fff;border:1px solid var(--ln);color:var(--mu)}
.jc .act.change{background:var(--l);border-color:var(--ld);color:var(--k)}.jc .act.clean{background:#E0F2FE;border-color:#7DD3FC;color:#075985}
.jc .works{display:flex;flex-wrap:wrap;gap:6px}
.jc .wk{display:flex;align-items:center;gap:6px;padding:4px 11px 4px 9px;border-radius:999px;border:1.5px solid var(--ln);font:800 10px Cairo,Arial,sans-serif;color:var(--mu)}
.jc .wk i{width:11px;height:11px;border-radius:50%;border:1.5px solid currentColor}.jc .wk .l2{display:inline;font-size:7.5px}
.jc .wk.on{background:var(--k);border-color:var(--k);color:#fff}.jc .wk.on i{background:var(--l);border-color:var(--l)}.jc .wk.on .l2{color:rgba(255,255,255,.6)}
.jc .box{border:1px solid var(--ln);border-radius:10px;padding:5px 8px;min-height:50px;white-space:pre-wrap;overflow-wrap:anywhere;line-height:18px;background:repeating-linear-gradient(transparent 0 17px,#ECEFE7 17px 18px)}
.jc .box .bh{display:block;font:900 10.5px Cairo,Arial,sans-serif;line-height:1.3;margin-bottom:2px}
.jc .sigs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.jc .sg{border:1px solid var(--ln);border-radius:10px;padding:5px 8px 6px 12px;position:relative;overflow:hidden}
.jc .sg::before{content:"";position:absolute;top:0;bottom:0;inset-inline-start:0;width:4px;background:var(--l)}
.jc .sg small{font:800 9px Cairo,Arial,sans-serif;color:var(--mu)}.jc .sg b{display:block;font:900 11px Cairo,Arial,sans-serif;min-height:16px}
.jc .sg .ln{display:flex;gap:10px;margin-top:12px;font-size:8px;color:var(--mu)}.jc .sg .ln span{flex:1;border-top:1px solid #9CA39A;padding-top:2px}
.jc .pol{margin-top:8px;padding:6px 10px;border-radius:10px;background:var(--g);border-inline-start:4px solid var(--k);font-size:9px;line-height:1.5}
.jc .pol b{font:900 10px Cairo,Arial,sans-serif}.jc .pol ol{margin:2px 0 0;padding-inline-start:16px}
.jc .ft{display:flex;justify-content:space-between;gap:10px;margin-top:8px;padding-top:5px;border-top:2px solid var(--k);font-size:8.5px;color:var(--mu)}.jc .ft b{color:#111}
.jc .stamp{position:absolute;top:96px;inset-inline-end:150px;transform:rotate(-9deg);border:2.5px solid #15803D;color:#15803D;font:900 13px Poppins,Arial,sans-serif;padding:1px 10px;border-radius:8px;letter-spacing:2px;opacity:.85;background:rgba(255,255,255,.7)}`;
// every paper is in ONE language, the one picked at «print» (printIn): no second line in the other one
const L2 = k => esc(t(k));
function jobPdf(c) {
  const st = storeOf(c.store_id), se = seOf(c.site_equipment_id);
  const oil = o => (c.oils || []).find(x => x.type === o), flt = f => (c.filters || []).find(x => x.type === f);
  const tile = (k, v) => `<div class="tile"><small>${esc(t(k))}</small><b>${v || '—'}</b></div>`;
  const kv = (k, v) => `<div class="kv"><small>${esc(t(k))}</small><b>${v || '&nbsp;'}</b></div>`;
  const sec = (n, k) => `<div class="sec"><span class="n">${String(n).padStart(2, '0')}</span><span class="t"><b>${esc(t(k))}</b></span></div>`;
  const when = (d, tm) => d ? `<span class="ltr">${esc(dSlash(d))}${tm ? ' · ' + esc(hhmm(tm)) : ''}</span>` : '';
  const fuel = c.fuel == null ? -1 : FUELS.indexOf(c.fuel);
  const html = paperDoc(c.no, JC_CSS) + `<div class="jc">
    <div class="hd"><div class="lg"><img src="logo.png" alt="Orion"></div>
      <div class="tt"><div class="k">${esc(t('jcKick'))}</div><h1>${esc(t('ppJob'))}</h1><div class="s">${esc(t('ppJobSub'))} — ${esc(CO)}</div></div>
      <div class="no"><small>${esc(t('ppJobNo'))}</small><b>${esc(c.no)}</b><i>${esc(t(c.status === 'done' ? 'jbStDone' : 'jbStOpen'))}</i></div></div>
    ${c.status === 'done' ? `<div class="stamp">${esc(t('jcDone'))}</div>` : ''}
    <div class="strip">${tile('jfInOn', when(c.in_on, c.in_time))}${tile('jfOutOn', when(c.out_on, c.out_time))}${tile('jfSite', st ? esc(st.name) + (st.code ? ` <span class="ltr">(${esc(st.code)})</span>` : '') : esc(t('jfNoSite').replace(/—/g, '').trim()))}
      ${tile('jfReading', c.reading != null ? `<span class="ltr">${esc(fmtQ(c.reading))}</span> ${esc(t('ru_' + (c.reading_unit || 'km')))}` : '')}${tile('jfDriver', esc(c.driver || ''))}</div>
    ${sec(1, 'jsVehicle')}
    <div class="g4">${kv('jfPlate', c.plate ? `<span class="plate">${esc(c.plate)}</span>` : '')}${kv('jfMake', esc(c.make_model || ''))}${kv('jfType', esc(c.eq_type || ''))}${kv('seName', se ? esc([se.name, se.ref].filter(Boolean).join(' · ')) : '')}</div>
    ${sec(2, 'jsCond')}
    <div class="cond"><div class="gauge"><small>${L2('jfFuel')}</small><div class="bars">${FUELS.map((f, i) => `<span class="${i <= fuel && fuel >= 0 ? 'on' : ''} ${fuel === 0 ? 'lo' : ''}"></span>`).join('')}</div><div class="ticks">${FUELS.map(f => `<span>${fuelLbl(f)}</span>`).join('')}</div></div>
      <div class="cks">${CHECKS.map(k => { const s = (c.checks || {})[k]; return `<div class="ck ${s || ''}"><i>${s === 'ok' ? '✓' : s === 'bad' ? '✗' : ''}</i><span>${L2('ck_' + k)}</span></div>`; }).join('')}</div></div>
    <div class="two"><div>${sec(3, 'jsOils')}
      <table><thead><tr><th>${L2('thOil')}</th><th>${L2('jfLitres')}</th><th>${L2('jfNote')}</th></tr></thead><tbody>${OILS.map(o => { const x = oil(o); return `<tr class="${x ? '' : 'off'}"><td>${L2('o_' + o)}</td><td class="q">${x && x.qty != null ? esc(fmtQ(x.qty)) : '—'}</td><td>${esc(x?.note || '')}</td></tr>`; }).join('')}</tbody></table></div>
      <div>${sec(4, 'jsFilters')}
      <table><thead><tr><th>${L2('thFilter')}</th><th>${L2('jfPartNo')}</th><th>${L2('jfAction')}</th></tr></thead><tbody>${JFILTERS.map(f => { const x = flt(f); return `<tr class="${x ? '' : 'off'}"><td>${L2('fl_' + f)}</td><td class="q">${esc(x?.part_no || (x ? '' : '—'))}</td><td>${x ? `<span class="act ${esc(x.action || 'change')}">${esc(t('ac_' + (x.action || 'change')))}</span>` : ''}</td></tr>`; }).join('')}</tbody></table></div></div>
    ${sec(5, 'jsWork')}
    <div class="works">${WORKS.map(w => `<span class="wk ${(c.work || []).includes(w) ? 'on' : ''}"><i></i>${esc(t('w_' + w))}</span>`).join('')}</div>
    ${nextOf(c).length ? `<div class="box" style="min-height:0;margin-top:6px"><span class="bh">${L2('ppNext')}</span>${nextOf(c).map(x => `${esc(x.name)} — <span class="ltr">${esc(dSlash(x.due))}</span>`).join(' · ')}</div>` : ''}
    ${sec(6, 'jsDiag')}
    <div class="two"><div class="box"><span class="bh">${L2('jsDiag')}</span><span dir="auto">${esc(c.diagnosis || '')}</span></div><div class="box"><span class="bh">${L2('jsParts')}</span><span dir="auto">${esc(c.parts || '')}</span></div></div>
    ${sec(7, 'jsSign')}
    <div class="sigs">${[['jfMech', c.mechanic], ['jfFleet', c.fleet_officer], ['jfSup', c.supervisor]].map(([k, v]) => `<div class="sg"><small>${L2(k)}</small><b>${esc(v || '')}</b><div class="ln"><span>${esc(t('sigSign'))}</span><span>${esc(t('sigDate'))}</span></div></div>`).join('')}</div>
    ${c.final_notes ? `${sec(8, 'jsNotes')}<div class="box" style="min-height:0" dir="auto">${esc(c.final_notes)}</div>` : ''}
    <div class="pol"><b>${esc(t('policyT'))}</b><ol><li>${esc(t('pol1'))}</li><li>${esc(t('pol2'))}</li><li>${esc(t('pol3'))}</li></ol></div>
    <div class="ft"><span><b>${esc(CO)}</b> · ${esc(t('ppJob'))} <span class="ltr">${esc(c.no)}</span></span><span>${esc(t('jbBy', { n: c.created_by_name || '', d: dSlash(String(c.created_at || '').slice(0, 10)) }))} · ${esc(t('printed'))} <span class="ltr">${nowTxt()}</span> · ${esc(profile?.name || '')}</span></div>
  </div>` + printEnd();
  openPrint(html);
}
// the site's equipment, the sheet the owner keeps — by section, the newest first
function sePdf(site) {
  const s = storeOf(site), rows = SE.rows.filter(r => r.store_id === site).sort(seSort);
  const live = rows.filter(r => r.tag !== 'returned'), units = live.reduce((a, r) => a + Number(r.qty || 0), 0);
  const groups = [['civil', rows.filter(r => r.section === 'civil')], ['mep', rows.filter(r => r.section === 'mep')], [null, rows.filter(r => !r.section)]].filter(([, g]) => g.length);
  const html = paperDoc(t('ppSiteEq')) + `<div class="pp">${ppBand(t('ppSiteEq'), (s ? s.name + (s.code ? ' (' + s.code + ')' : '') : '') + ' · ' + CO, t('thDate'), dSlash(dubaiToday()))}
    <div class="cards"><div class="card"><div class="k">${esc(t('seName'))}</div><div class="v">${fmtInt(rows.length)}</div></div><div class="card"><div class="k">${esc(t('seQty'))}</div><div class="v">${fmtQ(units)}</div></div><div class="card"><div class="k">${esc(t('tg_returned'))}</div><div class="v">${fmtInt(rows.length - live.length)}</div></div></div>
    <table><thead><tr><th>#</th><th>${esc(t('seName'))}</th><th>${esc(t('thRef'))}</th><th class="num">${esc(t('seQty'))}</th><th>${esc(t('seSentOn'))}</th><th>${esc(t('seTag'))}</th><th>${esc(t('thRecv'))}</th><th>${esc(t('thRemarks'))}</th></tr></thead>
    <tbody>${groups.map(([sec, g]) => (groups.length > 1 || sec ? `<tr class="grp"><td colspan="8">${esc(sec ? t('sec_' + sec) : '—')} (${g.length})</td></tr>` : '') + g.map((r, i) => `<tr class="${r.tag === 'returned' ? 'void' : ''}"><td>${i + 1}</td><td>${esc(r.name)}</td><td class="ltr">${esc(r.ref || '')}</td><td class="num">${r.qty != null ? esc(fmtQ(r.qty)) : ''}</td><td>${esc(r.sent_on ? dSlash(r.sent_on) : '')}</td><td>${esc(r.tag ? t('tg_' + r.tag) : '')}</td><td>${esc(r.received_by || '')}</td><td>${esc(r.remarks || '')}</td></tr>`).join('')).join('')}</tbody></table>
    <div class="sigs"><div class="sig"><small>${esc(t('sigStore'))}</small><b>&nbsp;</b><i></i></div><div class="sig"><small>${esc(t('sigApprove'))}</small><b>&nbsp;</b><i></i></div></div>${ppFoot()}</div>` + printEnd();
  openPrint(html);
}

/* ---------------- 10b) المستخدمون (admin only) ---------------- */
// Accounts are made, changed and removed by the Edge Function admin-users (service role); the list is ms_user_list() (admin only).
// A username is the login: username@USER_DOMAIN. The function refuses deleting / stopping / demoting oneself and the last active admin.
const US = { rows: [], q: '', role: 'all', del: null, seq: 0 };
const normUser = u => String(u || '').trim().toLowerCase().replace(/\s+/g, '').replace(/^@/, '').replace(/@.*$/, '');
const userOk = u => /^[a-z0-9][a-z0-9._-]{1,31}$/.test(u);
const genPass = () => { const a = 'abcdefghjkmnpqrstuvwxyz', d = '23456789', r = n => { const b = new Uint32Array(1); crypto.getRandomValues(b); return b[0] % n; };
  let s = ''; for (let i = 0; i < 6; i++) s += a[r(a.length)]; for (let i = 0; i < 4; i++) s += d[r(d.length)]; return s.charAt(0).toUpperCase() + s.slice(1); };
const usErr = e => { const m = String(e?.message ?? e ?? '');
  const M = { USERNAME_TAKEN: 'errUserTaken', USERNAME_INVALID: 'errUserBad', PASSWORD_WEAK: 'errPassWeak', LAST_ADMIN: 'errLastAdmin', SELF: 'errSelf', ADMIN_ONLY: 'errAdminOnly', MANAGER_ONLY: 'errManagerOnly', FN_MISSING: 'errFnMissing', ROLE_INVALID: 'errForbidden', NAME_REQUIRED: 'errNameReq' };
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
  const q = US.q.trim();
  const rows = US.rows.filter(u => (US.role === 'all' || (US.role === 'stopped' ? !u.active : u.role === US.role)) && qHit(q, u.name, u.username, t(u.role)));
  $('usList').innerHTML = rows.length ? rows.map(u => { const me = u.id === userId;
    return `<div class="frow ${u.active ? '' : 'off'}" data-id="${esc(u.id)}"><div class="fb" data-act="edit"><div class="fn">${esc(u.name || '—')}${me ? ` <span class="pill mute">${esc(t('usYou'))}</span>` : ''}</div>
      <div class="fs"><span class="pill ${u.role === 'admin' ? 'err' : u.role === 'manager' || u.role === 'deputy' ? 'warn' : u.role === 'storekeeper' ? 'ok' : 'mute'}">${esc(t(u.role))}</span>${u.active ? '' : `<span class="pill mute">⏸ ${esc(t('usStopped'))}</span>`}<span class="ltr muted">${esc(u.username || '')}</span></div>
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
  const u = US.rows.find(x => x.id === row.dataset.id); if (!u) return; if (!canTouch(u)) { toast(lockedMsg(u)); return; }
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
  else if (id === 'moves') renderMoves(); else if (id === 'filters') renderFilters(); else if (id === 'users') loadUsers(); else if (id === 'projects') { PJ.loaded = false; renderProjects(); }
  else if (id === 'jobs') { if (!keep) { JB.loaded = false; SE.loaded = false; RM.loaded = false; TY.loaded = false; } renderJobs(); }
}
async function rerender() { const a = document.querySelector('.screen.active'); const id = a ? a.id.replace('scr-', '') : 'stock';
  if (id === 'stock') renderStock(); else if (id === 'move') renderMove(); else if (id === 'moves') await renderMoves(); else if (id === 'filters') renderFilters(); else if (id === 'users') renderUsers(); else if (id === 'projects') renderProjects(); else if (id === 'jobs') renderJobs(); }
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
  const q = new URLSearchParams(location.search), tab = q.get('tab'), pane = q.get('pane');
  if (tab === 'jobs' && ['cards', 'rem', 'types', 'equip'].includes(pane)) JB.pane = pane;
  if (canAdmin()) { loadRem(); pushRefresh(); }
  openTab(tab && can(tab) ? tab : 'stock');
  if (tab) history.replaceState(null, '', location.pathname);
}
function leave() {
  bootSeq++; HS.seq++; profile = null; userId = null; loaded = false; STORES = []; STOCK = []; EQUIP = []; FITS = []; PLATES = [];
  Object.assign(SK, { store: 'all', cat: 'all', q: '', n: 80 }); Object.assign(MV, { kind: 'issue', lines: [] }); Object.assign(HS, { from: '', to: '', kind: 'all', store: 'all', q: '', rows: [] }); Object.assign(FT, { q: '', grp: 'all' }); Object.assign(PJ, { q: '', show: 'open', sum: {}, loaded: false, seq: PJ.seq + 1 }); Object.assign(US, { rows: [], q: '', role: 'all', del: null, seq: US.seq + 1 });
  Object.assign(JB, { pane: 'cards', q: '', show: 'open', rows: [], loaded: false, seq: JB.seq + 1 });
  Object.assign(TY, { rows: [], loaded: false, ok: false, q: '', seq: TY.seq + 1, err: '' }); Object.assign(RM, { rows: [], loaded: false, show: 'due', seq: RM.seq + 1, err: '' }); updateBell(); Object.assign(SE, { site: 'all', q: '', rows: [], loaded: false, n: 120, seq: SE.seq + 1 });
  ['skHero', 'skStores', 'skCats', 'skList', 'mvLines', 'mvFits', 'hsKinds', 'hsStores', 'hsList', 'ftGroups', 'ftList', 'pjShow', 'pjList', 'usRoles', 'usList', 'jbShow', 'jbList', 'seSites', 'seList', 'remShow', 'remList', 'tyList', 'pushBox', 'editBody'].forEach(id => { const el = $(id); if (el) el.innerHTML = ''; });
  ['skSearch', 'hsSearch', 'ftSearch', 'pjSearch', 'usSearch', 'jbSearch', 'seSearch', 'tySearch', 'mvParty', 'mvRef', 'mvNote', 'mvDate'].forEach(id => { $(id).value = ''; }); msg('mvMsg', '', '');
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
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { checkVersion(); if (profile && canAdmin() && RM.loaded) loadRem(); } });
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
  navigator.serviceWorker.addEventListener('message', e => { if (e.data && e.data.type === 'ms-open-rem') openReminders(); });
  let reloaded = false; navigator.serviceWorker.addEventListener('controllerchange', () => { if (updatePending && !reloaded) { reloaded = true; location.reload(); } });
}
