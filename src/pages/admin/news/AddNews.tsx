import { LoadingButton } from '@mui/lab';
import { Container, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { MuiFileInput } from 'mui-file-input';
import { Store } from 'react-notifications-component';
import * as yup from 'yup';

import FileUpload from '../../../components/common/FileUpload';
import { ErrorNotification, SuccessNotification } from '../../../helpers/consts';
import { useAddNewsMutation } from '../../../store/api/news.api';

const validationSchema = yup.object({
    title: yup.string().required('Необходимое поле'),
    content: yup.string().required('Необходимое поле'),
    image: yup.mixed().required('Необходимое поле')
});

export default function AddNews() {
    const [addNews, { isLoading, error }] = useAddNewsMutation();

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            image: null
        },
        validationSchema: validationSchema,
        validateOnBlur: false,
        onSubmit: (values) => {
            const formData = new FormData();
            Object.entries(values).forEach((e) => {
                if (e[1] && e[0]) {
                    formData.append(e[0], e[1]);
                }
            });
            addNews(formData)
                .unwrap()
                .then(() => {
                    Store.addNotification({ ...SuccessNotification('Новость успешно добавлена') });
                })
                .catch((error) => {
                    Store.addNotification({ ...ErrorNotification(error?.data?.message) });
                });
        }
    });

    return (
        <Container>
            <form onSubmit={formik.handleSubmit}>
                <Grid container gap={3}>
                    <Grid item>
                        <Typography variant="h3" fontWeight={500}>
                            Создать новость
                        </Typography>
                    </Grid>
                    <Grid container direction="row">
                        <Grid container direction="column" gap={2}>
                            <TextField
                                id="title"
                                variant="outlined"
                                label="Заголовок"
                                placeholder=""
                                size="medium"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={!!formik.errors.title}
                                helperText={formik.errors.title}
                            />
                            <TextField
                                id="under_title"
                                variant="outlined"
                                label="Подзаголовок"
                                placeholder=""
                                size="medium"
                            />
                            <TextField
                                id="content"
                                variant="outlined"
                                label="Новость"
                                placeholder=""
                                size="medium"
                                name="content"
                                value={formik.values.content}
                                onChange={formik.handleChange}
                                error={!!formik.errors.content}
                                helperText={formik.errors.content}
                            />
                            <MuiFileInput
                                name="image"
                                id="image"
                                variant="outlined"
                                placeholder="Выберите файл..."
                                value={formik.values.image}
                                onChange={(file) => formik.setFieldValue('image', file)}
                                helperText={formik.errors.content}
                                error={!!formik.errors.content}
                            />
                            <LoadingButton
                                disabled={isLoading}
                                loading={isLoading}
                                variant={'contained'}
                                type={'submit'}>
                                Добавить
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
