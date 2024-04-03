import { useEffect, useState } from "react"
import { JikanApi } from "./axiosInstances"

export default function useFetchCharacterDescription(id) {

    const api = JikanApi()
    const [response, setResponse] = useState(null)
    const aboutArray = []

    useEffect(() => {
        const fetch = async () => {
            try {
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
                } else {
                    console.log(response.data)
                }
            } catch (e) {
                console.log('Error in getting character description: ', e)
            }
        }
        fetch()
    }, [])

    return response
}