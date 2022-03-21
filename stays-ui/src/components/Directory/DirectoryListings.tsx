import { Grid } from "@mui/material";

import { StayClient } from "../../clients/stayClient";
import { StayRecord } from "../../models";
import StayDirectoryCard from "./StayDirectoryCard";

export default function DirectoryListings(props: any) {
  return (
    <Grid
      container
      justifyContent="center"
      spacing={3}
      sx={{ p: 5, bgcolor: "background.default" }}>
      {props.stays.map((stay: StayRecord) => (
        <Grid key={stay.id} item>
          <StayDirectoryCard stay={stay} />
        </Grid>
      ))}
    </Grid>
  );
}
