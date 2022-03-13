import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import Image from "next/image";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";

import styles from "../../../styles/Carousel.module.css";
import { theme } from "../../Theme";
import StaysImage from "../general/StaysImage";

export interface StaysCarouselImage {
  label: string;
  imgPath: string;
}
export interface StaysImageCarouselProps {
  images: StaysCarouselImage[];
  width: string;
  height: string;
  imgWidth: number;
  imgHeight: number;
}

export default function NextImageCarousel(props: StaysImageCarouselProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        width: props.width,
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
      }}>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        style={{ alignItems: "center", justifyContent: "center", margin: "auto" }}
        enableMouseEvents>
        {props.images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                sx={{
                  display: { xs: "grid", sm: "grid" },
                  gap: 5,
                  width: props.imgWidth,
                  height: props.height,
                  mt: 5,
                  margin: "auto",
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                  align: "center",
                  alignContent: "center"
                }}>
                <Typography
                  // sx={{mt:"5"}}
                  variant="caption"
                  align="center">
                  {step.label}
                </Typography>

                <StaysImage
                  margin="auto"
                  className={styles.CarouselImg}
                  src={step.imgPath}
                  alt={step.label}
                  height={props.imgHeight}
                  loading="lazy"
                  blur={true}
                  width={props.imgWidth}
                  mode="at_max"></StaysImage>
              </Box>
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </Box>
  );
}
