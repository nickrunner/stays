/* eslint-disable @next/next/no-img-element */
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";

import styles from "../../../styles/Carousel.module.css";
import { theme } from "../../Theme";

export interface CarouselImage {
  label: string;
  imgPath: string;
}
export interface ImageCarouselProps {
  images: CarouselImage[];
  width: any;
  height: any;
}

export default function ImageCarousel(props: ImageCarouselProps) {
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
    <Box sx={{ zIndex: 0, maxWidth: props.width, flexGrow: 1 }}>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents>
        {props.images.map((step, index) => (
          <div className={styles.PickGradient} key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                className={styles.CarouselImg}
                src={step.imgPath}
                alt={step.label}
                height={props.height}
                width={props.width}></img>
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
