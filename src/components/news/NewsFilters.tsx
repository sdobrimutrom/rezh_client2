import { INewsQuery } from '../../store/models/INews';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { ChangeEvent } from 'react';

interface NewsFiltersProps {
    filters: INewsQuery;
    setFilters: (filters: INewsQuery) => void;
}

export default function NewsFilters({ filters, setFilters }: NewsFiltersProps) {
    const handleFiltersChange = (key: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFilters({ ...filters, [key]: event.target.value });
    };

    return (
        <Container>
            <Row>
                <FormGroup>
                    <FormLabel>Поиск</FormLabel>
                    <FormControl type={'text'} value={ filters['search'] } onChange={ handleFiltersChange('search') }
                                 placeholder={ 'Введите параметры поиска...' } />
                </FormGroup>
            </Row>
        </Container>
    );
}