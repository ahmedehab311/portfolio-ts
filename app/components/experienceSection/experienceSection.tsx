"use client";
import { motion, Variants } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import HeaderComponents from "../headerComponents";


export default function ExperienceSection({ experiences }: { experiences: any[] }) {
    const isSingle = experiences?.length === 1;
    const getVariants = (isEven: boolean, isSingle: boolean) => {
        if (isSingle) {
            return {
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0 }
            };
        }
        return {
            hidden: { opacity: 0, x: isEven ? -50 : 50, y: 20 },
            visible: { opacity: 1, x: 0, y: 0 }
        };
    };
    return (
        <section id="experience" className="py-24 px-4 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <HeaderComponents
                    leftText="Professional"
                    rightText="Journey"
                    description="A summary of my current role and professional contributions as a developer"
                />

                <div className="relative">

                    {!isSingle && (
                        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-500/20 hidden md:block" />
                    )}

                    <div className={`flex flex-col ${isSingle ? "items-center" : "gap-12 md:gap-4"}`}>
                        {experiences?.map((exp, index) => {
                            const isEven = index % 2 === 0;
                            const variants = getVariants(isEven, isSingle);

                            return (
                                <motion.div
                                    key={index}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    variants={variants}
                                    transition={{
                                        duration: 0.7,
                                        delay: index * 0.15,
                                        ease: [0.21, 0.47, 0.32, 0.98]
                                    }}
                                    className={`relative w-full flex ${isSingle
                                        ? "justify-center"
                                        : (isEven ? "md:justify-start" : "md:justify-end")
                                        } mb-12 md:mb-0`}
                                >

                                    {!isSingle && (
                                        <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-10 w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-900 z-10 hidden md:block shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                                    )}

                                    <div className={`w-full ${isSingle ? "max-w-3xl" : "md:w-[45%]"} group`}>
                                        <div className="card-glass p-6 md:p-8 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all duration-500 shadow-2xl relative overflow-hidden">

                                            <div className="absolute -inset-x-20 -top-20 h-40 w-40 bg-blue-500/10 blur-[100px] group-hover:bg-blue-500/20 transition-all duration-700" />

                                            {!isSingle && (
                                                <div className={`absolute top-10 w-4 h-4 bg-[#111827]/50 backdrop-blur-none border-white/5 rotate-45 hidden md:block ${isEven ? "-right-2 border-t border-r" : "-left-2 border-b border-l"}`} />
                                            )}

                                            <div className="relative z-10 flex flex-col gap-4">
                                                <div className="flex flex-wrap justify-between items-start gap-4">
                                                    <div>
                                                        <h3 className="text-xl md:text-2xl font-bold text-gradient-blue-cyan group-hover:text-blue-400 transition-colors duration-300">
                                                            {exp.role}
                                                        </h3>
                                                        <p className="text-blue-400 font-medium tracking-wide uppercase text-sm mt-1">{exp.company}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs  bg-white/5 px-3 py-1.5 rounded-xl border border-black/10 backdrop-blur-md">
                                                        <Calendar size={14} className="text-blue-500" />
                                                        {exp.startDate} - {exp.endDate}
                                                    </div>
                                                </div>

                                                <ul className="space-y-3 my-2">
                                                    {exp.description?.map((point: string, i: number) => (
                                                        <li key={i} className="flex gap-3 text-sm  leading-relaxed transition-colors">
                                                            <CheckCircle2 className="text-blue-500 shrink-0 mt-1" size={16} />
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>

                                                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                                    {exp.technologies?.map((tech: string) => (
                                                        <span key={tech} className="px-3 py-1 text-[12px] font-bold bg-blue-500/5 text-blue-400/80 border border-blue-500/10 rounded-lg group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}