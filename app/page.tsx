import { getSkillsHero, getAllSkills, getExperience } from "./components/index";
import { Header, ProjectsSection, AllSkillsSection, ExperienceSection, ContactSection, HeroSection, Footer } from "./components/index";

export const dynamic = "force-dynamic";

export default async function Home() {
  const skills = await getSkillsHero();
  const allSkillsData = await getAllSkills();
  const experiences = await getExperience();
  return (
    <>
      <div
        className="bg-linear-to-br  dark:from-gray-900 dark:via-blue-900  dark:to-gray-900  from-blue-50 via-blue-100 to-white px-4 md:px-8 lg:px-16 py-12 transition-all duration-300">
        <Header />
        <section id="home">    <HeroSection skills={skills} /></section>
        <section id="projects">  <ProjectsSection /></section>
        <section id="skills">  <AllSkillsSection skills={allSkillsData} /></section>
        <section id="experience">  <ExperienceSection experiences={experiences} /></section>
        <section id="contact">  <ContactSection /></section>

      </div>
      <Footer />
    </>
  );
}