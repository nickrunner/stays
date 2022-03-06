import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoadingButton } from "@mui/lab";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { StayClient } from "../../clients/stayClient";
import { stayContext } from "./StayContext";
import StayInfoForm from "./StayInfoForm";
import StayLocation from "./StayLocation";
import StayPhotoForm from "./StayPhotoForm";
import StayReview from "./StayReview";

const steps = ["About", "Photos", "Review"];

export default function AddStay() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { stay } = React.useContext(stayContext);
  const [loading, setLoading] = React.useState(false);

  const createStay = async () => {
    setLoading(true);

    try {
      await new StayClient().createStay(stay);
    } catch (e) {
      console.log("Error posting stay: ", { e });
    }

    setLoading(false);
    setActiveStep(activeStep + 1);
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Stay Information
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <StayInfoForm />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography variant="h6">Stay Address</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <StayLocation />
              </AccordionDetails>
            </Accordion>
          </div>
        );
      case 1:
        return (
          <div>
            <DndProvider backend={HTML5Backend}>
              <StayPhotoForm />
            </DndProvider>
          </div>
        );
      case 2:
        return <StayReview />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        stay.hostEmail = "admin@stays.co";
        createStay();
        return;
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
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
              <Typography variant="subtitle1">We will send an email to confirm.</Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <LoadingButton
                  variant="contained"
                  onClick={handleNext}
                  loading={loading}
                  sx={{ mt: 3, ml: 1 }}>
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </LoadingButton>
              </Box>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </Container>
  );
}
