import { ArrowDownward, ArrowUpward, LocalOffer, Loyalty, People } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Modal,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import { StayClient } from "../../../../../clients/stayClient";
import { OfferRecord, StayRecord } from "../../../../../models";
import AddButton from "../../../../general/AddButton";
import AddOffer from "./AddOffer";

export interface OffersCardProps {
  stay: StayRecord | undefined;
}
export default function OffersCard(props: OffersCardProps) {
  const [addOfferOpen, setAddOfferOpen] = React.useState(false);
  const [offers, setOffers] = React.useState<OfferRecord[]>([]);
  const [latestOffer, setLatestOffer] = React.useState<OfferRecord | undefined>(undefined);

  const router = useRouter();

  function closeAddOffer() {
    setAddOfferOpen(false);
    getOffers();
    getLatestOffer();
  }

  async function getOffers() {
    if (!props.stay) {
      return;
    }
    const stayOffers: OfferRecord[] = await new StayClient().getStaysOffers(props.stay.id);
    setOffers(stayOffers);
  }

  async function getLatestOffer() {
    if (!props.stay) {
      return;
    }
    const offer = await new StayClient().getStaysLatestOffer(props.stay.id);
    setLatestOffer(offer);
  }

  function getLatestOfferTitle() {
    return latestOffer ? latestOffer.title : "";
  }

  React.useEffect(() => {
    getOffers();
    getLatestOffer();
    return;
  }, []);

  return (
    <React.Fragment>
      <Modal
        open={addOfferOpen}
        onClose={() => {
          closeAddOffer();
        }}>
        <React.Suspense fallback={<p>Waiting...</p>}>
          <AddOffer close={closeAddOffer} stay={props.stay} />
        </React.Suspense>
      </Modal>
      <CardActionArea
        onClick={() => {
          router.push("/hosts/portal/offers");
        }}>
        <Card sx={{ height: "100%" }} {...props}>
          <CardContent>
            <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
              <Grid item>
                <Typography color="textSecondary" gutterBottom variant="overline">
                  Offers
                </Typography>
                <Typography color="textPrimary" variant="h6">
                  {offers.length} Offers
                </Typography>
              </Grid>
              <Grid item>
                <AddButton
                  onClick={() => {
                    setAddOfferOpen(true);
                  }}></AddButton>
              </Grid>
            </Grid>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                pt: 2
              }}>
              <Typography color="textSecondary" variant="caption">
                {getLatestOfferTitle()}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </CardActionArea>
    </React.Fragment>
  );
}
