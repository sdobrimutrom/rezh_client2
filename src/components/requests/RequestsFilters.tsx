import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FormCheck, FormControl, FormGroup, FormLabel, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { IRequestsQuery } from '../../store/models/IRequest';
import Select from 'react-select/base';
import { useGetDeputatsQuery } from '../../store/api/users.api';
import { SingleValue } from 'react-select';
import { ERole } from '../../types/ERole';
import { useAppSelector } from '../../hooks/redux';

interface RequestsFiltersProps {
    filters: IRequestsQuery;
    setFilters: (filters: IRequestsQuery) => void;
    role: ERole;
}

export default function RequestsFilters({ filters, setFilters, role }: RequestsFiltersProps) {
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

    const handleSelectChange = (value: number | undefined | null) => {
        const deputat_id = value !== null ? value : undefined;
        setFilters({ ...filters, deputat_id });
    };

    const deputat = useAppSelector(state => state?.userReducer?.user);
    const handleDeputatSwitchChange = () => {
        if (filters['deputat_id']) {
            setFilters({ ...filters, deputat_id: undefined });
        } else {
            setFilters({ ...filters, deputat_id: deputat?.id || undefined });
        }
    };

    const { data, isLoading } = useGetDeputatsQuery({}, { skip: role === ERole.DEPUTAT });

    const selectOptions = useMemo(() => {
        return [
            { value: null, label: 'Очистить' },
            ...(data && data.rows ? data.rows.map((user) => {
                return {
                    value: user.id,
                    label: `${ user.second_name } ${ user.first_name } ${ user.father_name }`,
                };
            }) : [{ value: null, label: 'Ничего не найдено' }]),
        ];
    }, [data]);

    return (
        <Container>
            <Row className={ 'd-flex flex-row gap-3 ' }>
                <FormGroup controlId={ 'search' }>
                    <FormLabel>Поиск</FormLabel>
                    <FormControl type={ 'text' } value={ filters['search'] } onChange={ handleFiltersChange('search') }
                                 placeholder={ 'Введите параметры поиска...' } />
                </FormGroup>
                { role === ERole.DEPUTAT && <FormGroup controlId={ 'deputat_id' }>
                  <FormCheck
                    className={ 'd-inline-block' }
                    type={ 'switch' }
                    checked={ !!filters['deputat_id'] }
                    onChange={ handleDeputatSwitchChange }
                  />
                  <FormLabel>Адресованные мне</FormLabel>
                </FormGroup> }
                { (role === ERole.ADMIN || role === ERole.USER) && <FormGroup>
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
                </FormGroup> }
                { role === ERole.ADMIN && <FormGroup>
                  <ToggleButtonGroup id={ 'moderated' } className={ 'd-block' } name={ 'moderated' } type={ 'radio' }
                                     value={ String(filters['moderated']) }
                                     onChange={ handleSwitchChange('moderated') }>
                    <ToggleButton variant={ 'outline-dark' } id={ 'moderated-all' } value={ 'undefined' }>Показать
                      все</ToggleButton>
                    <ToggleButton variant={ 'outline-dark' } id={ 'moderated-true' }
                                  value={ 'true' }>Обработанные</ToggleButton>
                    <ToggleButton variant={ 'outline-dark' } id={ 'moderated-false' }
                                  value={ 'false' }>Необработанные</ToggleButton>
                  </ToggleButtonGroup>
                </FormGroup> }
                { role === ERole.ADMIN && <FormGroup>
                  <ToggleButtonGroup id={ 'approved' } className={ 'd-block' } name={ 'approved' } type={ 'radio' }
                                     value={ String(filters['approved']) }
                                     onChange={ handleSwitchChange('approved') }>
                    <ToggleButton variant={ 'outline-dark' } id={ 'approved-all' } value={ 'undefined' }>Показать
                      все</ToggleButton>
                    <ToggleButton variant={ 'outline-dark' } id={ 'approved-true' }
                                  value={ 'true' }>Подтвержденные</ToggleButton>
                    <ToggleButton variant={ 'outline-dark' } id={ 'approved-false' }
                                  value={ 'false' }>Неподтвержденные</ToggleButton>
                  </ToggleButtonGroup>
                </FormGroup> }
                <FormGroup>
                    <ToggleButtonGroup id={ 'frequent' } className={ 'd-block' } name={ 'frequent' } type={ 'radio' }
                                       value={ String(filters['frequent']) }
                                       onChange={ handleSwitchChange('frequent') }>
                        <ToggleButton variant={ 'outline-dark' } id={ 'frequent-all' } value={ 'undefined' }>Показать
                            все</ToggleButton>
                        <ToggleButton variant={ 'outline-dark' } id={ 'frequent-true' } value={ 'true' }>Часто
                            задаваемые</ToggleButton>
                        <ToggleButton variant={ 'outline-dark' } id={ 'frequent-false' } value={ 'false' }>Не часто
                            задаваемые</ToggleButton>
                    </ToggleButtonGroup>
                </FormGroup>
                <FormGroup>
                    <ToggleButtonGroup id={ 'answered' } className={ 'd-block' } name={ 'answered' } type={ 'radio' }
                                       value={ String(filters['answered']) }
                                       onChange={ handleSwitchChange('answered') }>
                        <ToggleButton variant={ 'outline-dark' } id={ 'answered-all' } value={ 'undefined' }>Показать
                            все</ToggleButton>
                        <ToggleButton variant={ 'outline-dark' } id={ 'answered-true' } value={ 'true' }>С ответом</ToggleButton>
                        <ToggleButton variant={ 'outline-dark' } id={ 'answered-false' } value={ 'false' }>Без ответа</ToggleButton>
                    </ToggleButtonGroup>
                </FormGroup>
            </Row>
        </Container>
    );
}