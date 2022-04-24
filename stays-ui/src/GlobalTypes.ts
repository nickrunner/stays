/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";

import { UserRecord } from "../../common/models/User";
import { OrgRecord, StayRecord } from "./models";

export interface StaysState {
  self?: UserRecord;
  hosting: {
    selectedOrg?: OrgRecord;
    selectedStay?: StayRecord;
  };
  isSignedIn: boolean;
  mobile: boolean;
  persistenceType: string;
}

export type ActionType = {
  type: string;
  payload?: any;
};

export type StaysContextType = {
  globalState: StaysState;
  dispatch: Dispatch<ActionType>;
};
