import { SiJavascript, SiNextdotjs, SiTypescript, SiNodedotjs } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { RiTailwindCssFill } from "react-icons/ri";
import { TSkillsHero } from '@/types/heroSectionType';
import { useSkillsHero } from '@/hooks/useSkillsHero';
import { TSkills } from '@/models/Skill';
import { LeanSkill } from './skillsHeroServer';

export const skillsIconsMap: Record<string, any> = {
    FaReact,
    SiJavascript,
    SiNextdotjs,
    SiTypescript,
    RiTailwindCssFill, SiNodedotjs
};
interface HeroSectionProps {
    skills: LeanSkill[];
}

export default function SkillsHero({ skills }: HeroSectionProps) {
    console.log("skills", skills);

    const { data, isLoading, isError } = useSkillsHero()

    return (
        <div className="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start">
            {isLoading &&
                Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="w-32 h-10 rounded-lg animate-pulse   bg-white/80 dark:bg-gray-800/50   border border-gray-200 dark:border-gray-700 "
                    />
                ))}

            {skills?.map((skill: any) => {
                const Icon = skillsIconsMap[skill.icon];

                return (
                    <div
                        key={skill._id}
                        className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/50  border-gray-200 dark:border-gray-700  backdrop-blur-sm px-4 py-2 rounded-lg border"
                    >
                        {Icon && (
                            <Icon className={skill.color ? `text-${skill.color}` : 'text-transparent'} />
                        )}
                        <span>{skill.name}</span>
                    </div>
                );
            })}
        </div>

    )
}
