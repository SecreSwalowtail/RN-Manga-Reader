import { mangaVerseApi } from "./axiosInstances";
import { useEffect, useState } from "react";

export default function useFetchManga() {
    const api = mangaVerseApi()
    const [response, setResponse] = useState(null)
    let chapters = []

    useEffect(() => {

    }, [])

    return response
}