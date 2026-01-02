import { Schema, model, models } from "mongoose";
import { ProjectCategory, ProjectStatus } from "@/app/constants/project";
import { TProjectSchema } from "@/types/back/project";

const ProjectSchema = new Schema<TProjectSchema>({
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    category: {
        type: String,
        enum: {
            values: Object.values(ProjectCategory),
            message: '{VALUE} is not supported' 
        },
        required: true
    },
    projectStatus: { type: String, enum: Object.values(ProjectStatus), default: ProjectStatus.COMPLETED },
    mainImage: { type: String },
    gallery: { type: [String], default: [] },
    features: { type: [String], default: [] },
    challenges: { type: [String], default: [] },
    techStack: { type: [String], default: [] },
    codeUrl: { type: String },
    demoUrl: { type: String },
    order: { type: Number, default: 0 },
    tags: { type: [String], required: true, default: [] },
}, { timestamps: true });


export const Project = models["ProjectV2"] || model<TProjectSchema>("ProjectV2", ProjectSchema);