import { MalApiUser } from "./axiosInstances"

export default async function fetchUserData(token, type = '') {
    let data
    const api = MalApiUser(token)

    const fetch = async () => {
        try {
            const response = await api.get(type)
            if (response.status === 200) {
                data = response.data
            }
        } catch (e) {
            console.log('Error in getting the user data')
        }
    }

    await fetch()
    return {type, data}
}