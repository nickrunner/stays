import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { StayRecord } from "../../models";
import CreatePost from "./CreatePost";
import SelectPlatform from "./SelectPlatform";
import SelectPromotionType from "./SelectPromotionType";
import StayPromotionMedia from "./StayPromotionMedia";

const steps = [
  {
    label: "Select Platform",
    content: <SelectPlatform />
  },
  {
    label: "Choose Promotion Type",
    content: <SelectPromotionType />
  },
  {
    label: "Create your Post",
    content: <CreatePost />
  },
  {
    label: "Upload Media",
    content: <StayPromotionMedia />
  },
  {
    label: "Preview and Submit",
    content: <SelectPlatform />
  }
];

export interface AddStayPromotionProps {
  stay: StayRecord | undefined;
}

export default function AddStayPromotion(props: AddStayPromotionProps) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          New Promotion
        </Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === steps.length - 1 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }>
                {step.label}
              </StepLabel>
              <StepContent>
                {step.content}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Paper>
    </Container>
  );
}
