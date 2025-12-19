const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
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
            type: mongoose.Schema.Types.ObjectId,
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

PostSchema.index({ slug: 1, language: 1 }, { unique: true });
PostSchema.index({ title: 'text', content: 'text', excerpt: 'text' });

module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema);
