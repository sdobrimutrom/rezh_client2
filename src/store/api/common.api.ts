import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const BASE_URL = process.env.REACT_APP_API_URL as string;

export const commonApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('access_token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['News', 'User'],
    endpoints: (_) => ({})
});
