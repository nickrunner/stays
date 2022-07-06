import { Box } from "@mui/material";
import React from "react";

import { globalContext } from "../../../../../GlobalStore";
import { StayRecord } from "../../../../../models";
import AddStayPromotion from "../../../../StayPromotion/AddStayPromotion";
import { StayPromotionContext } from "../../../../StayPromotion/StayPromotionContext";
import HostPortal from "../../HostPortal";

export default function NewStayPromotion(props: any) {
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

  return (
    <React.Fragment>
      <HostPortal>
        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <StayPromotionContext>
            <AddStayPromotion stay={getSelectedStay()} />
          </StayPromotionContext>
        </Box>
      </HostPortal>
    </React.Fragment>
  );
}
