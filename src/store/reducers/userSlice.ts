import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../models/IUser';

interface IUserState {
    user: IUser | null;
    isLoading: boolean;
    error: string;
}

const initialState: IUserState = {
    user: null,
    isLoading: false,
    error: ''
};

export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        logout: () => initialState,
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        }
    },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;
