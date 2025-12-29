"use client";
import { useState } from "react";
import { ProjectCategory } from "@/app/constants/project";
import ProjectCard from "./ProjectCard";
import { TProjectSchema } from "@/types/back/project";
import { motion, AnimatePresence, Variants } from "framer-motion";
import HeaderComponents from "../headerComponents";
import ProjectDetailsModal from "./ProjectDetailsModal";
type Project = {
    _id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    mainImage: string;
    gallery: string[];
    features: string[];
    challenges: string[];
    techStack: string[];
    tags: string[];
    category: string;
    projectStatus: string;
    codeUrl: string;
    demoUrl: string;
    order: number;
    createdAt?: string;
    updatedAt?: string;
};

type ProjectsSectionProps = {
    projects: Project[];
};
export default function ProjectsSection({ projects }: ProjectsSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState(
        ProjectCategory.ALL
    );

    const [selectedTag, setSelectedTag] = useState("All Tags");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const filteredProjects = projects.filter(project => {
        const categoryMatch =
            selectedCategory === ProjectCategory.ALL ||
            project.category === selectedCategory;

        const tagMatch =
            selectedTag === "All Tags" || project.tags.includes(selectedTag);

        return categoryMatch && tagMatch;
    });

    const categories = [
        ProjectCategory.ALL,
        ...Array.from(new Set(projects.map(p => p.category))),
    ];
    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1, // ده بيعمل تأثير إن الكروت بتظهر ورا بعضها
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };
    const handleOpenDetails = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };
    return (
        <section id="projects" className="py-20 scroll-mt-20">
            <div className="mb-12 text-center">
                <HeaderComponents
                    leftText="Featured"
                    rightText="Projects"
                    description="A collection of web applications where design meets functional logic, built to solve real-world problems."
                />
                <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat;

                        return (
                            <motion.button
                                key={cat}
                                onClick={() => setSelectedCategory(cat as ProjectCategory)}
                                // Hover & Tap Effects
                                whileHover={{ y: -2, scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative px-6 py-2.5 rounded-xl font-medium transition-colors duration-300 cursor-pointer overflow-hidden ${isActive ? "text-white" : "card-glass hover:text-primary"
                                    }`}
                            >
                                {/* نص الزرار */}
                                <span className="relative z-10">
                                    {cat === ProjectCategory.ALL ? "All Projects" : cat}
                                </span>

                                {/* الحركة الانسيابية للخلفية (The Magic) */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab" // ده بيخلي الخلفية تتزحلق بين الزراير
                                        className="absolute inset-0 bg-gradient-button-primary shadow-lg shadow-blue-500/20"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>


            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project._id}
                            layout
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <ProjectCard project={project} onOpenDetails={() => handleOpenDetails(project)} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
            <ProjectDetailsModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section >
    );
}
