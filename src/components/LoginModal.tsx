import { useState } from 'react';
import Modal from 'react-bootstrap/esm/Modal';
import { Store } from 'react-notifications-component';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useGetMeQuery, useLoginMutation } from '../store/api/auth.api';
import { Button, Container, Form } from 'react-bootstrap';
import { ErrorNotification, SuccessNotification } from '../helpers/consts';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Notification } from 'react-notifications-component/dist/src/components/Notification';

interface LoginModalProps {
    open: boolean;
    handleClose: () => void;
}

type FormValues = {
    email: string;
    password: string;
}

const validationSchema = yup.object({
    email: yup.string().email('Некорректный email').required('Введите email'),
    password: yup.string().required('Введите пароль'),
});

export default function LoginModal({ open, handleClose }: LoginModalProps) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [login, { isLoading, isSuccess }] = useLoginMutation();

    const {
        setError, handleSubmit, control, reset, formState: { errors }, getValues,
    } = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        login({ ...data })
            .unwrap()
            .then(() => {
                Store.addNotification({ ...SuccessNotification('Вы успешно авторизовались') });
                handleClose();
            })
            .catch((error) => {
                Store.addNotification({ ...ErrorNotification(error?.data?.message || 'Произошла ошибка') });
            });
    };

    const navigateTo = (to: string) => () => {
        handleClose();
        navigate(to);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Modal show={ open } onHide={ handleClose }>
            <Modal.Header closeButton>
                <Modal.Title>Авторизация</Modal.Title>
            </Modal.Header>
            <Form onSubmit={ handleSubmit(onSubmit) }>
                <Modal.Body className={"d-flex flex-column gap-3"}>
                    <h6>Войдите в свой аккаунт</h6>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Электронная почта</Form.Label>
                        <Controller control={ control } name="email"
                                    defaultValue=""
                                    render={ ({ field: { onChange, value, ref } }) => (
                                        <Form.Control onChange={ onChange } value={ value } ref={ ref }
                                                      isInvalid={ !!errors.email }
                                                      placeholder="Введите email" />) } />
                        <Form.Control.Feedback type="invalid">
                            { errors.email?.message }
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Controller control={ control } name="password"
                                    defaultValue=""
                                    render={ ({ field: { onChange, value, ref } }) => (
                                        <Form.Control onChange={ onChange } value={ value } ref={ ref }
                                                      isInvalid={ !!errors.password }
                                                      placeholder="Введите пароль" />) } />
                        <Form.Control.Feedback type="invalid">
                            { errors.password?.message }
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Container className={ 'd-flex flex-column align-items-center gap-2' }>
                        <Button
                            disabled={ isLoading }
                            variant={ 'dark' }
                            type={ 'submit' }>
                            Авторизоваться
                        </Button>
                        <div>или</div>
                        <Button onClick={navigateTo('registration')} variant={ 'outline-dark' }>Зарегистрироваться</Button>
                    </Container>
                </Modal.Footer>
            </Form>

        </Modal>
        // <Modal
        //     open={open}
        //     onClose={handleClose}
        //     style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        //     aria-labelledby="parent-modal-title"
        //     aria-describedby="parent-modal-description">
        //     <Card
        //         sx={{
        //             boxShadow: 6,
        //             borderRadius: 3,
        //             border: 'none',
        //             width: 500
        //         }}>
        //         <Grid container paddingTop={2} justifyContent={'flex-end'}>
        //             <Button onClick={handleClose} style={{ backgroundColor: 'transparent' }}>
        //                 <Close color="disabled" />
        //             </Button>
        //         </Grid>
        //         <Box padding={6} paddingTop={1}>
        //             <form onSubmit={formik.handleSubmit}>
        //                 <Grid container direction={'column'} gap={4} justifyContent={'space-between'}>
        //                     <Grid container direction={'column'} justifyContent={'space-between'}>
        //                         <Typography variant="h4" fontWeight={700}>
        //                             Авторизация
        //                         </Typography>
        //                         <Typography variant="subtitle1" fontWeight={600} color={'gray'}>
        //                             Войдите в свой аккаунт
        //                         </Typography>
        //                     </Grid>
        //                     <Grid container direction={'column'} gap={3}>
        //                         <TextField
        //                             id="email"
        //                             name="email"
        //                             label="Электронная почта"
        //                             value={formik.values.email}
        //                             onChange={formik.handleChange}
        //                             error={formik.touched.email && Boolean(formik.errors.email)}
        //                             helperText={formik.touched.email && formik.errors.email}
        //                         />
        //                         <Grid container direction={'column'} gap={1}>
        //                             <FormControl>
        //                                 <InputLabel
        //                                     error={formik.touched.password && Boolean(formik.errors.password)}
        //                                     htmlFor="password">
        //                                     Пароль
        //                                 </InputLabel>
        //                                 <OutlinedInput
        //                                     id="password"
        //                                     name="password"
        //                                     label="Пароль"
        //                                     type={showPassword ? 'text' : 'password'}
        //                                     value={formik.values.password}
        //                                     onChange={formik.handleChange}
        //                                     error={formik.touched.password && Boolean(formik.errors.password)}
        //                                     endAdornment={
        //                                         <InputAdornment position="end">
        //                                             <IconButton
        //                                                 aria-label="toggle password visibility"
        //                                                 onClick={handleShowPassword}>
        //                                                 {showPassword ? <Visibility /> : <VisibilityOff />}
        //                                             </IconButton>
        //                                         </InputAdornment>
        //                                     }
        //                                 />
        //                                 <FormHelperText error id="password">
        //                                     {formik.touched.password && formik.errors.password}
        //                                 </FormHelperText>
        //                             </FormControl>
        //                             <Button
        //                                 style={{
        //                                     color: 'gray',
        //                                     marginLeft: 'auto',
        //                                     textTransform: 'none',
        //                                     backgroundColor: 'transparent'
        //                                 }}
        //                                 onClick={() => navigateTo('/forget')}>
        //                                 Забыли пароль?
        //                             </Button>
        //                         </Grid>
        //                     </Grid>
        //                     <Grid container direction={'column'} gap={1} alignItems={'center'}>
        //                         <LoadingButton
        //                             disabled={isLoading}
        //                             loading={isLoading}
        //                             variant={'contained'}
        //                             type={'submit'}>
        //                             Авторизоваться
        //                         </LoadingButton>
        //                         <Typography variant="body2">или</Typography>
        //                         <Button variant={'outlined'}>Зарегистрироваться</Button>
        //                     </Grid>
        //                 </Grid>
        //             </form>
        //         </Box>
        //     </Card>
        // </Modal>
    )
        ;
}
