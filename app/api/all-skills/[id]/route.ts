import { connectDB } from "@/lib/db";
import { apiResponse } from "@/lib/apiResponseBackend";
import { allSkills } from "@/models/allSkills/allSkill";
import { NextRequest } from "next/server";

type RouteParams = {
    params: Promise<{ id: string }>;
};

export async function DELETE(req: NextRequest, { params }: RouteParams) {
    try {
        await connectDB();
        const { id } = await params;

        const deleteSkill = await allSkills.findByIdAndDelete(id);

        if (!deleteSkill) {
            return apiResponse({ statusCode: 404, status: "fail", message: "Skill not found", data: null })
        }
        return apiResponse({ statusCode: 200, status: "success", message: "Skill deleted successfully", data: null });
    } catch (error: any) {
        return apiResponse({ statusCode: 500, status: "error", message: error.message, data: null });
    }

}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
    try {
        await connectDB();

        const { id } = await params;


        console.log("Updating Skill with ID:", id);

        const body = await req.json();

        const updatedSkill = await allSkills.findByIdAndUpdate(
            id,
            { $set: body },
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