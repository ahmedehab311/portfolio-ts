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

export default function ProjectDetailsModal({ project, isOpen, onClose }: any) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!project) return null;

    const allImages = project.gallery?.length > 0 ? project.gallery : [project.mainImage];

    const nextImage = () => setCurrentImageIndex((p) => (p + 1) % allImages.length);
    const prevImage = () => setCurrentImageIndex((p) => (p - 1 + allImages.length) % allImages.length);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            {/* التعديل هنا: w-[95vw] للموبايل و h-[90vh] عشان ميخرجش بره الشاشة */}
            <DialogContent className="w-[95vw] md:max-w-4xl p-0 overflow-hidden border-none bg-linear-to-br dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 from-blue-50 via-blue-100 to-white backdrop-blur-xl shadow-2xl transition-all duration-300 max-h-[90vh] md:max-h-[90vh] flex flex-col">
                {/* 1. Header Slider: ارتفاع أصغر للموبايل */}
                <div className="relative h-[200px] sm:h-[250px] md:h-[380px] w-full bg-muted/10 shrink-0">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImageIndex}
                            src={allImages[currentImageIndex]}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full object-contain p-2 md:p-4"
                            alt={project.title}
                        />
                    </AnimatePresence>

                    {allImages.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4">
                            <button onClick={prevImage} className="p-1.5 md:p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all">
                                <ChevronLeft size={18} />
                            </button>
                            <button onClick={nextImage} className="p-1.5 md:p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </div>

                {/* 2. Content Section: جعلها Scrollable بشكل مستقل */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
                    <DialogHeader className="mb-6 md:mb-8 text-left">
                        <div className="flex flex-col gap-4">
                            <div className="space-y-2">
                                <DialogTitle className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                                    {project.title}
                                </DialogTitle>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tags?.map((tag: string) => (
                                        <span key={tag} className="px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* أزرار الروابط: تملأ العرض في الموبايل */}
                            <div className="flex flex-row gap-2 w-full md:w-auto">
                                <a href={project.demoUrl} target="_blank" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all text-xs md:text-sm font-medium">
                                    <ExternalLink size={14} /> Live
                                </a>
                                <a href={project.codeUrl} target="_blank" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg transition-all text-xs md:text-sm font-medium">
                                    <Github size={14} /> Code
                                </a>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {/* Description & Features */}
                        <div className="md:col-span-2 space-y-6 md:space-y-8">
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">About</h4>
                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {project.fullDescription || project.shortDescription}
                                </p>
                            </div>

                            {project.features?.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Key Features</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {project.features.map((feature: string) => (
                                            <div key={feature} className="flex items-start gap-2 p-2.5 rounded-xl bg-gray-50/50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700/50">
                                                <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                                                <span className="text-[11px] md:text-xs text-gray-700 dark:text-gray-300">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar: ينزل تحت في الموبايل */}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold flex items-center gap-2 text-gray-900 dark:text-white uppercase tracking-widest">
                                    <Cpu size={14} /> Stack
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack?.map((tech: string) => (
                                        <span key={tech} className="px-2.5 py-1 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-md text-[10px] font-medium text-gray-600 dark:text-gray-400">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {project.challenges?.length > 0 && (
                                <div className="p-3.5 rounded-xl bg-orange-50/50 dark:bg-orange-950/10 border border-orange-100/50 dark:border-orange-900/20">
                                    <h4 className="text-[10px] font-bold text-orange-600 dark:text-orange-400 flex items-center gap-2 mb-2 uppercase">
                                        <AlertCircle size={12} /> Challenges
                                    </h4>
                                    <ul className="space-y-1.5">
                                        {project.challenges.map((c: string) => (
                                            <li key={c} className="text-[10px] text-gray-600 dark:text-gray-400 leading-snug flex gap-1.5">
                                                <span className="text-orange-500">•</span> {c}
                                            </li>
                                        ))}
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