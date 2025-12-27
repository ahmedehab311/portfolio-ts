
import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    // هنا بنخزن رابط Cloudinary اللي اتكلمنا عنه
    cvUrl: { type: String, required: true },
    bio: { type: String },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);


