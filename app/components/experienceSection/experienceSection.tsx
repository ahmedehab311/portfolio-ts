"use client";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import HeaderComponents from "../headerComponents";


export default function ExperienceSection({ experiences }: { experiences: any[] }) {
    const isSingle = experiences?.length === 1;

    return (
        <section id="experience" className="py-24 px-4 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <HeaderComponents
                    leftText="Professional"
                    rightText="Journey"
                    description="A summary of my current role and professional contributions as a developer"
                />
                {/* Container الأب */}
                <div className="relative">

                    {/* الخط اللي في النص: بيظهر فقط لو أكتر من كارت */}
                    {!isSingle && (
                        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-500/20 hidden md:block" />
                    )}

                    <div className={`flex flex-col ${isSingle ? "items-center" : "gap-4"}`}>
                        {experiences?.map((exp, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: isSingle ? 0 : (isEven ? -50 : 50), y: 20 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`relative w-full flex ${isSingle
                                        ? "justify-center"
                                        : (isEven ? "md:justify-start" : "md:justify-end")
                                        } mb-12 md:mb-0`}
                                >
                                    {/* الدائرة اللي في النص (Timeline Dot) */}
                                    {!isSingle && (
                                        <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-10 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#030014] z-10 hidden md:block" />
                                    )}

                                    {/* الكارت */}
                                    <div className={`w-full ${isSingle ? "max-w-3xl" : "md:w-[45%]"} group`}>
                                        <div className="card-glass p-6 md:p-8 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all duration-300 shadow-2xl relative">

                                            {/* السهم الصغير اللي بيشاور على الخط (اختياري) */}
                                            {!isSingle && (
                                                <div className={`absolute top-10 w-4 h-4 bg-white/5 border-white/5 rotate-45 hidden md:block ${isEven ? "-right-2 border-t border-r" : "-left-2 border-b border-l"
                                                    }`} />
                                            )}

                                            <div className="flex flex-col gap-4">
                                                {/* الدور والشركة */}
                                                <div className="flex flex-wrap justify-between items-start gap-4">
                                                    <div>
                                                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                            {exp.role}
                                                        </h3>
                                                        <p className="text-blue-400 font-medium">{exp.company}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                                                        <Calendar size={14} className="text-blue-500" />
                                                        {exp.startDate} - {exp.endDate}
                                                    </div>
                                                </div>

                                                {/* الوصف */}
                                                <ul className="space-y-3 my-4">
                                                    {exp.description?.map((point: string, i: number) => (
                                                        <li key={i} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                                                            <CheckCircle2 className="text-blue-500 shrink-0 mt-1" size={16} />
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* التكنولوجيات */}
                                                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                                    {exp.technologies?.map((tech: string) => (
                                                        <span key={tech} className="px-3 py-1 text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg">
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