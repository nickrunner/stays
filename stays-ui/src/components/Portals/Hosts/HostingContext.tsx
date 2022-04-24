import React, { ReactElement, ReactNode } from "react";

import { OrgRecord, StayRecord } from "../../../models";

export type HostingContextType = {
  hostingState: {
    selectedStay: StayRecord | undefined;
    selectedOrg: OrgRecord | undefined;
  };
};

export const hostingContext = React.createContext({} as HostingContextType);

export function HostingContext({ children }: { children: ReactNode }): ReactElement {
  const [selectedStay, setSelectedStay] = React.useState<StayRecord | undefined>(undefined);
  const [selectedOrg, setSelectedOrg] = React.useState<OrgRecord | undefined>(undefined);

  return (
    <hostingContext.Provider
      value={{ hostingState: { selectedStay: selectedStay, selectedOrg: selectedOrg } }}>
      {children}
    </hostingContext.Provider>
  );
}
