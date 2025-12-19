import mongoose from 'mongoose';
import { hashPassword } from '../lib/auth';
import { config } from 'dotenv';
import path from 'path';

// ═══════════════════════════════════════════════════════════════════════════
// ARABIC REVIEWS (50 articles)
// ═══════════════════════════════════════════════════════════════════════════
import { reviewsArBatch1 } from './seed-data/reviews-ar-batch1';
import { reviewsArBatch2 } from './seed-data/reviews-ar-batch2';
import { reviewsArBatch3 } from './seed-data/reviews-ar-batch3';
import { reviewsArBatch4 } from './seed-data/reviews-ar-batch4';
import { reviewsArBatch5 } from './seed-data/reviews-ar-batch5';

// ═══════════════════════════════════════════════════════════════════════════
// ARABIC TECH ISSUES (50 articles)
// ═══════════════════════════════════════════════════════════════════════════
import { techissuesArBatch1 } from './seed-data/techissues-ar-batch1';
import { techissuesArBatch2 } from './seed-data/techissues-ar-batch2';
import { techissuesArBatch3 } from './seed-data/techissues-ar-batch3';
import { techissuesArBatch4 } from './seed-data/techissues-ar-batch4';
import { techissuesArBatch5 } from './seed-data/techissues-ar-batch5';

// ═══════════════════════════════════════════════════════════════════════════
// ARABIC PROGRAMMING (50 articles)
// ═══════════════════════════════════════════════════════════════════════════
import { programmingArBatch1 } from './seed-data/programming-ar-batch1';
import { programmingArBatch2 } from './seed-data/programming-ar-batch2';
import { programmingArBatch3 } from './seed-data/programming-ar-batch3';
import { programmingArBatch4 } from './seed-data/programming-ar-batch4';
import { programmingArBatch5 } from './seed-data/programming-ar-batch5';

// ═══════════════════════════════════════════════════════════════════════════
// ENGLISH REVIEWS (50 articles)
// ═══════════════════════════════════════════════════════════════════════════
import { reviewsEnBatch1 } from './seed-data/reviews-en-batch1';
import { reviewsEnBatch2 } from './seed-data/reviews-en-batch2';
import { reviewsEnBatch3 } from './seed-data/reviews-en-batch3';
import { reviewsEnBatch4 } from './seed-data/reviews-en-batch4';
import { reviewsEnBatch5 } from './seed-data/reviews-en-batch5';

// ═══════════════════════════════════════════════════════════════════════════
// ENGLISH TECH ISSUES (50 articles)
// ═══════════════════════════════════════════════════════════════════════════
import { techissuesEnBatch1 } from './seed-data/techissues-en-batch1';
import { techissuesEnBatch2 } from './seed-data/techissues-en-batch2';
import { techissuesEnBatch3 } from './seed-data/techissues-en-batch3';
import { techissuesEnBatch4 } from './seed-data/techissues-en-batch4';
import { techissuesEnBatch5 } from './seed-data/techissues-en-batch5';

// ═══════════════════════════════════════════════════════════════════════════
// ENGLISH PROGRAMMING (50 articles)
// ═══════════════════════════════════════════════════════════════════════════
import { programmingEnBatch1 } from './seed-data/programming-en-batch1';
import { programmingEnBatch2 } from './seed-data/programming-en-batch2';
import { programmingEnBatch3 } from './seed-data/programming-en-batch3';
import { programmingEnBatch4 } from './seed-data/programming-en-batch4';
import { programmingEnBatch5 } from './seed-data/programming-en-batch5';

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

// Batch size for database insertion
const BATCH_SIZE = 50;

async function insertInBatches(posts: any[], label: string) {
    console.log(`   📥 Inserting ${label}...`);

    for (let i = 0; i < posts.length; i += BATCH_SIZE) {
        const batch = posts.slice(i, i + BATCH_SIZE);
        await Post.insertMany(batch);
        console.log(`      ✓ Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} posts inserted`);
    }

    console.log(`   ✅ ${label}: ${posts.length} posts total`);
}

