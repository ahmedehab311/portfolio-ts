import { connectDB } from "@/lib/db";
import { Project } from "@/models/projects";
import { ProjectCategory } from "@/app/constants/project";
import { apiResponse } from "@/lib/apiResponseBackend";
import { NextRequest, NextResponse } from "next/server";
import { projectSchema } from "../validators/project.schema";
import cloudinary from "@/lib/cloudinary";
import streamifier from "streamifier";
import { vaildateApiKey } from "@/lib/auth";
export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id"); // لو باعت ID هات المشروع كامل

        const projects = await Project.find({ deletedAt: null })
            .select("-challenges -features -gallery -fullDescription -__v -createdAt  -updatedAt -tags") // شيل دول مؤقتاً عشان الريسبونس يصغر
            .sort({ order: 1 });

        return apiResponse({ statusCode: 200, status: "success", message: "projects fetched successfully", data: projects })
    } catch (error: any) {
        return apiResponse({ statusCode: 500, status: "error", message: `${error.message} || projects fetched successfully`, data: null })
    }
}


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const isValid = await vaildateApiKey();

        if (!isValid) {
            return NextResponse.json(
                { error: 'Unauthorized: Invalid Secret Key' },
                { status: 401 }
            );
        }
        const formData = await req.formData();

        // 1. استخراج الملفات من الـ FormData
        const imageFile = formData.get("image") as Blob | null;
        const galleryFiles = formData.getAll("gallery") as Blob[];

        // دالة الرفع إلى Cloudinary
        const uploadToCloudinary = async (file: Blob, folder: string) => {
            const buffer = Buffer.from(await file.arrayBuffer());
            return new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder },
                    (error, result) => (error ? reject(error) : resolve(result))
                );
                streamifier.createReadStream(buffer).pipe(uploadStream);
            });
        };

        let mainImageUrl = undefined;
        // لا يتم الرفع إلا إذا كان هناك ملف فعلي وحجمه أكبر من صفر
        if (imageFile && imageFile.size > 0) {
            const mainUpload = await uploadToCloudinary(imageFile, "portfolio-projects");
            mainImageUrl = mainUpload.secure_url;
        }

        const galleryUrls: string[] = [];
        // التأكد من وجود ملفات في المعرض وأنها ليست ملفات فارغة
        if (galleryFiles.length > 0 && galleryFiles[0].size > 0) {
            const uploadPromises = galleryFiles
                .filter(file => file.size > 0)
                .map(file => uploadToCloudinary(file, "project-gallery"));
            const results = await Promise.all(uploadPromises);
            galleryUrls.push(...results.map(r => r.secure_url));
        }

        // 2. تجميع البيانات النصية
        const fields: any = {};
        formData.forEach((value, key) => {
            if (key !== "image" && key !== "gallery") fields[key] = value;
        });

        const parseArrayField = (field: any) => {
            try { return field ? JSON.parse(field) : []; }
            catch { return []; }
        };

        // 3. بناء كائن المشروع للتحقق منه بواسطة Zod
        const projectData = {
            title: fields.title,
            shortDescription: fields.shortDescription,
            fullDescription: fields.fullDescription,
            category: fields.category,
            projectStatus: fields.projectStatus,
            mainImage: mainImageUrl, // سيكون undefined إذا لم يتم رفع صورة، وهذا يتوافق مع .optional() في Zod
            gallery: galleryUrls,
            codeUrl: fields.codeUrl,
            demoUrl: fields.demoUrl,
            order: Number(fields.order) || 0,
            tags: parseArrayField(fields.tags),
            features: parseArrayField(fields.features),
            challenges: parseArrayField(fields.challenges),
            techStack: parseArrayField(fields.techStack),
        };

        const validation = projectSchema.safeParse(projectData);

        if (!validation.success) {
            const errorMessage = validation.error.issues
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join(" | ");

            return apiResponse({
                statusCode: 400,
                status: "fail",
                message: errorMessage,
                data: validation.error.format()
            });
        }

        // 4. الحفظ في قاعدة البيانات
        // ملاحظة: نستخدم validation.data لضمان نظافة البيانات
        const project = await Project.create(validation.data);

        return apiResponse({
            statusCode: 201,
            status: "success",
            message: "Project created successfully",
            data: project,
        });

    } catch (error: any) {
        console.error("POST ERROR:", error);
        return apiResponse({
            statusCode: 500,
            status: "error",
            message: error.message || "Internal server error",
            data: null,
        });
    }
}