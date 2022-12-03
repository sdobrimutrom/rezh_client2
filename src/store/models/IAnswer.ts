import { IRequest } from './IRequest';
import { IUser } from './IUser';

export interface IAnswer {
    id: number;
    text: string;
    files: string[];
    frequent: boolean;
    request: IRequest;
    request_id: number;
    user_id: number;
    user: IUser;
}