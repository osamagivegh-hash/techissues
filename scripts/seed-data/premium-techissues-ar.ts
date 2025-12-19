// Premium Tech Issues Posts with Detailed Solutions - Arabic
export const premiumTechIssuesAr = [
    {
        title: 'دليل شامل لتحسين أداء Windows 11 للألعاب والعمل',
        slug: 'windows-11-optimization-gaming-work',
        tags: ['Windows 11', 'تحسين', 'ألعاب', 'Performance'],
        excerpt: 'خطوات متقدمة لتحسين أداء Windows 11 مع شرح تفصيلي لكل إعداد.',
        content: `<h2>1. تعطيل البرامج غير الضرورية عند بدء التشغيل</h2>
<p>البرامج التي تعمل تلقائياً تستهلك الذاكرة والمعالج.</p>

<h3>الطريقة:</h3>
<ol>
<li>اضغط <strong>Ctrl + Shift + Esc</strong> لفتح Task Manager</li>
<li>انتقل إلى تبويب <strong>Startup apps</strong></li>
<li>عطّل البرامج ذات التأثير العالي (High impact)</li>
</ol>

<h3>باستخدام PowerShell:</h3>
<pre><code class="language-powershell"># عرض برامج بدء التشغيل
Get-CimInstance Win32_StartupCommand | Select-Object Name, Command, Location

# تعطيل برنامج معين (يتطلب صلاحيات المدير)
# Registry location: HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run</code></pre>

<h2>2. تحسين إعدادات الطاقة</h2>
<pre><code class="language-powershell"># تفعيل وضع الأداء العالي
powercfg -setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c

# إنشاء خطة طاقة مخصصة للألعاب
powercfg -duplicatescheme 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c

# عرض جميع خطط الطاقة
powercfg -list</code></pre>

<h2>3. تعطيل التأثيرات البصرية</h2>
<ol>
<li>اضغط <strong>Win + R</strong> واكتب <code>sysdm.cpl</code></li>
<li>انتقل إلى <strong>Advanced</strong> → <strong>Performance Settings</strong></li>
<li>اختر <strong>Adjust for best performance</strong></li>
<li>أعد تفعيل: Smooth edges of screen fonts</li>
</ol>

<h3>باستخدام Registry:</h3>
<pre><code class="language-powershell"># تعطيل الشفافية
Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" -Name "EnableTransparency" -Value 0

# تعطيل الحركات
Set-ItemProperty -Path "HKCU:\\Control Panel\\Desktop\\WindowMetrics" -Name "MinAnimate" -Value 0</code></pre>

<h2>4. تحسين إعدادات الشبكة للألعاب</h2>
<pre><code class="language-powershell"># تعطيل Nagle's Algorithm لتقليل التأخير
$adapters = Get-NetAdapter | Where-Object {$_.Status -eq "Up"}
foreach ($adapter in $adapters) {
    Set-NetTCPSetting -SettingName InternetCustom -AutoTuningLevelLocal Disabled
}

# تفعيل Network Throttling Index
New-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "NetworkThrottlingIndex" -Value 0xffffffff -PropertyType DWORD -Force

# تفعيل QoS للألعاب
New-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\Psched" -Name "NonBestEffortLimit" -Value 0 -PropertyType DWORD -Force</code></pre>

<h2>5. تنظيف الملفات المؤقتة وتحسين القرص</h2>
<pre><code class="language-powershell"># تنظيف الملفات المؤقتة
Remove-Item -Path "$env:TEMP\\*" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "C:\\Windows\\Temp\\*" -Recurse -Force -ErrorAction SilentlyContinue

# تشغيل Disk Cleanup
cleanmgr /d C /sageset:1
cleanmgr /d C /sagerun:1

# Defragment HDD (لا تستخدم مع SSD)
Optimize-Volume -DriveLetter C -Defrag -Verbose

# TRIM لـ SSD
Optimize-Volume -DriveLetter C -ReTrim -Verbose</code></pre>

<h2>6. تحديث التعريفات والـ BIOS</h2>
<pre><code class="language-powershell"># التحقق من تحديثات Windows
Get-WindowsUpdate -Install -AcceptAll

# عرض معلومات BIOS
Get-WmiObject Win32_BIOS

# عرض التعريفات المثبتة
Get-WmiObject Win32_PnPSignedDriver | Select-Object DeviceName, DriverVersion, Manufacturer</code></pre>

<h2>الخلاصة</h2>
<p>تطبيق هذه الخطوات سيحسن أداء نظامك بشكل ملحوظ. تذكر إنشاء نقطة استعادة قبل تعديل Registry.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&q=80',
        readingTime: 18,
    },
    {
        title: 'إصلاح مشاكل الشبكة والإنترنت في Windows',
        slug: 'fix-network-internet-issues-windows',
        tags: ['شبكات', 'Internet', 'WiFi', 'DNS'],
        excerpt: 'دليل متكامل لتشخيص وإصلاح جميع مشاكل الشبكة والإنترنت.',
        content: `<h2>1. التشخيص الأولي</h2>
<pre><code class="language-powershell"># فحص حالة الشبكة
Get-NetAdapter | Select-Object Name, Status, LinkSpeed

# فحص IP Configuration
ipconfig /all

# فحص الاتصال
Test-NetConnection -ComputerName google.com -Port 443
ping 8.8.8.8 -n 10

# Traceroute لتحديد مكان المشكلة
tracert google.com</code></pre>

<h2>2. إعادة تعيين مكونات الشبكة</h2>
<pre><code class="language-powershell"># تشغيل كـ Administrator

# إعادة تعيين Winsock
netsh winsock reset

# إعادة تعيين IP Stack
netsh int ip reset

# تجديد DHCP Lease
ipconfig /release
ipconfig /renew

# مسح DNS Cache
ipconfig /flushdns

# إعادة تعيين Firewall للإعدادات الافتراضية
netsh advfirewall reset

# إعادة تشغيل الشبكة بالكامل (يتطلب إعادة تشغيل)
netsh int ip reset resetlog.txt
netsh winsock reset catalog</code></pre>

<h2>3. تغيير DNS للحصول على سرعة أفضل</h2>
<pre><code class="language-powershell"># الحصول على اسم المحول
$adapter = Get-NetAdapter | Where-Object {$_.Status -eq "Up"} | Select-Object -First 1

# تعيين Google DNS
Set-DnsClientServerAddress -InterfaceAlias $adapter.Name -ServerAddresses ("8.8.8.8","8.8.4.4")

# أو Cloudflare DNS (أسرع عادة)
Set-DnsClientServerAddress -InterfaceAlias $adapter.Name -ServerAddresses ("1.1.1.1","1.0.0.1")

# التحقق من الإعداد الجديد
Get-DnsClientServerAddress -InterfaceAlias $adapter.Name</code></pre>

<h2>4. إصلاح مشاكل WiFi</h2>
<pre><code class="language-powershell"># عرض الشبكات المحفوظة
netsh wlan show profiles

# حذف شبكة معينة لإعادة الاتصال
netsh wlan delete profile name="NetworkName"

# عرض معلومات الشبكة الحالية
netsh wlan show interfaces

# إعادة تعيين WiFi adapter
Disable-NetAdapter -Name "Wi-Fi" -Confirm:$false
Start-Sleep -Seconds 5
Enable-NetAdapter -Name "Wi-Fi"

# فحص driver الـ WiFi
Get-NetAdapter -Name "Wi-Fi" | Get-NetAdapterDriver</code></pre>

<h2>5. تشخيص المشاكل المتقدمة</h2>
<pre><code class="language-powershell"># فحص الأحداث المتعلقة بالشبكة
Get-WinEvent -LogName "Microsoft-Windows-NetworkProfile/Operational" -MaxEvents 50

# مراقبة حزم الشبكة
netstat -ano | findstr "ESTABLISHED"

# فحص منافذ مفتوحة
netstat -an | findstr "LISTENING"

# اختبار سرعة الاتصال بين نقطتين
$result = Test-NetConnection -ComputerName "speedtest.net" -TraceRoute
$result.TraceRoute</code></pre>

<h2>الخلاصة</h2>
<p>اتبع الخطوات بالترتيب وأعد تشغيل الكمبيوتر بعد تنفيذ أوامر reset. معظم مشاكل الشبكة تُحل بإعادة تعيين المكونات.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
        readingTime: 15,
    },
    {
        title: 'استعادة البيانات المحذوفة: دليل شامل',
        slug: 'data-recovery-complete-guide',
        tags: ['Data Recovery', 'استعادة', 'ملفات', 'HDD', 'SSD'],
        excerpt: 'كل ما تحتاج معرفته لاستعادة الملفات المحذوفة من أي وسيط تخزين.',
        content: `<h2>قبل البدء: قواعد مهمة</h2>
<ul>
<li><strong>لا تكتب أي بيانات</strong> على القرص المراد استعادة الملفات منه</li>
<li>لا تثبت برامج الاستعادة على نفس القرص</li>
<li>الوقت عامل حاسم - كلما بدأت أسرع كانت النتائج أفضل</li>
</ul>

<h2>1. استعادة من سلة المهملات</h2>
<pre><code class="language-powershell"># البحث في سلة المهملات
$shell = New-Object -ComObject Shell.Application
$recycleBin = $shell.NameSpace(0xA)
$recycleBin.Items() | Select-Object Name, Path, Size

# استعادة ملف معين
$item = $recycleBin.Items() | Where-Object {$_.Name -like "*filename*"}
# اضغط بزر الماوس الأيمن → Restore</code></pre>

<h2>2. استعادة من File History</h2>
<pre><code class="language-powershell"># التحقق من تفعيل File History
Get-WmiObject -Namespace root\\Microsoft\\Windows\\Storage -Class MSFT_FileHistoryConfiguration

# عرض النسخ السابقة
wmic shadowcopy list brief

# استخدام Previous Versions
# انقر بزر الماوس الأيمن على المجلد → Properties → Previous Versions</code></pre>

<h2>3. استخدام Windows File Recovery (أداة Microsoft المجانية)</h2>
<pre><code class="language-powershell"># تثبيت من Microsoft Store
winget install "Windows File Recovery"

# استعادة ملفات محذوفة مؤخراً (Regular mode)
winfr C: D:\\Recovery /regular /n *.docx /n *.xlsx /n *.pdf

# استعادة شاملة (Extensive mode) - للملفات القديمة
winfr C: D:\\Recovery /extensive /n \\Users\\Username\\Documents\\

# استعادة بناءً على نوع الملف
winfr C: D:\\Recovery /extensive /n *.jpg /n *.png /n *.mp4

# استعادة مجلد كامل
winfr C: D:\\Recovery /extensive /n \\Users\\Username\\Desktop\\</code></pre>

<h2>4. أوامر لفحص صحة القرص</h2>
<pre><code class="language-powershell"># فحص أخطاء القرص
chkdsk C: /f /r /x

# فحص صحة SSD
Get-PhysicalDisk | Get-StorageReliabilityCounter

# معلومات SMART للأقراص
wmic diskdrive get status, model, size

# فحص قطاعات تالفة
Get-WmiObject -namespace root\\wmi -class MSStorageDriver_FailurePredictStatus</code></pre>

<h2>5. برامج استعادة متقدمة</h2>
<h3>Recuva (مجاني):</h3>
<ol>
<li>ثبّت Recuva على قرص مختلف</li>
<li>اختر نوع الملفات المراد استعادتها</li>
<li>حدد موقع الملف الأصلي</li>
<li>فعّل Deep Scan للبحث الشامل</li>
</ol>

<h3>TestDisk (مجاني - للمحترفين):</h3>
<pre><code class="language-bash"># لاستعادة الأقسام المحذوفة
testdisk /dev/sda

# PhotoRec لاستعادة الملفات
photorec /dev/sda</code></pre>

<h2>6. استعادة من SSD (أصعب)</h2>
<p>الـ SSD يستخدم TRIM يجعل الاستعادة صعبة:</p>
<ul>
<li>تحقق إذا كان TRIM مفعلاً: <code>fsutil behavior query DisableDeleteNotify</code></li>
<li>إذا كانت القيمة 0، TRIM مفعل والاستعادة صعبة</li>
<li>جرب برامج متخصصة مثل R-Studio أو GetDataBack</li>
</ul>

<h2>الخلاصة</h2>
<p>أهم شيء هو التصرف بسرعة وعدم الكتابة على القرص. للملفات المهمة جداً، استشر متخصصين في استعادة البيانات.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        readingTime: 16,
    },
];
