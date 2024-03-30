import { useEffect, useState } from "react"
import { JikanApi } from "./axiosInstances"

export default function useFetchCharacterDescription(id: string | string[]) {

    const api = JikanApi()
    const [response, setResponse] = useState(null)
    const aboutArray: any = []

    useEffect(() => {
        const fetch = async () => {
            const response = await api.get(`/characters/${id}/full`)
            console.log(response.data.data)
            if (response.status === 200) {
                aboutArray.push({
                    'about': response.data.data.about,
                    'kanji_name': response.data.data.name_kanji,
                    'nicknames': response.data.data.nicknames[0],
                    'image': response.data.data.images.jpg.image_url,
                    'url': response.data.data.url
                })
                setResponse(aboutArray)
            }
        }
        fetch()
    }, [])

    return response
}