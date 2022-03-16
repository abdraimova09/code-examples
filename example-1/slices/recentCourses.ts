import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum RecentCoursesStatus {
    Loaded,
    Loading,
    Unloaded,
}

export interface RecentCoursesState {
    areLoaded: RecentCoursesStatus;
    error: string;
    courses: any[];
}

const initialState: RecentCoursesState = {
    areLoaded: RecentCoursesStatus.Loading,
    error: "",
    courses: [],
};

const recentCoursesSlice = createSlice({
    name: "recentCourses",
    initialState,
    reducers: {
        recentCoursesSuccess(
            state,
            action: PayloadAction<{
                courses: any[];
            }>
        ) {
            const {
                payload: { courses },
            } = action;
            state.areLoaded = RecentCoursesStatus.Loaded;
            state.courses = courses;
            state.error = "";
        },
        recentCoursesFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.areLoaded = RecentCoursesStatus.Unloaded;
            state.error = error;
        },
    },
});

export const { recentCoursesSuccess, recentCoursesFail } =
    recentCoursesSlice.actions;
export default recentCoursesSlice.reducer;
