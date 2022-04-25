import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";

import { Offer, OfferRecord, StayRecord } from "../../../models";
import Info from "../../general/Info";

export interface OfferCardProps {
  offer: OfferRecord;
  stay: StayRecord;
  key?: any;
}

export default function OfferCard(props: OfferCardProps) {
  return (
    <React.Fragment key={props.key}>
      <Paper
        sx={{
          maxWidth: "lg",
          display: "grid",
          border: 1,
          borderColor: "primary.dark",
          borderRadius: 2,
          p: 2
        }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ p: 2, display: "grid" }}>
            <Typography variant="h5">{props.offer.title}</Typography>
            <Typography variant="subtitle1">May - June</Typography>
          </Box>
          <Button sx={{ m: "auto", width: 200, height: 50 }} variant="contained">
            Book Now
          </Button>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", borderRadius: 2, p: 2 }}>
            <img
              width={300}
              height={300}
              src={props.stay.photos[0].url}
              alt={props.stay.photos[0].description}
            />
          </Box>
          <Box sx={{ maxWidth: 300, px: 2 }}>
            <Info title={props.stay.name} body={props.offer.description} />
          </Box>
        </Box>
      </Paper>
    </React.Fragment>
  );
}
