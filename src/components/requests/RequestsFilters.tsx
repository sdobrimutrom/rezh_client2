import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FormControl, FormGroup, FormLabel, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { IRequestsQuery } from '../../store/models/IRequest';
import Select from 'react-select/base';
import { useGetDeputatsQuery } from '../../store/api/users.api';
import { SingleValue } from 'react-select';

interface RequestsFiltersProps {
    filters: IRequestsQuery;
    setFilters: (filters: IRequestsQuery) => void;
}

export default function RequestsFilters({ filters, setFilters }: RequestsFiltersProps) {
    const handleFiltersChange = (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [key]: event.target.value });
    };

    const handleSwitchChange = (key: string) => (val: any, e: any) => {
        const value = () => {
            switch (val) {
                case 'true':
                    return true;
                case 'false':
                    return false;
                default:
                    return undefined;
            }
        };
        setFilters({ ...filters, [key]: value() });
    };

    const [deputatSelectInputValue, setDeputatSelectInputValue] = useState('');
    const handleDeputatSelectInputChange = (newValue: string) => {
        setDeputatSelectInputValue(newValue);
    };

    const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);
    const handleSelectMenuIsOpenChange = (value: boolean) => () => {
        setSelectMenuIsOpen(value);
    };

    const handleSelectChange = (deputat_id: number| undefined) => {
        setFilters({ ...filters, deputat_id });
    };

    const { data, isLoading } = useGetDeputatsQuery({});

    const selectOptions = useMemo(() => {
        return data?.rows?.map((user) => {
            return {
                value: user.id,
                label: `${ user.second_name } ${ user.first_name } ${ user.father_name }`,
            };
        });
    }, [data]);

    return (
        <Container>
            <Row className={ 'd-flex flex-row gap-3 ' }>
                <FormGroup>
                    <FormLabel>Поиск</FormLabel>
                    <FormControl type={ 'text' } value={ filters['search'] } onChange={ handleFiltersChange('search') }
                                 placeholder={ 'Введите параметры поиска...' } />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Статус модерирования</FormLabel>
                    <ToggleButtonGroup id={ 'moderated' } className={ 'd-block' } name={ 'moderated' } type={ 'radio' }
                                       value={ String(filters['moderated']) }
                                       onChange={ handleSwitchChange('moderated') }>
                        <ToggleButton id={ 'moderated-all' } value={ 'undefined' }>Показать все</ToggleButton>
                        <ToggleButton id={ 'moderated-true' } value={ 'true' }>Обработанные</ToggleButton>
                        <ToggleButton id={ 'moderated-false' } value={ 'false' }>Необработанные</ToggleButton>
                    </ToggleButtonGroup>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Статус подтверждения</FormLabel>
                    <ToggleButtonGroup id={ 'approved' } className={ 'd-block' } name={ 'approved' } type={ 'radio' }
                                       value={ String(filters['approved']) }
                                       onChange={ handleSwitchChange('approved') }>
                        <ToggleButton id={ 'approved-all' } value={ 'undefined' }>Показать все</ToggleButton>
                        <ToggleButton id={ 'approved-true' } value={ 'true' }>Подтвержденные</ToggleButton>
                        <ToggleButton id={ 'approved-false' } value={ 'false' }>Неподтвержденные</ToggleButton>
                    </ToggleButtonGroup>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Статус часто задаваемые</FormLabel>
                    <ToggleButtonGroup id={ 'frequent' } className={ 'd-block' } name={ 'frequent' } type={ 'radio' }
                                       value={ String(filters['frequent']) }
                                       onChange={ handleSwitchChange('frequent') }>
                        <ToggleButton id={ 'frequent-all' } value={ 'undefined' }>Показать все</ToggleButton>
                        <ToggleButton id={ 'frequent-true' } value={ 'true' }>Часто задаваемые</ToggleButton>
                        <ToggleButton id={ 'frequent-false' } value={ 'false' }>Не часто задаваемые</ToggleButton>
                    </ToggleButtonGroup>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Депутат</FormLabel>
                    <Select isDisabled={ isLoading }
                            isLoading={ isLoading }
                            options={ selectOptions }
                            onChange={ (newValue) => handleSelectChange(newValue?.value) }
                            value={ selectOptions?.find(o => o.value === filters['deputat_id']) }
                            placeholder={ isLoading ? 'Загрузка...' : 'Выберите депутата' }
                            menuIsOpen={ selectMenuIsOpen }
                            onMenuOpen={ handleSelectMenuIsOpenChange(true) }
                            onMenuClose={ handleSelectMenuIsOpenChange(false) }
                            inputValue={ deputatSelectInputValue }
                            onInputChange={ handleDeputatSelectInputChange } />
                </FormGroup>
            </Row>
        </Container>
    );
}