import api from "./axios"

export const fetcher = async <T>(url: string): Promise<T> => {
    const res = await api.get(url)
    return res.data.data;
}