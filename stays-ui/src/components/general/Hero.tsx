import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

import styles from "../../../styles/ComingSoon.module.css";

export interface HeroProps {
  height?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  image: string;
  blur?: string;
  onButtonClick: () => void;
}

export default function Hero(props: HeroProps) {
  return (
    <React.Fragment>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: props.height,
          bgcolor: "primary.dark",
          zIndex: -1,
          justifyContent: "center"
        }}>
        <Image
          className={styles.HeroImage}
          src={props.image}
          layout="fill"
          priority
          placeholder="blur"
          blurDataURL={props.blur}
          alt="Beautiful Vacation Rental"
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          height: props.height
        }}>
        <Box
          sx={{
            margin: { xs: "auto", sm: 0 },
            maxWidth: {
              xs: 400,
              sm: 700,
              lg: 800,
              xl: 1000
            },
            p: { xs: "10%", sm: "5%" },
            pt: { xs: "20%" },
            display: "grid",
            textAlign: { xs: "center", sm: "left" },
            verticalAlign: "center",
            alignContent: { xs: "center", sm: "left" }
            //bgcolor:"secondary.main"
          }}>
          <Typography
            variant="h1"
            color="common.white"
            // sx={{mt:{xs:"5%", sm:"10%"}}}
            fontWeight={700}>
            {props.heading}
          </Typography>
          <Typography
            sx={{
              mt: { xs: "15%", sm: "5%" },
              align: { xs: "center", lg: "center" }
            }}
            variant="h6"
            color="common.white"
            fontWeight={400}
            gutterBottom>
            {props.description}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              props.onButtonClick();
            }}
            size="large"
            sx={{
              margin: { xs: "auto", sm: 0 },
              mt: { xs: "25%", sm: "7%" },
              width: { xs: 200, md: 300 }
            }}>
            {props.buttonText}
          </Button>
        </Box>
      </Box>

      <Box
        alignSelf="center"
        alignItems="center"
        alignContent="center"
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "90%",
          display: "flex",
          flexDirection: "column"
        }}>
        <KeyboardDoubleArrowDown
          fontSize="large"
          sx={{
            margin: "auto"
          }}></KeyboardDoubleArrowDown>
      </Box>
    </React.Fragment>
  );
}
