import { commonApi } from './common.api';
import { IModerateRequestDto, IRequest, IRequestsQueryParams } from '../models/IRequest';
import { IAnswer } from '../models/IAnswer';

export const requestsApi = commonApi.injectEndpoints({
    endpoints: (builder) => ({
        getRequests: builder.query<{ count: number; rows: IRequest[] }, IRequestsQueryParams>({
            query: ({ limit, page, query, order }) => ({
                url: 'requests',
                body: {
                    limit,
                    page,
                    query,
                    order,
                },
            }),
            providesTags: ['Requests', 'Answers'],
        }),
        getRequest: builder.query<IRequest, number | undefined>({
            query: (id) => `requests/${ id }`,
            providesTags: ['Requests', 'Answers'],
        }),
        addRequest: builder.mutation<IRequest, FormData>({
            query: (request) => ({
                url: 'requests',
                method: 'POST',
                body: request,
            }),
            invalidatesTags: ['Requests'],
        }),
        deleteRequest: builder.mutation<string, { id: number }>({
            query: ({ id }) => ({
                url: `requests/${ id }`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Requests'],
        }),
        editRequest: builder.mutation<IRequest, FormData>({
            query: (request) => ({
                url: `requests/${ request.get('id') }`,
                method: 'PATCH',
                body: request,
            }),
            invalidatesTags: ['Requests'],
        }),
        moderateRequest: builder.mutation<IRequest, IModerateRequestDto>({
            query: (moderateDto) => ({
                url: `requests/moderate/${ moderateDto.id }`,
                method: 'PUT',
                body: moderateDto,
            }),
            invalidatesTags: ['Requests'],
        }),
        addAnswer: builder.mutation<IAnswer, FormData>({
            query: (answer) => ({
                url: `requests_answers/${ answer.get('request_id') }`,
                method: 'POST',
                body: answer,
            }),
            invalidatesTags: ['Answers', 'Requests'],
        }),
        deleteAnswer: builder.mutation<string, { id: number }>({
            query: ({ id }) => ({
                url: `requests_answers/${ id }`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Answers', 'Requests'],
        }),
    }),
});

export const {
    useGetRequestsQuery,
    useGetRequestQuery,
    useAddRequestMutation,
    useModerateRequestMutation,
    useEditRequestMutation,
    useDeleteRequestMutation,
    useAddAnswerMutation,
    useDeleteAnswerMutation,
} = requestsApi;
