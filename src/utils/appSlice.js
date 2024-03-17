import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        isOpen: true
    },
    reducers: {
        toggleSidebar(state) {
            state.isOpen = !state.isOpen;
        }
    }
})

export const { toggleSidebar } = appSlice.actions;
export default appSlice.reducer;