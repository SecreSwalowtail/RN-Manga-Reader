import { MalApi } from "./axiosInstances";

export default async function refetchMalToken(refreshToken, expires_in) {
    let data
    const api = MalApi()
    
    const fetch = async () => {
        const params = {
            'client_id': process.env.EXPO_PUBLIC_CLIENT_ID,
            'grant_type': 'refresh_token',
            'refresh_token': refreshToken
        }

        try {
            const response = await api.post('token', params, {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                }
            })

            if (response.status === 200) {
                data = {
                    'user_token': response.data.access_token,
                    'refresh_token': response.data.refresh_token,
                    'expires_in': response.data.expires_in
                }
            }
        } catch (e) {
            console.log('Error while refetching refresh token', e)
        }
    }
    await fetch()
    return data
}