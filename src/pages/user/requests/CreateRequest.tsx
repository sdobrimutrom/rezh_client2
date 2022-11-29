import React from 'react';
import Container from 'react-bootstrap/Container';
import * as yup from 'yup';
import { useAddNewsMutation } from '../../../store/api/news.api';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toFormData } from '../../../helpers/form-data.helper';
import { Store } from 'react-notifications-component';
import { ErrorNotification, SuccessNotification } from '../../../helpers/consts';
import { useAddRequestMutation } from '../../../store/api/requests.api';
import { IAnswer } from '../../../store/models/IAnswer';
import { Button, Form } from 'react-bootstrap';
import FileUpload from '../../../components/common/FileUpload/FileUpload';
import TextField from '../../../components/common/Forms/TextField';

const validationSchema = yup.object({
    title: yup.string().required('Необходимое поле'),
    text: yup.string().required('Необходимое поле'),
    files: yup.mixed(),
    email: yup.string(),
    first_name: yup.string(),
    second_name: yup.string(),
    father_name: yup.string(),
    phone_number: yup.string(),
    organization_name: yup.string(),
    deputat_id: yup.number(),
});

type FormValues = {
    title: string;
    text: string;
    files: File[];
    email: string;
    first_name: string;
    second_name: string;
    father_name: string;
    phone_number: string;
    organization_name: string;
    deputat_id: number;
}

export default function CreateRequest() {
    const [addRequest, { isLoading, error }] = useAddRequestMutation();

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const formData = toFormData(Object.entries(data));
        console.log(formData);
        addRequest(formData)
            .unwrap()
            .then(() => {
                Store.addNotification({ ...SuccessNotification('Обращение успешно оставлено. Ожидайте ответа.') });
            })
            .catch((error) => {
                Store.addNotification({ ...ErrorNotification(error?.data?.message || 'При создании обращения произошла ошибка') });
            });
    };

    return <Container>
        <h3>Создать обращение</h3>
        <FormProvider { ...form }>
            <Form onSubmit={ form.handleSubmit(onSubmit) }
                  className={ 'd-flex flex-column gap-4 ' }>
                <Form.Group controlId="formTitle">
                    <Form.Label>Заголовок обращения</Form.Label>
                    <Controller control={ form.control } name="title"
                                defaultValue=""
                                render={ ({ field: { onChange, value, ref } }) => (
                                    <Form.Control onChange={ onChange } value={ value } ref={ ref }
                                                  isInvalid={ !!form.formState.errors.title }
                                                  placeholder="Введите заголовок обращения" />) } />
                    <Form.Control.Feedback type="invalid">
                        { form.formState.errors.title?.message }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formText">
                    <Form.Label>Введите текст обращения</Form.Label>
                    <Controller control={ form.control } name="text"
                                defaultValue=""
                                render={ ({ field: { onChange, value, ref } }) => (
                                    <Form.Control as={ 'textarea' } onChange={ onChange } value={ value }
                                                  ref={ ref }
                                                  isInvalid={ !!form.formState.errors.text }
                                                  placeholder="Введите текст обращения" />) } />
                    <Form.Control.Feedback type="invalid">
                        { form.formState.errors.text?.message }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Прикрепить файлы к обращению</Form.Label>
                    <FileUpload limit={ 8 } multiple={ true } name={ 'files' } />
                </Form.Group>
                <hr />
                <h5>Информация о пользователе</h5>
                <Form.Group controlId="formTitle">
                    <Form.Label>Электронная почта</Form.Label>
                    <Controller control={ form.control } name="email"
                                defaultValue=""
                                render={ ({ field: { onChange, value, ref } }) => (
                                    <Form.Control onChange={ onChange } value={ value } ref={ ref }
                                                  isInvalid={ !!form.formState.errors.email }
                                                  placeholder="Введите электронную почту" />) } />
                    <Form.Control.Feedback type="invalid">
                        { form.formState.errors.email?.message }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formTitle">
                    <Form.Label>Имя</Form.Label>
                    <Controller control={ form.control } name="first_name"
                                defaultValue=""
                                render={ ({ field: { onChange, value, ref } }) => (
                                    <Form.Control onChange={ onChange } value={ value } ref={ ref }
                                                  isInvalid={ !!form.formState.errors.first_name }
                                                  placeholder="Введите свое имя" />) } />
                    <Form.Control.Feedback type="invalid">
                        { form.formState.errors.first_name?.message }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formTitle">
                    <Form.Label>Фамилия</Form.Label>
                    <Controller control={ form.control } name="second_name"
                                defaultValue=""
                                render={ ({ field: { onChange, value, ref } }) => (
                                    <Form.Control onChange={ onChange } value={ value } ref={ ref }
                                                  isInvalid={ !!form.formState.errors.second_name }
                                                  placeholder="Введите свою фамилию" />) } />
                    <Form.Control.Feedback type="invalid">
                        { form.formState.errors.second_name?.message }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formTitle">
                    <Form.Label>Фамилия</Form.Label>
                    <Controller control={ form.control } name="second_name"
                                defaultValue=""
                                render={ ({ field: { onChange, value, ref } }) => (
                                    <Form.Control onChange={ onChange } value={ value } ref={ ref }
                                                  isInvalid={ !!form.formState.errors.second_name }
                                                  placeholder="Введите свою фамилию" />) } />
                    <Form.Control.Feedback type="invalid">
                        { form.formState.errors.second_name?.message }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Button disabled={ isLoading } type={ 'submit' } variant={ 'dark' }>Создать</Button>
                </Form.Group>
            </Form>
        </FormProvider>
    </Container>;
}
