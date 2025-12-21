import mongoose, { Document, Model, Schema } from "mongoose";

export interface TSkills extends Document {
    name: string;
    icon?: string
    color: string;
    order?: number;
}

const SkillSchema = new Schema<TSkills>({
    name: { type: String, required: true },
    icon: String,
    color: { type: String, required: true },
    order: { type: Number }
})

const Skill: Model<TSkills> = mongoose.models.Skill || mongoose.model<TSkills>("Skill", SkillSchema);

export default Skill;