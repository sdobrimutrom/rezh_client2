import React, { useEffect, useMemo, useState } from 'react';
import Container from 'react-bootstrap/Container';
import BreadcrumbItem from '../components/common/Breadcrumbs/BreadcrumbItem';
import BreadcrumbGroup from '../components/common/Breadcrumbs/BreadcrumbGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAppSelector } from '../hooks/redux';
import { Alert, ButtonGroup, Image, Spinner } from 'react-bootstrap';
import { getFileURL } from '../helpers/url.helper';
import defaultProfileImage from '../assets/defaultProfileImage.jpeg';
import Button from 'react-bootstrap/Button';
import { useEditProfileMutation } from '../store/api/users.api';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Store } from 'react-notifications-component';
import { ErrorNotification, SuccessNotification } from '../helpers/consts';
import { toFormData } from '../helpers/form-data.helper';
import Form from 'react-bootstrap/Form';
import FileUpload from '../components/common/FileUpload/FileUpload';

type FormValues = {
    email: string;
    first_name: string;
    second_name: string;
    father_name: string;
    phone_number: string;
    avatar: string;
    description: string;
}

const validationSchema = yup.object({
    email: yup.string().email('Некорректный email').required('Обязательное поле'),
    first_name: yup.string().required('Обязательное поле'),
    second_name: yup.string().required('Обязательное поле'),
    father_name: yup.string(),
    phone_number: yup.string(),
    avatar: yup.mixed(),
    description: yup.string(),
});

