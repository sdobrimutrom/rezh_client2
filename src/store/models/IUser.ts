import { IRole } from './IRole';
import { INewsOrder, INewsQuery } from './INews';

export interface IUser {
    id: number;
    email: string;
    roles: IRole[];
    first_name: string;
    second_name: string;
    father_name: string;
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
}