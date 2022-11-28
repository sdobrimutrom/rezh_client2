import React from 'react';
import Container from 'react-bootstrap/Container';
import * as yup from 'yup';
import { useAddNewsMutation } from '../../../store/api/news.api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toFormData } from '../../../helpers/form-data.helper';
import { Store } from 'react-notifications-component';
import { ErrorNotification, SuccessNotification } from '../../../helpers/consts';

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

export default function CreateRequest() {
    const [addNews, { isLoading, error }] = useAddNewsMutation();

    const form = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const formData = toFormData(Object.entries(data));
        console.log(formData);
        addNews(formData)
            .unwrap()
            .then(() => {
                Store.addNotification({ ...SuccessNotification('Новость успешно добавлена') });
            })
            .catch((error) => {
                Store.addNotification({ ...ErrorNotification(error?.data?.message || 'При добавлении новости произошла ошибка') });
            });
    };

    return <Container>

    </Container>;
}
