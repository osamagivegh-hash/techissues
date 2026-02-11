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

// Minimal Post Schema for verification
const PostSchema = new mongoose.Schema({
    title: String,
    slug: String,
    content: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
const Category = mongoose.models.Category || mongoose.model('Category', new mongoose.Schema({ name: String, slug: String }));

async function verify() {
    try {
        console.log('🔍 Verifying expanded content...');

        await mongoose.connect(MONGODB_URI);

        const techCategoryPrefix = 'Tech Issues'; // or 'المشاكل التقنية'

        // Find categories
        const categories = await Category.find({
            $or: [{ slug: 'tech-issues' }]
        });

        const categoryIds = categories.map(c => c._id);

        const posts = await Post.find({ category: { $in: categoryIds } });

        console.log(`Found ${posts.length} Tech Issues posts.`);

        let success = true;

        for (const post of posts) {
            // Rough word count (splitting by space)
            // HTML tags inflate this slightly, but we aimed for massive content so it should be well over 800-1000 "words" even with tags.
            const wordCount = post.content.split(/\s+/).length;

            console.log(`- [${post.title}] : ${wordCount} words`);

            if (wordCount < 800) {
                console.warn(`  ⚠️  Warning: Post "${post.title}" is shorter than expected (< 800 words).`);
                success = false;
            } else {
                console.log(`  ✅ Length OK`);
            }
        }

        if (success && posts.length >= 10) {
            console.log('\n✅ Verification SUCCEEDED: 10+ long-form Tech Issues posts found.');
        } else {
            console.log('\n❌ Verification FAILED: Missing posts or insufficient length.');
            if (posts.length < 10) console.error(`   Only found ${posts.length} posts (expected 10).`);
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error('❌ Verification script error:', error);
    }
}

verify();
