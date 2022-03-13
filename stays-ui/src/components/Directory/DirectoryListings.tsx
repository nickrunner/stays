import { Grid } from "@mui/material";

import { StayRecord } from "../../models";
import StayDirectoryCard from "./StayDirectoryCard";

export default function DirectoryListings(props: any) {
  return (
    <Grid
      container
      justifyContent="center"
      spacing={5}
      sx={{ p: 5, bgcolor: "background.default" }}>
      {props.stays.map((stay: StayRecord) => (
        <Grid key={stay.id} item>
          <StayDirectoryCard stay={stay} />
        </Grid>
      ))}
    </Grid>
  );
}
