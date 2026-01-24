"use client";
import { useState } from "react";
import { ProjectCategory } from "@/app/constants/project";
import ProjectCard from "./ProjectCard";
import { motion, AnimatePresence, Variants } from "framer-motion";
import HeaderComponents from "../headerComponents";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { useProjects } from "@/hooks/useProjects";
import { ProjectSkeleton } from "../skeltons/ProjectSkeleton";
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


export default function ProjectsSection() {
    const { data: projects = [], isLoading, isError } = useProjects();

    const [selectedCategory, setSelectedCategory] = useState(ProjectCategory.ALL);
    const [selectedId, setSelectedId] = useState<string | null>(null);
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
        hidden: { opacity: 0, y: 20 }, // تقليل المسافة من 30 لـ 20 أخف في المعالجة
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05, // تقليل التأخير لسرعة الاستجابة
                duration: 0.4,
                ease: "easeOut"
            }
        })
    };
    const handleOpenDetails = (project: Project) => {
        setSelectedId(project._id);
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

                    <div className="flex flex-wrap gap-3 justify-center">
                        {isLoading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div
                                    key={`cat-skeleton-${i}`}
                                    className="w-24 h-10 rounded-xl bg-gray-200 dark:bg-white/5 animate-pulse"
                                />
                            ))
                        ) : (
                            categories.map((cat) => {
                                const isActive = selectedCategory === cat;
                                return (
                                    <motion.button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat as ProjectCategory)}
                                        whileHover={{ y: -2, scale: 1.02 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`relative px-6 py-2.5 rounded-xl font-medium transition-colors duration-300 cursor-pointer overflow-hidden ${isActive ? "text-white" : "card-glass hover:text-primary"
                                            }`}
                                    >
                                        <span className="relative z-10 capitalize">
                                            {cat === ProjectCategory.ALL ? "All Projects" : cat}
                                        </span>

                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-gradient-button-primary shadow-lg shadow-blue-500/20"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </motion.button>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>


            <motion.div

                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {/* <AnimatePresence mode="popLayout"> */}
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <ProjectSkeleton key={`skeleton-${i}`} />
                    ))
                ) : (
                    filteredProjects.map((project, index) => (
                        <motion.div
                            key={project._id}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <ProjectCard project={project} onOpenDetails={() => handleOpenDetails(project)} />
                        </motion.div>
                    ))
                )}
                {/* </AnimatePresence> */}
            </motion.div>
            <ProjectDetailsModal
                projectId={selectedId}
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section >
    );
}
