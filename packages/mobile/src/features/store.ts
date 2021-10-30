import { configureStore } from "@reduxjs/toolkit";
import pageLoadingReducer from "./screenLoading/screenLoadingSlice";

// sets up a strore with the correct defaults
export const store = configureStore({
    reducer: {
        isLoading: pageLoadingReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;