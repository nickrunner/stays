import { Box, Typography } from "@mui/material";
import React from "react";

import FavoritesTable from "./FavoritesTable";

export default function Favorites(props: any) {
  return (
    <React.Fragment>
      <Box sx={{ display: "grid" }}>
        <Typography variant="h1">Favorites</Typography>
      </Box>
    </React.Fragment>
  );
}
