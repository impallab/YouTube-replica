import { createSlice } from "@reduxjs/toolkit";

const liveChatSlice = createSlice({
    name: "liveChat",
    initialState: {
        messages: [],
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages.push(action.payload);
        },
        clearExtraMessages: (state) => {
            const maxMessagesToKeep = 35;
            state.messages = state.messages.slice(-maxMessagesToKeep);
        },
    },
});

export const { setMessages, clearExtraMessages } = liveChatSlice.actions;
export default liveChatSlice.reducer;