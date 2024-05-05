import { buildCreateSlice, asyncThunkCreator, createAsyncThunk } from '@reduxjs/toolkit'
import fetchUserData from '../../utils/fetchUserData'
import { readObjectData } from '../../utils/storageFunctions'

const createSliceWithThunks = buildCreateSlice({
    creators: {
        asyncThunk: asyncThunkCreator
    }
})

const userSlice = createSliceWithThunks({
    name: 'user',
    initialState: {
        accountData: null,
        allMangas: null,
        isLoading: false,
    },
     reducers: create => ({
        fetchData: create.asyncThunk(async (arg, thunkApi) => {
            const token = await readObjectData('userToken')
            const response = await fetchUserData(token, arg)
            return response
        }, {
            pending: state => {
                state.isLoading = true
            },
            rejected: (state, action) => {
                state.isLoading = false
                console.log(action.error)
            },
            fulfilled: (state, action) => {
                switch (action.payload.type) {
                    case '':
                        state.accountData = action.payload.data
                    case 'allMangas':
                        state.allMangas = action.payload.data
                }
            }
        })
     })
})

export const {fetchData} = userSlice.actions
export default userSlice.reducer