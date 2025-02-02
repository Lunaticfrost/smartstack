// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import taskReducer from './slices/taskSlice';
import userReducer from './slices/userSlice';
import projectReducer from './slices/projectSlice';
import teamReducer from './slices/teamSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    users: userReducer,
    projects: projectReducer,
    teams: teamReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;