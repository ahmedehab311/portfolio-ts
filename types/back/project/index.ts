export interface TProjectSchema extends Document {
    title: string;
    description: string,
    category: string,
    projectStatus: string,
    image: string,
    codeUrl: string,
    demoUrl: string,
    order: number

}