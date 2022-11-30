import { IAnswer } from './IAnswer';

export interface IRequest {
    id: number;
    title: string;
    text: string;
    files: string[];
    frequent: boolean;
    user_id: number;
    email: string;
    first_name: string;
    second_name: string;
    father_name: string;
    phone_number: string;
    organization_name: string;
    deputat_id: number;
    moderated: boolean;
    approved: boolean;
    moderating_text: string;
    answer: IAnswer;
    answer_id: number;
}

export interface IModerateRequestDto {
    id: number;
    moderated: boolean;
    approved: boolean;
    moderating_text: string;
}

export interface IRequestsQueryParams {
    limit?: number;
    page?: number;
    query?: IRequestsQuery;
    order?: IRequestsOrder;
}

export interface IRequestsQuery {
    user_id?: string;
    deputat_id?: number;
    frequent?: boolean;
    moderated?: boolean;
    approved?: boolean;
}

export interface IRequestsOrder {
    order_by: string;
    asc: boolean;
}