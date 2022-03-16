import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum CareersStatus {
    Loaded,
    Loading,
    Unloaded,
}

export interface CareersState {
    areLoaded: CareersStatus;
    error: string;
    careers: any[];
}

const initialState: CareersState = {
    areLoaded: CareersStatus.Loading,
    error: "",
    careers: [],
};

const careerSlice = createSlice({
    name: "career",
    initialState,
    reducers: {
        careerSuccess(
            state,
            action: PayloadAction<{
                careers: any[];
            }>
        ) {
            const {
                payload: { careers },
            } = action;
            state.areLoaded = CareersStatus.Loaded;
            state.careers = careers;
            state.error = "";
        },
        careerFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.areLoaded = CareersStatus.Unloaded;
            state.error = error;
        },
    },
});

export const { careerSuccess, careerFail } = careerSlice.actions;
export default careerSlice.reducer;
