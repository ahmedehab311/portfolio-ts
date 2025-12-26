import mongoose, { Schema, model, models } from "mongoose";

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// عشان نتجنب الـ Overwrite في Next.js أثناء الـ Development
export const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);