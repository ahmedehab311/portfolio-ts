import axios from 'axios'

import { useQuery } from '@tanstack/react-query'
const fetchdescriptions = async () => {
    const result = await axios.get("http://localhost:3000/api/description")
    return result.data
}

export default function useDescriptionHero() {

    const query = useQuery({ queryKey: ['descriptionHero'], queryFn: fetchdescriptions })

    return query
}
