import { SiJavascript, SiNextdotjs, SiTypescript } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { RiTailwindCssFill } from "react-icons/ri";
import { TSkillsHero } from '@/types/heroSectionType';
export default function SkillsHero({ colors, isDark }: TSkillsHero) {
    return (
        <div className="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start">
            <div className={`flex items-center gap-2 ${colors.cardBg} backdrop-blur-sm px-4 py-2 rounded-lg border ${colors.borderColor} transition-colors duration-300`}>
                <SiNextdotjs className={isDark ? "text-white" : "text-gray-900"} />
                <span className={colors.textPrimary}>Next.js</span>
            </div>
            <div className={`flex items-center gap-2 ${colors.cardBg} backdrop-blur-sm px-4 py-2 rounded-lg border ${colors.borderColor} transition-colors duration-300`}>
                <FaReact className="text-cyan-500" />
                <span className={colors.textPrimary}>React</span>
            </div>
            <div className={`flex items-center gap-2 ${colors.cardBg} backdrop-blur-sm px-4 py-2 rounded-lg border ${colors.borderColor} transition-colors duration-300`}>
                <SiJavascript className="text-yellow-500" />
                <span className={colors.textPrimary}>JavaScript</span>
            </div>
            <div className={`flex items-center gap-2 ${colors.cardBg} backdrop-blur-sm px-4 py-2 rounded-lg border ${colors.borderColor} transition-colors duration-300`}>
                <SiTypescript className="text-blue-500" />
                <span className={colors.textPrimary}>TypeScript</span>
            </div>
            <div className={`flex items-center gap-2 ${colors.cardBg} backdrop-blur-sm px-4 py-2 rounded-lg border ${colors.borderColor} transition-colors duration-300`}>
                <RiTailwindCssFill />
                <span className={colors.textPrimary}>TailwindCss</span>
            </div>
        </div>
    )
}
