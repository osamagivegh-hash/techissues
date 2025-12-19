import mongoose from 'mongoose';

// PRODUCTION DATABASE - techiss-blog (same as the live server)
const MONGODB_URI = 'mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techiss-blog?appName=Mawaddah';

// Import the new 2025 batch 2 reviews
import { reviews2025Batch2Ar, reviews2025Batch2En } from './seed-data/reviews-2025-batch2';

// Define schemas inline
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

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

// ═══════════════════════════════════════════════════════════════════════════
// FORMATTING FUNCTION - Applies proper styling to content
// ═══════════════════════════════════════════════════════════════════════════

function formatContent(content: string, lang: 'ar' | 'en'): string {
    let formatted = content;

    // Format H2 headings with styling + colon
    const h2Style = 'font-size: 1.5em; font-weight: bold; color: #1a365d; margin-top: 1.5em; margin-bottom: 0.75em; padding-bottom: 0.4em; border-bottom: 3px solid #3182ce;';
    formatted = formatted.replace(/<h2>([^<]+)<\/h2>/gi, (match, text) => {
        let heading = text.trim().replace(/:+$/, '').trim() + ':';
        return `\n\n<h2 style="${h2Style}">${heading}</h2>\n\n`;
    });

    // Format paragraphs with proper styling
    const pStyle = 'line-height: 1.8; margin-bottom: 1em; font-size: 1.05em;';
    formatted = formatted.replace(/<p>/gi, `<p style="${pStyle}">`);

    // Bold important keywords based on language
    if (lang === 'ar') {
        const keywords = ['ممتاز', 'رائع', 'استثنائي', 'الأفضل', 'قوي', 'سريع', 'مذهل',
            'الكاميرا', 'الشاشة', 'البطارية', 'المعالج', 'الأداء', 'التصميم',
            'الخلاصة', 'موصى به', 'أقوى', 'أسرع', 'جديد', 'متطور', 'فاخر'];
        for (const kw of keywords) {
            formatted = formatted.replace(new RegExp(`(${kw})`, 'g'), '<strong>$1</strong>');
        }
        // Wrap in RTL container
        formatted = `<div style="direction: rtl; text-align: right;">\n${formatted.trim()}\n</div>`;
    } else {
        const keywords = ['excellent', 'amazing', 'exceptional', 'best', 'powerful', 'fast', 'stunning',
            'camera', 'display', 'battery', 'processor', 'performance', 'design',
            'verdict', 'recommended', 'new', 'advanced', 'premium', 'fastest', 'most powerful'];
        for (const kw of keywords) {
            formatted = formatted.replace(new RegExp(`\\b(${kw})\\b`, 'gi'), '<strong>$1</strong>');
        }
        // Wrap in LTR container
        formatted = `<div style="direction: ltr; text-align: left;">\n${formatted.trim()}\n</div>`;
    }

    // Clean up double strong tags
    formatted = formatted.replace(/<strong><strong>/g, '<strong>');
    formatted = formatted.replace(/<\/strong><\/strong>/g, '</strong>');

    return formatted;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN SEED FUNCTION - ADDS new posts WITHOUT deleting existing ones
// ═══════════════════════════════════════════════════════════════════════════

async function addReviewsBatch2ToProduction() {
    console.log('');
    console.log('========================================================');
    console.log('  ADDING 20 NEW DEVICE REVIEWS TO PRODUCTION DATABASE');
    console.log('  Database: techiss-blog (PRODUCTION)');
    console.log('  10 Arabic + 10 English = 20 Total');
    console.log('  Keeping all existing content!');
    console.log('========================================================');
    console.log('');

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to PRODUCTION MongoDB (techiss-blog)');
        console.log('');

        // Get the device reviews categories
        const arCategory = await Category.findOne({ slug: 'device-reviews', language: 'ar' }).lean() as any;
        const enCategory = await Category.findOne({ slug: 'device-reviews', language: 'en' }).lean() as any;

        if (!arCategory || !enCategory) {
            console.log('ERROR: Device Reviews categories not found!');
            console.log('  AR Category:', arCategory);
            console.log('  EN Category:', enCategory);
            await mongoose.disconnect();
            return;
        }

        console.log('Categories found:');
        console.log('  AR:', arCategory.name);
        console.log('  EN:', enCategory.name);
        console.log('');

        // Check existing post count
        const existingCount = await Post.countDocuments({
            category: { $in: [arCategory._id, enCategory._id] }
        });
        console.log('Existing Device Reviews:', existingCount);
        console.log('');

        // Prepare Arabic posts with formatting
        console.log('Preparing Arabic posts...');
        const arPosts = reviews2025Batch2Ar.map(article => ({
            title: article.title,
            slug: article.slug,
            tags: article.tags,
            excerpt: article.excerpt,
            content: formatContent(article.content, 'ar'),
            coverImage: article.coverImage,
            readingTime: article.readingTime,
            language: 'ar',
            category: arCategory._id,
            status: 'published',
        }));

        // Prepare English posts with formatting
        console.log('Preparing English posts...');
        const enPosts = reviews2025Batch2En.map(article => ({
            title: article.title,
            slug: article.slug,
            tags: article.tags,
            excerpt: article.excerpt,
            content: formatContent(article.content, 'en'),
            coverImage: article.coverImage,
            readingTime: article.readingTime,
            language: 'en',
            category: enCategory._id,
            status: 'published',
        }));

        console.log('');
        console.log('Adding posts (skipping if slug already exists)...');
        console.log('');

        let arInserted = 0;
        let enInserted = 0;
        let skipped = 0;

        // Insert Arabic posts (skip if slug exists)
        for (const post of arPosts) {
            const exists = await Post.findOne({ slug: post.slug, language: 'ar' });
            if (exists) {
                console.log('  Skip (exists):', post.slug);
                skipped++;
            } else {
                await Post.create(post);
                console.log('  Added AR:', post.title.substring(0, 50) + '...');
                arInserted++;
            }
        }

        // Insert English posts (skip if slug exists)
        for (const post of enPosts) {
            const exists = await Post.findOne({ slug: post.slug, language: 'en' });
            if (exists) {
                console.log('  Skip (exists):', post.slug);
                skipped++;
            } else {
                await Post.create(post);
                console.log('  Added EN:', post.title.substring(0, 50) + '...');
                enInserted++;
            }
        }

        // Final count
        const newCount = await Post.countDocuments({
            category: { $in: [arCategory._id, enCategory._id] }
        });

        // Summary
        console.log('');
        console.log('========================================================');
        console.log('  SEED COMPLETE!');
        console.log('========================================================');
        console.log('');
        console.log('  NEW 2025 DEVICES ADDED:');
        console.log('    1. Samsung Galaxy Z Fold 6');
        console.log('    2. Apple Watch Ultra 3');
        console.log('    3. Sony WH-1000XM6');
        console.log('    4. NVIDIA GeForce RTX 5090');
        console.log('    5. iPad Pro M4 2025');
        console.log('    6. OnePlus 13 Pro');
        console.log('    7. Dell XPS 16 2025');
        console.log('    8. Meta Quest 4');
        console.log('    9. Xiaomi 15 Ultra');
        console.log('   10. AMD Ryzen 9 9950X');
        console.log('');
        console.log('  RESULTS:');
        console.log('    Arabic Posts Added:', arInserted);
        console.log('    English Posts Added:', enInserted);
        console.log('    Skipped (already exist):', skipped);
        console.log('');
        console.log('  DATABASE STATS:');
        console.log('    Previous Device Reviews:', existingCount);
        console.log('    Current Device Reviews:', newCount);
        console.log('    Net Increase: +' + (newCount - existingCount));
        console.log('');
        console.log('  FORMATTING APPLIED:');
        console.log('    - RTL/LTR containers');
        console.log('    - Styled headings with blue borders');
        console.log('    - Paragraphs with proper spacing');
        console.log('    - Key terms bolded');
        console.log('');
        console.log('  All existing posts preserved!');
        console.log('========================================================');

        await mongoose.disconnect();
        console.log('');
        console.log('Disconnected from MongoDB');
        console.log('');

    } catch (error) {
        console.error('ERROR:', error);
        await mongoose.disconnect();
        process.exit(1);
    }
}

addReviewsBatch2ToProduction();
