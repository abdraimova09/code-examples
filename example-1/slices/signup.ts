import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SignupState {
    isLoading: boolean;
    isAuth: boolean;
    error: string;
}

const initialState: SignupState = {
    isLoading: false,
    isAuth: false,
    error: "",
};

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        signupPending(state) {
            state.isLoading = true;
        },
        signupSuccess(state) {
            state.isLoading = false;
            state.isAuth = true;
            state.error = "";
        },
        signupFail(
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

export const { signupPending, signupSuccess, signupFail } = signupSlice.actions;
export default signupSlice.reducer;
