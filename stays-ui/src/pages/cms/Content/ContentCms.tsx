import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../../../components/Copyright';
import { Box } from '@mui/material';
import StaysTable from './../Stays/StaysTable';
import CmsFrame from './../CmsFrame';
import { StayClient } from '../../../clients/stayClient';
import { StayRecord } from '../../../models/Stay';
import StaysPage from '../../StaysPage';


export default function ContentCms() {

  return (
    <StaysPage>
    <Box sx={{ display: 'flex' }}>
        <CmsFrame />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
            <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                }}
            >
            </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
            <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                }}
            >
            </Paper>
            </Grid>
            <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

            </Paper>
            </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
        </Container>
        </Box>
        </StaysPage>
  );
}

