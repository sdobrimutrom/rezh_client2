import { IRole } from './IRole';

export interface IUser {
    id: number;
    email: string;
    roles: IRole[];
    firstName: string;
    secondName: string;
    fatherName: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserRole {
    id: number;
    userId: number;
    roleId: number;
}
