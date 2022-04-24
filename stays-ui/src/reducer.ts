/* eslint-disable no-case-declarations */
import { User, UserRecord } from "../../common/models/User";
import { ActionType, StaysState } from "./GlobalTypes";
import { OrgRecord, StayMembership, StayRecord } from "./models";

const Reducer = (state: StaysState, action: ActionType): any => {
  switch (action.type) {
    case "GET_SELF":
      const user: UserRecord = action.payload;
      const signedIn = user !== undefined;
      return {
        ...state,
        self: user,
        isSignedIn: signedIn
      };
    case "HOSTING_SELECT_ORG":
      console.log("Setting org: " + JSON.stringify(state, null, 2));
      const org: OrgRecord = action.payload;
      return {
        ...state,
        hosting: {
          ...state.hosting,
          selectedOrg: org
        }
      };
    case "HOSTING_SELECT_STAY":
      const stay: StayRecord = action.payload;
      return {
        ...state,
        hosting: {
          ...state.hosting,
          selectedStay: stay
        }
      };
    case "RESIZE":
      return {
        ...state,
        mobile: action.payload
      };
    case "SAVE_STAY_INFO":
      return {
        ...state,
        stayInfo: action.payload
      };
    default:
      return state;
  }
};

export default Reducer;
