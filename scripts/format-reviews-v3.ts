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
// FORMATTING FUNCTIONS V3 - RTL/LTR Support + Enhanced Headings
// ═══════════════════════════════════════════════════════════════════════════

function formatReviewContentV3(content: string, lang: 'ar' | 'en'): string {
    // First, strip any existing RTL/LTR wrappers to avoid nesting
    let formatted = content
        .replace(/<div[^>]*direction:\s*rtl[^>]*>/gi, '')
        .replace(/<div[^>]*direction:\s*ltr[^>]*>/gi, '')
        .replace(/<\/div>\s*$/gi, '')
        .trim();

    // Also remove any existing inline styles from h2 and p tags for clean slate
    formatted = formatted.replace(/<h2[^>]*style="[^"]*"[^>]*>/gi, '<h2>');
    formatted = formatted.replace(/<p[^>]*style="[^"]*"[^>]*>/gi, '<p>');

    // ═══════════════════════════════════════════════════════════════════════
    // STEP 1: Format headings with larger size and colons
    // ═══════════════════════════════════════════════════════════════════════

    formatted = formatted.replace(/<h2>([^<]+)<\/h2>/gi, (match, headingText) => {
        let cleanHeading = headingText.trim();

        // Remove existing colons at the end
        cleanHeading = cleanHeading.replace(/[:：]+$/, '').trim();

        // Add colon at end
        cleanHeading = cleanHeading + ':';

        // Enhanced heading style
        const headingStyle = `
            font-size: 1.6em;
            font-weight: 700;
            color: #1a365d;
            margin-top: 1.5em;
            margin-bottom: 0.75em;
            padding-bottom: 0.4em;
            border-bottom: 3px solid #3182ce;
        `.replace(/\s+/g, ' ').trim();

        return `\n\n<h2 style="${headingStyle}">${cleanHeading}</h2>\n\n`;
    });

    // ═══════════════════════════════════════════════════════════════════════
    // STEP 2: Format paragraphs with better readability
    // ═══════════════════════════════════════════════════════════════════════

    const paragraphStyle = `
        line-height: 1.9;
        margin-bottom: 1.2em;
        font-size: 1.1em;
    `.replace(/\s+/g, ' ').trim();

    formatted = formatted.replace(/<p>/gi, `<p style="${paragraphStyle}">`);

    // ═══════════════════════════════════════════════════════════════════════
    // STEP 3: Bold important keywords based on language
    // ═══════════════════════════════════════════════════════════════════════

    if (lang === 'ar') {
        const arabicKeywords = [
            // Superlatives
            'ممتاز', 'رائع', 'استثنائي', 'مثالي', 'الأفضل', 'قوي', 'سريع', 'فائق', 'مذهل', 'متميز',
            'رهيب', 'خيالي', 'مبهر', 'احترافي',
            // Negatives
            'عيب', 'سلبي', 'مشكلة', 'ضعيف', 'بطيء', 'محدود',
            // Recommendations
            'يستحق', 'موصى به', 'ننصح', 'نوصي', 'الحكم النهائي', 'الخلاصة',
            // Technical
            'معالج', 'شاشة', 'كاميرا', 'بطارية', 'ذاكرة', 'تخزين'
        ];

        for (const keyword of arabicKeywords) {
            const regex = new RegExp(`(?<![\\p{L}])(${keyword})(?![\\p{L}])`, 'gu');
            formatted = formatted.replace(regex, (match, word) => {
                // Don't double-bold
                if (formatted.includes(`<strong>${word}</strong>`)) return match;
                return `<strong>${word}</strong>`;
            });
        }
    } else {
        const englishKeywords = [
            // Superlatives
            'excellent', 'amazing', 'exceptional', 'perfect', 'best', 'powerful', 'fast', 'superior',
            'outstanding', 'impressive', 'remarkable', 'stunning', 'brilliant', 'phenomenal',
            // Negatives
            'drawback', 'negative', 'issue', 'weak', 'slow', 'disappointing', 'limited', 'poor',
            // Recommendations
            'recommended', 'worth it', 'must-have', 'essential', 'verdict', 'conclusion',
            // Technical
            'processor', 'display', 'camera', 'battery', 'memory', 'storage', 'performance'
        ];

        for (const keyword of englishKeywords) {
            const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
            formatted = formatted.replace(regex, (match) => {
                return `<strong>${match}</strong>`;
            });
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // STEP 4: Clean up double-bold and formatting issues
    // ═══════════════════════════════════════════════════════════════════════

    // Fix nested strong tags
    formatted = formatted.replace(/<strong><strong>/g, '<strong>');
    formatted = formatted.replace(/<\/strong><\/strong>/g, '</strong>');
    formatted = formatted.replace(/<strong>([^<]*)<strong>/g, '<strong>$1');

    // Clean up excessive whitespace
    formatted = formatted.replace(/\n{4,}/g, '\n\n\n');

    // ═══════════════════════════════════════════════════════════════════════
    // STEP 5: Split long paragraphs (max 5 sentences)
    // ═══════════════════════════════════════════════════════════════════════

    formatted = splitLongParagraphs(formatted, paragraphStyle);

    // ═══════════════════════════════════════════════════════════════════════
    // STEP 6: Wrap in RTL or LTR container
    // ═══════════════════════════════════════════════════════════════════════

    if (lang === 'ar') {
        // Arabic - RTL direction
        const rtlContainerStyle = `
            direction: rtl;
            text-align: right;
            font-family: 'Tajawal', 'Cairo', 'Noto Sans Arabic', sans-serif;
        `.replace(/\s+/g, ' ').trim();

        formatted = `<div style="${rtlContainerStyle}">\n${formatted.trim()}\n</div>`;
    } else {
        // English - LTR direction  
        const ltrContainerStyle = `
            direction: ltr;
            text-align: left;
            font-family: 'Inter', 'Roboto', sans-serif;
        `.replace(/\s+/g, ' ').trim();

        formatted = `<div style="${ltrContainerStyle}">\n${formatted.trim()}\n</div>`;
    }

    return formatted;
}

function splitLongParagraphs(content: string, paragraphStyle: string): string {
    return content.replace(/<p[^>]*>([^<]{350,})<\/p>/g, (match, text) => {
        // Detect sentence endings (for both Arabic and English)
        const sentences = text.split(/(?<=[.!?。،])\s+/).filter((s: string) => s.trim().length > 0);

        if (sentences.length > 5) {
            const mid = Math.ceil(sentences.length / 2);
            const first = sentences.slice(0, mid).join(' ');
            const second = sentences.slice(mid).join(' ');
            return `<p style="${paragraphStyle}">${first}</p>\n\n<p style="${paragraphStyle}">${second}</p>`;
        }
        return match;
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PROCESSING
// ═══════════════════════════════════════════════════════════════════════════

interface ProcessResult {
    id: string;
    title: string;
    language: string;
    direction: 'RTL' | 'LTR';
    changes: string[];
    status: 'updated' | 'error';
}

async function formatDeviceReviewsV3() {
    console.log('');
    console.log('╔═══════════════════════════════════════════════════════════════════╗');
    console.log('║  📝 DEVICE REVIEWS FORMATTER V3                                   ║');
    console.log('║  RTL/LTR Direction + Enhanced Headings + Better Spacing           ║');
    console.log('╚═══════════════════════════════════════════════════════════════════╝');
    console.log('');

    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('✅ Connected to MongoDB');
        console.log('');

        // Find Device Reviews categories (Arabic and English)
        const reviewCategories = await Category.find({
            slug: 'device-reviews'
        }).lean() as any[];

        if (reviewCategories.length === 0) {
            console.log('❌ No Device Reviews categories found');
            await mongoose.disconnect();
            return;
        }

        console.log(`📁 Found ${reviewCategories.length} Device Reviews categories:`);
        reviewCategories.forEach((cat: any) => {
            console.log(`   • ${cat.name} (${cat.language})`);
        });
        console.log('');

        const categoryIds = reviewCategories.map((c: any) => c._id);

        // Fetch all posts in Device Reviews categories
        const posts = await Post.find({
            category: { $in: categoryIds }
        }).populate('category').lean() as any[];

        console.log(`📄 Found ${posts.length} Device Reviews posts to process`);
        console.log('');
        console.log('═══════════════════════════════════════════════════════════════════');
        console.log('');

        const results: ProcessResult[] = [];
        let rtlCount = 0;
        let ltrCount = 0;

        for (const post of posts) {
            const lang = post.language as 'ar' | 'en';
            const direction = lang === 'ar' ? 'RTL' : 'LTR';
            const changes: string[] = [];

            const shortTitle = post.title.length > 45
                ? post.title.substring(0, 45) + '...'
                : post.title;

            console.log(`📝 [${direction}] ${shortTitle}`);

            try {
                // Format the content with V3 (includes RTL/LTR wrapper)
                const newContent = formatReviewContentV3(post.content, lang);

                // Track changes
                changes.push(`Applied ${direction} text direction`);
                changes.push('Enhanced headings (1.6em, bold, colored, bordered)');
                changes.push('Added colon (:) after each heading');
                changes.push('Improved paragraph readability (line-height: 1.9)');
                changes.push('Bold emphasis on important keywords');

                // Update the post in database
                await Post.findByIdAndUpdate(post._id, {
                    content: newContent
                });

                if (lang === 'ar') rtlCount++;
                else ltrCount++;

                console.log(`   ✅ Updated with ${direction} direction + formatting`);

                results.push({
                    id: post._id.toString(),
                    title: post.title,
                    language: lang,
                    direction,
                    changes,
                    status: 'updated'
                });

            } catch (error: any) {
                console.log(`   ❌ Error: ${error.message}`);
                results.push({
                    id: post._id.toString(),
                    title: post.title,
                    language: lang,
                    direction,
                    changes: [error.message],
                    status: 'error'
                });
            }
        }

        // ═══════════════════════════════════════════════════════════════════
        // SUMMARY
        // ═══════════════════════════════════════════════════════════════════

        console.log('');
        console.log('═══════════════════════════════════════════════════════════════════');
        console.log('');
        console.log('╔═══════════════════════════════════════════════════════════════════╗');
        console.log('║      📊 FORMATTING V3 COMPLETE - SUMMARY                         ║');
        console.log('╚═══════════════════════════════════════════════════════════════════╝');
        console.log('');
        console.log(`   📄 Total Posts Processed: ${posts.length}`);
        console.log(`   ✅ Successfully Updated: ${results.filter(r => r.status === 'updated').length}`);
        console.log(`   ❌ Errors: ${results.filter(r => r.status === 'error').length}`);
        console.log('');
        console.log('   📐 Direction Applied:');
        console.log(`      • RTL (Arabic): ${rtlCount} articles`);
        console.log(`      • LTR (English): ${ltrCount} articles`);
        console.log('');
        console.log('   🎨 Formatting Applied:');
        console.log('      ┌─────────────────────────────────────────────────────────────┐');
        console.log('      │ ✓ RTL container for Arabic articles                         │');
        console.log('      │ ✓ LTR container for English articles                        │');
        console.log('      │ ✓ Headings: 1.6em, bold, #1a365d color, blue bottom border  │');
        console.log('      │ ✓ Headings: Colon (:) added at end                          │');
        console.log('      │ ✓ Headings: Blank lines before and after                    │');
        console.log('      │ ✓ Paragraphs: line-height 1.9, font-size 1.1em             │');
        console.log('      │ ✓ Paragraphs: 1.2em margin between paragraphs               │');
        console.log('      │ ✓ Long paragraphs split (max 5 sentences)                   │');
        console.log('      │ ✓ Important keywords bolded                                 │');
        console.log('      └─────────────────────────────────────────────────────────────┘');
        console.log('');
        console.log('   ✅ All articles remain editable in the dashboard');
        console.log('   ✅ Metadata (slug, ID, category) preserved');
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

formatDeviceReviewsV3();
