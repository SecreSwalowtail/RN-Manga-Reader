import { useEffect, useState } from "react"
import { JikanApi } from "./axiosInstances"

export default function useFetchCharacterDescription(id: string|string[]) {

    const api = JikanApi()
    const [response, setResponse] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            const response = await api.get(`/characters/${id}`)
            if (response.status === 200) {
                console.log(response.data.data)
            }
        }
        fetch()
    }, [])

    return response
}