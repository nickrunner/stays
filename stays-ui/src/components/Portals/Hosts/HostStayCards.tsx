import { Box, Grid, Pagination } from "@mui/material";
import React from "react";

import stays from "../../../../pages/cms/stays";
import { StayRecord } from "../../../models";
import HostStayCard from "./HostStayCard";

export interface HostStayCardsProps {
  stays: StayRecord[];
}

export default function HostStayCards(props: HostStayCardsProps) {
  return (
    <React.Fragment>
      <Box sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {props.stays.map((stay) => (
            <Grid item key={stay.id} lg={4} md={6} xs={12}>
              <HostStayCard stay={stay} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 3
        }}>
        <Pagination color="primary" count={3} size="small" />
      </Box>
    </React.Fragment>
  );
}