import React from 'react';
import Container from 'react-bootstrap/Container';
import * as yup from 'yup';
import { useAddNewsMutation } from '../../../store/api/news.api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toFormData } from '../../../helpers/form-data.helper';
import { Store } from 'react-notifications-component';
import { ErrorNotification, SuccessNotification } from '../../../helpers/consts';
import { useAddRequestMutation } from '../../../store/api/requests.api';
import { IAnswer } from '../../../store/models/IAnswer';

const validationSchema = yup.object({
    title: yup.string().required('Необходимое поле'),
    text: yup.string().required('Необходимое поле'),
    files: yup.mixed().required('Необходимое поле'),
    email: yup.string().required('Необходимое поле'),
    first_name: yup.string().required('Необходимое поле'),
    second_name: yup.string().required('Необходимое поле'),
    father_name: yup.string().required('Необходимое поле'),
    phone_number: yup.string().required('Необходимое поле'),
    organization_name: yup.string().required('Необходимое поле'),
    deputat_id: yup.number().required('Необходимое поле'),
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
    </Container>;
}
