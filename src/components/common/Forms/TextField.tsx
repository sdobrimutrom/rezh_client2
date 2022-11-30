import { Form } from 'react-bootstrap';
import { Controller, UseFormReturn } from 'react-hook-form';
import React from 'react';

interface TextFieldProps {
    form: UseFormReturn,
    name: string;
    placeholder: string;
    label: string;
}

export default function TextField({ form, name, placeholder, label }: TextFieldProps) {
    return <Form.Group controlId="formTitle">
        <Form.Label>{ label }</Form.Label>S
        <Controller control={ form.control } name="title"
                    defaultValue=""
                    render={ ({ field: { onChange, value, ref } }) => (
                        <Form.Control onChange={ onChange } value={ value } ref={ ref }
                                      isInvalid={ !!form.formState.errors?.[name] }
                                      placeholder={placeholder} />) } />
        <Form.Control.Feedback type="invalid">
            {/*{ form.formState.errors?.[name]?.message }*/}
        </Form.Control.Feedback>
    </Form.Group>
}