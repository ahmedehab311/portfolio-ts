import { SiJavascript, SiNextdotjs, SiTypescript } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { RiTailwindCssFill } from "react-icons/ri";
import { TSkillsHero } from '@/types/heroSectionType';
export default function SkillsHero({ colors, isDark }: TSkillsHero) {

    const skills = [
        {
            name: "Next.js",
            icon: <SiNextdotjs className="text-primary" />,
        },
        {
            name: "React",
            icon: <FaReact className="text-cyan-500" />,
        },
        {
            name: "JavaScript",
            icon: <SiJavascript className="text-yellow-500" />,
        },
        {
            name: "TypeScript",
            icon: <SiTypescript className="text-blue-500" />,
        },
        {
            name: "TailwindCss",
            icon: <RiTailwindCssFill className="text-sky-500" />,
        },
    ];
    return (
        <div className="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start">
            {skills.map((skill, index) => (
                <div
                    key={index}
                    className={`flex items-center gap-2 ${colors.cardBg} backdrop-blur-sm px-4 py-2 rounded-lg border ${colors.borderColor} transition-colors duration-300`}
                >
                    {skill.icon}
                    <span className={colors.textPrimary}>{skill.name}</span>
                </div>
            ))}
        </div>
    )
}
