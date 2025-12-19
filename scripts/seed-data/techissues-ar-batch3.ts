// Arabic Tech Issues - Batch 3 (Articles 21-30)
export const techissuesArBatch3 = [
    {
        title: 'حل مشكلة تعليق الكمبيوتر وتجمده',
        slug: 'fix-computer-freezing-ar',
        tags: ['تجمد', 'Freeze', 'أداء', 'Windows', 'RAM'],
        excerpt: 'أسباب وحلول تجمد الكمبيوتر وعدم استجابته للأوامر.',
        content: `<h2>التحقق من Task Manager</h2>
<p>اضغط Ctrl+Shift+Esc. راقب CPU وRAM وDisk. إذا أي منها 100%، حددت المشكلة. أغلق التطبيق المستهلك.</p>

<h2>فحص الحرارة</h2>
<p>الحرارة الزائدة تسبب تجمد. استخدم HWiNFO لمراقبة درجات الحرارة. نظف المراوح وفتحات التهوية.</p>

<h2>فحص الذاكرة RAM</h2>
<p>اكتب Windows Memory Diagnostic في البحث. أعد التشغيل للفحص. RAM تالفة سبب شائع للتجمد.</p>

<h2>فحص الهارد ديسك</h2>
<p>افتح Command Prompt كمسؤول. اكتب chkdsk C: /f /r. سيفحص ويصلح الأخطاء عند إعادة التشغيل.</p>

<h2>تحديث التعريفات</h2>
<p>التعريفات القديمة أو التالفة تسبب تجمد. حدث تعريف كرت الشاشة خاصة. Device Manager يساعد.</p>

<h2>فحص الفيروسات</h2>
<p>فحص كامل بـ Windows Security. ثم Malwarebytes للتأكيد. الفيروسات تستهلك الموارد وتسبب تجمد.</p>

<h2>الخلاصة</h2>
<p>راقب الموارد أولاً لتحديد السبب. الحرارة والـ RAM أسباب شائعة. الصيانة الدورية تمنع التجمد.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'إصلاح مشكلة القرص الصلب ممتلئ',
        slug: 'fix-hard-drive-full-ar',
        tags: ['تخزين', 'هارد ديسك', 'مساحة', 'تنظيف', 'Windows'],
        excerpt: 'طرق فعالة لتحرير مساحة التخزين على القرص الصلب.',
        content: `<h2>Disk Cleanup المدمج</h2>
<p>ابحث عن Disk Cleanup. اختر القرص C. حدد كل الخيارات. Clean up system files للملفات الأكبر. يحرر جيجابايتات.</p>

<h2>إزالة البرامج غير المستخدمة</h2>
<p>Settings > Apps > Installed apps. رتب بالحجم. احذف البرامج التي لا تستخدمها. توفر مساحة كبيرة.</p>

<h2>تنظيف مجلد Downloads</h2>
<p>معظمنا ينسى هذا المجلد. احذف أو انقل الملفات القديمة. يتراكم فيه الكثير مع الوقت.</p>

<h2>Storage Sense</h2>
<p>Settings > System > Storage > Storage Sense. فعّله للتنظيف التلقائي. يحذف الملفات المؤقتة دورياً.</p>

<h2>نقل الملفات للـ Cloud</h2>
<p>OneDrive وGoogle Drive يحررون المساحة المحلية. Files On-Demand في OneDrive ممتاز.</p>

<h2>تحليل المساحة</h2>
<p>برنامج WinDirStat يُظهر ما يأكل المساحة. تصور بصري للملفات الكبيرة. يساعد في القرارات.</p>

<h2>الخلاصة</h2>
<p>Disk Cleanup والبرامج غير المستخدمة أول خطوة. للحل الدائم، فكر في SSD أكبر أو تخزين سحابي.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'حل مشاكل تطبيقات Android تتوقف',
        slug: 'fix-android-apps-crashing-ar',
        tags: ['Android', 'تطبيقات', 'Crash', 'توقف', 'إصلاح'],
        excerpt: 'حلول لمشكلة تطبيقات Android التي تتوقف أو تنغلق فجأة.',
        content: `<h2>إعادة تشغيل الهاتف</h2>
<p>أبسط حل وأكثرها فعالية. أعد تشغيل الهاتف. ينظف الذاكرة ويوقف العمليات المشكلة.</p>

<h2>مسح Cache التطبيق</h2>
<p>Settings > Apps > [التطبيق] > Storage > Clear Cache. لا يحذف بياناتك. يحل مشاكل كثيرة.</p>

<h2>تحديث التطبيق</h2>
<p>افتح Play Store. تحقق من التحديثات. التحديثات تصلح الأخطاء. حافظ على التطبيقات محدثة.</p>

<h2>تحديث Android</h2>
<p>Settings > System > Software Update. نظام قديم قد يتعارض مع تطبيقات جديدة.</p>

<h2>إعادة تثبيت التطبيق</h2>
<p>احذف التطبيق وأعد تثبيته. يبدأ من الصفر نظيفاً. قد تفقد بعض الإعدادات.</p>

<h2>التحقق من التخزين والذاكرة</h2>
<p>مساحة منخفضة تسبب crashes. تأكد من وجود مساحة حرة. RAM ممتلئة تؤثر أيضاً.</p>

<h2>الخلاصة</h2>
<p>Clear Cache هو الحل السحري لمعظم المشاكل. إذا استمر، أعد تثبيت التطبيق أو انتظر تحديثاً يصلحه.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'إصلاح مشكلة الكاميرا لا تعمل',
        slug: 'fix-camera-not-working-ar',
        tags: ['كاميرا', 'Webcam', 'فيديو', 'Windows', 'صلاحيات'],
        excerpt: 'حلول لمشكلة الكاميرا التي لا تعمل في الكمبيوتر أو الهاتف.',
        content: `<h2>التحقق من الصلاحيات</h2>
<p>Settings > Privacy > Camera. تأكد أن Camera access مفعل. تحقق أن التطبيق المعني له صلاحية الكاميرا.</p>

<h2>تطبيق آخر يستخدم الكاميرا</h2>
<p>تطبيق واحد فقط يمكنه استخدام الكاميرا. أغلق Zoom وSkype وغيرها. جرب مرة أخرى.</p>

<h2>تحديث التعريف</h2>
<p>Device Manager > Cameras > Update driver. أو Uninstall وإعادة التشغيل. Windows يعيد تثبيت التعريف.</p>

<h2>مستكشف الأخطاء</h2>
<p>Settings > Troubleshoot > Camera. يحل مشاكل شائعة تلقائياً. جربه قبل حلول أخرى.</p>

<h2>فحص الكاميرا فيزيائياً</h2>
<p>للكاميرا الخارجية: جرب منفذ USB آخر. تأكد من توصيل الكابل. جربها على جهاز آخر.</p>

<h2>تحقق من برنامج الحماية</h2>
<p>بعض برامج الحماية تحجب الكاميرا. افحص إعدادات Antivirus. أضف استثناء للتطبيق.</p>

<h2>الخلاصة</h2>
<p>الصلاحيات هي السبب الأشهر. تحقق منها أولاً. تطبيق يستخدم الكاميرا بالفعل سبب شائع آخر.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'حل مشكلة VPN لا يتصل',
        slug: 'fix-vpn-not-connecting-ar',
        tags: ['VPN', 'اتصال', 'شبكة', 'أمان', 'إعدادات'],
        excerpt: 'حلول لمشاكل اتصال VPN والأخطاء الشائعة.',
        content: `<h2>تغيير الخادم</h2>
<p>الخادم الحالي قد يكون محمّل أو محظور. جرب خادم في بلد آخر. معظم VPNs توفر خيارات كثيرة.</p>

<h2>تغيير البروتوكول</h2>
<p>OpenVPN قد لا يعمل في شبكات معينة. جرب IKEv2 أو WireGuard. في إعدادات التطبيق.</p>

<h2>تعطيل جدار الحماية مؤقتاً</h2>
<p>Firewall قد يحجب VPN. عطله مؤقتاً للاختبار. إذا عمل، أضف استثناء للـ VPN.</p>

<h2>مسح DNS Cache</h2>
<p>افتح Command Prompt. اكتب ipconfig /flushdns. يحل مشاكل DNS التي تؤثر على VPN.</p>

<h2>تحديث تطبيق VPN</h2>
<p>النسخ القديمة بها مشاكل. تأكد من تحديث تطبيق VPN لآخر إصدار.</p>

<h2>إعادة تثبيت TAP Adapter</h2>
<p>Device Manager > Network adapters. احذف TAP adapters. أعد تثبيت VPN. يعيد تثبيتها.</p>

<h2>الخلاصة</h2>
<p>تغيير الخادم والبروتوكول يحلان معظم المشاكل. إذا فشل كل شيء، جرب VPN آخر أو اتصل بدعمهم.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'إصلاح مشاكل Discord والاتصال',
        slug: 'fix-discord-issues-ar',
        tags: ['Discord', 'صوت', 'فيديو', 'Gaming', 'اتصال'],
        excerpt: 'حلول لمشاكل Discord من الصوت والفيديو إلى عدم الاتصال.',
        content: `<h2>تحقق من حالة Discord</h2>
<p>status.discord.com يظهر إن كان هناك مشاكل عامة. أحياناً المشكلة من خوادمهم وليست منك.</p>

<h2>مشاكل الصوت</h2>
<p>User Settings > Voice. تأكد من اختيار Input وOutput الصحيحين. جرب Reset Voice Settings.</p>

<h2>تعطيل Hardware Acceleration</h2>
<p>Settings > Advanced > Hardware Acceleration. عطّله. يسبب مشاكل على بعض الأجهزة.</p>

<h2>مسح Cache</h2>
<p>اضغط Win+R واكتب %appdata%/discord. احذف مجلد Cache. أعد تشغيل Discord.</p>

<h2>تحديث Discord</h2>
<p>Ctrl+R يعيد تحميل Discord. التحديثات تأتي تلقائياً. قد تحتاج إعادة تثبيت كامل.</p>

<h2>مشاكل الـ Stream</h2>
<p>لا يعرض التطبيق؟ شغل التطبيق كمسؤول. Discord يحتاج صلاحيات لالتقاط الشاشة.</p>

<h2>الخلاصة</h2>
<p>Reset Voice Settings يحل معظم مشاكل الصوت. Cache التالف سبب شائع. Discord موثوق عموماً.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'حل مشكلة الألعاب تتوقف فجأة',
        slug: 'fix-games-crashing-ar',
        tags: ['ألعاب', 'Gaming', 'Crash', 'GPU', 'أداء'],
        excerpt: 'أسباب وحلول توقف الألعاب وخروجها المفاجئ.',
        content: `<h2>تحديث تعريف كرت الشاشة</h2>
<p>أول وأهم خطوة. حمّل التعريف من موقع NVIDIA أو AMD. التعريفات الجديدة تصلح مشاكل الألعاب.</p>

<h2>التحقق من ملفات اللعبة</h2>
<p>في Steam: اضغط بزر الماوس الأيمن > Properties > Verify integrity. يصلح الملفات التالفة.</p>

<h2>تقليل إعدادات الرسوميات</h2>
<p>الإعدادات العالية جداً تسبب crashes. قلل Resolution وGraphics Quality. راقب درجة الحرارة.</p>

<h2>فحص الحرارة</h2>
<p>GPU يسخن = crashes. استخدم MSI Afterburner لمراقبة الحرارة. نظف الكمبيوتر وحسن التهوية.</p>

<h2>تعطيل Overlays</h2>
<p>Discord Overlay وGeForce Experience يسببون تعارضات أحياناً. عطلها وجرب.</p>

<h2>تحديث Windows وDirectX</h2>
<p>تأكد من تحديث Windows. ثبت أحدث DirectX وVisual C++ Redistributables.</p>

<h2>الخلاصة</h2>
<p>تعريف كرت الشاشة سبب 70% من crashes الألعاب. الحرارة والإعدادات العالية أسباب شائعة أخرى.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'إصلاح مشكلة GPU لا يعمل بشكل صحيح',
        slug: 'fix-gpu-issues-ar',
        tags: ['GPU', 'كرت شاشة', 'NVIDIA', 'AMD', 'رسوميات'],
        excerpt: 'حلول لمشاكل كارت الشاشة من عدم الكشف إلى الأداء الضعيف.',
        content: `<h2>التحقق من التوصيل</h2>
<p>تأكد من توصيل كابلات الطاقة لكرت الشاشة. 6-pin أو 8-pin حسب الكرت. فحص فيزيائي مهم.</p>

<h2>تحديث أو إعادة تثبيت التعريف</h2>
<p>Display Driver Uninstaller (DDU) يزيل التعريف كلياً. ثبت أحدث تعريف نظيفاً. يحل مشاكل كثيرة.</p>

<h2>التحقق من Device Manager</h2>
<p>هل يظهر كرت الشاشة؟ هل عليه علامة تعجب؟ Update driver أو Disable/Enable.</p>

<h2>BIOS Settings</h2>
<p>تأكد من أن Primary Display على PCIe. بعض اللوحات الأم تحتاج تفعيل يدوي للكرت.</p>

<h2>فحص الحرارة</h2>
<p>GPU يسخن = أداء ضعيف وthrottling. HWiNFO يظهر درجة الحرارة. نظف المروحة وجدد المعجون.</p>

<h2>اختبار الكرت</h2>
<p>FurMark stress test يكشف مشاكل الاستقرار. إذا crashed، الكرت قد يكون تالفاً.</p>

<h2>الخلاصة</h2>
<p>DDU وتثبيت نظيف يحلان معظم مشاكل التعريفات. المشاكل الفيزيائية تحتاج إصلاح أو استبدال.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'حل مشكلة الشبكة غير متاحة',
        slug: 'fix-network-unavailable-ar',
        tags: ['شبكة', 'Network', 'إنترنت', 'اتصال', 'Windows'],
        excerpt: 'حلول لمشكلة عدم الاتصال بالشبكة ورسالة Network Unavailable.',
        content: `<h2>أعد تشغيل المودم والراوتر</h2>
<p>افصل الكهرباء عنهما 30 ثانية. أعد التشغيل. انتظر دقيقتين للاتصال. يحل 50% من المشاكل.</p>

<h2>تشغيل مستكشف الأخطاء</h2>
<p>Settings > Network > Network troubleshooter. يشخص ويحاول إصلاح المشاكل تلقائياً.</p>

<h2>إعادة ضبط الشبكة</h2>
<p>Settings > Network > Advanced > Network reset. يعيد كل إعدادات الشبكة للافتراضي. ستحتاج إعادة الإعداد.</p>

<h2>تحديث تعريف الشبكة</h2>
<p>Device Manager > Network adapters. Update driver لكرت الشبكة. أو Uninstall وإعادة التشغيل.</p>

<h2>إعادة ضبط TCP/IP</h2>
<p>افتح Command Prompt كمسؤول. اكتب: netsh int ip reset ثم netsh winsock reset. أعد التشغيل.</p>

<h2>فحص الكابلات</h2>
<p>للاتصال السلكي: جرب كابل Ethernet آخر. تأكد من التوصيل بالمنفذ الصحيح على الراوتر.</p>

<h2>الخلاصة</h2>
<p>إعادة تشغيل المودم/الراوتر أول خطوة دائماً. Network reset حل قوي. اتصل بمزود الخدمة إذا استمرت.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'إصلاح مشاكل Google Play Store',
        slug: 'fix-google-play-issues-ar',
        tags: ['Play Store', 'Android', 'تطبيقات', 'تحميل', 'Google'],
        excerpt: 'حلول لمشاكل Google Play Store من عدم التحميل إلى الأخطاء.',
        content: `<h2>تحقق من الاتصال</h2>
<p>Play Store يحتاج إنترنت. جرب فتح موقع في المتصفح. إذا لم يعمل، المشكلة في الاتصال.</p>

<h2>مسح Cache وData</h2>
<p>Settings > Apps > Google Play Store > Storage > Clear cache ثم Clear data. يحل معظم المشاكل.</p>

<h2>مسح Cache لـ Google Services</h2>
<p>كرر الخطوة السابقة لـ Google Play Services وGoogle Services Framework. ثلاثتهم مرتبطين.</p>

<h2>تحقق من التاريخ والوقت</h2>
<p>تاريخ خاطئ يسبب أخطاء في Play Store. Settings > Date & time > Automatic. تأكد من الصحة.</p>

<h2>إزالة وإعادة حساب Google</h2>
<p>Settings > Accounts > Google > Remove. أعد التشغيل. أضف الحساب مجدداً.</p>

<h2>تحديث Play Store يدوياً</h2>
<p>حمّل آخر APK من موقع موثوق مثل APKMirror. ثبته يدوياً. قد يحل مشاكل النسخة القديمة.</p>

<h2>الخلاصة</h2>
<p>Clear cache لـ Play Store والخدمات المرتبطة يحل 90% من المشاكل. التاريخ الخاطئ سبب شائع ومخفي.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80',
        readingTime: 6,
    },
];