async function seed() {
    try {
        console.log('');
        console.log('╔═══════════════════════════════════════════════════════════════════╗');
        console.log('║  🚀 TECHISS STORE: Seeding 300 SEO-Optimized Articles             ║');
        console.log('║  📝 150 Arabic + 150 English | Reviews • Tech Issues • Programming║');
        console.log('╚═══════════════════════════════════════════════════════════════════╝');
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

        console.log('📁 Created categories (3 AR + 3 EN)');
        console.log('');

        // ═══════════════════════════════════════════════════════════════════════
        // COMBINE ALL ARABIC ARTICLES
        // ═══════════════════════════════════════════════════════════════════════

        const allReviewsAr = [
            ...reviewsArBatch1,
            ...reviewsArBatch2,
            ...reviewsArBatch3,
            ...reviewsArBatch4,
            ...reviewsArBatch5,
        ];

        const allTechIssuesAr = [
            ...techissuesArBatch1,
            ...techissuesArBatch2,
            ...techissuesArBatch3,
            ...techissuesArBatch4,
            ...techissuesArBatch5,
        ];

        const allProgrammingAr = [
            ...programmingArBatch1,
            ...programmingArBatch2,
            ...programmingArBatch3,
            ...programmingArBatch4,
            ...programmingArBatch5,
        ];

        // ═══════════════════════════════════════════════════════════════════════
        // COMBINE ALL ENGLISH ARTICLES
        // ═══════════════════════════════════════════════════════════════════════

        const allReviewsEn = [
            ...reviewsEnBatch1,
            ...reviewsEnBatch2,
            ...reviewsEnBatch3,
            ...reviewsEnBatch4,
            ...reviewsEnBatch5,
        ];

        const allTechIssuesEn = [
            ...techissuesEnBatch1,
            ...techissuesEnBatch2,
            ...techissuesEnBatch3,
            ...techissuesEnBatch4,
            ...techissuesEnBatch5,
        ];

        const allProgrammingEn = [
            ...programmingEnBatch1,
            ...programmingEnBatch2,
            ...programmingEnBatch3,
            ...programmingEnBatch4,
            ...programmingEnBatch5,
        ];

        // ═══════════════════════════════════════════════════════════════════════
        // PREPARE ARABIC POSTS WITH CATEGORY IDs
        // ═══════════════════════════════════════════════════════════════════════

        const arReviewPosts = allReviewsAr.map(post => ({
            ...post,
            language: 'ar',
            category: arCategories[2]._id, // مراجعات الأجهزة
            status: 'published',
        }));

        const arTechIssuePosts = allTechIssuesAr.map(post => ({
            ...post,
            language: 'ar',
            category: arCategories[1]._id, // المشاكل التقنية
            status: 'published',
        }));

        const arProgrammingPosts = allProgrammingAr.map(post => ({
            ...post,
            language: 'ar',
            category: arCategories[0]._id, // البرمجة
            status: 'published',
        }));

        // ═══════════════════════════════════════════════════════════════════════
        // PREPARE ENGLISH POSTS WITH CATEGORY IDs
        // ═══════════════════════════════════════════════════════════════════════

        const enReviewPosts = allReviewsEn.map(post => ({
            ...post,
            language: 'en',
            category: enCategories[2]._id, // Device Reviews
            status: 'published',
        }));

        const enTechIssuePosts = allTechIssuesEn.map(post => ({
            ...post,
            language: 'en',
            category: enCategories[1]._id, // Tech Issues
            status: 'published',
        }));

        const enProgrammingPosts = allProgrammingEn.map(post => ({
            ...post,
            language: 'en',
            category: enCategories[0]._id, // Programming
            status: 'published',
        }));

        // ═══════════════════════════════════════════════════════════════════════
        // INSERT ALL POSTS IN BATCHES
        // ═══════════════════════════════════════════════════════════════════════

        console.log('📝 INSERTING ARABIC ARTICLES (150 total)');
        console.log('─────────────────────────────────────────');

        await insertInBatches(arReviewPosts, 'Arabic Reviews (مراجعات الأجهزة)');
        await insertInBatches(arTechIssuePosts, 'Arabic Tech Issues (المشاكل التقنية)');
        await insertInBatches(arProgrammingPosts, 'Arabic Programming (البرمجة)');

        console.log('');
        console.log('📝 INSERTING ENGLISH ARTICLES (150 total)');
        console.log('─────────────────────────────────────────');

        await insertInBatches(enReviewPosts, 'English Reviews');
        await insertInBatches(enTechIssuePosts, 'English Tech Issues');
        await insertInBatches(enProgrammingPosts, 'English Programming');

        // ═══════════════════════════════════════════════════════════════════════
        // SUMMARY
        // ═══════════════════════════════════════════════════════════════════════

        const totalAr = arReviewPosts.length + arTechIssuePosts.length + arProgrammingPosts.length;
        const totalEn = enReviewPosts.length + enTechIssuePosts.length + enProgrammingPosts.length;
        const totalPosts = totalAr + totalEn;

        console.log('');
        console.log('╔═══════════════════════════════════════════════════════════════════╗');
        console.log('║      ✅ DATABASE SEED COMPLETED SUCCESSFULLY!                     ║');
        console.log('╚═══════════════════════════════════════════════════════════════════╝');
        console.log('');
        console.log('📋 SUMMARY:');
        console.log('═══════════════════════════════════════════════════════════════════');
        console.log(`   👤 Admin: admin@techissues.com (password: admin123)`);
        console.log('');
        console.log('   📂 Categories: 6 total (3 AR + 3 EN)');
        console.log('');
        console.log('   📝 ARABIC POSTS:');
        console.log(`      • مراجعات الأجهزة (Reviews):      ${arReviewPosts.length} articles`);
        console.log(`      • المشاكل التقنية (Tech Issues): ${arTechIssuePosts.length} articles`);
        console.log(`      • البرمجة (Programming):         ${arProgrammingPosts.length} articles`);
        console.log(`      ───────────────────────────────────────`);
        console.log(`      → Total Arabic: ${totalAr} articles`);
        console.log('');
        console.log('   📝 ENGLISH POSTS:');
        console.log(`      • Device Reviews:                ${enReviewPosts.length} articles`);
        console.log(`      • Tech Issues:                   ${enTechIssuePosts.length} articles`);
        console.log(`      • Programming:                   ${enProgrammingPosts.length} articles`);
        console.log(`      ───────────────────────────────────────`);
        console.log(`      → Total English: ${totalEn} articles`);
        console.log('');
        console.log('═══════════════════════════════════════════════════════════════════');
        console.log(`   🎉 GRAND TOTAL: ${totalPosts} SEO-OPTIMIZED ARTICLES`);
        console.log('═══════════════════════════════════════════════════════════════════');

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
