import { useState, useEffect } from "react";
import { TSkillsHero } from '@/types/heroSectionType';
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from "framer-motion";
export default function SocialIconsWithCV({ colors, isDark }: TSkillsHero) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const handleViewCV = () => {
        alert('سيتم تنزيل ملف الـ CV الخاص بـ أحمد إيهاب');
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex gap-6">
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon ${mounted ? (isDark ? 'dark-social' : 'light-social') : 'opacity-0'
                        } transition-all duration-300`}
                    aria-label="Facebook"
                >
                    <FaFacebook
                        size={24}
                        className={mounted ? (isDark ? "text-gray-300 hover:text-blue-500" : "text-gray-600 hover:text-blue-700") : "text-transparent"}
                    />
                </a>
                <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon ${mounted ? (isDark ? 'dark-social' : 'light-social') : 'opacity-0'
                        } transition-all duration-300`}
                    aria-label="LinkedIn"
                >
                    <FaLinkedin
                        size={24}
                        className={mounted ? (isDark ? "text-gray-300 hover:text-blue-700" : "text-gray-600 hover:text-blue-800") : "text-transparent"}
                    />
                </a>
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon ${mounted ? (isDark ? 'dark-social' : 'light-social') : 'opacity-0'
                        } transition-all duration-300`}
                    aria-label="GitHub"
                >
                    <FaGithub
                        size={24}
                        className={mounted ? (isDark ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-900") : "text-transparent"}
                    />
                </a>
            </div>

            <div className="flex gap-4 flex-wrap items-center">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleViewCV}
                    className="btn-primary-global flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium shadow-lg shadow-blue-500/20 transition-all"
                >
                    <span>View CV</span>
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* أيقونة تحميل أو سهم للخارج تعطي إيحاء أفضل بفتح ملف */}
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                    </svg>
                </motion.button>
                <button
                    onClick={() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-primary-global flex items-center gap-2" // أضفت gap و flex للتنسيق
                >
                    <span>Contact Me</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </div>

    )
}
