import { IRequest } from './IRequest';
import { IUser } from './IUser';

export interface IAnswer {
    id: number;
    text: string;
    files: string[];
    request: IRequest;
    request_id: number;
    user_id: number;
    user: IUser;
}