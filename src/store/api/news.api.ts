import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { INews, INewsQueryParams } from '../models/INews';
import { commonApi } from './common.api';

export const newsApi = commonApi.injectEndpoints({
    endpoints: (builder) => ({
        getNews: builder.query<{ count: number; rows: INews[] }, INewsQueryParams>({
            query: ({ limit, page, query, order }) => ({
                url: 'news',
                params: {
                    limit,
                    page,
                    query,
                    order
                }
            }),
            providesTags: ['News']
        }),
        getNewsItem: builder.query<INews, { id: number }>({
            query: ({ id }) => `news/${id}`,
            providesTags: ['News']
        }),
        addNews: builder.mutation<INews, FormData>({
            query: (news) => ({
                url: 'news',
                method: 'POST',
                body: news
            }),
            invalidatesTags: ['News']
        }),
        deleteNews: builder.mutation<string, { id: number }>({
            query: ({ id }) => ({
                url: `news/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['News']
        }),
        editNews: builder.mutation<INews, FormData>({
            query: (news) => ({
                url: `news/${news.get('id')}`,
                method: 'PUT',
                body: news
            }),
            invalidatesTags: ['News']
        })
    })
});

export const { useGetNewsQuery, useGetNewsItemQuery, useAddNewsMutation, useEditNewsMutation, useDeleteNewsMutation } =
    newsApi;
