import { configureStore } from '@reduxjs/toolkit';
import appReducer from "./appSlice";
import liveChatReducer from './liveChatSlice';

const store = configureStore({
    reducer: {
        app: appReducer,
        liveChat: liveChatReducer
    }
});
export default store;
