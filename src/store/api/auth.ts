import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { LoginInput, RegistrationInput } from '../../types/user';
import { IStatus } from '../models/IStatus';
import { IUser } from '../models/IUser';

const BASE_URL = process.env.REACT_APP_API_URL as string;

interface AuthResponse extends IStatus {
    access_token: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/auth/`
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
            })
        })
    })
});

export const { useRegistrationMutation, useLoginMutation } = authApi;
