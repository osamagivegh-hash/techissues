import mongoose from 'mongoose';
import { hashPassword } from '../lib/auth';
import { config } from 'dotenv';
import path from 'path';

// Import original seed data
import { programmingPostsAr } from './seed-data/programming-ar';
import { programmingPostsEn } from './seed-data/programming-en';
import { techIssuesPostsAr } from './seed-data/techissues-ar';
import { techIssuesPostsEn } from './seed-data/techissues-en';
import { deviceReviewsPostsAr } from './seed-data/reviews-ar';
import { deviceReviewsPostsEn } from './seed-data/reviews-en';

// Import premium seed data with code examples
import { premiumProgrammingAr1 } from './seed-data/premium-programming-ar-1';
import { premiumProgrammingAr2 } from './seed-data/premium-programming-ar-2';
import { premiumProgrammingEn1 } from './seed-data/premium-programming-en-1';
import { premiumProgrammingEn2 } from './seed-data/premium-programming-en-2';
import { premiumTechIssuesAr } from './seed-data/premium-techissues-ar';
import { premiumTechIssuesEn } from './seed-data/premium-techissues-en';

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

// Define schemas inline to avoid import issues
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: String,
    role: String,
}, { timestamps: true });

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

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

async function seed() {
    try {
        console.log('');
        console.log('╔═══════════════════════════════════════════════════════════╗');
        console.log('║  🚀 PREMIUM SEED: High-Quality Posts with Code Examples   ║');
        console.log('╚═══════════════════════════════════════════════════════════╝');
        console.log('');

        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
        }

        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data and drop indexes
        await User.deleteMany({});
        await Category.deleteMany({});
        await Post.deleteMany({});

        // Drop text indexes that might cause language conflicts
        try {
            const db = mongoose.connection.db!;
            await db.collection('posts').dropIndexes();
            await db.collection('categories').dropIndexes();
        } catch (e) {
            // Ignore if indexes don't exist
        }
        console.log('🗑️  Cleared existing data');

        // Create admin user
        const hashedPassword = await hashPassword('admin123');
        await User.create({
            name: 'المدير',
            email: 'admin@techissues.com'.toLowerCase().trim(),
            password: hashedPassword,
            role: 'admin',
        });
        console.log('👤 Created admin user');

        // Create Arabic categories
        const arCategories = await Category.insertMany([
            { name: 'البرمجة', slug: 'programming', language: 'ar' },
            { name: 'المشاكل التقنية', slug: 'tech-issues', language: 'ar' },
            { name: 'مراجعات الأجهزة', slug: 'device-reviews', language: 'ar' },
        ]);

        // Create English categories
        const enCategories = await Category.insertMany([
            { name: 'Programming', slug: 'programming', language: 'en' },
            { name: 'Tech Issues', slug: 'tech-issues', language: 'en' },
            { name: 'Device Reviews', slug: 'device-reviews', language: 'en' },
        ]);

        console.log('📁 Created categories (AR + EN)');

        // Combine all programming posts
        const allProgrammingAr = [...programmingPostsAr, ...premiumProgrammingAr1, ...premiumProgrammingAr2];
        const allProgrammingEn = [...programmingPostsEn, ...premiumProgrammingEn1, ...premiumProgrammingEn2];

        // Combine all tech issues posts
        const allTechIssuesAr = [...techIssuesPostsAr, ...premiumTechIssuesAr];
        const allTechIssuesEn = [...techIssuesPostsEn, ...premiumTechIssuesEn];

        // Prepare Arabic posts with category IDs
        const arProgrammingPosts = allProgrammingAr.map(post => ({
            ...post,
            language: 'ar',
            category: arCategories[0]._id,
            status: 'published',
        }));

        const arTechIssuePosts = allTechIssuesAr.map(post => ({
            ...post,
            language: 'ar',
            category: arCategories[1]._id,
            status: 'published',
        }));

        const arReviewPosts = deviceReviewsPostsAr.map(post => ({
            ...post,
            language: 'ar',
            category: arCategories[2]._id,
            status: 'published',
        }));

        // Prepare English posts with category IDs
        const enProgrammingPosts = allProgrammingEn.map(post => ({
            ...post,
            language: 'en',
            category: enCategories[0]._id,
            status: 'published',
        }));

        const enTechIssuePosts = allTechIssuesEn.map(post => ({
            ...post,
            language: 'en',
            category: enCategories[1]._id,
            status: 'published',
        }));

        const enReviewPosts = deviceReviewsPostsEn.map(post => ({
            ...post,
            language: 'en',
            category: enCategories[2]._id,
            status: 'published',
        }));

        // Insert all posts
        console.log('');
        console.log('📝 Inserting posts...');

        await Post.insertMany(arProgrammingPosts);
        console.log(`   ✓ Arabic Programming: ${arProgrammingPosts.length} posts (${premiumProgrammingAr1.length + premiumProgrammingAr2.length} premium with code)`);

        await Post.insertMany(arTechIssuePosts);
        console.log(`   ✓ Arabic Tech Issues: ${arTechIssuePosts.length} posts (${premiumTechIssuesAr.length} premium with commands)`);

        await Post.insertMany(arReviewPosts);
        console.log(`   ✓ Arabic Device Reviews: ${arReviewPosts.length} posts`);

        await Post.insertMany(enProgrammingPosts);
        console.log(`   ✓ English Programming: ${enProgrammingPosts.length} posts (${premiumProgrammingEn1.length + premiumProgrammingEn2.length} premium with code)`);

        await Post.insertMany(enTechIssuePosts);
        console.log(`   ✓ English Tech Issues: ${enTechIssuePosts.length} posts (${premiumTechIssuesEn.length} premium with commands)`);

        await Post.insertMany(enReviewPosts);
        console.log(`   ✓ English Device Reviews: ${enReviewPosts.length} posts`);

        const totalAr = arProgrammingPosts.length + arTechIssuePosts.length + arReviewPosts.length;
        const totalEn = enProgrammingPosts.length + enTechIssuePosts.length + enReviewPosts.length;
        const totalPosts = totalAr + totalEn;
        const premiumCount = premiumProgrammingAr1.length + premiumProgrammingAr2.length +
            premiumProgrammingEn1.length + premiumProgrammingEn2.length +
            premiumTechIssuesAr.length + premiumTechIssuesEn.length;

        console.log('');
        console.log('╔═══════════════════════════════════════════════════════════╗');
        console.log('║      ✅ PREMIUM SEED COMPLETED SUCCESSFULLY!              ║');
        console.log('╚═══════════════════════════════════════════════════════════╝');
        console.log('');
        console.log('📋 Summary:');
        console.log('───────────────────────────────────────────────────────────');
        console.log(`   👤 Admin: admin@techissues.com (password: admin123)`);
        console.log('');
        console.log('   📂 Categories: 6 total (3 AR + 3 EN)');
        console.log('');
        console.log('   📝 Arabic Posts:');
        console.log(`      • البرمجة (Programming): ${arProgrammingPosts.length}`);
        console.log(`      • المشاكل التقنية (Tech Issues): ${arTechIssuePosts.length}`);
        console.log(`      • مراجعات الأجهزة (Reviews): ${arReviewPosts.length}`);
        console.log(`      → Total Arabic: ${totalAr}`);
        console.log('');
        console.log('   📝 English Posts:');
        console.log(`      • Programming: ${enProgrammingPosts.length}`);
        console.log(`      • Tech Issues: ${enTechIssuePosts.length}`);
        console.log(`      • Device Reviews: ${enReviewPosts.length}`);
        console.log(`      → Total English: ${totalEn}`);
        console.log('');
        console.log('   ⭐ Premium Posts (with code examples): ' + premiumCount);
        console.log(`   📊 TOTAL POSTS: ${totalPosts}`);
        console.log('───────────────────────────────────────────────────────────');

        await mongoose.disconnect();
        console.log('');
        console.log('👋 Disconnected from MongoDB');
        console.log('');
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
}

seed();
