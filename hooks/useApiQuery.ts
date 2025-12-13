import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";


interface TUseApiQueryOptions {
    key: string[];
    url: string
}



export function useApiQuery<T>({ key, url }: TUseApiQueryOptions) {
    return useQuery({
        queryKey: key,
        queryFn: () => fetcher<T>(url),
    });
}