import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(process.cwd(), '.env.local') });

const PostSchema = new mongoose.Schema({
    title: String,
    slug: String,
    language: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    content: String,
});

async function check() {
    await mongoose.connect(process.env.MONGODB_URI as string);

    // Get the specific post the user is viewing
    const post = await (mongoose.models.Post || mongoose.model('Post', PostSchema))
        .findOne({ slug: 'fix-usb-not-recognized-ar' }).lean() as any;

    console.log('═'.repeat(70));
    console.log('POST SLUG:', post?.slug);
    console.log('TITLE:', post?.title);
    console.log('═'.repeat(70));

    console.log('\nCONTENT (first 1200 chars):\n');
    console.log(post?.content?.substring(0, 1200));

    console.log('\n\n═'.repeat(70));
    console.log('KEY FORMAT CHECKS:');
    const content = post?.content || '';
    console.log('  - Has RTL div wrapper:', content.includes('direction: rtl'));
    console.log('  - Has styled h2:', content.includes('<h2 style='));
    console.log('  - Has styled p:', content.includes('<p style='));
    console.log('  - Has strong tags:', content.includes('<strong>'));
    console.log('  - Has border-bottom:', content.includes('border-bottom'));
    console.log('═'.repeat(70));

    await mongoose.disconnect();
}

check();
