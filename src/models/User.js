import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    avatarUrl: String,
    socialOnly: { type: Boolean, default: false },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 5);
        return next();
    } else {
        return next();
    }
})

export default mongoose.model("User", userSchema);