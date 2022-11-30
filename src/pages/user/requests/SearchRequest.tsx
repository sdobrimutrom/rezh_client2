import { useGetRequestQuery } from '../../../store/api/requests.api';
import { ChangeEvent, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Form } from 'react-bootstrap';

export default function SearchRequest() {
    const [requestId, setRequestId] = useState<number | undefined>(undefined);
    const onRequestIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === "number" && !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : undefined;
        return setRequestId(value);
    };

    const { data, isLoading } = useGetRequestQuery(requestId, { skip: requestId === undefined });

    console.log(data);

    return <Container>
        <Form.Group>
            <Form.Label>Введите номер обращения</Form.Label>
            <Form.Control
                onChange={ onRequestIdChange }
                value={ requestId }
                type={'number'}
            />
        </Form.Group>
    </Container>;
}
