import { connectDB } from "@/lib/db";
import { Experience } from "@/models/experience/experience";
export default async function getExperience() {

    await connectDB();

    const experience = await Experience.find().sort({ order: 1 })

    return JSON.parse(JSON.stringify(experience));

}


