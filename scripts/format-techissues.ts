import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';

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
// STEP 1: Strip ALL existing formatting back to clean HTML
// ═══════════════════════════════════════════════════════════════════════════

function stripAllFormatting(content: string): string {
    let clean = content;

    // Remove all div containers
    clean = clean.replace(/<div[^>]*>/gi, '');
    clean = clean.replace(/<\/div>/gi, '');

    // Remove all style attributes from any tag
    clean = clean.replace(/\s*style="[^"]*"/gi, '');

    // Remove orphaned style fragments that got corrupted
    clean = clean.replace(/[a-z-]+:\s*[^;]+;/gi, (match) => {
        // Only remove if it looks like a CSS property outside a style attribute
        if (match.includes('http') || match.includes('<') || match.includes('>')) {
            return match;
        }
        return '';
    });

    // Remove strong tags (we'll re-add them later)
    clean = clean.replace(/<strong>/gi, '');
    clean = clean.replace(/<\/strong>/gi, '');

    // Fix broken/malformed h2 tags
    clean = clean.replace(/<h2[^>]*>/gi, '<h2>');
    clean = clean.replace(/<h3[^>]*>/gi, '<h3>');
    clean = clean.replace(/<p[^>]*>/gi, '<p>');

    // Remove multiple colons at end of headings
    clean = clean.replace(/:+(\s*<\/h2>)/gi, '</h2>');
    clean = clean.replace(/:+(\s*<\/h3>)/gi, '</h3>');

    // Fix corrupted closing tags
    clean = clean.replace(/<\/h2>\s*<\/h2>/gi, '</h2>');
    clean = clean.replace(/<\/h3>\s*<\/h3>/gi, '</h3>');

    // Clean up excessive whitespace
    clean = clean.replace(/\n{3,}/g, '\n\n');
    clean = clean.replace(/\s{3,}/g, ' ');

    // Remove empty paragraphs
    clean = clean.replace(/<p>\s*<\/p>/gi, '');

    return clean.trim();
}

// ═══════════════════════════════════════════════════════════════════════════
// STEP 2: Apply fresh formatting to clean content
// ═══════════════════════════════════════════════════════════════════════════

function applyFormatting(content: string, lang: 'ar' | 'en'): string {
    let formatted = content;

    // Format H2 headings
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
        const keywords = ['المشكلة', 'الحل', 'الخطوات', 'السبب', 'الأسباب', 'الإعدادات', 'التحديث',
            'النظام', 'الملف', 'المجلد', 'الذاكرة', 'المعالج', 'القرص', 'الشاشة', 'الشبكة',
            'الإنترنت', 'الاتصال', 'ملاحظة', 'تحذير', 'مهم', 'الخلاصة'];

        for (const kw of keywords) {
            const regex = new RegExp(`(${kw})`, 'g');
            formatted = formatted.replace(regex, '<strong>$1</strong>');
        }
    } else {
        const keywords = ['problem', 'solution', 'fix', 'error', 'issue', 'steps', 'cause',
            'settings', 'update', 'restart', 'install', 'system', 'file', 'folder', 'memory',
            'processor', 'disk', 'display', 'network', 'internet', 'connection', 'note',
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
// MAIN PROCESSING
// ═══════════════════════════════════════════════════════════════════════════

async function fixTechIssuesFormatting() {
    console.log('');
    console.log('╔═══════════════════════════════════════════════════════════════════╗');
    console.log('║  🔧 TECH ISSUES FORMATTER V3 - FULL RESET                         ║');
    console.log('║  1. Strip all existing formatting                                 ║');
    console.log('║  2. Apply fresh, clean formatting                                 ║');
    console.log('╚═══════════════════════════════════════════════════════════════════╝');
    console.log('');

    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('✅ Connected to MongoDB');
        console.log('');

        // Find Tech Issues categories
        const techIssuesCategories = await Category.find({ slug: 'tech-issues' }).lean() as any[];

        if (techIssuesCategories.length === 0) {
            console.log('❌ No Tech Issues categories found');
            await mongoose.disconnect();
            return;
        }

        console.log(`📁 Found ${techIssuesCategories.length} Tech Issues categories`);
        const categoryIds = techIssuesCategories.map((c: any) => c._id);

        // Fetch all posts
        const posts = await Post.find({ category: { $in: categoryIds } }).lean() as any[];
        console.log(`📄 Found ${posts.length} posts to process`);
        console.log('');
        console.log('═══════════════════════════════════════════════════════════════════');
        console.log('');

        let arCount = 0;
        let enCount = 0;
        let errors = 0;

        for (const post of posts) {
            const lang = post.language as 'ar' | 'en';
            const shortTitle = post.title.length > 50 ? post.title.substring(0, 50) + '...' : post.title;
            const dir = lang === 'ar' ? 'RTL' : 'LTR';

            try {
                // Step 1: Strip all existing formatting
                const cleanContent = stripAllFormatting(post.content);

                // Step 2: Apply fresh formatting
                const formattedContent = applyFormatting(cleanContent, lang);

                // Step 3: Update database
                await Post.findByIdAndUpdate(post._id, { content: formattedContent });

                if (lang === 'ar') arCount++;
                else enCount++;

                console.log(`✅ [${dir}] ${shortTitle}`);

            } catch (error: any) {
                console.log(`❌ [${dir}] ${shortTitle}: ${error.message}`);
                errors++;
            }
        }

        // Summary
        console.log('');
        console.log('═══════════════════════════════════════════════════════════════════');
        console.log('');
        console.log('╔═══════════════════════════════════════════════════════════════════╗');
        console.log('║      📊 FORMATTING V3 COMPLETE                                   ║');
        console.log('╚═══════════════════════════════════════════════════════════════════╝');
        console.log('');
        console.log(`   📄 Total Posts: ${posts.length}`);
        console.log(`   ✅ Arabic (RTL): ${arCount}`);
        console.log(`   ✅ English (LTR): ${enCount}`);
        console.log(`   ❌ Errors: ${errors}`);
        console.log('');
        console.log('   🎨 Formatting Applied:');
        console.log('      ✓ Direction wrapper (RTL/LTR)');
        console.log('      ✓ H2 headings: 1.5em, bold, teal, cyan border, colon');
        console.log('      ✓ H3 headings: 1.25em, bold, darker teal, colon');
        console.log('      ✓ Paragraphs: line-height 1.8, proper spacing');
        console.log('      ✓ Technical keywords bolded');
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

fixTechIssuesFormatting();
