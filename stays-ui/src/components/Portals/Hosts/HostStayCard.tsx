import { BookOnline, LockClock } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Typography
} from "@mui/material";

import { StayRecord } from "../../../models";

export interface HostStayCardProps {
  stay: StayRecord;
}

export default function HostStayCard(props: HostStayCardProps) {
  function handleClick() {
    console.log("Handle click: " + props.stay.id);
  }
  return (
    <CardActionArea
      onClick={() => {
        handleClick();
      }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: 3
            }}>
            <Avatar alt="Product" src={props.stay.photos[0].url} variant="rounded" />
          </Box>
          <Typography align="center" color="textPrimary" gutterBottom variant="h5">
            {props.stay.name}
          </Typography>
          <Typography align="center" color="textPrimary" variant="body1">
            {`${props.stay.location.address.city}, ${props.stay.location.address.state}`}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
            <Grid
              item
              sx={{
                alignItems: "center",
                display: "flex"
              }}>
              <LockClock color="action" />
              <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                Updated 2hr ago
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: "center",
                display: "flex"
              }}>
              <BookOnline color="action" />
              <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                {props.stay.demand}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </CardActionArea>
  );
}
