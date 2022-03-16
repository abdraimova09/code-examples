import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { IEvent, IEventCategory } from "../../@types/events";

// Define a type for the slice state

export interface EvenState {
    eventSources: IEventCategory[];
    permanentEventSources: IEventCategory[];
    groups: string[];
    currentGroupId?: string;
    getGroupEventsError?: string;
    setDoneEventsError?: string;
    markEventError?: string;
    activeEventCategory: string;
    currentDateString: string;
    doneEvents: Record<string, any>;
}

const taskEvents: IEventCategory = {
    category: "task",
    backgroundColor: "#d9e8ff",
    borderColor: "#0168fa",
    events: [],
};

const deadlineEvents: IEventCategory = {
    category: "deadline",
    backgroundColor: "#fcbfdc",
    borderColor: "#f10075",
    events: [],
};

const holidayEvents: IEventCategory = {
    category: "holiday",
    backgroundColor: "#c3edd5",
    borderColor: "#10b759",
    events: [],
};

const meetupEvents: IEventCategory = {
    category: "meetup",
    backgroundColor: "#dedafe",
    borderColor: "#5b47fb",
    events: [],
};

const otherEvents: IEventCategory = {
    category: "other",
    backgroundColor: "#ffdec4",
    borderColor: "#fd7e14",
    events: [],
};

// // Define the initial state using that type
const initialState: EvenState = {
    eventSources: [
        taskEvents,
        deadlineEvents,
        holidayEvents,
        meetupEvents,
        otherEvents,
    ],
    permanentEventSources: [],
    groups: [],
    activeEventCategory: "",
    currentDateString: "",
    doneEvents: {},
};

interface IEventState {
    id: string;
    title: string;
    start: string;
    end: string;
    category: string;
    description?: string;
}

