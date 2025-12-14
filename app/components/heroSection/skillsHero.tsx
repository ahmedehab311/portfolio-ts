import { SiJavascript, SiNextdotjs, SiTypescript } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { RiTailwindCssFill } from "react-icons/ri";
import { TSkillsHero } from '@/types/heroSectionType';
import { useSkillsHero } from '@/hooks/useSkillsHero';
export const skillsIconsMap: Record<string, any> = {
    FaReact,
    SiJavascript,
    SiNextdotjs,
    SiTypescript,
    RiTailwindCssFill,
};
export default function SkillsHero({ colors, isDark }: TSkillsHero) {

    const { data, isLoading, isError } = useSkillsHero()

    return (
        <div className="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start">
            {isLoading &&
                Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-32 h-10 rounded-lg animate-pulse ${colors.cardBg} border ${colors.borderColor}`}
                    />
                ))}

            {data?.map((skill) => {
                const Icon = skillsIconsMap[skill.icon];

                return (
                    <div
                        key={skill._id}
                        className={`flex items-center gap-2 ${colors.cardBg} backdrop-blur-sm px-4 py-2 rounded-lg border ${colors.borderColor}`}
                    >
                        {Icon && (
                            <Icon className={`text-${skill.color}`} />
                        )}
                        <span className={colors.textPrimary}>
                            {skill.name}
                        </span>
                    </div>
                );
            })}
        </div>
    )
}
