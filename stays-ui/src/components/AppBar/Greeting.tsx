import { Box } from "@mui/material";
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
      <NavButton
        sx={{ fontSize: 20 }}
        transparent={props.transparent}
        text={"Welcome " + globalState.self?.firstName + " !"}
        to="/account"></NavButton>
    </Box>
  );
}
