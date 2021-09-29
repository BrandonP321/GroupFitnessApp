import { configureStore } from "@reduxjs/toolkit";
import responsiveReducer from "./responsive/responsiveSlice";
import pageLoadingReducer from "./pageLoading/pageLoadingSlice";

// automatically sets up a strore with the correct defaults
export const store = configureStore({
    reducer: {
        responsive: responsiveReducer,
        isLoading: pageLoadingReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;