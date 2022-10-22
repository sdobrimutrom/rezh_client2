import { Grid, styled, Typography } from '@mui/material';

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
        <Grid container direction="row">
            <Grid item>
                <Img alt="альтернатива" />
            </Grid>
            <Grid item>
                <Typography component="h5">{title}</Typography>
            </Grid>
        </Grid>
    );
}
