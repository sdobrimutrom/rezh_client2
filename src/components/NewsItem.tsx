import { Grid, Paper } from '@mui/material';

interface NewsItemProps {
    id: number;
    title: string;
    createdAt: Date;
    text: string;
    img: string;
}

export default function NewsItem({ id, title, createdAt, text, img }: NewsItemProps) {
    return (
        <Paper>
            <Grid>{title}</Grid>
        </Paper>
    );
}
