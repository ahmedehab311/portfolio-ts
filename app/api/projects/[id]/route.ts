import { connectDB } from "@/lib/db";
import { Project } from "@/models/projects";
import { updateProjectSchema } from "../../validators/project.schema";
import { apiResponse } from "@/lib/apiResponseBackend";
import cloudinary from "@/lib/cloudinary";
import streamifier from "streamifier";
import { NextRequest } from "next/server";



export async function PUT(req: NextRequest) {
    try {
        await connectDB();

        // 1️⃣ استخراج الـ id
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop();
        if (!id) throw new Error("Project id is required");

        // 2️⃣ قراءة الـ formData
        const formData = await req.formData();
        const imageFile = formData.get("image") as Blob | null;

        // 3️⃣ تجميع الداتا اللي جاية بس
        const updatePayload: any = {};

        formData.forEach((value, key) => {
            if (key !== "image") {
                updatePayload[key] = value;
            }
        });

        // 4️⃣ تحويل الأنواع
        if (updatePayload.order !== undefined) {
            updatePayload.order = Number(updatePayload.order);
        }

        if (updatePayload.tags) {
            updatePayload.tags = JSON.parse(updatePayload.tags);
        }

        // 5️⃣ رفع صورة جديدة (لو موجودة)
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

            updatePayload.image = uploadResult.secure_url;
        }

        // 6️⃣ Validation (جزئي)
        const validatedData = updateProjectSchema.parse(updatePayload);

        // 7️⃣ التحديث
        const project = await Project.findByIdAndUpdate(
            id,
            { $set: validatedData },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!project) {
            return apiResponse({
                statusCode: 404,
                status: "error",
                message: "Project not found",
                data: null,
            });
        }

        // 8️⃣ Success
        return apiResponse({
            statusCode: 200,
            status: "success",
            message: "Project updated successfully",
            data: project,
        });

    } catch (error: any) {
        // Zod Errors
        if (error?.issues) {
            return apiResponse({
                statusCode: 400,
                status: "error",
                message: error.issues.map((e: any) => e.message).join(", "),
                data: null,
            });
        }

        console.error("PUT /api/projects ERROR:", error);

        return apiResponse({
            statusCode: 500,
            status: "error",
            message: error.message || "Internal server error",
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
