import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PAGE_LIMIT } from '../../../helpers/consts';
import { getTotalPages } from '../../../helpers/pagination.helper';
import { useDeleteNewsMutation, useGetNewsQuery } from '../../../store/api/news.api';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';
import Pagination, { OnChangeEventType } from '../../../components/common/Pagination';
import NewsItem from '../../../components/news/NewsItem';
import NewsFilters from '../../../components/news/NewsFilters';
import { INewsQuery } from '../../../store/models/INews';
import BreadcrumbItem from '../../../components/common/Breadcrumbs/BreadcrumbItem';
import BreadcrumbGroup from '../../../components/common/Breadcrumbs/BreadcrumbGroup';

export default function News() {
    const navigate = useNavigate();

    const [filters, setFilters] = useState<INewsQuery>({});
    const [page, setPage] = useState(0);

    const handleChangePage = (event: OnChangeEventType) => {
        setPage(event.target.value);
    };

    const { data: news, ...newsMeta } = useGetNewsQuery({
        limit: PAGE_LIMIT,
        page: page,
        query: filters,
    });

    const [deleteNews, deleteNewsMeta] = useDeleteNewsMutation();

    const handleDeleteNews = (id: number) => () => {
        deleteNews({ id });
    };

    return (
        <Container className={ 'py-3 d-flex flex-column gap-3' }>
            <Row>
                <BreadcrumbGroup>
                    <BreadcrumbItem to={ '/admin' } label={ 'Главная' } />
                    <BreadcrumbItem to={ '/admin/news' } label={ 'Новости' } isActive={ true } />
                </BreadcrumbGroup>
            </Row>
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
            <Row className={ 'd-flex flex-column gap-3' }>
                <Row>
                    <NewsFilters filters={ filters } setFilters={ setFilters } />
                </Row>
                <Row>
                    { news?.rows?.map((newsItem) => {
                        return <NewsItem news={ newsItem } key={ newsItem.id } />;
                    }) }
                </Row>
                <Row>
                    <Pagination onChange={ handleChangePage } aroundCurrent={ 1 }
                                totalPages={ getTotalPages(news?.count) } value={ page } />
                </Row>
            </Row>
        </Container>
    );
}
