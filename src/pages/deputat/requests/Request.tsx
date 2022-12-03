import { useParams } from 'react-router-dom';
import { useAddAnswerMutation, useGetRequestQuery } from '../../../store/api/requests.api';
import RequestItem from '../../../components/requests/RequestItem';
import Container from 'react-bootstrap/Container';
import { Button, Form } from 'react-bootstrap';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FileUpload from '../../../components/common/FileUpload/FileUpload';
import React, { useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { toFormData } from '../../../helpers/form-data.helper';
import { Store } from 'react-notifications-component';
import { ErrorNotification, SuccessNotification } from '../../../helpers/consts';
import * as yup from 'yup';

const validationSchema = yup.object({
    text: yup.string().required('Необходимое поле'),
    files: yup.mixed(),
    frequent: yup.boolean(),
    request_id: yup.number(),
});

type FormValues = {
    text: string;
    files: string[];
    frequent: boolean;
    request_id: number;
}

export default function Request() {
    const { id } = useParams();

    const { data: request, ...requestMeta } = useGetRequestQuery(Number(id), { skip: Number.isNaN(Number(id)) });
    const [addAnswer, addAnswerMeta] = useAddAnswerMutation();

    const form = useForm<FormValues>({
        defaultValues: useMemo(() => {
            return {
                frequent: request?.frequent,
                text: request?.answer?.text,
            };
        }, [request?.answer?.text, request?.frequent]),
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        form.reset({
            frequent: request?.frequent,
            text: request?.answer?.text,
        });
    }, [request?.answer?.text, request?.frequent]);

    console.log(form.getValues());

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const formData = toFormData(Object.entries(data));
        formData.append('request_id', id || '-1');
        addAnswer(formData)
            .unwrap()
            .then(() => {
                Store.addNotification({ ...SuccessNotification('Ответ на обращение успешно добавлен') });
            })
            .catch((error) => {
                Store.addNotification({ ...ErrorNotification(error?.data?.message || 'При добавлении ответа произошла ошибка') });
            });
    };

    return <Container>
        { request && <RequestItem request={ request } /> }
        <FormProvider { ...form }>
            <Form onSubmit={ form.handleSubmit(onSubmit) }
                  className={ 'd-flex flex-column gap-4 ' }>
                <Form.Group controlId="formTitle">
                    <Form.Label>Введите текст ответа</Form.Label>
                    <Controller control={ form.control } name="text"
                                render={ ({ field: { onChange, value, ref } }) => (
                                    <Form.Control type={ 'textarea' } onChange={ onChange } value={ value } ref={ ref }
                                                  isInvalid={ !!form.formState.errors.text }
                                                  placeholder="Введите текст ответа" />) } />
                    <Form.Control.Feedback type="invalid">
                        { form.formState.errors.text?.message }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Прикрепить файлы к ответу</Form.Label>
                    <FileUpload limit={ 8 } multiple={ true } name={ 'files' } />
                </Form.Group>
                <Form.Group>
                    <Controller name={ 'frequent' } render={
                        ({ field: { onChange, value, ref } }) => (
                            <Form.Check
                                type={ 'switch' } checked={ !!value }
                                label={ 'Отметить как часто задаваемый вопрос' } onChange={ onChange } value={ value }
                                ref={ ref }
                            />
                        )
                    } />
                </Form.Group>
                <Form.Group>
                    <Button disabled={ requestMeta.isLoading || addAnswerMeta.isLoading } type={ 'submit' }
                            variant={ 'dark' }>Ответить</Button>
                </Form.Group>
            </Form>
        </FormProvider>
    </Container>;
}
