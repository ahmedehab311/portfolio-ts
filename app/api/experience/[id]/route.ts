import { connectDB } from "@/lib/db";
import { apiResponse } from "@/lib/apiResponseBackend";
import { Experience } from "@/models/experience/experience";
import { NextRequest } from "next/server";


type RouteParams = {
    params: Promise<{ id: string }>;
};
export async function DELETE(req: NextRequest, { params }: RouteParams) {
    try {
        await connectDB();

        const { id } = await params;

        const deleteExperience = await Experience.findByIdAndDelete(id);

        if (!deleteExperience) {
            return apiResponse({ statusCode: 404, status: "fail", message: "experience not found", data: null })
        }
        return apiResponse({ statusCode: 200, status: "success", message: "experience deleted successfully", data: null });
    } catch (error: any) {
        return apiResponse({ statusCode: 500, status: "error", message: error.message, data: null });
    }

}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
    try {
        await connectDB();

        const { id } = await params;

        const body = await req.json();

        const updatedExperience = await Experience.findByIdAndUpdate(
            id,
            { $set: body }, 
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedExperience) {
            console.log("No Experience found with this ID in DB");
            return apiResponse({ statusCode: 404, status: "error", message: "Experience not found in database", data: null });
        }

        return apiResponse({ statusCode: 200, status: "success", message: "Experience updated successfully", data: updatedExperience });

    } catch (error: any) {
        console.error("Patch Error:", error.message);
        return apiResponse({ statusCode: 500, status: "error", message: error.message, data: null });
    }
}