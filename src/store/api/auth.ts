import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { LoginInput, RegistrationInput } from '../../types/user';
import { IStatus } from '../models/IStatus';
import { IUser } from '../models/IUser';
import { setUser } from '../reducers/userSlice';

const BASE_URL = process.env.REACT_APP_API_URL as string;

interface AuthResponse extends IStatus {
    access_token: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/auth/`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('access_item');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        registration: builder.mutation<AuthResponse, RegistrationInput>({
            query: (data) => ({
                url: 'registration',
                method: 'POST',
                body: data
            })
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
