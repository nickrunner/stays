import { Typography } from "@mui/material";
import React from "react";

import { Nav } from "../AppBar/AppBar";

export default function HostSignUp(props: any) {
  return (
    <React.Fragment>
      <Nav transparent={false} />
      <Typography variant="h1">Host sign-up</Typography>
    </React.Fragment>
  );
}
