import { connectDB } from "@/lib/db";
import { apiResponse } from "@/lib/apiResponseBackend";
import { allSkills } from "@/models/allSkills/allSkill";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();

        const resolvedParams = await params;
        const id = resolvedParams.id;

        const deleteSkill = await allSkills.findByIdAndDelete(id);

        if (!deleteSkill) {
            return apiResponse({ statusCode: 404, status: "fail", message: "Skill not found", data: null })
        }
        return apiResponse({ statusCode: 200, status: "success", message: "Skill deleted successfully", data: null });
    } catch (error: any) {
        return apiResponse({ statusCode: 500, status: "error", message: error.message, data: null });
    }

}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> | any }) {
    try {
        await connectDB();

        // 1. فك الـ params باستخدام await (مهم جداً للنسخ الجديدة)
        const resolvedParams = await params;
        const id = resolvedParams.id;

        console.log("Updating Skill with ID:", id); // اتأكد في الـ terminal إن الـ ID مطبوع صح

        const body = await req.json();

        // 2. استخدم findByIdAndUpdate
        const updatedSkill = await allSkills.findByIdAndUpdate(
            id,
            { $set: body }, // استخدم $set للتعديل الجزئي
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedSkill) {
            console.log("No skill found with this ID in DB");
            return apiResponse({ statusCode: 404, status: "error", message: "Skill not found in database", data: null });
        }

        return apiResponse({ statusCode: 200, status: "success", message: "Skill updated successfully", data: updatedSkill });

    } catch (error: any) {
        console.error("Patch Error:", error.message);
        return apiResponse({ statusCode: 500, status: "error", message: error.message, data: null });
    }
}