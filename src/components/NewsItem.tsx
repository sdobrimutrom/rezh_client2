import { Box, Grid, styled, Typography } from '@mui/material';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
});

interface NewsItemProps {
    id: number;
    title: string;
    createdAt: Date;
    text: string;
    img: string;
}

export default function NewsItem({ id, title, createdAt, text, img }: NewsItemProps) {
    return (
        <Box
            sx={{
                width: 500,
                height: 300,
                backgroundColor: 'primary dark',
                border: '1px solid black',
                marginBottom: '40px'
            }}>
            <Grid container direction="row">
                <Grid item>
                    <Typography component="h5">{id}).</Typography>
                </Grid>
                <Grid item>
                    <Img src={img} alt="альтернатива" sx={{ width: '200px', marginTop: '20px' }} />
                </Grid>
                <Grid item>
                    <Typography component="h5">{title}</Typography>
                </Grid>
                <Grid item>
                    <Typography component="h4">{text}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
}
