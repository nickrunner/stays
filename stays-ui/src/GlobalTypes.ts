/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";

import { UserRecord } from "../../common/models/User";

export interface StaysState {
  self?: UserRecord;
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
