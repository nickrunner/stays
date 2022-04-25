import { Box, Typography } from "@mui/material";
import React from "react";

import { globalContext } from "../../GlobalStore";
import { Role } from "../../models";
import NavButton from "./NavButton";

export default function Greeting(props: any) {
  const { globalState } = React.useContext(globalContext);
  return (
    <Box
      style={{
        display: globalState.isSignedIn ? "block" : "none"
      }}>
      <Typography variant="subtitle1" sx={{ align: "center", p: 2, color: "action.hover" }}>
        {"Welcome " + globalState.self?.firstName + " !"}
      </Typography>
    </Box>
  );
}
