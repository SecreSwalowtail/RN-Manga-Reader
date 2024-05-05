import { JikanApi } from "./axiosInstances";
import { useEffect, useState } from "react";

export default function useFetchMangaDescription(id) {
    const api = JikanApi()
    const [response, setResponse] = useState(null)
    let manga = []

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await api.get(`/manga/${id}`)
                if (response.status === 200) {
                    manga.push({
                        background: response.data.data.background,
                        score: response.data.data.score,
                        
                    })
                }
            } catch (e) {
                console.log('Error in getting the manga description:', e)
            }
        }
        fetch()
    }, [])

    return response
}