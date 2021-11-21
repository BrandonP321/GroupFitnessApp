import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    accessToken?: string;
}

const initialState: UserState = {

}

/**
 * controls whether or not to show a loading spinner overlay over the screen
 */
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        storeAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload;
        }
    }
})

export const { storeAccessToken } = userSlice.actions;
export default userSlice.reducer;