import {
    Box,
    Card,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    Modal,
    Typography
} from '@mui/material';
import React from 'react';

interface LoginModalProps {
    open: boolean;
    handleClose: () => void;
}

export default function LoginModal({ open, handleClose }: LoginModalProps) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description">
            <Card>
                <Box padding={6} minWidth={320}>
                    <Grid container direction={'column'} gap={4} justifyContent={'space-between'}>
                        <Grid container direction={'column'} justifyContent={'space-between'}>
                            <Typography variant="h4" fontWeight={700}>
                                Авторизация
                            </Typography>
                            <Typography variant="subtitle1" fontWeight={600} color={'gray'}>
                                Войдите в свой аккаунт
                            </Typography>
                        </Grid>
                        <Grid container direction={'column'} gap={3}>
                            <FormControl>
                                <InputLabel htmlFor="email">Электронная почта</InputLabel>
                                <Input id="email" />
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="password">Пароль</InputLabel>
                                <Input id="password" />
                            </FormControl>
                        </Grid>
                        <Grid container direction={'column'}></Grid>
                    </Grid>
                </Box>
            </Card>
        </Modal>
    );
}
