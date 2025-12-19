import { connectDB } from "@/lib/db";
import { Project } from "@/models/projects";
import { ProjectCategory } from "@/app/constants/project";
import { apiResponse } from "@/lib/apiResponseBackend";
import { NextRequest } from "next/server";
import { projectSchema } from "../validators/project.schema";
import cloudinary from "@/lib/cloudinary";
import streamifier from "streamifier";
export const config = {
    api: { bodyParser: false },
};
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

// export async function POST(req: NextRequest) {
//     try {
//         await connectDB();
//         const data = await parseFormData(req);

//         // رفع الصورة على Cloudinary
//         const result = await cloudinary.uploader.upload(data.image.filepath, {
//             folder: "portfolio-projects",
//         });

//         // دمج البيانات النصية + URL الصورة
//         const projectData = {
//             ...data.fields,
//             image: result.secure_url,
//             order: Number(data.fields.order),
//         };

//         // Validation باستخدام Zod
//         const validatedData = projectSchema.parse(projectData);

//         const project = await Project.create(validatedData);

//         return apiResponse({
//             statusCode: 201,
//             status: "success",
//             message: "Project created successfully",
//             data: project,
//         });
//     } catch (error: any) {
//         if (error.name === "ZodError") {
//             return apiResponse({
//                 statusCode: 400,
//                 status: "error",
//                 message: error.errors[0].message,
//                 data: null,
//             });
//         }

//         return apiResponse({
//             statusCode: 500,
//             status: "error",
//             message: error.message,
//             data: null,
//         });
//     }
// }
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
        formData.forEach((value, key) => {
            if (key !== "image") fields[key] = value;
        });
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

        // دمج البيانات مع رابط الصورة
        const projectData = {
            title: fields.title,
            description: fields.description,
            category: fields.category,
            projectStatus: fields.projectStatus,
            image: imageUrl,       // <--- مهم جداً: الصورة موجودة كـ string URL قبل validation
            codeUrl: fields.codeUrl,
            demoUrl: fields.demoUrl,
            order: Number(fields.order),
        };

        // Validation باستخدام Zod
        const validatedData = projectSchema.parse(projectData);

        // حفظ المشروع في DB
        const project = await Project.create(validatedData);

        return apiResponse({
            statusCode: 201,
            status: "success",
            message: "Project created successfully",
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
