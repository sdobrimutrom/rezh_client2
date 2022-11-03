import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

export default function News() {
    return (
        <Container>
            <Grid container>
                <Typography variant="h2">Новости</Typography>
            </Grid>
        </Container>
    );
}
