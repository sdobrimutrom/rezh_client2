import { useGetDeputatsQuery } from '../store/api/users.api';
import { PAGE_LIMIT } from '../helpers/consts';
import React, { useState } from 'react';
import Pagination, { OnChangeEventType } from '../components/common/Pagination';
import { Row, Spinner } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { getTotalPages } from '../helpers/pagination.helper';
import Container from 'react-bootstrap/Container';
import UserItem from '../components/user/UserItem';
import BreadcrumbItem from '../components/common/Breadcrumbs/BreadcrumbItem';
import BreadcrumbGroup from '../components/common/Breadcrumbs/BreadcrumbGroup';

export default function Deputats() {
    const [page, setPage] = useState(0);

    const handleChangePage = (event: OnChangeEventType) => {
        setPage(event.target.value);
    };

    const { data: deputats, ...deputatsMeta } = useGetDeputatsQuery({ limit: PAGE_LIMIT, page: page });

    return (
        <Container className={ 'py-3 d-flex flex-column gap-3' }>
            <Row>
                <BreadcrumbGroup>
                    <BreadcrumbItem to={ '/' } label={ 'Главная' } />
                    <BreadcrumbItem to={ '/deputats' } label={ 'Список депутатов' } isActive={ true } />
                </BreadcrumbGroup>
            </Row>
            <Row className={ 'justify-content-between' }>
                <Col>
                    <h3>Список депутатов</h3>
                </Col>
            </Row>
            <Row>
                <hr />
            </Row>
            <Row className={ 'd-flex flex-column gap-3' }>
                <Row>

                </Row>
                <Row>{ (deputatsMeta.isLoading || deputatsMeta.isFetching) && <Spinner /> }</Row>
                <Row>
                    { deputats?.rows?.map((deputat) => {
                        return <UserItem key={deputat.id}  user={deputat} />;
                    }) }
                    { (!deputats?.rows?.length && !deputatsMeta.isLoading) && <h5>Ничего не найдено</h5> }
                </Row>
                <Row>
                    { !!deputats?.rows?.length &&
                        <Pagination onChange={ handleChangePage } aroundCurrent={ 1 }
                                    totalPages={ getTotalPages(deputats?.count) } value={ page } />
                    }
                </Row>
            </Row>
        </Container>
    );
}
