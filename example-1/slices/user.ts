import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    isLoading: boolean;
    error: string;
    success: boolean;
}

const initialState: UserState = {
    isLoading: false,
    error: "",
    success: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetPwPending(state) {
            state.isLoading = true;
        },
        resetPwSuccess(state) {
            state.isLoading = false;
            state.error = "";
            state.success = true;
        },
        resetPwFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.isLoading = false;
            state.error = error;
        },
    },
});

export const { resetPwPending, resetPwSuccess, resetPwFail } =
    userSlice.actions;

export default userSlice.reducer;
