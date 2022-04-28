import { Box, Container, Grid } from "@mui/material";
import React from "react";

import { globalContext } from "../../../../GlobalStore";
import { StayRecord } from "../../../../models";
import HostPortal from "../HostPortal";
import CancellationCard from "./Cancellations/CancellationsCard";
import VisibilityCard from "./Demand/DemandCard";
import EarlyBookingCard from "./EarlyBooking/EarlyBookingCard";
import MembershipCard from "./Membership/MembershipCard";
import OffersCard from "./Offers/OffersCard";
import { PromotionsTable } from "./PromotionsTable";

export default function HostDashboard(props: any) {
  const { globalState, dispatch } = React.useContext(globalContext);

  function getSelectedStay(): StayRecord | undefined {
    if (!globalState) {
      return undefined;
    }
    if (!globalState.hosting) {
      return undefined;
    }
    return globalState.hosting.selectedStay;
  }

  return (
    <HostPortal>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4
        }}>
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <MembershipCard stay={getSelectedStay() as StayRecord} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <VisibilityCard stay={getSelectedStay() as StayRecord} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <OffersCard stay={getSelectedStay() as StayRecord} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <EarlyBookingCard stay={getSelectedStay() as StayRecord} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <CancellationCard stay={getSelectedStay() as StayRecord} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <PromotionsTable stay={getSelectedStay() as StayRecord} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </HostPortal>
  );
}
