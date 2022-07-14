import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";

import { StayRecord } from "../../models";
import Info from "../general/Info";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import { stayPromotionContext } from "./StayPromotionContext";

export interface StayPromotionReviewProps {
  stay: StayRecord | undefined;
}

export default function StayPromotionReview(props: StayPromotionReviewProps) {
  const { promotion } = React.useContext(stayPromotionContext);

  return (
    <Box sx={{ display: "grid", width: 500 }}>
      <Info
        title={promotion.socialPlatform + " " + promotion.type}
        body={props.stay ? props.stay.name : ""}
      />
      <Info title="Summary" body={promotion.summary ?? ""} />
      <Info title="Details" body={promotion.details ?? ""} />
      <Info title="Booking Link" body={promotion.bookingLink ?? ""} />
      <Info title="Run Date" body={format(promotion.startDate, "MMMM, do, y") ?? ""} />
      <Typography variant="subtitle1">Media</Typography>
      <ImageCarousel
        images={promotion.media.map((m) => {
          return { label: m.url, imgPath: m.url };
        })}
        width={200}
        height={200}
      />
    </Box>
  );
}
