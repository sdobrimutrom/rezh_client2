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
import { ERole } from '../../../types/ERole';
import { useAppSelector } from '../../../hooks/redux';

export default function Requests() {
    const user = useAppSelector(state => state.userReducer.user);

    const [filters, setFilters] = useState<IRequestsQuery>({});
    const [page, setPage] = useState(1);

    const handleChangePage = (event: OnChangeEventType) => {
        setPage(event.target.value);
    };

    const { data: requests, ...requestsMeta } = useGetRequestsQuery(
        { limit: PAGE_LIMIT, page: page, query: filters },
        { skip: !filters['user_id'], refetchOnMountOrArgChange: true },
    );

    useEffect(() => {
        setPage(0);
    }, [filters]);

    useEffect(() => {
        setFilters({ ...filters, user_id: user?.id });
    }, [user]);

    return (
        <Container className={ 'd-flex flex-column gap-3' }>
            <BreadcrumbGroup>
                <BreadcrumbItem to={ '/' } label={ 'Главная' } />
                <BreadcrumbItem to={ '/requests' } label={ 'Обращения' } isActive={ true } />
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
                    <RequestsFilters filters={ filters } setFilters={ setFilters } role={ ERole.USER } />
                </Row>
                <Row>{ (requestsMeta.isLoading || requestsMeta.isFetching) && <Spinner /> }</Row>
                <Row className={ 'd-flex flex-column gap-3 container' }>
                    { requests?.rows?.map((request) => {
                        return <RequestItem key={ request.id } request={ request } withEditingUI />;
                    }) }
                    { !requests?.rows?.length && !requestsMeta.isLoading && <h5>Ничего не найдено</h5> }
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
