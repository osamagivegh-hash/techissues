// Arabic Tech Issues - Batch 5 (Articles 41-50) - FINAL
export const techissuesArBatch5 = [
    {
        title: 'حل مشكلة Face ID لا يتعرف',
        slug: 'fix-face-id-issues-ar',
        tags: ['Face ID', 'وجه', 'iPhone', 'بيومتري', 'Apple'],
        excerpt: 'حلول لمشكلة Face ID الذي يفشل في التعرف على الوجه.',
        content: `<h2>تنظيف TrueDepth Camera</h2>
<p>نظف الكاميرا الأمامية والحساسات بقطعة قماش ناعمة. الأوساخ تمنع الكشف الصحيح.</p>

<h2>لا تغطي الكاميرا</h2>
<p>تأكد أن وجهك وشاشة TrueDepth غير مغطاة. الأغطية والكفرات السميكة قد تكون السبب.</p>

<h2>أعد إعداد Face ID</h2>
<p>Settings > Face ID > Reset Face ID. سجل وجهك من جديد في إضاءة جيدة. أبقِ وجهك مستقيماً.</p>

<h2>Set Up an Alternate Appearance</h2>
<p>Face ID يسمح بمظهر بديل. للنظارات أو اللحية. يزيد معدل النجاح.</p>

<h2>إعادة تشغيل الجهاز</h2>
<p>Force restart قد يحل مشاكل مؤقتة. خاصة بعد تحديث iOS.</p>

<h2>تحديث iOS</h2>
<p>Apple تحسن Face ID باستمرار. التحديثات قد تصلح مشاكل التعرف.</p>

<h2>الخلاصة</h2>
<p>إعادة إعداد Face ID يحل معظم المشاكل. إذا فشل مع رسالة خطأ، قد تكون مشكلة هاردوير.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'إصلاح مشكلة RAM لا تعمل بكامل طاقتها',
        slug: 'fix-ram-not-full-capacity-ar',
        tags: ['RAM', 'ذاكرة', 'Windows', 'BIOS', 'هاردوير'],
        excerpt: 'حلول لمشكلة الذاكرة التي لا تظهر بكامل سعتها في النظام.',
        content: `<h2>تحقق من Task Manager</h2>
<p>Ctrl+Shift+Esc > Performance > Memory. كم RAM مستخدمة وكم متاحة؟ "Hardware Reserved" قد تأكل جزءاً.</p>

<h2>msconfig Settings</h2>
<p>اكتب msconfig في Run. Boot > Advanced > تأكد أن Maximum memory غير محددة. قد تحد من الذاكرة.</p>

<h2>تحقق من توافق RAM</h2>
<p>معالجات 32-bit تدعم 4GB فقط. تأكد من Windows 64-bit. الللوحة الأم لها حد أيضاً.</p>

<h2>BIOS Settings</h2>
<p>تأكد من أن كل شرائح RAM تظهر في BIOS. Memory Remap Feature يجب أن تكون مفعلة.</p>

<h2>أعد تركيب الشرائح</h2>
<p>أطفئ الجهاز. أزل شرائح RAM وأعد تركيبها بإحكام. تأكد من السماع "كليك".</p>

<h2>اختبر كل شريحة</h2>
<p>شغل الجهاز بشريحة واحدة. اختبر كل شريحة منفردة. قد تكون واحدة تالفة.</p>

<h2>الخلاصة</h2>
<p>msconfig والـ BIOS أسباب شائعة. تركيب غير صحيح أيضاً. اختبر الشرائح منفردة للتشخيص.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'حل مشكلة التطبيقات لا تحمّل',
        slug: 'fix-apps-not-downloading-ar',
        tags: ['تحميل', 'App Store', 'Play Store', 'تطبيقات', 'إنترنت'],
        excerpt: 'حلول لمشكلة فشل تحميل التطبيقات من المتجر.',
        content: `<h2>تحقق من الاتصال</h2>
<p>تحميل التطبيقات يحتاج إنترنت مستقر. جرب WiFi بدلاً من البيانات. أو العكس للاختبار.</p>

<h2>أوقف وأعد التحميل</h2>
<p>في المتجر، أوقف التحميل واضغط مرة أخرى. يعيد بدء العملية. حل بسيط وفعال.</p>

<h2>تحقق من المساحة</h2>
<p>التطبيقات تحتاج مساحة للتحميل والتثبيت. تأكد من وجود مساحة كافية حرة.</p>

<h2>مسح Cache المتجر</h2>
<p>Settings > Apps > App Store/Play Store > Clear cache. للـ iOS، سجل خروج وادخل مجدداً.</p>

<h2>تحقق من التاريخ والوقت</h2>
<p>تاريخ أو وقت خاطئ يسبب فشل التحميل. فعّل الضبط التلقائي.</p>

<h2>إعادة تشغيل الجهاز</h2>
<p>خلل مؤقت في النظام. أعد التشغيل وجرب التحميل مجدداً.</p>

<h2>الخلاصة</h2>
<p>المساحة والاتصال أشهر الأسباب. مسح cache المتجر يحل مشاكل كثيرة. جرب الحلول البسيطة أولاً.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'إصلاح مشاكل AirDrop لا يعمل',
        slug: 'fix-airdrop-not-working-ar',
        tags: ['AirDrop', 'Apple', 'مشاركة', 'iPhone', 'Mac'],
        excerpt: 'حلول لمشكلة AirDrop الذي لا يعمل أو لا يجد الأجهزة.',
        content: `<h2>تفعيل AirDrop</h2>
<p>Control Center > AirDrop > Everyone أو Contacts Only. تأكد أنه مفعل على كلا الجهازين.</p>

<h2>WiFi و Bluetooth</h2>
<p>AirDrop يحتاج كلاهما. فعّلهما على الجهازين. لا تحتاج اتصال WiFi، فقط الشريحة مفعلة.</p>

<h2>Personal Hotspot</h2>
<p>عطّل Personal Hotspot مؤقتاً. يتعارض مع AirDrop. أوقفه وجرب.</p>

<h2>تقريب الأجهزة</h2>
<p>AirDrop يحتاج قرب فيزيائي. 9 أمتار الحد الأقصى. اقترب من الجهاز الآخر.</p>

<h2>أوقف وشغل الخدمات</h2>
<p>Airplane Mode on ثم off. يعيد تشغيل WiFi وBluetooth. ثم جرب AirDrop.</p>

<h2>تسجيل iCloud</h2>
<p>تأكد من تسجيل الدخول في iCloud. AirDrop للـ Contacts Only يحتاج iCloud.</p>

<h2>الخلاصة</h2>
<p>تفعيل Everyone يتجاوز معظم المشاكل. WiFi وBluetooth ضروريان. Personal Hotspot سبب شائع.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'حل مشكلة الـ SSD يعمل ببطء',
        slug: 'fix-slow-ssd-performance-ar',
        tags: ['SSD', 'سرعة', 'تخزين', 'TRIM', 'Windows'],
        excerpt: 'حلول لمشكلة SSD الذي يعمل أبطأ من المتوقع.',
        content: `<h2>تحقق من المساحة الحرة</h2>
<p>SSD يبطأ عندما يمتلئ فوق 75%. حرر مساحة. احتفظ بـ 20% فارغة على الأقل.</p>

<h2>تفعيل TRIM</h2>
<p>Command Prompt كمسؤول: fsutil behavior query DisableDeleteNotify. إذا 1، TRIM معطل. فعّله.</p>

<h2>تحديث Firmware</h2>
<p>زر موقع مصنع SSD. حمّل أحدث firmware. التحديثات تحسن الأداء والاستقرار.</p>

<h2>تحقق من وضع AHCI</h2>
<p>في BIOS، تأكد أن SATA على AHCI وليس IDE. IDE أبطأ ولا يدعم TRIM.</p>

<h2>تعطيل Disk Defragmentation</h2>
<p>الـ Defrag يضر SSD ولا يفيده. Windows 10/11 يستخدم TRIM بدلاً. تأكد من الإعداد الصحيح.</p>

<h2>فحص صحة SSD</h2>
<p>استخدم CrystalDiskInfo لفحص الصحة. إذا "Caution" أو "Bad"، SSD قد يحتاج استبدال.</p>

<h2>الخلاصة</h2>
<p>المساحة الحرة أهم عامل. TRIM وAHCI ضروريان. راقب صحة SSD للتحذير المبكر.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'إصلاح مشاكل المونتاج والتصدير',
        slug: 'fix-video-export-issues-ar',
        tags: ['فيديو', 'تصدير', 'Premiere', 'Render', 'مونتاج'],
        excerpt: 'حلول لمشاكل تصدير الفيديو والـ Render في برامج المونتاج.',
        content: `<h2>تحقق من المساحة</h2>
<p>التصدير يحتاج مساحة كبيرة. تأكد من فراغ كافٍ على قرص الإخراج. ضعف حجم الملف النهائي تقريباً.</p>

<h2>تحديث البرنامج</h2>
<p>Premiere Pro وDaVinci يصدرون تحديثات إصلاحية. تأكد من آخر إصدار.</p>

<h2>تحديث تعريف GPU</h2>
<p>التصدير يستخدم GPU بكثافة. حدث تعريف كرت الشاشة. Studio Driver أفضل من Game Ready.</p>

<h2>تقليل إعدادات التصدير</h2>
<p>جرب bitrate أقل أو كوديك مختلف. H.265 أبطأ من H.264. ProRes سريع لكن حجمه كبير.</p>

<h2>Render أجزاء المشكلة</h2>
<p>إذا توقف عند نقطة معينة، Render تلك المنطقة أولاً. قد يكون كليب معين تالف.</p>

<h2>أغلق التطبيقات الأخرى</h2>
<p>التصدير يستهلك كل الموارد. أغلق Chrome والتطبيقات الأخرى. دع الجهاز يركز على التصدير.</p>

<h2>الخلاصة</h2>
<p>المساحة وتعريف GPU أهم عاملين. كليب تالف قد يكون السبب. قسّم المشكلة لتحديدها.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'حل مشكلة Windows Defender معطل',
        slug: 'fix-windows-defender-disabled-ar',
        tags: ['Defender', 'حماية', 'Windows', 'Antivirus', 'أمان'],
        excerpt: 'حلول لمشكلة Windows Defender المعطل أو الذي لا يعمل.',
        content: `<h2>تحقق من برنامج حماية آخر</h2>
<p>Defender يتعطل تلقائياً عند تثبيت antivirus آخر. هذا طبيعي. اختر واحداً فقط.</p>

<h2>تفعيل من الإعدادات</h2>
<p>Settings > Privacy & Security > Windows Security > Virus protection. فعّل Real-time protection.</p>

<h2>التحقق من Group Policy</h2>
<p>اكتب gpedit.msc في Run. Computer Configuration > Administrative Templates > Windows Defender. تأكد من "Not Configured".</p>

<h2>Registry Editor</h2>
<p>HKEY_LOCAL_MACHINE > SOFTWARE > Policies > Microsoft > Windows Defender. احذف مفتاح DisableAntiSpyware إن وجد.</p>

<h2>SFC و DISM</h2>
<p>Command Prompt كمسؤول: sfc /scannow ثم DISM /Online /Cleanup-Image /RestoreHealth. يصلح ملفات نظام تالفة.</p>

<h2>Windows Update</h2>
<p>تحديثات Windows تتضمن تحديثات Defender. تأكد من تثبيت جميع التحديثات.</p>

<h2>الخلاصة</h2>
<p>برنامج حماية آخر السبب الأشهر. Group Policy والـ Registry للحالات المتقدمة. لا تشغل برنامجي حماية معاً.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'إصلاح مشاكل الـ Driver المفقودة',
        slug: 'fix-missing-drivers-ar',
        tags: ['Driver', 'تعريفات', 'Windows', 'Device Manager', 'هاردوير'],
        excerpt: 'حلول لمشكلة التعريفات المفقودة وعلامات التعجب في Device Manager.',
        content: `<h2>Windows Update للتعريفات</h2>
<p>Settings > Windows Update > Check for updates. Windows يجلب تعريفات كثيرة تلقائياً.</p>

<h2>Device Manager</h2>
<p>اضغط بزر الماوس الأيمن على الجهاز بعلامة تعجب. Update driver > Search automatically. قد يجد التعريف.</p>

<h2>موقع الشركة المصنعة</h2>
<p>اذهب لموقع Dell أو HP أو اللوحة الأم. ابحث عن موديلك. حمّل التعريفات يدوياً.</p>

<h2>تحديد الجهاز المجهول</h2>
<p>في Device Manager، اضغط بزر الماوس الأيمن > Properties > Details > Hardware IDs. ابحث عنه في Google.</p>

<h2>Driver Booster ومثيلاتها</h2>
<p>برامج مثل Driver Booster تجد وتثبت التعريفات. احذر من البرامج غير الموثوقة.</p>

<h2>إعادة تثبيت الجهاز</h2>
<p>Uninstall device ثم Scan for hardware changes. Windows يعيد اكتشاف الجهاز وتثبيت تعريفه.</p>

<h2>الخلاصة</h2>
<p>Windows Update يحل كثيراً. موقع الشركة المصنعة أوثق مصدر. حدد الجهاز بـ Hardware ID إن لزم.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'حل مشكلة إعادة التشغيل التلقائي',
        slug: 'fix-auto-restart-issue-ar',
        tags: ['Restart', 'إعادة تشغيل', 'BSOD', 'Windows', 'استقرار'],
        excerpt: 'حلول لمشكلة إعادة تشغيل الكمبيوتر التلقائية بدون سبب واضح.',
        content: `<h2>تعطيل Automatic Restart</h2>
<p>System > Advanced > Startup and Recovery > Settings. ألغِ "Automatically restart". سترى رسالة BSOD بدلاً من الإعادة.</p>

<h2>فحص Event Viewer</h2>
<p>اكتب eventvwr في Run. Windows Logs > System. ابحث عن أخطاء Critical قبل وقت إعادة التشغيل.</p>

<h2>فحص الحرارة</h2>
<p>الحرارة الزائدة تسبب إعادة تشغيل للحماية. راقب الحرارة بـ HWiNFO. 90°+ للمعالج خطر.</p>

<h2>فحص Power Supply</h2>
<p>PSU ضعيف أو تالف يسبب إعادة تشغيل. خاصة تحت الضغط. جرب PSU آخر إن أمكن.</p>

<h2>فحص RAM</h2>
<p>Windows Memory Diagnostic. RAM تالفة سبب شائع للإعادة العشوائية.</p>

<h2>تحديث التعريفات</h2>
<p>تعريفات سيئة تسبب BSOD وإعادة تشغيل. حدث تعريف كرت الشاشة خاصة.</p>

<h2>الخلاصة</h2>
<p>تعطيل Automatic Restart يظهر السبب الحقيقي. الحرارة والـ RAM وPSU أسباب هاردوير شائعة.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'إصلاح مشاكل التحكم بالسطوع',
        slug: 'fix-brightness-control-issues-ar',
        tags: ['سطوع', 'Brightness', 'شاشة', 'Windows', 'لابتوب'],
        excerpt: 'حلول لمشكلة عدم القدرة على تعديل سطوع الشاشة.',
        content: `<h2>تحديث تعريف الشاشة</h2>
<p>Device Manager > Monitors > Generic PnP Monitor. Update driver. تعريف عام قد لا يدعم تعديل السطوع.</p>

<h2>تحديث تعريف GPU</h2>
<p>تعريف كرت الشاشة يتحكم بالسطوع أحياناً. حدّثه من موقع NVIDIA أو AMD أو Intel.</p>

<h2>مفاتيح الوظائف Fn</h2>
<p>في اللابتوبات، Fn + مفاتيح السطوع. تحتاج تعريف الـ Function keys من موقع الشركة.</p>

<h2>تحقق من Adaptive Brightness</h2>
<p>Power Options > Change plan settings > Advanced. عطّل Adaptive brightness. قد يتداخل مع التحكم اليدوي.</p>

<h2>Registry Fix</h2>
<p>HKEY_LOCAL_MACHINE > SYSTEM > ControlSet001 > Control > Class. ابحث عن FeatureTestControl واضبطه على 0.</p>

<h2>التحقق من كابل الشاشة</h2>
<p>للشاشات الخارجية، بعضها لا يدعم التحكم من Windows. استخدم أزرار الشاشة نفسها.</p>

<h2>الخلاصة</h2>
<p>تعريف الشاشة و GPU أهم الأسباب. مفاتيح Fn تحتاج تعريفاً خاصاً. الشاشات الخارجية قد لا تدعم التحكم.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1616763355603-9755a640a287?w=800&q=80',
        readingTime: 6,
    },
];
