import { Box, Paper, Typography } from "@mui/material";
import React from "react";

import { StayClient } from "../../clients/stayClient";
import { Stay } from "../../models";
import Opportunity from "./Opportunity";

export default function Opportunities(props: any) {
  const [stays, setStays] = React.useState<Stay[]>([]);

  const getStays = async () => {
    try {
      const newStays = await new StayClient().getStays("", {}, { lastEvaluatedKey: 0, count: 3 });
      setStays(newStays);
    } catch (err) {
      console.log("FAILED getting stays: " + JSON.stringify(err, null, 2));
    }
  };

  React.useEffect(() => {
    getStays();
    return;
  }, []);

  return (
    <Box sx={{ p: 5, elevation: 20, justifyContent: "center", display: "grid" }}>
      <Typography align="center" variant="h1">
        Special offers for you
      </Typography>
      <Box sx={{ display: "grid", gap: 5, p: 5 }}>
        {stays.map((stay) => (
          <Opportunity key={stay} stay={stay} />
        ))}
      </Box>
    </Box>
  );
}
