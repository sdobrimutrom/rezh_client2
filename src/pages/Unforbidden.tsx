import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Unforbidden() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}>
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid xs={6}>
                        <Typography variant="h1">403</Typography>
                        <Typography variant="h6">
                            Страница которую вы ищете недоступна для вас
                        </Typography>
                        <Button variant="contained" onClick={() => navigate('/')}>
                            На главную
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
