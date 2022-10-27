import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Modal,
    OutlinedInput,
    TextField,
    Typography
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

interface LoginModalProps {
    open: boolean;
    handleClose: () => void;
}

const validationSchema = yup.object({
    email: yup.string().email('Некорректный email').required('Введите email'),
    password: yup.string().required('Введите пароль')
});

export default function LoginModal({ open, handleClose }: LoginModalProps) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        validateOnBlur: false,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    const navigateTo = (to: string) => {
        handleClose();
        navigate(to);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleNotShowPassword = () => {
        setShowPassword(false);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description">
            <Card
                sx={{
                    boxShadow: 6,
                    borderRadius: 3,
                    border: 'none',
                    width: 500
                }}>
                <Grid container paddingTop={2} justifyContent={'flex-end'}>
                    <Button onClick={handleClose} style={{ backgroundColor: 'transparent' }}>
                        <Close color="disabled" />
                    </Button>
                </Grid>
                <Box padding={6} paddingTop={1}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid
                            container
                            direction={'column'}
                            gap={4}
                            justifyContent={'space-between'}>
                            <Grid container direction={'column'} justifyContent={'space-between'}>
                                <Typography variant="h4" fontWeight={700}>
                                    Авторизация
                                </Typography>
                                <Typography variant="subtitle1" fontWeight={600} color={'gray'}>
                                    Войдите в свой аккаунт
                                </Typography>
                            </Grid>
                            <Grid container direction={'column'} gap={3}>
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Электронная почта"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <Grid container direction={'column'} gap={1}>
                                    <FormControl>
                                        <InputLabel
                                            error={
                                                formik.touched.password &&
                                                Boolean(formik.errors.password)
                                            }
                                            htmlFor="password">
                                            Пароль
                                        </InputLabel>
                                        <OutlinedInput
                                            id="password"
                                            name="password"
                                            label="Пароль"
                                            type={showPassword ? 'text' : 'password'}
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.password &&
                                                Boolean(formik.errors.password)
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleShowPassword}
                                                        onMouseDown={handleNotShowPassword}>
                                                        {showPassword ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <FormHelperText error id="password">
                                            {formik.touched.password && formik.errors.password}
                                        </FormHelperText>
                                    </FormControl>
                                    <Button
                                        style={{
                                            color: 'gray',
                                            marginLeft: 'auto',
                                            textTransform: 'none',
                                            backgroundColor: 'transparent'
                                        }}
                                        onClick={() => navigateTo('/forget')}>
                                        Забыли пароль?
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container direction={'column'} gap={1} alignItems={'center'}>
                                <Button variant={'contained'} type={'submit'}>
                                    Авторизоваться
                                </Button>
                                <Typography variant="body2">или</Typography>
                                <Button variant={'outlined'}>Зарегистрироваться</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Card>
        </Modal>
    );
}
