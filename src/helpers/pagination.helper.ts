import { PAGE_LIMIT } from './consts';

export const getTotalPages = (count: number | undefined) => {
    return count ? Math.ceil(count / PAGE_LIMIT) : undefined;
};
