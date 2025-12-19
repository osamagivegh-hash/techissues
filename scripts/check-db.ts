import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(process.cwd(), '.env.local') });

const CategorySchema = new mongoose.Schema({ name: String, slug: String, language: String });
const PostSchema = new mongoose.Schema({
    title: String,
    slug: String,
    language: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

async function check() {
    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log('═'.repeat(60));
    console.log('DATABASE CHECK');
    console.log('═'.repeat(60));
    console.log('MongoDB URI:', process.env.MONGODB_URI?.substring(0, 60) + '...');

    const categories = await Category.find({}).lean() as any[];
    console.log('\nAll Categories:');
    categories.forEach((c: any) => console.log(`  - ${c.name} | slug: ${c.slug} | lang: ${c.language}`));

    console.log('\nPost counts by category:');
    for (const cat of categories) {
        const count = await Post.countDocuments({ category: cat._id });
        console.log(`  - ${cat.name}: ${count} posts`);
    }

    // Check for our new 2025 reviews
    console.log('\n═'.repeat(60));
    console.log('2025 REVIEWS CHECK');
    console.log('═'.repeat(60));

    const arReview = await Post.findOne({ slug: 'samsung-galaxy-s25-ultra-review-ar' }).lean() as any;
    const enReview = await Post.findOne({ slug: 'samsung-galaxy-s25-ultra-review-en' }).lean() as any;

    console.log('AR Galaxy S25 Ultra:', arReview ? '✅ Found' : '❌ Not found');
    console.log('EN Galaxy S25 Ultra:', enReview ? '✅ Found' : '❌ Not found');

    if (arReview) {
        console.log('\nAR Review Title:', arReview.title);
    }

    await mongoose.disconnect();
}

check();
