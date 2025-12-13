// import axios from 'axios'

import { useApiQuery } from "./useApiQuery";

export interface TDescription {
    _id: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}

export const useDescriptionHero = () =>
    useApiQuery<TDescription>({
        key: ["descriptionHero"],
        url: "/api/description",
    });
