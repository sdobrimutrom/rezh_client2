import { Add } from '@mui/icons-material';
import { Button, Divider, Grid, Pagination, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Filters from '../../../components/Filters';
import { PAGE_LIMIT } from '../../../helpers/consts';
import { getTotalPages } from '../../../helpers/pagination.helper';
import { useGetNewsQuery } from '../../../store/api/news.api';

export default function News() {
    const navigate = useNavigate();

    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);

    const handleChangePage = (event: any, page: number) => {
        setPage(page);
    };

    const { data, isLoading, error } = useGetNewsQuery({ limit: PAGE_LIMIT, page: page });

    return (
        <Container>
            <Grid container direction="column" gap={2}>
                <Grid container direction="row" justifyContent="space-between">
                    <Typography variant="h4" fontWeight={700}>
                        Новости
                    </Typography>
                    <Button onClick={() => navigate('create')}>
                        <Add />
                    </Button>
                </Grid>
                <Divider light flexItem variant="middle" />
                <Grid container gap={3}>
                    <Grid container>
                        <Filters filters={filters} setFilters={setFilters} />
                    </Grid>
                    <Grid container direction="column" gap={2}>
                        {data?.rows?.map((news) => {
                            return <div key={news.id}>{news.title}</div>;
                        })}
                    </Grid>
                </Grid>
                <Grid item>
                    <Pagination count={getTotalPages(data?.count)} page={page} onChange={handleChangePage} />
                </Grid>
            </Grid>
        </Container>
    );
}
