import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        isOpen: false,
        allVideos: [],
        category: "All",
        searchSuggestion: []
    },
    reducers: {
        toggleSidebar(state) {
            state.isOpen = !state.isOpen;
        },
        setHomeVideos: (state, action) => {
            state.allVideos = action.payload;
        },
        setCategoryVideos: (state, action) => {
            state.category = action.payload;
        },
        setSearchSuggesion: (state, action) => {
            state.searchSuggestion = action.payload
        }
    }
})

export const { toggleSidebar, setHomeVideos, setCategoryVideos, setSearchSuggesion } = appSlice.actions;
export default appSlice.reducer;