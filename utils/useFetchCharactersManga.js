import { useEffect, useState } from "react";
import { JikanApi } from "./axiosInstances";

export default function useFetchCharactersManga({id}) {
    const [response, setResponse] = useState(null)
    const api = JikanApi()
    let charactersArray = []

    useEffect(() => {
        const fetch = async () => {
            const response = await api.get(`/manga/${id}/characters`)
            if (response.status === 200) {
                //console.log(response.data.data)
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
        }
        fetch()
    }, [])

    return response
}