// components/heroSection/skillsHeroServer.ts
import mongoose from "mongoose";
import Skill, { TSkills } from "@/models/Skill"; // المسار حسب مشروعك
import { connectDB } from "@/lib/db"; // لو عندك function للاتصال بالDB

export async function getSkillsHero(): Promise<TSkills[]> {
    await connectDB(); // نتأكد إن الاتصال بالDB مفتوح
    const skills = await Skill.find({}).lean(); // .lean() لجلب object عادي بدل Mongoose document

    // تحويل _id لـ string
    return skills.map(skill => ({
        ...skill,
        _id: skill._id.toString(),
    }));
}
