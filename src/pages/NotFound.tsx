import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div>Не найдено</div>
        // <Box
        //     sx={{
        //         display: 'flex',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         minHeight: '100vh'
        //     }}>
        //     <Container maxWidth="md">
        //         <Grid container spacing={2}>
        //             <Grid xs={6}>
        //                 <Typography variant="h1">404</Typography>
        //                 <Typography variant="h6">Страницы которую вы ищете не существует</Typography>
        //                 <Button variant="contained" onClick={() => navigate('/')}>
        //                     На главную
        //                 </Button>
        //             </Grid>
        //         </Grid>
        //     </Container>
        // </Box>
    );
}
