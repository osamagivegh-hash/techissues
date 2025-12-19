import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
    {
        name: {
            type: String,
            required: [true, 'Please provide your name'],
            trim: true,
            maxlength: 100,
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        subject: {
            type: String,
            required: [true, 'Please provide a subject'],
            trim: true,
            maxlength: 200,
        },
        message: {
            type: String,
            required: [true, 'Please provide a message'],
            trim: true,
            maxlength: 5000,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
MessageSchema.index({ createdAt: -1 });
MessageSchema.index({ isRead: 1 });

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
