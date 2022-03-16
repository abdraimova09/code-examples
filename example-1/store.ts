import { configureStore, combineReducers } from "@reduxjs/toolkit";
import eventReducer from "./slices/event";
import uiReducer from "./slices/ui";
import chatUISlice from "./slices/chat-ui";
import loginReducer from "./slices/login";
import signupReducer from "./slices/signup";
import userReducer from "./slices/user";
import careerReducer from "./slices/career";
import recentCoursesReducer from "./slices/recentCourses";
import coursesReducer from "./slices/courses";
import profileReducer from "./slices/profile";
import ideReducer from "./slices/ide";

const rootReducer = combineReducers({
    events: eventReducer,
    ui: uiReducer,
    chatUI: chatUISlice,
    login: loginReducer,
    signup: signupReducer,
    user: userReducer,
    career: careerReducer,
    recentCourses: recentCoursesReducer,
    courses: coursesReducer,
    profile: profileReducer,
    ide: ideReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
