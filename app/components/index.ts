import Header from "./partials/header/header";
import HeroSection from "./heroSection/heroSection";
import ProjectsSection from "./projects/ProjectsSection.client";
import AllSkillsSection from "./allSkillsSection/allSkillsSection";
import ExperienceSection from "./experienceSection/experienceSection";
import ContactSection from "./contactSection/contactSection";
import Footer from "./partials/Footer/footer";


export {
    Header,
    HeroSection,
    ProjectsSection,
    AllSkillsSection,
    ExperienceSection,
    ContactSection,
    Footer
};


import getSkillsHero from "./heroSection/skillsHeroServer";
import getAllSkills from "./allSkillsSection/allSkillsServer";
import getExperience from "./experienceSection/experienceSectionServer";

export {
    getSkillsHero,
    getAllSkills,
    getExperience
}