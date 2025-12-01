import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IImage extends Document {
    url: string;
    alt: string;
    createdAt: Date;
}

const ImageSchema = new Schema<IImage>(
    {
        url: {
            type: String,
            required: [true, 'Please provide an image URL'],
        },
        alt: {
            type: String,
            default: '',
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Image: Model<IImage> = mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema);

export default Image;
