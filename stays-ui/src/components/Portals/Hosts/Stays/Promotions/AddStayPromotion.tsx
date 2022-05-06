import { Typography } from "@mui/material";
import React from "react";
import { createGlobalState } from "react-use";

import { globalContext } from "../../../../../GlobalStore";
import { StayRecord } from "../../../../../models";
import HostPortal from "../../HostPortal";

export interface AddPromotionProps {
  stay: StayRecord | undefined;
}

export default function AddStayPromotion(props: any) {
  const { globalState, dispatch } = React.useContext(globalContext);
  return (
    <React.Fragment>
      <HostPortal>
        <Typography>Add Promotion</Typography>
      </HostPortal>
    </React.Fragment>
  );
}
