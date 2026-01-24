import { ExternalLink, Github, Layers, Info, Cpu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Project {
    _id: string;
    title: string;
    shortDescription: string;
    mainImage: string;
    category: string;
    techStack: string[];
    projectStatus: string;
    codeUrl: string;
    demoUrl: string;
}
interface ProjectCardProps {
    project: Project;
    onOpenDetails: () => void;
    index: number;
}
export default function ProjectCard({ project, onOpenDetails, index }: ProjectCardProps) {
    return (
        <div className="card-glass rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 group h-full flex flex-col relative transform-gpu">

            <button
                onClick={onOpenDetails}
                className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/60 border border-white/10 text-white transition-all hover:bg-primary cursor-pointer shadow-xl"
                title="View Details"
            >
                <Info size={18} />
            </button>


            <div className="relative aspect-16/8 w-full overflow-hidden rounded-t-2xl bg-slate-900">
                {project.mainImage ? (
                    <Image
                        src={project.mainImage}
                        alt={project.title}
                        fill
                        priority={index < 3}
                        loading={index < 3 ? undefined : "lazy"}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-gray-900 via-blue-900 to-black p-4">
                        <Cpu size={40} className="text-blue-500/30 mb-2" />
                        <span className="text-blue-400/50 text-[10px] font-mono uppercase">Proprietary System</span>
                    </div>
                )}


                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80" />


                <div className="absolute top-2.5 right-2.5">
                    <span className="bg-blue-600/90 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg shadow-lg">
                        {project.category}
                    </span>
                </div>


                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
                        {project.techStack.slice(0, 3).map((tag: string) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md bg-black/50 border border-white/5 text-white/90 text-[9px] font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center shrink-0">
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase border ${project.projectStatus === "completed"
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            }`}>
                            <span className={`w-1 h-1 rounded-full ${project.projectStatus === "completed" ? "bg-emerald-400 animate-pulse" : "bg-blue-400"}`} />
                            {project.projectStatus}
                        </span>
                    </div>
                </div>
            </div>


            <div className="p-6 flex flex-col grow bg-transparent">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-6 leading-relaxed">
                    {project.shortDescription}
                </p>

                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
                    <Link
                        href={project.codeUrl || "#"}
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-black hover:bg-white/6 text-xs font-medium transition-all"
                    >
                        <Github size={14} /> Code
                    </Link>
                    <Link
                        href={project.demoUrl || "#"}
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-all shadow-lg shadow-blue-900/20"
                    >
                        <ExternalLink size={14} /> Demo
                    </Link>
                </div>
            </div>
        </div>
    );
}