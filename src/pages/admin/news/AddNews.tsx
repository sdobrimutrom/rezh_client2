import { Store } from 'react-notifications-component';
import * as yup from 'yup';

import { ErrorNotification, SuccessNotification } from '../../../helpers/consts';
import { useAddNewsMutation } from '../../../store/api/news.api';
import { Controller, SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Form } from 'react-bootstrap';
import FileUpload from '../../../components/common/FileUpload/FileUpload';
import { toFormData } from '../../../helpers/form-data.helper';
import BreadcrumbItem from '../../../components/common/Breadcrumbs/BreadcrumbItem';
import BreadcrumbGroup from '../../../components/common/Breadcrumbs/BreadcrumbGroup';
import React from 'react';

const validationSchema = yup.object({
    title: yup.string().required('Необходимое поле'),
    content: yup.string().required('Необходимое поле'),
    image: yup.mixed().required('Необходимое поле'),
});

type FormValues = {
    title: string;
    content: string;
    image: File | File[];
}

export default function AddNews() {
    const [addNews, { isLoading }] = useAddNewsMutation();

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const formData = toFormData(Object.entries(data));
        addNews(formData)
            .unwrap()
            .then(() => {
                Store.addNotification({ ...SuccessNotification('Новость успешно добавлена') });
            })
            .catch((error) => {
                Store.addNotification({ ...ErrorNotification(error?.data?.message || 'При добавлении новости произошла ошибка') });
            });
    };

    return (
        <Container className={ 'py-3 d-flex flex-column gap-3' }>
            <BreadcrumbGroup>
                <BreadcrumbItem to={ '/admin' } label={ 'Главная' } />
                <BreadcrumbItem to={ '/admin/news' } label={ 'Новости' } />
                <BreadcrumbItem to={ '/admin/news/create' } label={ 'Добавить новость' } isActive={ true } />
            </BreadcrumbGroup>
            <h2>Создать новость</h2>
            <FormProvider { ...form }>
                <Form onSubmit={ form.handleSubmit(onSubmit) }
                      className={ 'd-flex flex-column gap-4 ' }>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Заголовок новости</Form.Label>
                        <Controller control={ form.control } name="title"
                                    defaultValue=""
                                    render={ ({ field: { onChange, value, ref } }) => (
                                        <Form.Control onChange={ onChange } value={ value } ref={ ref }
                                                      isInvalid={ !!form.formState.errors.title }
                                                      placeholder="Введите заголовок новости" />) } />
                        <Form.Control.Feedback type="invalid">
                            { form.formState.errors.title?.message }
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formContent">
                        <Form.Label>Введите текст новости</Form.Label>
                        <Controller control={ form.control } name="content"
                                    defaultValue=""
                                    render={ ({ field: { onChange, value, ref } }) => (
                                        <Form.Control as={ 'textarea' } onChange={ onChange } value={ value }
                                                      ref={ ref }
                                                      isInvalid={ !!form.formState.errors.content }
                                                      placeholder="Введите текст новости" />) } />
                        <Form.Control.Feedback type="invalid">
                            { form.formState.errors.content?.message }
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formImage">
                        <Form.Label>Прикрепить изображение</Form.Label>
                        <FileUpload limit={ 1 } multiple={ false } name={ 'image' } />
                    </Form.Group>
                    <Form.Group>
                        <Button disabled={ isLoading } type={ 'submit' } variant={ 'dark' }>Добавить</Button>
                    </Form.Group>
                </Form>
            </FormProvider>
        </Container>
    );
}
