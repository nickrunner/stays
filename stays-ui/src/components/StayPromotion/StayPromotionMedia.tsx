import RootRef from "@material-ui/core/RootRef";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";

import PhotoForm from "../general/PhotoForm";

export default function StayPromotionMedia() {
  const { getRootProps, getInputProps } = useDropzone();
  const { ref, ...rootProps } = getRootProps();

  return (
    /* <Dropzone
        onDragEnter={() => console.log("Drag Enter")}
        onDragOver={() => console.log("Drag Over")}
        onDragLeave={() => console.log("Drag Leave")}
        onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <Box
            sx={{
              margin: "auto",
              height: "100%",
              display: "grid",
              verticalAlign: "center",
              textAlign: "center",
              justifyContent: "center"
            }}>
            <Box sx={{ mt: 8 }}>
              <input {...getInputProps()} />
              <Typography variant="subtitle1">Add Photos or Videos</Typography>
              <Typography variant="subtitle2">Or Drag and Drop</Typography>
            </Box>
          </Box>
        )}
      </Dropzone> */
    <PhotoForm
      uploadPath="/images/test"
      defaults={[]}
      onChange={(photos) => {
        console.log("Photos: " + JSON.stringify(photos, null, 2));
      }}
    />
  );
}