const Profile = () => {
    const user = useAppSelector(state => state.userReducer.user);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const handleIsEditingChange = (value: boolean) => () => {
        setIsEditing(value);
    };

    const [editProfile, { isLoading }] = useEditProfileMutation();

    const form = useForm<FormValues>({
        defaultValues: useMemo(() => {
            return {
                email: user?.email,
                first_name: user?.first_name,
                second_name: user?.second_name,
                father_name: user?.father_name,
                phone_number: user?.phone_number,
                description: user?.description,
            };
        }, [user]),
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const formData = toFormData(Object.entries(data));
        editProfile(formData)
            .unwrap()
            .then(() => {
                handleIsEditingChange(false)();
            })
            .catch((error) => {
                Store.addNotification({ ...ErrorNotification(error?.data?.message) });
            });
    };

    useEffect(() => {
        form.reset({
            email: user?.email,
            first_name: user?.first_name,
            second_name: user?.second_name,
            father_name: user?.father_name,
            phone_number: user?.phone_number,
            description: user?.description,
        });
    }, [user]);

    return (
        <FormProvider { ...form }>
            <Form onSubmit={ form.handleSubmit(onSubmit) }>
                <Container className={ 'd-flex flex-column gap-3' }>
                    <BreadcrumbGroup>
                        <BreadcrumbItem to={ '/' } label={ 'Главная' } />
                        <BreadcrumbItem to={ '/profile' } label={ 'Профиль' } isActive={ true } />
                    </BreadcrumbGroup>
                    <h3>Профиль</h3>
                    <hr />
                    <Row className={ 'd-flex gap-3' }>
                        <Col className={ 'd-flex flex-column flex-grow-0' }>
                            { isEditing
                                ? <div style={ { width: '250px', height: '250px' } }>
                                    <FileUpload limit={ 1 } multiple={ false } name={ 'avatar' } />
                                </div>
                                : <Image rounded width={ 250 } height={ 250 }
                                         src={ user?.avatar ? getFileURL(user?.avatar) : defaultProfileImage }
                                         alt={ 'Фото профиля не найдено' } />
                            }
                        </Col>
                        <Col
                            className={ 'd-flex flex-column flex-grow-1 border border-dark border-1 rounded-3 border-opacity-25' }>
                            <Row className={ 'd-flex align-items-center p-3' }>
                                <Col>
                                    { isEditing ?
                                        <div className={ 'd-flex flex-row gap-1' }>
                                            <Controller control={ form.control } name="second_name"
                                                        render={ ({ field: { onChange, value, ref } }) => (
                                                            <Form.Control size={ 'sm' } onChange={ onChange }
                                                                          value={ value } ref={ ref }
                                                                          isInvalid={ !!form.formState.errors.second_name } />
                                                        ) } />
                                            <Controller control={ form.control } name="first_name"
                                                        render={ ({ field: { onChange, value, ref } }) => (
                                                            <Form.Control size={ 'sm' } onChange={ onChange }
                                                                          value={ value } ref={ ref }
                                                                          isInvalid={ !!form.formState.errors.first_name } />
                                                        ) } />
                                            <Controller control={ form.control } name="father_name"
                                                        render={ ({ field: { onChange, value, ref } }) => (
                                                            <Form.Control size={ 'sm' } onChange={ onChange }
                                                                          value={ value } ref={ ref }
                                                                          isInvalid={ !!form.formState.errors.father_name } />
                                                        ) } />
                                        </div>
                                        :
                                        <h5 className={ 'my-auto fw-bold' }>
                                            { `${ user?.second_name } ${ user?.first_name } ${ user?.father_name }` }
                                        </h5>
                                    }
                                </Col>
                                <Col className={ 'd-flex justify-content-end' }>
                                    { isEditing ?
                                        <>
                                            <ButtonGroup>
                                                <Button onClick={ handleIsEditingChange(false) }
                                                        variant={ 'danger' }>Отменить</Button>
                                                <Button disabled={ isLoading }
                                                        type={ 'submit' } variant={ 'success' }>Применить</Button>
                                            </ButtonGroup>
                                        </> :
                                        <Button disabled={ isLoading }
                                                onClick={ handleIsEditingChange(true) }>{ 'Редактировать' }</Button>
                                    }
                                    { isLoading && <Spinner /> }
                                </Col>
                            </Row>
                            <Row>
                                <hr />
                            </Row>
                            <Row className={ 'p-3' }>
                                <Col>
                                    <h6 className={ 'd-flex flex-row gap-1 align-items-center justify-content-start' }>
                                        <b>Электронная почта:</b>
                                        { isEditing ?
                                            <Controller control={ form.control } name="email"
                                                        render={ ({ field: { onChange, value, ref } }) => (
                                                            <Form.Control className={ 'w-auto' } size={ 'sm' }
                                                                          onChange={ onChange } value={ value }
                                                                          ref={ ref }
                                                                          isInvalid={ !!form.formState.errors.email } />
                                                        ) } />
                                            :
                                            user?.email || 'Не указано'
                                        }
                                    </h6>
                                    <h6 className={ 'd-flex flex-row gap-1 align-items-center justify-content-start' }>
                                        <b>Контактный номер:</b>
                                        { isEditing ?
                                            <Controller control={ form.control } name="phone_number"
                                                        render={ ({ field: { onChange, value, ref } }) => (
                                                            <Form.Control className={ 'w-auto' } size={ 'sm' }
                                                                          onChange={ onChange } value={ value }
                                                                          ref={ ref }
                                                                          isInvalid={ !!form.formState.errors.phone_number } />
                                                        ) } />
                                            :
                                            user?.phone_number || 'Не указано'
                                        }
                                    </h6>
                                </Col>
                            </Row>
                            <Row>
                                <hr className={ 'my-0' } />
                            </Row>
                            <Row>
                                <Alert variant={ 'info' }
                                       className={ 'p-4 border border-0 rounded-0 rounded-bottom my-0' }>
                                    <b>Информация о себе</b>
                                    { isEditing ?
                                        <Controller control={ form.control } name="description"
                                                    render={ ({ field: { onChange, value, ref } }) => (
                                                        <Form.Control className={ 'mt-3 bg-light' } as={ 'textarea' }
                                                                      onChange={ onChange } value={ value }
                                                                      ref={ ref }
                                                                      isInvalid={ !!form.formState.errors.description } />
                                                    ) } />
                                        :
                                        <div className={ 'pt-2' }>
                                            { user?.description || 'Не указано' }
                                        </div>
                                    }
                                </Alert>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </FormProvider>
    );
};

export default Profile;