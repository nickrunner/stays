import { Typography } from "@mui/material";
import React from "react";

import { globalContext } from "../../../../../GlobalStore";
import { StayRecord } from "../../../../../models";
import HostPortal from "../../HostPortal";
import { PromotionsTable } from "./PromotionsTable";

export default function Promotions(props: any) {
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
        <PromotionsTable stay={getSelectedStay() as StayRecord} />
      </HostPortal>
    </React.Fragment>
  );
}
