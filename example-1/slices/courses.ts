import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum CoursesStatus {
    Loaded,
    Loading,
    Unloaded,
}

export interface CoursesState {
    areLoaded: CoursesStatus;
    error: string;
    courses: any[];
    allCourses: any[];
    filter: string;
    subject: string;
    filtered: boolean;
}

const initialState: CoursesState = {
    areLoaded: CoursesStatus.Loading,
    error: "",
    courses: [],
    allCourses: [],
    filter: "all",
    subject: "all",
    filtered: false,
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        coursesSuccess(
            state,
            action: PayloadAction<{
                courses: any[];
            }>
        ) {
            const {
                payload: { courses },
            } = action;
            state.areLoaded = CoursesStatus.Loaded;
            state.courses = courses;
            state.allCourses = courses;
            state.error = "";
        },
        coursesFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.areLoaded = CoursesStatus.Unloaded;
            state.error = error;
        },
        filterApplied(
            state,
            action: PayloadAction<{
                filtered: boolean;
            }>
        ) {
            const {
                payload: { filtered },
            } = action;
            state.filtered = filtered;
        },
        filterChanged(
            state,
            action: PayloadAction<{
                filter: string;
            }>
        ) {
            const {
                payload: { filter },
            } = action;
            state.filter = filter;
        },
        subjectChanged(
            state,
            action: PayloadAction<{
                subject: string;
            }>
        ) {
            const {
                payload: { subject },
            } = action;
            state.subject = subject;
        },
        coursesFiltered(
            state,
            action: PayloadAction<{
                courses: any[];
            }>
        ) {
            const {
                payload: { courses },
            } = action;
            state.courses = courses;
        },
    },
});

export const {
    coursesSuccess,
    coursesFail,
    filterChanged,
    subjectChanged,
    coursesFiltered,
    filterApplied,
} = coursesSlice.actions;
export default coursesSlice.reducer;
