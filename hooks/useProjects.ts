import { useApiQuery } from "./useApiQuery";

export interface TProjects {
    _id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    category: string;
    projectStatus: string;
    mainImage: string;
    gallery: string[];
    features: string[];
    challenges: string[];
    techStack: string[];
    tags: string[];
    codeUrl: string;
    demoUrl: string;
    order: number;
    createdAt?: string;
    updatedAt?: string;
}

export const useProjects = () =>
    useApiQuery<TProjects[]>({
        key: ["projects"],
        url: "/api/projects",
    });
