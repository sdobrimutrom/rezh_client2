import { commonApi } from './common.api';
import { IUser, IUsersQueryParams } from '../models/IUser';

export const usersApi = commonApi.injectEndpoints({
    endpoints: (builder) => ({
        getDeputats: builder.query<{ count: number; rows: IUser[] }, IUsersQueryParams>({
            query: ({ limit, page }) => ({
                url: 'users/deputats',
                method: 'POST',
                body: {
                    limit,
                    page,
                },
            }),
        }),
        editProfile: builder.mutation<IUser, FormData>({
            query: (user) => ({
                url: `users/me`,
                method: 'PATCH',
                body: user,
            }),
            invalidatesTags: ['User'],
        }),
    })
})

export const {
    useGetDeputatsQuery,
    useEditProfileMutation,
} = usersApi;
