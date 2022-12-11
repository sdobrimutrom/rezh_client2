import { IRole } from './IRole';

export interface IUser {
    id: number;
    email: string;
    roles: IRole[];
    first_name: string;
    second_name: string;
    father_name: string;
    avatar: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserRole {
    id: number;
    userId: number;
    roleId: number;
}

export interface IUsersQueryParams {
    limit?: number;
    page?: number;
    query?: IUsersQuery;
}

export interface IUsersQuery {
    search?: string;
}

export interface IRegistrationInput {
    email: string;
    password: string;
    first_name: string;
    second_name: string;
    father_name: string;
    avatar: string;
}

export interface ILoginInput {
    email: string;
    password: string;
}
