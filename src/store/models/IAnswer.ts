import { IRequest } from './IRequest';

export interface IAnswer {
    id: number;
    text: string;
    files: string[];
    answerer_id: number;
    request: IRequest;
    request_id: number;
}