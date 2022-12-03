import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Pagination, { OnChangeEventType } from '../../../components/common/Pagination';
import { getTotalPages } from '../../../helpers/pagination.helper';
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';
import { PAGE_LIMIT } from '../../../helpers/consts';
import { useGetRequestsQuery } from '../../../store/api/requests.api';
import RequestItem from '../../../components/requests/RequestItem';

export default function Requests() {
    const [page, setPage] = useState(1);

    const handleChangePage = (event: OnChangeEventType) => {
        setPage(event.target.value);
    };

    const { data: requests, } = useGetRequestsQuery({ limit: PAGE_LIMIT, page: page });

    return (
        <Container className={ 'py-3 d-flex flex-column gap-3' }>
            <Row className={ 'justify-content-between' }>
                <Col>
                    <h3>Обращения</h3>
                </Col>
            </Row>
            <Row>
                <hr />
            </Row>
            <Row>
                <Row>

                </Row>
                <Row className={'d-flex flex-column gap-3 container'}>
                    { requests?.rows?.map((request) => {
                        return <RequestItem key={request.id} request={request}/>;
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
