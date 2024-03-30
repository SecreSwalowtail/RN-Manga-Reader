import axios from 'axios';

export const JikanApi = (params = {}) => {
    return axios.create({
        baseURL: 'https://api.jikan.moe/v4',
        params: params
    })
}