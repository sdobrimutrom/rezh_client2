import { commonApi } from './common.api';
import { IUser, IUsersQueryParams } from '../models/IUser';

export const usersApi = commonApi.injectEndpoints({
    endpoints: (builder) => ({
        getDeputats: builder.query<{ count: number; rows: IUser[] }, IUsersQueryParams>({
            query: ({ limit, page }) => ({
                url: 'users/deputats',
                body: {
                    limit,
                    page,
                },
            }),
        })
    })
})

export const {
    useGetDeputatsQuery
} = usersApi;
