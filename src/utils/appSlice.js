import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        isOpen: true,
        allVideos: [],
        category: "All"
    },
    reducers: {
        toggleSidebar(state) {
            state.isOpen = !state.isOpen;
        },
        setHomeVideos: (state, action) => {
            state.allVideos = action.payload;
        },
        setCategoryVideos:(state,action)=>{
            state.category = action.payload;
        }
    }
})

export const { toggleSidebar,setHomeVideos,setCategoryVideos } = appSlice.actions;
export default appSlice.reducer;