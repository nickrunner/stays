import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import HostPortal from "./HostPortal";

export default function Applications(props: any) {
  const router = useRouter();
  const orgId = router.pathname.split("/")[3];
  const stayId = router.pathname.split("/")[4];

  return (
    <HostPortal>
      <Typography variant="h1">Applications</Typography>
    </HostPortal>
  );
}
