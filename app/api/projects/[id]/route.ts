import { connectDB } from "@/lib/db";
import { Project } from "@/models/projects";
import { projectSchema, updateProjectSchema } from "../../validators/project.schema";
import { apiResponse } from "@/lib/apiResponseBackend";
import cloudinary from "@/lib/cloudinary";
import streamifier from "streamifier";
import { NextRequest } from "next/server";

// export async function PUT(req: NextRequest) {
//     try {
//         await connectDB();

//         // 1️⃣ استخراج الـ id
//         const url = new URL(req.url);
//         const id = url.pathname.split("/").pop();
//         if (!id) throw new Error("Project id is required");

//         // 2️⃣ قراءة الـ formData
//         const formData = await req.formData();
//         const imageFile = formData.get("image") as Blob | null;

//         // 3️⃣ تجميع الداتا اللي جاية بس
//         const updatePayload: any = {};

//         formData.forEach((value, key) => {
//             // تجاهل أي مفتاح يخص الصور عشان إحنا هنحدثه يدويًا
//             if (key !== "image" && key !== "mainImage") {
//                 updatePayload[key] = value;
//             }
//         });
//         // 4️⃣ تحويل الأنواع
//         if (updatePayload.order !== undefined) {
//             updatePayload.order = Number(updatePayload.order);
//         }

//         if (updatePayload.tags) {
//             updatePayload.tags = JSON.parse(updatePayload.tags);
//         }

//         // 5️⃣ رفع صورة جديدة (لو موجودة)
//         if (imageFile && imageFile.size > 0) {
//             const buffer = Buffer.from(await imageFile.arrayBuffer());

//             const uploadResult = await new Promise<any>((resolve, reject) => {
//                 const uploadStream = cloudinary.uploader.upload_stream(
//                     { folder: "portfolio-projects" },
//                     (error, result) => {
//                         if (error) return reject(error);
//                         resolve(result);
//                     }
//                 );
//                 streamifier.createReadStream(buffer).pipe(uploadStream);
//             });

//             updatePayload.image = uploadResult.secure_url;
//         }

//         // 6️⃣ Validation (جزئي)
//         const validatedData = updateProjectSchema.parse(updatePayload);

//         // 7️⃣ التحديث
//         const project = await Project.findByIdAndUpdate(
//             id,
//             { $set: validatedData },
//             {
//                 new: true,
//                 runValidators: true,
//             }
//         );

//         if (!project) {
//             return apiResponse({
//                 statusCode: 404,
//                 status: "error",
//                 message: "Project not found",
//                 data: null,
//             });
//         }

//         // 8️⃣ Success
//         return apiResponse({
//             statusCode: 200,
//             status: "success",
//             message: "Project updated successfully",
//             data: project,
//         });

//     } catch (error: any) {
//         // Zod Errors
//         if (error?.issues) {
//             return apiResponse({
//                 statusCode: 400,
//                 status: "error",
//                 message: error.issues.map((e: any) => e.message).join(", "),
//                 data: null,
//             });
//         }

//         console.error("PUT /api/projects ERROR:", error);

//         return apiResponse({
//             statusCode: 500,
//             status: "error",
//             message: error.message || "Internal server error",
//             data: null,
//         });
//     }
// }
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } 
) {
    try {
        await connectDB();
        const { id } = await params;


        const existingProject = await Project.findById(id);
        if (!existingProject) {
            return apiResponse({ statusCode: 404, status: "fail", message: "Project not found", data: null });
        }

        const formData = await req.formData();


        const uploadToCloudinary = async (file: Blob, folder: string) => {

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // 2. الرفع المباشر باستخدام Promise
            return new Promise<any>((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: folder,
                        resource_type: "auto", 
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(buffer); 
            });
        };
 
        const imageFile = formData.get("image") as Blob | null;
        const galleryFiles = formData.getAll("gallery") as Blob[];

        let mainImageUrl = existingProject.mainImage; 
        if (imageFile && imageFile.size > 0) {
            const mainUpload = await uploadToCloudinary(imageFile, "portfolio-projects");
            mainImageUrl = mainUpload.secure_url;
        }


        let galleryUrls = existingProject.gallery; 

        // 1. لو مبعوت صور جديدة (ملفات)
        if (galleryFiles.length > 0 && galleryFiles[0] instanceof Blob && galleryFiles[0].size > 0) {
            const uploadPromises = galleryFiles
                .filter(file => file.size > 0)
                .map(file => uploadToCloudinary(file, "project-gallery"));
            const results = await Promise.all(uploadPromises);
            galleryUrls = results.map(r => r.secure_url);
        }
  
        else if (formData.get("clearGallery") === "true") {
            galleryUrls = []; 
        }


        const fields: any = {};
        formData.forEach((value, key) => {
            if (key !== "image" && key !== "gallery") fields[key] = value;
        });

        const parseArrayField = (field: any, defaultValue: any) => {
            try { return field ? JSON.parse(field) : defaultValue; }
            catch { return defaultValue; }
        };

        // 4. بناء الكائن المحدث
        // نستخدم عامل الـ OR (||) أو نتحقق من وجود القيمة عشان نحافظ على القديم
        const updateData = {
            title: fields.title || existingProject.title,
            shortDescription: fields.shortDescription || existingProject.shortDescription,
            fullDescription: fields.fullDescription || existingProject.fullDescription,
            category: fields.category || existingProject.category,
            projectStatus: fields.projectStatus || existingProject.projectStatus,
            mainImage: mainImageUrl,
            gallery: galleryUrls,
            codeUrl: fields.codeUrl || existingProject.codeUrl,
            demoUrl: fields.demoUrl || existingProject.demoUrl,
            order: fields.order !== undefined ? Number(fields.order) : existingProject.order,
            tags: fields.tags ? parseArrayField(fields.tags, []) : existingProject.tags,
            features: fields.features ? parseArrayField(fields.features, []) : existingProject.features,
            challenges: fields.challenges ? parseArrayField(fields.challenges, []) : existingProject.challenges,
            techStack: fields.techStack ? parseArrayField(fields.techStack, []) : existingProject.techStack,
        };

        // 5. التحقق بواسطة Zod 
        // ملاحظة: يفضل استخدام .partial() في الـ schema للـ update
        const validation = projectSchema.partial().safeParse(updateData);

        if (!validation.success) {
            return apiResponse({
                statusCode: 400,
                status: "fail",
                message: "Validation Error",
                data: validation.error.format()
            });
        }

        // 6. التحديث في القاعدة
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { $set: validation.data },
            { new: true, runValidators: true }
        );

        return apiResponse({
            statusCode: 200,
            status: "success",
            message: "Project updated successfully",
            data: updatedProject,
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
