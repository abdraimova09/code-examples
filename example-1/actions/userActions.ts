import { signupPending, signupSuccess, signupFail } from "../slices/signup";
import { loginPending, loginSuccess, loginFail } from "../slices/login";
import { resetPwPending, resetPwSuccess, resetPwFail } from "../slices/user";

import { LoginFormData, SignupFormData } from "../../@types/user";
import {
    userRegistration,
    userLogin,
    userRegistrationWithGoogleOauth,
    resetPw,
} from "../../api/user";

import type { AppDispatch } from "../store";

export const GoogleOauth =
    () =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            dispatch(signupPending());
            const result = await userRegistrationWithGoogleOauth();

            if (!result) {
                dispatch(signupFail({ error: "User is null" }));
            } else if (result.status === "success") {
                dispatch(signupSuccess());
            } else {
                dispatch(signupFail(result.message));
            }
        } catch (error) {
            dispatch(signupFail(error.message));
        }
    };

export const GoogleOauthLogin =
    () =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            dispatch(loginPending());
            const result = await userRegistrationWithGoogleOauth();

            if (!result) {
                dispatch(loginFail({ error: "User is null" }));
            } else if (result.status === "success") {
                dispatch(loginSuccess());
            } else {
                dispatch(loginFail(result.message));
            }
        } catch (error) {
            dispatch(loginFail(error.message));
        }
    };

export const Registration =
    (frmDt: SignupFormData) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            dispatch(signupPending());
            const result = await userRegistration(frmDt);

            if (result.status === "success") {
                dispatch(signupSuccess());
            } else {
                dispatch(signupFail(result.message));
            }
        } catch (error) {
            dispatch(signupFail(error.message));
        }
    };

export const Login =
    (frmData: LoginFormData) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            dispatch(loginPending());
            const { email, password } = frmData;
            const result: Record<string, any> | null = await userLogin({
                email,
                password,
            });
            if (result?.status === "error") {
                dispatch(loginFail({ error: result?.message }));
            } else {
                dispatch(loginSuccess());
            }
        } catch (error) {
            dispatch(loginFail({ error: error.message }));
        }
    };

export const ResetPassword =
    (email: string) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            dispatch(resetPwPending());

            const result: Record<string, string> = await resetPw(email);
            if (result.status === "error") {
                dispatch(resetPwFail({ error: result.message }));
            } else {
                dispatch(resetPwSuccess());
            }
        } catch (error) {
            dispatch(resetPwFail({ error: error.message }));
        }
    };
