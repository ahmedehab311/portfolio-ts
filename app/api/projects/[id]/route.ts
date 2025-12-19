import { connectDB } from "@/lib/db";
import { Project } from "@/models/projects";
import { projectSchema } from "../../validators/project.schema";
import { apiResponse } from "@/lib/apiResponseBackend";
import cloudinary from "@/lib/cloudinary";
import streamifier from "streamifier";
import { NextRequest } from "next/server";

export const config = {
    api: { bodyParser: false },
};

export async function PUT(req: NextRequest) {
    try {
        await connectDB();

        const url = new URL(req.url);
        const id = url.pathname.split("/").pop(); // آخر جزء من المسار هو الـ id
        if (!id) throw new Error("Project id is required");

        const formData = await req.formData();
        const imageFile = formData.get("image") as Blob | null;

        // جلب المشروع القديم
        const existingProject = await Project.findById(id);
        if (!existingProject) {
            return apiResponse({ statusCode: 404, status: "error", message: "Project not found", data: null });
        }

        // تحويل باقي الحقول إلى object
        const fields: any = {};
        formData.forEach((value, key) => {
            if (key !== "image") fields[key] = value;
        });

        // رفع الصورة الجديدة إذا موجودة
        let imageUrl = existingProject.image;
        if (imageFile && imageFile.size > 0) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
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
            imageUrl = uploadResult.secure_url;
        }

        // دمج القديم والجديد
        const updatedData = {
            ...existingProject.toObject(),
            ...fields,
            image: imageUrl,
            order: fields.order ? Number(fields.order) : existingProject.order,
        };

        const validatedData = projectSchema.parse(updatedData);

        // تحديث المشروع
        const project = await Project.findByIdAndUpdate(id, validatedData, { new: true });

        return apiResponse({
            statusCode: 200,
            status: "success",
            message: "Project updated successfully",
            data: project,
        });
    } catch (error: any) {
        if (error.name === "ZodError") {
            return apiResponse({
                statusCode: 400,
                status: "error",
                message: error.errors.map((e: any) => e.message).join(", "),
                data: null,
            });
        }

        return apiResponse({
            statusCode: 500,
            status: "error",
            message: error.message,
            data: null,
        });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();

        const url = new URL(req.url);
        const id = url.pathname.split("/").pop(); // آخر جزء من المسار هو الـ id
        if (!id) throw new Error("Project id is required");

        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return apiResponse({
                statusCode: 404,
                status: "error",
                message: "Project not found",
                data: null,
            });
        }

        return apiResponse({
            statusCode: 200,
            status: "success",
            message: "Project deleted successfully",
            data: null,
        });
    } catch (error: any) {
        return apiResponse({
            statusCode: 500,
            status: "error",
            message: error.message,
            data: null,
        });
    }
}
