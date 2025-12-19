
import { TSkillsHeroColors } from "@/types/heroSectionType";
import { useState, useEffect } from "react";
interface TDescrption {
    colors: TSkillsHeroColors;
}
//  textPrimary: isDark ? 'text-white' : 'text-gray-900',
//         textSecondary: isDark ? 'text-gray-300' : 'text-gray-700',
//         textAccent: isDark ? 'text-blue-400' : 'text-blue-600',
export default function MyDescrption({ colors }: TDescrption) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return (
        <>
            <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-bold  text-gray-900' dark:text-white    mb-6`}
            >
                Frontend{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                    Developer
                </span>
            </h1>

            <p
                className={`text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl`}
            >
                Welcome to my corner of the web! I&apos;m{' '}
                <span
                    className={`font-semibold  text-gray-900 dark:text-white `}
                >
                    Ahmed Ehab
                </span>
                , a passionate front-end developer with a talent for transforming ideas into captivating experiences. With a blend of creativity and technical expertise, I strive to design and build user-friendly interfaces that make a lasting impact.
            </p>

        </>
    )
}
