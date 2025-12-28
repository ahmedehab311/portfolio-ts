import { connectDB } from "@/lib/db";
import { Project } from "@/models/projects";

export default async function getProjects() {
  await connectDB();

  const projects = await Project.find({})
    .select(
      "title shortDescription fullDescription mainImage gallery features challenges techStack tags category projectStatus codeUrl demoUrl order"
    )
    .sort({ order: 1 })
    .lean();

  // تحويل _id من ObjectId إلى string
  const cleanProjects = projects.map(project => ({
    ...project,
    _id: project._id.toString(),
  }));

  return cleanProjects;
}
