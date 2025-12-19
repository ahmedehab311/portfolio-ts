import { z } from "zod";
import { ProjectCategory, ProjectStatus } from "@/app/constants/project";

export const projectSchema = z.object({
    title: z.string().min(3, "Title is too short"),
    description: z.string().min(10, "Description is too short"),
    category: z.enum(ProjectCategory),
    projectStatus: z.enum(ProjectStatus),
    image: z.string().min(1, "Image is required"),
    codeUrl: z.url({ message: "Invalid code URL" }),
    demoUrl: z.url({ message: "Invalid demo URL" }),
    order: z.number().int().min(0),
})