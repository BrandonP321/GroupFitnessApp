import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PageLoadingState {
    isLoading: boolean;
}

const initialState: PageLoadingState = {
    isLoading: false
}

/**
 * controls whether or not to show a loading spinner overlay over the page
 */
const pageLoadingSlice = createSlice({
    name: "loadingStatus",
    initialState,
    reducers: {
        showPageLoadingSpinner(state) {
            state.isLoading = true;
        },
        hidePageLoadingSpinner(state) {
            state.isLoading = false;
        },
        setIsPageLoading(state, action: PayloadAction<PageLoadingState>) {
            state.isLoading = action.payload.isLoading;
        }
    }
})

export const { showPageLoadingSpinner, hidePageLoadingSpinner, setIsPageLoading } = pageLoadingSlice.actions;
export default pageLoadingSlice.reducer;