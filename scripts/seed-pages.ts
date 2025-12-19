import mongoose from 'mongoose';

// PRODUCTION DATABASE
const MONGODB_URI = 'mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techiss-blog?appName=Mawaddah';

// Define schema inline
const PageSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    titleAr: { type: String, required: true },
    titleEn: { type: String, required: true },
    contentAr: { type: String, required: true },
    contentEn: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);

const initialPages = [
    {
        slug: 'privacy-policy',
        titleAr: 'سياسة الخصوصية',
        titleEn: 'Privacy Policy',
        contentAr: `<h2>سياسة الخصوصية</h2>
<p>نحن في مدونة التقنية نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية.</p>

<h3>جمع البيانات</h3>
<p>نقوم بجمع المعلومات التي تقدمها لنا طوعاً عند استخدام موقعنا، مثل الاسم والبريد الإلكتروني عند التواصل معنا.</p>

<h3>استخدام البيانات</h3>
<p>نستخدم بياناتك للرد على استفساراتك وتحسين خدماتنا. لن نشارك بياناتك مع أطراف ثالثة دون موافقتك.</p>

<h3>ملفات تعريف الارتباط</h3>
<p>نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح. يمكنك تعطيلها من إعدادات متصفحك.</p>

<h3>حقوقك</h3>
<p>لديك الحق في الوصول إلى بياناتك وتصحيحها أو حذفها. تواصل معنا لأي طلبات متعلقة بالخصوصية.</p>

<h3>تحديثات السياسة</h3>
<p>قد نقوم بتحديث هذه السياسة. سننشر أي تغييرات على هذه الصفحة.</p>`,
        contentEn: `<h2>Privacy Policy</h2>
<p>At Tech Blog, we value your privacy and are committed to protecting your personal data.</p>

<h3>Data Collection</h3>
<p>We collect information you voluntarily provide when using our site, such as name and email when contacting us.</p>

<h3>Data Usage</h3>
<p>We use your data to respond to your inquiries and improve our services. We will not share your data with third parties without your consent.</p>

<h3>Cookies</h3>
<p>We use cookies to enhance browsing experience. You can disable them in your browser settings.</p>

<h3>Your Rights</h3>
<p>You have the right to access, correct, or delete your data. Contact us for any privacy-related requests.</p>

<h3>Policy Updates</h3>
<p>We may update this policy. Any changes will be posted on this page.</p>`,
        isActive: true,
    },
    {
        slug: 'terms',
        titleAr: 'شروط الاستخدام',
        titleEn: 'Terms of Use',
        contentAr: `<h2>شروط الاستخدام</h2>
<p>باستخدامك لموقع مدونة التقنية، فإنك توافق على الالتزام بهذه الشروط.</p>

<h3>استخدام المحتوى</h3>
<p>جميع المحتويات على هذا الموقع محمية بحقوق الطبع والنشر. يمكنك الاستفادة من المحتوى للاستخدام الشخصي فقط.</p>

<h3>السلوك المقبول</h3>
<p>تتعهد بعدم استخدام الموقع لأي غرض غير قانوني أو ضار. يُحظر نشر محتوى مسيء أو مضلل.</p>

<h3>التعليقات والمشاركات</h3>
<p>أنت مسؤول عن المحتوى الذي تنشره. نحتفظ بالحق في إزالة أي محتوى ينتهك هذه الشروط.</p>

<h3>إخلاء المسؤولية</h3>
<p>المعلومات المقدمة على الموقع هي للأغراض التعليمية فقط. لا نتحمل مسؤولية أي أضرار ناتجة عن استخدام هذه المعلومات.</p>

<h3>التعديلات</h3>
<p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. يُعتبر استمرارك في استخدام الموقع قبولاً للتعديلات.</p>`,
        contentEn: `<h2>Terms of Use</h2>
<p>By using Tech Blog website, you agree to comply with these terms.</p>

<h3>Content Usage</h3>
<p>All content on this site is protected by copyright. You may use the content for personal use only.</p>

<h3>Acceptable Conduct</h3>
<p>You agree not to use the site for any illegal or harmful purpose. Posting offensive or misleading content is prohibited.</p>

<h3>Comments and Posts</h3>
<p>You are responsible for the content you post. We reserve the right to remove any content that violates these terms.</p>

<h3>Disclaimer</h3>
<p>Information provided on the site is for educational purposes only. We are not liable for any damages resulting from using this information.</p>

<h3>Modifications</h3>
<p>We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of modifications.</p>`,
        isActive: true,
    },
    {
        slug: 'about',
        titleAr: 'من نحن',
        titleEn: 'About Us',
        contentAr: `<h2>من نحن</h2>
<p>مرحباً بكم في مدونة التقنية، وجهتكم الأولى للحلول التقنية والمراجعات العربية.</p>

<h3>رسالتنا</h3>
<p>نسعى لتقديم محتوى تقني عربي عالي الجودة يساعد المستخدمين على حل مشاكلهم التقنية واتخاذ قرارات شراء مدروسة.</p>

<h3>ماذا نقدم</h3>
<ul>
<li><strong>حلول المشاكل التقنية:</strong> شروحات مفصلة لحل مشاكل الويندوز والهواتف والبرامج</li>
<li><strong>مراجعات الأجهزة:</strong> مراجعات موضوعية لأحدث الهواتف واللابتوبات والأجهزة الإلكترونية</li>
<li><strong>نصائح البرمجة:</strong> دروس ونصائح للمبرمجين المبتدئين والمحترفين</li>
</ul>

<h3>فريقنا</h3>
<p>فريقنا مكون من خبراء تقنيين ومتحمسين للتكنولوجيا يعملون بشغف لتقديم أفضل محتوى لكم.</p>

<h3>تواصل معنا</h3>
<p>نرحب بملاحظاتكم واقتراحاتكم. تواصلوا معنا عبر صفحة الاتصال.</p>`,
        contentEn: `<h2>About Us</h2>
<p>Welcome to Tech Blog, your premier destination for tech solutions and reviews.</p>

<h3>Our Mission</h3>
<p>We strive to provide high-quality tech content that helps users solve their technical problems and make informed purchasing decisions.</p>

<h3>What We Offer</h3>
<ul>
<li><strong>Tech Issue Solutions:</strong> Detailed explanations for solving Windows, phone, and software problems</li>
<li><strong>Device Reviews:</strong> Objective reviews of the latest phones, laptops, and electronics</li>
<li><strong>Programming Tips:</strong> Lessons and tips for beginner and professional programmers</li>
</ul>

<h3>Our Team</h3>
<p>Our team consists of tech experts and technology enthusiasts who work passionately to deliver the best content for you.</p>

<h3>Contact Us</h3>
<p>We welcome your feedback and suggestions. Reach out to us through our contact page.</p>`,
        isActive: true,
    },
    {
        slug: 'contact-info',
        titleAr: 'معلومات الاتصال',
        titleEn: 'Contact Information',
        contentAr: `<h2>معلومات الاتصال</h2>
<p>نحن نرحب بتواصلكم معنا في أي وقت.</p>

<h3>البريد الإلكتروني</h3>
<p>للاستفسارات العامة: <a href="mailto:info@techiss.store">info@techiss.store</a></p>

<h3>الموقع الإلكتروني</h3>
<p><a href="https://techiss.store">techiss.store</a></p>

<h3>ساعات العمل</h3>
<p>نرد على الرسائل خلال 24-48 ساعة في أيام العمل (الأحد - الخميس).</p>

<h3>وسائل التواصل الاجتماعي</h3>
<p>تابعونا على منصات التواصل الاجتماعي للحصول على آخر الأخبار والتحديثات.</p>`,
        contentEn: `<h2>Contact Information</h2>
<p>We welcome your communication at any time.</p>

<h3>Email</h3>
<p>For general inquiries: <a href="mailto:info@techiss.store">info@techiss.store</a></p>

<h3>Website</h3>
<p><a href="https://techiss.store">techiss.store</a></p>

<h3>Working Hours</h3>
<p>We respond to messages within 24-48 hours on business days (Sunday - Thursday).</p>

<h3>Social Media</h3>
<p>Follow us on social media platforms for the latest news and updates.</p>`,
        isActive: true,
    },
];

async function seedPages() {
    console.log('');
    console.log('========================================================');
    console.log('  SEEDING STATIC PAGES TO PRODUCTION');
    console.log('  Database: techiss-blog');
    console.log('========================================================');
    console.log('');

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        console.log('');

        for (const pageData of initialPages) {
            const existing = await Page.findOne({ slug: pageData.slug });
            if (existing) {
                console.log(`  Skip (exists): ${pageData.slug}`);
            } else {
                await Page.create(pageData);
                console.log(`  Created: ${pageData.slug}`);
            }
        }

        console.log('');
        console.log('========================================================');
        console.log('  SEED COMPLETE!');
        console.log('========================================================');
        console.log('  Pages: privacy-policy, terms, about, contact-info');
        console.log('========================================================');

        await mongoose.disconnect();
        console.log('');
        console.log('Disconnected from MongoDB');

    } catch (error) {
        console.error('ERROR:', error);
        await mongoose.disconnect();
        process.exit(1);
    }
}

seedPages();
