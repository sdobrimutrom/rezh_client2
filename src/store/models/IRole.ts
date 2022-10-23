import { IUserRole } from './IUserRole';

export interface IRole {
    id: number;
    value: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    userRole: IUserRole;
}
