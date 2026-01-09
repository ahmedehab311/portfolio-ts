import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";


interface TUseApiQueryOptions<T> {
    key: string[];
    url: string
    options?: Omit<UseQueryOptions<T, Error, T, string[]>, 'queryKey' | 'queryFn'>;
}



export function useApiQuery<T>({ key, url, options }: TUseApiQueryOptions<T>) {
    return useQuery({
        queryKey: key,
        queryFn: () => fetcher<T>(url),
        ...options,
    });
}