import { useState, useEffect } from "react";
import { JikanApi } from "./axiosInstances";

export default function useFetchTopMangas(type, filter, page = 1, limit = 15) {
    const api = JikanApi({ 'type': type, 'filter': filter, 'page': page, 'limit': limit })
    const [response, setResponse] = useState(null)
    let data = []

    useEffect(() => {
        const fetch = async () => {
            const response = await api.get('/top/manga')
            if (response.status === 200) {
                response.data.data.map((item) => {
                    data.push({
                        title: item.title,
                        image: item.images.jpg.large_image_url,
                        genre: item.genres.map((genre) => genre.name),
                        id: item.mal_id
                    })
                })
                setResponse(data)
            } else {
                setResponse(null)
            }
        }
        fetch()
    }, [])

    return response
}