import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface FilterProps {
    filters: any;
    setFilters: (filters: any) => void;
}

export default function Filters({ filters, setFilters }: FilterProps) {
    const handleFilterChange = (filter: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [filter]: e.target.value });
    };

    const handleResetFilters = () => {
        setFilters({});
    };

    return (
        <div></div>
        // <Grid container direction="column" gap={3}>
        //     <Grid container direction="row" alignItems={'center'} gap={3}>
        //         <TextField
        //             id="search"
        //             onInput={handleFilterChange('search')}
        //             value={filters['search']}
        //             variant="outlined"
        //             label="Поиск"
        //             placeholder="Search..."
        //             size="small"
        //         />
        //         <Button onClick={handleResetFilters} variant="outlined">
        //             Сбросить фильтры
        //         </Button>
        //     </Grid>
        //     <Grid container direction="row">
        //         <TextField
        //             id="search"
        //             onInput={handleFilterChange('search')}
        //             value={filters['search']}
        //             variant="outlined"
        //             placeholder="Search..."
        //             size="small"
        //         />
        //     </Grid>
        // </Grid>
    );
}
