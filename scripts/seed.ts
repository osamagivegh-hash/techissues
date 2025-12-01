import mongoose from 'mongoose';
import { hashPassword } from '../lib/auth';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

// Define schemas inline to avoid import issues
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: String,
    role: String,
}, { timestamps: true });

const CategorySchema = new mongoose.Schema({
    name: String,
    slug: String,
    language: { type: String, enum: ['ar', 'en'] },
}, { timestamps: true });

const PostSchema = new mongoose.Schema({
    title: String,
    slug: String,
    language: { type: String, enum: ['ar', 'en'] },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    tags: [String],
    excerpt: String,
    content: String,
    coverImage: String,
    status: String,
    readingTime: Number,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

async function seed() {
    try {
        console.log('🌱 Starting bilingual seed...');

        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Category.deleteMany({});
        await Post.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create admin user
        const hashedPassword = await hashPassword('admin123');
        const admin = await User.create({
            name: 'المدير',
            email: 'admin@techissues.com'.toLowerCase().trim(),
            password: hashedPassword,
            role: 'admin',
        });
        console.log('👤 Created admin user (email: admin@techissues.com, password: admin123)');

        // Create Arabic categories
        const arCategories = await Category.insertMany([
            { name: 'البرمجة', slug: 'programming', language: 'ar' },
            { name: 'المشاكل التقنية', slug: 'tech-issues', language: 'ar' },
            { name: 'مراجعات الأجهزة', slug: 'device-reviews', language: 'ar' },
        ]);

        // Create English categories
        const enCategories = await Category.insertMany([
            { name: 'Programming', slug: 'programming', language: 'en' },
            { name: 'Tech Issues', slug: 'tech-issues', language: 'en' },
            { name: 'Device Reviews', slug: 'device-reviews', language: 'en' },
        ]);

        console.log('📁 Created categories (AR + EN)');

        // Arabic Posts
        const arPosts = [
            // Programming - Arabic
            {
                title: 'مقدمة في لغة Python للمبتدئين',
                slug: 'python-introduction',
                language: 'ar',
                category: arCategories[0]._id,
                tags: ['Python', 'برمجة', 'تعليم'],
                excerpt: 'تعلم أساسيات لغة Python من الصفر مع أمثلة عملية وتطبيقات واقعية.',
                content: `<h2>ما هي لغة Python؟</h2>
<p>Python هي لغة برمجة عالية المستوى، سهلة التعلم وقوية في نفس الوقت.</p>
<h2>لماذا تتعلم Python؟</h2>
<ul>
<li>سهلة التعلم للمبتدئين</li>
<li>مجتمع كبير ونشط</li>
<li>مكتبات ضخمة لجميع الاستخدامات</li>
</ul>`,
                coverImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
                status: 'published',
                readingTime: 5,
            },
            {
                title: 'أفضل ممارسات JavaScript الحديثة',
                slug: 'modern-javascript',
                language: 'ar',
                category: arCategories[0]._id,
                tags: ['JavaScript', 'ES6'],
                excerpt: 'تعرف على أحدث ممارسات JavaScript لكتابة كود نظيف وفعال.',
                content: `<h2>استخدام const و let</h2><p>في JavaScript الحديثة، يُفضل استخدام const و let بدلاً من var.</p>`,
                coverImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800',
                status: 'published',
                readingTime: 7,
            },
            {
                title: 'بناء API باستخدام Node.js',
                slug: 'nodejs-api',
                language: 'ar',
                category: arCategories[0]._id,
                tags: ['Node.js', 'Express', 'API'],
                excerpt: 'دليل شامل لبناء واجهة برمجية RESTful باستخدام Node.js و Express.',
                content: `<h2>ما هو Express؟</h2><p>Express هو إطار عمل لـ Node.js يسهل بناء تطبيقات الويب.</p>`,
                coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
                status: 'published',
                readingTime: 10,
            },

            // Tech Issues - Arabic
            {
                title: 'حل مشكلة بطء Windows 10',
                slug: 'fix-slow-windows',
                language: 'ar',
                category: arCategories[1]._id,
                tags: ['Windows', 'Performance'],
                excerpt: 'خطوات عملية لتسريع جهاز الكمبيوتر الذي يعمل بنظام Windows 10.',
                content: `<h2>الأسباب الشائعة</h2><ul><li>برامج تعمل في الخلفية</li><li>مساحة تخزين ممتلئة</li></ul>`,
                coverImage: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800',
                status: 'published',
                readingTime: 6,
            },
            {
                title: 'إصلاح مشاكل WiFi في الهاتف',
                slug: 'fix-wifi-phone',
                language: 'ar',
                category: arCategories[1]._id,
                tags: ['WiFi', 'Mobile'],
                excerpt: 'حلول فعالة لمشاكل الاتصال بالواي فاي في الهواتف الذكية.',
                content: `<h2>المشاكل الشائعة</h2><p>عدم القدرة على الاتصال بالشبكة أو انقطاع متكرر.</p>`,
                coverImage: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800',
                status: 'published',
                readingTime: 5,
            },
            {
                title: 'حل الشاشة الزرقاء في Windows',
                slug: 'blue-screen-fix',
                language: 'ar',
                category: arCategories[1]._id,
                tags: ['Windows', 'BSOD'],
                excerpt: 'دليل شامل لفهم وحل مشكلة الشاشة الزرقاء في Windows.',
                content: `<h2>ما هي الشاشة الزرقاء؟</h2><p>رسالة خطأ تظهر عند حدوث مشكلة خطيرة في النظام.</p>`,
                coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800',
                status: 'published',
                readingTime: 8,
            },

            // Device Reviews - Arabic
            {
                title: 'مراجعة iPhone 15 Pro',
                slug: 'iphone-15-pro-review',
                language: 'ar',
                category: arCategories[2]._id,
                tags: ['iPhone', 'Apple'],
                excerpt: 'مراجعة تفصيلية لأحدث هاتف من Apple مع المميزات والعيوب.',
                content: `<h2>المواصفات</h2><ul><li>المعالج: A17 Pro</li><li>الشاشة: 6.1 بوصة OLED</li></ul>`,
                coverImage: 'https://images.unsplash.com/photo-1592286927505-b0501e6f0f15?w=800',
                status: 'published',
                readingTime: 8,
            },
            {
                title: 'مراجعة Dell XPS 15',
                slug: 'dell-xps-15',
                language: 'ar',
                category: arCategories[2]._id,
                tags: ['Laptop', 'Dell'],
                excerpt: 'تقييم شامل لأحد أفضل أجهزة اللابتوب في السوق.',
                content: `<h2>المواصفات</h2><ul><li>المعالج: Intel Core i7</li><li>الذاكرة: 16GB RAM</li></ul>`,
                coverImage: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
                status: 'published',
                readingTime: 7,
            },
            {
                title: 'مراجعة Sony WH-1000XM5',
                slug: 'sony-headphones',
                language: 'ar',
                category: arCategories[2]._id,
                tags: ['Headphones', 'Sony'],
                excerpt: 'تقييم لأفضل سماعات إلغاء الضوضاء في السوق.',
                content: `<h2>المميزات</h2><ul><li>جودة صوت ممتازة</li><li>إلغاء ضوضاء قوي</li></ul>`,
                coverImage: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800',
                status: 'published',
                readingTime: 6,
            },
        ];

        // English Posts
        const enPosts = [
            // Programming - English
            {
                title: 'Python Introduction for Beginners',
                slug: 'python-intro',
                language: 'en',
                category: enCategories[0]._id,
                tags: ['Python', 'Programming', 'Tutorial'],
                excerpt: 'Learn Python basics from scratch with practical examples and real-world applications.',
                content: `<h2>What is Python?</h2>
<p>Python is a high-level programming language that is easy to learn yet powerful.</p>
<h2>Why Learn Python?</h2>
<ul>
<li>Easy for beginners</li>
<li>Large active community</li>
<li>Extensive libraries</li>
</ul>`,
                coverImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
                status: 'published',
                readingTime: 5,
            },
            {
                title: 'Modern JavaScript Best Practices',
                slug: 'js-best-practices',
                language: 'en',
                category: enCategories[0]._id,
                tags: ['JavaScript', 'ES6', 'Web Development'],
                excerpt: 'Learn the latest JavaScript practices for writing clean and efficient code.',
                content: `<h2>Use const and let</h2><p>In modern JavaScript, prefer const and let over var.</p>`,
                coverImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800',
                status: 'published',
                readingTime: 7,
            },
            {
                title: 'Building APIs with Node.js',
                slug: 'nodejs-api-guide',
                language: 'en',
                category: enCategories[0]._id,
                tags: ['Node.js', 'Express', 'API'],
                excerpt: 'A comprehensive guide to building RESTful APIs using Node.js and Express.',
                content: `<h2>What is Express?</h2><p>Express is a Node.js framework that makes building web applications easier.</p>`,
                coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
                status: 'published',
                readingTime: 10,
            },

            // Tech Issues - English
            {
                title: 'Fix Slow Windows 10 Performance',
                slug: 'windows-10-slow',
                language: 'en',
                category: enCategories[1]._id,
                tags: ['Windows', 'Performance', 'Troubleshooting'],
                excerpt: 'Practical steps to speed up your Windows 10 computer.',
                content: `<h2>Common Causes</h2><ul><li>Background programs</li><li>Full storage</li></ul>`,
                coverImage: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800',
                status: 'published',
                readingTime: 6,
            },
            {
                title: 'Troubleshoot WiFi Issues on Phone',
                slug: 'wifi-troubleshoot',
                language: 'en',
                category: enCategories[1]._id,
                tags: ['WiFi', 'Mobile', 'Network'],
                excerpt: 'Effective solutions for WiFi connection problems on smartphones.',
                content: `<h2>Common Issues</h2><p>Unable to connect or frequent disconnections.</p>`,
                coverImage: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800',
                status: 'published',
                readingTime: 5,
            },
            {
                title: 'Fix Windows Blue Screen Errors',
                slug: 'bsod-fix',
                language: 'en',
                category: enCategories[1]._id,
                tags: ['Windows', 'BSOD', 'Error'],
                excerpt: 'Comprehensive guide to understanding and fixing Blue Screen of Death errors.',
                content: `<h2>What is BSOD?</h2><p>An error message that appears when a critical system problem occurs.</p>`,
                coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800',
                status: 'published',
                readingTime: 8,
            },

            // Device Reviews - English
            {
                title: 'iPhone 15 Pro Review',
                slug: 'iphone-15-review',
                language: 'en',
                category: enCategories[2]._id,
                tags: ['iPhone', 'Apple', 'Review'],
                excerpt: 'Detailed review of the latest iPhone with pros and cons.',
                content: `<h2>Specifications</h2><ul><li>Processor: A17 Pro</li><li>Display: 6.1" OLED</li></ul>`,
                coverImage: 'https://images.unsplash.com/photo-1592286927505-b0501e6f0f15?w=800',
                status: 'published',
                readingTime: 8,
            },
            {
                title: 'Dell XPS 15 Review',
                slug: 'dell-xps-review',
                language: 'en',
                category: enCategories[2]._id,
                tags: ['Laptop', 'Dell', 'Review'],
                excerpt: 'Comprehensive review of one of the best laptops on the market.',
                content: `<h2>Specifications</h2><ul><li>Processor: Intel Core i7</li><li>RAM: 16GB</li></ul>`,
                coverImage: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
                status: 'published',
                readingTime: 7,
            },
            {
                title: 'Sony WH-1000XM5 Review',
                slug: 'sony-xm5-review',
                language: 'en',
                category: enCategories[2]._id,
                tags: ['Headphones', 'Sony', 'Audio'],
                excerpt: 'Review of the best noise-canceling headphones available.',
                content: `<h2>Features</h2><ul><li>Excellent sound quality</li><li>Strong noise cancellation</li></ul>`,
                coverImage: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800',
                status: 'published',
                readingTime: 6,
            },
        ];

        await Post.insertMany([...arPosts, ...enPosts]);
        console.log('📝 Created sample posts (AR + EN)');

        console.log('\n✅ Bilingual seed completed successfully!');
        console.log('\n📋 Summary:');
        console.log(`   - Admin user: admin@techissues.com (password: admin123)`);
        console.log(`   - Arabic Categories: ${arCategories.length}`);
        console.log(`   - English Categories: ${enCategories.length}`);
        console.log(`   - Arabic Posts: ${arPosts.length}`);
        console.log(`   - English Posts: ${enPosts.length}`);
        console.log(`   - Total Posts: ${arPosts.length + enPosts.length}`);

        await mongoose.disconnect();
        console.log('\n👋 Disconnected from MongoDB');
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
}

seed();
