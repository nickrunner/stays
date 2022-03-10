/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";

import { User } from "../../common/models/User";

export interface StaysState {
  self?: User;
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
