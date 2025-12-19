const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a category name'],
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
    },
    {
        timestamps: true,
    }
);

CategorySchema.index({ slug: 1, language: 1 }, { unique: true });

module.exports = mongoose.models.Category || mongoose.model('Category', CategorySchema);
