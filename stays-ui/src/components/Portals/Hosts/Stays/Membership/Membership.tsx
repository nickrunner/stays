import { Typography } from "@mui/material";
import React from "react";

import { globalContext } from "../../../../../GlobalStore";
import { StayRecord } from "../../../../../models";
import HostPortal from "../../HostPortal";
import MembershipCard from "./MembershipCard";
import StayPricing from "./StayPricing";

export default function Membership(props: any) {
  const { globalState, dispatch } = React.useContext(globalContext);

  function getSelectedStay(): StayRecord | undefined {
    if (!globalState) {
      return undefined;
    }
    if (!globalState.hosting) {
      return undefined;
    }
    return globalState.hosting.selectedStay;
  }

  function getStayName() {
    const stay: StayRecord | undefined = getSelectedStay();
    if (!stay) {
      return "";
    }
    return stay.name;
  }

  return (
    <React.Fragment>
      <HostPortal>
        <StayPricing />
      </HostPortal>
    </React.Fragment>
  );
}
