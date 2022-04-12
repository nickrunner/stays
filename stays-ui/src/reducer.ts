/* eslint-disable no-case-declarations */
import { User, UserRecord } from "../../common/models/User";
import { ActionType, StaysState } from "./GlobalTypes";

const Reducer = (state: StaysState, action: ActionType): any => {
  switch (action.type) {
    case "GET_SELF":
      const user: UserRecord = action.payload;
      const signedIn = user !== undefined;
      state.isSignedIn = signedIn;
      state.self = user;
      return {
        ...state,
        self: user,
        isSignedIn: signedIn
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
