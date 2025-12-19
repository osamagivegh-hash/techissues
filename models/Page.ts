import mongoose, { Document, Schema } from 'mongoose';

export interface IPage extends Document {
    slug: string;
    titleAr: string;
    titleEn: string;
    contentAr: string;
    contentEn: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PageSchema = new Schema<IPage>(
    {
        slug: {
            type: String,
            required: [true, 'Please provide a slug'],
            unique: true,
            trim: true,
            lowercase: true,
            enum: ['privacy-policy', 'terms', 'about', 'contact-info'],
        },
        titleAr: {
            type: String,
            required: [true, 'Please provide Arabic title'],
            trim: true,
        },
        titleEn: {
            type: String,
            required: [true, 'Please provide English title'],
            trim: true,
        },
        contentAr: {
            type: String,
            required: [true, 'Please provide Arabic content'],
        },
        contentEn: {
            type: String,
            required: [true, 'Please provide English content'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
PageSchema.index({ slug: 1 });

export default mongoose.models.Page || mongoose.model<IPage>('Page', PageSchema);
