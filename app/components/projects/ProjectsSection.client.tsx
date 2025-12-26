"use client";
import { useState } from "react";
import { ProjectCategory } from "@/app/constants/project";
import ProjectCard from "./ProjectCard";
import { TProjectSchema } from "@/types/back/project";
import { motion, AnimatePresence } from "framer-motion";
import HeaderComponents from "../headerComponents";
type Project = {
    _id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
    projectStatus: string;
    codeUrl: string;
    demoUrl: string;
    order: number;
};

// تعريف props للـ component
type ProjectsSectionProps = {
    projects: Project[];
};
export default function ProjectsSection({ projects }: ProjectsSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState(
        ProjectCategory.ALL
    );
    const [selectedTag, setSelectedTag] = useState("All Tags");

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

    return (
        // <section className="my-8">
        //     <div className="mb-10 text-center">
        //         <h2 className="mb-6">
        //             My <span className="text-gradient-blue-cyan">Projects</span>
        //         </h2>

        //         <div className="flex flex-wrap gap-3 justify-center">
        //             {categories.map(cat => (
        //                 <button
        //                     key={cat}
        //                     onClick={() => setSelectedCategory(cat as ProjectCategory)}
        //                     className={`px-4 py-2 rounded-lg transition ${selectedCategory === cat
        //                         ? "bg-gradient-button-primary"
        //                         : "card-glass"
        //                         }`}
        //                 >
        //                     {cat === ProjectCategory.ALL ? "All Projects" : cat}
        //                 </button>
        //             ))}
        //         </div>
        //     </div>

        //     {/* الكروت */}
        //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        //         {filteredProjects.map(project => (
        //             <ProjectCard key={project._id} project={project} />
        //         ))}
        //     </div>
        // </section>
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


            {/* Projects Grid with Animation */}
            <motion.div
                layout // دي بتخلي الكروت تتحرك لمكانها الجديد بنعومة
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section >
    );
}
