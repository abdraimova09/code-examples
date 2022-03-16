/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPerson {
    image?: string;
    bg?: string;
    status: "online" | "offline";
    name: string;
}

export interface UIState {
    activeChannel: string;
    activeChannelId: string;
    chatType: "channel" | "direct";
    person?: IPerson;
    rightSidebar?: boolean;
    channels: any[];
    members: any[];
    groups: any[];
    direct: any[];
    msgs: any[];
    channelsError?: string;
    membersError?: string;
    channelsLoaded: boolean;
    membersLoaded: boolean;
    msgsLoaded: boolean;
    msgsError?: string;
    fileUploadError?: string;
    fileDownloadError?: string;
    fileDownloading?: string;
}

const initialState: UIState = {
    activeChannel: "",
    activeChannelId: "",
    chatType: "channel",
    rightSidebar: true,
    channels: [],
    members: [],
    groups: [],
    direct: [],
    msgs: [],
    channelsLoaded: false,
    membersLoaded: false,
    msgsLoaded: false,
};

const chatUISlice = createSlice({
    name: "chatUI",
    initialState,
    reducers: {
        msgsSuccess(
            state,
            action: PayloadAction<{
                msgs: any[];
            }>
        ) {
            const {
                payload: { msgs },
            } = action;
            state.msgs = msgs;
            state.msgsLoaded = true;
        },
        msgsFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.msgsError = error;
        },
        membersSuccess(
            state,
            action: PayloadAction<{
                members: any[];
            }>
        ) {
            const {
                payload: { members },
            } = action;
            state.members = members;
            state.membersLoaded = true;
        },
        membersFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.membersError = error;
        },
        channelsSuccess(
            state,
            action: PayloadAction<{
                channels: any[];
            }>
        ) {
            const {
                payload: { channels },
            } = action;
            state.channels = channels;
            state.groups = channels.filter(
                (channel) => channel.data.type === "group"
            );
            state.direct = channels.filter(
                (channel) => channel.data.type === "direct"
            );
            state.channelsLoaded = true;
        },
        channelsFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.channelsError = error;
        },
        toggleChannel(
            state,
            action: PayloadAction<{
                activeChannel: string;
                activeChannelId: string;
            }>
        ) {
            const {
                payload: { activeChannel, activeChannelId },
            } = action;
            state.rightSidebar = true;
            state.activeChannel = activeChannel;
            state.activeChannelId = activeChannelId;
            state.chatType = "channel";
            state.membersLoaded = false;
        },
        togglePerson(
            state,
            action: PayloadAction<{
                person: IPerson;
                activeChannel: string;
                activeChannelId: string;
            }>
        ) {
            const {
                payload: { person, activeChannel, activeChannelId },
            } = action;
            state.person = person;
            state.chatType = "direct";
            state.rightSidebar = false;
            state.activeChannel = activeChannel;
            state.activeChannelId = activeChannelId;
        },
        toggleSidebar(state) {
            state.rightSidebar = !state.rightSidebar;
        },
        fileUploadFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.fileUploadError = error;
        },
        fileDownloadFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.fileDownloadError = error;
            state.fileDownloading = undefined;
        },
        fileDownloading(
            state,
            action: PayloadAction<{
                filePath: string;
            }>
        ) {
            const {
                payload: { filePath },
            } = action;
            state.fileDownloading = filePath;
        },
        fileDownloaded(state) {
            state.fileDownloading = undefined;
        },
    },
});

export const {
    toggleChannel,
    togglePerson,
    toggleSidebar,
    channelsSuccess,
    channelsFail,
    msgsSuccess,
    msgsFail,
    membersSuccess,
    membersFail,
    fileUploadFail,
    fileDownloadFail,
    fileDownloading,
    fileDownloaded,
} = chatUISlice.actions;
export default chatUISlice.reducer;
