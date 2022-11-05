import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { commonApi } from './api/common.api';
import userReducer from './reducers/userSlice';

const rootReducer = combineReducers({
    userReducer,
    [commonApi.reducerPath]: commonApi.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(commonApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
