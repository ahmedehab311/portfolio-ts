import { ExternalLink, Github, Layers, Info, Cpu } from "lucide-react"; // ضفنا Cpu و Info
import { motion } from "framer-motion";
export default function ProjectCard({ project, onOpenDetails }: any) {
    return (
        <div className="card-glass rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 group h-full flex flex-col relative">

            <button
                onClick={onOpenDetails} // دي اللي جاية كـ Prop من الأب
                className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white dark:text-white transition-colors cursor-pointer"
                title="View Details"
            >
                <Info size={18} />
            </button>


            <div className="relative h-52 overflow-hidden">
                <img src={project.mainImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />


                <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] font-bold uppercase tracking-tighter px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
                        <Cpu size={12} />

                        {project.category === "Full Stack" ? "Next.js" : "React.js"}
                    </span>
                </div>


                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag: any) => (
                        <span key={tag} className="bg-black/60 backdrop-blur-md text-white/90 text-[9px] font-medium px-2 py-1 rounded border border-white/10">
                            {tag}
                        </span>
                    ))}
                    {project.tags.length > 3 && (
                        <span className="text-[9px] text-white/50 self-center">+{project.tags.length - 3} more</span>
                    )}
                </div>
            </div>


            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                </div>

                <p className="text-gray-400 text-sm line-clamp-2 mb-6">
                    {project.shortDescription}
                </p>


                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
                    <a href={project.codeUrl} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-/5 border-white/10 hover:border-primary/50 border border-/10 text-xs font-medium transition-all">
                        <Github size={14} /> Code
                    </a>
                    <a href={project.demoUrl} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-button-primary text-white text-xs font-medium transition-all shadow-lg shadow-primary/20">
                        <ExternalLink size={14} /> Demo
                    </a>
                </div>
            </div>
        </div>
    )
}
