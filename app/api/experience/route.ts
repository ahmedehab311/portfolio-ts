import { connectDB } from "@/lib/db";
import { apiResponse } from "@/lib/apiResponseBackend";
import { Experience } from "@/models/experience/experience";


export async function GET() {
    try {
        await connectDB();
        const experience = await Experience.find().sort({ order: 1 });
        if (experience.length === 0) {

            return apiResponse({ statusCode: 404, status: "fail", message: "No experience found", data: [] })
        }
        return apiResponse({ statusCode: 200, status: "success", message: "experience fetched successfully", data: experience })
    } catch (error: any) {
        return apiResponse({ statusCode: 500, status: "error", message: `${error.message} ||experience fetched successfully`, data: null })
    }

}
export async function POST(req: Request) {

    try {
        await connectDB();

        const body = await req.json();

        if (body.order === undefined) {
            const lastExperience = await Experience.findOne().sort({ order: -1 });
            body.order = lastExperience ? lastExperience.order + 1 : 1;
        }
        const newSExperience = await Experience.create(body)

        return apiResponse({
            statusCode: 201,
            status: "success",
            message: "Experience created successfully",
            data: newSExperience
        });
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                message: "Failed to create experience",
                error: error.message,
            }),
            { status: 500 }
        );
    }

}