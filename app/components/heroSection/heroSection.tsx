'use client'
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { FaCode, FaLaptopCode, FaReact } from 'react-icons/fa';
import { SiJavascript, SiNextdotjs, SiTypescript } from 'react-icons/si';
import SkillsHero from './skillsHero';
import SocialIconsWithCV from './socialIconsWithCV';
import MyDescrption from './myDescrption';
// import Loading from '@/app/loading';
interface TMousePosition {
    x: number;
    y: number;
}
export default function HeroSection() {
    const codeRef = useRef<HTMLDivElement>(null);
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [mousePosition, setMousePosition] = useState<TMousePosition>({ x: 0, y: 0 });

    const currentTheme = resolvedTheme || theme;
    const isDark = currentTheme === 'dark';

    const colors = {
        // الخلفيات
        bgGradient: isDark
            ? 'from-gray-900 via-blue-900 to-gray-900'
            : 'from-blue-50 via-blue-100 to-white',

        // النصوص
        textPrimary: isDark ? 'text-white' : 'text-gray-900',
        textSecondary: isDark ? 'text-gray-300' : 'text-gray-700',
        textAccent: isDark ? 'text-blue-400' : 'text-blue-600',

        // الخلفيات الشفافة
        cardBg: isDark ? 'bg-gray-800/50' : 'bg-white/80',
        codeBg: isDark ? 'bg-gray-900/90' : 'bg-white/95',

        // التدرجات
        buttonGradient: isDark
            ? 'from-blue-600 to-cyan-500'
            : 'from-blue-500 to-cyan-400',

        // الحدود
        borderColor: isDark ? 'border-gray-700' : 'border-gray-200',
        borderLight: isDark ? 'border-white/10' : 'border-gray-300/30',

        // الأيقونات والشارات
        badgeBg: isDark ? 'bg-blue-500/20' : 'bg-blue-100',
        badgeText: isDark ? 'text-blue-300' : 'text-blue-700',

        // الظلال
        shadow: isDark ? 'shadow-2xl' : 'shadow-xl',

        // تأثيرات المؤشر
        cursorEffect: isDark
            ? `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
            : `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 80%)`,
    };

    useEffect(() => setMounted(true), []);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            requestAnimationFrame(() => setMousePosition({ x: e.clientX, y: e.clientY }));
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        const codeElement = codeRef.current;
        if (!codeElement) return;

        const codeLines = [
            "import React, { useState } from 'react';",
            "",
            "const Portfolio = () => {",
            "  return (",
            "    <div >",
            "      <h1>My Portfolio</h1>",
            "    </div>",
            "  );",
            "};",
            "",
            "export default Portfolio;"
        ];

        codeElement.innerHTML = codeLines.map(() => '<div class="code-line"></div>').join('');

        let lineIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeWriter = () => {
            if (!codeElement) return;

            const currentLine = codeLines[lineIndex] || "";
            if (!isDeleting) {
                codeElement.children[lineIndex].textContent = currentLine.substring(0, charIndex);
                charIndex++;
                if (charIndex > currentLine.length) {
                    isDeleting = true;
                    setTimeout(typeWriter, 1000); // تأخير قبل الحذف
                    return;
                }
            } else {
                codeElement.children[lineIndex].textContent = currentLine.substring(0, charIndex);
                charIndex--;
                if (charIndex < 0) {
                    isDeleting = false;
                    lineIndex = (lineIndex + 1) % codeLines.length;
                }
            }
            setTimeout(typeWriter, isDeleting ? 50 : 1000);
        };

        typeWriter();
    }, []);
    if (!mounted) {
        // الهيكل المؤقت أثناء التحميل + spinner
        return (
            <section className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </section>
        );
    }
    return (
        <section className={`relative min-h-screen flex flex-col lg:flex-row items-center justify-center  overflow-hidden 
            }`}>
            {/* <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{ background: colors.cursorEffect }}
            /> */}

            {/* عناصر خلفية برمجية عائمة */}
            <div className={`absolute top-10 left-10 ${isDark ? 'opacity-10' : 'opacity-5'} animate-float`}>
                <FaCode size={60} />
            </div>
            <div className={`absolute bottom-20 right-20 ${isDark ? 'opacity-10' : 'opacity-5'} animate-float-delayed`}>
                <FaLaptopCode size={50} />
            </div>
            <div className={`absolute top-1/3 right-1/4 ${isDark ? 'opacity-10' : 'opacity-5'} animate-float-slow`}>
                <FaReact size={40} />
            </div>

            <div className="lg:w-1/2 z-10 text-center lg:text-left mb-12 lg:mb-0 mt-6" >

                <MyDescrption colors={colors} />

                < SkillsHero colors={colors} isDark={isDark} />


                <SocialIconsWithCV colors={colors} isDark={isDark} />

            </div>


            <div className="lg:w-1/2 flex justify-center items-center z-10">
                <div className="relative">
                    {/* الصورة المتحركة */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                        {/* دائرة خلفية متحركة */}
                        <div className={`absolute inset-0 rounded-full border-4 ${isDark ? 'border-blue-500/30' : 'border-blue-400/20'} animate-ping-slow`}></div>
                        <div className={`absolute inset-4 rounded-full border-4 ${isDark ? 'border-cyan-500/20' : 'border-cyan-400/10'} animate-spin-slow`}></div>

                        {/* الأيقونة المركزية */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`relative w-48 h-48 md:w-60 md:h-60 ${isDark ? 'bg-gradient-to-br from-blue-500/20 to-cyan-400/20' : 'bg-gradient-to-br from-blue-400/10 to-cyan-300/10'} rounded-2xl flex items-center justify-center ${colors.shadow} backdrop-blur-sm border ${colors.borderLight} transition-colors duration-300`}>
                                {/* تأثيرات داخل الأيقونة */}
                                <div className={`absolute top-4 left-4 w-8 h-8 rounded-full ${isDark ? 'bg-blue-500/30' : 'bg-blue-400/20'} animate-pulse`}></div>
                                <div className={`absolute bottom-4 right-4 w-6 h-6 rounded-full ${isDark ? 'bg-cyan-400/30' : 'bg-cyan-300/20'} animate-pulse-delayed`}></div>

                                {/* رمز البرمجة المركزي */}
                                <div className="text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                                    &lt;/&gt;
                                </div>

                                {/* عناصر برمجية صغيرة تدور حول الأيقونة */}
                                <div className="absolute -top-2 -left-2 animate-orbit">
                                    <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-blue-500/20' : 'bg-blue-400/10'} flex items-center justify-center border ${colors.borderLight}`}>
                                        <SiJavascript className="text-yellow-500" size={16} />
                                    </div>
                                </div>
                                <div className="absolute -top-2 -right-2 animate-orbit-reverse">
                                    <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-blue-500/20' : 'bg-blue-400/10'} flex items-center justify-center border ${colors.borderLight}`}>
                                        <FaReact className="text-cyan-500" size={16} />
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -left-2 animate-orbit-delayed">
                                    <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-blue-500/20' : 'bg-blue-400/10'} flex items-center justify-center border ${colors.borderLight}`}>
                                        <SiNextdotjs className={isDark ? "text-white" : "text-gray-900"} size={16} />
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -right-2 animate-orbit-reverse-delayed">
                                    <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-blue-500/20' : 'bg-blue-400/10'} flex items-center justify-center border ${colors.borderLight}`}>
                                        <SiTypescript className="text-blue-500" size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* نافذة كود برمجي متحركة */}
                    <div className="absolute -bottom-20 -right-10 md:right-0 w-64 bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-xs text-gray-400">portfolio.js</div>
                        </div>
                        <div className="p-4 font-mono text-sm">
                            <div ref={codeRef} className="text-cyan-400">
                                {/* سيتم إضافة الكود ديناميكيًا */}
                            </div>
                            <div className="mt-2 text-gray-500">
                                <span className="text-green-400"></span> Transforming ideas into code
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* الأسهم للإشارة للتمرير لأسفل */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
                <div className={`w-6 h-10 border-2 ${isDark ? 'border-white/30' : 'border-gray-400/30'} rounded-full flex justify-center transition-colors duration-300`}>
                    <div className={`w-1 h-3 ${isDark ? 'bg-white/50' : 'bg-gray-600/50'} rounded-full mt-2`}></div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
        }
        @keyframes orbit-reverse {
          0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(60px) rotate(360deg); }
        }
        @keyframes orbit-delayed {
          0% { transform: rotate(90deg) translateX(60px) rotate(-90deg); }
          100% { transform: rotate(450deg) translateX(60px) rotate(-450deg); }
        }
        @keyframes orbit-reverse-delayed {
          0% { transform: rotate(90deg) translateX(60px) rotate(-90deg); }
          100% { transform: rotate(-270deg) translateX(60px) rotate(270deg); }
        }
        @keyframes ping-slow {
          75%, 100% { transform: scale(1.1); opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite 1s; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite 2s; }
        .animate-orbit { animation: orbit 10s linear infinite; }
        .animate-orbit-reverse { animation: orbit-reverse 12s linear infinite; }
        .animate-orbit-delayed { animation: orbit-delayed 14s linear infinite; }
        .animate-orbit-reverse-delayed { animation: orbit-reverse-delayed 16s linear infinite; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .dark-social {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ccc;
        }
        
        .light-social {
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.1);
          color: #666;
        }
        
        .social-icon:hover {
          transform: translateY(-5px);
        }
        
        .dark-social:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        .light-social:hover {
          background: rgba(0, 0, 0, 0.08);
          border-color: rgba(0, 0, 0, 0.2);
        }
        
        .code-line {
          min-height: 1.2em;
          font-family: 'Courier New', monospace;
        }
      `}</style>
        </section>
    );
}