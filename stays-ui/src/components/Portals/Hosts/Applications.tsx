import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import HostPortal from "./HostPortal";

export default function Applications(props: any) {
  return (
    <HostPortal>
      <Typography variant="h1">Applications</Typography>
    </HostPortal>
  );
}
