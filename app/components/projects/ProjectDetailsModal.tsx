"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, Github, CheckCircle2, Cpu, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { TProjects, useProjectDetails } from "@/hooks/useProjects";
import SkeletonLine from "../skeltons/skeletonLine";

export interface TprojectDetailsModalProps {
    projectId: string | null;
    project: TProjects | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectDetailsModal({ projectId, isOpen, project: initialProject, onClose }: TprojectDetailsModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const { data: fetchedProject, isLoading } = useProjectDetails(isOpen ? projectId : null);

    const project = fetchedProject || initialProject;
    const isActuallyLoading = isLoading && !initialProject;

    const allImages: string[] = project?.gallery?.filter((img): img is string => Boolean(img)) || [];
    if (allImages.length === 0 && project?.mainImage) {
        allImages.push(project.mainImage);
    }

    const techStack: string[] = project?.techStack || [];
    const features: string[] = project?.features || [];
    const challenges: string[] = project?.challenges || [];
    const tags: string[] = project?.tags || [];

    const nextImage = () => {
        if (allImages.length > 0) {
            setCurrentImageIndex((p) => (p + 1) % allImages.length);
        }
    };

    const prevImage = () => {
        if (allImages.length > 0) {
            setCurrentImageIndex((p) => (p - 1 + allImages.length) % allImages.length);
        }
    };
    return (

        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95vw] md:max-w-4xl p-0 overflow-hidden border border-white/20 dark:border-blue-500/20 bg-linear-to-br from-blue-50/90 via-blue-100/90 to-white/90 dark:from-gray-950/90 dark:via-blue-950/90 dark:to-gray-950/90 backdrop-blur-2xl shadow-2xl max-h-[90vh] flex flex-col rounded-3xl">

                {/* Header Section */}
                <div className="relative h-60 sm:h-72 md:h-100 w-full shrink-0 border-b border-white/10 overflow-hidden">
                    <AnimatePresence mode="wait">
                        {allImages.length > 0 ? (
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    // 3. حل مشكلة src is possibly undefined
                                    src={allImages[currentImageIndex] || ""}
                                    alt={project?.title || "Project Image"}
                                    fill
                                    priority
                                    className="object-cover object-top"
                                />
                            </motion.div>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-center">
                                <Cpu size={48} className="text-blue-500/40 mb-3 animate-pulse" />
                                <p className="text-blue-400 font-mono text-xs uppercase tracking-widest">Architecture Protected</p>
                            </div>
                        )}
                    </AnimatePresence>

                    {allImages.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                            <button onClick={prevImage} className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={nextImage} className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                    <DialogHeader className="mb-8">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="space-y-3">
                                <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    {project?.title || "Loading..."}
                                </DialogTitle>
                                <div className="flex flex-wrap gap-1.5">
                                    {tags.map((tag) => (
                                        <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                                <Link href={project?.codeUrl || "#"} target="_blank" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border dark:border-white/10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all text-sm font-medium">
                                    <Github size={16} /> Code
                                </Link>
                                <Link href={project?.demoUrl || "#"} target="_blank" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-medium shadow-lg shadow-blue-500/20">
                                    <ExternalLink size={16} /> Live
                                </Link>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            {/* <div>
                                <h4 className="text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-[0.2em] mb-4">About</h4>
                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {project?.fullDescription || project?.shortDescription || "No description available."}
                                </p>
                            </div> */}
                            <div>
                                <h4 className="text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-[0.2em] mb-4">About</h4>
                                {isActuallyLoading && !fetchedProject ? (
                                    <div className="space-y-2">
                                        <SkeletonLine className="h-4 w-full" />
                                        <SkeletonLine className="h-4 w-[90%]" />
                                        <SkeletonLine className="h-4 w-[70%]" />
                                    </div>
                                ) : (
                                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {project?.fullDescription || project?.shortDescription || "No description available."}
                                    </p>
                                )}
                            </div>
                            {features.length > 0 && (
                                // <div>
                                //     <h4 className="text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-[0.2em] mb-4">Key Features</h4>
                                //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                //         {features.map((feature) => (
                                //             <div key={feature} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-sm">
                                //                 <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                //                 <span className="text-[12px] text-gray-800 dark:text-gray-200">{feature}</span>
                                //             </div>
                                //         ))}
                                //     </div>
                                // </div>
                                <div>
                                    <h4 className="text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-[0.2em] mb-4">Key Features</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {isActuallyLoading && !features.length ? (
                                            // عرض 4 عناصر Skeleton
                                            [...Array(4)].map((_, i) => (
                                                <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/20 dark:bg-white/5 border border-white/10">
                                                    <SkeletonLine className="w-4 h-4 rounded-full" />
                                                    <SkeletonLine className="h-3 w-24" />
                                                </div>
                                            ))
                                        ) : (
                                            features.map((feature) => (
                                                <div key={feature} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-sm">
                                                    <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                                    <span className="text-[12px] text-gray-800 dark:text-gray-200">{feature}</span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h4 className="text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <Cpu size={14} /> Stack
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {techStack.map((tech) => (
                                        <span key={tech} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[10px] font-semibold text-blue-700 dark:text-blue-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {challenges.length > 0 && (
                                // <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 relative overflow-hidden">
                                //     <h4 className="text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-[0.2em] mb-4 flex items-center gap-2">
                                //         <AlertCircle size={14} /> Challenges
                                //     </h4>
                                //     <ul className="space-y-3">
                                //         {challenges.map((c, i) => (
                                //             <li key={i} className="flex gap-3 text-[12px] text-gray-700 dark:text-gray-400 leading-relaxed">
                                //                 <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                                //                 {c}
                                //             </li>
                                //         ))}
                                //     </ul>
                                // </div>
                                <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 relative overflow-hidden">
                                    <h4 className="text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-[0.2em] mb-4 flex items-center gap-2">
                                        <AlertCircle size={14} /> Challenges
                                    </h4>
                                    <ul className="space-y-3">
                                        {isActuallyLoading && !challenges.length ? (
                                            [...Array(3)].map((_, i) => (
                                                <div key={i} className="flex gap-3 items-center">
                                                    <SkeletonLine className="w-1 h-1 rounded-full" />
                                                    <SkeletonLine className="h-3 w-full" />
                                                </div>
                                            ))
                                        ) : (
                                            challenges.map((c, i) => (
                                                <li key={i} className="flex gap-3 text-[12px] text-gray-700 dark:text-gray-400 leading-relaxed">
                                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                                                    {c}
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    );
}
