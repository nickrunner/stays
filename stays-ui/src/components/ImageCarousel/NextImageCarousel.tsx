import * as React from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { theme } from "../../Theme";
import Image from 'next/image';
import styles from "../../../styles/NextCarousel.module.css";
import { Typography } from '@mui/material';

export interface NextCarouselImage {
    label: string,
    imgPath: string
}
export interface NextImageCarouselProps {
    images: NextCarouselImage[];
    width: string;
    height: string;
}

export default function NextImageCarousel(props: NextImageCarouselProps) {
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
    <Box sx={{ maxWidth: props.width, flexGrow: 1, margin:"auto" }}>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {props.images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
            <Box sx={{
              display:{ xs:"grid", sm:"grid"},
              gap: 5,
              width: props.width,
              height: props.height,
              mt: 5
            }}>
            
            <Typography
                // sx={{mt:"5"}}
                variant='caption'
                align="center"
              >
                {step.label}
              </Typography>
              
              <Image
                  className={styles.NextCarouselImg}
                  src={step.imgPath}
                  alt={step.label}
                  height={props.height}
                  width={props.width}>
              </Image>
              
              
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
