import {configureStore} from '@reduxjs/toolkit'
import loginSlice from './reducers/loginSlice'
import userSlice from './reducers/userSlice'
import filterSlice from './reducers/filterSlice'

export const store = configureStore({
    reducer: {
        login: loginSlice,
        user: userSlice,
        filter: filterSlice
    }
})