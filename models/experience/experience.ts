import { Schema, model, models } from "mongoose";

const ExperienceSchema = new Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, default: "Remote / On-site" },
    startDate: { type: String, required: true },
    endDate: { type: String, default: "Present" },
    description: { type: [String], required: true },
    technologies: [String],
    order: { type: Number, default: 0 }
});

export const Experience = models.Experience || model('Experience', ExperienceSchema);