import { ArrowDownward, BookmarkAdded, Loyalty } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";

import { StayRecord } from "../../../../../models";
import { MembershipCardProps } from "../Membership/MembershipCard";

export interface EarlyBookingCardProps {
  stay: StayRecord;
}
export default function EarlyBookingCard(props: MembershipCardProps) {
  const router = useRouter();
  return (
    <CardActionArea
      onClick={() => {
        router.push("/hosts/portal/early-booking");
      }}>
      <Card sx={{ height: "100%" }} {...props}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                EARLY BOOKING
              </Typography>
              <Typography color="textPrimary" variant="h6">
                Scheduled
              </Typography>
            </Grid>
            <Grid item>
              <BookmarkAdded
                sx={{
                  color: "primary.main",
                  height: 45,
                  width: 45
                }}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              pt: 2
            }}>
            <Typography color="textSecondary" variant="caption">
              June 4, 2022
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