const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        createEvent: {
            reducer: (state, action: PayloadAction<IEventState>) => {
                const {
                    payload: { category, ...data },
                } = action;
                const source = state.eventSources.find(
                    (src) => src.category === category
                );

                source?.events.push(data);
            },
            prepare: (
                title: string,
                startDate: string,
                endDate: string,
                category: string,
                startTime?: string,
                endTime?: string,
                description?: string
            ) => {
                const start = startTime
                    ? `${startDate}T${startTime}:00`
                    : startDate;
                const end = endTime ? `${endDate}T${endTime}:00` : endDate;
                const data = {
                    id: uuidv4(),
                    title,
                    start,
                    end,
                    description,
                    category,
                };
                return { payload: { ...data } };
            },
        },
        editEvent: {
            reducer: (state, action: PayloadAction<IEventState>) => {
                const {
                    payload: { category, ...data },
                } = action;
                const source = state.eventSources.find(
                    (src) => src.category === category
                );
                if (source) {
                    const index = source.events.findIndex(
                        (el) => el.id === data.id
                    );
                    if (index !== undefined && index >= 0) {
                        source.events[index] = data;
                    }
                }
            },
            prepare: (
                id,
                title: string,
                startDate: string,
                endDate: string,
                category: string,
                startTime?: string,
                endTime?: string,
                description?: string
            ) => {
                const start = startTime
                    ? `${startDate}T${startTime}:00`
                    : startDate;
                const end = endTime ? `${endDate}T${endTime}:00` : endDate;
                const data = {
                    category,
                    id,
                    title,
                    start,
                    end,
                    description,
                };
                return { payload: { ...data } };
            },
        },
        deleteEvent: (
            state,
            action: PayloadAction<{ id: string; category: string }>
        ) => {
            const {
                payload: { id, category },
            } = action;
            const source = state.eventSources.find(
                (src) => src.category === category
            );
            if (source) {
                const index = source.events.findIndex((el) => el.id === id);
                if (index !== undefined && index >= 0) {
                    source.events.splice(index, 1);
                }
            }
        },
        setGroups(
            state,
            action: PayloadAction<{
                groups: string[];
            }>
        ) {
            const {
                payload: { groups },
            } = action;
            state.groups = groups;
            [state.currentGroupId] = groups;
        },
        changeGroup(state) {
            state.permanentEventSources = [];
            state.eventSources = [
                taskEvents,
                deadlineEvents,
                holidayEvents,
                meetupEvents,
                otherEvents,
            ];
        },
        getGroupEventsSuccess(
            state,
            action: PayloadAction<{
                groupEvents: IEvent[];
            }>
        ) {
            const {
                payload: { groupEvents },
            } = action;

            groupEvents.forEach((event) => {
                event.extendedProps = {};
                if (event.id in state.doneEvents) {
                    event.extendedProps.status = "done";
                }
                switch (event.category) {
                    case "task":
                        state.eventSources
                            .filter((x) => x.category === "task")[0]
                            .events.push(event);
                        break;
                    case "holiday":
                        state.eventSources
                            .filter((x) => x.category === "holiday")[0]
                            .events.push(event);
                        break;
                    case "meetup":
                        state.eventSources
                            .filter((x) => x.category === "meetup")[0]
                            .events.push(event);
                        break;
                    case "deadline":
                        state.eventSources
                            .filter((x) => x.category === "deadline")[0]
                            .events.push(event);
                        break;
                    case "other":
                        state.eventSources
                            .filter((x) => x.category === "other")[0]
                            .events.push(event);
                        break;
                    default:
                        state.eventSources
                            .filter((x) => x.category === "other")[0]
                            .events.push(event);
                }
            });
            state.permanentEventSources = state.eventSources;
            state.getGroupEventsError = undefined;
        },
        getGroupEventsFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.getGroupEventsError = error;
        },
        filterEvents(
            state,
            action: PayloadAction<{
                filter: string | null;
            }>
        ) {
            const {
                payload: { filter },
            } = action;
            if (filter) {
                state.activeEventCategory = filter;
                state.eventSources = state.permanentEventSources.map(
                    (source) => {
                        if (source.category !== filter) {
                            return { ...source, events: [] };
                        }
                        return source;
                    }
                );
            }
        },
        clearFilter(state) {
            state.activeEventCategory = "";
            state.eventSources = state.permanentEventSources;
        },
        goToDate(
            state,
            action: PayloadAction<{
                date: string;
            }>
        ) {
            const {
                payload: { date },
            } = action;
            state.currentDateString = date;
        },
        setDoneEventsSuccess(
            state,
            action: PayloadAction<{
                events: Record<string, any>;
            }>
        ) {
            const {
                payload: { events },
            } = action;

            state.setDoneEventsError = undefined;
            state.doneEvents = events;
        },
        setDoneEventsFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.setDoneEventsError = error;
        },
        markEventSuccess(
            state,
            action: PayloadAction<{
                eventId: string;
                add: boolean;
            }>
        ) {
            const {
                payload: { eventId, add },
            } = action;
            if (add) {
                const created = Math.floor(Date.now() / 1000);
                const doneEventsCopy = {
                    ...state.doneEvents,
                };
                state.eventSources.forEach((source) => {
                    source.events.forEach((event) => {
                        if (event.id === eventId) {
                            event.extendedProps = {};
                            event.extendedProps.status = "done";
                        }
                    });
                });
                doneEventsCopy[eventId] = created;
                state.doneEvents = doneEventsCopy;
            } else {
                const doneEventsCopy = {
                    ...state.doneEvents,
                };
                state.eventSources.forEach((source) => {
                    source.events.forEach((event) => {
                        if (event.id === eventId) {
                            event.extendedProps = {};
                        }
                    });
                });
                delete doneEventsCopy[eventId];
                state.doneEvents = doneEventsCopy;
            }
            state.permanentEventSources = state.eventSources;
        },
        markEventFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.markEventError = error;
        },
    },
});

export const {
    markEventFail,
    setDoneEventsSuccess,
    setDoneEventsFail,
    markEventSuccess,
    goToDate,
    clearFilter,
    filterEvents,
    changeGroup,
    createEvent,
    editEvent,
    deleteEvent,
    setGroups,
    getGroupEventsSuccess,
    getGroupEventsFail,
} = eventSlice.actions;

export default eventSlice.reducer;
