import { useState, useEffect } from "react";
import axios from 'axios'
import { JikanApi } from "./axiosInstances";

export default function useFetchTopMangas(type: String, filter: String, page: Number = 1, limit: Number = 15) {
    const api = JikanApi({ 'type': type, 'filter': filter, 'page': page, 'limit': limit })
    const [response, setResponse] = useState(null)
    let data: any = []

    useEffect(() => {
        const fetch = async () => {
            const response = await api.get('/top/manga')
            if (response.status === 200) {
                response.data.data.map((item: any) => {
                    data.push({
                        title: item.title,
                        image: item.images.jpg.large_image_url,
                        genre: item.genres.map((genre:any) => genre.name),
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