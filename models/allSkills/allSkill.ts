import { AllSkilsCategory } from "@/app/constants/project";
import { Schema, model, models } from "mongoose";

const SkillSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, enum: [AllSkilsCategory.FRONTEND, AllSkilsCategory.BACKEND, AllSkilsCategory.TOOLS], required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    order: { type: Number, required: true, default: 0 },
})

export const allSkills = models.allSkills || model('allSkills', SkillSchema);