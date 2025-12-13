import { connectDB } from "@/lib/db";
import skillsHero from "@/models/hero/skillsHero";

export async function GET() {

    try {
        await connectDB()
        const skills = await skillsHero.find()

        if (!skills) {
            return new Response(
                JSON.stringify({ message: "No skills found" }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify(skills), { status: 200 })
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
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

    const skill = await skillsHero.create({
      name,
      icon,
      color,
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