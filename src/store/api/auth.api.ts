import { IStatus } from '../models/IStatus';
import { IUser, ILoginInput, IRegistrationInput } from '../models/IUser';
import { setUser } from '../reducers/userSlice';
import { commonApi } from './common.api';

interface AuthResponse extends IStatus {
    access_token: string;
}

export const authApi = commonApi.injectEndpoints({
    endpoints: (builder) => ({
        registration: builder.mutation<AuthResponse, IRegistrationInput>({
            query: (data) => ({
                url: 'auth/registration',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('access_token', data.access_token);
                    const getMe = await dispatch(authApi.endpoints.getMe.initiate(null));
                } catch (e) {
                    console.log(e);
                }
            },
        }),
        login: builder.mutation<AuthResponse, ILoginInput>({
            query: (data) => ({
                url: 'auth/login',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('access_token', data.access_token);
                    const getMe = await dispatch(authApi.endpoints.getMe.initiate(null));
                } catch (e) {
                    console.log(e);
                }
            },
        }),
        getMe: builder.query<IUser, null>({
            query() {
                return { url: 'users/me', method: 'GET' };
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (e) {
                    console.log(e);
                }
            },
        }),
    }),
});

export const { useRegistrationMutation, useLoginMutation, useGetMeQuery } = authApi;
