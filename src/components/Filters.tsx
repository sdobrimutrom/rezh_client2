import { Button, Grid, TextField } from '@mui/material';
import React, { useCallback } from 'react';

interface FilterProps {
    filters: any;
    setFilters: (filters: any) => void;
    resetFilters: () => void;
}

export default function Filters({ filters, setFilters, resetFilters }: FilterProps) {
    const handleFilterChange = (filter: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [filter]: e.target.value });
    };

    const getValueFromFilter = useCallback((filter: string) => filters[filter], [filters]);

    return (
        <Grid container direction="column" gap={3}>
            <Grid container direction="row" alignItems={'center'} gap={3}>
                <TextField
                    id="search"
                    onInput={handleFilterChange('search')}
                    value={getValueFromFilter('search')}
                    variant="outlined"
                    label="Поиск"
                    placeholder="Search..."
                    size="small"
                />
                <Button onClick={resetFilters} variant="outlined">
                    Сбросить фильтры
                </Button>
            </Grid>
            <Grid container direction="row">
                <TextField
                    id="search"
                    onInput={handleFilterChange('search')}
                    value={getValueFromFilter('search')}
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                />
            </Grid>
        </Grid>
    );
}
