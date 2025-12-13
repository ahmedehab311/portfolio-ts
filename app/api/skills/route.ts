import { connectDB } from "@/lib/db";
import Skill from "@/models/Skill";

export async function GET() {

    try {
        await connectDB()
        const skills = await Skill.find()
        return new Response(JSON.stringify(skills), { status: 200 })
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}