import { buildCreateSlice, asyncThunkCreator, createAsyncThunk } from '@reduxjs/toolkit'
import { readStringData, storeDataObject, storeDataString } from '../../utils/storageFunctions'
import fetchMalToken from '../../utils/fetchMalToken'


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
        userExpiresIn: null
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
                state.userRefreshToken = action.payload.refresh_token,
                state.userToken = action.payload.user_token
                state.isLogged = true
                
                // Also set the data in storage for the main window since the context is not avaiable in it
                storeDataObject('userToken', action.payload.user_token)
                storeDataObject('userRefreshToken', action.payload.refresh_token)
                storeDataObject('userExpiresIn', action.payload.expires_in)
                storeDataObject('isLogged', true)
                storeDataObject('isGuest', false)
            }
        })
    })
})

export const { setIsGuest, setIsLogged, fetchGuestState, fetchLoggedState, fetchUserTokens} = loginSlice.actions
export default loginSlice.reducer