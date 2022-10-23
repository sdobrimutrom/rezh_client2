import { Button, Container } from '@mui/material';

import { useLoginMutation } from '../store/api/auth';

export default function Main() {
    const [login, { isLoading, error }] = useLoginMutation();

    const handleLogin = async () => {
        await login({ email: 'admin@mail.ru', password: '12345' });
    };

    return (
        <Container>
            MainPage
            {isLoading && <div>Загрузка</div>}
            {error && <div>{`Ошибка: ${error}`}</div>}
            <div>dsdsd</div>
            <div>dsdsd</div>
            <div>dsdsd</div>
            <div>dsdsd</div>
            <div>dsdsd</div>
            <div>dsdsd</div>
            <div>dsdsd</div>
            <Button onClick={handleLogin}>Отправить логин</Button>
        </Container>
    );
}
