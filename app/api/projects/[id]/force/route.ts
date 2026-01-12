import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Project } from "@/models/projects";
import { apiResponse } from "@/lib/apiResponseBackend";
import { vaildateApiKey } from "@/lib/auth";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const isValid = await vaildateApiKey();

        if (!isValid) {
            return NextResponse.json(
                { error: 'Unauthorized: Invalid Secret Key' },
                { status: 401 }
            );
        }

        const { id } = await params;

        // 3. كدة الـ id هيكون موجود فعلاً ومش هيدخل في الـ throw Error
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