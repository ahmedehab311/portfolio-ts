import { motion, AnimatePresence } from "framer-motion";

interface TheaderProps {
    isMenuOpen: boolean;
    navLinks: { name: string; href: string }[];
    activeSection: string;
    handleNavClick: (href: string) => void;
}

export default function MobileMenu({ isMenuOpen, navLinks, activeSection, handleNavClick }: TheaderProps) {
    return (
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
    )
}
