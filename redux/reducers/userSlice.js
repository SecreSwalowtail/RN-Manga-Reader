// Slice for My Anime List data if we return valid thing from loginSlice
import { buildCreateSlice, asyncThunkCreator, createAsyncThunk } from '@reduxjs/toolkit'

const refreshUserToken = async (client_id, refresh_token, refresh_time) => {
    // Convert the refresh time to a future date
}

const createSliceWithThunks = buildCreateSlice({
    creators: {
        asyncThunk: asyncThunkCreator
    }
})

const userSlice = createSliceWithThunks({
    name: 'user',
    initialState: {
        test: null
    },
     reducers: create => ({
        
     })
})