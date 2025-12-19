import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';

// Import the new 2025 reviews
import { reviews2025Ar, reviews2025En } from './seed-data/reviews-2025';

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

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
// FORMATTING FUNCTION - Same as used in other formatters
// ═══════════════════════════════════════════════════════════════════════════

function formatContent(content: string, lang: 'ar' | 'en'): string {
    let formatted = content;

    // Format H2 headings with styling + colon
    const h2Style = 'font-size: 1.5em; font-weight: bold; color: #1a365d; margin-top: 1.5em; margin-bottom: 0.75em; padding-bottom: 0.4em; border-bottom: 3px solid #3182ce;';
    formatted = formatted.replace(/<h2>([^<]+)<\/h2>/gi, (match, text) => {
        let heading = text.trim().replace(/:+$/, '').trim() + ':';
        return `\n\n<h2 style="${h2Style}">${heading}</h2>\n\n`;
    });

    // Format paragraphs
    const pStyle = 'line-height: 1.8; margin-bottom: 1em; font-size: 1.05em;';
    formatted = formatted.replace(/<p>/gi, `<p style="${pStyle}">`);

    // Bold important keywords for reviews
    if (lang === 'ar') {
        const keywords = ['ممتاز', 'رائع', 'استثنائي', 'الأفضل', 'قوي', 'سريع', 'مذهل',
            'الكاميرا', 'الشاشة', 'البطارية', 'المعالج', 'الأداء', 'التصميم',
            'الخلاصة', 'موصى به'];
        for (const kw of keywords) {
            const regex = new RegExp(`(${kw})`, 'g');
            formatted = formatted.replace(regex, '<strong>$1</strong>');
        }
    } else {
        const keywords = ['excellent', 'amazing', 'exceptional', 'best', 'powerful', 'fast', 'stunning',
            'camera', 'display', 'battery', 'processor', 'performance', 'design',
            'verdict', 'recommended'];
        for (const kw of keywords) {
            const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
            formatted = formatted.replace(regex, '<strong>$1</strong>');
        }
    }

    // Clean up double strong tags
    formatted = formatted.replace(/<strong><strong>/g, '<strong>');
    formatted = formatted.replace(/<\/strong><\/strong>/g, '</strong>');
    formatted = formatted.replace(/\n{4,}/g, '\n\n\n');

    // Wrap in direction container
    if (lang === 'ar') {
        formatted = `<div style="direction: rtl; text-align: right;">\n${formatted.trim()}\n</div>`;
    } else {
        formatted = `<div style="direction: ltr; text-align: left;">\n${formatted.trim()}\n</div>`;
    }

    return formatted;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN SEED FUNCTION - ADDS new posts WITHOUT deleting existing ones
// ═══════════════════════════════════════════════════════════════════════════

async function addReviews2025() {
    console.log('');
    console.log('╔═══════════════════════════════════════════════════════════════════╗');
    console.log('║  📱 ADDING 2025 DEVICE REVIEWS                                    ║');
    console.log('║  10 New Articles (5 Arabic + 5 English)                           ║');
    console.log('║  ⚠️  Keeping all existing posts in database                       ║');
    console.log('╚═══════════════════════════════════════════════════════════════════╝');
    console.log('');

    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('✅ Connected to MongoDB');
        console.log('');

        // Get the device reviews categories
        const arCategory = await Category.findOne({ slug: 'device-reviews', language: 'ar' }).lean() as any;
        const enCategory = await Category.findOne({ slug: 'device-reviews', language: 'en' }).lean() as any;

        if (!arCategory || !enCategory) {
            console.log('❌ Device Reviews categories not found!');
            console.log('   AR Category:', arCategory);
            console.log('   EN Category:', enCategory);
            await mongoose.disconnect();
            return;
        }

        console.log('📁 Categories found:');
        console.log(`   • ${arCategory.name} (ar)`);
        console.log(`   • ${enCategory.name} (en)`);
        console.log('');

        // Check existing post count
        const existingCount = await Post.countDocuments({
            category: { $in: [arCategory._id, enCategory._id] }
        });
        console.log(`📊 Existing Device Reviews posts: ${existingCount}`);
        console.log('');

        // Prepare Arabic posts with formatting
        console.log('📝 Preparing Arabic posts...');
        const arPosts = reviews2025Ar.map(article => ({
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
        console.log('📝 Preparing English posts...');
        const enPosts = reviews2025En.map(article => ({
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

        // Check for duplicate slugs
        console.log('');
        console.log('🔍 Checking for duplicate slugs...');

        let arInserted = 0;
        let enInserted = 0;
        let skipped = 0;

        // Insert Arabic posts (skip if slug exists)
        for (const post of arPosts) {
            const exists = await Post.findOne({ slug: post.slug, language: 'ar' });
            if (exists) {
                console.log(`   ⚠️ Skipping (exists): ${post.slug}`);
                skipped++;
            } else {
                await Post.create(post);
                console.log(`   ✅ Added: ${post.title.substring(0, 50)}...`);
                arInserted++;
            }
        }

        // Insert English posts (skip if slug exists)
        for (const post of enPosts) {
            const exists = await Post.findOne({ slug: post.slug, language: 'en' });
            if (exists) {
                console.log(`   ⚠️ Skipping (exists): ${post.slug}`);
                skipped++;
            } else {
                await Post.create(post);
                console.log(`   ✅ Added: ${post.title.substring(0, 50)}...`);
                enInserted++;
            }
        }

        // Final count
        const newCount = await Post.countDocuments({
            category: { $in: [arCategory._id, enCategory._id] }
        });

        // Summary
        console.log('');
        console.log('═══════════════════════════════════════════════════════════════════');
        console.log('');
        console.log('╔═══════════════════════════════════════════════════════════════════╗');
        console.log('║      📊 2025 REVIEWS SEED COMPLETE                               ║');
        console.log('╚═══════════════════════════════════════════════════════════════════╝');
        console.log('');
        console.log('   📱 New 2025 Devices Added:');
        console.log('      • Samsung Galaxy S25 Ultra');
        console.log('      • iPhone 17 Pro Max');
        console.log('      • MacBook Pro M4 Max');
        console.log('      • Sony PlayStation 6');
        console.log('      • Google Pixel 10 Pro');
        console.log('');
        console.log(`   ✅ Arabic Posts Added: ${arInserted}`);
        console.log(`   ✅ English Posts Added: ${enInserted}`);
        console.log(`   ⚠️ Skipped (already exist): ${skipped}`);
        console.log('');
        console.log(`   📊 Previous Device Reviews: ${existingCount}`);
        console.log(`   📊 Current Device Reviews: ${newCount}`);
        console.log(`   📊 Net Increase: +${newCount - existingCount}`);
        console.log('');
        console.log('   🎨 Formatting Applied:');
        console.log('      ✓ RTL/LTR containers');
        console.log('      ✓ Styled headings with borders');
        console.log('      ✓ Paragraphs with proper spacing');
        console.log('      ✓ Key terms bolded');
        console.log('');
        console.log('   ✅ All existing posts preserved!');
        console.log('');
        console.log('═══════════════════════════════════════════════════════════════════');

        await mongoose.disconnect();
        console.log('');
        console.log('👋 Disconnected from MongoDB');
        console.log('');

    } catch (error) {
        console.error('❌ Error:', error);
        await mongoose.disconnect();
        process.exit(1);
    }
}

addReviews2025();
