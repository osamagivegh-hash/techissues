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
// FORMATTING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function formatArabicReview(content: string, title: string): string {
    // Check if content already has good structure
    if (content.includes('<h2>') && content.includes('<strong>') && content.includes('<ul>')) {
        // Already well-formatted, just enhance
        return enhanceExistingContent(content, 'ar');
    }

    // Parse existing HTML content
    let formatted = content;

    // Ensure proper section headings for Arabic
    const arabicSections = [
        { regex: /<h2>\s*(التصميم|تصميم)/gi, replacement: '<h2>التصميم وجودة التصنيع</h2>' },
        { regex: /<h2>\s*(الأداء)/gi, replacement: '<h2>الأداء الفعلي</h2>' },
        { regex: /<h2>\s*(الشاشة)/gi, replacement: '<h2>جودة الشاشة</h2>' },
        { regex: /<h2>\s*(البطارية)/gi, replacement: '<h2>البطارية والشحن</h2>' },
        { regex: /<h2>\s*(الكاميرا)/gi, replacement: '<h2>نظام الكاميرا</h2>' },
        { regex: /<h2>\s*(الخلاصة|الحكم)/gi, replacement: '<h2>الحكم النهائي</h2>' },
    ];

    // Add bold to important phrases
    const importantArabicPhrases = [
        'ممتاز', 'رائع', 'استثنائي', 'مثالي', 'الأفضل', 'قوي', 'سريع', 'فائق',
        'عيب', 'سلبي', 'مشكلة', 'ضعيف', 'بطيء',
        'يستحق', 'موصى به', 'ننصح', 'نوصي'
    ];

    // Bold important phrases in paragraphs
    for (const phrase of importantArabicPhrases) {
        const regex = new RegExp(`(${phrase})`, 'g');
        formatted = formatted.replace(regex, '<strong>$1</strong>');
    }

    // Fix double bolds
    formatted = formatted.replace(/<strong><strong>/g, '<strong>');
    formatted = formatted.replace(/<\/strong><\/strong>/g, '</strong>');

    // Add bullet points for specs if listing multiple items
    formatted = addBulletPointsIfNeeded(formatted);

    // Ensure paragraphs are not too long (max 4 sentences per paragraph)
    formatted = splitLongParagraphs(formatted);

    return formatted;
}

function formatEnglishReview(content: string, title: string): string {
    // Check if content already has good structure
    if (content.includes('<h2>') && content.includes('<strong>') && content.includes('<ul>')) {
        return enhanceExistingContent(content, 'en');
    }

    let formatted = content;

    // Add bold to important phrases
    const importantEnglishPhrases = [
        'excellent', 'amazing', 'exceptional', 'perfect', 'best', 'powerful', 'fast', 'superior',
        'drawback', 'negative', 'issue', 'weak', 'slow', 'disappointing',
        'recommended', 'worth it', 'must-have', 'essential'
    ];

    // Bold important phrases in paragraphs
    for (const phrase of importantEnglishPhrases) {
        const regex = new RegExp(`\\b(${phrase})\\b`, 'gi');
        formatted = formatted.replace(regex, '<strong>$1</strong>');
    }

    // Fix double bolds
    formatted = formatted.replace(/<strong><strong>/g, '<strong>');
    formatted = formatted.replace(/<\/strong><\/strong>/g, '</strong>');

    // Add bullet points for specs if listing multiple items
    formatted = addBulletPointsIfNeeded(formatted);

    // Ensure paragraphs are not too long
    formatted = splitLongParagraphs(formatted);

    return formatted;
}

function enhanceExistingContent(content: string, lang: 'ar' | 'en'): string {
    let formatted = content;

    // Ensure consistent spacing between sections
    formatted = formatted.replace(/<\/h2>\s*<p>/g, '</h2>\n<p>');
    formatted = formatted.replace(/<\/p>\s*<h2>/g, '</p>\n\n<h2>');

    // Clean up excessive whitespace inside paragraphs
    formatted = formatted.replace(/\s+/g, ' ');
    formatted = formatted.replace(/>\s+</g, '><');
    formatted = formatted.replace(/<p>\s+/g, '<p>');
    formatted = formatted.replace(/\s+<\/p>/g, '</p>');

    // Reformat properly
    formatted = formatted.replace(/<\/h2><p>/g, '</h2>\n<p>');
    formatted = formatted.replace(/<\/p><h2>/g, '</p>\n\n<h2>');
    formatted = formatted.replace(/<\/p><p>/g, '</p>\n<p>');

    return formatted;
}

