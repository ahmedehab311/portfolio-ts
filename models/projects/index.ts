import { Schema, model, models } from "mongoose";
import { ProjectCategory, ProjectStatus } from "@/app/constants/project";
import { TProjectSchema } from "@/types/back/project";


const ProjectSchema = new Schema<TProjectSchema>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: Object.values(ProjectCategory),
        required: true,
    },
    projectStatus: {
        type: String,
        enum: Object.values(ProjectStatus),
        default: ProjectStatus.COMPLETED,
    },
    image: {
        type: String,
        required: true,
    },
    codeUrl: {
        type: String,
    },
    demoUrl: {
        type: String,
    }, order: {
        type: Number,
        default: 0,
    },
    tags: { type: [String], required: true, default: [] },
},
    {
        timestamps: true,
    }

)

export const Project = models["Project"] || model<TProjectSchema>("Project", ProjectSchema);
