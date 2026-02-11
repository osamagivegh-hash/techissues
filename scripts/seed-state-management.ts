import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';
import { arStateManagementPost } from './posts/ar-state-management';
import { enStateManagementPost } from './posts/en-state-management';

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

async function seedStateManagementPosts() {
    try {
        console.log('');
        console.log('╔══════════════════════════════════════════════════════════════════╗');
        console.log('║         🌱 STATE MANAGEMENT POSTS SEEDER                         ║');
        console.log('║         📦 Target: Production Database (techiss-blog)            ║');
        console.log('╚══════════════════════════════════════════════════════════════════╝');
        console.log('');

        await mongoose.connect(MONGODB_URI as string);
        console.log('✅ Connected to MongoDB Production');
        console.log('');

        // Get Programming categories for both languages
        const arProgrammingCategory = await Category.findOne({
            slug: 'programming',
            language: 'ar'
        });

        const enProgrammingCategory = await Category.findOne({
            slug: 'programming',
            language: 'en'
        });

        console.log('📁 Category Status:');
        console.log(`   - Arabic Programming:  ${arProgrammingCategory ? '✓ Found (ID: ' + arProgrammingCategory._id + ')' : '✗ Not Found'}`);
        console.log(`   - English Programming: ${enProgrammingCategory ? '✓ Found (ID: ' + enProgrammingCategory._id + ')' : '✗ Not Found'}`);
        console.log('');

        if (!arProgrammingCategory || !enProgrammingCategory) {
            console.error('❌ Error: Programming categories not found. Please run the main seed first.');
            process.exit(1);
        }

        // Prepare posts data
        const arabicPost = {
            ...arStateManagementPost,
            category: arProgrammingCategory._id,
            language: 'ar' as const,
            status: 'published',
        };

        const englishPost = {
            ...enStateManagementPost,
            category: enProgrammingCategory._id,
            language: 'en' as const,
            status: 'published',
        };

        const allPosts = [arabicPost, englishPost];

        console.log('═══════════════════════════════════════════════════════════════════');
        console.log('📝 PROCESSING POSTS');
        console.log('═══════════════════════════════════════════════════════════════════');
        console.log('');

        let createdCount = 0;
        let updatedCount = 0;
        let skippedCount = 0;

        for (const post of allPosts) {
            const existing = await Post.findOne({
                slug: post.slug,
                language: post.language
            });

            if (existing) {
                // Update existing post
                await Post.updateOne(
                    { _id: existing._id },
                    { $set: post }
                );
                const wordCount = post.content.split(/\s+/).length;
                const charCount = post.content.length;
                console.log(`📝 Updated: [${post.language.toUpperCase()}] ${post.title}`);
                console.log(`   📊 Stats: ${wordCount} words | ${charCount} characters`);
                console.log('');
                updatedCount++;
            } else {
                // Create new post
                await Post.create(post);
                const wordCount = post.content.split(/\s+/).length;
                const charCount = post.content.length;
                console.log(`✅ Created: [${post.language.toUpperCase()}] ${post.title}`);
                console.log(`   📊 Stats: ${wordCount} words | ${charCount} characters`);
                console.log('');
                createdCount++;
            }
        }

        console.log('');
        console.log('╔══════════════════════════════════════════════════════════════════╗');
        console.log('║                         📋 SUMMARY                               ║');
        console.log('╠══════════════════════════════════════════════════════════════════╣');
        console.log(`║  Total Processed:  ${allPosts.length}                                             ║`);
        console.log(`║  ✅ Created:       ${createdCount}                                             ║`);
        console.log(`║  📝 Updated:       ${updatedCount}                                             ║`);
        console.log(`║  ⏭️  Skipped:       ${skippedCount}                                             ║`);
        console.log('╠══════════════════════════════════════════════════════════════════╣');
        console.log('║  Posts by Language:                                              ║');
        console.log('║  - Arabic:  1 (State Management Guide)                           ║');
        console.log('║  - English: 1 (State Management Guide)                           ║');
        console.log('╚══════════════════════════════════════════════════════════════════╝');
        console.log('');

        // Display article details
        console.log('📄 ARTICLE DETAILS:');
        console.log('───────────────────────────────────────────────────────────────────');
        console.log('');
        console.log('🇸🇦 Arabic Article:');
        console.log(`   Title: ${arabicPost.title}`);
        console.log(`   Slug: ${arabicPost.slug}`);
        console.log(`   Category: Programming`);
        console.log(`   Tags: ${arabicPost.tags.join(', ')}`);
        console.log(`   Reading Time: ${arabicPost.readingTime} minutes`);
        console.log('');
        console.log('🇺🇸 English Article:');
        console.log(`   Title: ${englishPost.title}`);
        console.log(`   Slug: ${englishPost.slug}`);
        console.log(`   Category: Programming`);
        console.log(`   Tags: ${englishPost.tags.join(', ')}`);
        console.log(`   Reading Time: ${englishPost.readingTime} minutes`);
        console.log('');

        await mongoose.disconnect();
        console.log('👋 Disconnected from MongoDB');
        console.log('');
        console.log('═══════════════════════════════════════════════════════════════════');
        console.log('✅ SEED COMPLETED SUCCESSFULLY!');
        console.log('═══════════════════════════════════════════════════════════════════');
        console.log('');
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
}

seedStateManagementPosts();
