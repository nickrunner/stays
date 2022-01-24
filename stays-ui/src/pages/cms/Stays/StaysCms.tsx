import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../../../components/Copyright';
import { Box, Button, Typography } from '@mui/material';
import StaysTable from './../Stays/StaysTable';
import CmsFrame from './../CmsFrame';
import { StayClient } from '../../../clients/stayClient';
import { StayRecord } from '../../../models/Stay';
import StaysPage from '../../StaysPage';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function StaysCmsContent() {

    const[stays, setStays] = React.useState<StayRecord[]>([]);
    const[selectedStay, setSelectedStay] = React.useState<StayRecord | null>(null);

    const getStays = async() => {
        const users = await new StayClient().getStays({});
        setStays(users);
    }

    React.useEffect(() => {
        getStays();
        return
    }, []);

    function handleStaySelection(stay: StayRecord){
        console.log("Stay selected: ",{stay});
        setSelectedStay(stay);
    }

  return (
    <StaysPage>
    <Box sx={{ display: 'flex' }}>
        <CmsFrame />
        <Container maxWidth="xl" sx={{ mt: 10, mb: 4 }}>
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
                <Typography>
                    Selected Stay: {JSON.stringify(selectedStay, null, 2)}
                </Typography>
                
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
                <Button variant="contained" sx={{m:2, width:200}}>
                    <AddIcon />
                    Add Stay
                </Button>
                <Button variant="contained" sx={{m:2, width:200}} disabled={selectedStay == undefined}>
                    <EditIcon />
                    Edit Stay
                </Button>
                <Button variant="contained" sx={{m:2, width:200, bgcolor:"error.main"}} disabled={selectedStay == undefined}>
                    <DeleteIcon />
                    Delete Stay
                </Button>
            </Paper>
            </Grid>
            
            <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <StaysTable stays={stays} onSelect={handleStaySelection}/>
            </Paper>
            </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
        </Container>
        </Box>
        </StaysPage>
  );
}

export default function StaysCms() {
  return <StaysCmsContent />;
}