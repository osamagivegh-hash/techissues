import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables
config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

async function dropIndexes() {
    try {
        console.log('🔧 Dropping old indexes...');

        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
        }

        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Drop all indexes except _id
        const db = mongoose.connection.db;

        if (!db) {
            throw new Error('Database connection not established');
        }

        try {
            await db.collection('categories').dropIndexes();
            console.log('✅ Dropped category indexes');
        } catch (e) {
            console.log('ℹ️  No category indexes to drop');
        }

        try {
            await db.collection('posts').dropIndexes();
            console.log('✅ Dropped post indexes');
        } catch (e) {
            console.log('ℹ️  No post indexes to drop');
        }

        console.log('\n✅ Index cleanup completed!');

        await mongoose.disconnect();
        console.log('👋 Disconnected from MongoDB');
    } catch (error) {
        console.error('❌ Failed:', error);
        process.exit(1);
    }
}

dropIndexes();
