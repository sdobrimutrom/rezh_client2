import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { LoginInput, RegistrationInput } from '../../types/user';
import { IStatus } from '../models/IStatus';
import { IUser } from '../models/IUser';
import { setUser } from '../reducers/userSlice';
import { commonApi } from './common.api';

const BASE_URL = process.env.REACT_APP_API_URL as string;

interface AuthResponse extends IStatus {
    access_token: string;
}

export const authApi = commonApi.injectEndpoints({
    endpoints: (builder) => ({
        registration: builder.mutation<AuthResponse, RegistrationInput>({
            query: (data) => ({
                url: 'registration',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('access_token', data.access_token);
                } catch (e) {
                    console.log(e);
                }
            }
        }),
        login: builder.mutation<AuthResponse, LoginInput>({
            query: (data) => ({
                url: 'login',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('access_token', data.access_token);
                } catch (e) {
                    console.log(e);
                }
            }
        }),
        getMe: builder.query<IUser, null>({
            query() {
                return { url: 'me', method: 'GET' };
            },
            transformResponse: (result: { data: { user: IUser } }) => result.data.user,
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (e) {
                    console.log(e);
                }
            }
        })
    })
});

export const { useRegistrationMutation, useLoginMutation, useGetMeQuery } = authApi;
