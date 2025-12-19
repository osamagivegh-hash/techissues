// Arabic Tech Issues - Batch 4 (Articles 31-40)
export const techissuesArBatch4 = [
    {
        title: 'حل مشكلة الميكروفون لا يعمل',
        slug: 'fix-microphone-not-working-ar',
        tags: ['ميكروفون', 'صوت', 'تسجيل', 'Windows', 'صلاحيات'],
        excerpt: 'حلول لمشكلة الميكروفون الذي لا يعمل أو لا يسجل الصوت.',
        content: `<h2>التحقق من الصلاحيات</h2>
<p>Settings > Privacy > Microphone. تأكد أن Microphone access مفعل. تحقق من صلاحية التطبيق المعني.</p>

<h2>اختيار الميكروفون الصحيح</h2>
<p>Settings > Sound > Input. اختر الميكروفون الصحيح. كثير من الأجهزة لديها ميكروفونات متعددة.</p>

<h2>رفع مستوى الصوت</h2>
<p>في إعدادات Sound > Input. تأكد من أن Volume ليس منخفضاً جداً. جرب الميكروفون وراقب المؤشر.</p>

<h2>تحديث التعريف</h2>
<p>Device Manager > Audio inputs > Update driver. أو أزل التعريف وأعد التشغيل للتثبيت التلقائي.</p>

<h2>مستكشف الأخطاء</h2>
<p>Settings > Troubleshoot > Recording Audio. يشخص ويحل مشاكل شائعة تلقائياً.</p>

<h2>تحقق من الهاردوير</h2>
<p>جرب الميكروفون على جهاز آخر. للميكروفون السلكي جرب منفذ آخر. تأكد من سلامة الكابل.</p>

<h2>الخلاصة</h2>
<p>الصلاحيات سبب شائع جداً. اختيار الميكروفون الخاطئ سبب آخر. معظم المشاكل برمجية وسهلة الحل.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'إصلاح خطأ DPC Watchdog Violation',
        slug: 'fix-dpc-watchdog-error-ar',
        tags: ['BSOD', 'Windows', 'Driver', 'SSD', 'خطأ'],
        excerpt: 'حل خطأ DPC_WATCHDOG_VIOLATION الذي يسبب الشاشة الزرقاء.',
        content: `<h2>ما هو هذا الخطأ؟</h2>
<p>يحدث عندما تعريف أو هاردوير يستغرق وقتاً طويلاً للاستجابة. عادة مرتبط بتعريفات SSD أو كرت الشاشة.</p>

<h2>تحديث تعريف SSD</h2>
<p>السبب الأشهر! حمّل تعريف AHCI أو NVMe من موقع مصنع الـ SSD. Intel Rapid Storage Technology قد يساعد.</p>

<h2>تحديث تعريف كرت الشاشة</h2>
<p>ثاني أشهر سبب. حمّل أحدث تعريف من NVIDIA أو AMD. جرب DDU للتنظيف الكامل أولاً.</p>

<h2>تحقق من كابل SATA</h2>
<p>كابل SATA تالف يسبب هذا الخطأ. غيّر الكابل أو المنفذ. للـ NVMe، تأكد من التثبيت الصحيح.</p>

<h2>تشغيل SFC وDISM</h2>
<p>Command Prompt كمسؤول: sfc /scannow ثم DISM /Online /Cleanup-Image /RestoreHealth. يصلح ملفات النظام.</p>

<h2>الوضع الآمن</h2>
<p>إذا لم تستطع الدخول لـ Windows، استخدم Safe Mode لتحديث التعريفات أو إلغاء تثبيتها.</p>

<h2>الخلاصة</h2>
<p>تعريف SSD هو السبب في أغلب الحالات. تحديثه يحل المشكلة عادة. تحقق من الكابلات أيضاً.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'حل مشكلة تطبيقات iOS تتوقف',
        slug: 'fix-ios-apps-crashing-ar',
        tags: ['iOS', 'iPhone', 'تطبيقات', 'Crash', 'Apple'],
        excerpt: 'حلول لمشكلة تطبيقات iPhone التي تتوقف أو تنغلق فجأة.',
        content: `<h2>إعادة تشغيل iPhone</h2>
<p>أبسط حل. أعد تشغيل الهاتف. ينظف الذاكرة ويحل مشاكل كثيرة. جربه أولاً دائماً.</p>

<h2>تحديث التطبيق</h2>
<p>App Store > Updates. التحديثات تصلح الأخطاء. حافظ على التطبيقات محدثة.</p>

<h2>تحديث iOS</h2>
<p>Settings > General > Software Update. نظام قديم قد يتعارض مع تطبيقات جديدة.</p>

<h2>حذف وإعادة تثبيت</h2>
<p>اضغط مطولاً > Remove App > Delete. أعد التثبيت من App Store. يبدأ نظيفاً.</p>

<h2>تحرير المساحة</h2>
<p>Settings > General > iPhone Storage. مساحة قليلة تسبب crashes. احذف ما لا تحتاج.</p>

<h2>إعادة ضبط الإعدادات</h2>
<p>Settings > General > Reset > Reset All Settings. لا يحذف بياناتك. يعيد الإعدادات للافتراضي.</p>

<h2>الخلاصة</h2>
<p>تحديث التطبيق وiOS يحلان معظم المشاكل. إعادة التثبيت فعالة. المشاكل عادة برمجية وليست من الجهاز.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'إصلاح مشكلة الشحن اللاسلكي',
        slug: 'fix-wireless-charging-issues-ar',
        tags: ['شحن لاسلكي', 'Qi', 'هاتف', 'بطارية', 'إصلاح'],
        excerpt: 'حلول لمشكلة الشحن اللاسلكي الذي لا يعمل أو يعمل ببطء.',
        content: `<h2>التحقق من التوافق</h2>
<p>تأكد أن هاتفك يدعم الشحن اللاسلكي Qi. ليست كل الهواتف تدعمه. تحقق من المواصفات.</p>

<h2>إزالة الغطاء</h2>
<p>أغطية سميكة أو معدنية تمنع الشحن. أزل الغطاء وجرب. الأغطية الرقيقة عادة لا تؤثر.</p>

<h2>الوضع الصحيح</h2>
<p>ضع الهاتف في منتصف الشاحن بالضبط. الملفات يجب أن تتوازى. جرب أوضاع مختلفة.</p>

<h2>تنظيف الأسطح</h2>
<p>نظف ظهر الهاتف والشاحن. الأوساخ تعيق الشحن. قطعة قماش ناعمة تكفي.</p>

<h2>تحقق من الشاحن</h2>
<p>جرب هاتف آخر على نفس الشاحن. جرب شاحن آخر مع نفس الهاتف. حدد أي منهما المشكلة.</p>

<h2>إعادة تشغيل الهاتف</h2>
<p>خلل برمجي قد يعطل الشحن اللاسلكي. أعد تشغيل الهاتف وجرب مجدداً.</p>

<h2>الخلاصة</h2>
<p>الوضع الصحيح والغطاء أشهر المشاكل. إذا لم يعمل مع أي شاحن، راجع مركز صيانة.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'حل مشكلة Windows لا يرى الهارد ديسك',
        slug: 'fix-windows-not-detecting-hdd-ar',
        tags: ['هارد ديسك', 'تخزين', 'Windows', 'BIOS', 'تعريفات'],
        excerpt: 'حلول لمشكلة عدم ظهور القرص الصلب في Windows أو إدارة الأقراص.',
        content: `<h2>تحقق من BIOS</h2>
<p>ادخل BIOS (Del أو F2). راقب إن كان الهارد يظهر. إذا لم يظهر، المشكلة فيزيائية.</p>

<h2>Disk Management</h2>
<p>اضغط Win+X > Disk Management. قد يظهر الهارد لكن بدون حرف. اضغط بزر الماوس الأيمن > Change Drive Letter.</p>

<h2>Initialize the Disk</h2>
<p>إذا كان جديداً، قد يحتاج Initialize. في Disk Management اضغط بزر الماوس الأيمن > Initialize Disk. اختر GPT.</p>

<h2>تحديث تعريف SATA</h2>
<p>Device Manager > Storage controllers > Update driver. تعريف قديم قد لا يرى الهارد.</p>

<h2>تحقق من الكابلات</h2>
<p>كابل SATA أو الطاقة قد يكون سائباً. افتح الجهاز وتأكد من التوصيلات. جرب كابل آخر.</p>

<h2>BIOS Settings</h2>
<p>تأكد من أن SATA controller مفعل. اختر وضع AHCI أو IDE حسب الهارد.</p>

<h2>الخلاصة</h2>
<p>إذا لم يظهر في BIOS، المشكلة في الكابلات أو الهارد نفسه. إذا ظهر في BIOS فقط، المشكلة برمجية.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'إصلاح مشكلة الشاشة تومض',
        slug: 'fix-screen-flickering-ar',
        tags: ['شاشة', 'Flicker', 'Display', 'تعريفات', 'Windows'],
        excerpt: 'حلول لمشكلة وميض الشاشة في الكمبيوتر أو اللابتوب.',
        content: `<h2>تحديد مصدر المشكلة</h2>
<p>افتح Task Manager. إذا وميض أيضاً، المشكلة في تعريف الشاشة. إذا لا، تطبيق معين هو السبب.</p>

<h2>تحديث تعريف كرت الشاشة</h2>
<p>إذا Task Manager يومض، حدث تعريف GPU. استخدم DDU للإزالة الكاملة ثم ثبت الجديد.</p>

<h2>تعطيل تطبيق مشكل</h2>
<p>إذا Task Manager لا يومض، تطبيق هو السبب. الـ Antivirus وiCloud شائعان. عطلهما وجرب.</p>

<h2>تغيير معدل التحديث</h2>
<p>Settings > Display > Advanced > Refresh rate. جرب معدل أقل. 60Hz مستقر عادة.</p>

<h2>تحقق من الكابل</h2>
<p>للشاشة الخارجية، جرب كابل HDMI أو DisplayPort آخر. الكابلات التالفة تسبب وميض.</p>

<h2>Disable Hardware Acceleration</h2>
<p>في إعدادات Chrome أو المتصفح، عطل Hardware Acceleration. يسبب وميض أحياناً.</p>

<h2>الخلاصة</h2>
<p>Task Manager يحدد إن كانت مشكلة تعريف أو تطبيق. معظم الحالات تُحل بتحديث تعريف الشاشة.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1616763355603-9755a640a287?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'حل مشكلة USB لا يتعرف عليه',
        slug: 'fix-usb-not-recognized-ar',
        tags: ['USB', 'Flash', 'هاردوير', 'Windows', 'تعريفات'],
        excerpt: 'حلول لمشكلة رسالة USB Device Not Recognized.',
        content: `<h2>جرب منفذ USB آخر</h2>
<p>أبسط اختبار. جرب منفذ USB آخر، يفضل خلفي. المنافذ الأمامية أحياناً ضعيفة.</p>

<h2>جرب جهاز آخر</h2>
<p>جرب الـ USB على كمبيوتر آخر. إذا عمل، المشكلة من كمبيوترك. إذا لا، الـ USB تالف.</p>

<h2>تحديث USB Controllers</h2>
<p>Device Manager > Universal Serial Bus controllers. Update driver لكل منهم.</p>

<h2>إلغاء تثبيت وإعادة توصيل</h2>
<p>في Device Manager، أزل USB device المشكل. افصل الـ USB وأعد توصيله. سيتعرف عليه مجدداً.</p>

<h2>تعطيل USB Selective Suspend</h2>
<p>Power Options > Plan settings > Advanced > USB settings. عطل Selective suspend. يوفر طاقة لكن يسبب مشاكل.</p>

<h2>فحص Power</h2>
<p>بعض أجهزة USB تحتاج طاقة أكثر. استخدم USB Hub مع طاقة خارجية.</p>

<h2>الخلاصة</h2>
<p>معظم المشاكل تُحل بتغيير المنفذ أو تحديث controllers. USB تالف شائع أيضاً فاختبره على جهاز آخر.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1618410320928-25228d811631?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'إصلاح مشاكل Zoom والفيديو',
        slug: 'fix-zoom-video-issues-ar',
        tags: ['Zoom', 'فيديو', 'مؤتمرات', 'كاميرا', 'صوت'],
        excerpt: 'حلول لمشاكل Zoom من الكاميرا والصوت إلى جودة الفيديو.',
        content: `<h2>تحديث Zoom</h2>
<p>تأكد من آخر إصدار. Zoom يصدر تحديثات أمنية ووظيفية باستمرار. قديم = مشاكل.</p>

<h2>مشاكل الصوت</h2>
<p>في Zoom، Settings > Audio. اختر الميكروفون والسماعة الصحيحين. Test Speaker و Test Mic للتأكد.</p>

<h2>مشاكل الفيديو</h2>
<p>Settings > Video. اختر الكاميرا الصحيحة. أغلق تطبيقات أخرى تستخدم الكاميرا. تطبيق واحد فقط.</p>

<h2>جودة الفيديو ضعيفة</h2>
<p>تحقق من سرعة الإنترنت. أغلق التطبيقات التي تستهلك الإنترنت. استخدم Ethernet بدلاً من WiFi.</p>

<h2>Virtual Background لا يعمل</h2>
<p>يحتاج معالج قوي. Settings > Background & Effects > I have a green screen. أو عطل الخلفية الافتراضية.</p>

<h2>أغلق التطبيقات الأخرى</h2>
<p>Zoom يستهلك موارد كثيرة. أغلق التطبيقات غير الضرورية. خاصة المتصفحات بتبويبات كثيرة.</p>

<h2>الخلاصة</h2>
<p>معظم مشاكل Zoom من اختيار الجهاز الخاطئ أو الإنترنت البطيء. التحديث والإعدادات الصحيحة يحلان الباقي.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1587759537854-eab9f3c32da8?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'حل مشكلة الإيميل لا يصل',
        slug: 'fix-email-not-receiving-ar',
        tags: ['إيميل', 'Outlook', 'Gmail', 'استقبال', 'Spam'],
        excerpt: 'حلول لمشكلة عدم استقبال رسائل البريد الإلكتروني.',
        content: `<h2>تحقق من Spam/Junk</h2>
<p>أول مكان للبحث! الرسائل المهمة تذهب للـ Spam أحياناً. انقل للـ Inbox وأضف المرسل للقائمة الآمنة.</p>

<h2>تحقق من المساحة</h2>
<p>صندوق البريد الممتلئ لا يستقبل رسائل جديدة. احذف رسائل قديمة أو ارفع السعة.</p>

<h2>Sync/Refresh</h2>
<p>في Gmail أو Outlook، اسحب للأسفل للتحديث. أحياناً المزامنة تتأخر.</p>

<h2>تحقق من Filters/Rules</h2>
<p>ربما لديك قاعدة تحذف أو تنقل الرسائل تلقائياً. راجع Filters في إعدادات البريد.</p>

<h2>أعد إضافة الحساب</h2>
<p>في تطبيق البريد، احذف الحساب وأضفه مجدداً. يعيد المزامنة من الصفر.</p>

<h2>اختبر بإرسال لنفسك</h2>
<p>أرسل إيميل لنفسك. إذا وصل، المشكلة من المرسل الآخر. اطلب منه التحقق من عنوانك.</p>

<h2>الخلاصة</h2>
<p>Spam هو السبب الأشهر. المساحة الممتلئة تمنع الاستقبال. معظم المشاكل ليست تقنية بل إعدادات.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'إصلاح مشكلة Touch ID لا يعمل',
        slug: 'fix-touch-id-issues-ar',
        tags: ['Touch ID', 'بصمة', 'iPhone', 'Mac', 'Apple'],
        excerpt: 'حلول لمشكلة Touch ID الذي يفشل في التعرف على البصمة.',
        content: `<h2>نظف الزر والإصبع</h2>
<p>الرطوبة والدهون تمنع القراءة. جفف إصبعك ونظف زر Home بقطعة قماش ناعمة.</p>

<h2>أعد تسجيل البصمة</h2>
<p>Settings > Touch ID & Passcode. احذف البصمات الموجودة. سجل بصمات جديدة ببطء ودقة.</p>

<h2>سجل أوضاع مختلفة</h2>
<p>سجل نفس الإصبع مرتين بأوضاع مختلفة. أو سجل أصابع متعددة. يزيد معدل النجاح.</p>

<h2>إعادة تشغيل الجهاز</h2>
<p>خلل برمجي مؤقت. أعد تشغيل iPhone أو Mac. جرب Touch ID مجدداً.</p>

<h2>تحديث iOS/macOS</h2>
<p>التحديثات تصلح أخطاء Touch ID. تأكد من التحديث لآخر إصدار.</p>

<h2>Reset All Settings</h2>
<p>Settings > General > Reset > Reset All Settings. لا يحذف البيانات. يعيد إعدادات النظام.</p>

<h2>الخلاصة</h2>
<p>التنظيف وإعادة تسجيل البصمة يحلان معظم المشاكل. إذا فشل كل شيء، قد تكون مشكلة هاردوير.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80',
        readingTime: 6,
    },
];
