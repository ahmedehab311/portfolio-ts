"use client";

import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { ProjectCategory } from "@/app/constants/project";
import ProjectCardSkeleton from "../skeltons/ProjectCardSkeleton";

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

export default function ProjectsSection() {
    const { data: projectsData = [], isLoading, isError } = useProjects();

    const [selectedCategory, setSelectedCategory] = useState<string>(ProjectCategory.ALL);
    const [selectedTag, setSelectedTag] = useState<string>("All Tags");

    const filteredProjects = projectsData.filter(project => {
        const categoryMatch = selectedCategory === ProjectCategory.ALL || project.category === selectedCategory;
        const tagMatch = selectedTag === "All Tags" || project.tags.includes(selectedTag);
        return categoryMatch && tagMatch;
    });

    // Categories buttons
    const categories = [
        ProjectCategory.ALL,
        ...Array.from(
            new Set(projectsData.map(project => project.category))
        )
    ];


    return (
        <section className="page- my-8">
            {/* العنوان */}
            <div className="mb-10 md:mb-16 text-center">
                <h2 className="mb-6">
                    My <span className="text-gradient-blue-cyan">Projects</span>
                </h2>

                {/* فلتر الكاتيجوري */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-4 justify-center">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-lg text-sm md:text-base transition-all duration-300 cursor-pointer ${selectedCategory === cat
                                ? "bg-gradient-button-primary shadow-lg"
                                : "card-glass hover:text-primary"
                                }`}
                        >
                            {cat === ProjectCategory.ALL ? "All Projects" : cat.toUpperCase()}
                        </button>
                    ))}
                </div>


            </div>

  
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <ProjectCardSkeleton key={i} />
                    ))
                    : filteredProjects.map(project => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
            </div>

        </section>
    );
}

// مكون كارت المشروع
function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="card-glass rounded-xl overflow-hidden border border-light-custom hover:border-custom transition-all duration-300 hover:shadow-xl group">
            {/* صورة المشروع */}
            <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-blue-100/20 to-cyan-100/20 dark:from-blue-900/20 dark:to-cyan-900/20">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />

                {/* Tags Overlay */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map((tag) => (
                        <span
                            key={tag}
                            className="badge-primar bg-second font-bold px-2 py-1 rounded-md text-xs font-"
                        >
                            {tag}
                        </span>
                    ))}
                    {project.tags.length > 2 && (
                        <span className="badge-primary px-2 py-1 rounded-md text-xs font-medium">
                            +{project.tags.length - 2}
                        </span>
                    )}
                </div>
            </div>

            {/* محتوى الكارت */}
            <div className="p-5 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text transition-colors">
                    {project.title}
                </h3>

                <p className="text-sm md:text-base mb-4 md:mb-6 line-clamp-3">
                    {project.description}
                </p>

                {/* الروابط */}
                <div className="flex items-center justify-between pt-4 border-t border-light-custom">
                    <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary hover:bg-gradient-button-primary hover:text-white hover:border-transparent"
                    >
                        <Github size={18} />
                        <span className="text-sm md:text-base ml-1">Code</span>
                    </a>

                    <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary hover:bg-gradient-button-primary hover:text-white hover:border-transparent"
                    >
                        <ExternalLink size={18} />
                        <span className="text-sm md:text-base ml-1">Live Demo</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
// function ProjectCard({ project }: { project: Project }) {
//     return (
//         <div className="card-glass rounded-xl overflow-hidden border border-light-custom hover:border-custom transition-all duration-300 hover:shadow-xl group">
//             {/* صورة المشروع */}
//             <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-blue-100/20 to-cyan-100/20 dark:from-blue-900/20 dark:to-cyan-900/20">
//                 {/* هنا تستبدل بالصورة الفعلية */}
//                 <div className="w-full h-full flex items-center justify-center">
//                     <div className="text-4xl font-bold text-gradient-blue-cyan opacity-20">
//                         {project.title.charAt(0)}
//                     </div>
//                 </div>

//                 {/* Tags Overlay */}
//                 <div className="absolute top-4 left-4 flex flex-wrap gap-2">
//                     {project.tags.slice(0, 2).map((tag) => (
//                         <span
//                             key={tag}
//                             className="badge-primary px-2 py-1 rounded-md text-xs font-medium"
//                         >
//                             {tag}
//                         </span>
//                     ))}
//                     {project.tags.length > 2 && (
//                         <span className="badge-primary px-2 py-1 rounded-md text-xs font-medium">
//                             +{project.tags.length - 2}
//                         </span>
//                     )}
//                 </div>
//             </div>

//             {/* محتوى الكارت */}
//             <div className="p-5 md:p-6">
//                 <h3 className="text-xl md:text-2xl font-bold t mb-3 group-hover:text transition-colors">
//                     {project.title}
//                 </h3>

//                 <p className=" text-sm md:text-base mb-4 md:mb-6 line-clamp-3">
//                     {project.description}
//                 </p>

//                 {/* الروابط */}
//                 <div className="flex items-center justify-between pt-4 border-t border-light-custom">
//                     <a
//                         href={project.codeUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="btn-primary hover:bg-gradient-button-primary hover:text-white hover:border-transparent"
//                     >
//                         <Github size={18} />
//                         <span className="text-sm md:text-base">Code</span>
//                     </a>

//                     <a
//                         href={project.demoUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="btn-primary hover:bg-gradient-button-primary hover:text-white hover:border-transparent"
//                     >
//                         <ExternalLink size={18} />
//                         <span className="text-sm md:text-base">Live Demo</span>
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// }