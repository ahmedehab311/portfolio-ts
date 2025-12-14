import { useApiQuery } from "./useApiQuery";

export interface TSkillsHero {
    _id: string;
    name: string;
    icon: string;
    color: string;
    createdAt?: string;
    updatedAt?: string;
}

export const useSkillsHero = () =>
    useApiQuery<TSkillsHero[]>({
        key: ["skillsHero"],
        url: "/api/skills-hero",
    });
