"use client";
import { Github, Linkedin, Twitter, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={` w-full top-0 left-0 z-50  duration-500 backdrop-blur-xl shadow-lg bg-linear-to-br  dark:from-gray-900 dark:via-blue-900  dark:to-gray-900  from-blue-50 via-blue-100 to-white px-4 md:px-8 lg:px-16 py-12 transition-all duration-300`}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

                <div className="text-center md:text-left">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold  mb-2"
                    >
                        Ahmed<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 ml-1">Ehab</span>
                    </motion.h2>
                    <p className=" text-sm">
                        © <span className="text-blue-400">{currentYear}</span> All rights reserved. <br className="md:hidden" />
                        Built with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Next.js</span> & <span className="text-cyan-400">Tailwind</span>
                    </p>
                </div>

                <nav className="flex gap-6 text-sm font-medium">
                    <a href="#projects" className="hover:text-blue-500 transition-colors">Projects</a>
                    <a href="#experience" className="hover:text-blue-500 transition-colors">Experience</a>
                    <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
                </nav>

                <div className="flex gap-4">
                    <a href="https://github.com/yourusername" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-blue-500/20 hover:text-blue-500 transition-all border border-white/5">
                        <Github size={20} />
                    </a>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-blue-500/20 hover:text-blue-500 transition-all border border-white/5">
                        <Linkedin size={20} />
                    </a>
                </div>
            </div>

            <div className="mt-3 pt-4  text-center text-xs  italic">
                "Code is like humor. When you have to explain it, it’s bad."
            </div>
        </footer>
    );
}