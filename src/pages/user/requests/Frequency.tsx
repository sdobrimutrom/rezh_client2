import { Row, Spinner } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import RequestItem from '../../../components/requests/RequestItem/RequestItem';
import Pagination, { OnChangeEventType } from '../../../components/common/Pagination';
import { getTotalPages } from '../../../helpers/pagination.helper';
import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import { useGetRequestsQuery } from '../../../store/api/requests.api';
import { PAGE_LIMIT } from '../../../helpers/consts';
import BreadcrumbItem from '../../../components/common/Breadcrumbs/BreadcrumbItem';
import BreadcrumbGroup from '../../../components/common/Breadcrumbs/BreadcrumbGroup';
import RequestsFilters from '../../../components/requests/RequestsFilters';
import { IRequestsQuery } from '../../../store/models/IRequest';

export default function Frequency() {
    const [filters, setFilters] = useState<IRequestsQuery>({ moderated: true, approved: true, frequent: true, answered: true });
    const [page, setPage] = useState(1);

    const handleChangePage = (event: OnChangeEventType) => {
        setPage(event.target.value);
    };

    const { data: requests, ...requestsMeta } = useGetRequestsQuery({ limit: PAGE_LIMIT, page: page, query: filters });

    useEffect(() => {
        setPage(0);
    }, [filters]);

    return (
        <Container className={ 'd-flex flex-column gap-3' }>
            <BreadcrumbGroup>
                <BreadcrumbItem to={ '/' } label={ 'Главная' } />
                <BreadcrumbItem to={ '/deputat/requests/frequency' } label={ 'Частые обращения' } isActive={ true } />
            </BreadcrumbGroup>
            <Row className={ 'justify-content-between' }>
                <Col>
                    <h3>Частые обращения</h3>
                </Col>
            </Row>
            <Row>
                <hr />
            </Row>
            <Row className={ 'd-flex flex-column gap-3' }>
                <Row>
                    <RequestsFilters filters={ filters } setFilters={ setFilters } />
                </Row>
                <Row>{ (requestsMeta.isLoading || requestsMeta.isFetching) && <Spinner /> }</Row>
                <Row className={ 'd-flex flex-column gap-3 container' }>
                    { requests?.rows?.map((request) => {
                        return <RequestItem key={ request.id } request={ request } />;
                    }) }
                    { !requests?.rows?.length && <h5>Ничего не найдено</h5> }
                </Row>
                <Row>
                    { !!requests?.rows?.length &&
                    <Pagination onChange={ handleChangePage } aroundCurrent={ 1 }
                                totalPages={ getTotalPages(requests?.count) } value={ page } />
                    }
                </Row>
            </Row>
        </Container>
    );
}
