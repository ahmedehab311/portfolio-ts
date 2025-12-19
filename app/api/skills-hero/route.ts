import { connectDB } from "@/lib/db";
import { apiResponse } from "@/lib/apiResponseBackend";
import { SkillsHero } from "@/models/hero/skillsHero";

export async function GET() {

  try {
    await connectDB()
    const skills = await SkillsHero.find().sort({ order: 1 });

    if (!skills) {
      return new Response(
        JSON.stringify({ message: "No skills found" }),
        { status: 404 }
      );
    }

    // return Response.json(skills, { status: 200 })
    return apiResponse({ statusCode: 200, status: "success", message: "skills fetched successfully", data: skills })
  } catch (error: any) {
    return apiResponse({ statusCode: 500, status: "error", message: `${error.message} ||skills fetched successfully`, data: null })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, icon, color } = body;

    if (!name || !icon || !color) {
      return new Response(
        JSON.stringify({
          message: "name, icon and color are required",
        }),
        { status: 400 }
      );
    }
    const lastSkill = await SkillsHero.findOne().sort({ order: -1 });
    const nextOrder = lastSkill ? lastSkill.order + 1 : 1;
    const skill = await SkillsHero.create({
      name,
      icon,
      color,
      order: nextOrder
    });

    return new Response(
      JSON.stringify({
        message: "Skill created successfully",
        data: skill,
      }),
      { status: 201 }
    );
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