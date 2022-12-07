import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Pagination, { OnChangeEventType } from '../../../components/common/Pagination';
import { getTotalPages } from '../../../helpers/pagination.helper';
import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import { PAGE_LIMIT } from '../../../helpers/consts';
import { useGetRequestsQuery } from '../../../store/api/requests.api';
import RequestItem from '../../../components/requests/RequestItem';
import BreadcrumbItem from '../../../components/common/Breadcrumbs/BreadcrumbItem';
import BreadcrumbGroup from '../../../components/common/Breadcrumbs/BreadcrumbGroup';
import RequestsFilters from '../../../components/requests/RequestsFilters';
import { IRequestsQuery } from '../../../store/models/IRequest';

export default function Requests() {
    const [filters, setFilters] = useState<IRequestsQuery>({});
    const [page, setPage] = useState(0);

    const handleChangePage = (event: OnChangeEventType) => {
        setPage(event.target.value);
    };

    const { data: requests, ...requestsMeta } = useGetRequestsQuery({ limit: PAGE_LIMIT, page: page, query: filters });

    useEffect(() => {
        setPage(0)
    }, [filters]);

    return (
        <Container className={ 'd-flex flex-column gap-3' }>
            <BreadcrumbGroup>
                <BreadcrumbItem to={ '/' } label={ 'Главная' } />
                <BreadcrumbItem to={ '/admin/requests' } label={ 'Обращения' } isActive={ true } />
            </BreadcrumbGroup>
            <Row className={ 'justify-content-between' }>
                <Col>
                    <h3>Обращения</h3>
                </Col>
            </Row>
            <Row>
                <hr />
            </Row>
            <Row className={ 'd-flex flex-column gap-3' }>
                <Row>
                    <RequestsFilters filters={ filters } setFilters={ setFilters } />
                </Row>
                <Row className={ 'd-flex flex-column gap-3 container' }>
                    { requests?.rows?.map((request) => {
                        return <RequestItem key={ request.id } request={ request } withModeratingUI={ true } />;
                    }) }
                </Row>
                <Row>
                    <Pagination onChange={ handleChangePage } aroundCurrent={ 1 }
                                totalPages={ getTotalPages(requests?.count) } value={ page } />
                </Row>
            </Row>
        </Container>
    );
}
