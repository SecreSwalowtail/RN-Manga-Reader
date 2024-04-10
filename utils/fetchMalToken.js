import { MalApi } from "./axiosInstances"

export default async function fetchMalToken(pcke, authCode) {
    let data
    const api = MalApi()

    const fetch = async () => {
        const param = {
            'client_id': process.env.EXPO_PUBLIC_CLIENT_ID,
            'code': authCode,
            'code_verifier': pcke,
            'grant_type': 'authorization_code',
        }
        try {
            const response2 = await api.post('token', param, {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                }
            })

            if (response2.status === 200) {
                data = {
                    'user_token': response2.data.access_token,
                    'refresh_token': response2.data.refresh_token,
                    'expires_in': response2.data.expires_in
                }
            }
        } catch (e) {
            console.log('Error in fetchMalToken', e)
        }
    }
    await fetch()
    return data
}