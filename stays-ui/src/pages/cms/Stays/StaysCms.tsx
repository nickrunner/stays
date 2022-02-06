import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../../../components/Copyright';
import { Box, Button, Modal, Typography } from '@mui/material';
import StaysTable from './../Stays/StaysTable';
import CmsFrame from './../CmsFrame';
import { StayClient } from '../../../clients/stayClient';
import { StayRecord } from '../../../models/Stay';
import StaysPage from '../../StaysPage';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import JSONPretty from 'react-json-pretty';
import { Navigate, useNavigate } from 'react-router-dom';
import { StayContext } from '../../../components/Stay/StayContext';


function StaysCmsContent() {
    let navigate = useNavigate();
    
    const[selectedStay, setSelectedStay] = React.useState<StayRecord | undefined>(undefined);


    function handleStaySelection(stay: StayRecord){
        console.log("Stay selected: ",{stay});
        setSelectedStay(stay);
    }

    function getTableHeight(){
        return window.innerHeight * 0.8;
    }

  return (
    <StaysPage>
        <Box sx={{ display: 'flex' }}>
            <CmsFrame />
            <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>

                <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>

                    <Button variant="contained" sx={{m:1, width:200}} onClick={() => navigate("/cms/stays/add")}>
                        <AddIcon />
                        Add Stay
                    </Button>

                    <Button variant="contained" sx={{m:1, width:200}} disabled={selectedStay == undefined}>
                        <EditIcon />
                        Edit Stay
                    </Button>
                    <Button variant="contained" sx={{m:1, width:200, bgcolor:"error.main"}} disabled={selectedStay == undefined}>
                        <DeleteIcon />
                        Delete Stay
                    </Button>
                    
                    </Paper>

                </Grid>
                    
                <Grid item xs={12} >
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: getTableHeight(),
                        }}
                    >
 
                         <StaysTable onSelect={handleStaySelection}/>  
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