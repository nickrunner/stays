import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import update from "immutability-helper";
import React from "react";
import { useDropzone } from "react-dropzone";

import { FilesClient } from "../../clients/filesClient";
import { Photo } from "../../models";
import { PhotoCard } from "./PhotoCard";

export interface PhotoFormProps {
  defaults: Photo[];
  uploadPath: string;
  onChange: (photos: Photo[]) => void;
}

export default function PhotoForm(props: PhotoFormProps) {
  const [photos, setPhotos] = React.useState<Photo[]>(props.defaults);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file: File) => (
    <li key={file.name}>
      {file.name} - {file.size / 1000000} MB
    </li>
  ));

  React.useEffect(() => {
    props.onChange(photos);
  }, [photos]);

  function handleFileUploadError(file: File, error: string) {
    console.log("Error: " + error);
    setLoading(false);
  }

  function handleFileUploadComplete(file: File, url: string) {
    const newPhotos = [];
    newPhotos.push({
      url: url,
      description: "",
      priority: newPhotos.length
    });
    setPhotos(photos.concat(newPhotos));
    setLoading(false);
  }

  function handleFileUploadStatus(file: File, status: string, progress: number) {
    console.log("status: " + status + " progress: " + progress);
  }

  function handleSubmit() {
    const filesClient = new FilesClient();
    for (const file of acceptedFiles) {
      setLoading(true);
      filesClient.uploadFile(file, props.uploadPath, {
        onComplete: handleFileUploadComplete,
        onError: handleFileUploadError,
        onStatusChange: handleFileUploadStatus
      });
    }
  }

  const moveCard = React.useCallback(
    (dragIndex, hoverIndex) => {
      const dragPhoto = photos[dragIndex];
      setPhotos(
        update(photos, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragPhoto]
          ]
        })
      );
    },
    [photos]
  );
  const renderCard = (photo: Photo, index: number) => {
    return (
      <PhotoCard
        key={photo.priority}
        photo={photo}
        index={index}
        id={photo.priority}
        moveCard={moveCard}
      />
    );
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          mt: 1,
          mr: 5,
          ml: 5,
          justifyContent: "center",
          width: 500,
          height: 200,
          borderColor: "primary.dark",
          borderWidth: "2px",
          borderRadius: 2,
          borderStyle: "dashed",
          display: "flex",
          cursor: "pointer"
        }}
        margin="auto">
        <div {...getRootProps({ className: "dropzone disabled" })}>
          <input {...getInputProps()} />
          <br></br>
          <br></br>
          <br></br>
          <p>Drag and drop media here, or click to select files</p>
        </div>
      </Box>
      <Box sx={{ p: 4 }}>{files}</Box>
      <LoadingButton
        fullWidth={true}
        variant="contained"
        color="primary"
        onClick={() => handleSubmit()}
        loading={loading}>
        Upload
      </LoadingButton>{" "}
      {/* <Box margin="auto" sx={{ justifyContent: "center" }}>
        {photos.map((photo, i) => renderCard(photo, i))}
      </Box> */}
    </React.Fragment>
  );
}
