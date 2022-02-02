import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../../../components/Copyright';
import { Box, Button, Modal, Typography } from '@mui/material';
import StaysTable from '../Stays/StaysTable';
import CmsFrame from '../CmsFrame';
import { StayClient } from '../../../clients/stayClient';
import { StayRecord } from '../../../models/Stay';
import StaysPage from '../../StaysPage';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import JSONPretty from 'react-json-pretty';
import { Navigate, useNavigate } from 'react-router-dom';
import { StayAttributeRecord, StayAttributeType } from '../../../models/StayAttributes';
import StayAttributesTable from './StayAttributesTable';
import AddStayAttribute from './AddStayAttribute';

export interface StayAttributeCmsProps {
    type: StayAttributeType
}

export default function StayAttributesCms(props: StayAttributeCmsProps) {
    let navigate = useNavigate();
    const[stayAttributes, setStayAttributes] = React.useState<StayAttributeRecord[]>([]);
    const[selectedStayAttribute, setSelectedStayAttribute] = React.useState<StayAttributeRecord | undefined>(undefined);
    const [addOpen, setAddOpen] = React.useState(false);
    const handleAddOpen = () => setAddOpen(true);
    const handleAddClose = () => setAddOpen(false);

    const getStayAttributes = async() => {
        console.log("Getting stay attributes for "+props.type);
        const stayAttributes: StayAttributeRecord[] = await new StayClient().getStayAttributes(props.type);
        setStayAttributes(stayAttributes);
    }


    React.useEffect(() => {
        setStayAttributes([]);
        getStayAttributes();
    }, [props.type]);

    function handleStayAttributeSelection(stayAttribute: StayAttributeRecord){
        setSelectedStayAttribute(stayAttribute);
    }

    function getAttributeTypeText(){
        switch(props.type){
            case StayAttributeType.Amenity:
                return "Amenity";
            case StayAttributeType.PropertyType:
                return "Property Type";
            case StayAttributeType.SpecialInterest:
                return "Special Interest";
        }
    }

  return (
    <StaysPage>

        <Modal 
        open={addOpen}
        onClose={handleAddClose}
        >
            <AddStayAttribute type={props.type} />
        </Modal>

        <Box sx={{ display: 'flex' }}>
            <CmsFrame />
            <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>

                <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>

                    <Button variant="contained" sx={{m:1, width:200}} onClick={() => setAddOpen(true)}>
                        <AddIcon />
                        Add {getAttributeTypeText()}
                    </Button>

                    <Button variant="contained" sx={{m:1, width:200}} disabled={selectedStayAttribute == undefined}>
                        <EditIcon />
                        Edit {getAttributeTypeText()}
                    </Button>
                    <Button variant="contained" sx={{m:1, width:200, bgcolor:"error.main"}} disabled={selectedStayAttribute == undefined}>
                        <DeleteIcon />
                        Delete {getAttributeTypeText()}
                    </Button>
                    
                    </Paper>

                </Grid>
                    
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 600,
                        }}
                    >
                         <StayAttributesTable type={props.type} stayAttributes={stayAttributes} onSelect={handleStayAttributeSelection}/>  
                    </Paper>
                    </Grid>

                    <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 600,
                        overflow: "auto"
                        }}
                    >
                        {/* JSON data */}
                        <Typography>
                            <JSONPretty data={selectedStayAttribute}/>
                        </Typography>
                        
                    </Paper>
                </Grid>
                
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
        </Box>
    </StaysPage>
  );
}
