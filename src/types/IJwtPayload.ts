import { IRole } from './../store/models/IRole';

export interface IJwtPayload {
    email: string;
    id: number;
    roles: IRole[];
}
