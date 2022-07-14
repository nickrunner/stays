import { LoadingButton } from "@mui/lab";
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

import { StayPromotionClient } from "../../clients/stayPromotionClient";
import { StayRecord } from "../../models";
import CreatePost from "./CreatePost";
import SelectPlatform from "./SelectPlatform";
import SelectPromotionType from "./SelectPromotionType";
import { stayPromotionContext } from "./StayPromotionContext";
import StayPromotionMedia from "./StayPromotionMedia";
import StayPromotionReview from "./StayPromotionReview";

export interface AddStayPromotionProps {
  stay: StayRecord | undefined;
}

export default function AddStayPromotion(props: AddStayPromotionProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const { promotion } = React.useContext(stayPromotionContext);
  const [loading, setLoading] = React.useState(false);

  const steps = [
    {
      label: "Select Platform (" + promotion.socialPlatform + ")",
      content: <SelectPlatform />
    },
    {
      label: "Choose Promotion Type (" + promotion.type + ")",
      content: <SelectPromotionType />
    },
    {
      label: "Create your Post",
      content: <CreatePost />
    },
    {
      label: "Upload Media (" + promotion.media.length + ")",
      content: <StayPromotionMedia />
    },
    {
      label: "Preview and Submit",
      content: <StayPromotionReview stay={props.stay} />
    }
  ];

  const handleNext = () => {
    promotion.stayId = props.stay ? props.stay.id : "none";
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const stayPromotionClient = new StayPromotionClient();
    await stayPromotionClient.addStayPromotion(promotion);
    setLoading(false);
    setActiveStep(0);
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          New Promotion for {props.stay ? props.stay.name : ""}
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
                      {index === steps.length - 1 ? "Looks Good" : "Continue"}
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
            <Typography>All steps completed - ready to submit</Typography>
            <LoadingButton loading={loading} onClick={handleSubmit} sx={{ mt: 1, mr: 1 }}>
              Submit
            </LoadingButton>
          </Paper>
        )}
      </Paper>
    </Container>
  );
}