function addBulletPointsIfNeeded(content: string): string {
    // Look for lists that could be bullet points (sentences with comma-separated items)
    // This is a simplified check - real implementation would be more sophisticated
    return content;
}

function splitLongParagraphs(content: string): string {
    // Split paragraphs that are too long (more than 5 sentences)
    return content.replace(/<p>([^<]{500,})<\/p>/g, (match, text) => {
        const sentences = text.split(/(?<=[.!?])\s+/);
        if (sentences.length > 5) {
            const mid = Math.ceil(sentences.length / 2);
            const first = sentences.slice(0, mid).join(' ');
            const second = sentences.slice(mid).join(' ');
            return `<p>${first}</p>\n<p>${second}</p>`;
        }
        return match;
    });
}

function addProsAndCons(content: string, lang: 'ar' | 'en'): string {
    // Check if pros/cons section already exists
    if (lang === 'ar') {
        if (content.includes('المميزات والعيوب') || content.includes('الإيجابيات') || content.includes('السلبيات')) {
            return content;
        }
    } else {
        if (content.includes('Pros and Cons') || content.includes('Pros:') || content.includes('Cons:')) {
            return content;
        }
    }

    // Don't add if article is already complete
    return content;
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

async function formatDeviceReviews() {
    console.log('');
    console.log('╔═══════════════════════════════════════════════════════════════════╗');
    console.log('║  📝 DEVICE REVIEWS FORMATTER                                      ║');
    console.log('║  Cleaning and formatting all review articles                      ║');
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
        let skippedCount = 0;

        for (const post of posts) {
            const lang = post.language as 'ar' | 'en';
            const changes: string[] = [];

            console.log(`📝 Processing: ${post.title.substring(0, 50)}...`);

            try {
                // Format the content based on language
                let newContent: string;
                if (lang === 'ar') {
                    newContent = formatArabicReview(post.content, post.title);
                } else {
                    newContent = formatEnglishReview(post.content, post.title);
                }

                // Check if content was actually changed
                if (newContent !== post.content) {
                    // Track what changed
                    if (newContent.includes('<strong>') && !post.content.includes('<strong>')) {
                        changes.push('Added bold emphasis to key phrases');
                    }
                    if (newContent.length !== post.content.length) {
                        changes.push('Cleaned spacing and formatting');
                    }

                    // Update the post in database
                    await Post.findByIdAndUpdate(post._id, {
                        content: newContent
                    });

                    console.log(`   ✅ Updated with ${changes.length} improvements`);
                    changes.forEach(c => console.log(`      • ${c}`));
                    updatedCount++;

                    results.push({
                        id: post._id.toString(),
                        title: post.title,
                        language: lang,
                        changes,
                        status: 'updated'
                    });
                } else {
                    console.log(`   ⏭️  Skipped (already well-formatted)`);
                    skippedCount++;

                    results.push({
                        id: post._id.toString(),
                        title: post.title,
                        language: lang,
                        changes: ['Already properly formatted'],
                        status: 'skipped'
                    });
                }
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
        console.log('║      📊 FORMATTING COMPLETE - SUMMARY                            ║');
        console.log('╚═══════════════════════════════════════════════════════════════════╝');
        console.log('');
        console.log(`   📄 Total Posts Processed: ${posts.length}`);
        console.log(`   ✅ Updated: ${updatedCount}`);
        console.log(`   ⏭️  Skipped (already formatted): ${skippedCount}`);
        console.log(`   ❌ Errors: ${results.filter(r => r.status === 'error').length}`);
        console.log('');

        // Show Arabic updates
        const arUpdates = results.filter(r => r.language === 'ar' && r.status === 'updated');
        if (arUpdates.length > 0) {
            console.log('   📝 Arabic Reviews Updated:');
            arUpdates.forEach(r => {
                console.log(`      • ${r.title.substring(0, 40)}...`);
            });
            console.log('');
        }

        // Show English updates
        const enUpdates = results.filter(r => r.language === 'en' && r.status === 'updated');
        if (enUpdates.length > 0) {
            console.log('   📝 English Reviews Updated:');
            enUpdates.forEach(r => {
                console.log(`      • ${r.title.substring(0, 40)}...`);
            });
            console.log('');
        }

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

formatDeviceReviews();
