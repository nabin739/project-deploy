import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['image', 'video'],
        required: true
    },
    format: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        default: null
    },
    thumbnail: {
        type: String,
        default: null
    }
});

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    marketingVertical: {
        type: String,
        required: true
    },
    media: [mediaSchema],
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Image = mongoose.models.image || mongoose.model('image', imageSchema);

export default Image;