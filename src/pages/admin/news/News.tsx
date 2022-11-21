import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Filters from '../../../components/Filters';
import { PAGE_LIMIT } from '../../../helpers/consts';
import { getTotalPages } from '../../../helpers/pagination.helper';
import { useDeleteNewsMutation, useGetNewsQuery } from '../../../store/api/news.api';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';
import Pagination, { OnChangeEventType } from '../../../components/common/Pagination';

export default function News() {
    const navigate = useNavigate();

    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);

    const handleChangePage = (event: OnChangeEventType) => {
        setPage(event.target.value);
    };

    const { data: news, ...newsMeta } = useGetNewsQuery({ limit: PAGE_LIMIT, page: page });
    const [deleteNews, deleteNewsMeta] = useDeleteNewsMutation();

    const handleDeleteNews = (id: number) => () => {
        deleteNews({ id });
    };

    return (
        <Container className={ 'py-3 d-flex flex-column gap-3' }>
            <Row className={ 'justify-content-between' }>
                <Col>
                    <h3>Новости</h3>
                </Col>
                <Col className={ 'flex-grow-0' }>
                    <Button variant={ 'outline-dark' } className={ 'd-flex align-items-center gap-2 flex-nowrap' }
                            onClick={ () => navigate('create') }>
                        <div className={ 'text-nowrap' }>Добавить новость</div>
                        <PlusLg />
                    </Button>
                </Col>
            </Row>
            <Row>
                <hr />
            </Row>
            <Row>
                <Row>

                </Row>
                <Row>
                    { news?.rows?.map((newsItem) => {
                        return <div key={ newsItem.id }>{ newsItem.title }</div>;
                    }) }
                </Row>
                <Row>
                    <Pagination onChange={ handleChangePage } aroundCurrent={ 1 }
                                totalPages={ getTotalPages(news?.count) } value={ page } />
                </Row>
            </Row>
        </Container>
        // <Container>
        //     <Grid container direction="column" gap={2}>
        //         <Grid container direction="row" justifyContent="space-between">
        //             <Typography variant="h4" fontWeight={700}>
        //                 Новости
        //             </Typography>
        //             <Button onClick={() => navigate('create')}>
        //                 <Add />
        //             </Button>
        //         </Grid>
        //         <Divider light flexItem variant="middle" />
        //         <Grid container gap={3}>
        //             <Grid container>
        //                 <Filters filters={filters} setFilters={setFilters} />
        //             </Grid>
        //             <Grid container direction="column" gap={2}>
        //                 {data?.rows?.map((news) => {
        //                     return <div key={news.id}>{news.title}</div>;
        //                 })}
        //             </Grid>
        //         </Grid>
        //         <Grid item>
        //             <Pagination count={getTotalPages(data?.count)} page={page} onChange={handleChangePage} />
        //         </Grid>
        //     </Grid>
        // </Container>
    );
}
