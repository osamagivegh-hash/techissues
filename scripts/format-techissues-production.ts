import mongoose from 'mongoose';

// PRODUCTION DATABASE - techiss-blog (same as the live server)
const MONGODB_URI = 'mongodb+srv://osamashaer66_db_user:990099@mawaddah.lh79hv8.mongodb.net/techiss-blog?appName=Mawaddah';

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
// STEP 1: Strip all existing formatting to get clean content
// ═══════════════════════════════════════════════════════════════════════════

function stripAllFormatting(content: string): string {
    let clean = content;

    // Remove RTL/LTR wrapper divs
    clean = clean.replace(/<div[^>]*style="[^"]*direction:\s*(rtl|ltr)[^"]*"[^>]*>/gi, '');
    clean = clean.replace(/<\/div>\s*$/gi, '');

    // Remove ALL inline styles from h2, h3, p, span, strong tags
    clean = clean.replace(/<h2[^>]*style="[^"]*"[^>]*>/gi, '<h2>');
    clean = clean.replace(/<h3[^>]*style="[^"]*"[^>]*>/gi, '<h3>');
    clean = clean.replace(/<p[^>]*style="[^"]*"[^>]*>/gi, '<p>');
    clean = clean.replace(/<span[^>]*style="[^"]*"[^>]*>/gi, '');
    clean = clean.replace(/<\/span>/gi, '');

    // Remove existing strong tags (we'll re-apply them)
    clean = clean.replace(/<\/?strong>/gi, '');

    // Remove extra whitespace and newlines
    clean = clean.replace(/\n{3,}/g, '\n\n');
    clean = clean.trim();

    // Remove colons at end of headings (we'll re-add them)
    clean = clean.replace(/<h2>([^<]+):+<\/h2>/gi, '<h2>$1</h2>');
    clean = clean.replace(/<h3>([^<]+):+<\/h3>/gi, '<h3>$1</h3>');

    return clean;
}

// ═══════════════════════════════════════════════════════════════════════════
// STEP 2: Apply fresh formatting (same style as Device Reviews)
// ═══════════════════════════════════════════════════════════════════════════

