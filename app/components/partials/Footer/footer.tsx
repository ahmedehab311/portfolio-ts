"use client";
import { Github, Linkedin, Twitter, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full z-50 backdrop-blur-xl shadow-lg bg-linear-to-br dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 from-blue-50 via-blue-100 to-white px-4 py-8 transition-all duration-300">

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8">

                <div className="text-center md:text-left">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold  mb-2"
                    >
                        Ahmed<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-400 ml-1">Ehab</span>
                    </motion.h2>
                    <p className=" text-sm">
                        © <span className="text-blue-400">{currentYear}</span> All rights reserved. <br className="md:hidden" />
                        Built with <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-400">Next.js</span> & <span className="text-cyan-400">Tailwind</span>
                    </p>
                </div>

                {/* 2. اللينكات (في النص تماماً) */}
                <nav className="flex justify-center gap-6 text-sm font-medium">
                    <Link href="#home" className="hover:text-blue-500 transition-colors">Home</Link>
                    <Link href="#projects" className="hover:text-blue-500 transition-colors">Projects</Link>
                    <Link href="#experience" className="hover:text-blue-500 transition-colors">Experience</Link>
                    <Link href="#skills" className="hover:text-blue-500 transition-colors">Skills</Link>
                </nav>

                {/* 3. السوشيال (على اليمين) */}
                <div className="flex justify-center md:justify-end gap-4">
                    <Link href="https://www.linkedin.com/in/ahmed-ehab-137381268"
                        target="_blank"
                        className="p-3 bg-white/5 rounded-full hover:bg-blue-500/20 hover:text-blue-500 border border-white/5 transition-all">
                        <Github size={20} />
                    </Link>
                    <Link href="https://github.com/ahmedehab311"
                        target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-blue-500/20 hover:text-blue-500 border border-white/5 transition-all">
                        <Linkedin size={20} />
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 mt-4">
                <div className="hidden md:block"></div>

                <div className="text-center text-[12    px] md:text-xs italic px-4">
                    "Code is like humor. When you have to explain it, it’s bad."
                </div>

                <div className="hidden md:block"></div>
            </div>
        </footer>
    );
}