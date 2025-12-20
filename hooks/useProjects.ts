import { useApiQuery } from "./useApiQuery";

export interface TProjects {
    _id: string;
    title: string;
    description: string;
    category: string;
    projectStatus: string;
    image: string;
    codeUrl: string;
    demoUrl: string;
    order: number;
    tags:string[]
}

export const useProjects = () =>
    useApiQuery<TProjects[]>({
        key: ["projects"],
        url: "/api/projects",
    });
