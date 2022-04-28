import { ArrowDownward, BookmarkAdded, Loyalty } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Modal,
  Typography
} from "@mui/material";
import { isAfter } from "date-fns";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React from "react";

import { StayClient } from "../../../../../clients/stayClient";
import { StayRecord } from "../../../../../models";
import AddButton from "../../../../general/AddButton";
import { MembershipCardProps } from "../Membership/MembershipCard";
import EarlyBookingCalendar from "./EarlyBookingCalendar";

export interface EarlyBookingCardProps {
  stay: StayRecord;
}
export default function EarlyBookingCard(props: MembershipCardProps) {
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [stay, setStay] = React.useState<StayRecord | undefined>(props.stay);

  // React.useEffect(() => {
  //   updateStay();
  //   return;
  // }, []);

  React.useEffect(() => {
    setStay(props.stay);
  }, [props.stay]);

  async function updateStay() {
    const s = await new StayClient().getStay(props.stay.id);
    setStay(s);
  }

  function closeCalendar() {
    setCalendarOpen(false);
    updateStay();
  }

  function getEarlyBookingState(): string {
    if (!stay) {
      return "";
    }
    if (!stay.earlyBooking) {
      return "None";
    }
    if (isAfter(stay.earlyBooking.startDate, Date.now())) {
      return "Scheduled";
    } else if (isAfter(Date.now(), stay.earlyBooking.endDate)) {
      return "Closed";
    } else {
      return "Active";
    }
  }

  function getFormattedDateRange(): string {
    if (!stay) {
      return "";
    }
    if (!stay.earlyBooking) {
      return "";
    }
    return (
      format(stay.earlyBooking.startDate, "MMMM, do, yyyy") +
      " - " +
      format(stay.earlyBooking.endDate, "MMMM, do, yyyy")
    );
  }

  return (
    <React.Fragment>
      <Modal
        open={calendarOpen}
        aria-labelledby="open early booking calendar"
        aria-describedby="calendar for creating early bookings"
        onClose={() => {
          closeCalendar();
        }}>
        <React.Suspense fallback={<p>Waiting...</p>}>
          <EarlyBookingCalendar close={closeCalendar} stay={props.stay} />
        </React.Suspense>
      </Modal>
      <Card sx={{ height: "100%" }} {...props}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                EARLY BOOKING
              </Typography>
              <Typography color="textPrimary" variant="h6">
                {getEarlyBookingState()}
              </Typography>
            </Grid>
            <Grid item>
              <AddButton
                onClick={() => {
                  setCalendarOpen(true);
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
              {getFormattedDateRange()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
