import { SiJavascript, SiNextdotjs, SiTypescript, SiNodedotjs } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { RiTailwindCssFill } from "react-icons/ri";
import { TSkillsHero } from '@/types/heroSectionType';
import { useSkillsHero } from '@/hooks/useSkillsHero';
import { useEffect, useState } from 'react';
export const skillsIconsMap: Record<string, any> = {
    FaReact,
    SiJavascript,
    SiNextdotjs,
    SiTypescript,
    RiTailwindCssFill, SiNodedotjs
};
export default function SkillsHero({ colors, isDark }: TSkillsHero) {

    const { data, isLoading, isError } = useSkillsHero()
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return (
        <div className="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start">
            {isLoading &&
                Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-32 h-10 rounded-lg animate-pulse ${mounted ? colors.cardBg : 'bg-transparent'
                            } border ${mounted ? colors.borderColor : 'border-transparent'}`}
                    />
                ))}

            {data?.map((skill) => {
                const Icon = skillsIconsMap[skill.icon];

                return (
                    <div
                        key={skill._id}
                        className={`flex items-center gap-2 ${mounted ? colors.cardBg : 'bg-transparent'
                            } backdrop-blur-sm px-4 py-2 rounded-lg border ${mounted ? colors.borderColor : 'border-transparent'
                            }`}
                    >
                        {Icon && (
                            <Icon className={mounted ? `text-${skill.color}` : 'text-transparent'} />
                        )}
                        <span className={mounted ? colors.textPrimary : 'text-transparent'}>
                            {skill.name}
                        </span>
                    </div>
                );
            })}
        </div>

    )
}
