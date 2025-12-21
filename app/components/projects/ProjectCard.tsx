import { ExternalLink, Github } from "lucide-react";
export default function ProjectCard({ project }: any) {
    return (
        <div className="card-glass rounded-xl overflow-hidden border border-light-custom hover:border-custom transition-all duration-300 hover:shadow-xl group">
            {/* صورة المشروع */}
            <div className="relative h-48 md:h-56 overflow-hidden bg-linear-to-br from-blue-100/20 to-cyan-100/20 dark:from-blue-900/20 dark:to-cyan-900/20">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />

                {/* Tags Overlay */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map((tag: any) => (
                        <span
                            key={tag}
                            className="dark:badge-primary bg-second font-bold px-2 py-1 rounded-md text-xs font-"
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
    )
}
