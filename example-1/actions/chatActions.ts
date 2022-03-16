import firebase from "firebase";
import axios from "axios";
import {
    channelsSuccess,
    channelsFail,
    msgsFail,
    msgsSuccess,
    membersSuccess,
    membersFail,
    fileUploadFail,
    fileDownloadFail,
    fileDownloading,
    fileDownloaded,
} from "../slices/chat-ui";
import { Message, FileMessage } from "../../@types/chat";
import type { AppDispatch } from "../store";
import { getChannels, getMembers, sendMsg, sendFile } from "../../api/chat";
import firebaseService from "../../service";

export const Channels =
    (currentUser: firebase.User | null) => async (dispatch: AppDispatch) => {
        if (currentUser && currentUser.email) {
            try {
                await getChannels(currentUser.email).then(
                    (result) => {
                        const channels = result;
                        dispatch(channelsSuccess({ channels }));
                    },
                    (error) => {
                        console.error(error); // Stacktrace
                        dispatch(channelsFail({ error: error.message }));
                    }
                );
            } catch (error) {
                dispatch(channelsFail({ error: error.message }));
            }
        }
    };

// TODO rewrite in async await way in order to split logic between api and actions
// export const ChatListener =
//     (currentUser: firebase.User | null, activeChannelId: string) =>
//     async (dispatch: AppDispatch) => {
//         if (currentUser) {
//             try {
//                 const result: firebase.Unsubscribe = await subscribeToMessages(
//                     activeChannelId,
//                     dispatch
//                 );

//                 return result;
//             } catch (error) {
//                 return null;
//             }
//         }
//         return null;
//     };

// XXX Temporary solution
export const Messages =
    (currentUser: firebase.User | null, activeChannelId: string) =>
    (dispatch: AppDispatch) => {
        if (currentUser) {
            const unsubscribe = firebaseService.db
                .collection(`channels/${activeChannelId}/messages`)
                .orderBy("time", "asc")
                .limit(100)
                .onSnapshot(
                    (querySnapshot) => {
                        const messages: any[] = [];
                        querySnapshot.forEach((doc) => {
                            messages.push({
                                id: doc.id,
                                data: {
                                    ...doc.data(),
                                    time: doc.data().time.seconds,
                                },
                            });
                        });
                        dispatch(msgsSuccess({ msgs: messages }));
                    },
                    (error) => {
                        dispatch(msgsFail({ error: error.message }));
                    }
                );
            return unsubscribe;
        }
        return null;
    };

export const Members =
    (activeChannelId: string) => async (dispatch: AppDispatch) => {
        try {
            await getMembers(activeChannelId).then(
                (result) => {
                    const members = result;
                    dispatch(membersSuccess({ members }));
                },
                (error) => {
                    console.error(error); // Stacktrace
                    dispatch(membersFail({ error: error.message }));
                }
            );
        } catch (error) {
            dispatch(channelsFail({ error: error.message }));
        }
    };

export const sendMessage =
    (message: Message) => async (dispatch: AppDispatch) => {
        try {
            await sendMsg(message);
        } catch (error) {
            console.log(error.message);
            // dispatch(channelsFail({ error: error.message }));
        }
    };

export const uploadFile =
    (message: FileMessage) => async (dispatch: AppDispatch) => {
        try {
            await sendFile(message.file).then(
                async () => {
                    const newMessage: Message = {
                        activeChannelId: message.activeChannelId,
                        email: message.email,
                        username: message.username,
                        text: `/files/${message.file.name}`,
                        type: "file",
                    };
                    await sendMsg(newMessage);
                },
                (error) => {
                    dispatch(fileUploadFail({ error: error.message }));
                }
            );
        } catch (error) {
            console.log(error.message);
            dispatch(fileUploadFail({ error: error.message }));
        }
    };

export const downloadFile = (name: string) => async (dispatch: AppDispatch) => {
    dispatch(fileDownloading({ filePath: name }));
    try {
        await firebaseService.storage
            .ref(`files/${name}`)
            .getDownloadURL()
            .then((url: string) => {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                const download = axios({
                    url,
                    method: "GET",
                    responseType: "blob", // important
                }).then((response) => {
                    const newUrl = window.URL.createObjectURL(
                        new Blob([response.data])
                    );
                    const link = document.createElement("a");
                    link.href = newUrl;
                    link.setAttribute("download", name);
                    document.body.appendChild(link);
                    link.click();
                    dispatch(fileDownloaded());
                });
            })
            .catch((error) => {
                dispatch(fileDownloadFail({ error: error.message }));
            });
    } catch (error) {
        console.log(error.message);
        dispatch(fileDownloadFail({ error: error.message }));
    }
};
