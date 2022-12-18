import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select/base';
import { useGetDeputatsQuery } from '../store/api/users.api';
import { useSearchParams } from 'react-router-dom';

interface IDeputatSelectProps {
    name: string;
}

export default function DeputatSelect({ name }: IDeputatSelectProps) {
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (newValue: string) => {
        setInputValue(newValue);
    };

    const [searchParams, setSearchParams] = useSearchParams();

    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const handleMenuIsOpenChange = (value: boolean) => () => {
        setMenuIsOpen(value);
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

    const {
        control,
        formState: { isSubmitting, errors },
    } = useFormContext();

    useEffect(() => {
        console.log(selectOptions
            ?.find(option => option.value === Number(searchParams.get('deputat_id')))
            ?.label || '');
        handleInputChange(
            selectOptions
                ?.find(option => option.value === Number(searchParams.get('deputat_id')))
                ?.label || ''
        )
    }, [searchParams])

    return (
        <Controller
            name={ name }
            control={ control }
            render={ ({ field: { name, onBlur, ref, onChange, value } }) => (
                <Select isDisabled={ isSubmitting || isLoading } isLoading={ isLoading } options={ selectOptions }
                        placeholder={ isLoading ? 'Загрузка...' : 'Выберите депутата' }
                        menuIsOpen={ menuIsOpen }
                        onMenuOpen={ handleMenuIsOpenChange(true) }
                        onMenuClose={ handleMenuIsOpenChange(false) } onChange={ onChange } inputValue={ inputValue }
                        value={ value } onInputChange={ handleInputChange } />
            ) }
        />
    );

}
