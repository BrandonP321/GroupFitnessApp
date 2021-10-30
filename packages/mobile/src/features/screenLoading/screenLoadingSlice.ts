import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ScreenLoadingState {
    isLoading: boolean;
}

const initialState: ScreenLoadingState = {
    isLoading: false
}

/**
 * controls whether or not to show a loading spinner overlay over the screen
 */
const screenLoadingSlice = createSlice({
    name: "loadingStatus",
    initialState,
    reducers: {
        showScreenLoadingSpinner(state) {
            state.isLoading = true;
        },
        hideScreenLoadingSpinner(state) {
            state.isLoading = false;
        },
        setIsScreenLoading(state, action: PayloadAction<ScreenLoadingState>) {
            state.isLoading = action.payload.isLoading;
        }
    }
})

export const { showScreenLoadingSpinner, hideScreenLoadingSpinner, setIsScreenLoading } = screenLoadingSlice.actions;
export default screenLoadingSlice.reducer;