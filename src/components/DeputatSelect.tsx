import React, { useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select/base';
import { useGetDeputatsQuery } from '../store/api/users.api';

interface IDeputatSelectProps {
    name: string;
}

export default function DeputatSelect({ name }: IDeputatSelectProps) {
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (newValue: string) => {
        setInputValue(newValue);
    };

    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const handleMenuIsOpenChange = (value: boolean) => () => {
        setMenuIsOpen(value);
    };

    const { data, isLoading } = useGetDeputatsQuery({});

    const selectOptions = useMemo(() => {
        return data?.rows?.map((user) => {
            return {
                value: user.id,
                label: `${user.second_name} ${user.first_name} ${user.father_name}`,
            }
        })
    }, [data])

    const {
        control,
        formState: { isSubmitting, errors },
    } = useFormContext();

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
