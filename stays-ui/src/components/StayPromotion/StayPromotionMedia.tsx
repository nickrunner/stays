import RootRef from "@material-ui/core/RootRef";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";

import { Photo, PromotionMediaType, StayRecord } from "../../models";
import PhotoForm from "../general/PhotoForm";
import { stayPromotionContext } from "./StayPromotionContext";

export default function StayPromotionMedia() {
  const { getRootProps, getInputProps } = useDropzone();
  const { ref, ...rootProps } = getRootProps();
  const { promotion } = React.useContext(stayPromotionContext);

  function setMedia(photos: Photo[]) {
    for (const photo of photos) {
      promotion.media.push({ url: photo.url, type: PromotionMediaType.Photo });
    }
    console.log("Promotion Media: ", promotion);
  }

  return (
    <PhotoForm
      uploadPath={"/images/promotions/" + promotion.stayId}
      defaults={[]}
      onChange={(photos) => {
        console.log("Photos: " + JSON.stringify(photos, null, 2));
        setMedia(photos);
      }}
    />
  );
}
