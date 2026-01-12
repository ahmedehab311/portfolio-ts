export interface TProjectSchema extends Document {
    title: string;
    shortDescription: string;
    fullDescription: string;
    category: string;
    projectStatus: string;
    mainImage?: string;
    gallery: string[];
    features: string[];
    challenges: string[];
    techStack: string[]; // عدلناها هنا كمان لتطابق الـ Zod
    codeUrl: string;
    demoUrl: string;
    order: number;
    tags: string[];
    deletedAt: Date | null;
}