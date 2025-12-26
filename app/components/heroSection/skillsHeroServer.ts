// import Skill, { TSkills } from "@/models/Skill"; // المسار حسب مشروعك
// import { connectDB } from "@/lib/db"; // لو عندك function للاتصال بالDB

// export async function getSkillsHero(): Promise<TSkills[]> {
//     await connectDB(); // نتأكد إن الاتصال بالDB مفتوح
//     const skills = await Skill.find({}).lean(); // .lean() لجلب object عادي بدل Mongoose document

//     // تحويل _id لـ string
//     return skills.map(skill => ({
//         ...skill,
//         _id: skill._id.toString(),
//     }));
// }
import { SkillsHero } from "@/models/hero/skillsHero";
import { connectDB } from "@/lib/db";

export interface LeanSkill {
    _id: string;
    name: string;
    icon?: string;
    color: string;
    order?: number;
}
export default async function getSkillsHero(): Promise<LeanSkill[]> {
    await connectDB();

    const skills = await SkillsHero.find({}).lean()

    return skills.map(skill => ({
        _id: skill._id.toString(),
        name: skill.name,
        icon: skill.icon,
        color: skill.color,
        order: skill.order,
    }));
}