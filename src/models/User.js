import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 5);
})

export default mongoose.model("User", userSchema);