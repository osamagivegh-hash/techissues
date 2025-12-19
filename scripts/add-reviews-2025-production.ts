import mongoose from 'mongoose';

// PRODUCTION DATABASE - techiss-blog
const MONGODB_URI = 'mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techiss-blog?appName=Mawaddah';

// Import the new 2025 reviews
import { reviews2025Ar, reviews2025En } from './seed-data/reviews-2025';

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

// Formatting function
function formatContent(content: string, lang: 'ar' | 'en'): string {
    let formatted = content;

    const h2Style = 'font-size: 1.5em; font-weight: bold; color: #1a365d; margin-top: 1.5em; margin-bottom: 0.75em; padding-bottom: 0.4em; border-bottom: 3px solid #3182ce;';
    formatted = formatted.replace(/<h2>([^<]+)<\/h2>/gi, (match, text) => {
        let heading = text.trim().replace(/:+$/, '').trim() + ':';
        return `\n\n<h2 style="${h2Style}">${heading}</h2>\n\n`;
    });

    const pStyle = 'line-height: 1.8; margin-bottom: 1em; font-size: 1.05em;';
    formatted = formatted.replace(/<p>/gi, `<p style="${pStyle}">`);

    if (lang === 'ar') {
        const keywords = ['ممتاز', 'رائع', 'استثنائي', 'الأفضل', 'قوي', 'سريع', 'مذهل',
            'الكاميرا', 'الشاشة', 'البطارية', 'المعالج', 'الأداء', 'التصميم', 'الخلاصة', 'موصى به'];
        for (const kw of keywords) {
            formatted = formatted.replace(new RegExp(`(${kw})`, 'g'), '<strong>$1</strong>');
        }
        formatted = `<div style="direction: rtl; text-align: right;">\n${formatted.trim()}\n</div>`;
    } else {
        const keywords = ['excellent', 'amazing', 'exceptional', 'best', 'powerful', 'fast', 'stunning',
            'camera', 'display', 'battery', 'processor', 'performance', 'design', 'verdict', 'recommended'];
        for (const kw of keywords) {
            formatted = formatted.replace(new RegExp(`\\b(${kw})\\b`, 'gi'), '<strong>$1</strong>');
        }
        formatted = `<div style="direction: ltr; text-align: left;">\n${formatted.trim()}\n</div>`;
    }

    formatted = formatted.replace(/<strong><strong>/g, '<strong>');
    formatted = formatted.replace(/<\/strong><\/strong>/g, '</strong>');

    return formatted;
}

async function addReviews2025ToProduction() {
    console.log('');
    console.log('========================================================');
    console.log('  ADDING 2025 REVIEWS TO PRODUCTION DATABASE');
    console.log('  Database: techiss-blog');
    console.log('========================================================');
    console.log('');

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to PRODUCTION MongoDB (techiss-blog)');
        console.log('');

        const arCategory = await Category.findOne({ slug: 'device-reviews', language: 'ar' }).lean() as any;
        const enCategory = await Category.findOne({ slug: 'device-reviews', language: 'en' }).lean() as any;

        if (!arCategory || !enCategory) {
            console.log('ERROR: Device Reviews categories not found!');
            await mongoose.disconnect();
            return;
        }

        console.log('Categories found:');
        console.log('  AR:', arCategory.name);
        console.log('  EN:', enCategory.name);
        console.log('');

        const existingCount = await Post.countDocuments({
            category: { $in: [arCategory._id, enCategory._id] }
        });
        console.log('Existing Device Reviews:', existingCount);

        // Prepare posts
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

        console.log('');
        console.log('Adding posts (skipping if slug exists)...');

        let arInserted = 0, enInserted = 0, skipped = 0;

        for (const post of arPosts) {
            const exists = await Post.findOne({ slug: post.slug, language: 'ar' });
            if (exists) {
                console.log('  Skip (exists):', post.slug);
                skipped++;
            } else {
                await Post.create(post);
                console.log('  Added AR:', post.title.substring(0, 40) + '...');
                arInserted++;
            }
        }

        for (const post of enPosts) {
            const exists = await Post.findOne({ slug: post.slug, language: 'en' });
            if (exists) {
                console.log('  Skip (exists):', post.slug);
                skipped++;
            } else {
                await Post.create(post);
                console.log('  Added EN:', post.title.substring(0, 40) + '...');
                enInserted++;
            }
        }

        const newCount = await Post.countDocuments({
            category: { $in: [arCategory._id, enCategory._id] }
        });

        console.log('');
        console.log('========================================================');
        console.log('  COMPLETE!');
        console.log('========================================================');
        console.log('  Arabic Posts Added:', arInserted);
        console.log('  English Posts Added:', enInserted);
        console.log('  Skipped (exist):', skipped);
        console.log('  Previous Total:', existingCount);
        console.log('  New Total:', newCount);
        console.log('========================================================');

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');

    } catch (error) {
        console.error('ERROR:', error);
        await mongoose.disconnect();
        process.exit(1);
    }
}

addReviews2025ToProduction();
