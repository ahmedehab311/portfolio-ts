import HeroSection from "./components/heroSection/heroSection";
import Header from "./components/partials/header/header";
import ProjectsSection from "./components/projects/ProjectsSection.client";
import { getProjects } from "./components/projects/ProjectCardServer";
import { getSkillsHero } from "./components/heroSection/skillsHeroServer";
import AllSkillsSection from "./components/allSkillsSection/allSkillsSection";
import getAllSkills from "./components/allSkillsSection/allSkillsServer";
import ExperienceSection from "./components/experienceSection/experienceSection";
import getExperience from "./components/experienceSection/experienceSectionServer";
import ContactSection from "./components/contactSection/contactSection";
export const dynamic = "force-dynamic";
export default async function Home() {
  const projects = await getProjects();
  const skills = await getSkillsHero();
  const allSkillsData = await getAllSkills();
  const experiences = await getExperience();
  // const experiences = [
  //   {
  //     company: "OtherLogic",
  //     role: "Lead Frontend Developer",
  //     startDate: "July 2023",
  //     endDate: "Present",
  //     description: [
  //       "Solely responsible for architecting and developing full-scale web applications from scratch.",
  //       "Developed a comprehensive ordering system for Chili's restaurant, including complex checkout logic and payment gateway integration.",
  //       "Optimized enterprise dashboards handling 1000+ data items, ensuring high performance using Next.js.",
  //       "Migrated legacy UI patterns to modern frameworks like Tailwind CSS for better maintainability."
  //     ],
  //     technologies: ["Next.js", "React", "TypeScript", "Tailwind", "MUI", "Redux"],
  //   },
  // ];
  return (
    <>
      <div
        className="bg-linear-to-br  dark:from-gray-900 dark:via-blue-900  dark:to-gray-900  from-blue-50 via-blue-100 to-white px-4 md:px-8 lg:px-16 py-12 transition-all duration-300">
        <Header />
        <section id="home">    <HeroSection skills={skills} /></section>
        <section id="projects">  <ProjectsSection projects={projects} /></section>
        <section id="skills">  <AllSkillsSection skills={allSkillsData} /></section>
        <section id="experience">  <ExperienceSection experiences={experiences} /></section>
        <section id="contact">  <ContactSection /></section>

      </div>
    </>
  );
}