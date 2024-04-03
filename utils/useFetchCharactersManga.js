import { useEffect, useState } from "react";
import { JikanApi } from "./axiosInstances";

export default function useFetchCharactersManga(id) {
    const [response, setResponse] = useState(null)
    const api = JikanApi()
    let charactersArray = []

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await api.get(`/manga/${id}/characters`)
                if (response.status === 200) {
                    response.data.data.map((item) => {
                        charactersArray.push({
                            'character': item.character.name,
                            'role': item.role,
                            'id': item.character.mal_id,
                            'image': item.character.images.jpg.image_url,
                        })
                    })
                    setResponse(charactersArray)
                }
            } catch (e) {
                console.log('Error in getting characters from manga: ', e)
            }
        }
        fetch()
    }, [])

    return response
}