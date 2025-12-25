"use client";
import { AllSkilsCategory } from "@/app/constants/project";
import { connectDB } from "@/lib/db";
import { allSkills } from "@/models/allSkills/allSkill";
import { motion, Variants } from "framer-motion";
import { Code2, Server, Wrench, Layout, Database, Terminal } from "lucide-react";

// const skills = [
//     {
//         title: "Frontend Mastery",
//         icon: <Layout className="text-blue-500" />,
//         description: "Building responsive, pixel-perfect UIs with modern frameworks.",
//         tags: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion"]
//     },
//     {
//         title: "Backend & Database",
//         icon: <Database className="text-cyan-500" />,
//         description: "Developing scalable server-side logic and managing databases.",
//         tags: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "JWT Auth"]
//     },
//     {
//         title: "Professional Tools",
//         icon: <Terminal className="text-purple-500" />,
//         description: "Essential tools for collaborative development and deployment.",
//         tags: ["Git & GitHub", "Postman", "Vercel / Netlify", "NPM / Yarn", "Clean Code"]
//     },

// ];
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
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-bold mb-4"
                >
                    Technical <span className="text-gradient-blue-cyan">Expertise</span>
                </motion.h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                    A look at my specialized skills in building high-performance web applications.
                </p>
            </div>

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
                                {/* هنا بنعرض الأيقونة بناءً على الكاتيجوري اللي جاي من الداتا */}
                                {iconMap[skill.category] || <Terminal size={24} />}
                            </div>
                            <h3 className="text-xl font-bold">{skill.title}</h3>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                            {skill.description}
                        </p>

                        {/* Tags */}
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