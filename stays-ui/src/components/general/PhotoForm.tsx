import { Box } from "@mui/material";
import update from "immutability-helper";
import { DropzoneArea } from "material-ui-dropzone";
import React from "react";

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

  React.useEffect(() => {
    props.onChange(photos);
  }, [photos]);

  function handleFileUploadError(file: File, error: string) {
    console.log("Error: " + error);
  }

  function handleFileUploadComplete(file: File, url: string) {
    const newPhotos = photos;
    newPhotos.push({
      url: url,
      description: "",
      priority: newPhotos.length
    });
    setPhotos(newPhotos);
  }

  function handleFileUploadStatus(file: File, status: string, progress: number) {
    console.log("status: " + status + " progress: " + progress);
  }

  function handleSubmit(files: File[]) {
    const filesClient = new FilesClient();
    for (const file of files) {
      setLoading(true);
      filesClient.uploadFile(file, props.uploadPath, {
        onComplete: handleFileUploadComplete,
        onError: handleFileUploadError,
        onStatusChange: handleFileUploadStatus
      });
    }
    setLoading(false);
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
      <Box sx={{ mt: 1, mr: 5, ml: 5, justifyContent: "center" }} margin="auto">
        {/* <LoadingButton
          fullWidth={true}
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
          loading={loading}>
          Add Photo
        </LoadingButton> */}
        <DropzoneArea
          acceptedFiles={["image/*"]}
          filesLimit={5}
          maxFileSize={5000000}
          onChange={(files: File[]) => {
            handleSubmit(files);
            setOpen(false);
          }}
          showPreviews={false}
          showFileNamesInPreview={true}
          clearOnUnmount={true}
        />
      </Box>

      <Box margin="auto" sx={{ justifyContent: "center" }}>
        {photos.map((photo, i) => renderCard(photo, i))}
      </Box>
    </React.Fragment>
  );
}
