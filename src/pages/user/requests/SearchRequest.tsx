import { useGetRequestQuery } from '../../../store/api/requests.api';
import React, { ChangeEvent, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Form, Spinner } from 'react-bootstrap';
import RequestItem from '../../../components/requests/RequestItem/RequestItem';
import Row from 'react-bootstrap/Row';
import BreadcrumbGroup from '../../../components/common/Breadcrumbs/BreadcrumbGroup';
import BreadcrumbItem from '../../../components/common/Breadcrumbs/BreadcrumbItem';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

export default function SearchRequest() {
    const [requestId, setRequestId] = useState<number | undefined>(undefined);
    const [inputRequestId, setInputRequestId] = useState<number | undefined>(undefined);

    const onRequestIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'number' && !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : undefined;
        return setInputRequestId(value);
    };

    const handleSearch = () => {
        setRequestId(inputRequestId);
    }

    const handleKeypress = (e: any) => {
        if (e.keyCode === 13) {
            handleSearch();
        }
    };

    const { data: request, ...requestsMeta } = useGetRequestQuery(requestId, { skip: requestId === undefined });

    return <Container className={ 'd-flex flex-column gap-3' }>
        <BreadcrumbGroup>
            <BreadcrumbItem to={ '/' } label={ 'Главная' } />
            <BreadcrumbItem to={ '/requests/search' } label={ 'Поиск обращения' } isActive={ true } />
        </BreadcrumbGroup>
        <Row className={ 'justify-content-between' }>
            <Col>
                <h3>Поиск обращения</h3>
            </Col>
        </Row>
        <Row>
            <hr />
        </Row>
        <InputGroup>
            <Form.Control
                onChange={ onRequestIdChange }
                value={ inputRequestId }
                type={ 'number' }
                placeholder = "Введите текст.."
                onKeyDown={handleKeypress}
            />
            <Button onClick={handleSearch}>
                Поиск
            </Button>
        </InputGroup>
        <Row>{ (requestsMeta.isLoading || requestsMeta.isFetching) && <Spinner /> }</Row>
        { request && <RequestItem request={ request } />}
    </Container>;
}
