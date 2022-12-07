import { INewsQuery } from '../../store/models/INews';

interface NewsFiltersProps {
    filters: INewsQuery;
    setFilters: (filters: INewsQuery) => {};
}

export default function NewsFilters({ filters, setFilters }: NewsFiltersProps) {
    return (
        <>
        </>
    );
}