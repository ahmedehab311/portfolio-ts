import { connectDB } from "@/lib/db";
import { Project } from "@/models/projects";
import { ProjectCategory } from "@/app/constants/project";
import { apiResponse } from "@/lib/apiResponseBackend";
import { NextRequest } from "next/server";
import { projectSchema } from "../validators/project.schema";
import cloudinary from "@/lib/cloudinary";
import streamifier from "streamifier";
export async function GET(req: NextRequest) {

    try {
        await connectDB()
        const { searchParams } = new URL(req.url)
        const category = searchParams.get("category")
        const filter: any = {}

        if (category && category !== ProjectCategory.ALL) {
            filter.category = category
        }
        const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 })

        return apiResponse({ statusCode: 200, status: "success", message: "skills fetched successfully", data: projects })
    } catch (error: any) {
        return apiResponse({ statusCode: 500, status: "error", message: `${error.message} || skills fetched successfully`, data: null })
    }

}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        // قراءة form-data من الطلب
        const formData = await req.formData();

        // جلب الصورة

        const imageFile = formData.get("image") as Blob;
        if (!imageFile) throw new Error("Image file is required");

        // تحويل باقي الحقول إلى object
        const fields: any = {};
        let tags: string[] = [];
        formData.forEach((value, key) => {
            if (key !== "image") fields[key] = value;
        });
        if (fields.tags) {
            try {
                tags = JSON.parse(fields.tags);

                if (!Array.isArray(tags)) {
                    throw new Error("Tags must be an array");
                }
            } catch {
                throw new Error("Invalid tags format");
            }
        }

        const buffer = Buffer.from(await imageFile.arrayBuffer());

        // رفع الصورة على Cloudinary
        const uploadResult = await new Promise<any>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "portfolio-projects" },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            streamifier.createReadStream(buffer).pipe(uploadStream);
        });

        const imageUrl = uploadResult.secure_url;
        console.log("FORM DATA ENTRIES:");
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
        // دمج البيانات مع رابط الصورة
        const projectData = {
            title: fields.title,
            description: fields.description,
            category: fields.category,
            projectStatus: fields.projectStatus,
            image: imageUrl,
            codeUrl: fields.codeUrl,
            demoUrl: fields.demoUrl,
            order: Number(fields.order),
            tags,
        };

        // Validation باستخدام Zod
        const validatedData = projectSchema.parse(projectData);
        // Validate النصوص الأول
        projectSchema.omit({ image: true }).parse({
            ...projectData,
            image: "temp",
        });


        // حفظ المشروع في DB
        const project = await Project.create(validatedData);

        return apiResponse({
            statusCode: 201,
            status: "success",
            message: "Project created successfully",
            data: project,
        });
    } catch (error: any) {
        if (error?.issues && Array.isArray(error.issues)) {
            return apiResponse({
                statusCode: 400,
                status: "error",
                message: error.issues.map((e: any) => e.message).join(", "),
                data: null,
            });
        }

        console.error("POST /api/projects ERROR:", error);

        return apiResponse({
            statusCode: 500,
            status: "error",
            message: error.message || "Internal server error",
            data: null,
        });
    }
}
