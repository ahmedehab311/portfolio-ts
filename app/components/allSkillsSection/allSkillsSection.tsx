"use client";
import { AllSkilsCategory } from "@/app/constants/project";
import { motion, Variants } from "framer-motion";
import { Layout, Database, Terminal } from "lucide-react";
import HeaderComponents from "../headerComponents";

interface Skill {
    title: string;
    category: string;
    description: string;
    tags: string[];
}
export default function AlSkillsSection({ skills }: { skills: Skill[] }) {

    const iconMap: Record<string, React.ReactNode> = {
        [AllSkilsCategory.FRONTEND]: <Layout className="text-blue-500" size={24} />,
        [AllSkilsCategory.BACKEND]: <Database className="text-cyan-500" size={24} />,
        [AllSkilsCategory.TOOLS]: <Terminal className="text-purple-500" size={24} />,
    };
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id="skills" className="py-20 scroll-mt-20">
            <HeaderComponents
                leftText="Technical"
                rightText="Expertise"
                description="A look at my specialized skills in building high-performance web applications."
            />
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover={{ y: -10 }}
                        className="card-glass p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group"
                    >
                        {/* Icon & Title */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                                {iconMap[skill.category] || <Terminal size={24} />}
                            </div>
                            <h3 className="text-xl font-bold">{skill.title}</h3>
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                            {skill.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {skill.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-[11px] font-semibold bg-white/5 border border-white/10 rounded-full group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-colors"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}