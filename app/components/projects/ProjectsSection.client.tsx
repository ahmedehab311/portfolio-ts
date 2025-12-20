"use client";
import { useState } from "react";
import { ProjectCategory } from "@/app/constants/project";
import ProjectCard from "./ProjectCard";
import { TProjectSchema } from "@/types/back/project";
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
        <section className="my-8">
            {/* العنوان */}
            <div className="mb-10 text-center">
                <h2 className="mb-6">
                    My <span className="text-gradient-blue-cyan">Projects</span>
                </h2>

                <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat as ProjectCategory)}
                            className={`px-4 py-2 rounded-lg transition ${selectedCategory === cat
                                ? "bg-gradient-button-primary"
                                : "card-glass"
                                }`}
                        >
                            {cat === ProjectCategory.ALL ? "All Projects" : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* الكروت */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>
        </section>
    );
}
