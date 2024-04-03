import { buildCreateSlice, asyncThunkCreator, createAsyncThunk } from '@reduxjs/toolkit'
import { avatarApi } from '~/utils/axiosInstances'
import { readStringData, storeDataString } from '~/utils/storageFunctions'


const createSliceWithThunks = buildCreateSlice({
    creators: {
        asyncThunk: asyncThunkCreator
    }
})

const api = avatarApi()

const loginSlice = createSliceWithThunks({
    name: 'login',
    initialState: {
        isGuest: false,
        isLogged: false,
        isLoading: false,
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
    })
})

export const { setIsGuest, setIsLogged, fetchGuestState, fetchLoggedState} = loginSlice.actions
export default loginSlice.reducer