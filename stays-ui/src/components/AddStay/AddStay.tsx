import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StayInfoForm from './StayInfoForm';
import StayLocation from './StayLocation';
import StayPhotoForm from './StayPhotoForm';
import StayReview from './StayReview';
import { Location, Photo, Stay } from '../../models/Stay';
import { globalContext } from '../../GlobalStore';
import { StayAttribute } from '../../models/StayAttributes';
import { AddStayContext, addStayContext } from './AddStayContext';
import { StayClient } from '../../clients/stayClient';


const steps = ['About', "Photos", 'Review'];




export default function AddStay(props: any) {
  const [activeStep, setActiveStep] = React.useState(0);
  const { stay } = React.useContext(addStayContext);


  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <StayInfoForm />;
      case 1:
        return <StayPhotoForm />;
      case 2:
        return <StayReview />
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {

    switch(activeStep){
        case 0:
            break;
        case 1:
            break;
        case 2:
            new StayClient().createStay(stay);
            break;
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <AddStayContext>
      <Container component="main" maxWidth="sm" sx={{ mb: 4}}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }}}>
          <Typography component="h1" variant="h4" align="center">
            Add Stay
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Stay has been saved
                </Typography>
                <Typography variant="subtitle1">
                  We will send an email to confirm.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
      </AddStayContext>

  );
}
