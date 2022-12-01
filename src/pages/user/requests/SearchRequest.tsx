import { useGetRequestQuery } from '../../../store/api/requests.api';
import { ChangeEvent, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Form } from 'react-bootstrap';
import RequestItem from '../../../components/RequestItem';
import Row from 'react-bootstrap/Row';

export default function SearchRequest() {
    const [requestId, setRequestId] = useState<number | undefined>(undefined);
    const onRequestIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'number' && !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : undefined;
        return setRequestId(value);
    };

    const { data: request, isLoading } = useGetRequestQuery(requestId, { skip: requestId === undefined });

    return <Container className={'d-flex flex-column gap-5'}>
        <Form.Group>
            <Form.Label>Введите номер обращения</Form.Label>
            <Form.Control
                onChange={ onRequestIdChange }
                value={ requestId }
                type={ 'number' }
            />
        </Form.Group>
        { request && <RequestItem request={ request } />}
    </Container>;
}
