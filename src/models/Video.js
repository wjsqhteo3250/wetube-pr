import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    createdAt: { type: Date, default: Date.now },
    meta: {
        view: { type: Number, default: 0 },
        like: { type: Number, default: 0 },
        disLike: { type: Number, default: 0 },
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId, ref: "owner"
    }
})

const Video = mongoose.model("Video", videoSchema);

export default Video;