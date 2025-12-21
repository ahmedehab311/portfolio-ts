import HeroSection from "./components/heroSection/heroSection";
import Header from "./components/partials/header/header";
import ProjectsSection from "./components/projects/ProjectsSection.client";
import { getProjects } from "./components/projects/ProjectCardServer";
export const dynamic = "force-dynamic";
export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <div
        className="bg-linear-to-br  dark:from-gray-900 dark:via-blue-900  dark:to-gray-900  from-blue-50 via-blue-100 to-white px-4 md:px-8 lg:px-16 py-12 transition-all duration-300">
        <Header />
        <HeroSection />
        <ProjectsSection projects={projects} />
      </div>
    </>
  );
}