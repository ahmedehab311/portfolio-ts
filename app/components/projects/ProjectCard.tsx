import { ExternalLink, Github, Layers, Info, Cpu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function ProjectCard({ project, onOpenDetails }: any) {
    return (
        <div className="card-glass rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 group h-full flex flex-col relative">

            <button
                onClick={onOpenDetails}
                className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white dark:text-white transition-colors cursor-pointer"
                title="View Details"
            >
                <Info size={18} />
            </button>


            <div className="relative aspect-16/8 w-full overflow-hidden rounded-t-2xl">
                {project.mainImage ? (
                    <Image
                        src={project.mainImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    // ده الـ Placeholder اللي هيظهر لو مفيش صورة
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-gray-900 via-blue-900 to-black p-4">
                        <div className="opacity-20 absolute inset-0 overflow-hidden">
                            {/* خلفية بشكل كود وهمي لإعطاء شكل تقني */}
                            <pre className="text-[6px] text-blue-400 leading-tight">
                                {`
                        function DashboardCore() {
                            const [data, setData] = useState(null);
                            useEffect(() => {
                                fetch('/api/v1/restaurant-erp')
                                .then(res => res.json())
                            }, [])
                            return <SystemLogic />
                        }
                    `}
                            </pre>
                        </div>
                        <Cpu size={40} className="text-blue-500/50 mb-2" />
                        <span className="text-blue-400/70 text-[10px] font-mono tracking-tighter uppercase">
                            Proprietary Enterprise System
                        </span>
                    </div>
                )}

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-70" />

                <div className="absolute top-2.5 right-2.5">
                    <span className="bg-blue-600/80 backdrop-blur-md text-white text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border border-white/10 shadow-lg">
                        {(project.category === "Full Stack" || project.category === "nextjs") ? "Next.js" : "React.js"}
                    </span>
                </div>

                {/* <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <div className="flex flex-wrap justify-between gap-1">
                        {project.tags.slice(0, 2).map((tag: any) => (
                            <span key={tag} className="bg-white/10 backdrop-blur-md text-white/90 text-[8px] px-1.5 py-0.5 rounded-md border border-white/5">
                                {tag}
                            </span>
                        ))}
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-tighter border ${project.projectStatus === "completed"
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                            }`}>
                            {project.projectStatus}
                        </span>
                    </div>
                    {project.tags.length > 2 && (
                        <span className="text-[8px] text-white/50">+{project.tags.length - 4}</span>
                    )}
                </div> */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    {/* 1. مجموعة الـ Tags على اليسار */}
                    <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 2).map((tag: any) => (
                            <span key={tag} className="bg-white/10 backdrop-blur-md text-white/90 text-[8px] px-1.5 py-0.5 rounded-md border border-white/5">
                                {tag}
                            </span>
                        ))}
                        {project.tags.length > 2 && (
                            <span className="text-[8px] text-white/50 self-center">+{project.tags.length - 2}</span>
                        )}
                    </div>

                    {/* 2. الـ Status على اليمين */}
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-tighter border backdrop-blur-md ${project.projectStatus === "completed"
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                        }`}>
                        {project.projectStatus}
                    </span>
                </div>
            </div>


            <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>


                </div>

                <p className="text-gray-400 text-sm line-clamp-2 mb-6">
                    {project.shortDescription}
                </p>


                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
                    <Link
                        href={project.codeUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 px-3  border border-black/10 backdrop-blur-md hover:border-primary/50 text-xs font-medium transition-all"
                    >
                        <Github size={14} /> Code
                    </Link>
                    <Link
                        href={project.demoUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-button-primary text-white text-xs font-medium transition-all shadow-lg shadow-primary/20"
                    >
                        <ExternalLink size={14} /> Demo
                    </Link>
                </div>
            </div>
        </div>
    )
}
