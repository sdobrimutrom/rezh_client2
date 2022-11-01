import { IRole } from './../store/models/IRole';
export interface JwtPayload {
    email: string;
    id: number;
    roles: IRole[];
}
