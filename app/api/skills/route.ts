import { apiResponse } from "@/lib/apiResponseBackend";
import { connectDB } from "@/lib/db";
import Skill from "@/models/Skill";

export async function GET() {

    try {
        await connectDB()
        const skills = await Skill.find()
        return apiResponse({ statusCode: 200, status: "success", message: "skills fetched successfully", data: skills })
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}