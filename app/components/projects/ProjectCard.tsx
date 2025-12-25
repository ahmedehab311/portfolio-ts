import { ExternalLink, Github, Layers, Info, Cpu } from "lucide-react"; // ضفنا Cpu و Info
import { motion } from "framer-motion";
export default function ProjectCard({ project }: any) {
    return (
        // <div className="card-glass rounded-xl overflow-hidden border border-light-custom hover:border-custom transition-all duration-300 hover:shadow-xl group">
        //     <div className="relative h-48 md:h-56 overflow-hidden bg-linear-to-br from-blue-100/20 to-cyan-100/20 dark:from-blue-900/20 dark:to-cyan-900/20">
        //         <img
        //             src={project.image}
        //             alt={project.title}
        //             className="w-full h-full object-cover"
        //         />

        //         <div className="absolute top-4 left-4 flex flex-wrap gap-2">
        //             {project.tags.slice(0, 2).map((tag: any) => (
        //                 <span
        //                     key={tag}
        //                     className="dark:badge-primary bg-second font-bold px-2 py-1 rounded-md text-xs font-"
        //                 >
        //                     {tag}
        //                 </span>
        //             ))}
        //             {project.tags.length > 2 && (
        //                 <span className="badge-primary px-2 py-1 rounded-md text-xs font-medium">
        //                     +{project.tags.length - 2}
        //                 </span>
        //             )}
        //         </div>
        //     </div>

        //     <div className="p-5 md:p-6">
        //         <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text transition-colors">
        //             {project.title}
        //         </h3>

        //         <p className="text-sm md:text-base mb-4 md:mb-6 line-clamp-3">
        //             {project.description}
        //         </p>


        //         <div className="flex items-center justify-between pt-4 border-t border-light-custom">
        //             <a
        //                 href={project.codeUrl}
        //                 target="_blank"
        //                 rel="noopener noreferrer"
        //                 className="btn-primary hover:bg-gradient-button-primary hover:text-white hover:border-transparent"
        //             >
        //                 <Github size={18} />
        //                 <span className="text-sm md:text-base ml-1">Code</span>
        //             </a>

        //             <a
        //                 href={project.demoUrl}
        //                 target="_blank"
        //                 rel="noopener noreferrer"
        //                 className="btn-primary hover:bg-gradient-button-primary hover:text-white hover:border-transparent"
        //             >
        //                 <ExternalLink size={18} />
        //                 <span className="text-sm md:text-base ml-1">Live Demo</span>
        //             </a>
        //         </div>
        //     </div>
        // </div>
        // <div className="card-glass rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 group h-full flex flex-col">
        //     {/* Image Section */}
        //     <div className="relative h-52 overflow-hidden">
        //         <Image
        //             width={500}
        //             height={300}
        //             src={project.image}
        //             alt={project.title}
        //             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        //         />

        //         {/* Fullstack/Category Badge - بيدي انطباع تقني قوي */}
        //         <div className="absolute top-4 right-4">
        //             <span className="bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5">
        //                 <Layers size={12} className="text" />
        //                 {project.category}
        //             </span>
        //         </div>

        //         {/* Tech Tags Overlay */}
        //         <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
        //             {project.tags.slice(0, 3).map((tag: any) => (
        //                 <span key={tag} className="bg-primary/90 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
        //                     {tag}
        //                 </span>
        //             ))}
        //         </div>
        //     </div>

        //     {/* Content Section */}
        //     <div className="p-6 flex flex-col flex-grow">
        //         <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
        //             {project.title}
        //         </h3>

        //         <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
        //             {project.description}
        //         </p>

        //         {/* Action Buttons - مساحة أكبر وشكل أنظف */}
        //         <div className="mt-auto flex items-center gap-4 pt-5 border-t border-white/5">
        //             {/* زرار الكود - ستايل الـ Border/Glass */}
        //             <motion.a
        //                 href={project.codeUrl}
        //                 target="_blank"
        //                 rel="noopener noreferrer"
        //                 whileHover={{ y: -3, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        //                 whileTap={{ scale: 0.95 }}
        //                 className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 transition-colors text-sm font-medium cursor-pointer"
        //             >
        //                 <Github size={16} className="group-hover:text-primary transition-colors" />
        //                 Code
        //             </motion.a>

        //             {/* زرار الديمو - ستايل الـ Gradient الخاص بك */}
        //             <motion.a
        //                 href={project.demoUrl}
        //                 target="_blank"
        //                 rel="noopener noreferrer"
        //                 whileHover={{
        //                     y: -3,
        //                     boxShadow: "0 10px 20px -10px rgba(59, 130, 246, 0.5)" // توهج خفيف متناسق مع لون الزرار
        //                 }}
        //                 whileTap={{ scale: 0.95 }}
        //                 className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-button-primary text-white text-sm font-medium cursor-pointer shadow-lg shadow-primary/20"
        //             >
        //                 <ExternalLink size={16} />
        //                 Demo
        //             </motion.a>
        //         </div>
        //     </div>
        // </div>
        <div className="card-glass rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 group h-full flex flex-col relative">

            <button
                // onClick={() => onOpenDetails(project)} // دي هتفتح المودال
                className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-primary transition-colors cursor-pointer"
                title="View Details"
            >
                <Info size={18} />
            </button>


            <div className="relative h-52 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />


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
                    {project.description}
                </p>

      
                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
                    <a href={project.codeUrl} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium transition-all">
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