function applyFormatting(content: string, lang: 'ar' | 'en'): string {
    let formatted = content;

    // Format H2 headings with styling + colon
    const h2Style = 'font-size: 1.5em; font-weight: bold; color: #1a365d; margin-top: 1.5em; margin-bottom: 0.75em; padding-bottom: 0.4em; border-bottom: 3px solid #3182ce;';
    formatted = formatted.replace(/<h2>([^<]+)<\/h2>/gi, (match, text) => {
        let heading = text.trim().replace(/:+$/, '').trim() + ':';
        return `\n\n<h2 style="${h2Style}">${heading}</h2>\n\n`;
    });

    // Format H3 headings with slightly smaller styling
    const h3Style = 'font-size: 1.25em; font-weight: bold; color: #2d3748; margin-top: 1.25em; margin-bottom: 0.5em;';
    formatted = formatted.replace(/<h3>([^<]+)<\/h3>/gi, (match, text) => {
        let heading = text.trim().replace(/:+$/, '').trim() + ':';
        return `\n\n<h3 style="${h3Style}">${heading}</h3>\n\n`;
    });

    // Format paragraphs with proper styling
    const pStyle = 'line-height: 1.8; margin-bottom: 1em; font-size: 1.05em;';
    formatted = formatted.replace(/<p>/gi, `<p style="${pStyle}">`);

    // Bold important technical keywords based on language
    if (lang === 'ar') {
        const keywords = [
            // Problem/Solution words
            'مشكلة', 'حل', 'إصلاح', 'خطأ', 'تحديث', 'إعادة', 'تشغيل',
            // Technical terms
            'ويندوز', 'Windows', 'USB', 'واي فاي', 'WiFi', 'بلوتوث', 'Bluetooth',
            'الشاشة', 'البطارية', 'المعالج', 'الذاكرة', 'التخزين', 'النظام',
            'التعريفات', 'الدرايفرات', 'BIOS', 'السوفتوير', 'الهاردوير',
            // Action words
            'انقر', 'اضغط', 'افتح', 'اختر', 'حدد', 'أعد', 'ثبت', 'حمل',
            // Status words
            'ناجح', 'فشل', 'بطيء', 'سريع', 'متوقف', 'معطل',
            // Important
            'هام', 'تحذير', 'ملاحظة', 'نصيحة', 'الخطوة', 'الحل'
        ];
        for (const kw of keywords) {
            const regex = new RegExp(`(${kw})`, 'g');
            formatted = formatted.replace(regex, '<strong>$1</strong>');
        }
        // Wrap in RTL container
        formatted = `<div style="direction: rtl; text-align: right;">\n${formatted.trim()}\n</div>`;
    } else {
        const keywords = [
            // Problem/Solution words
            'problem', 'solution', 'fix', 'error', 'update', 'restart', 'reset',
            // Technical terms
            'Windows', 'USB', 'WiFi', 'Bluetooth', 'driver', 'BIOS', 'firmware',
            'display', 'battery', 'processor', 'memory', 'storage', 'system',
            'software', 'hardware', 'settings', 'configuration',
            // Action words
            'click', 'press', 'open', 'select', 'choose', 'install', 'download',
            // Status words
            'successful', 'failed', 'slow', 'fast', 'stopped', 'disabled',
            // Important
            'important', 'warning', 'note', 'tip', 'step', 'method'
        ];
        for (const kw of keywords) {
            const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
            formatted = formatted.replace(regex, '<strong>$1</strong>');
        }
        // Wrap in LTR container
        formatted = `<div style="direction: ltr; text-align: left;">\n${formatted.trim()}\n</div>`;
    }

    // Clean up double strong tags
    formatted = formatted.replace(/<strong><strong>/g, '<strong>');
    formatted = formatted.replace(/<\/strong><\/strong>/g, '</strong>');
    formatted = formatted.replace(/\n{4,}/g, '\n\n\n');

    return formatted;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN FORMAT FUNCTION
// ═══════════════════════════════════════════════════════════════════════════

async function formatTechIssuesProduction() {
    console.log('');
    console.log('========================================================');
    console.log('  FORMATTING TECH ISSUES ARTICLES - PRODUCTION');
    console.log('  Database: techiss-blog');
    console.log('  Applying same style as Device Reviews');
    console.log('========================================================');
    console.log('');

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to PRODUCTION MongoDB (techiss-blog)');
        console.log('');

        // Get the tech issues categories
        const arCategory = await Category.findOne({ slug: 'tech-issues', language: 'ar' }).lean() as any;
        const enCategory = await Category.findOne({ slug: 'tech-issues', language: 'en' }).lean() as any;

        if (!arCategory || !enCategory) {
            console.log('ERROR: Tech Issues categories not found!');
            await mongoose.disconnect();
            return;
        }

        console.log('Categories found:');
        console.log('  AR:', arCategory.name);
        console.log('  EN:', enCategory.name);
        console.log('');

        // Get all tech issues posts
        const arPosts = await Post.find({ category: arCategory._id }) as any[];
        const enPosts = await Post.find({ category: enCategory._id }) as any[];

        console.log('Posts to format:');
        console.log('  Arabic:', arPosts.length);
        console.log('  English:', enPosts.length);
        console.log('');

        let arFormatted = 0;
        let enFormatted = 0;

        // Format Arabic posts
        console.log('Formatting Arabic posts...');
        for (const post of arPosts) {
            const cleanContent = stripAllFormatting(post.content);
            const formattedContent = applyFormatting(cleanContent, 'ar');

            await Post.findByIdAndUpdate(post._id, { content: formattedContent });
            arFormatted++;

            if (arFormatted % 10 === 0) {
                console.log(`  Formatted ${arFormatted}/${arPosts.length} Arabic posts...`);
            }
        }
        console.log(`  Completed: ${arFormatted} Arabic posts`);
        console.log('');

        // Format English posts
        console.log('Formatting English posts...');
        for (const post of enPosts) {
            const cleanContent = stripAllFormatting(post.content);
            const formattedContent = applyFormatting(cleanContent, 'en');

            await Post.findByIdAndUpdate(post._id, { content: formattedContent });
            enFormatted++;

            if (enFormatted % 10 === 0) {
                console.log(`  Formatted ${enFormatted}/${enPosts.length} English posts...`);
            }
        }
        console.log(`  Completed: ${enFormatted} English posts`);

        // Summary
        console.log('');
        console.log('========================================================');
        console.log('  FORMAT COMPLETE!');
        console.log('========================================================');
        console.log('');
        console.log('  RESULTS:');
        console.log('    Arabic Posts Formatted:', arFormatted);
        console.log('    English Posts Formatted:', enFormatted);
        console.log('    Total:', arFormatted + enFormatted);
        console.log('');
        console.log('  FORMATTING APPLIED:');
        console.log('    - RTL container for Arabic, LTR for English');
        console.log('    - H2 headings: 1.5em, bold, blue color, border-bottom');
        console.log('    - H3 headings: 1.25em, bold, dark gray');
        console.log('    - Paragraphs: line-height 1.8, proper margins');
        console.log('    - Technical keywords bolded');
        console.log('    - Colons added to heading ends');
        console.log('');
        console.log('  All posts updated successfully!');
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

formatTechIssuesProduction();
