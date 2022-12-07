import { useGetDeputatsQuery } from '../store/api/users.api';
import { PAGE_LIMIT } from '../helpers/consts';
import React, { useState } from 'react';
import Pagination, { OnChangeEventType } from '../components/common/Pagination';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { getTotalPages } from '../helpers/pagination.helper';
import Container from 'react-bootstrap/Container';

export default function Deputats() {
    const [page, setPage] = useState(1);

    const handleChangePage = (event: OnChangeEventType) => {
        setPage(event.target.value);
    };

    const { data: deputats } = useGetDeputatsQuery({ limit: PAGE_LIMIT, page: page });

    return (
        <Container className={ 'py-3 d-flex flex-column gap-3' }>
            <Row className={ 'justify-content-between' }>
                <Col>
                    <h3>Список депутатов</h3>
                </Col>
            </Row>
            <Row>
                <hr />
            </Row>
            <Row>
                <Row>

                </Row>
                <Row>
                    { deputats?.rows?.map((deputat) => {
                        return <div key={deputat.id}>{ deputat.email }</div>;
                    }) }
                </Row>
                <Row>
                    <Pagination onChange={ handleChangePage } aroundCurrent={ 1 }
                                totalPages={ getTotalPages(deputats?.count) } value={ page } />
                </Row>
            </Row>
        </Container>
    );
}
