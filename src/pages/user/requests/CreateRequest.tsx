import React from 'react';
import Container from 'react-bootstrap/Container';
import * as yup from 'yup';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toFormData } from '../../../helpers/form-data.helper';
import { Store } from 'react-notifications-component';
import { ErrorNotification, SuccessNotification } from '../../../helpers/consts';
import { useAddRequestMutation } from '../../../store/api/requests.api';
import { Button, Form } from 'react-bootstrap';
import FileUpload from '../../../components/common/FileUpload/FileUpload';
import DeputatSelect from '../../../components/DeputatSelect';

const validationSchema = yup.object({
    title: yup.string().required('Необходимое поле'),
    text: yup.string().required('Необходимое поле'),
    files: yup.mixed(),
    email: yup.string().email('Неправильный формат'),
    first_name: yup.string(),
    second_name: yup.string(),
    father_name: yup.string(),
    phone_number: yup.string(),
    organization_name: yup.string(),
    deputat_id: yup.mixed(),
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
    deputat_id: { value: string, label: string };
}

export default function CreateRequest() {
    const [addRequest, { isLoading, error }] = useAddRequestMutation();

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const formData = toFormData(Object.entries(data));
        formData.set('deputat_id', data.deputat_id?.value);
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
                <Form.Group>
                    <Form.Label>Выберите депутата, которому хотите адресовать обращение</Form.Label>
                    <DeputatSelect name={'deputat_id'} />
                </Form.Group>
                <hr />
                <h5>Информация о пользователе (необ.)</h5>
                <Form.Group controlId="formEmail">
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
                <Form.Group controlId="formFirstName">
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
                <Form.Group controlId="formSecondName">
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
                <Form.Group controlId="formFather_name">
                    <Form.Label>Отчество</Form.Label>
                    <Controller control={ form.control } name="father_name"
                                defaultValue=""
                                render={ ({ field: { onChange, value, ref } }) => (
                                    <Form.Control onChange={ onChange } value={ value } ref={ ref }
                                                  isInvalid={ !!form.formState.errors.father_name }
                                                  placeholder="Введите свое отчество" />) } />
                    <Form.Control.Feedback type="invalid">
                        { form.formState.errors.father_name?.message }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPhone_number">
                    <Form.Label>Номер телефона</Form.Label>
                    <Controller control={ form.control } name="phone_number"
                                defaultValue=""
                                render={ ({ field: { onChange, value, ref } }) => (
                                    <Form.Control onChange={ onChange } value={ value } ref={ ref }
                                                  isInvalid={ !!form.formState.errors.phone_number }
                                                  placeholder="Введите номер телефона" />) } />
                    <Form.Control.Feedback type="invalid">
                        { form.formState.errors.phone_number?.message }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formOrganization_name">
                    <Form.Label>Название организации (если обращение от юридического лица)</Form.Label>
                    <Controller control={ form.control } name="organization_name"
                                defaultValue=""
                                render={ ({ field: { onChange, value, ref } }) => (
                                    <Form.Control onChange={ onChange } value={ value } ref={ ref }
                                                  isInvalid={ !!form.formState.errors.organization_name }
                                                  placeholder="Введите название организации" />) } />
                    <Form.Control.Feedback type="invalid">
                        { form.formState.errors.organization_name?.message }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Button disabled={ isLoading } type={ 'submit' } variant={ 'dark' }>Создать</Button>
                </Form.Group>
            </Form>
        </FormProvider>
    </Container>;
}
