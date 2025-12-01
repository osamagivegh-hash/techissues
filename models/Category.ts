import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    slug: string;
    language: 'ar' | 'en';
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
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

// Create compound index for unique slug per language
CategorySchema.index({ slug: 1, language: 1 }, { unique: true });

const Category: Model<ICategory> =
    mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
