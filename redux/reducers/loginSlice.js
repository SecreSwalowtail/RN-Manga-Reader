import { buildCreateSlice, asyncThunkCreator, createAsyncThunk } from '@reduxjs/toolkit'
import { readStringData, storeDataObject, storeDataString } from '../../utils/storageFunctions'
import fetchMalToken from '../../utils/fetchMalToken'
import { MangaDexApi } from '../../utils/axiosInstances'
import axios from 'axios'


const createSliceWithThunks = buildCreateSlice({
    creators: {
        asyncThunk: asyncThunkCreator
    }
})


const loginSlice = createSliceWithThunks({
    name: 'login',
    initialState: {
        isGuest: false,
        isLogged: false,
        isLoading: false,

        userToken: null,
        userRefreshToken: null,
        userExpiresIn: null,

        md_access_token: null,
        md_refresh_token: null,
    },
    reducers: create => ({
        setGuest: create.reducer((state, action) => {
            state.isGuest = action.payload
        }),
        setIsLogged: create.reducer((state, action) => {
            state.isLogged = action.payload
        }),
        fetchGuestState: create.asyncThunk(async (_, thunkApi) => {
            const response = await readStringData('isGuest')
            if (response) {
                return response
            } else {
                await storeDataString('isGuest', false)
                return false
            }
        }, {
            pending: state => {
                state.isLoading = true
            },
            rejected: (state, action) => {
                state.isLoading = false,
                    console.log(action.error)
            },
            fulfilled: (state, action) => {
                state.isLoading = false
                state.isGuest = action.payload
            }
        }),
        fetchLoggedState: create.asyncThunk(async (_, thunkApi) => {
            const response = await readStringData('isLogged')
            if (response) {
                return response
            } else {
                await storeDataString('isLogged', false)
                return false
            }
        }, {
            pending: state => { 
                state.isLoading = true
            },
            rejected: (state, action) => {
                state.isLoading = false
                console.log(action.error)
            },
            fulfilled: (state, action) => {
                state.isLoading = false
                state.isLogged = action.payload
            }
        }),
        fetchUserTokens: create.asyncThunk(async (args, thunkApi) => {
            // Destructure the object
            const {pcke, code} = args
            // Fetch the data and put it in a object
            const data = {expires_in, refresh_token, user_token} = await fetchMalToken(pcke, code)
            // Return it
            return data
        }, {
            pending: state => {
                state.isLoading = true
            },
            rejected: (state, action) => {
                state.isLoading = false
                console.log(action.error)
            },
            fulfilled: (state, action) => {
                state.isLoading = false
                state.userExpiresIn = action.payload.expires_in
                state.userRefreshToken = action.payload.refresh_token
                state.userToken = action.payload.user_token
                state.isLogged = true
                
                // Also set the data in storage for the main window since the context is not avaiable in it
                storeDataObject('userToken', action.payload.user_token)
                storeDataObject('userRefreshToken', action.payload.refresh_token)
                storeDataObject('userExpiresIn', action.payload.expires_in)
                storeDataObject('isLogged', true)
                storeDataObject('isGuest', false)
            }
        }),
        fetchMangaDexToken: create.asyncThunk(async (args, thunkApi) => {
            // Post the data to MangaDex
            const creds = {
                grant_type: 'password',
                username: process.env.EXPO_PUBLIC_MANGA_DEX_USERNAME,
                password: process.env.EXPO_PUBLIC_MANGA_DEX_PASSWORD,
                client_id: process.env.EXPO_PUBLIC_MANGA_DEX_CLIENT_ID,
                client_secret: process.env.EXPO_PUBLIC_MANGA_DEX_CLIENT_SECRET
            }

            const formData = new URLSearchParams(creds).toString();

            const resp = await axios({
                method: 'POST',
                url: `https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token`,
                data: formData
            })

            return { access_token, refresh_token } = resp.data;
        }, {
            pending: state => {
                state.isLoading = true
            },
            rejected: (state, action) => {
                state.isLoading = false
                console.log('Something happend on fetchMangaDexToken', action.error)
            },
            fulfilled: (state, action) => {
                state.isLoading = false
                console.log(action.payload)
                state.md_access_token = action.payload.access_token
                state.md_refresh_token = action.payload.refresh_token
            }
        })
    })
})

export const { setIsGuest, setIsLogged, fetchGuestState, fetchLoggedState, fetchUserTokens, fetchMangaDexToken} = loginSlice.actions
export default loginSlice.reducer