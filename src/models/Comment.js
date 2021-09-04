import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: {
        type: String, required: true
    },
    createdAt: {
        type: Date, required: true, default: Date.now
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" }
})

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;