import { headers } from 'next/headers';


export async function vaildateApiKey() {
    const headerList = await headers()
    const clientSecret = headerList.get("api-secret")
    if (!clientSecret || clientSecret !== process.env.API_SECRET) return false
    return true
}