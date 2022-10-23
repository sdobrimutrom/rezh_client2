import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authApi } from './api/auth';
import userReducer from './reducers/userSlice';

const rootReducer = combineReducers({
    userReducer,
    [authApi.reducerPath]: authApi.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
