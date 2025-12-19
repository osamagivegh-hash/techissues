const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema(
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

module.exports = mongoose.models.Image || mongoose.model('Image', ImageSchema);
