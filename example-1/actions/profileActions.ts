import {
    getProfilePending,
    getProfileSuccess,
    getProfileFail,
    getMyProfileSuccess,
    getMyProfileFail,
} from "../slices/profile";

import { getProfile, getMyProfile } from "../../api/profile";

import type { AppDispatch } from "../store";

export const Profile =
    (username: string) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            dispatch(getProfilePending());
            await getProfile(username).then(
                (result) => {
                    const profile = result as Record<string, any>[];
                    if (profile.length === 0) {
                        dispatch(
                            getProfileFail({
                                error: "Profile with this username not found",
                            })
                        );
                    } else {
                        dispatch(getProfileSuccess({ profile: profile[0] }));
                    }
                },
                (error) => {
                    dispatch(getProfileFail({ error: error.message }));
                }
            );
        } catch (error) {
            dispatch(getProfileFail({ error: error.message }));
        }
    };

export const MyProfile =
    (email: string) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            await getMyProfile(email).then(
                (result) => {
                    const profile = result as Record<string, any>;
                    dispatch(getMyProfileSuccess({ myProfile: profile }));
                },
                (error) => {
                    dispatch(getMyProfileFail({ error: error.message }));
                }
            );
        } catch (error) {
            dispatch(getMyProfileFail({ error: error.message }));
        }
    };
