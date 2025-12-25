import { connectDB } from "@/lib/db";
import { apiResponse } from "@/lib/apiResponseBackend";
// import { SkillsHero } from "@/models/hero/skillsHero";
import { allSkills } from "@/models/allSkills/allSkill";


export async function GET() {
    try {
        await connectDB();
        const skills = await allSkills.find().sort({ order: 1 });
        if (skills.length === 0) {

            return apiResponse({ statusCode: 404, status: "fail", message: "No skills found", data: [] })
        }
        return apiResponse({ statusCode: 200, status: "success", message: "skills fetched successfully", data: skills })
    } catch (error: any) {
        return apiResponse({ statusCode: 500, status: "error", message: `${error.message} ||skills fetched successfully`, data: null })
    }

}

export async function POST(req: Request) {

    try {
        await connectDB();

        const body = await req.json();

        if (body.order === undefined) {
            const lastSkill = await allSkills.findOne().sort({ order: -1 });
            body.order = lastSkill ? lastSkill.order + 1 : 1;
        }
        const newSKill = await allSkills.create(body)

        return apiResponse({
            statusCode: 201,
            status: "success",
            message: "Skill created successfully",
            data: newSKill
        });
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                message: "Failed to create skill",
                error: error.message,
            }),
            { status: 500 }
        );
    }

}