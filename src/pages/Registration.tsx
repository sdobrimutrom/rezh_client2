import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useLoginMutation, useRegistrationMutation } from '../store/api/auth.api';
import { yupResolver } from '@hookform/resolvers/yup';
import { Store } from 'react-notifications-component';
import { ErrorNotification, SuccessNotification } from '../helpers/consts';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import BreadcrumbItem from '../components/common/Breadcrumbs/BreadcrumbItem';
import BreadcrumbGroup from '../components/common/Breadcrumbs/BreadcrumbGroup';
import Row from 'react-bootstrap/Row';
import FileUpload from '../components/common/FileUpload/FileUpload';
import { toFormData } from '../helpers/form-data.helper';

type FormValues = {
    email: string;
    password: string;
    first_name: string;
    second_name: string;
    father_name: string;
    phone_number: string;
    avatar: string;
    description: string;
}

const validationSchema = yup.object({
    email: yup.string().email('Некорректный email').required('Обязательное поле'),
    password: yup.string().required('Обязательное поле'),
    first_name: yup.string().required('Обязательное поле'),
    second_name: yup.string().required('Обязательное поле'),
    father_name: yup.string(),
    phone_number: yup.string(),
    avatar: yup.mixed(),
    description: yup.string(),
});

const Registration = () => {
    const navigate = useNavigate();
    const [registration, { isLoading }] = useRegistrationMutation();

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const formData = toFormData(Object.entries(data));
        registration(formData)
            .unwrap()
            .then(() => {
                Store.addNotification({ ...SuccessNotification('Вы успешно зарегистрировались') });
                navigate('/');
            })
            .catch((error) => {
                Store.addNotification({ ...ErrorNotification(error?.data?.message) });
            });
    };

    return (
        <FormProvider { ...form }>
            <Form onSubmit={ form.handleSubmit(onSubmit) }>
                <Container className={ 'd-flex flex-column gap-3 align-items-start mb-5' }>
                    <BreadcrumbGroup>
                        <BreadcrumbItem to={ '/' } label={ 'Главная' } />
                        <BreadcrumbItem to={ '/registration' } label={ 'Регистрация' } isActive={ true } />
                    </BreadcrumbGroup>
                    <h3>Регистрация</h3>
                    <Row>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Электронная почта</Form.Label>
                            <Controller control={ form.control } name="email"
                                        defaultValue=""
                                        render={ ({ field: { onChange, value, ref } }) => (
                                            <Form.Control onChange={ onChange } value={ value } ref={ ref }
                                                          isInvalid={ !!form.formState.errors.email }
                                                          placeholder="Введите email" />) } />
                            <Form.Control.Feedback type="invalid">
                                { form.formState.errors.email?.message }
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Controller control={ form.control } name="password"
                                        defaultValue=""
                                        render={ ({ field: { onChange, value, ref } }) => (
                                            <Form.Control type={'password'} onChange={ onChange } value={ value } ref={ ref }
                                                          isInvalid={ !!form.formState.errors.password }
                                                          placeholder="Введите пароль" />) } />
                            <Form.Control.Feedback type="invalid">
                                { form.formState.errors.password?.message }
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSecondName">
                            <Form.Label>Фамилия</Form.Label>
                            <Controller control={ form.control } name="second_name"
                                        defaultValue=""
                                        render={ ({ field: { onChange, value, ref } }) => (
                                            <Form.Control onChange={ onChange } value={ value } ref={ ref }
                                                          isInvalid={ !!form.formState.errors.second_name }
                                                          placeholder="Введите фамилию" />) } />
                            <Form.Control.Feedback type="invalid">
                                { form.formState.errors.second_name?.message }
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formFirstName">
                            <Form.Label>Имя</Form.Label>
                            <Controller control={ form.control } name="first_name"
                                        defaultValue=""
                                        render={ ({ field: { onChange, value, ref } }) => (
                                            <Form.Control onChange={ onChange } value={ value } ref={ ref }
                                                          isInvalid={ !!form.formState.errors.first_name }
                                                          placeholder="Введите имя" />) } />
                            <Form.Control.Feedback type="invalid">
                                { form.formState.errors.first_name?.message }
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formFatherName">
                            <Form.Label>Отчество (если есть)</Form.Label>
                            <Controller control={ form.control } name="father_name"
                                        defaultValue=""
                                        render={ ({ field: { onChange, value, ref } }) => (
                                            <Form.Control onChange={ onChange } value={ value } ref={ ref }
                                                          isInvalid={ !!form.formState.errors.father_name }
                                                          placeholder="Введите отчество" />) } />
                            <Form.Control.Feedback type="invalid">
                                { form.formState.errors.father_name?.message }
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPhoneNumber">
                            <Form.Label>Контактный номер</Form.Label>
                            <Controller control={ form.control } name="phone_number"
                                        defaultValue=""
                                        render={ ({ field: { onChange, value, ref } }) => (
                                            <Form.Control onChange={ onChange } value={ value } ref={ ref }
                                                          isInvalid={ !!form.formState.errors.phone_number }
                                                          placeholder="Введите контактный номер" />) } />
                            <Form.Control.Feedback type="invalid">
                                { form.formState.errors.phone_number?.message }
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAvatar">
                            <Form.Label>Аватар</Form.Label>
                            <FileUpload limit={ 1 } multiple={ false } name={ 'avatar' } />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>О себе</Form.Label>
                            <Controller control={ form.control } name="description"
                                        defaultValue=""
                                        render={ ({ field: { onChange, value, ref } }) => (
                                            <Form.Control as={'textarea'} onChange={ onChange } value={ value } ref={ ref }
                                                          isInvalid={ !!form.formState.errors.description }
                                                          placeholder="Введите информацию о себе" />) } />
                            <Form.Control.Feedback type="invalid">
                                { form.formState.errors.description?.message }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button
                        disabled={ isLoading }
                        variant={ 'dark' }
                        type={ 'submit' }>
                        Зарегистрироваться
                    </Button>
                </Container>
            </Form>
        </FormProvider>
    );
};

export default Registration;