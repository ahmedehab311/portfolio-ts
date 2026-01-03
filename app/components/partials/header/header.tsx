"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import logo from '@/app/icon.png';
import Image from "next/image";
const Header = () => {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("home");
    useEffect(() => {
        const observers = [];
        const sections = ["home", "projects", "skills", "experience", "contact"];

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries: any) => {
            entries.forEach((entry: any) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        setMounted(true);

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "Projects", href: "#projects" },
        { name: "Skills", href: "#skills" },
        { name: "Experience", href: "#experience" },
        { name: "Contact", href: "#contact" },
    ];

    const handleNavClick = (href: string) => {
        setIsMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (!mounted) return null;

    return (
        <header className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl shadow-lg" : ""}`}>
            <div className="px-4 md:px-8 lg:px-16 pt-4 ">
                <div className="flex justify-between items-center">

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="flex items-center  cursor-pointer group"
                        onClick={() => router.push("/")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                router.push("/");
                            }
                        }}
                    >
                        <div className="relative">
                            <div className="relative w-16 h-16 flex items-center justify-center overflow-hidden rounded-full group">
                                <Image
                                    src={logo}
                                    alt="Logo"
                                    width={64}
                                    height={64}
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col relative pl-4 group">
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-600 via-cyan-400 to-blue-600 rounded-full" />

                            <h4 className="tracking-tight font-bold text-gray-900 dark:text-white leading-none">
                                AHMED
                            </h4>
                            <h6 className="tracking-[0.2em] text-[12px] text-blue-500/80 font-medium mt-1 uppercase">
                                E H A B
                            </h6>
                        </div>
                    </motion.div>
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <button
                                    onClick={() => handleNavClick(link.href)}
                                    className="relative group  font-medium text-sm uppercase tracking-wider cursor-pointer"
                                >
                                    {link.name}
                                    <motion.span
                                        className={`absolute -bottom-1 left-0 h-0.5 bg-primary`}
                                        initial={false}
                                        animate={{ width: activeSection === link.href.replace('#', '') ? "100%" : "0%" }}
                                    />
                                </button>
                            </motion.div>
                        ))}

                        {/* Theme Toggle */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                            className="relative w-12 h-6 rounded-full bg-gradient-to-r from-gray-200   cursor-pointer to-gray-300 dark:from-gray-700 dark:to-gray-800 p-1 transition-all duration-300"
                            aria-label="Toggle theme"
                        >
                            <motion.div
                                className="w-4 h-4 rounded-full bg-white shadow-lg"
                                animate={{ x: theme === "light" ? 0 : 24 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="flex items-center justify-center h-full ">
                                    {theme === "light" ? "☀️" : "🌙"}
                                </div>
                            </motion.div>
                        </motion.button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden space-x-4">
                        {/* Theme Toggle Mobile */}
                        <button
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                            className="p-2 rounded-lg cursor-pointer"
                        >
                            {theme === "light" ? "🌙" : "☀️"}
                        </button>

                        {/* Hamburger Menu */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="relative w-10 h-10 flex flex-col items-center justify-center space-y-1.5"
                            aria-label="Toggle menu"
                        >
                            <Menu />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute  left-0 w-full  md:hidden"
                        >
                            <div className="p-4 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 bg-linear-to-br  dark:from-gray-900 dark:via-blue-900  dark:to-gray-900  from-blue-50 via-blue-100 to-white backdrop-blur-xl shadow-2xl">
                                <div className="flex flex-col space-y-2">
                                    {navLinks.map((link, index) => (
                                        <motion.button
                                            key={link.href}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => handleNavClick(link.href)}
                                            className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-300 ${activeSection === link.href.replace('#', '')
                                                ? "bg-white/20 dark:bg-blue-500/20 text-blue-700 dark:text-cyan-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-white/20"
                                                : "hover:bg-white/10 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 hover:translate-x-1"
                                                }`}
                                        >
                                            <span className="text-lg uppercase tracking-widest">{link.name}</span>
                                            {activeSection === link.href.replace('#', '') && (
                                                <motion.div layoutId="activeDot" className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </header>
    );
};

export default Header;