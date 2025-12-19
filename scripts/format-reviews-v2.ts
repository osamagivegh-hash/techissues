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
// FORMATTING FUNCTIONS - Enhanced with Larger Headings and Better Spacing
// ═══════════════════════════════════════════════════════════════════════════

function formatReviewContent(content: string, lang: 'ar' | 'en'): string {
    let formatted = content;

    // ═══════════════════════════════════════════════════════════════════════
    // STEP 1: Convert <h2> headings to larger, styled format with colon
    // ═══════════════════════════════════════════════════════════════════════

    // Match all h2 tags and enhance them
    formatted = formatted.replace(/<h2>([^<]+)<\/h2>/gi, (match, headingText) => {
        let cleanHeading = headingText.trim();

        // Remove existing colons at the end if present
        cleanHeading = cleanHeading.replace(/[:：]+$/, '').trim();

        // Add colon at end
        cleanHeading = cleanHeading + ':';

        // Return enhanced heading with:
        // - Larger font size (1.5em)
        // - Bold weight
        // - Distinct color
        // - Proper spacing (margin-top and margin-bottom)
        return `
<h2 style="font-size: 1.5em; font-weight: bold; color: #1a365d; margin-top: 2em; margin-bottom: 1em; border-bottom: 2px solid #3182ce; padding-bottom: 0.5em;">${cleanHeading}</h2>
`;
    });

    // ═══════════════════════════════════════════════════════════════════════
    // STEP 2: Enhance paragraph readability
    // ═══════════════════════════════════════════════════════════════════════

    // Add proper line-height and margin to paragraphs
    formatted = formatted.replace(/<p>/gi, '<p style="line-height: 1.8; margin-bottom: 1em;">');

    // ═══════════════════════════════════════════════════════════════════════
    // STEP 3: Bold important keywords based on language
    // ═══════════════════════════════════════════════════════════════════════

    if (lang === 'ar') {
        const arabicKeywords = [
            // Positive
            'ممتاز', 'رائع', 'استثنائي', 'مثالي', 'الأفضل', 'قوي', 'سريع', 'فائق', 'مذهل', 'متميز',
            // Negative
            'عيب', 'سلبي', 'مشكلة', 'ضعيف', 'بطيء', 'محدود',
            // Recommendations
            'يستحق', 'موصى به', 'ننصح', 'نوصي', 'الخلاصة', 'الحكم النهائي',
            // Technical
            'معالج', 'شاشة', 'كاميرا', 'بطارية', 'ذاكرة', 'تخزين', 'GPU', 'CPU'
        ];

        for (const keyword of arabicKeywords) {
            // Only bold if not already in a tag or bold
            const regex = new RegExp(`(?<!<[^>]*)(${keyword})(?![^<]*>)`, 'g');
            formatted = formatted.replace(regex, '<strong>$1</strong>');
        }
    } else {
        const englishKeywords = [
            // Positive
            'excellent', 'amazing', 'exceptional', 'perfect', 'best', 'powerful', 'fast', 'superior',
            'outstanding', 'impressive', 'remarkable', 'stunning', 'brilliant',
            // Negative
            'drawback', 'negative', 'issue', 'weak', 'slow', 'disappointing', 'limited',
            // Recommendations
            'recommended', 'worth it', 'must-have', 'essential', 'verdict', 'conclusion',
            // Technical
            'processor', 'display', 'camera', 'battery', 'memory', 'storage', 'performance'
        ];

        for (const keyword of englishKeywords) {
            const regex = new RegExp(`(?<!<[^>]*)\\b(${keyword})\\b(?![^<]*>)`, 'gi');
            formatted = formatted.replace(regex, '<strong>$1</strong>');
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // STEP 4: Clean up any double formatting issues
    // ═══════════════════════════════════════════════════════════════════════

    // Fix double strong tags
    formatted = formatted.replace(/<strong><strong>/g, '<strong>');
    formatted = formatted.replace(/<\/strong><\/strong>/g, '</strong>');

    // Fix strong inside strong
    formatted = formatted.replace(/<strong>([^<]*)<strong>/g, '<strong>$1');
    formatted = formatted.replace(/<\/strong>([^<]*)<\/strong>/g, '$1</strong>');

    // ═══════════════════════════════════════════════════════════════════════
    // STEP 5: Split long paragraphs (more than 5 sentences)
    // ═══════════════════════════════════════════════════════════════════════

    formatted = splitLongParagraphs(formatted);

    // ═══════════════════════════════════════════════════════════════════════
    // STEP 6: Clean up whitespace and formatting
    // ═══════════════════════════════════════════════════════════════════════

    // Remove multiple consecutive blank lines
    formatted = formatted.replace(/\n{3,}/g, '\n\n');

    // Ensure proper spacing after closing tags
    formatted = formatted.replace(/<\/h2>\s*<p/g, '</h2>\n\n<p');
    formatted = formatted.replace(/<\/p>\s*<h2/g, '</p>\n\n<h2');

    return formatted.trim();
}

function splitLongParagraphs(content: string): string {
    // Find paragraphs with more than 5 sentences and split them
    return content.replace(/<p[^>]*>([^<]{400,})<\/p>/g, (match, text) => {
        // Count sentences (rough estimate based on . ! ?)
        const sentences = text.split(/(?<=[.!?،])\s+/).filter((s: string) => s.trim().length > 0);

        if (sentences.length > 5) {
            // Split into two paragraphs
            const mid = Math.ceil(sentences.length / 2);
            const first = sentences.slice(0, mid).join(' ');
            const second = sentences.slice(mid).join(' ');
            return `<p style="line-height: 1.8; margin-bottom: 1em;">${first}</p>\n\n<p style="line-height: 1.8; margin-bottom: 1em;">${second}</p>`;
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
    changes: string[];
    status: 'updated' | 'skipped' | 'error';
}

async function formatDeviceReviewsV2() {
    console.log('');
    console.log('╔═══════════════════════════════════════════════════════════════════╗');
    console.log('║  📝 DEVICE REVIEWS FORMATTER V2                                   ║');
    console.log('║  Enhanced: Larger Headings + Colons + Better Spacing              ║');
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
        let updatedCount = 0;

        for (const post of posts) {
            const lang = post.language as 'ar' | 'en';
            const changes: string[] = [];

            console.log(`📝 Processing: ${post.title.substring(0, 50)}...`);

            try {
                // Format the content
                const newContent = formatReviewContent(post.content, lang);

                // Track changes
                if (newContent.includes('font-size: 1.5em')) {
                    changes.push('Enhanced headings with larger size and colons');
                }
                if (newContent.includes('line-height: 1.8')) {
                    changes.push('Improved paragraph readability');
                }
                if (newContent.includes('<strong>')) {
                    changes.push('Added bold emphasis to keywords');
                }
                if (newContent.includes('border-bottom')) {
                    changes.push('Added visual separator under headings');
                }

                // Update the post in database
                await Post.findByIdAndUpdate(post._id, {
                    content: newContent
                });

                console.log(`   ✅ Updated with ${changes.length} improvements:`);
                changes.forEach(c => console.log(`      • ${c}`));
                updatedCount++;

                results.push({
                    id: post._id.toString(),
                    title: post.title,
                    language: lang,
                    changes,
                    status: 'updated'
                });

            } catch (error: any) {
                console.log(`   ❌ Error: ${error.message}`);
                results.push({
                    id: post._id.toString(),
                    title: post.title,
                    language: lang,
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
        console.log('║      📊 FORMATTING V2 COMPLETE - SUMMARY                         ║');
        console.log('╚═══════════════════════════════════════════════════════════════════╝');
        console.log('');
        console.log(`   📄 Total Posts Processed: ${posts.length}`);
        console.log(`   ✅ Updated: ${updatedCount}`);
        console.log(`   ❌ Errors: ${results.filter(r => r.status === 'error').length}`);
        console.log('');
        console.log('   🎨 Formatting Applied:');
        console.log('      • Headings: Larger (1.5em), Bold, with Colons (:)');
        console.log('      • Headings: Blue color (#1a365d) with bottom border');
        console.log('      • Headings: Proper spacing (2em top, 1em bottom)');
        console.log('      • Paragraphs: Enhanced line-height (1.8)');
        console.log('      • Paragraphs: Proper margin between paragraphs');
        console.log('      • Keywords: Bold emphasis on important terms');
        console.log('');

        // Count by language
        const arUpdates = results.filter(r => r.language === 'ar' && r.status === 'updated');
        const enUpdates = results.filter(r => r.language === 'en' && r.status === 'updated');

        console.log(`   📝 Arabic Reviews Updated: ${arUpdates.length}`);
        console.log(`   📝 English Reviews Updated: ${enUpdates.length}`);
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

formatDeviceReviewsV2();
