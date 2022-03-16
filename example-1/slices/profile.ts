import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProfileState {
    isLoading: boolean;
    isMyLoading: boolean;
    error: string;
    myError: string;
    success: boolean;
    profile: Record<string, any>;
    myProfile: Record<string, any>;
}

const initialState: ProfileState = {
    isLoading: true,
    isMyLoading: true,
    error: "",
    myError: "",
    success: false,
    profile: {},
    myProfile: {},
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        getProfilePending(state) {
            state.isLoading = true;
        },
        getProfileSuccess(
            state,
            action: PayloadAction<{
                profile: Record<string, any>;
            }>
        ) {
            const {
                payload: { profile },
            } = action;
            state.isLoading = false;
            state.profile = profile;
            state.error = "";
            state.success = true;
        },
        getProfileFail(
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
            state.success = false;
        },
        getMyProfileSuccess(
            state,
            action: PayloadAction<{
                myProfile: Record<string, any>;
            }>
        ) {
            const {
                payload: { myProfile },
            } = action;
            state.myProfile = myProfile;
            state.myError = "";
            state.isMyLoading = false;
        },
        freezeCourseProgress(
            state,
            action: PayloadAction<{
                courseName: string;
                progress: Record<string, string | number>;
            }>
        ) {
            const {
                payload: { courseName, progress },
            } = action;
            const updatedProfile = { ...state.myProfile };
            updatedProfile.progresses[courseName] = progress;
            state.myProfile = updatedProfile;
        },
        getMyProfileFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.myError = error;
            state.isMyLoading = false;
        },
    },
});

export const {
    freezeCourseProgress,
    getProfilePending,
    getProfileSuccess,
    getProfileFail,
    getMyProfileSuccess,
    getMyProfileFail,
} = profileSlice.actions;

export default profileSlice.reducer;
