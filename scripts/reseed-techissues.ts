import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';

// Import all tech issues seed data
import { techissuesArBatch1 } from './seed-data/techissues-ar-batch1';
import { techissuesArBatch2 } from './seed-data/techissues-ar-batch2';
import { techissuesArBatch3 } from './seed-data/techissues-ar-batch3';
import { techissuesArBatch4 } from './seed-data/techissues-ar-batch4';
import { techissuesArBatch5 } from './seed-data/techissues-ar-batch5';
import { techissuesEnBatch1 } from './seed-data/techissues-en-batch1';
import { techissuesEnBatch2 } from './seed-data/techissues-en-batch2';
import { techissuesEnBatch3 } from './seed-data/techissues-en-batch3';
import { techissuesEnBatch4 } from './seed-data/techissues-en-batch4';
import { techissuesEnBatch5 } from './seed-data/techissues-en-batch5';

// Also import premium tech issues articles if they exist
import { premiumTechIssuesAr } from './seed-data/premium-techissues-ar';
import { premiumTechIssuesEn } from './seed-data/premium-techissues-en';

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
// FORMATTING FUNCTION - Applied to fresh content from seed files
// ═══════════════════════════════════════════════════════════════════════════

function formatContent(content: string, lang: 'ar' | 'en'): string {
    let formatted = content;

    // Format H2 headings with styling + colon
    const h2Style = 'font-size: 1.5em; font-weight: bold; color: #0d4f4f; margin-top: 1.5em; margin-bottom: 0.75em; padding-bottom: 0.4em; border-bottom: 3px solid #0891b2;';
    formatted = formatted.replace(/<h2>([^<]+)<\/h2>/gi, (match, text) => {
        let heading = text.trim().replace(/:+$/, '').trim() + ':';
        return `\n\n<h2 style="${h2Style}">${heading}</h2>\n\n`;
    });

    // Format H3 headings
    const h3Style = 'font-size: 1.25em; font-weight: bold; color: #155e75; margin-top: 1.2em; margin-bottom: 0.5em;';
    formatted = formatted.replace(/<h3>([^<]+)<\/h3>/gi, (match, text) => {
        let heading = text.trim().replace(/:+$/, '').trim() + ':';
        return `\n\n<h3 style="${h3Style}">${heading}</h3>\n\n`;
    });

    // Format paragraphs
    const pStyle = 'line-height: 1.8; margin-bottom: 1em; font-size: 1.05em;';
    formatted = formatted.replace(/<p>/gi, `<p style="${pStyle}">`);

    // Bold important keywords
    if (lang === 'ar') {
        const keywords = ['المشكلة', 'الحل', 'الخطوات', 'السبب', 'الأسباب', 'الإعدادات',
            'النظام', 'الملف', 'الذاكرة', 'المعالج', 'القرص', 'الشاشة', 'الشبكة',
            'الإنترنت', 'الاتصال', 'ملاحظة', 'تحذير', 'مهم', 'الخلاصة'];
        for (const kw of keywords) {
            const regex = new RegExp(`(${kw})`, 'g');
            formatted = formatted.replace(regex, '<strong>$1</strong>');
        }
    } else {
        const keywords = ['problem', 'solution', 'fix', 'error', 'issue', 'steps',
            'settings', 'update', 'restart', 'install', 'system', 'file', 'memory',
            'disk', 'display', 'network', 'internet', 'connection', 'note',
            'warning', 'important', 'conclusion'];
        for (const kw of keywords) {
            const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
            formatted = formatted.replace(regex, '<strong>$1</strong>');
        }
    }

    // Clean up double strong tags
    formatted = formatted.replace(/<strong><strong>/g, '<strong>');
    formatted = formatted.replace(/<\/strong><\/strong>/g, '</strong>');

    // Clean whitespace
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
// MAIN RESEED FUNCTION
// ═══════════════════════════════════════════════════════════════════════════

async function reseedTechIssues() {
    console.log('');
    console.log('╔═══════════════════════════════════════════════════════════════════╗');
    console.log('║  🔄 TECH ISSUES FULL RESEED WITH FORMATTING                       ║');
    console.log('║  Deletes existing tech issues and reseeds from seed data          ║');
    console.log('╚═══════════════════════════════════════════════════════════════════╝');
    console.log('');

    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('✅ Connected to MongoDB');
        console.log('');

        // Get the tech issues categories
        const arCategory = await Category.findOne({ slug: 'tech-issues', language: 'ar' }).lean() as any;
        const enCategory = await Category.findOne({ slug: 'tech-issues', language: 'en' }).lean() as any;

        if (!arCategory || !enCategory) {
            console.log('❌ Tech Issues categories not found!');
            await mongoose.disconnect();
            return;
        }

        console.log('📁 Categories:');
        console.log(`   • ${arCategory.name} (ar)`);
        console.log(`   • ${enCategory.name} (en)`);
        console.log('');

        // DELETE existing tech issues posts
        console.log('🗑️  Deleting existing Tech Issues posts...');
        const deleteResult = await Post.deleteMany({
            category: { $in: [arCategory._id, enCategory._id] }
        });
        console.log(`   Deleted ${deleteResult.deletedCount} posts`);
        console.log('');

        // Combine all seed data
        const allArTechIssues = [
            ...techissuesArBatch1,
            ...techissuesArBatch2,
            ...techissuesArBatch3,
            ...techissuesArBatch4,
            ...techissuesArBatch5,
            ...premiumTechIssuesAr,
        ];

        const allEnTechIssues = [
            ...techissuesEnBatch1,
            ...techissuesEnBatch2,
            ...techissuesEnBatch3,
            ...techissuesEnBatch4,
            ...techissuesEnBatch5,
            ...premiumTechIssuesEn,
        ];

        console.log(`📄 Seed data loaded:`);
        console.log(`   • Arabic articles: ${allArTechIssues.length}`);
        console.log(`   • English articles: ${allEnTechIssues.length}`);
        console.log('');

        // Prepare Arabic posts with formatting
        console.log('📝 Preparing Arabic posts with formatting...');
        const arPosts = allArTechIssues.map(article => ({
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
        console.log('📝 Preparing English posts with formatting...');
        const enPosts = allEnTechIssues.map(article => ({
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

        // Insert posts
        console.log('');
        console.log('📥 Inserting Arabic posts...');
        await Post.insertMany(arPosts);
        console.log(`   ✅ Inserted ${arPosts.length} Arabic posts`);

        console.log('📥 Inserting English posts...');
        await Post.insertMany(enPosts);
        console.log(`   ✅ Inserted ${enPosts.length} English posts`);

        // Summary
        console.log('');
        console.log('═══════════════════════════════════════════════════════════════════');
        console.log('');
        console.log('╔═══════════════════════════════════════════════════════════════════╗');
        console.log('║      📊 RESEED COMPLETE                                          ║');
        console.log('╚═══════════════════════════════════════════════════════════════════╝');
        console.log('');
        console.log(`   📄 Arabic Articles: ${arPosts.length}`);
        console.log(`   📄 English Articles: ${enPosts.length}`);
        console.log(`   📄 Total: ${arPosts.length + enPosts.length}`);
        console.log('');
        console.log('   🎨 Formatting Applied:');
        console.log('      ✓ RTL container for Arabic articles');
        console.log('      ✓ LTR container for English articles');
        console.log('      ✓ H2 headings: 1.5em, bold, teal, cyan border, colon');
        console.log('      ✓ H3 headings: 1.25em, bold, darker teal, colon');
        console.log('      ✓ Paragraphs: line-height 1.8, proper spacing');
        console.log('      ✓ Technical keywords bolded');
        console.log('');
        console.log('   ✅ Fresh content from seed files');
        console.log('   ✅ All articles ready and published');
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

reseedTechIssues();
