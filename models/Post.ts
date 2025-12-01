import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPost extends Document {
    title: string;
    slug: string;
    language: 'ar' | 'en';
    category: mongoose.Types.ObjectId;
    tags: string[];
    excerpt: string;
    content: string;
    coverImage: string;
    status: 'draft' | 'published';
    readingTime: number;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title'],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, 'Please provide a slug'],
            lowercase: true,
            trim: true,
        },
        language: {
            type: String,
            required: [true, 'Please provide a language'],
            enum: ['ar', 'en'],
            default: 'ar',
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Please provide a category'],
        },
        tags: {
            type: [String],
            default: [],
        },
        excerpt: {
            type: String,
            required: [true, 'Please provide an excerpt'],
            trim: true,
            maxlength: 300,
        },
        content: {
            type: String,
            required: [true, 'Please provide content'],
        },
        coverImage: {
            type: String,
            required: [true, 'Please provide a cover image'],
        },
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft',
        },
        readingTime: {
            type: Number,
            default: 5,
        },
    },
    {
        timestamps: true,
    }
);

// Create compound index for unique slug per language
PostSchema.index({ slug: 1, language: 1 }, { unique: true });

// Index for search functionality
PostSchema.index({ title: 'text', content: 'text', excerpt: 'text' });

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;
