import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'

const createSliceWithThunks = buildCreateSlice({
    creators: {
        asyncThunk: asyncThunkCreator
    }
})

const filterSlice = createSliceWithThunks({
    name: 'filter',
    initialState: {
        type: {
            manga: true,
            novel: false,
            lightnovel: false,
            oneshot: false,
            doujin: false,
            manhwa: false,
            manhua: false
        },
        filter: {
            publishing: false,
            upcoming: false,
            bypopularity: true,
            favorite: false,
        },
    },
    reducers: create => ({
        filterManga: create.reducer((state, action) => {
        const mangaTypes = ['manga', 'novel', 'lightnovel', 'oneshot', 'doujin', 'manhwa', 'manhua'];
        mangaTypes.forEach(type => {
            state.type[type] = action.payload === type;
        });
    }),
        filterSets: create.reducer((state, action) => {
        const setTypes = ['publishing', 'upcoming', 'bypopularity', 'favorite'];
        setTypes.forEach(type => {
            state.filter[type] = action.payload === type;
        });
    })
    })
})

export const { filterManga, filterSets } = filterSlice.actions
export default filterSlice.reducer