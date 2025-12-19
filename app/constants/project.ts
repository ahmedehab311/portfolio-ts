export enum ProjectCategory {
    ALL = "all",
    HTML_CSS = "html-css",
    JAVASCRIPT = "javascript",
    REACT = "react",
    NEXTJS = "nextjs",
    FULLSTACK = "fullstack",
}

// Array of strings للاستخدام مع Zod
export const ProjectCategoryValues = Object.values(ProjectCategory);

export enum ProjectStatus {
    COMPLETED = "completed",
    IN_PROGRESS = "in-progress",
}

export const ProjectStatusValues = Object.values(ProjectStatus);
