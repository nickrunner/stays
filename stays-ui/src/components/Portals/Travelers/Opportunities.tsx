import { Box, Typography } from "@mui/material";
import React from "react";

import { OfferClient } from "../../../clients/offerClient";
import { GetOffersResponse, StayRecord } from "../../../models";
import OfferCard from "./OfferCard";
import TravelerPortal from "./TravelerPortal";

export default function Opportunities(props: any) {
  const [offersResponse, setOffersResponse] = React.useState<GetOffersResponse>([]);

  const getOffers = async () => {
    try {
      const offers = await new OfferClient().getOffersFromFavorites();
      setOffersResponse(offers);
    } catch (err) {
      console.log("FAILED getting offers: " + JSON.stringify(err, null, 2));
    }
  };

  React.useEffect(() => {
    getOffers();
    return;
  }, []);

  return (
    <TravelerPortal>
      <Box sx={{ p: 5, elevation: 20, justifyContent: "center", display: "grid" }}>
        <Typography align="center" variant="h1">
          Special offers for you
        </Typography>
        <Box sx={{ display: "grid", gap: 5, p: 5 }}>
          {offersResponse.map((offer) => (
            <React.Fragment key={offer.offer.stayId}>
              <OfferCard offer={offer.offer} stay={offer.stay as StayRecord} />
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </TravelerPortal>
  );
}
