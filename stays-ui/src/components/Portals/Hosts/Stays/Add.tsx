import React from "react";

import { globalContext } from "../../../../GlobalStore";
import AddStay from "../../../Stay/AddStay";
import { StayContext } from "../../../Stay/StayContext";
import HostPortal from "../HostPortal";

export default function Add(props: any) {
  const { globalState, dispatch } = React.useContext(globalContext);

  return (
    <React.Fragment>
      <HostPortal>
        <StayContext>
          <AddStay />
        </StayContext>
      </HostPortal>
    </React.Fragment>
  );
}
