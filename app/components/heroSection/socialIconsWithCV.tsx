import { useState, useEffect } from "react";
import { TSkillsHero } from '@/types/heroSectionType';
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from "framer-motion";
import Link from "next/link";
export default function SocialIconsWithCV({ colors, isDark }: TSkillsHero) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex gap-6">

                <Link
                    href="https://www.linkedin.com/in/ahmed-ehab-137381268"
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
                </Link>
                <Link
                    href="https://github.com/ahmedehab311"
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
                </Link>
            </div>

            <div className="flex gap-4 flex-wrap items-center">
                <button
                    onClick={() => window.open('https://drive.google.com/file/d/18AjyyIDGSXV87Z_cR-FrGfJNX4kLC_Iv/view', '_blank')}
                    className="btn-primary-global flex items-center gap-2"
                >
                    <span>View CV</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </button>
                <button
                    onClick={() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-primary-global flex items-center gap-2"
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
