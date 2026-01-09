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

// 1. لجلب كل المشاريع (بيانات خفيفة للكروت)
export const useProjects = () =>
    useApiQuery<TProjects[]>({
        key: ["projects"],
        url: "/api/projects",
        options: {
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        }
    });

export const useProjectDetails = (id: string | null, enabled: boolean = true) =>
    useApiQuery<TProjects>({
        key: ["project", id || ""],
        url: `/api/projects/${id}`,
        options: {
            enabled: enabled && !!id,
            staleTime: Infinity,
            refetchOnWindowFocus: false,
        }
    });