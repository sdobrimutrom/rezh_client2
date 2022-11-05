import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INews } from '../models/INews';

interface INewsState {
    news: INews | null;
    isLoading: boolean;
    error: string;
}

const initialState: INewsState = {
    news: null,
    isLoading: false,
    error: ''
};

export const newsSlice = createSlice({
    initialState,
    name: 'news',
    reducers: {
        setNews: (state, action: PayloadAction<INews>) => {
            state.news = action.payload;
        }
    }
});

export default newsSlice.reducer;

export const { setNews } = newsSlice.actions;
