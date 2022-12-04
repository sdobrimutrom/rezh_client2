export interface INews {
    id: number;
    title: string;
    content: string;
    image: string;
    created_by: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface INewsQueryParams {
    limit?: number;
    page?: number;
    query?: string;
    order?: INewsOrder;
}

export interface INewsQuery {
    search?: string;
}

export interface INewsOrder {
    order_by: string;
    asc: boolean;
}
