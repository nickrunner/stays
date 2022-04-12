import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import * as React from "react";

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0,
  transition: theme.transitions.create("opacity")
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  margin: 1,
  borderRadius: 0,
  [theme.breakpoints.down("md")]: {
    width: "99% !important",
    height: 100
  },
  "&:hover": {
    zIndex: 1
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15
  },
  "&:hover .imageMarked": {
    opacity: 0
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor"
  },
  "& .imageTitle": {
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`
  },
  "& .imageMarked": {
    height: 3,
    width: 0,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
}));

export interface ImageProp {
  width?: number;
  feature?: boolean;
  title: string;
  src: string;
  onClick: (title: string) => void;
}

export default function Collage(props: any) {
  function getRandomNumberBetweenIncluding(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomNumbersWithFixedSum(quantity: number, sum: number): number[] {
    // only a single number required; return the passed sum.
    if (quantity === 1) {
      return [sum];
    }

    // Create one random number and return an array containing that number
    // as first item. Then use the spread operator and recursively execute
    // the function again with a decremented quantity and the updated
    // maximum possible sum.
    const randomNum = getRandomNumberBetweenIncluding(25, 75);
    return [randomNum, ...randomNumbersWithFixedSum(quantity - 1, sum - randomNum)];
  }

  function getImages(): ImageProp[] {
    let i = 0;
    let widths: number[] = randomNumbersWithFixedSum(props.cols, 99);
    return props.images.map((image: ImageProp) => {
      if (i % props.cols === 0) {
        widths = randomNumbersWithFixedSum(props.cols, 99);
        i = 0;
      }
      const retval = {
        src: image.src,
        title: image.title,
        width: image.width ?? widths[i % props.cols] + "%",
        onClick: image.onClick
      };
      i++;
      return retval;
    });
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      <Box sx={{ width: "50%" }}>
        <ImageIconButton
          sx={{ display: props.feature ? "block" : "none" }}
          key={props.feature ? props.feature.title : ""}
          onClick={() => {
            console.log("IMAGE BUTTON CLICK");
            props.onClick(props.feature ? props.feature.title : "");
          }}
          style={{
            height: props.height * 2,
            width: props.feature ? props.feature.width : 0
          }}>
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
              backgroundImage: `url(${props.feature ? props.feature.src : ""})`
            }}
          />
          <ImageBackdrop className="imageBackdrop" />
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "common.white"
            }}>
            <Typography component="h3" variant="h6" color="inherit" className="imageTitle">
              {props.feature ? props.feature.title : ""}
              <div className="imageMarked" />
            </Typography>
          </Box>
        </ImageIconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: props.feature ? "50%" : "100%",
          position: "flex-end"
        }}>
        {getImages().map((image: ImageProp) => (
          <ImageIconButton
            key={image.title}
            onClick={() => {
              console.log("IMAGE BUTTON CLICK");
              props.onClick(image.title);
            }}
            style={{
              height: props.height,
              width: image.width
            }}>
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                backgroundImage: `url(${image.src})`
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "common.white"
              }}>
              <Typography component="h3" variant="h6" color="inherit" className="imageTitle">
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Box>
  );
}
