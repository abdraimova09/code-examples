import {
    createUserTask,
    deleteUserTask,
    editUserTask,
    getGroupEvents,
    markEvent,
    getMyDoneEvents,
} from "../../api/events";
import { useAppDispatch } from "../hooks";
import {
    getGroupEventsSuccess,
    getGroupEventsFail,
    markEventSuccess,
    markEventFail,
    setDoneEventsSuccess,
    setDoneEventsFail,
} from "../slices/event";
import { AppDispatch } from "../store";

export const GroupEvents =
    (groupId: string) => async (dispatch: AppDispatch) => {
        try {
            await getGroupEvents(groupId).then(
                (result: any) => {
                    dispatch(getGroupEventsSuccess({ groupEvents: result }));
                },
                (error) => {
                    dispatch(getGroupEventsFail({ error: error.message }));
                }
            );
        } catch (error) {
            dispatch(getGroupEventsFail({ error: error.message }));
        }
    };

export const MyDoneEvents =
    (uid: string, groupId: string) => async (dispatch: AppDispatch) => {
        try {
            await getMyDoneEvents(uid).then(
                (result: any) => {
                    dispatch(setDoneEventsSuccess({ events: result }));
                    return dispatch(GroupEvents(groupId));
                },
                (error) => {
                    dispatch(setDoneEventsFail({ error: error.message }));
                }
            );
        } catch (error) {
            dispatch(setDoneEventsFail({ error: error.message }));
        }
    };

export const DoOrUndoEvent =
    (eventId: string, uid: string, add: boolean) =>
    async (dispatch: AppDispatch) => {
        try {
            await markEvent(eventId, uid, add).then(
                (result: any) => {
                    dispatch(markEventSuccess({ eventId: result, add }));
                },
                (error) => {
                    dispatch(markEventFail({ error: error.message }));
                }
            );
        } catch (error) {
            dispatch(markEventFail({ error: error.message }));
        }
    };

export const UserTask =
    (
        title: string,
        description: string,
        startDate: string,
        endDate: string,
        startTime: string,
        endTime: string,
        userId: any
    ) =>
    async (dispatch: AppDispatch) => {
        const start = startTime ? `${startDate}T${startTime}` : startDate;
        const end = endTime ? `${endDate}T${endTime}` : endDate;
        try {
            await createUserTask(description, title, start, end, userId).then(
                (result) => {
                    console.log(result);
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

export const EditTask =
    (
        title: string,
        description: string,
        startDate: string,
        endDate: string,
        startTime: string,
        endTime: string,
        userId: any,
        docId: string,
        id: string
    ) =>
    async (dispatch: AppDispatch) => {
        console.log(startDate, startTime);
        console.log(endDate, endTime);
        const start = `${startDate}T${startTime}`;
        const end = `${endDate}T${endTime}`;
        try {
            await editUserTask(
                description,
                title,
                start,
                end,
                userId,
                docId,
                id
            ).then(
                (result) => {
                    console.log(result);
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

export const DeleteTask = (docId: string) => async (dispatch: AppDispatch) => {
    try {
        await deleteUserTask(docId).then(
            (result) => {
                console.log(result);
            },
            (error) => {
                console.log(error);
            }
        );
    } catch (error) {
        console.log(error);
    }
};
