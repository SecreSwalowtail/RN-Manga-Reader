import axios from 'axios';

export const JikanApi = (params = {}) => {
    return axios.create({
        baseURL: 'https://api.jikan.moe/v4',
        params: params
    })
}

export const mangaVerseApi = (params = {}) => {
    return axios.create({
        baseURL: 'https://mangaverse-api.p.rapidapi.com/',
        params: params,
        headers: {
            'X-RapidAPI-Key': '092cd98880mshc0314f55aeb138fp19fc5fjsnbf6977d7a8f9',
            'X-RapidAPI-Host': 'mangaverse-api.p.rapidapi.com'
        }
    })
}

export const avatarApi = () => {
    return axios.create({
        baseURL: 'https://ui-avatars.com/api/?name=Guest+Account'
    })
}

export const MalApi = () => {
    return axios.create({
        baseURL: 'https://myanimelist.net/v1/oauth2/',
    })
}