import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';
import { getArabicPosts, getEnglishPosts } from './posts/index';

// Load production environment
config({ path: path.resolve(process.cwd(), '.env.production') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI is not defined in .env.production');
    process.exit(1);
}

// Define schemas
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

async function seedNewPosts() {
    try {
        console.log('🌱 Starting new posts seed to PRODUCTION...');
        console.log('📦 Database: techiss-blog (Production)');
        console.log('');

        await mongoose.connect(MONGODB_URI as string);
        console.log('✅ Connected to MongoDB Production');

        // Get categories
        const arCategories = {
            programming: await Category.findOne({ slug: 'programming', language: 'ar' }),
            techIssues: await Category.findOne({ slug: 'tech-issues', language: 'ar' }),
            deviceReviews: await Category.findOne({ slug: 'device-reviews', language: 'ar' }),
        };

        const enCategories = {
            programming: await Category.findOne({ slug: 'programming', language: 'en' }),
            techIssues: await Category.findOne({ slug: 'tech-issues', language: 'en' }),
            deviceReviews: await Category.findOne({ slug: 'device-reviews', language: 'en' }),
        };

        console.log('📁 Found categories:');
        console.log(`   - AR Programming: ${arCategories.programming ? '✓' : '✗'}`);
        console.log(`   - AR Tech Issues: ${arCategories.techIssues ? '✓' : '✗'}`);
        console.log(`   - AR Device Reviews: ${arCategories.deviceReviews ? '✓' : '✗'}`);
        console.log(`   - EN Programming: ${enCategories.programming ? '✓' : '✗'}`);
        console.log(`   - EN Tech Issues: ${enCategories.techIssues ? '✓' : '✗'}`);
        console.log(`   - EN Device Reviews: ${enCategories.deviceReviews ? '✓' : '✗'}`);
        console.log('');

        // Get posts data
        const arabicPosts = getArabicPosts(arCategories);
        const englishPosts = getEnglishPosts(enCategories);
        const allPosts = [...arabicPosts, ...englishPosts];

        console.log(`📝 Processing ${allPosts.length} posts (${arabicPosts.length} AR + ${englishPosts.length} EN)...`);
        console.log('');

        let createdCount = 0;
        let skippedCount = 0;

        for (const post of allPosts) {
            const existing = await Post.findOne({ slug: post.slug, language: post.language });
            if (existing) {
                console.log(`⏭️  Skipped (exists): [${post.language.toUpperCase()}] ${post.title}`);
                skippedCount++;
            } else {
                await Post.create(post);
                // Count words in content
                const wordCount = post.content.split(/\s+/).length;
                console.log(`✅ Created: [${post.language.toUpperCase()}] ${post.title} (${wordCount} words)`);
                createdCount++;
            }
        }

        console.log('');
        console.log('═══════════════════════════════════════════════════════════');
        console.log('📋 SUMMARY');
        console.log('═══════════════════════════════════════════════════════════');
        console.log(`   Total processed: ${allPosts.length}`);
        console.log(`   ✅ Created:      ${createdCount}`);
        console.log(`   ⏭️  Skipped:      ${skippedCount}`);
        console.log('');
        console.log('   Posts by Language:');
        console.log(`   - Arabic:  ${arabicPosts.length} (2 Programming + 2 Tech Issues + 2 Device Reviews)`);
        console.log(`   - English: ${englishPosts.length} (2 Programming + 2 Tech Issues + 2 Device Reviews)`);
        console.log('═══════════════════════════════════════════════════════════');

        await mongoose.disconnect();
        console.log('\n👋 Disconnected from MongoDB');
        console.log('✅ Seed completed successfully!');
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
}

seedNewPosts();
