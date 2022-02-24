import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { theme } from "../Theme";
import Image from 'next/image';
import styles from "../../styles/Carousel.module.css";

export interface CarouselImage {
    label: string,
    imgPath: string
}
export interface ImageCarouselProps {
    images: CarouselImage[];
    width: string;
    height: string;
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
    <Box sx={{ maxWidth: props.width, flexGrow: 1 }}>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {props.images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
            //   <Box
            //     component="img"
            //     sx={{
            //       height: props.height,
            //       display: 'block',
            //       maxWidth: props.width,
            //       overflow: 'hidden',
            //       width: '100%',
            //     }}
            //     src={step.imgPath}
            //     alt={step.label}
            //   />
            <Image
                className={styles.CarouselImg}
                src={step.imgPath}
                alt={step.label}
                height={props.height}
                width={props.width}>
            </Image>
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}
