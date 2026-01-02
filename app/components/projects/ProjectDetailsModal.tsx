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

export default function ProjectDetailsModal({ project, isOpen, onClose }: any) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!project) return null;

    const allImages = project.gallery?.length > 0 ? project.gallery : [project.mainImage];

    const nextImage = () => setCurrentImageIndex((p) => (p + 1) % allImages.length);
    const prevImage = () => setCurrentImageIndex((p) => (p - 1 + allImages.length) % allImages.length);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95vw] md:max-w-4xl p-0 overflow-hidden border border-white/20 dark:border-blue-500/20 bg-linear-to-br from-blue-50/90 via-blue-100/90 to-white/90 dark:from-gray-950/90 dark:via-blue-950/90 dark:to-gray-950/90 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_rgba(30,58,138,0.5)] transition-all duration-300 max-h-[90vh] flex flex-col rounded-3xl">
                <div className="relative h-60 sm:h-72 md:h-100 w-full bg-linear-to-b from-transparent to-black/5 dark:to-white/5 shrink-0 border-b border-white/10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={allImages[currentImageIndex]}
                                alt={project.title}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
                                className="object-cover object-top transition-transform duration-500"
                            />
                        </motion.div>
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

                            <div className="flex flex-row gap-2 w-full md:w-auto">
                                <Link href={project.codeUrl} target="_blank" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border bg-white/5  border-black/10 backdrop-blur-md hover:border-primary/50 text- rounded-lg transition-all text-xs md:text-sm font-medium">
                                    <Github size={14} /> Code
                                </Link>
                                <Link href={project.demoUrl} target="_blank" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gradient-button-primary text-white hover:border-primary/50 rounded-lg transition-all text-xs md:text-sm font-medium">
                                    <ExternalLink size={14} /> Live
                                </Link>

                            </div>
                        </div>
                    </DialogHeader>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {/* Description & Features */}
                        <div className="md:col-span-2 space-y-6 md:space-y-8">
                            <div className="space-y-2">
                                <h4 className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2 mb-4 uppercase tracking-widest">About</h4>
                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {project.fullDescription || project.shortDescription}
                                </p>
                            </div>

                            {project.features?.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2 mb-4 uppercase tracking-widest">Key Features</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {project.features.map((feature: string) => (
                                            <div key={feature} className="flex items-start gap-2 p-3 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-sm backdrop-blur-md">
                                                <CheckCircle2 size={14} className="text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                                                <span className="text-[11px] md:text-xs text-gray-800 dark:text-gray-200">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar: ينزل تحت في الموبايل */}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <h4 className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2 mb-4 uppercase tracking-widest">
                                    <Cpu size={14} /> Stack
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack?.map((tech: string) => (
                                        <span key={tech} className="px-3 py-1.5 bg-blue-500/10 dark:bg-blue-400/10 border border-blue-200/50 dark:border-blue-500/30 rounded-full text-[10px] font-semibold text-blue-700 dark:text-blue-300 transition-hover hover:bg-blue-500/20">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {project.challenges?.length > 0 && (
                                <div className="relative overflow-hidden p-4 rounded-2xl bg-white/10 dark:bg-blue-500/5 border border-white/20 dark:border-blue-500/20 backdrop-blur-md group">
                                    {/* لمسة إضاءة زرقاء خفيفة في الخلفية */}
                                    <div className="absolute -right-4 -top-4 w-12 h-12 bg-blue-500/10 blur-2xl rounded-full" />

                                    <h4 className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2 mb-4 uppercase tracking-widest">
                                        <div className="p-1 rounded-lg bg-blue-500/20">
                                            <AlertCircle size={14} className="text-blue-600 dark:text-cyan-400" />
                                        </div>
                                        Technical Challenges
                                    </h4>

                                    <ul className="space-y-3">
                                        {project.challenges.map((c: string, index: number) => (
                                            <li key={index} className="group/item flex gap-3 items-start">
                                                {/* النقطة باللون الأزرق المضيء */}
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500/60 dark:bg-cyan-500/40 shrink-0 group-hover/item:scale-125 transition-transform duration-300 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />

                                                <p className="text-[11px] md:text-[12px] text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                                                    {c}
                                                </p>
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