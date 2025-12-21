import { z } from "zod";
import { ProjectCategory, ProjectStatus } from "@/app/constants/project";

export const projectSchema = z.object({
    title: z.string().min(3, "Title is too short"),
    description: z.string().min(10, "Description is too short"),
    category: z.enum(
        Object.values(ProjectCategory) as [string, ...string[]]
    ),

    projectStatus: z.enum(
        Object.values(ProjectStatus) as [string, ...string[]]
    ),
    image: z.string().min(1, "Image is required"),
    codeUrl: z.url({ message: "Invalid code URL" }),
    demoUrl: z.url({ message: "Invalid demo URL" }),
    order: z.number().int().min(0),
    tags: z
        .array(
            z.string()
                .trim()
                .min(1, "Tag cannot be empty")
                .max(20, "Tag is too long")
        )
        .min(1, "At least one tag is required"),
})


export const updateProjectSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),

    category: z
        .enum(Object.values(ProjectCategory) as [string, ...string[]])
        .optional(),

    projectStatus: z
        .enum(Object.values(ProjectStatus) as [string, ...string[]])
        .optional(),

    codeUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    image: z.string().optional(),

    tags: z
        .array(
            z.string()
                .trim()
                .min(1, "Tag cannot be empty")
                .max(20, "Tag is too long")
        )
        .optional(),

    order: z.number().int().min(0).optional(),
});
