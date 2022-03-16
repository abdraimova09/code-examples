import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
    isLoading: boolean;
    isAuth: boolean;
    error: string;
}

const initialState: LoginState = {
    isLoading: false,
    isAuth: false,
    error: "",
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginPending(state) {
            state.isLoading = true;
        },
        loginSuccess(state) {
            state.isLoading = false;
            state.isAuth = true;
            state.error = "";
        },
        loginFail(
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

export const { loginPending, loginSuccess, loginFail } = loginSlice.actions;
export default loginSlice.reducer;
