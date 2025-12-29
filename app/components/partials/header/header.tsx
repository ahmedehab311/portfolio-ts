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
            <div className="px-4 md:px-8 lg:px-16 py-4 ">
                <div className="flex justify-between items-center">

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="flex items-center space-x-3 cursor-pointer group"
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
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-600 via-cyan-400 to-blue-600 rounded-full" />

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
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="py-6 space-y-4 border-t border-gray-200 dark:border-gray-800 mt-4">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.href}
                                        onClick={() => handleNavClick(link.href)}
                                        className="block w-full text-left text-lg card-bg py-3 px-4 rounded-lg  transition-colors cursor-pointer"
                                    >
                                        {link.name}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </header>
    );
};

export default Header;