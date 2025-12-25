import { connectDB } from "@/lib/db";
import { allSkills } from "@/models/allSkills/allSkill";
export default async function getAllSkills() {

    await connectDB();

    const skills = await allSkills.find().sort({ order: 1 })
    
    return JSON.parse(JSON.stringify(skills));

}


