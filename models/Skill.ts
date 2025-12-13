import mongoose, { Document, Schema } from "mongoose";

export interface TSkills extends Document {
    name: string;
    icon?: string
}

const SkillSchema = new Schema<TSkills>({
    name: { type: String, required: true },
    icon: String
})
export default mongoose.models.skill || mongoose.model<TSkills>("skills", SkillSchema)